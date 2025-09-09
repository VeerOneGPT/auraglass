import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';

export type Language =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'csharp'
  | 'go'
  | 'rust'
  | 'php'
  | 'ruby'
  | 'swift'
  | 'kotlin'
  | 'scala'
  | 'html'
  | 'css'
  | 'json'
  | 'xml'
  | 'yaml'
  | 'sql'
  | 'bash'
  | 'powershell'
  | 'dockerfile'
  | 'markdown'
  | 'plaintext';

export interface GlassCodeEditorProps {
  /** Code content */
  value?: string;
  /** Language for syntax highlighting */
  language?: Language;
  /** Whether the editor is read-only */
  readOnly?: boolean;
  /** Placeholder text when empty */
  placeholder?: string;
  /** Font size */
  fontSize?: number;
  /** Number of lines to show */
  lineNumbers?: boolean;
  /** Whether to show minimap */
  minimap?: boolean;
  /** Whether to enable word wrap */
  wordWrap?: boolean;
  /** Tab size */
  tabSize?: number;
  /** Whether to enable auto-completion */
  autoComplete?: boolean;
  /** Theme for syntax highlighting */
  theme?: 'light' | 'dark' | 'auto';
  /** Maximum height */
  maxHeight?: string;
  /** Minimum height */
  minHeight?: string;
  /** Custom className */
  className?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Mount handler */
  onMount?: (editor: any) => void;
}

// Simple syntax highlighting patterns for common languages
const syntaxPatterns = {
  javascript: {
    keywords: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|default|try|catch|finally|throw|new|class|extends|super|import|export|from|async|await|yield|typeof|instanceof|in|of)\b/g,
    strings: /(["'`])(.*?)\1/g,
    comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    numbers: /\b\d+(\.\d+)?\b/g,
    functions: /\b\w+(?=\()/g,
  },
  typescript: {
    keywords: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|default|try|catch|finally|throw|new|class|extends|super|import|export|from|async|await|yield|typeof|instanceof|in|of|interface|type|enum|namespace|module)\b/g,
    strings: /(["'`])(.*?)\1/g,
    comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    numbers: /\b\d+(\.\d+)?\b/g,
    types: /\b[A-Z]\w*\b/g,
  },
  python: {
    keywords: /\b(def|class|if|elif|else|for|while|try|except|finally|with|as|import|from|return|yield|lambda|and|or|not|in|is|None|True|False)\b/g,
    strings: /(["'`])(.*?)\1/g,
    comments: /(#.*$)/gm,
    numbers: /\b\d+(\.\d+)?\b/g,
    functions: /\b\w+(?=\()/g,
  },
  css: {
    properties: /([a-z-]+)(?=\s*:)/g,
    values: /:(.+?);/g,
    selectors: /([.#]?[\w-]+)(?=\s*\{)/g,
    comments: /(\/\*[\s\S]*?\*\/)/g,
  },
  json: {
    keys: /"([^"]+)":/g,
    strings: /"([^"]+)"/g,
    numbers: /\b\d+(\.\d+)?\b/g,
  },
};

export const GlassCodeEditor: React.FC<GlassCodeEditorProps> = ({
  value = '',
  language = 'plaintext',
  readOnly = false,
  placeholder = 'Enter your code here...',
  fontSize = 14,
  lineNumbers = true,
  minimap = false,
  wordWrap = true,
  tabSize = 2,
  autoComplete = false,
  theme = 'dark',
  maxHeight = '400px',
  minHeight = '200px',
  className = '',
  onChange,
  onFocus,
  onBlur,
  onMount,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  // Handle value changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  // Handle focus/blur
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  // Syntax highlighting function
  const highlightCode = useCallback((code: string, lang: Language) => {
    if (lang === 'plaintext') return code;

    const patterns = syntaxPatterns[lang as keyof typeof syntaxPatterns];
    if (!patterns) return code;

    let highlighted = code;

    // Apply highlighting based on patterns
    Object.entries(patterns).forEach(([type, pattern]) => {
      highlighted = highlighted.replace(pattern, (match, ...groups) => {
        const colorClass = getHighlightColor(type);
        return `<span class="${colorClass}">${match}</span>`;
      });
    });

    return highlighted;
  }, []);

  // Get highlight color classes
  const getHighlightColor = (type: string) => {
    const colors = {
      keywords: 'text-blue-400',
      strings: 'text-green-400',
      comments: 'text-gray-500',
      numbers: 'text-purple-400',
      functions: 'text-yellow-400',
      types: 'text-cyan-400',
      properties: 'text-blue-300',
      values: 'text-green-300',
      selectors: 'text-orange-400',
      keys: 'text-blue-300',
    };
    return colors[type as keyof typeof colors] || 'text-white';
  };

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && !readOnly) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = ' '.repeat(tabSize);

      const newValue = currentValue.substring(0, start) + spaces + currentValue.substring(end);
      setInternalValue(newValue);
      onChange?.(newValue);

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + tabSize;
      }, 0);
    }
  }, [currentValue, tabSize, readOnly, onChange]);

  // Update cursor position
  const updateCursorPosition = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const text = textarea.value;
    const cursorPos = textarea.selectionStart;

    let line = 1;
    let column = 1;

    for (let i = 0; i < cursorPos; i++) {
      if (text[i] === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
    }

    setCursorPosition({ line, column });
  }, []);

  // Sync scroll positions
  useEffect(() => {
    const textarea = textareaRef.current;
    const pre = preRef.current;

    if (!textarea || !pre) return;

    const syncScroll = () => {
      pre.scrollTop = textarea.scrollTop;
      pre.scrollLeft = textarea.scrollLeft;
    };

    textarea.addEventListener('scroll', syncScroll);
    return () => textarea.removeEventListener('scroll', syncScroll);
  }, []);

  // Handle mount
  useEffect(() => {
    if (textareaRef.current && onMount) {
      onMount(textareaRef.current);
    }
  }, [onMount]);

  const highlightedCode = highlightCode(currentValue, language);
  const lines = currentValue.split('\n');

  return (
    <OptimizedGlass
      className={`relative overflow-hidden ${className}`}
      style={{ maxHeight, minHeight }}
      blur="medium"
      elevation={'level1'}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-white/70 font-medium">
            {language.toUpperCase()}
          </span>
          {lineNumbers && (
            <span className="text-xs text-white/50">
              Ln {cursorPosition.line}, Col {cursorPosition.column}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {!readOnly && (
            <>
              <button
                className="px-2 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                onClick={() => {
                  const textarea = textareaRef.current;
                  if (textarea) {
                    textarea.value = '';
                    setInternalValue('');
                    onChange?.('');
                  }
                }}
              >
                Clear
              </button>
              <button
                className="px-2 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                onClick={() => {
                  navigator.clipboard?.writeText(currentValue);
                }}
              >
                Copy
              </button>
            </>
          )}
        </div>
      </div>

      {/* Editor Container */}
      <div className="relative">
        {/* Syntax Highlighted Background */}
        <pre
          ref={preRef}
          className={`absolute inset-0 p-4 font-mono text-sm overflow-auto pointer-events-none whitespace-pre-wrap break-words ${
            wordWrap ? 'break-words' : 'whitespace-pre'
          }`}
          style={{ fontSize, lineHeight: '1.5' }}
        >
          <code
            dangerouslySetInnerHTML={{ __html: highlightedCode || placeholder }}
            className={currentValue ? '' : 'text-white/30'}
          />
        </pre>

        {/* Line Numbers */}
        {lineNumbers && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/20 border-r border-white/10 p-4 text-right text-white/50 text-sm font-mono select-none">
            {lines.map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onSelect={updateCursorPosition}
          onClick={updateCursorPosition}
          readOnly={readOnly}
          placeholder={placeholder}
          className={`w-full p-4 font-mono text-sm bg-transparent text-transparent caret-white outline-none resize-none overflow-auto ${
            wordWrap ? 'break-words' : 'whitespace-pre'
          } ${lineNumbers ? 'pl-16' : ''}`}
          style={{
            fontSize,
            lineHeight: '1.5',
            minHeight: '100%',
            height: '100%',
          }}
          spellCheck={false}
          autoComplete={autoComplete ? 'on' : 'off'}
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </OptimizedGlass>
  );
};

// Compound component for code editor with file management
export const GlassCodeEditorWithFiles: React.FC<{
  files: { name: string; content: string; language: Language }[];
  onFileChange?: (filename: string, content: string) => void;
  className?: string;
}> = ({ files, onFileChange, className = '' }) => {
  const [activeFile, setActiveFile] = useState(files[0]?.name || '');

  const currentFile = files.find(f => f.name === activeFile) || files[0];

  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {/* File Explorer */}
      <OptimizedGlass
        className="col-span-1 p-4"
        blur="medium"
        elevation={'level1'}
      >
        <h3 className="text-sm font-semibold text-white mb-4">Files</h3>
        <div className="space-y-2">
          {files.map(file => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file.name)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                activeFile === file.name
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
      </OptimizedGlass>

      {/* Code Editor */}
      <div className="col-span-3">
        {currentFile && (
          <GlassCodeEditor
            value={currentFile.content}
            language={currentFile.language}
            onChange={(content) => onFileChange?.(currentFile.name, content)}
          />
        )}
      </div>
    </div>
  );
};
