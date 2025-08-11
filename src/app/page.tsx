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
        <p className="text-xl md:text-2xl text-ink max-w-4xl mx-auto leading-relaxed mb-8">
          Community prompt archive for{' '}
          <a 
            href="https://www.reddit.com/r/redrising" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-crimson hover:text-crimson-700 transition-colors underline"
          >
            r/redrising
          </a>
        </p>
        <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
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
      
      <div className="rounded-2xl border border-line bg-card p-8 lg:p-12 shadow-soft">
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl font-bold mb-4 text-accent">
            Top Contributors
          </h2>
          <p className="text-muted text-lg">
            Community members ranked by participation and engagement
          </p>
        </div>
        
        {errorMessage ? (
          <div className="text-center py-12">
            <div className="text-muted mb-6">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-lg text-muted mb-3">{errorMessage}</p>
            <div className="bg-card border border-line rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-sm text-ink mb-4 font-medium">Scoring System:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-accent font-bold text-lg">+5</div>
                  <div className="text-muted">Submission</div>
                </div>
                <div className="text-center">
                  <div className="text-accent font-bold text-lg">+15</div>
                  <div className="text-muted">1st Place</div>
                </div>
                <div className="text-center">
                  <div className="text-accent-600 font-bold text-lg">+8</div>
                  <div className="text-muted">2nd Place</div>
                </div>
                <div className="text-center">
                  <div className="text-crimson font-bold text-lg">+5</div>
                  <div className="text-muted">3rd Place</div>
                </div>
              </div>
              <p className="text-xs text-muted mt-4">
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
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-accent text-bg hover:bg-accent-600 transition focus:outline-none focus:ring-2 focus:ring-accent/40"
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