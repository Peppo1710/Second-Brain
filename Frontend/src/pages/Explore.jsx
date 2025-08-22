export default function Explore() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      <p className="text-gray-600 mb-4">
        Discover amazing notebooks and content from our community.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">Featured Notebooks</h3>
          <p className="text-sm text-gray-600">Browse through curated notebooks from top creators.</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">Trending Topics</h3>
          <p className="text-sm text-gray-600">See what's popular in the community right now.</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">Categories</h3>
          <p className="text-sm text-gray-600">Explore content by category and topic.</p>
        </div>
      </div>
    </div>
  )
}
