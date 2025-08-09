import Link from 'next/link'

interface ArchiveCardProps {
  title: string
  description: string
  href: string
  variant: 'fanfic' | 'fanart'
}

export function ArchiveCard({ title, description, href, variant }: ArchiveCardProps) {
  const colorClasses = {
    fanfic: {
      gradient: 'from-gray-900 to-gray-800',
      border: 'border-gray-700 hover:border-blue-500',
      shadow: 'hover:shadow-blue-500/10',
      accent: 'text-blue-400',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    fanart: {
      gradient: 'from-gray-900 to-gray-800',
      border: 'border-gray-700 hover:border-purple-500',
      shadow: 'hover:shadow-purple-500/10',
      accent: 'text-purple-400',
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    }
  }

  const colors = colorClasses[variant]

  return (
    <Link href={href} className="block group">
      <div className={`bg-gradient-to-br ${colors.gradient} border ${colors.border} rounded-xl p-8 transition-all duration-300 hover:shadow-lg ${colors.shadow} h-full`}>
        <h2 className={`text-3xl font-bold mb-4 ${colors.accent} group-hover:scale-105 transition-transform duration-300`}>
          {title}
        </h2>
        <p className="text-gray-300 mb-6 text-lg leading-relaxed">{description}</p>
        <div className="flex justify-end">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${colors.badge} group-hover:scale-105 transition-transform duration-300`}>
            Browse →
          </span>
        </div>
      </div>
    </Link>
  )
}