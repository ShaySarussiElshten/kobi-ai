import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import {
  MenuIcon,
  SearchIcon,
  EyeIcon,
  CommentIcon,
  CopyIcon,
  TrashIcon,
  PenIcon,
  MoreVerticalIcon,
  TrendUpIcon,
  ClockIcon,
  FileIcon,
  PlusIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
} from '../components/Icons.jsx'

const STATS = [
  { label: 'Total Views (30d)', value: '124,592', change: '+12.5%', sub: 'vs last month', glow: 'rgba(59,130,246,0.1)' },
  { label: 'Avg. Read Time', value: '4m 12s', change: '+0.5m', sub: 'vs last month', glow: 'rgba(168,85,247,0.1)' },
  { label: 'Published Posts', value: '48', change: null, sub: '4 drafts pending', glow: 'rgba(245,158,11,0.1)' },
]

const POSTS = [
  {
    id: 1,
    title: 'The Evolution of AI in Modern Design',
    edited: '2 hours ago',
    status: 'published',
    category: 'Technology',
    views: '1.2k',
    comments: '45',
    gradient: 'linear-gradient(143deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2))',
    isSelected: true,
  },
  {
    id: 2,
    title: '10 Figma Plugins for Faster Workflows',
    edited: 'Yesterday',
    status: 'scheduled',
    category: 'Design',
    views: null,
    comments: null,
    gradient: 'linear-gradient(143deg, rgba(245,158,11,0.2), rgba(239,68,68,0.2))',
    isSelected: false,
  },
  {
    id: 3,
    title: 'Understanding Tailwind CSS v4 Updates',
    edited: '3 days ago',
    status: 'draft',
    category: 'Development',
    views: null,
    comments: null,
    gradient: null,
    isSelected: true,
  },
  {
    id: 4,
    title: 'How to Write Better Prompts for AI',
    edited: 'Oct 12, 2023',
    status: 'published',
    category: 'AI',
    views: '8.4k',
    comments: '112',
    gradient: 'linear-gradient(37deg, rgba(16,185,129,0.2), rgba(20,184,166,0.2))',
    isSelected: false,
  },
]

const STATUS_STYLES = {
  published: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Published' },
  scheduled: { dot: 'bg-amber-400', text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Scheduled' },
  draft: { dot: 'bg-muted', text: 'text-muted', bg: 'bg-border border-border', label: 'Draft' },
}

export default function MyPostsPage() {
  const { onOpenSidebar } = useOutletContext()
  const [activeTab, setActiveTab] = useState(0)
  const selectedCount = POSTS.filter((p) => p.isSelected).length

  return (
    <>
      <header className="h-14 lg:h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border backdrop-blur-sm bg-surface/80 relative z-[2]">
        <div className="flex items-center gap-3">
          <button onClick={onOpenSidebar} className="lg:hidden text-muted hover:text-white transition-colors">
            <MenuIcon className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-white tracking-tight">My Posts</h1>
        </div>
        <Link
          to="/create"
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] no-underline"
        >
          <PlusIcon className="w-3.5 h-3.5" />
          New Post
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <StatsRow />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 sm:pt-6 pb-3">
          <TabToggle activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex items-center gap-3">
            <div className="relative w-48 sm:w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full bg-surface-elevated border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-accent/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {selectedCount > 0 && <BulkActionsBar count={selectedCount} />}

        <PostsTable />
        <Pagination />
      </div>
    </>
  )
}

function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {STATS.map((stat) => (
        <div key={stat.label} className="relative overflow-hidden rounded-xl border border-border bg-surface-elevated p-5 flex flex-col gap-4">
          <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[32px]" style={{ background: stat.glow }} />
          <div className="flex items-start justify-between relative">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted">{stat.label}</span>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-surface-card border border-border flex items-center justify-center">
              {stat.label.includes('Views') && <EyeIcon className="w-4 h-3.5 text-muted" />}
              {stat.label.includes('Read') && <ClockIcon className="w-3.5 h-3.5 text-muted" />}
              {stat.label.includes('Published') && <FileIcon className="w-3.5 h-3.5 text-muted" />}
            </div>
          </div>
          <div className="flex items-center gap-2 relative">
            {stat.change ? (
              <>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <TrendUpIcon className="w-3.5 h-3 text-emerald-400" />
                  {stat.change}
                </span>
                <span className="text-xs text-muted">{stat.sub}</span>
              </>
            ) : (
              <span className="text-xs font-medium text-muted">{stat.sub}</span>
            )}
          </div>
          <MiniChart type={stat.label.includes('Published') ? 'bar' : 'line'} color={stat.glow} />
        </div>
      ))}
    </div>
  )
}

function MiniChart({ type, color }) {
  if (type === 'bar') {
    const heights = [18, 30, 24, 42, 36, 54, 24]
    return (
      <div className="flex items-end gap-1 h-[60px]">
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: h,
              background: i === 5 ? 'rgba(245,158,11,0.5)' : '#141414',
            }}
          />
        ))}
      </div>
    )
  }
  return (
    <div className="h-[60px] relative">
      <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none" fill="none">
        <path
          d="M0 45 Q30 30, 60 35 Q90 40, 120 25 Q150 10, 180 20 Q210 30, 240 15 Q270 5, 300 10"
          stroke={color.replace('0.1', '0.6')}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 45 Q30 30, 60 35 Q90 40, 120 25 Q150 10, 180 20 Q210 30, 240 15 Q270 5, 300 10 L300 60 L0 60Z"
          fill={color.replace('0.1', '0.05')}
        />
      </svg>
    </div>
  )
}

function TabToggle({ activeTab, onTabChange }) {
  const tabs = ['Published (48)', 'Drafts (4)']
  return (
    <div className="flex items-center gap-1 p-1.5 bg-surface-elevated border border-border rounded-lg">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onTabChange(i)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === i
              ? 'bg-border text-white shadow-sm'
              : 'text-muted hover:text-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

function BulkActionsBar({ count }) {
  return (
    <div className="flex items-center justify-between p-3.5 mb-4 bg-surface-card border border-accent/30 rounded-lg">
      <span className="text-sm font-medium text-white">{count} posts selected</span>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-border border border-border rounded text-xs font-medium text-white hover:bg-border/80 transition-colors">
          <CopyIcon className="w-3 h-3" />
          Duplicate
        </button>
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 rounded text-xs font-medium text-white hover:bg-red-500/20 transition-colors">
          <TrashIcon className="w-3 h-3" />
          Delete
        </button>
      </div>
    </div>
  )
}

function PostsTable() {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated overflow-hidden">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              <th className="w-12 p-4"><div className="w-4 h-4 rounded-sm bg-accent" /></th>
              <th className="text-left p-4 text-xs font-semibold text-muted uppercase tracking-wider">Post Details</th>
              <th className="text-left p-4 text-xs font-semibold text-muted uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-xs font-semibold text-muted uppercase tracking-wider">Category</th>
              <th className="text-left p-4 text-xs font-semibold text-muted uppercase tracking-wider">Metrics</th>
              <th className="text-right p-4 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {POSTS.map((post, i) => (
              <tr key={post.id} className={`border-t border-border ${i % 2 === 0 ? 'bg-surface-card/20' : ''}`}>
                <td className="p-4">
                  <div className={`w-4 h-4 rounded-sm ${post.isSelected ? 'bg-accent' : 'bg-white border border-gray-500'}`} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 rounded shrink-0 flex items-center justify-center overflow-hidden" style={{ background: post.gradient || '#1f1f1f' }}>
                      <FileIcon className="w-3.5 h-3.5 text-muted" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{post.title}</p>
                      <p className="text-xs text-muted">Last edited: {post.edited}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4"><StatusBadge status={post.status} /></td>
                <td className="p-4">
                  <span className="px-2.5 py-1 text-xs text-muted bg-surface-card border border-border rounded">{post.category}</span>
                </td>
                <td className="p-4">
                  <div className={`flex items-center gap-4 ${!post.views ? 'opacity-50' : ''}`}>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <EyeIcon className="w-3.5 h-3 text-muted" />
                      {post.views || '--'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <CommentIcon className="w-3 h-3 text-muted" />
                      {post.comments || '--'}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="w-7 h-7 flex items-center justify-center bg-surface-card border border-border rounded hover:border-border/80 transition-colors">
                      <PenIcon className="w-3 h-3 text-muted" />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center bg-surface-card border border-border rounded hover:border-border/80 transition-colors">
                      <MoreVerticalIcon className="w-1 h-3 text-muted" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden">
        {POSTS.map((post, i) => (
          <div key={post.id} className={`p-4 flex flex-col gap-3 ${i > 0 ? 'border-t border-border' : ''}`}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded shrink-0 flex items-center justify-center" style={{ background: post.gradient || '#1f1f1f' }}>
                <FileIcon className="w-3.5 h-3.5 text-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{post.title}</p>
                <p className="text-xs text-muted mt-0.5">Last edited: {post.edited}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={post.status} />
              <span className="px-2 py-0.5 text-[10px] text-muted bg-surface-card border border-border rounded">{post.category}</span>
              {post.views && (
                <span className="flex items-center gap-1 text-xs text-muted">
                  <EyeIcon className="w-3 h-2.5" /> {post.views}
                </span>
              )}
              {post.comments && (
                <span className="flex items-center gap-1 text-xs text-muted">
                  <CommentIcon className="w-3 h-3" /> {post.comments}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

function Pagination() {
  const pages = [1, 2, 3, '...', 5]
  return (
    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
      <span className="text-xs text-muted">Showing 1 to 10 of 48 results</span>
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted opacity-50">
          <ArrowLeftIcon className="w-3 h-3" />
        </button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={i} className="px-1 text-muted text-sm">...</span>
          ) : (
            <button
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium ${
                p === 1
                  ? 'bg-accent/10 border border-accent text-accent'
                  : 'border border-border text-muted hover:text-white'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted hover:text-white">
          <ChevronRightIcon className="w-2 h-3" />
        </button>
      </div>
    </div>
  )
}
