import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
              Ad Astra
            </Link>
            
            <div className="flex space-x-6">
              <Link 
                href="/prompts/fanfic" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Fanfic
              </Link>
              <Link 
                href="/prompts/fan-art" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Fan Art
              </Link>
              <Link 
                href="/leaderboard" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Leaderboard
              </Link>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t border-gray-800 bg-gray-900 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p className="mb-4">
              Weekly community prompts are run on r/redrising (Fanfic on Monday, Fan Art on Tuesday). 
              Entries are posted on Reddit and linked here through this archive. 
              Prompts close Sunday 18:00 CET/CEST, and a roundup is posted Sunday evening. 
              This site is non-commercial and links to creator posts; content remains on Reddit.
            </p>
            <p className="text-sm">
              Ad Astra • Non-commercial community archive for r/redrising
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}