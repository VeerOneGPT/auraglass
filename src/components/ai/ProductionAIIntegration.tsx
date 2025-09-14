import React, { useState, useEffect, useCallback, useRef } from 'react';
import { OpenAIService } from '../../services/ai/openai-service';
import { SemanticSearchService } from '../../services/ai/semantic-search-service';
import { VisionService } from '../../services/ai/vision-service';
import { CollaborationService } from '../../services/websocket/collaboration-service';
import { AuthService } from '../../services/auth/auth-service';
import { defaultAIConfig } from '../../services/ai/config';
import * as Sentry from '@sentry/react';

interface ProductionAIIntegrationProps {
  authToken?: string;
  userId?: string;
}

export const ProductionAIIntegration: React.FC<ProductionAIIntegrationProps> = ({
  authToken,
  userId,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [formFields, setFormFields] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [imageAnalysis, setImageAnalysis] = useState<any>(null);
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openAIService = useRef<OpenAIService>();
  const searchService = useRef<SemanticSearchService>();
  const visionService = useRef<VisionService>();
  const collaborationService = useRef<CollaborationService>();
  const authService = useRef<AuthService>();

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setLoading(true);

      openAIService.current = new OpenAIService(defaultAIConfig);
      searchService.current = new SemanticSearchService(defaultAIConfig);
      visionService.current = new VisionService(defaultAIConfig);
      authService.current = new AuthService();

      await searchService.current.initialize();

      if (authToken) {
        collaborationService.current = new CollaborationService(
          process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:3001',
          authToken
        );
        await collaborationService.current.connect();

        collaborationService.current.on('user-joined', (user) => {
          setCollaborators(prev => [...prev, user]);
        });

        collaborationService.current.on('user-left', (userId) => {
          setCollaborators(prev => prev.filter(c => c.userId !== userId));
        });
      }

      setIsInitialized(true);
    } catch (error) {
      Sentry.captureException(error);
      setError('Failed to initialize AI services');
    } finally {
      setLoading(false);
    }
  };

  const generateSmartForm = useCallback(async (context: string) => {
    if (!openAIService.current) return;

    try {
      setLoading(true);
      setError(null);

      const suggestions = await openAIService.current.generateFormFieldSuggestions(
        context,
        formFields
      );

      setFormFields(suggestions);

      Sentry.addBreadcrumb({
        category: 'ai',
        message: 'Generated form fields',
        level: 'info',
        data: { context, fieldCount: suggestions.length },
      });
    } catch (error) {
      Sentry.captureException(error);
      setError('Failed to generate form fields');
    } finally {
      setLoading(false);
    }
  }, [formFields]);

  const performSemanticSearch = useCallback(async (query: string) => {
    if (!searchService.current || !openAIService.current) return;

    try {
      setLoading(true);
      setError(null);

      const { enhancedQuery, intent } = await openAIService.current.generateSemanticSearchQuery(query);

      const results = await searchService.current.hybridSearch(enhancedQuery, {
        semanticWeight: intent === 'search' ? 0.8 : 0.6,
        keywordWeight: intent === 'navigation' ? 0.4 : 0.2,
        topK: 10,
      });

      setSearchResults(results);

      Sentry.addBreadcrumb({
        category: 'search',
        message: 'Performed semantic search',
        level: 'info',
        data: { query, intent, resultCount: results.length },
      });
    } catch (error) {
      Sentry.captureException(error);
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const analyzeImage = useCallback(async (file: File) => {
    if (!visionService.current) return;

    try {
      setLoading(true);
      setError(null);

      const buffer = await file.arrayBuffer();
      const imageBuffer = Buffer.from(buffer);

      const [faces, objects, text, analysis] = await Promise.all([
        visionService.current.detectFaces(imageBuffer),
        visionService.current.detectObjects(imageBuffer),
        visionService.current.extractText(imageBuffer),
        visionService.current.analyzeImage(imageBuffer),
      ]);

      const result = {
        faces,
        objects,
        text,
        ...analysis,
        fileName: file.name,
        fileSize: file.size,
      };

      setImageAnalysis(result);

      Sentry.addBreadcrumb({
        category: 'vision',
        message: 'Analyzed image',
        level: 'info',
        data: {
          fileName: file.name,
          faceCount: faces.length,
          objectCount: objects.length,
        },
      });
    } catch (error) {
      Sentry.captureException(error);
      setError('Image analysis failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeImageBackground = useCallback(async (file: File) => {
    if (!visionService.current) return null;

    try {
      setLoading(true);
      setError(null);

      const buffer = await file.arrayBuffer();
      const imageBuffer = Buffer.from(buffer);

      const processedBuffer = await visionService.current.removeBackground(imageBuffer);

      // Convert Node Buffer to a Blob-compatible type for browsers
      const blob = new Blob([new Uint8Array(processedBuffer)], { type: 'image/png' });
      const url = URL.createObjectURL(blob);

      return url;
    } catch (error) {
      Sentry.captureException(error);
      setError('Background removal failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const joinCollaborationRoom = useCallback(async (roomId: string) => {
    if (!collaborationService.current) return;

    try {
      await collaborationService.current.joinRoom(roomId);

      collaborationService.current.on('document-changed', (operation) => {
        console.log('Document changed:', operation);
      });

      collaborationService.current.on('cursor-moved', (cursor) => {
        console.log('Cursor moved:', cursor);
      });

      const participants = collaborationService.current.getRoomParticipants();
      setCollaborators(participants);
    } catch (error) {
      Sentry.captureException(error);
      setError('Failed to join collaboration room');
    }
  }, []);

  const sendCollaborativeEdit = useCallback((edit: any) => {
    if (!collaborationService.current) return;

    collaborationService.current.sendEdit(edit);
  }, []);

  const updateCursorPosition = useCallback((x: number, y: number) => {
    if (!collaborationService.current) return;

    collaborationService.current.sendCursorPosition(x, y);
  }, []);

  const cleanup = useCallback(() => {
    if (collaborationService.current) {
      collaborationService.current.disconnect();
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  if (!isInitialized) {
    return (
      <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-p-8">
        <div className="glass-glass-glass-text-center">
          <div className="animate-spin glass-radius-full glass-glass-glass-h-12 glass-glass-glass-w-12 glass-glass-glass-border-b-2 glass-glass-glass-border-blue glass-glass-glass-mx-auto glass-glass-glass-mb-4"></div>
          <p className="glass-text-secondary">Initializing AI services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="production-ai-integration glass-glass-glass-p-6">
      {error && (
        <div className="glass-surface-subtle glass-glass-glass-border glass-glass-glass-border-red-200 glass-glass-glass-text-primary glass-glass-glass-px-4 glass-glass-glass-py-3 glass-radius glass-glass-glass-mb-4">
          {error}
        </div>
      )}

      <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-6">
        <div className="glass-surface-subtle glass-radius-lg glass-glass-glass-shadow glass-glass-glass-p-6">
          <h2 className="glass-glass-glass-text-xl glass-glass-glass-font-bold glass-glass-glass-mb-4">Smart Form Builder</h2>
          <input
            type="text"
            placeholder="Describe your form (e.g., 'user registration')"
            className="glass-glass-glass-w-full glass-glass-glass-px-4 glass-glass-glass-py-2 glass-glass-glass-border glass-radius glass-glass-glass-mb-4"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                generateSmartForm((e.target as HTMLInputElement).value);
              }
            }}
          />
          {formFields.length > 0 && (
            <div className="glass-glass-glass-space-y-2">
              {formFields.map((field, idx) => (
                <div key={idx} className="glass-glass-glass-p-3 glass-surface-subtle glass-radius">
                  <span className="glass-glass-glass-font-medium">{field.label}</span>
                  <span className="glass-glass-glass-text-sm glass-text-secondary ml-2">({field.fieldType})</span>
                  {field.required && (
                    <span className="glass-glass-glass-text-primary ml-1">*</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-surface-subtle glass-radius-lg glass-glass-glass-shadow glass-glass-glass-p-6">
          <h2 className="glass-glass-glass-text-xl glass-glass-glass-font-bold glass-glass-glass-mb-4">Semantic Search</h2>
          <input
            type="text"
            placeholder="Search anything..."
            className="glass-glass-glass-w-full glass-glass-glass-px-4 glass-glass-glass-py-2 glass-glass-glass-border glass-radius glass-glass-glass-mb-4"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                performSemanticSearch((e.target as HTMLInputElement).value);
              }
            }}
          />
          {searchResults.length > 0 && (
            <div className="glass-glass-glass-space-y-2 glass-max-glass-glass-glass-h-64 glass-glass-glass-overflow-y-auto">
              {searchResults.map((result, idx) => (
                <div key={idx} className="glass-glass-glass-p-3 glass-surface-subtle glass-radius">
                  <div className="glass-glass-glass-font-medium">{result.content.substring(0, 100)}...</div>
                  <div className="glass-glass-glass-text-sm glass-text-secondary">Score: {result.score.toFixed(3)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-surface-subtle glass-radius-lg glass-glass-glass-shadow glass-glass-glass-p-6">
          <h2 className="glass-glass-glass-text-xl glass-glass-glass-font-bold glass-glass-glass-mb-4">Image Analysis</h2>
          <input
            type="file"
            accept="image/*"
            className="glass-glass-glass-mb-4"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) analyzeImage(file);
            }}
          />
          {imageAnalysis && (
            <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-sm">
              <div>Faces detected: {imageAnalysis.faces?.length || 0}</div>
              <div>Objects detected: {imageAnalysis.objects?.length || 0}</div>
              <div>Text extracted: {imageAnalysis.text?.text?.substring(0, 50) || 'None'}...</div>
              <div>Labels: {imageAnalysis.labels?.map((l: any) => l.description).join(', ')}</div>
            </div>
          )}
        </div>

        <div className="glass-surface-subtle glass-radius-lg glass-glass-glass-shadow glass-glass-glass-p-6">
          <h2 className="glass-glass-glass-text-xl glass-glass-glass-font-bold glass-glass-glass-mb-4">Collaboration</h2>
          <div className="glass-glass-glass-mb-4">
            <input
              type="text"
              placeholder="Room ID"
              className="glass-glass-glass-w-full glass-glass-glass-px-4 glass-glass-glass-py-2 glass-glass-glass-border glass-radius glass-glass-glass-mb-2"
              id="roomId"
            />
            <button
              onClick={() => {
                const input = document.getElementById('roomId') as HTMLInputElement;
                if (input?.value) joinCollaborationRoom(input.value);
              }}
              className="glass-glass-glass-px-4 glass-glass-glass-py-2 glass-surface-blue glass-glass-glass-text-primary glass-radius hover:glass-surface-blue"
            >
              Join Room
            </button>
          </div>
          {collaborators.length > 0 && (
            <div className="space-y-1">
              <div className="glass-glass-glass-font-medium">Active Collaborators:</div>
              {collaborators.map((collab, idx) => (
                <div key={idx} className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                  <div className="glass-glass-glass-w-2 glass-glass-glass-h-2 glass-surface-green glass-radius-full"></div>
                  <span className="glass-glass-glass-text-sm">{collab.userName}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="glass-glass-glass-fixed glass-glass-glass-inset-0 glass-surface-dark glass-opacity-50 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-z-50">
          <div className="glass-surface-subtle glass-radius-lg glass-glass-glass-p-6">
            <div className="animate-spin glass-radius-full glass-glass-glass-h-12 glass-glass-glass-w-12 glass-glass-glass-border-b-2 glass-glass-glass-border-blue glass-glass-glass-mx-auto"></div>
            <p className="mt-4">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sentry.withProfiler(ProductionAIIntegration);
