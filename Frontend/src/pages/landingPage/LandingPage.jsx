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
    <div className="w-full min-h-screen bg-[linear-gradient(135deg,#ffffff_0%,#CBD5E1_100%)] dark:bg-[linear-gradient(135deg,#000000_0%,#111111_100%)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-20 gradient-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left mb-12 lg:mb-0"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'AndadaPro, serif', color: '#001918' }}>
                Second Brain
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ color: '#001918' }}>
                Organize your thoughts, connect your ideas, and unlock your knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
                <motion.button 
                  className="px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-teal hover:shadow-xl transform hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, #01322F 0%, #012824 100%)', color: 'white' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
                <motion.button 
                  className="border-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-teal"
                  style={{ borderColor: '#01322F', color: '#01322F', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore
                </motion.button>
              </div>
            </motion.div>

            {/* Right Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <img src="/brain organ-cuate.svg" alt="Second Brain Hero" className="max-w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium shadow-amber" style={{ borderColor: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
              <span>Problem</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: '#001918' }}>
              Your ideas are scattered. Your notes are lost.
            </h2>
          </motion.div>

          {/* Beautiful problem cards - Fixed alignment */}
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
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#01322F' }}>
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
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#01322F' }}>
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="M20 20l-3-3"></path>
                  </svg>
                )
              },
              {
                title: "Lost Insights",
                description: "No easy way to connect or retrieve insights when you need them most.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#01322F' }}>
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
                className="group relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 shadow-teal hover:shadow-xl h-full"
                style={{ borderColor: '#CBD5E1', backgroundColor: 'white' }}
                whileHover={{ transform: 'translateY(-4px)', backgroundColor: '#F8FAFC' }}
                variants={fadeInUp}
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-full border p-3 shadow-sm" style={{ borderColor: '#CBD5E1', backgroundColor: 'rgba(203, 213, 225, 0.1)' }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#001918' }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: '#6B7280' }}>{item.description}</p>
                <div className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full border opacity-60" style={{ borderColor: '#CBD5E1' }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution / Value Proposition */}
      <section className="py-20 gradient-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium shadow-amber" style={{ borderColor: '#34D399', backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34D399' }}>
              <span>SecondBrain</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: '#001918' }}>
              One calm space for all your thoughts.
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#001918' }}>
              Second Brain organizes your notebooks, tags, and links — and lets you chat with them to uncover insights instantly.
            </p>
          </motion.div>

          {/* Beautiful benefits grid */}
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
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#01322F' }}>
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
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#01322F' }}>
                    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>
                  </svg>
                )
              },
              {
                title: "All-in-One Storage",
                description: "Save text, links, and inspirations in one place.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#01322F' }}>
                    <rect x="3" y="7" width="18" height="13" rx="2"></rect>
                    <path d="M7 7V5a2 2 0 0 1 2-2h3l2 2h3a2 2 0 0 1 2 2"></path>
                  </svg>
                )
              },
              {
                title: "Zen-like Interface",
                description: "A distraction-free design that keeps you focused.",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#01322F' }}>
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M8 15c1.333-1.333 2.667-2 4-2s2.667.667 4 2"></path>
                  </svg>
                )
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="group relative rounded-2xl border p-8 transition-all duration-300 shadow-teal hover:shadow-xl"
                style={{ borderColor: '#CBD5E1', backgroundColor: 'white' }}
                whileHover={{ transform: 'translateY(-4px)' }}
                variants={fadeInUp}
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-full border p-3 shadow-sm" style={{ borderColor: '#CBD5E1', backgroundColor: 'rgba(203, 213, 225, 0.1)' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#001918' }}>{benefit.title}</h3>
                <p className="leading-relaxed" style={{ color: '#6B7280' }}>{benefit.description}</p>
                <div className="pointer-events-none absolute right-6 top-6 h-4 w-4 rounded-full border" style={{ borderColor: '#CBD5E1' }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#001918' }}>
              Loved by Knowledge Workers
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
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
                className="p-6 rounded-2xl shadow-teal"
                style={{ backgroundColor: '#F1F5F9' }}
                variants={fadeInUp}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mr-4" style={{ background: 'linear-gradient(135deg, #01322F 0%, #012824 100%)' }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#001918' }}>{testimonial.name}</div>
                    <div className="text-sm" style={{ color: '#6B7280' }}>{testimonial.role}</div>
                  </div>
                </div>
                <p className="italic" style={{ color: '#001918' }}>"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 gradient-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#001918' }}>
              Choose Your Plan
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#001918' }}>
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
                className={`relative p-8 rounded-2xl shadow-teal hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'scale-105' : ''
                }`}
                style={{ 
                  backgroundColor: 'white',
                  border: plan.popular ? '2px solid #34D399' : '1px solid #CBD5E1'
                }}
                variants={fadeInUp}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="text-white px-4 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: '#34D399' }}>
                      Recommended
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#001918' }}>{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#001918' }}>{plan.price}</span>
                    <span className="ml-2" style={{ color: '#6B7280' }}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center" style={{ color: '#6B7280' }}>
                      <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#34D399' }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button 
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'text-white shadow-teal' 
                      : 'text-white shadow-teal'
                  }`}
                  style={{ 
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #01322F 0%, #012824 100%)' 
                      : 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)',
                    color: plan.popular ? 'white' : '#001918'
                  }}
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

      {/* Redesigned Dark Footer */}
      <footer className="py-16" style={{ backgroundColor: '#001918' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'white' }}>SecondBrain</h3>
              <p className="text-sm mb-4" style={{ color: '#CBD5E1' }}>
                Transform your thoughts into organized knowledge with AI-powered note-taking.
              </p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>
                © 2024 SecondBrain™. All rights reserved.
              </p>
            </div>

            {/* Products Section */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'white' }}>Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Features</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Pricing</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>API</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Integrations</a></li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'white' }}>Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>About</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Blog</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Careers</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Press</a></li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'white' }}>Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Help Center</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Docs</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Contact</a></li>
                <li><a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#34D399'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Status</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: '#012824' }}>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#F59E0B'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Privacy Policy</a>
              <a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#F59E0B'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Terms of Service</a>
              <a href="#" className="transition-colors" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => e.target.style.color = '#F59E0B'} onMouseLeave={(e) => e.target.style.color = '#CBD5E1'}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
