import { ReactNode, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  MenuIcon,
  SparklesIcon,
  SummarizeIcon,
  RewriteIcon,
  OutlineIcon,
  ChevronDownIcon,
  BoldIcon,
  ItalicIcon,
  ListUnorderedIcon,
  ListOrderedIcon,
  FileIcon,
  SendIcon,
} from '../components/Icons'

interface OutletContext {
  onOpenSidebar: () => void
}

interface LeftPanelProps {
  activeTool: string
  onSelectTool: (id: string) => void
}

interface VersionItemProps {
  label: string
  time: string
  preview: string
  isCurrent?: boolean
}

interface ToolbarButtonProps {
  children: ReactNode
}

const AI_TOOLS = [
  {
    id: 'summarize',
    icon: SummarizeIcon,
    label: 'Summarize',
    description: 'Condense the source context into key bullet points.',
  },
  {
    id: 'rewrite',
    icon: RewriteIcon,
    label: 'Rewrite',
    description: 'Adjust tone, style, and length of the content.',
  },
  {
    id: 'outline',
    icon: OutlineIcon,
    label: 'Outline',
    description: 'Generate a structured outline based on context.',
  },
]

const VERSIONS = [
  {
    id: 'current',
    label: 'Current Version',
    time: 'Just now',
    preview: 'The latest update to GPT-4 introduces enhanced logical reasoning, making it more reliable for comple\u2026',
    isCurrent: true,
  },
  {
    id: 'v2',
    label: 'V2 (Rewrite)',
    time: '10 mins ago',
    preview: "UX Pilot AI\u2019s recent GPT-4 release focuses on improving reasoning capabilities, specifically targeti\u2026",
  },
  {
    id: 'v1',
    label: 'V1 (Initial Gen)',
    time: '25 mins ago',
    preview: 'GPT-4 has a new update. It is better at reasoning now.',
  },
]

export default function PlaygroundPage() {
  const { onOpenSidebar } = useOutletContext<OutletContext>()
  const [activeTool, setActiveTool] = useState('rewrite')

  return (
    <>
      <header className="h-14 lg:h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border backdrop-blur-sm bg-surface/80 relative z-[2]">
        <div className="flex items-center gap-3">
          <button onClick={onOpenSidebar} className="lg:hidden text-muted hover:text-white transition-colors">
            <MenuIcon className="w-5 h-5" />
          </button>
          <h1 className="text-lg lg:text-xl font-semibold text-white tracking-tight">AI Playground</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
          <SendIcon className="w-3.5 h-3.5" />
          Send to Draft
        </button>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col xl:flex-row">
        <LeftPanel activeTool={activeTool} onSelectTool={setActiveTool} />
        <CenterEditor />
        <RightPanel />
      </div>
    </>
  )
}

function LeftPanel({ activeTool, onSelectTool }: LeftPanelProps) {
  return (
    <div className="xl:w-80 xl:shrink-0 xl:border-r border-border bg-surface-elevated xl:flex xl:flex-col xl:h-full overflow-y-auto xl:overflow-hidden">
      <div className="border-b border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <FileIcon className="w-3.5 h-3.5 text-accent" />
          <h2 className="text-sm font-semibold text-white">Source Context</h2>
        </div>

        <label className="text-xs font-medium text-muted block mb-3">Select Reference Material</label>

        <div className="relative mb-3">
          <select className="w-full appearance-none bg-surface-card border border-border rounded-lg px-3.5 py-3 pr-10 text-sm text-white outline-none focus:border-accent/50 transition-colors">
            <option>Latest AI News: &quot;GPT-4 Updates&quot;</option>
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-2.5 text-muted pointer-events-none" />
        </div>

        <div className="bg-surface-card border border-border rounded-lg p-3.5">
          <p className="text-xs text-muted leading-relaxed">
            &ldquo;UX Pilot AI has released a new update to GPT-4 that significantly improves its reasoning capabilities in complex&hellip;
          </p>
        </div>
      </div>

      <div className="p-5 xl:flex-1 xl:overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <SparklesIcon className="w-3.5 h-3.5 text-muted" />
          <h2 className="text-sm font-semibold text-white">AI Tools</h2>
        </div>

        <div className="flex flex-col gap-2">
          {AI_TOOLS.map(({ id, icon: Icon, label, description }) => {
            const isActive = activeTool === id
            return (
              <button
                key={id}
                onClick={() => onSelectTool(id)}
                className={`relative flex flex-col gap-1 p-3.5 bg-surface-card border rounded-lg text-left transition-colors overflow-hidden ${
                  isActive
                    ? 'border-accent/50'
                    : 'border-border hover:border-border/80'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-l" />
                )}
                <span className="flex items-center gap-2">
                  <Icon className="w-3 h-3 text-muted" />
                  <span className="text-sm font-medium text-white">{label}</span>
                </span>
                <span className="text-xs text-muted leading-relaxed">{description}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CenterEditor() {
  return (
    <div className="flex-1 min-w-0 flex flex-col border-b xl:border-b-0 xl:border-r border-border bg-surface">
      <div className="h-12 shrink-0 flex items-center gap-1 px-4 border-b border-border bg-surface-elevated">
        <ToolbarButton><BoldIcon className="w-2.5 h-3" /></ToolbarButton>
        <ToolbarButton><ItalicIcon className="w-2.5 h-3" /></ToolbarButton>
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton><ListUnorderedIcon className="w-3 h-3" /></ToolbarButton>
        <ToolbarButton><ListOrderedIcon className="w-3 h-3" /></ToolbarButton>
        <div className="w-px h-4 bg-border mx-1" />
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-3.5 py-1.5 bg-surface-card border border-border rounded text-xs font-medium text-white hover:border-border/80 transition-colors">
          <RewriteIcon className="w-3 h-3" />
          Generate
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <textarea
          placeholder="Start typing or use AI tools to generate content..."
          className="w-full h-full bg-transparent text-lg text-white placeholder:text-[#1f1f1f] font-serif leading-7 outline-none resize-none"
        />
      </div>
    </div>
  )
}

function ToolbarButton({ children }: ToolbarButtonProps) {
  return (
    <button className="w-8 h-8 flex items-center justify-center rounded text-muted hover:text-white transition-colors">
      {children}
    </button>
  )
}

function RightPanel() {
  return (
    <div className="xl:w-96 xl:shrink-0 bg-surface-elevated flex flex-col overflow-y-auto">
      <div className="h-12 shrink-0 flex items-center justify-between px-5 border-b border-border">
        <h2 className="text-sm font-semibold text-white">Version History</h2>
        <button className="text-xs font-medium text-accent hover:text-accent/80 transition-colors">Compare</button>
      </div>

      <div className="flex flex-col gap-4 p-5">
        {VERSIONS.map((version) => (
          <VersionItem key={version.id} {...version} />
        ))}
      </div>
    </div>
  )
}

function VersionItem({ label, time, preview, isCurrent }: VersionItemProps) {
  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-lg border ${
        isCurrent
          ? 'bg-surface-card border-accent/50'
          : 'border-border hover:border-border/80'
      } transition-colors`}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          {isCurrent && <span className="w-2 h-2 rounded-full bg-accent" />}
          <span className={`text-xs font-medium ${isCurrent ? 'text-white' : 'text-[#d4d4d8]'}`}>
            {label}
          </span>
        </span>
        <span className="text-[10px] text-muted">{time}</span>
      </div>
      <p className="text-xs text-muted leading-relaxed">{preview}</p>
      {!isCurrent && (
        <div className="pt-1">
          <button className="px-2 py-1 bg-border rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
            Restore
          </button>
        </div>
      )}
    </div>
  )
}
