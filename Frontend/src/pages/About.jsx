export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About SecondBrain</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-6">
          SecondBrain is your personal knowledge management platform designed to help you capture, organize, and retrieve information efficiently.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower individuals and teams to build their second brain - a comprehensive system for capturing and organizing knowledge that enhances productivity and creativity.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              A world where everyone has access to powerful tools that help them think better, work smarter, and achieve their goals through better knowledge management.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Intelligent note-taking and organization</li>
            <li>• AI-powered chat assistant</li>
            <li>• Seamless collaboration tools</li>
            <li>• Advanced search and retrieval</li>
            <li>• Cross-platform synchronization</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
