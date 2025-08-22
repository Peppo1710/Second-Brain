export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have questions or need support? We're here to help!
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Email Support</h4>
              <p className="text-gray-600">support@secondbrain.com</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Business Inquiries</h4>
              <p className="text-gray-600">business@secondbrain.com</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Office Hours</h4>
              <p className="text-gray-600">Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="space-y-3">
            <a href="#" className="block text-blue-600 hover:text-blue-800">Help Center</a>
            <a href="#" className="block text-blue-600 hover:text-blue-800">Documentation</a>
            <a href="#" className="block text-blue-600 hover:text-blue-800">API Reference</a>
            <a href="#" className="block text-blue-600 hover:text-blue-800">Status Page</a>
          </div>
        </div>
      </div>
    </div>
  )
}
