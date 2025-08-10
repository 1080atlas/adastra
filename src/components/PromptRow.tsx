import Link from 'next/link'
import { Prompt, PromptType } from '@/types'
import { weekLabel, getStatusBadgeStyle, formatDate } from '@/lib/format'

interface PromptRowProps {
  prompt: Prompt
}

export function PromptRow({ prompt }: PromptRowProps) {
  const statusStyle = getStatusBadgeStyle(prompt.Status)
  
  return (
    <li className="group relative rounded-xl bg-card border border-line hover:border-accent/40 transition">
      <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-crimson/70" aria-hidden />
      <Link href={`/prompts/${prompt.ISO_Year}/${prompt.Week}`} className="block p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-serif font-medium">
                {weekLabel(prompt.Week, prompt.ISO_Year)} — {prompt.Prompt_Title}
              </span>
            </div>
            
            {prompt.Prompt_Theme && (
              <p className="text-muted text-sm leading-relaxed">
                {prompt.Prompt_Theme}
              </p>
            )}
          </div>
          
          <span className="text-[11px] uppercase tracking-wide rounded-full border px-2 py-1 text-muted border-line group-hover:border-accent/60">
            {prompt.Status}
          </span>
        </div>
      </Link>
    </li>
  )
}

interface YearSectionProps {
  year: number
  prompts: Prompt[]
}

export function YearSection({ year, prompts }: YearSectionProps) {
  return (
    <div className="mb-12">
      <div className="sticky top-24 z-10 bg-bg/90 backdrop-blur-sm border-b border-line pb-4 mb-6">
        <h2 className="font-serif text-3xl font-bold text-accent">{year}</h2>
        <p className="text-muted mt-1">{prompts.length} prompt{prompts.length !== 1 ? 's' : ''}</p>
      </div>
      
      <ul className="space-y-4">
        {prompts.map((prompt) => (
          <PromptRow key={prompt.Prompt_ID} prompt={prompt} />
        ))}
      </ul>
    </div>
  )
}