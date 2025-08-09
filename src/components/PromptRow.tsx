import Link from 'next/link'
import { Prompt, PromptType } from '@/types'
import { weekLabel, getStatusBadgeStyle, formatDate } from '@/lib/format'

interface PromptRowProps {
  prompt: Prompt
}

export function PromptRow({ prompt }: PromptRowProps) {
  const statusStyle = getStatusBadgeStyle(prompt.Status)
  
  return (
    <Link 
      href={`/prompts/${prompt.ISO_Year}/${prompt.Week}`}
      className="block group"
    >
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 group-hover:shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                {weekLabel(prompt.Week, prompt.ISO_Year)}
              </h3>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyle} w-fit`}>
                {prompt.Status}
              </span>
            </div>
            
            <h4 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors mb-2">
              {prompt.Prompt_Title}
            </h4>
            
            {prompt.Prompt_Theme && (
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                {prompt.Prompt_Theme}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {prompt.Opens_At && (
                <span>Opens: {formatDate(prompt.Opens_At)}</span>
              )}
              {prompt.Closes_At && (
                <span>Closes: {formatDate(prompt.Closes_At)}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {prompt.Reddit_Thread_URL && (
              <a
                href={prompt.Reddit_Thread_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 text-sm text-orange-400 hover:text-orange-300 border border-orange-500/30 hover:border-orange-400 rounded-lg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 000-.463.528.528 0 00-.693 0c-.613.613-1.855.718-2.268.718-.413 0-1.655-.105-2.268-.718a.329.329 0 00-.462 0z"/>
                </svg>
                Reddit
              </a>
            )}
            
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

interface YearSectionProps {
  year: number
  prompts: Prompt[]
}

export function YearSection({ year, prompts }: YearSectionProps) {
  return (
    <div className="mb-12">
      <div className="sticky top-24 z-10 bg-black/90 backdrop-blur-sm border-b border-gray-700 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-white">{year}</h2>
        <p className="text-gray-400 mt-1">{prompts.length} prompt{prompts.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="space-y-4">
        {prompts.map((prompt) => (
          <PromptRow key={prompt.Prompt_ID} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}