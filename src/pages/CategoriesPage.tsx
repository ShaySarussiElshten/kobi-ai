import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  SearchIcon,
  MenuIcon,
  BookmarkIcon,
  ShareIcon,
  ExternalLinkIcon,
  SparklesIcon,
} from '../components/Icons'

interface OutletContext {
  onOpenSidebar: () => void
}

interface IconProps {
  className?: string
}

interface Story {
  source: string
  time: string
  title: string
  tag: string
}

interface Category {
  id: string
  name: string
  icon: React.ComponentType<IconProps>
  posts: string
  followers: string
  description: string
  isFollowing: boolean
  tags: string[]
  topNews: string
  stories: Story[]
}

interface CategoryCardProps {
  category: Category
  isSelected: boolean
  isFollowing: boolean
  onSelect: () => void
  onToggle: () => void
}

interface CategoryDetailProps {
  category: Category
  isFollowing: boolean
  onToggle: () => void
}

interface ToggleProps {
  isOn: boolean
  onToggle: () => void
}

const CATEGORIES = [
  {
    id: 'llm',
    name: 'Large Language Models',
    icon: BrainIcon,
    posts: '1,245',
    followers: '8.4k',
    description: 'Updates on GPT-4, UX Pilot, Llama, and other foundational models shaping the future of generative AI.',
    isFollowing: true,
    tags: ['#GPT4o', '#Claude3', '#Llama3', '#PromptEngineering', '#FineTuning'],
    topNews: 'UX Pilot AI announces new multimod...',
    stories: [
      { source: 'TechCrunch', time: '2h ago', title: 'UX Pilot AI Announces GPT-4 Omni: Real-time Audio and Vision', tag: 'LLMs' },
      { source: 'AI Weekly', time: 'Yesterday', title: 'Meta releases Llama 3 technical report detailing training methodology', tag: 'Open Source' },
    ],
  },
  {
    id: 'devtools',
    name: 'Developer Tools',
    icon: CodeIcon,
    posts: '892',
    followers: '5.1k',
    description: 'AI-assisted coding, copilot integrations, and development environments optimize...',
    isFollowing: true,
    tags: ['#Copilot', '#VSCode', '#Cursor', '#CodeGen'],
    topNews: 'GitHub Copilot Workspace enters pu...',
    stories: [
      { source: 'GitHub Blog', time: '5h ago', title: 'Copilot Workspace: The new developer environment', tag: 'Developer Tools' },
    ],
  },
  {
    id: 'research',
    name: 'AI Research',
    icon: ResearchIcon,
    posts: '2,104',
    followers: '12.3k',
    description: 'Deep learning papers, methodology breakthroughs, and theoretical...',
    isFollowing: false,
    tags: ['#RLHF', '#ScalingLaws', '#Transformers'],
    topNews: 'Scaling laws for reward model overo...',
    stories: [
      { source: 'ArXiv', time: '8h ago', title: 'Scaling Laws for Reward Model Overoptimization', tag: 'Research' },
    ],
  },
  {
    id: 'ethics',
    name: 'AI Ethics & Policy',
    icon: ShieldIcon,
    posts: '645',
    followers: '3.2k',
    description: 'Discussions on regulation, bias, safety, alignment, and the societal impact of AI...',
    isFollowing: false,
    tags: ['#AIAct', '#Alignment', '#Bias', '#Safety'],
    topNews: 'EU AI Act officially enters into force',
    stories: [
      { source: 'Reuters', time: '1d ago', title: 'EU AI Act officially enters into force', tag: 'Regulation' },
    ],
  },
]

const TABS = ['All Categories', 'Following', 'Trending']

export default function CategoriesPage() {
  const { onOpenSidebar } = useOutletContext<OutletContext>()
  const [activeTab, setActiveTab] = useState('All Categories')
  const [selectedId, setSelectedId] = useState('llm')
  const [following, setFollowing] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {}
    CATEGORIES.forEach((c) => { map[c.id] = c.isFollowing })
    return map
  })

  const selected = CATEGORIES.find((c) => c.id === selectedId)

  const handleToggle = (id: string) => {
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filtered = activeTab === 'Following'
    ? CATEGORIES.filter((c) => following[c.id])
    : CATEGORIES

  return (
    <>
      <header className="shrink-0 border-b border-border backdrop-blur-sm bg-surface/80 relative z-[2]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <button onClick={onOpenSidebar} className="lg:hidden text-muted hover:text-white transition-colors">
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-tight leading-7">Categories & Tags</h1>
              <p className="text-xs text-muted hidden sm:block">Manage your interests and personalize your feed.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative w-40 sm:w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted" />
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full bg-surface-card border border-border rounded-lg pl-9 pr-4 py-2 sm:py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-accent rounded-lg text-sm font-medium text-white hover:bg-accent/90 transition-colors">
              <PlusIcon className="w-3 h-3" />
              <span className="hidden sm:inline">New Category</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
        <div className="flex gap-8 max-w-[1280px]">
          <div className="flex-1 min-w-0">
            <div className="border-b border-border flex gap-6 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'text-white border-accent'
                      : 'text-muted border-transparent hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  isSelected={selectedId === cat.id}
                  isFollowing={following[cat.id]}
                  onSelect={() => setSelectedId(cat.id)}
                  onToggle={() => handleToggle(cat.id)}
                />
              ))}
            </div>

            {selected && (
              <div className="xl:hidden mt-6">
                <CategoryDetail category={selected} isFollowing={following[selected.id]} onToggle={() => handleToggle(selected.id)} />
              </div>
            )}
          </div>

          {selected && (
            <div className="w-[400px] shrink-0 hidden xl:block">
              <div className="sticky top-0">
                <CategoryDetail category={selected} isFollowing={following[selected.id]} onToggle={() => handleToggle(selected.id)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function CategoryCard({ category, isSelected, isFollowing, onSelect, onToggle }: CategoryCardProps) {
  const Icon = category.icon

  return (
    <button
      onClick={onSelect}
      className={`text-left flex flex-col gap-4 p-5 rounded-xl border backdrop-blur-sm transition-colors overflow-hidden relative ${
        isSelected
          ? 'bg-surface-card border-accent/50'
          : 'bg-surface-elevated/60 border-border hover:border-border/80'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-accent/10 blur-[20px] pointer-events-none" />
      )}

      <div className="flex items-start justify-between relative">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            isSelected
              ? 'bg-accent/10 border border-accent/20'
              : 'bg-surface-card border border-border'
          }`}>
            <Icon className={`w-[18px] h-[18px] ${isSelected ? 'text-accent' : 'text-muted'}`} />
          </div>
          <div>
            <p className="text-base font-medium text-white">{category.name}</p>
            <p className="text-xs text-muted">{category.posts} posts &bull; {category.followers} followers</p>
          </div>
        </div>
        <Toggle isOn={isFollowing} onToggle={onToggle} />
      </div>

      <p className="text-sm text-muted leading-5 line-clamp-2">{category.description}</p>

      <div className="bg-surface border border-border rounded-lg p-3.5 flex flex-col gap-1">
        <div className="flex items-center gap-1 text-xs text-muted">
          <TrendUpSmallIcon className="w-2.5 h-3" />
          <span className="font-medium">Top News</span>
        </div>
        <p className="text-sm text-white truncate">{category.topNews}</p>
      </div>
    </button>
  )
}

function CategoryDetail({ category, isFollowing, onToggle: _onToggle }: CategoryDetailProps) {
  const Icon = category.icon

  return (
    <div className="bg-surface-elevated border border-border rounded-xl overflow-hidden flex flex-col">
      <div className="p-6 border-b border-border flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-accent/10 blur-[20px] pointer-events-none" />
        <div className="flex items-center justify-between relative">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            isFollowing
              ? 'bg-accent/10 border border-accent/20'
              : 'bg-surface-card border border-border'
          }`}>
            <Icon className={`w-5 h-5 ${isFollowing ? 'text-accent' : 'text-muted'}`} />
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-card border border-border text-muted hover:text-white transition-colors">
              <ShareIcon className="w-3 h-3" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-card border border-border text-muted hover:text-white transition-colors">
              <MoreIcon className="w-3 h-3" />
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white pt-2">{category.name}</h2>
        <p className="text-sm text-muted leading-5">{category.description}</p>

        <div className="flex items-center gap-4 pt-2 text-xs text-muted">
          <span className="flex items-center gap-1">
            <FileSmallIcon className="w-2.5 h-3" />
            {category.posts} Posts
          </span>
          <span className="flex items-center gap-1">
            <UsersSmallIcon className="w-4 h-3" />
            {category.followers} Followers
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6 flex-1">
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider">Related Tags</h3>
          <div className="flex flex-wrap gap-2">
            {category.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs text-muted bg-surface-card border border-border rounded-md hover:text-white cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider">Top Stories</h3>
            <span className="text-xs text-accent cursor-pointer hover:underline">View All</span>
          </div>
          <div className="flex flex-col gap-4">
            {category.stories.map((story, i) => (
              <div key={i} className={`flex flex-col gap-1 ${i > 0 ? 'border-t border-border pt-4' : ''}`}>
                <div className="flex items-center gap-2 text-[10px] text-muted">
                  <ExternalLinkIcon className="w-2.5 h-2.5" />
                  <span className="font-medium">{story.source}</span>
                  <span className="text-border">&bull;</span>
                  <span>{story.time}</span>
                </div>
                <p className="text-sm font-medium text-white leading-snug">{story.title}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] text-muted bg-surface-card border border-border rounded">
                    {story.tag}
                  </span>
                  <div className="flex items-center gap-2 text-muted">
                    <SparklesIcon className="w-2.5 h-2.5 hover:text-white cursor-pointer transition-colors" />
                    <BookmarkIcon className="w-2.5 h-2.5 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-surface-card border border-border rounded-lg text-sm font-medium text-white hover:border-border/80 transition-colors">
          <FilterSmallIcon className="w-3.5 h-3.5" />
          Filter Feed by Category
        </button>
      </div>
    </div>
  )
}

function Toggle({ isOn, onToggle }: ToggleProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${
        isOn ? 'bg-accent' : 'bg-[#d1d5db]'
      }`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white border-4 transition-all ${
        isOn ? 'left-[18px] border-accent' : 'left-0.5 border-border'
      }`} />
    </button>
  )
}

function BrainIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3C7.5 3 5 5 5 8C5 10 6 11.5 7 12.5V17H13V12.5C14 11.5 15 10 15 8C15 5 12.5 3 10 3Z" />
      <path d="M7.5 14H12.5" />
      <path d="M8 11C8 11 9 10 10 10C11 10 12 11 12 11" />
    </svg>
  )
}

function CodeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 5L2 10L7 15" />
      <path d="M17 5L22 10L17 15" />
      <path d="M14 3L10 17" />
    </svg>
  )
}

function ResearchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 18 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2H13L16 5V18H2V2H5Z" />
      <path d="M5 8H13" />
      <path d="M5 12H10" />
    </svg>
  )
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 6V11C3 15.5 7 19 12 20C17 19 21 15.5 21 11V6L12 2Z" />
      <path d="M9 10L11 12L15 8" />
    </svg>
  )
}

function PlusIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 1V11" />
      <path d="M1 6H11" />
    </svg>
  )
}

function MoreIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="currentColor">
      <circle cx="2" cy="6" r="1.5" />
      <circle cx="6" cy="6" r="1.5" />
      <circle cx="10" cy="6" r="1.5" />
    </svg>
  )
}

function TrendUpSmallIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 9L5 5L7 7L11 3" />
      <path d="M8 3H11V6" />
    </svg>
  )
}

function FileSmallIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 10 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1H7L9 3V11H1V1Z" />
      <path d="M7 1V3H9" />
    </svg>
  )
}

function UsersSmallIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="4" r="2.5" />
      <path d="M1 11C1 8.5 3 7 6 7C9 7 11 8.5 11 11" />
      <circle cx="12" cy="4" r="2" />
      <path d="M12 7C14 7 15 8.5 15 11" />
    </svg>
  )
}

function FilterSmallIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 2H13L8.5 7.5V12L5.5 11V7.5L1 2Z" />
    </svg>
  )
}
