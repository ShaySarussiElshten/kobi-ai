import { Link, useOutletContext } from 'react-router-dom'
import {
  ArrowLeftIcon,
  BookmarkIcon,
  ShareIcon,
  ChevronRightIcon,
  SummarizeIcon,
  SparklesIcon,
  RewriteIcon,
  BoltIcon,
  MenuIcon,
} from '../components/Icons'

interface OutletContext {
  onOpenSidebar: () => void
}

const HERO_IMAGE = 'https://www.figma.com/api/mcp/asset/28b753e4-67f6-4066-9a73-a931286eefe6'
const AUTHOR_IMG = 'https://www.figma.com/api/mcp/asset/ad62e520-2859-4089-9e47-fe0ee2deb2c0'
const COMMENTER_IMG = 'https://www.figma.com/api/mcp/asset/8ce7752b-228b-47ee-aa24-1fb5b0936439'
const CURRENT_USER_IMG = 'https://www.figma.com/api/mcp/asset/de74e51a-ebf8-4007-850b-e9bbafe20dca'

const AI_ACTIONS = [
  { icon: SummarizeIcon, label: 'Summarize Article' },
  { icon: SparklesIcon, label: 'Generate Key Takeaways' },
  { icon: RewriteIcon, label: 'Simplify Language' },
  { icon: BoltIcon, label: 'Extract Facts' },
]

const RELATED = [
  { type: 'AI NEWS', title: 'New benchmark reveals flaws in current LLM reasoning evaluation...' },
  { type: 'POST', title: 'Implementing Tree-of-Thoughts in Python: A practical guide' },
]

export default function ArticlePage() {
  const { onOpenSidebar } = useOutletContext<OutletContext>()

  return (
    <>
      <header className="h-14 lg:h-16 shrink-0 flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-border backdrop-blur-sm bg-surface/80 relative z-[2]">
        <div className="flex items-center gap-3">
          <button onClick={onOpenSidebar} className="lg:hidden text-muted hover:text-white transition-colors">
            <MenuIcon className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors no-underline">
            <ArrowLeftIcon className="w-3 h-3.5" />
            Back
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface-card text-muted hover:text-white transition-colors">
            <BookmarkIcon className="w-3 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface-card text-muted hover:text-white transition-colors">
            <ShareIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          <article className="flex-1 min-w-0 max-w-[720px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 mx-auto xl:ml-[68px]">
            <PostHeader />
            <HeroImage />
            <PostBody />

            <div className="xl:hidden mt-8 mb-8 flex flex-col gap-4">
              <AIActionsPanel />
              <RelatedContent />
            </div>

            <CommentsSection />
          </article>

          <aside className="w-[328px] shrink-0 pt-20 pr-10 hidden xl:block">
            <div className="sticky top-20 flex flex-col gap-6">
              <AIActionsPanel />
              <RelatedContent />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function PostHeader() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-10">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-card border border-border rounded-full text-[10px] font-medium text-muted uppercase tracking-wider">
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="4" /></svg>
          Post
        </span>
        <span className="px-3 py-1 bg-surface-card border border-border rounded-full text-[10px] text-muted">
          Prompt Engineering
        </span>
        <span className="pl-2 text-[11px] text-muted">&#8226; 8 min read</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] sm:leading-[1] font-serif">
        Techniques for prompting LLM reasoning capabilities in complex domains
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-t border-b border-border">
        <div className="flex items-center gap-3">
          <img src={AUTHOR_IMG} alt="Author" className="w-10 h-10 rounded-full border border-border object-cover" />
          <div>
            <p className="text-sm font-medium text-white">Alex Writer</p>
            <p className="text-xs text-muted">October 24, 2023</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {['#LLM', '#Reasoning', '#AI'].map((tag) => (
            <span key={tag} className="px-3.5 py-1 text-xs text-muted bg-surface-card border border-border rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroImage() {
  return (
    <div className="rounded-xl overflow-hidden border border-border mb-6 sm:mb-10">
      <img
        src={HERO_IMAGE}
        alt="AI reasoning visualization"
        className="w-full h-auto object-cover"
      />
    </div>
  )
}

function PostBody() {
  return (
    <div className="flex flex-col gap-4 font-serif text-base sm:text-lg text-[#d4d4d8] leading-relaxed">
      <p>
        Large Language Models (LLMs) have demonstrated remarkable fluency, but their ability to
        perform multi-step logical reasoning remains a critical area of ongoing research. In complex
        domains such as software engineering, legal analysis, or advanced mathematics, simple zero-shot
        prompting often falls short.
      </p>

      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-6 font-serif">
        The Illusion of Understanding
      </h2>

      <p>
        When an LLM generates a plausible-sounding answer that is factually incorrect, it&apos;s often because
        the model is relying on statistical pattern matching rather than a structured internal logic model. To
        bridge this gap, we must force the model to expose its intermediate steps.
      </p>

      <blockquote className="border-l-4 border-accent bg-accent/5 rounded-r-lg pl-4 sm:pl-5 pr-4 py-4 italic text-muted my-2 text-base sm:text-lg">
        &ldquo;The key to unlocking advanced capabilities in current architectures is not just more
        parameters, but better cognitive scaffolding during inference.&rdquo;
      </blockquote>

      <h3 className="text-lg sm:text-xl font-bold text-white pt-4 font-serif">
        Chain-of-Thought (CoT) Prompting
      </h3>

      <p>
        The most fundamental technique is Chain-of-Thought. By simply appending{' '}
        <code className="px-2 py-0.5 bg-surface-card border border-border rounded text-accent text-sm sm:text-[15px] font-mono">
          &ldquo;Let&apos;s think step by step&rdquo;
        </code>{' '}
        or providing few-shot examples that include intermediate reasoning, the model&apos;s
        accuracy on complex tasks increases dramatically.
      </p>

      <ul className="list-disc pl-6 sm:pl-7 flex flex-col gap-2 my-2">
        <li>
          <strong className="text-white">Zero-shot CoT:</strong> Appending a trigger phrase to initiate reasoning.
        </li>
        <li>
          <strong className="text-white">Few-shot CoT:</strong> Providing explicit examples of the reasoning process.
        </li>
        <li>
          <strong className="text-white">Self-Consistency:</strong> Generating multiple reasoning paths and selecting the most common final answer.
        </li>
      </ul>

      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-6 font-serif">
        Tree-of-Thoughts and Beyond
      </h2>

      <p>
        For problems requiring exploration or lookahead, linear CoT is insufficient. Tree-of-Thoughts
        (ToT) allows the model to explore multiple branches of reasoning, evaluate them, and backtrack if
        necessary, mimicking human problem-solving more closely.
      </p>

      <p>
        Implementing ToT typically requires an external controller script that manages the prompt state and
        prompts the LLM to evaluate its current position in the search tree.
      </p>
    </div>
  )
}

function CommentsSection() {
  return (
    <div className="border-t border-border mt-8 sm:mt-10 pt-10 sm:pt-16 flex flex-col gap-6">
      <h3 className="text-lg sm:text-xl font-semibold text-white font-sans">Discussion (3)</h3>

      <div className="flex gap-3 sm:gap-4">
        <img src={CURRENT_USER_IMG} alt="You" className="w-8 h-8 rounded-full border border-border object-cover shrink-0" />
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <textarea
            placeholder="Add to the discussion..."
            className="w-full h-24 bg-surface-card border border-border rounded-lg p-3.5 text-sm text-white placeholder:text-gray-500 outline-none resize-none focus:border-accent/50 transition-colors font-sans"
          />
          <div className="flex justify-end">
            <button className="px-4 py-1.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors">
              Post Comment
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 sm:gap-4 pt-2">
        <img src={COMMENTER_IMG} alt="Commenter" className="w-8 h-8 rounded-full border border-border object-cover shrink-0" />
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">Elena Rostova</span>
            <span className="text-xs text-muted">2 days ago</span>
          </div>
          <p className="text-sm text-[#d4d4d8] leading-relaxed font-sans">
            Great breakdown. I&apos;ve found that combining Self-Consistency with ToT yields the best results for
            code generation tasks, though the inference cost is significantly higher.
          </p>
        </div>
      </div>
    </div>
  )
}

function AIActionsPanel() {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <SparklesIcon className="w-4 h-4 text-muted" />
        <h3 className="text-sm font-medium text-white">AI-Powered Tools</h3>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
        {AI_ACTIONS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-surface-card border border-border rounded-lg text-sm text-muted hover:text-white hover:border-border/80 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{label}</span>
            </span>
            <ChevronRightIcon className="w-1.5 h-2.5 shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  )
}

function RelatedContent() {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated/60 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4">
      <h3 className="text-sm font-medium text-white">Related Content</h3>
      <div className="flex flex-col gap-4">
        {RELATED.map((item, i) => (
          <div key={i}>
            {i > 0 && <div className="border-t border-border mb-4" />}
            <div className="flex flex-col gap-1 cursor-pointer group">
              <span className="text-[10px] text-muted uppercase tracking-wider font-medium">{item.type}</span>
              <p className="text-sm text-muted group-hover:text-white transition-colors leading-snug">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
