import { Link, useOutletContext } from 'react-router-dom'
import {
  SearchIcon,
  FilterIcon,
  ClockIcon,
  SparklesIcon,
  BookmarkIcon,
  ShareIcon,
  SummarizeIcon,
  RewriteIcon,
  NewPostIcon,
  OutlineIcon,
  TrendingIcon,
  LoaderIcon,
  ExternalLinkIcon,
  MenuIcon,
} from '../components/Icons.jsx'

const HERO_IMAGE = 'https://www.figma.com/api/mcp/asset/d647a208-8b3f-429a-a079-d291b93b3814'

const FEATURED = {
  source: 'TechCrunch',
  time: '2 hours ago',
  title: 'UX Pilot AI Announces GPT-4 Omni: Real-time Audio and Vision Capabilities',
  description:
    'The new flagship model integrates text, vision, and audio natively, offering dramatic improvements in latency and reasoning across modalities. Developers will gain access to the new API starting ne...',
  tags: ['LLMs', 'UX Pilot AI'],
}

const FEED_CARDS = [
  {
    id: 'copilot-workspace',
    source: 'GitHub Blog',
    time: '5 hours ago',
    title: 'Copilot Workspace: The new developer environment',
    description:
      'GitHub introduces a new AI-native environment designed to help developers go from an issue to a pull request with AI assistance at every step.',
    tags: ['Developer Tools'],
  },
  {
    id: 'scaling-laws',
    source: 'ArXiv',
    time: '8 hours ago',
    title: 'Scaling Laws for Reward Model Overoptimization',
    description:
      'A new paper explores the phenomenon of reward hacking in RLHF, proposing new scaling laws to predict when models will start optimizing for proxy metrics rather than true human preference.',
    tags: ['Research', 'RLHF'],
  },
]

const TRENDING = ['#GPT4o', '#OpenSourceAI', '#RAG', '#AI Regulation', '#LocalLLMs']

const READING_LIST = [
  { title: 'Meta releases Llama 3 technical report detailing training methodology', date: 'Added yesterday' },
  { title: 'How to implement semantic routing in your LLM application', date: 'Added 3 days ago' },
]

export default function FeedPage() {
  const { onOpenSidebar } = useOutletContext()

  return (
    <>
      <header className="shrink-0 border-b border-border backdrop-blur-sm bg-surface/80 relative z-[2]">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16 lg:h-20">
          <div className="flex items-center gap-3">
            <button onClick={onOpenSidebar} className="lg:hidden text-muted hover:text-white transition-colors">
              <MenuIcon className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-tight leading-7">AI News Feed</h1>
              <p className="text-xs text-muted hidden sm:block">Curated updates from the frontier of AI.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative w-40 sm:w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted" />
              <input
                type="text"
                placeholder="Search news..."
                className="w-full bg-surface-card border border-border rounded-lg pl-9 pr-4 py-2 sm:py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 bg-surface-card border border-border rounded-lg text-sm text-muted hover:text-white transition-colors">
              <FilterIcon className="w-3 h-3" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button className="hidden md:flex items-center gap-2 px-3.5 py-2.5 bg-surface-card border border-border rounded-lg text-sm text-muted hover:text-white transition-colors">
              <ClockIcon className="w-3 h-3" />
              Latest
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 max-w-[1152px]">
          <div className="flex-1 min-w-0 flex flex-col gap-4 sm:gap-6">
            <FeaturedCard />
            {FEED_CARDS.map((card) => (
              <FeedCard key={card.id} {...card} />
            ))}
            <div className="flex items-center justify-center py-8 gap-2 text-sm text-muted">
              <LoaderIcon className="w-3.5 h-3.5" />
              Loading more news...
            </div>
          </div>

          <div className="xl:w-80 xl:shrink-0 flex flex-col gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
              <QuickActions />
              <TrendingTopics />
            </div>
            <ReadingList />
          </div>
        </div>
      </div>
    </>
  )
}

function FeaturedCard() {
  return (
    <Link
      to="/article/featured"
      className="flex flex-col sm:flex-row overflow-hidden rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm hover:border-border/80 transition-colors no-underline"
    >
      <div className="h-48 sm:h-auto sm:w-[250px] shrink-0 bg-surface-card relative overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
        <span className="absolute top-3 left-3 px-2 py-1 bg-accent rounded text-[10px] font-semibold text-white uppercase tracking-wider">
          Featured
        </span>
      </div>
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-2 pb-4">
          <div className="flex items-center gap-2 text-xs text-muted">
            <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">{FEATURED.source}</span>
            <span className="text-border">&#8226;</span>
            <span>{FEATURED.time}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug pt-1">
            {FEATURED.title}
          </h2>
          <p className="text-sm text-muted leading-5 line-clamp-3">{FEATURED.description}</p>
        </div>
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <div className="flex gap-2">
            {FEATURED.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs text-muted bg-surface-card border border-border rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-muted">
            <SparklesIcon className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <ShareIcon className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
            <BookmarkIcon className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function FeedCard({ source, time, title, description, tags }) {
  return (
    <Link
      to="/article/featured"
      className="flex flex-col gap-2 p-4 sm:p-5 rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm hover:border-border/80 transition-colors no-underline"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted">
          <ExternalLinkIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="font-medium">{source}</span>
          <span className="text-border">&#8226;</span>
          <span>{time}</span>
        </div>
      </div>
      <h3 className="text-base font-medium text-white pt-1">{title}</h3>
      <p className="text-sm text-muted leading-5">{description}</p>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-[10px] text-muted bg-surface-card border border-border rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted">
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <SummarizeIcon className="w-3 h-3" />
            Summarize
          </button>
          <button className="flex items-center gap-1.5 hover:text-white transition-colors">
            <RewriteIcon className="w-3 h-3" />
            Rewrite
          </button>
          <BookmarkIcon className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>
    </Link>
  )
}

function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4">
      <h3 className="text-sm font-medium text-white">Quick Actions</h3>
      <div className="flex flex-col gap-2">
        <button className="flex items-center gap-3 p-3 sm:p-3.5 bg-surface-card border border-border rounded-lg hover:border-accent/30 transition-colors text-left">
          <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center shrink-0">
            <NewPostIcon className="w-3.5 h-3.5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">New Blank Post</p>
            <p className="text-xs text-muted">Start from scratch</p>
          </div>
        </button>
        <button className="flex items-center gap-3 p-3 sm:p-3.5 bg-surface-card border border-border rounded-lg hover:border-white/10 transition-colors text-left">
          <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0">
            <OutlineIcon className="w-4 h-3.5 text-muted" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Generate Outline</p>
            <p className="text-xs text-muted">Use AI to structure</p>
          </div>
        </button>
      </div>
    </div>
  )
}

function TrendingTopics() {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Trending Topics</h3>
        <TrendingIcon className="w-3.5 h-3 text-muted" />
      </div>
      <div className="flex flex-wrap gap-2">
        {TRENDING.map((tag) => (
          <span key={tag} className="px-3.5 py-1.5 text-xs text-muted bg-surface-card border border-border rounded-lg hover:text-white cursor-pointer transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function ReadingList() {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Reading List</h3>
        <span className="text-xs text-accent cursor-pointer hover:underline">View All</span>
      </div>
      <div className="flex flex-col gap-4">
        {READING_LIST.map((item) => (
          <div key={item.title} className="flex flex-col gap-1">
            <p className="text-sm text-muted leading-snug">{item.title}</p>
            <p className="text-[10px] text-border">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
