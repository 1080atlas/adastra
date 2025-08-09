import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Layout from '@/components/Layout'
import { SubmissionList } from '@/components/SubmissionRow'
import { getPrompts, getSubmissions } from '@/lib/fetch'
import { findPromptsForYearAndWeek, filterSubmissionsByPromptId, getPromptDisplayInfo } from '@/lib/submissions'
import { weekLabel, formatDateTime, getStatusBadgeStyle } from '@/lib/format'
import { Prompt, Submission } from '@/types'

interface PromptDetailPageProps {
  params: {
    year: string
    week: string
  }
  searchParams: {
    type?: 'fanfic' | 'fan-art'
  }
}

export async function generateMetadata({ params, searchParams }: PromptDetailPageProps): Promise<Metadata> {
  const year = parseInt(params.year)
  const week = parseInt(params.week)
  
  try {
    const prompts = await getPrompts()
    const matchingPrompts = findPromptsForYearAndWeek(prompts, year, week)
    
    if (matchingPrompts.length === 0) {
      return {
        title: `Week ${week} (${year}) - Ad Astra`,
        description: 'Prompt not found'
      }
    }
    
    const selectedPrompt = searchParams.type 
      ? matchingPrompts.find(p => p.Type === (searchParams.type === 'fanfic' ? 'FANFIC' : 'FAN ART')) || matchingPrompts[0]
      : matchingPrompts[0]
    
    return {
      title: `${selectedPrompt.Type} — ${weekLabel(week, year)} — ${selectedPrompt.Prompt_Title} - Ad Astra`,
      description: `Community prompt archive for r/redrising: ${selectedPrompt.Prompt_Theme || selectedPrompt.Prompt_Title}`,
    }
  } catch {
    return {
      title: `Week ${week} (${year}) - Ad Astra`,
      description: 'Community prompt archive for r/redrising'
    }
  }
}

export default async function PromptDetailPage({ params, searchParams }: PromptDetailPageProps) {
  const year = parseInt(params.year)
  const week = parseInt(params.week)
  
  if (isNaN(year) || isNaN(week) || year < 2020 || year > 2030 || week < 1 || week > 53) {
    notFound()
  }

  let prompts: Prompt[] = []
  let submissions: Submission[] = []
  let errorMessage = ''
  
  try {
    const [allPrompts, allSubmissions] = await Promise.all([
      getPrompts(),
      getSubmissions()
    ])
    
    prompts = findPromptsForYearAndWeek(allPrompts, year, week)
    submissions = allSubmissions
  } catch (error) {
    console.error('Failed to fetch prompt details:', error)
    errorMessage = 'Unable to load prompt details. Please check back later when the data source is connected.'
  }

  if (prompts.length === 0 && !errorMessage) {
    notFound()
  }

  // Handle type selection
  const requestedType = searchParams.type === 'fanfic' ? 'FANFIC' : searchParams.type === 'fan-art' ? 'FAN ART' : null
  let selectedPrompt: Prompt | null = null
  
  if (requestedType) {
    selectedPrompt = prompts.find(p => p.Type === requestedType) || null
  } else if (prompts.length === 1) {
    selectedPrompt = prompts[0]
  } else if (prompts.length > 1) {
    // Default to fanfic if multiple prompts exist
    selectedPrompt = prompts.find(p => p.Type === 'FANFIC') || prompts[0]
  }

  if (!selectedPrompt && !errorMessage) {
    notFound()
  }

  // Filter submissions for this specific prompt
  const promptSubmissions = selectedPrompt 
    ? filterSubmissionsByPromptId(submissions, selectedPrompt.Prompt_ID)
    : []

  const promptInfo = selectedPrompt ? getPromptDisplayInfo(selectedPrompt) : null

  return (
    <Layout>
      {errorMessage ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Unable to Load Prompt</h1>
          <p className="text-lg text-gray-400 mb-6">{errorMessage}</p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300"
          >
            ← Return Home
          </a>
        </div>
      ) : selectedPrompt && promptInfo ? (
        <div>
          {/* Prompt Header */}
          <div className="mb-12">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6">
              <ol className="flex items-center space-x-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li>→</li>
                <li>
                  <a 
                    href={`/prompts/${promptInfo.type === 'FANFIC' ? 'fanfic' : 'fan-art'}`}
                    className="hover:text-white transition-colors"
                  >
                    {promptInfo.type === 'FANFIC' ? 'Fanfic Archive' : 'Fan Art Archive'}
                  </a>
                </li>
                <li>→</li>
                <li className="text-white font-medium">{weekLabel(week, year)}</li>
              </ol>
            </nav>

            {/* Type Selection (if multiple prompts exist for this week) */}
            {prompts.length > 1 && (
              <div className="mb-8 flex flex-wrap gap-3">
                {prompts.map(prompt => {
                  const isSelected = prompt.Prompt_ID === selectedPrompt.Prompt_ID
                  const typeUrl = prompt.Type === 'FANFIC' ? 'fanfic' : 'fan-art'
                  
                  return (
                    <a
                      key={prompt.Prompt_ID}
                      href={`/prompts/${year}/${week}?type=${typeUrl}`}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isSelected 
                          ? prompt.Type === 'FANFIC' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                      }`}
                    >
                      {prompt.Type === 'FANFIC' ? 'Fanfiction' : 'Fan Art'}
                    </a>
                  )
                })}
              </div>
            )}

            {/* Main Header */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      promptInfo.type === 'FANFIC' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {promptInfo.type === 'FANFIC' ? 'Fanfiction' : 'Fan Art'}
                    </span>
                    
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeStyle(promptInfo.status)}`}>
                      {promptInfo.status}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    {weekLabel(week, year)}
                  </h1>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-200 mb-6">
                    {promptInfo.title}
                  </h2>
                  
                  {promptInfo.theme && (
                    <p className="text-lg text-gray-300 leading-relaxed mb-6 max-w-3xl">
                      {promptInfo.theme}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {promptInfo.opensAt && (
                      <div>
                        <span className="text-gray-500">Opens:</span>
                        <span className="text-white ml-2 font-medium">
                          {formatDateTime(promptInfo.opensAt)}
                        </span>
                      </div>
                    )}
                    
                    {promptInfo.closesAt && (
                      <div>
                        <span className="text-gray-500">Closes:</span>
                        <span className="text-white ml-2 font-medium">
                          {formatDateTime(promptInfo.closesAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {promptInfo.redditUrl && (
                  <div className="lg:flex-shrink-0">
                    <a
                      href={promptInfo.redditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full sm:w-auto justify-center"
                    >
                      <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 000-.463.528.528 0 00-.693 0c-.613.613-1.855.718-2.268.718-.413 0-1.655-.105-2.268-.718a.329.329 0 00-.462 0z"/>
                      </svg>
                      Discussion Thread
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submissions */}
          <SubmissionList 
            submissions={promptSubmissions}
            promptTitle={promptInfo.title}
          />
        </div>
      ) : null}
    </Layout>
  )
}