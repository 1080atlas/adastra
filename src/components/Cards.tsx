import Link from 'next/link'

interface ArchiveCardProps {
  title: string
  description: string
  href: string
  variant: 'fanfic' | 'fanart'
}

export function ArchiveCard({ title, description, href, variant }: ArchiveCardProps) {
  return (
    <Link href={href} className="block group">
      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft hover:border-accent/40 transition h-full">
        <h2 className="font-serif text-xl mb-3 text-accent group-hover:text-accent-600 transition-colors">
          {title}
        </h2>
        <p className="text-muted mb-6 leading-relaxed">{description}</p>
        <div className="flex justify-end">
          <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border border-line text-accent group-hover:border-accent/60 transition">
            Browse →
          </span>
        </div>
      </section>
    </Link>
  )
}