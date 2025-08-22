export default function Community() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Community</h1>
      <p className="text-gray-600 mb-4">
        Connect with other SecondBrain users and share your knowledge.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">Forums</h3>
          <p className="text-sm text-gray-600 mb-4">Join discussions about productivity, knowledge management, and more.</p>
          <button className="text-sm text-blue-600 hover:text-blue-800">Browse Forums →</button>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2">User Groups</h3>
          <p className="text-sm text-gray-600 mb-4">Find local or online groups of SecondBrain enthusiasts.</p>
          <button className="text-sm text-blue-600 hover:text-blue-800">Find Groups →</button>
        </div>
      </div>
    </div>
  )
}
