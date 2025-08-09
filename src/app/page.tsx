import Layout from '@/components/Layout'
import { ArchiveCard } from '@/components/Cards'
import { LeaderboardTable } from '@/components/LeaderboardTable'
import { getSubmissions } from '@/lib/fetch'
import { computeLeaderboard } from '@/lib/leaderboard'
import { LeaderboardEntry } from '@/types'

export default async function Home() {
  let leaderboard: LeaderboardEntry[] = []
  let errorMessage = ''

  try {
    const submissions = await getSubmissions()
    leaderboard = computeLeaderboard(submissions)
  } catch (error) {
    console.error('Failed to fetch leaderboard data:', error)
    errorMessage = 'Unable to load leaderboard data. Using placeholder until data source is connected.'
  }

  return (
    <Layout>
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Ad Astra
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
          Community prompt archive for{' '}
          <a 
            href="https://www.reddit.com/r/redrising" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-orange-400 hover:text-orange-300 transition-colors underline"
          >
            r/redrising
          </a>
        </p>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Weekly community prompts run on Fanfic Monday and Fan Art Tuesday. 
          All entries live on Reddit — this archive links to them with full attribution to creators.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        <ArchiveCard
          title="Fanfic Archive"
          description="Browse weekly fanfiction prompts and community submissions. From epic space operas to character studies, discover stories set in Pierce Brown's Red Rising universe."
          href="/prompts/fanfic"
          variant="fanfic"
        />
        
        <ArchiveCard
          title="Fan Art Archive"
          description="Browse weekly fan art prompts and visual creations. Explore artwork depicting characters, scenes, and original interpretations of the Red Rising world."
          href="/prompts/fan-art"
          variant="fanart"
        />
      </div>
      
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 lg:p-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Top Contributors
          </h2>
          <p className="text-gray-400 text-lg">
            Community members ranked by participation and engagement
          </p>
        </div>
        
        {errorMessage ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-6">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-lg text-gray-400 mb-3">{errorMessage}</p>
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-sm text-gray-300 mb-4 font-medium">Scoring System:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-400 font-bold text-lg">+5</div>
                  <div className="text-gray-400">Submission</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">+15</div>
                  <div className="text-gray-400">1st Place</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-300 font-bold text-lg">+8</div>
                  <div className="text-gray-400">2nd Place</div>
                </div>
                <div className="text-center">
                  <div className="text-orange-400 font-bold text-lg">+5</div>
                  <div className="text-gray-400">3rd Place</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Plus +1 point per 25 upvotes (capped at +10 bonus points)
              </p>
            </div>
          </div>
        ) : (
          <>
            <LeaderboardTable entries={leaderboard} showTop={5} />
            {leaderboard.length > 5 && (
              <div className="text-center mt-8">
                <a
                  href="/leaderboard"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  View Full Leaderboard
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}