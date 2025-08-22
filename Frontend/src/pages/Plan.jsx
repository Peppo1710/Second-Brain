export default function Plan() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Plan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-blue-900">Free Plan</h3>
              <p className="text-blue-700 text-sm">Basic features included</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Notebooks</span>
                <span className="text-sm text-gray-500">3 / 5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Storage</span>
                <span className="text-sm text-gray-500">50MB / 100MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">AI Chat Queries</span>
                <span className="text-sm text-gray-500">10 / 50 per month</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Upgrade Options</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold">Pro Plan</h3>
                <p className="text-2xl font-bold text-blue-600">$9.99<span className="text-sm text-gray-500">/month</span></p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Unlimited notebooks</li>
                  <li>• 10GB storage</li>
                  <li>• Unlimited AI queries</li>
                  <li>• Priority support</li>
                </ul>
                <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Upgrade to Pro
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold">Team Plan</h3>
                <p className="text-2xl font-bold text-blue-600">$29.99<span className="text-sm text-gray-500">/month</span></p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Everything in Pro</li>
                  <li>• Team collaboration</li>
                  <li>• Advanced analytics</li>
                  <li>• Custom integrations</li>
                </ul>
                <button className="w-full mt-3 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
                  Upgrade to Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
