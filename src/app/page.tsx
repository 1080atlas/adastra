import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Ad Astra
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Weekly community prompts are run on r/redrising (Fanfic on Monday, Fan Art on Tuesday). 
          Entries are posted on Reddit and linked here through this archive. 
          This site is non-commercial and links to creator posts; content remains on Reddit.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <h2 className="text-3xl font-bold mb-4 text-blue-400">Fanfic Archive</h2>
          <p className="text-gray-300 mb-6">Browse weekly fanfiction prompts and community submissions</p>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Browse →
            </span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <h2 className="text-3xl font-bold mb-4 text-purple-400">Fan Art Archive</h2>
          <p className="text-gray-300 mb-6">Browse weekly fan art prompts and community submissions</p>
          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Browse →
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Top Contributors
        </h2>
        <div className="text-center text-gray-400">
          <p className="text-lg mb-4">All-time leaderboard will appear here once data is connected</p>
          <p className="text-sm">
            Points: +5 per valid submission; +15/+8/+5 for 1st/2nd/3rd; +1 per 25 upvotes (capped at +10)
          </p>
        </div>
      </div>
    </Layout>
  )
}