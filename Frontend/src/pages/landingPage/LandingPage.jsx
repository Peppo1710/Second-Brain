import { motion } from 'framer-motion'

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left mb-12 lg:mb-0"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Second Brain
                <span className="block text-blue-600">Write</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Where thoughts find their home, ideas connect like constellations, and knowledge flows like a gentle stream. 
                Transform your scattered notes into a symphony of organized wisdom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
                <motion.button 
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free
                </motion.button>
                <motion.button 
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              className="flex-1 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
                  <div className="absolute inset-4 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-sm font-medium text-gray-600">SecondBrain</div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-gray-200 rounded-full"></div>
                      <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-blue-200 rounded-full w-1/2"></div>
                      <div className="h-2 bg-gray-200 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-600">
              <span>Problem</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Your ideas are scattered. Your notes are lost.
            </h2>
          </motion.div>

          {/* Monochrome problem cards */}
          <motion.div 
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Too Many Apps",
                description: "Switching between too many apps just to capture thoughts.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                    <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                    <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
                  </svg>
                )
              },
              {
                title: "Buried Information",
                description: "Notes and links get buried, never to be found again.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="M20 20l-3-3"></path>
                  </svg>
                )
              },
              {
                title: "Lost Insights",
                description: "No easy way to connect or retrieve insights when you need them most.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v3"></path>
                    <path d="M12 18v3"></path>
                    <path d="M3 12h3"></path>
                    <path d="M18 12h3"></path>
                    <circle cx="12" cy="12" r="5"></circle>
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:bg-gray-50"
                variants={fadeInUp}
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-300 bg-white p-3 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                <div className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full border border-gray-200 opacity-60" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution / Value Proposition */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-medium text-blue-700 shadow-sm">
              <span>SecondBrain</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
              One calm space for all your thoughts.
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Second Brain organizes your notebooks, tags, and links — and lets you chat with them to uncover insights instantly.
            </p>
          </motion.div>

          {/* Minimal monochrome benefits */}
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Effortless Organization",
                description: "Tag and group notes without friction.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 7h16"></path>
                    <path d="M6 12h12"></path>
                    <path d="M8 17h8"></path>
                  </svg>
                )
              },
              {
                title: "Conversational Search",
                description: "Chat with your notebooks instead of scrolling endlessly.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>
                  </svg>
                )
              },
              {
                title: "All-in-One Storage",
                description: "Save text, links, and inspirations in one place.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="7" width="18" height="13" rx="2"></rect>
                    <path d="M7 7V5a2 2 0 0 1 2-2h3l2 2h3a2 2 0 0 1 2 2"></path>
                  </svg>
                )
              },
              {
                title: "Zen-like Interface",
                description: "A distraction-free design that keeps you focused.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M8 15c1.333-1.333 2.667-2 4-2s2.667.667 4 2"></path>
                  </svg>
                )
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="group relative rounded-2xl border border-blue-100 bg-white p-8 transition-all hover:-translate-y-0.5 hover:shadow-md shadow-sm"
                variants={fadeInUp}
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-full border border-blue-200 bg-white p-3 shadow-sm">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                <div className="pointer-events-none absolute right-6 top-6 h-4 w-4 rounded-full border border-blue-200" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Loved by Knowledge Workers
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Sarah Chen",
                role: "Product Manager",
                avatar: "SC",
                quote: "SecondBrain has transformed how I organize my thoughts. It's like having a personal assistant for my mind."
              },
              {
                name: "Marcus Rodriguez",
                role: "Research Scientist",
                avatar: "MR",
                quote: "The AI connections have helped me discover insights I never would have found on my own."
              },
              {
                name: "Emma Thompson",
                role: "Content Creator",
                avatar: "ET",
                quote: "Finally, a tool that understands how creative minds work. My productivity has doubled."
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-6 rounded-2xl"
                variants={fadeInUp}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["Google", "Microsoft", "Apple", "Netflix", "Spotify", "Airbnb"].map((company, index) => (
                <div key={index} className="text-xl font-semibold text-gray-400">{company}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Free",
                price: "₹0",
                period: "forever",
                features: [
                  "3 notebooks",
                  "100MB storage", 
                  "Basic AI search",
                  "Text-only pages",
                  "Community support"
                ],
                cta: "Get Started",
                popular: false
              },
              {
                name: "Pro",
                price: "₹299",
                period: "per month",
                features: [
                  "12 notebooks",
                  "10GB storage",
                  "Advanced AI search",
                  "Rich content pages (text, links, media)",
                  "Export options",
                  "Priority support"
                ],
                cta: "Start Free Trial",
                popular: true
              }
            ].map((plan, index) => (
              <motion.div 
                key={index}
                className={`relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
                variants={fadeInUp}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Recommended
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button 
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-300 ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SecondBrain</h3>
              <p className="text-gray-400 text-sm">
                Transform your thoughts into organized knowledge with AI-powered note-taking.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 SecondBrain. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
