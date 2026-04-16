import { ReactNode, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  SearchIcon,
  SparklesIcon,
  BookmarkIcon,
  ChevronDownIcon,
  SummarizeIcon,
  RewriteIcon,
  ExternalLinkIcon,
  MenuIcon,
  LoaderIcon,
} from '../components/Icons'

interface OutletContext {
  onOpenSidebar: () => void
}

interface ResultCardProps {
  source: string
  time: string
  title: string[]
  description: string
  tags: string[]
  avatar?: string
  author?: string
  hasSummary?: boolean
  summary?: string[]
  isExpanded: boolean
  onToggleSummary: () => void
}

interface TabBarProps {
  activeTab: number
  onTabChange: (index: number) => void
}

interface HighlightProps {
  children: ReactNode
}

const AUTHOR_1 = 'https://www.figma.com/api/mcp/asset/ad62e520-2859-4089-9e47-fe0ee2deb2c0'
const AUTHOR_2 = 'https://www.figma.com/api/mcp/asset/8ce7752b-228b-47ee-aa24-1fb5b0936439'

const FILTERS = [
  { label: 'Type: News', isActive: true },
  { label: 'Category: All', isActive: false },
  { label: 'Author: Any', isActive: false },
  { label: 'Date: Past Month', isActive: false },
]

const TABS = [
  { label: 'All Results', count: 124 },
  { label: 'News', count: 89 },
  { label: 'Posts', count: 35 },
]

const RESULTS = [
  {
    id: 1,
    source: 'ArXiv',
    time: '2 days ago',
    title: ['New benchmark reveals flaws in current ', 'LLM reasoning', ' evaluation methods'],
    description:
      'A team of researchers has published a comprehensive new benchmark specifically designed to test the depth of reasoning in large language models, finding that many current evaluation methods...',
    tags: ['Research', 'Benchmarks'],
    avatar: AUTHOR_1,
    author: 'Dr. Sarah Chen',
  },
  {
    id: 2,
    source: 'AI Research Weekly',
    time: '3 days ago',
    title: ['Scaling ', 'LLM reasoning capabilities', ' through synthetic data generation'],
    description:
      'This paper introduces a novel approach to generating high-quality synthetic training data specifically targeted at improving the logical and multi-step reasoning capabilities of large language models...',
    tags: ['Research', 'Training'],
    avatar: AUTHOR_2,
    author: 'Marcus Webb',
    hasSummary: true,
    summary: [
      'Synthetic data generated with structured reasoning chains improves LLM performance by 23% on complex multi-step tasks.',
      'The approach is cost-effective, reducing the need for expensive human-annotated reasoning datasets.',
      'Models trained with this method show improved generalization to unseen reasoning domains.',
    ],
  },
  {
    id: 3,
    source: 'TechCrunch',
    time: '5 days ago',
    title: ['Industry leaders debate the future of ', 'LLM reasoning', ' at AI Summit 2024'],
    description:
      'At the annual AI Summit, leading researchers and industry figures discussed the current limitations and future potential of reasoning in AI systems, with a focus on practical applications...',
    tags: ['Industry', 'Events'],
  },
]

export default function SearchPage() {
  const { onOpenSidebar } = useOutletContext<OutletContext>()
  const [activeTab, setActiveTab] = useState(0)
  const [expandedSummary, setExpandedSummary] = useState<number | null>(2)

  return (
    <>
      <header className="shrink-0 border-b border-border backdrop-blur-sm bg-surface/80 relative z-[2]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <button onClick={onOpenSidebar} className="lg:hidden text-muted hover:text-white transition-colors">
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-tight leading-7">Search Results</h1>
              <p className="text-xs text-muted hidden sm:block">Found 124 results for &lsquo;LLM reasoning capabilities&rsquo;</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
        <div className="max-w-[820px]">
          <SearchBar />
          <FilterChips />
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex flex-col gap-4 sm:gap-5 mt-5 sm:mt-6">
            {RESULTS.map((result) => (
              <ResultCard
                key={result.id}
                {...result}
                isExpanded={expandedSummary === result.id}
                onToggleSummary={() => setExpandedSummary(expandedSummary === result.id ? null : result.id)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-10">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-card border border-border rounded-lg text-sm text-muted hover:text-white hover:border-border/80 transition-colors">
              <LoaderIcon className="w-3.5 h-3.5" />
              Load More Results
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function SearchBar() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 rounded-xl border border-white/5 bg-[rgba(10,10,10,0.6)] backdrop-blur-sm">
      <div className="flex items-center gap-2.5 flex-1 min-w-0 pl-2 sm:pl-3">
        <SearchIcon className="w-4 h-4 text-muted shrink-0" />
        <input
          type="text"
          defaultValue="LLM reasoning capabilities"
          className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
        />
      </div>
      <button className="px-4 sm:px-6 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors shrink-0">
        Search
      </button>
    </div>
  )
}

function FilterChips() {
  return (
    <div className="flex items-center gap-2 mt-4 sm:mt-5 overflow-x-auto pb-1 scrollbar-hide">
      {FILTERS.map(({ label, isActive }) => (
        <button
          key={label}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
            isActive
              ? 'border border-accent/50 bg-accent/10 text-white'
              : 'border border-border bg-surface-card text-muted hover:text-white'
          }`}
        >
          {label}
          <ChevronDownIcon className="w-2.5 h-2" />
        </button>
      ))}
      <button className="text-xs text-accent hover:text-accent/80 transition-colors whitespace-nowrap pl-1">
        Clear Filters
      </button>
    </div>
  )
}

function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex items-center justify-between mt-5 sm:mt-6 border-b border-border">
      <div className="flex gap-0">
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => onTabChange(i)}
            className={`px-3 sm:px-4 py-3 text-sm transition-colors relative ${
              activeTab === i
                ? 'text-white font-medium'
                : 'text-muted hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
            {activeTab === i && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t" />
            )}
          </button>
        ))}
      </div>
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted pb-2">
        Sort by:
        <button className="flex items-center gap-1 text-white">
          Relevance
          <ChevronDownIcon className="w-2.5 h-2" />
        </button>
      </div>
    </div>
  )
}

function Highlight({ children }: HighlightProps) {
  return (
    <span className="bg-accent/10 text-accent rounded px-1">{children}</span>
  )
}

function ResultCard({ source, time, title, description, tags, avatar, author, hasSummary, summary, isExpanded, onToggleSummary }: ResultCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5 rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted">
          <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="font-medium">{source}</span>
          <span className="text-border">&#8226;</span>
          <span>{time}</span>
        </div>
        <BookmarkIcon className="w-4 h-4 text-muted hover:text-white cursor-pointer transition-colors shrink-0" />
      </div>

      <h3 className="text-base font-medium text-white leading-snug">
        {title.map((segment, i) =>
          i % 2 === 1 ? <Highlight key={i}>{segment}</Highlight> : <span key={i}>{segment}</span>
        )}
      </h3>

      <p className="text-sm text-muted leading-relaxed">{description}</p>

      {hasSummary && isExpanded && (
        <div className="relative border border-border rounded-lg p-4 mt-1">
          <span className="absolute -top-2.5 left-3 px-2 bg-surface-elevated text-xs text-accent font-medium flex items-center gap-1.5">
            <SparklesIcon className="w-3 h-3" />
            AI Summary
          </span>
          <ul className="flex flex-col gap-2 text-sm text-[#d4d4d8] leading-relaxed pl-4 list-disc mt-1">
            {summary!.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <button onClick={onToggleSummary} className="text-xs text-muted hover:text-white transition-colors">
              Hide Summary
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors">
              <RewriteIcon className="w-3 h-3" />
              Rewrite
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-[10px] text-muted bg-surface-card border border-border rounded-md">
                {tag}
              </span>
            ))}
          </div>
          {avatar && (
            <div className="flex items-center gap-2">
              <img src={avatar} alt={author} className="w-5 h-5 rounded-full border border-border object-cover" />
              <span className="text-xs text-muted">{author}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          {hasSummary && !isExpanded && (
            <button onClick={onToggleSummary} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <SummarizeIcon className="w-3 h-3" />
              AI Summary
            </button>
          )}
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <SummarizeIcon className="w-3 h-3" />
            Summarize
          </button>
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <RewriteIcon className="w-3 h-3" />
            Rewrite
          </button>
        </div>
      </div>
    </div>
  )
}
