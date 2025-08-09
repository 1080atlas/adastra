import { Metadata } from 'next'
import Layout from '@/components/Layout'
import { YearSection } from '@/components/PromptRow'
import { getPrompts } from '@/lib/fetch'
import { filterPromptsByType, groupPromptsByYear, getYearsSorted, getPromptTypeDisplayName, getPromptTypeDescription } from '@/lib/archive'
import { Prompt } from '@/types'

export const metadata: Metadata = {
  title: 'Fan Art Archive - Ad Astra',
  description: 'Browse weekly fan art prompts and community visual creations for the Red Rising universe.',
}

export default async function FanArtArchivePage() {
  let prompts: Prompt[] = []
  let errorMessage = ''

  try {
    const allPrompts = await getPrompts()
    prompts = filterPromptsByType(allPrompts, 'FAN ART')
  } catch (error) {
    console.error('Failed to fetch fan art prompts:', error)
    errorMessage = 'Unable to load fan art prompts. Please check back later when the data source is connected.'
  }

  const groupedPrompts = groupPromptsByYear(prompts)
  const years = getYearsSorted(groupedPrompts)

  return (
    <Layout>
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            {getPromptTypeDisplayName('FAN ART')} Archive
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {getPromptTypeDescription('FAN ART')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-800/30 border border-gray-700 rounded-lg p-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Archive Overview</h2>
            <p className="text-gray-400">
              {prompts.length} total prompt{prompts.length !== 1 ? 's' : ''} across {years.length} year{years.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/40"></div>
              <span className="text-gray-400">Upcoming</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
              <span className="text-gray-400">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-500/20 border border-gray-500/40"></div>
              <span className="text-gray-400">Closed</span>
            </div>
          </div>
        </div>
      </div>

      {errorMessage ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No Prompts Available</h3>
          <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
            {errorMessage}
          </p>
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 max-w-xl mx-auto">
            <p className="text-sm text-gray-300 mb-2">
              This page will display:
            </p>
            <ul className="text-sm text-gray-400 text-left space-y-1">
              <li>• Weekly fan art prompts grouped by year</li>
              <li>• Links to Reddit discussion threads</li>
              <li>• Prompt status (Upcoming/Active/Closed)</li>
              <li>• Direct access to community artwork submissions</li>
            </ul>
          </div>
        </div>
      ) : years.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Archive Coming Soon</h3>
          <p className="text-lg text-gray-400">
            Fan art prompts will appear here once the first prompt is published.
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