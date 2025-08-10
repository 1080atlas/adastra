import { LeaderboardEntry } from '@/types'

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  showTop?: number
  className?: string
}

export function LeaderboardTable({ entries, showTop, className = '' }: LeaderboardTableProps) {
  const displayEntries = showTop ? entries.slice(0, showTop) : entries

  if (entries.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-muted mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <p className="text-lg text-muted mb-2">No leaderboard data available yet</p>
        <p className="text-sm text-muted">Leaderboard will appear once submissions are added to the data source</p>
      </div>
    )
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-accent font-bold text-lg'
      case 2:
        return 'text-accent-600 font-semibold'
      case 3:
        return 'text-crimson font-semibold'
      default:
        return 'text-muted'
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${rank}`
    }
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <ul className="divide-y divide-line/60">
          {displayEntries.map((entry, index) => {
            const rank = index + 1
            return (
              <li key={entry.Username} className="grid grid-cols-[3rem,1fr,6rem] items-center gap-3 border-b border-line/60 p-3">
                <span className={getRankStyle(rank)}>{getRankBadge(rank)}</span>
                <span className="font-medium text-ink">{entry.Username}</span>
                <span className="justify-self-end text-accent font-semibold">{entry.Points} pts</span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {displayEntries.map((entry, index) => {
          const rank = index + 1
          return (
            <div key={entry.Username} className="bg-card rounded-lg p-4 border border-line">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center min-w-[3rem] ${getRankStyle(rank)}`}>
                    {getRankBadge(rank)}
                  </span>
                  <span className="text-ink font-medium">{entry.Username}</span>
                </div>
                <span className="text-accent font-semibold text-lg">{entry.Points}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}