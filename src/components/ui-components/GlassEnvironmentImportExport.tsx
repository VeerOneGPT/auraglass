// Moved to environments
"use client"

import React, { useState, useRef } from 'react'
import { 
  Upload,
  Download,
  FileText,
  Package,
  Copy,
  Share,
  Archive,
  CheckCircle,
  AlertCircle,
  Clock,
  Folder,
  FileJson,
  FileCode,
  Database,
  CloudDownload,
  CloudUpload,
  History,
  Settings,
  Filter,
  Search,
  Plus,
  X,
  Eye,
  MoreVertical,
  ArrowRight,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react'
import { Glass } from '@/design-system/primitives/glass/Glass'
import { GlassButton } from '@/design-system/components/button/GlassButton'
import { GlassInput } from '@/design-system/components/input/GlassInput'
import { GlassLabel } from '@/design-system/components/input/GlassLabel'
import { GlassSwitch } from '@/design-system/components/input/GlassSwitch'
import { GlassAlert } from '@/design-system/components/data-display/GlassAlert'
import { GlassBadge } from '@/design-system/components/data-display/GlassBadge'
import { GlassTabs, GlassTabsList, GlassTabsTrigger } from '@/design-system/components/navigation/GlassTabs'

interface EnvironmentExport {
  id: string
  name: string
  description: string
  category: string
  version: string
  size: string
  format: 'json' | 'yaml' | 'zip'
  createdAt: string
  status: 'ready' | 'exporting' | 'expired'
  downloadUrl?: string
  includesData: boolean
  includesModels: boolean
  includesResults: boolean
}

interface ImportHistory {
  id: string
  fileName: string
  size: string
  importedAt: string
  status: 'success' | 'failed' | 'partial'
  templatesImported: number
  errors?: string[]
}

interface EnvironmentImportExportProps {
  orgId: string
}

const mockExports: EnvironmentExport[] = [
  {
    id: 'exp-1',
    name: 'Robot Navigation Templates',
    description: 'Complete set of navigation templates with training data',
    category: 'robotics',
    version: '2.1.0',
    size: '156.2 MB',
    format: 'zip',
    createdAt: '2024-02-28T14:30:00Z',
    status: 'ready',
    downloadUrl: '/exports/robot-nav-templates.zip',
    includesData: true,
    includesModels: true,
    includesResults: false
  },
  {
    id: 'exp-2',
    name: 'Trading Algorithms Export',
    description: 'Financial trading templates and backtesting results',
    category: 'trading',
    version: '1.5.3',
    size: '89.7 MB',
    format: 'json',
    createdAt: '2024-02-27T09:15:00Z',
    status: 'exporting',
    includesData: false,
    includesModels: true,
    includesResults: true
  },
  {
    id: 'exp-3',
    name: 'Game AI Templates',
    description: 'Multi-agent game templates collection',
    category: 'games',
    version: '3.0.0',
    size: '234.1 MB',
    format: 'zip',
    createdAt: '2024-02-25T16:45:00Z',
    status: 'expired',
    includesData: true,
    includesModels: false,
    includesResults: true
  }
]

const mockImportHistory: ImportHistory[] = [
  {
    id: 'imp-1',
    fileName: 'research-templates-v2.zip',
    size: '145.8 MB',
    importedAt: '2024-02-28T10:22:00Z',
    status: 'success',
    templatesImported: 12
  },
  {
    id: 'imp-2',
    fileName: 'backup-templates.json',
    size: '67.3 MB',
    importedAt: '2024-02-26T15:45:00Z',
    status: 'partial',
    templatesImported: 8,
    errors: ['2 templates had validation errors', '1 template had missing dependencies']
  },
  {
    id: 'imp-3',
    fileName: 'old-templates.yaml',
    size: '23.1 MB',
    importedAt: '2024-02-24T11:30:00Z',
    status: 'failed',
    templatesImported: 0,
    errors: ['Unsupported template format', 'Invalid YAML structure']
  }
]

export function EnvironmentImportExport({ orgId }: EnvironmentImportExportProps) {
  const [activeTab, setActiveTab] = useState('export')
  const [exports, setExports] = useState<EnvironmentExport[]>(mockExports)
  const [importHistory, setImportHistory] = useState<ImportHistory[]>(mockImportHistory)
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [exportOptions, setExportOptions] = useState({
    includeData: true,
    includeModels: true,
    includeResults: false,
    format: 'zip' as 'json' | 'yaml' | 'zip',
    compression: true
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      console.log('Uploading:', file.name)
      // Simulate import process
      setTimeout(() => {
        const newImport: ImportHistory = {
          id: `imp-${Date.now()}`,
          fileName: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          importedAt: new Date().toISOString(),
          status: 'success',
          templatesImported: Math.floor(Math.random() * 15) + 1
        }
        setImportHistory(prev => [newImport, ...prev])
      }, 2000)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const newExport: EnvironmentExport = {
      id: `exp-${Date.now()}`,
      name: `Custom Export ${new Date().toLocaleDateString()}`,
      description: `Export of ${selectedTemplates.length} selected environments`,
      category: 'custom',
      version: '1.0.0',
      size: `${Math.floor(Math.random() * 200) + 50}.${Math.floor(Math.random() * 9)} MB`,
      format: exportOptions.format,
      createdAt: new Date().toISOString(),
      status: 'ready',
      includesData: exportOptions.includeData,
      includesModels: exportOptions.includeModels,
      includesResults: exportOptions.includeResults
    }
    
    setExports(prev => [newExport, ...prev])
    setIsExporting(false)
    setSelectedTemplates([])
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': case 'success': return 'success'
      case 'exporting': return 'warning'
      case 'expired': case 'failed': return 'error'
      default: return 'info'
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'json': return <FileJson className="w-4 h-4" />
      case 'yaml': return <FileCode className="w-4 h-4" />
      case 'zip': return <Archive className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const tabItems = [
    { key: 'export', label: 'Export Environments', icon: <Download className="w-4 h-4" /> },
    { key: 'import', label: 'Import Environments', icon: <Upload className="w-4 h-4" /> },
    { key: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ]

  const renderExportTab = () => (
    <div className="space-y-6">
      {/* Quick Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Glass className="p-4 cursor-pointer hover:bg-white/5 transition-all" onClick={() => setActiveTab('export-wizard')}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Quick Export</h3>
              <p className="text-sm text-white/60">Export all environments instantly</p>
            </div>
          </div>
        </Glass>

        <Glass className="p-4 cursor-pointer hover:bg-white/5 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Backup All</h3>
              <p className="text-sm text-white/60">Create complete backup</p>
            </div>
          </div>
        </Glass>

        <Glass className="p-4 cursor-pointer hover:bg-white/5 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Custom Export</h3>
              <p className="text-sm text-white/60">Choose specific environments</p>
            </div>
          </div>
        </Glass>
      </div>

      {/* Export Options */}
      <Glass className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Export Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <GlassSwitch
              label="Include Training Data"
              description="Export datasets and training examples"
              checked={exportOptions.includeData}
              onCheckedChange={(checked) => setExportOptions(prev => ({ ...prev, includeData: checked }))}
            />
            
            <GlassSwitch
              label="Include Models"
              description="Export trained model weights"
              checked={exportOptions.includeModels}
              onCheckedChange={(checked) => setExportOptions(prev => ({ ...prev, includeModels: checked }))}
            />
            
            <GlassSwitch
              label="Include Results"
              description="Export evaluation results and metrics"
              checked={exportOptions.includeResults}
              onCheckedChange={(checked) => setExportOptions(prev => ({ ...prev, includeResults: checked }))}
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <GlassLabel>Export Format</GlassLabel>
              <div className="grid grid-cols-3 gap-2">
                {['json', 'yaml', 'zip'].map(format => (
                  <button
                    key={format}
                    onClick={() => setExportOptions(prev => ({ ...prev, format: format as any }))}
                    className={`p-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                      exportOptions.format === format
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {getFormatIcon(format)}
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            
            <GlassSwitch
              label="Enable Compression"
              description="Reduce file size (recommended)"
              checked={exportOptions.compression}
              onCheckedChange={(checked) => setExportOptions(prev => ({ ...prev, compression: checked }))}
            />
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <GlassButton 
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1"
          >
            {isExporting ? (
              <>Exporting...</>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Start Export
              </>
            )}
          </GlassButton>
          <GlassButton variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </GlassButton>
        </div>
      </Glass>

      {/* Recent Exports */}
      <Glass className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Exports</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <GlassInput
              placeholder="Search exports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          {exports.map(export_ => (
            <div key={export_.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg">
                  {getFormatIcon(export_.format)}
                </div>
                
                <div>
                  <h4 className="font-semibold text-white">{export_.name}</h4>
                  <p className="text-sm text-white/60">{export_.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-white/50">{export_.size}</span>
                    <span className="text-xs text-white/50">{formatDate(export_.createdAt)}</span>
                    <GlassBadge variant={getStatusColor(export_.status) as any} size="sm">
                      {export_.status}
                    </GlassBadge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {export_.status === 'ready' && (
                  <GlassButton size="sm">
                    <CloudDownload className="w-4 h-4 mr-2" />
                    Download
                  </GlassButton>
                )}
                <GlassButton variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </GlassButton>
              </div>
            </div>
          ))}
        </div>
      </Glass>
    </div>
  )

  const renderImportTab = () => (
    <div className="space-y-6">
      {/* Upload Area */}
      <Glass 
        className={`p-8 border-2 border-dashed transition-all ${
          dragOver ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/20'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Upload className="w-10 h-10 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Import Environments</h3>
          <p className="text-white/60 mb-4">
            Drag and drop your environment files here, or click to browse
          </p>
          <div className="flex justify-center gap-3">
            <GlassButton onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </GlassButton>
            <GlassButton variant="outline">
              <CloudUpload className="w-4 h-4 mr-2" />
              Import from URL
            </GlassButton>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".json,.yaml,.yml,.zip"
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </div>
      </Glass>

      {/* Supported Formats */}
      <Glass className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Supported Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { format: 'JSON', ext: '.json', icon: <FileJson className="w-5 h-5" />, desc: 'Single environment or batch' },
            { format: 'YAML', ext: '.yaml, .yml', icon: <FileCode className="w-5 h-5" />, desc: 'Configuration format' },
            { format: 'ZIP', ext: '.zip', icon: <Archive className="w-5 h-5" />, desc: 'Compressed archives' }
          ].map(format => (
            <div key={format.format} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-lg">
                  {format.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{format.format}</h4>
                  <p className="text-xs text-white/50">{format.ext}</p>
                </div>
              </div>
              <p className="text-sm text-white/60">{format.desc}</p>
            </div>
          ))}
        </div>
      </Glass>

      {/* Import Guidelines */}
      <Glass className="p-6 bg-yellow-500/10 border-yellow-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-300 mb-2">Import Guidelines</h4>
            <ul className="text-sm text-yellow-200/80 space-y-1">
              <li>• Environments with the same ID will be updated, not duplicated</li>
              <li>• Large files may take several minutes to process</li>
              <li>• Verify environment dependencies before importing</li>
              <li>• Invalid environments will be skipped with detailed error reports</li>
            </ul>
          </div>
        </div>
      </Glass>
    </div>
  )

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <Glass className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Import History</h3>
          <GlassButton variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </GlassButton>
        </div>
        
        <div className="space-y-3">
          {importHistory.map(item => (
            <div key={item.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    item.status === 'success' ? 'bg-green-500/20' :
                    item.status === 'partial' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                  }`}>
                    {item.status === 'success' ? <CheckCircle className="w-4 h-4 text-green-400" /> :
                     item.status === 'partial' ? <AlertCircle className="w-4 h-4 text-yellow-400" /> :
                     <X className="w-4 h-4 text-red-400" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.fileName}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-white/50">{item.size}</span>
                      <span className="text-xs text-white/50">{formatDate(item.importedAt)}</span>
                      <GlassBadge variant={getStatusColor(item.status) as any} size="sm">
                        {item.status}
                      </GlassBadge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">{item.templatesImported}</div>
                  <div className="text-xs text-white/50">environments imported</div>
                </div>
              </div>
              
              {item.errors && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h5 className="font-medium text-red-300 mb-2">Errors:</h5>
                  <ul className="text-sm text-red-200/80 space-y-1">
                    {item.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Glass>
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <Glass className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Import/Export Preferences</h3>
        
        <div className="space-y-4">
          <GlassSwitch
            label="Auto-backup before import"
            description="Automatically create a backup before importing new environments"
            checked={true}
            onCheckedChange={() => {}}
          />
          
          <GlassSwitch
            label="Validate environments on import"
            description="Run validation checks on imported environments"
            checked={true}
            onCheckedChange={() => {}}
          />
          
          <GlassSwitch
            label="Compress exports by default"
            description="Enable compression for all exports to reduce file size"
            checked={true}
            onCheckedChange={() => {}}
          />
          
          <div>
            <GlassLabel>Default export format</GlassLabel>
            <select
              className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              defaultValue="zip"
            >
              <option value="json">JSON</option>
              <option value="yaml">YAML</option>
              <option value="zip">ZIP Archive</option>
            </select>
          </div>
        </div>
      </Glass>

      <Glass className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Storage Settings</h3>
        
        <div className="space-y-4">
          <div>
            <GlassLabel>Export retention period</GlassLabel>
            <select
              className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              defaultValue="30"
            >
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
          
          <div>
            <GlassLabel>Maximum export size</GlassLabel>
            <select
              className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
              defaultValue="1000"
            >
              <option value="100">100 MB</option>
              <option value="500">500 MB</option>
              <option value="1000">1 GB</option>
              <option value="5000">5 GB</option>
            </select>
          </div>
        </div>
      </Glass>
    </div>
  )

  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
              <Package className="h-8 w-8 text-blue-400" />
            </div>
            Environment Import/Export
          </h1>
          <p className="text-lg text-white/70">
            Backup, share, and migrate your evaluation environments
          </p>
        </div>
        
        <div className="flex gap-3">
          <GlassButton variant="outline">
            <Database className="w-4 h-4 mr-2" />
            Batch Operations
          </GlassButton>
          <GlassButton>
            <CloudUpload className="w-4 h-4 mr-2" />
            Scheduled Backups
          </GlassButton>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Glass className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">23</div>
              <div className="text-sm text-white/60">Total Exports</div>
            </div>
          </div>
        </Glass>

        <Glass className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg">
              <Upload className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-sm text-white/60">Environments Imported</div>
            </div>
          </div>
        </Glass>

        <Glass className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
              <Archive className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">1.2 GB</div>
              <div className="text-sm text-white/60">Storage Used</div>
            </div>
          </div>
        </Glass>

        <Glass className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-white/60">Pending Exports</div>
            </div>
          </div>
        </Glass>
      </div>

      {/* Tabs */}
      <GlassTabs value={activeTab} onValueChange={setActiveTab}>
        <GlassTabsList>
          {tabItems.map((item) => (
            <GlassTabsTrigger key={item.key} value={item.key}>
              <div className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </div>
            </GlassTabsTrigger>
          ))}
        </GlassTabsList>
      </GlassTabs>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'export' && renderExportTab()}
        {activeTab === 'import' && renderImportTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  )
}
