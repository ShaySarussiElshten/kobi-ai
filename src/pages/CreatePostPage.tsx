import { ReactNode, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  MenuIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListUnorderedIcon,
  ListOrderedIcon,
  BlockquoteIcon,
  ImageIcon,
  CodeIcon,
  RewriteIcon,
  SummarizeIcon,
  ExpandIcon,
  SparklesIcon,
  EyeIcon,
  CalendarIcon,
  LinkChainIcon,
  CloseIcon,
} from '../components/Icons'

interface OutletContext {
  onOpenSidebar: () => void
}

interface HeaderProps {
  onOpenSidebar: () => void
}

interface MetaRowProps {
  icon: ReactNode
  label: string
  value: string
  isText?: boolean
}

interface OrganizationSectionProps {
  tags: string[]
  onRemoveTag: (tag: string) => void
}

interface ToolbarButtonProps {
  children: ReactNode
}

const INITIAL_TAGS = ['AI', 'Design']

export default function CreatePostPage() {
  const { onOpenSidebar } = useOutletContext<OutletContext>()

  return (
    <>
      <Header onOpenSidebar={onOpenSidebar} />
      <div className="flex-1 overflow-hidden flex flex-col xl:flex-row">
        <PostEditor />
        <MetaSidebar />
      </div>
    </>
  )
}

function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="h-14 lg:h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border backdrop-blur-sm bg-surface/80 relative z-[2]">
      <div className="flex items-center gap-3 sm:gap-4">
        <button onClick={onOpenSidebar} className="lg:hidden text-muted hover:text-white transition-colors">
          <MenuIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted">Posts</span>
          <ChevronRightIcon className="w-1.5 h-2.5 text-muted" />
          <span className="font-medium text-white">New Draft</span>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-surface-card border border-border rounded text-[10px] font-medium text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Autosaved
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center px-4 py-2 border border-border rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-colors">
          Preview
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <PenSmallIcon />
          Publish
        </button>
      </div>
    </header>
  )
}

function PenSmallIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 1L13 4L5 12L1 13L2 9L10 1Z" />
    </svg>
  )
}

function PostEditor() {
  return (
    <div className="flex-1 min-w-0 flex flex-col border-b xl:border-b-0 xl:border-r border-border bg-surface">
      <FormattingToolbar />
      <div className="flex-1 overflow-y-auto px-6 sm:px-10 lg:px-20 py-8 sm:py-10">
        <EditorContent />
      </div>
    </div>
  )
}

function FormattingToolbar() {
  return (
    <div className="h-12 shrink-0 flex items-center gap-1 px-4 border-b border-border bg-surface-elevated overflow-x-auto scrollbar-hide">
      <div className="flex items-center pr-2">
        <span className="text-sm font-medium text-white whitespace-nowrap">Paragraph</span>
        <ChevronDownIcon className="w-2.5 h-2 ml-1.5 text-muted" />
      </div>
      <ToolbarDivider />
      <ToolbarButton><BoldIcon className="w-2.5 h-3" /></ToolbarButton>
      <ToolbarButton><ItalicIcon className="w-2.5 h-3" /></ToolbarButton>
      <ToolbarButton><LinkIcon className="w-3 h-3" /></ToolbarButton>
      <ToolbarDivider />
      <ToolbarButton><ListOrderedIcon className="w-3.5 h-3" /></ToolbarButton>
      <ToolbarButton><ListUnorderedIcon className="w-3.5 h-3" /></ToolbarButton>
      <ToolbarButton><BlockquoteIcon className="w-3 h-3" /></ToolbarButton>
      <ToolbarDivider />
      <ToolbarButton><ImageIcon className="w-3 h-3" /></ToolbarButton>
      <ToolbarButton><CodeIcon className="w-3.5 h-3" /></ToolbarButton>

      <div className="flex-1" />

      <span className="hidden lg:block text-xs text-muted pr-2 whitespace-nowrap">Markdown Supported</span>
      <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-card border border-border rounded text-xs font-medium text-white hover:border-border/80 transition-colors whitespace-nowrap shrink-0">
        <SparklesIcon className="w-3 h-3" />
        Generate from AI News
      </button>
    </div>
  )
}

function ToolbarButton({ children }: ToolbarButtonProps) {
  return (
    <button className="w-8 h-8 flex items-center justify-center rounded text-muted hover:text-white transition-colors shrink-0">
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div className="w-px h-4 bg-border mx-1 shrink-0" />
}

function EditorContent() {
  return (
    <div className="max-w-[720px] mx-auto flex flex-col gap-6 relative">
      <input
        type="text"
        defaultValue="The Evolution of AI in Modern Design"
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white bg-transparent outline-none leading-tight font-sans"
      />

      <FloatingAIMenu />

      <div className="flex flex-col items-center justify-center h-48 rounded-xl border border-dashed border-border bg-surface-elevated">
        <div className="w-10 h-10 rounded-full bg-surface-card border border-border flex items-center justify-center mb-2">
          <ImageIcon className="w-4 h-4 text-muted" />
        </div>
        <span className="text-sm font-medium text-muted">Add Cover Image</span>
      </div>

      <div className="flex flex-col gap-6 font-serif text-lg text-[#d4d4d8] leading-[1.625]">
        <p>
          Artificial Intelligence has rapidly transitioned from a theoretical concept to a foundational tool in
          the design industry. Over the past year, we&apos;ve seen a massive shift in how product teams
          approach their workflows.
        </p>

        <blockquote className="border-l-2 border-accent bg-surface-card/50 pl-5 py-1">
          This transformation isn&apos;t just about automating repetitive tasks; it&apos;s about expanding the creative
          canvas. Tools that once required deep technical expertise are now accessible through
          conversational interfaces, allowing designers to iterate at the speed of thought.
        </blockquote>

        <p className="text-lg text-[#d4d4d8]">The Rise of Generative UI</p>

        <p>
          One of the most significant developments is the ability to generate entire user interface
          components from simple text descriptions. This process, often powered by large language
          models, bridges the gap between wireframing and high-fidelity prototyping.
        </p>

        <div className="flex flex-col">
          <p><strong className="font-bold">Rapid Prototyping:</strong> Ideas can be visualized instantly.</p>
          <p><strong className="font-bold">Consistency:</strong> AI can ensure new components adhere to established design systems.</p>
          <p><strong className="font-bold">Accessibility:</strong> Built-in checks can suggest improvements for contrast and semantic structure.</p>
        </div>
      </div>
    </div>
  )
}

function FloatingAIMenu() {
  return (
    <div className="inline-flex items-center gap-1 p-1.5 bg-surface-card border border-accent/50 rounded-lg shadow-lg w-fit">
      <button className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium text-white hover:bg-white/5 transition-colors">
        <RewriteIcon className="w-3 h-3" />
        Rewrite
      </button>
      <div className="w-px h-4 bg-border" />
      <button className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium text-white hover:bg-white/5 transition-colors">
        <SummarizeIcon className="w-3 h-3" />
        Summarize
      </button>
      <div className="w-px h-4 bg-border" />
      <button className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium text-white hover:bg-white/5 transition-colors">
        <ExpandIcon className="w-3 h-3" />
        Expand
      </button>
    </div>
  )
}

function MetaSidebar() {
  const [tags, setTags] = useState(INITIAL_TAGS)

  function handleRemoveTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <div className="xl:w-80 xl:shrink-0 bg-surface-elevated overflow-y-auto">
      <div className="p-5 flex flex-col gap-8">
        <StatusSection />
        <div className="h-px bg-border" />
        <OrganizationSection tags={tags} onRemoveTag={handleRemoveTag} />
        <div className="h-px bg-border" />
        <SeoSection />
      </div>
    </div>
  )
}

function StatusSection() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Status &amp; Visibility</h3>
      <div className="flex flex-col gap-3">
        <MetaRow icon={<EyeIcon className="w-3.5 h-3 text-muted" />} label="Visibility" value="Public" />
        <MetaRow icon={<CalendarIcon className="w-3.5 h-3 text-muted" />} label="Publish Date" value="Immediately" />
        <MetaRow icon={<LinkChainIcon className="w-3.5 h-3 text-muted" />} label="URL Slug" value="evolution-of-ai" isText />
      </div>
    </div>
  )
}

function MetaRow({ icon, label, value, isText }: MetaRowProps) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-surface-card border border-border rounded-lg">
      <span className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-white">{label}</span>
      </span>
      <span className={`text-sm ${isText ? 'text-muted' : 'text-accent'}`}>{value}</span>
    </div>
  )
}

function OrganizationSection({ tags, onRemoveTag }: OrganizationSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Organization</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted">Category</label>
          <div className="relative">
            <select className="w-full appearance-none bg-surface-card border border-border rounded-lg px-3.5 py-3 pr-10 text-sm text-white outline-none focus:border-accent/50 transition-colors">
              <option>Technology</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-2.5 text-muted pointer-events-none" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-muted">Tags</label>
          <div className="flex flex-wrap gap-2 items-center min-h-[46px] p-2.5 bg-surface-card border border-border rounded-lg">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 px-2.5 py-1 bg-border border border-border rounded text-xs text-[#d4d4d8]">
                {tag}
                <button onClick={() => onRemoveTag(tag)} className="text-muted hover:text-white transition-colors">
                  <CloseIcon className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add tag..."
              className="flex-1 min-w-[60px] bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SeoSection() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider">SEO &amp; Social</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted">Meta Description</label>
            <span className="text-[10px] text-muted">140/160</span>
          </div>
          <textarea
            placeholder="Write a brief summary for search engines..."
            className="w-full h-24 bg-surface-card border border-border rounded-lg p-3.5 text-sm text-white placeholder:text-[#3f3f46] outline-none resize-none focus:border-accent/50 transition-colors"
          />
        </div>
        <button className="flex items-center justify-center gap-2 py-2.5 bg-border border border-border rounded text-xs font-medium text-white hover:bg-border/80 transition-colors">
          <SparklesIcon className="w-3.5 h-3 text-muted" />
          Generate SEO Meta
        </button>
      </div>
    </div>
  )
}
