import { Metadata } from 'next'
import Layout from '@/components/Layout'
import { LeaderboardTable } from '@/components/LeaderboardTable'
import { getSubmissions } from '@/lib/fetch'
import { computeLeaderboard } from '@/lib/leaderboard'
import { LeaderboardEntry } from '@/types'

export const metadata: Metadata = {
  title: 'Leaderboard - Ad Astra',
  description: 'All-time community leaderboard for Red Rising prompt archives. Ranked by submissions, wins, and community engagement.',
}

export default async function LeaderboardPage() {
  let leaderboard: LeaderboardEntry[] = []
  let errorMessage = ''

  try {
    const submissions = await getSubmissions()
    leaderboard = computeLeaderboard(submissions)
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error)
    errorMessage = 'Unable to load leaderboard data. Please check back later when the data source is connected.'
  }

  return (
    <Layout>
      <div className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            All-Time Leaderboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Community members ranked by participation and engagement across all prompt archives.
          </p>
        </div>

        <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Scoring Methodology</h2>
          <p className="text-gray-400 mb-6">
            Points: +5 per valid submission; +15/+8/+5 for 1st/2nd/3rd; +1 per 25 upvotes (capped at +10). 
            Scores are computed from the Submissions sheet when the archive refreshes.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
              <div className="text-green-400 font-bold text-2xl mb-1">+5</div>
              <div className="text-gray-300 font-medium">Submission</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
              <div className="text-yellow-400 font-bold text-2xl mb-1">+15</div>
              <div className="text-gray-300 font-medium">1st Place</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
              <div className="text-gray-300 font-bold text-2xl mb-1">+8</div>
              <div className="text-gray-300 font-medium">2nd Place</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
              <div className="text-orange-400 font-bold text-2xl mb-1">+5</div>
              <div className="text-gray-300 font-medium">3rd Place</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-600/50">
              <div className="text-blue-400 font-bold text-lg mb-1">+1-10</div>
              <div className="text-gray-300 font-medium">Upvote Bonus</div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            Upvote bonus: +1 point per 25 upvotes, capped at +10 bonus points per submission
          </p>
        </div>
      </div>

      {errorMessage ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No Leaderboard Data Available</h3>
          <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
            {errorMessage}
          </p>
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 max-w-xl mx-auto">
            <p className="text-sm text-gray-300 mb-2">
              This page will display:
            </p>
            <ul className="text-sm text-gray-400 text-left space-y-1">
              <li>• Complete all-time rankings of community members</li>
              <li>• Points earned through submissions and placements</li>
              <li>• Upvote-based engagement bonuses</li>
              <li>• Historical performance across all prompts</li>
            </ul>
          </div>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Leaderboard Coming Soon</h3>
          <p className="text-lg text-gray-400">
            Community rankings will appear here once submissions begin flowing in.
          </p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">Community Rankings</h2>
            <p className="text-gray-400">
              {leaderboard.length} total contributor{leaderboard.length !== 1 ? 's' : ''} across all prompt archives
            </p>
          </div>
          <LeaderboardTable entries={leaderboard} />
        </div>
      )}
    </Layout>
  )
}