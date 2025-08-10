import { Metadata } from 'next'
import Layout from '@/components/Layout'
import { YearSection } from '@/components/PromptRow'
import { getPrompts } from '@/lib/fetch'
import { filterPromptsByType, groupPromptsByYear, getYearsSorted, getPromptTypeDisplayName, getPromptTypeDescription } from '@/lib/archive'
import { Prompt } from '@/types'

export const metadata: Metadata = {
  title: 'Fanfiction Archive - Ad Astra',
  description: 'Browse weekly fanfiction prompts and community submissions for the Red Rising universe.',
}

export default async function FanficArchivePage() {
  let prompts: Prompt[] = []
  let errorMessage = ''

  try {
    const allPrompts = await getPrompts()
    prompts = filterPromptsByType(allPrompts, 'FANFIC')
  } catch (error) {
    console.error('Failed to fetch fanfic prompts:', error)
    errorMessage = 'Unable to load fanfiction prompts. Please check back later when the data source is connected.'
  }

  const groupedPrompts = groupPromptsByYear(prompts)
  const years = getYearsSorted(groupedPrompts)

  return (
    <Layout>
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-accent">
            {getPromptTypeDisplayName('FANFIC')} Archive
          </h1>
          <p className="text-xl text-ink max-w-3xl mx-auto leading-relaxed">
            {getPromptTypeDescription('FANFIC')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card/30 border border-line rounded-lg p-6">
          <div>
            <h2 className="font-serif text-lg font-semibold text-ink mb-1">Archive Overview</h2>
            <p className="text-muted">
              {prompts.length} total prompt{prompts.length !== 1 ? 's' : ''} across {years.length} year{years.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent/20 border border-accent/40"></div>
              <span className="text-muted">Upcoming</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-crimson/20 border border-crimson/40"></div>
              <span className="text-muted">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-muted/20 border border-muted/40"></div>
              <span className="text-muted">Closed</span>
            </div>
          </div>
        </div>
      </div>

      {errorMessage ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink mb-4">No Prompts Available</h3>
          <p className="text-lg text-muted mb-6 max-w-2xl mx-auto">
            {errorMessage}
          </p>
          <div className="bg-card border border-line rounded-lg p-6 max-w-xl mx-auto">
            <p className="text-sm text-ink mb-2">
              This page will display:
            </p>
            <ul className="text-sm text-muted text-left space-y-1">
              <li>• Weekly fanfiction prompts grouped by year</li>
              <li>• Links to Reddit discussion threads</li>
              <li>• Prompt status (Upcoming/Active/Closed)</li>
              <li>• Direct access to community submissions</li>
            </ul>
          </div>
        </div>
      ) : years.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink mb-4">Archive Coming Soon</h3>
          <p className="text-lg text-muted">
            Fanfiction prompts will appear here once the first prompt is published.
          </p>
        </div>
      ) : (
        <div>
          {years.map(year => (
            <YearSection
              key={year}
              year={year}
              prompts={groupedPrompts[year]}
            />
          ))}
        </div>
      )}
    </Layout>
  )
}