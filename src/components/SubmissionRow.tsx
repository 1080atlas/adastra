import { Submission } from '@/types'
import { getWinnerBadgeStyle, getWinnerLabel } from '@/lib/format'

interface SubmissionRowProps {
  submission: Submission
}

export function SubmissionRow({ submission }: SubmissionRowProps) {
  const hasWinnerRank = submission.Is_Winner_Rank && [1, 2, 3].includes(submission.Is_Winner_Rank)
  const winnerBadgeStyle = hasWinnerRank ? getWinnerBadgeStyle(submission.Is_Winner_Rank!) : ''
  const winnerLabel = hasWinnerRank ? getWinnerLabel(submission.Is_Winner_Rank!) : ''

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {submission.Author_Username}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2">
              {hasWinnerRank && (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${winnerBadgeStyle}`}>
                  {winnerLabel}
                </span>
              )}
              
              {submission.Has_Spoilers === 'YES' && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                  ⚠️ Spoilers
                </span>
              )}
            </div>
          </div>
          
          <h4 className="text-xl font-bold text-gray-200 group-hover:text-white transition-colors mb-3">
            {submission.Submission_Title}
          </h4>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {submission.Upvotes_Snapshot !== undefined && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-orange-400 font-semibold">{submission.Upvotes_Snapshot}</span>
                <span>upvotes</span>
              </div>
            )}
            
            {submission.Created_At && (
              <span>
                Posted: {new Date(submission.Created_At).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href={submission.Reddit_Post_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 group-hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 01-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 01.042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 014.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 01.14-.197.35.35 0 01.238-.042l2.906.617a1.214 1.214 0 011.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 00-.231.094.33.33 0 000 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 000-.463.528.528 0 00-.693 0c-.613.613-1.855.718-2.268.718-.413 0-1.655-.105-2.268-.718a.329.329 0 00-.462 0z"/>
            </svg>
            View on Reddit
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

interface SubmissionListProps {
  submissions: Submission[]
  promptTitle: string
}

export function SubmissionList({ submissions, promptTitle }: SubmissionListProps) {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-6">
          <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No submissions recorded yet</h3>
        <p className="text-lg text-gray-400 mb-6">
          Submissions for &ldquo;{promptTitle}&rdquo; will appear here once they&rsquo;re added to the archive.
        </p>
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 max-w-xl mx-auto">
          <p className="text-sm text-gray-300 mb-2">
            All submissions live on Reddit. This archive will display:
          </p>
          <ul className="text-sm text-gray-400 text-left space-y-1">
            <li>• Author usernames and submission titles</li>
            <li>• Direct links to Reddit posts</li>
            <li>• Upvote counts and winner rankings</li>
            <li>• Spoiler warnings when applicable</li>
          </ul>
        </div>
      </div>
    )
  }

  // Sort submissions: winners first, then by upvotes, then alphabetically
  const sortedSubmissions = [...submissions].sort((a, b) => {
    // Winners first (1st, 2nd, 3rd)
    const aIsWinner = a.Is_Winner_Rank && [1, 2, 3].includes(a.Is_Winner_Rank)
    const bIsWinner = b.Is_Winner_Rank && [1, 2, 3].includes(b.Is_Winner_Rank)
    
    if (aIsWinner && !bIsWinner) return -1
    if (!aIsWinner && bIsWinner) return 1
    
    if (aIsWinner && bIsWinner) {
      return a.Is_Winner_Rank! - b.Is_Winner_Rank!
    }
    
    // Then by upvotes (descending)
    const aUpvotes = a.Upvotes_Snapshot ?? 0
    const bUpvotes = b.Upvotes_Snapshot ?? 0
    if (aUpvotes !== bUpvotes) return bUpvotes - aUpvotes
    
    // Finally alphabetically by username
    return a.Author_Username.localeCompare(b.Author_Username)
  })

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Community Submissions</h2>
        <p className="text-gray-400">
          {submissions.length} submission{submissions.length !== 1 ? 's' : ''} • All content lives on Reddit
        </p>
      </div>
      
      <div className="space-y-6">
        {sortedSubmissions.map((submission) => (
          <SubmissionRow key={submission.Submission_ID} submission={submission} />
        ))}
      </div>
    </div>
  )
}