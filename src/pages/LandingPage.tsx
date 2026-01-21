import { Link } from 'react-router-dom'
import {
  Shield,
  Search,
  FileText,
  Scale,
  Lock,
  Trash2,
  Code,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  TrendingUp
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="bg-green-500 h-2 w-2 rounded-full animate-pulse"></span>
                <span className="text-sm">Trusted by 1,000+ creators in Germany & EU</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Protect Your Voice in the Creator Economy
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                AI voice cloning is being used to steal creator identities. VoiceChain detects unauthorized use of your voice on YouTube and guides you through the legal process to take it back.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/upload"
                  className="bg-white text-primary-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Start Free Voice Scan
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Lock className="h-4 w-4" />
                  <span>Zero-Knowledge Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Trash2 className="h-4 w-4" />
                  <span>Auto-Delete After Scan</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Code className="h-4 w-4" />
                  <span>Open-Source Security</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Voice Detection Report</span>
                    <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">3 Matches Found</span>
                  </div>

                  <div className="space-y-3">
                    {[94, 87, 76].map((confidence, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                        <div className="w-16 h-10 bg-slate-700 rounded"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-white/20 rounded w-3/4 mb-1"></div>
                          <div className="h-2 bg-white/10 rounded w-1/2"></div>
                        </div>
                        <div className={`text-sm font-bold ${confidence >= 90 ? 'text-red-400' : confidence >= 80 ? 'text-yellow-400' : 'text-slate-400'}`}>
                          {confidence}%
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Estimated Revenue Loss</span>
                      <span className="font-bold text-red-400">€4,138</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold">400%</div>
                <div className="text-white/60 text-sm">Increase in AI voice cloning (2024)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">€2.3M</div>
                <div className="text-white/60 text-sm">Lost to voice fraud in EU</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">80%+</div>
                <div className="text-white/60 text-sm">Detection accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1hr</div>
                <div className="text-white/60 text-sm">Auto-delete guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Voice Protection in Three Steps
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From detection to resolution, VoiceChain guides you through every step of protecting your voice rights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Search className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Detection & Reporting</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>YouTube scanning with 70-100% confidence scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Direct links to infringing videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Impact assessment: estimated revenue loss</span>
                </li>
              </ul>
            </div>

            <div className="card hover:shadow-lg transition-shadow border-2 border-primary-200">
              <div className="bg-accent-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FileText className="h-7 w-7 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Guided Action Workflow</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Interactive step-by-step wizard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Automated templates: Abmahnung, YouTube claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Progress tracking with deadline reminders</span>
                </li>
              </ul>
              <div className="mt-4 bg-primary-50 text-primary-700 text-sm px-3 py-2 rounded-lg">
                Most Popular Feature
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Scale className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Legal Partnership</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Vetted German IP attorney network</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Free 15-minute initial consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fixed fee or hourly representation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How VoiceChain Protects Your Privacy
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We use zero-knowledge encryption so your voice never leaves your device unprotected.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Lock,
                title: 'Client-Side Encryption',
                description: 'Voice encrypted in your browser before upload'
              },
              {
                icon: Shield,
                title: 'Zero-Knowledge Processing',
                description: 'We process encrypted data - we never hear your voice'
              },
              {
                icon: Trash2,
                title: 'Auto-Delete',
                description: 'Voice samples deleted within 1 hour of scan completion'
              },
              {
                icon: Code,
                title: 'Open-Source Audit',
                description: 'Security layer publicly available for third-party review'
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <item.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Content Creators
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "VoiceChain found 12 videos using my cloned voice. The action workflow helped me get 10 of them removed within 2 weeks.",
                author: "Marco S.",
                role: "Tech YouTuber, 500K subscribers"
              },
              {
                quote: "As a voice actor, my voice is my livelihood. VoiceChain gives me peace of mind knowing I can detect and act on misuse.",
                author: "Lisa M.",
                role: "Professional Voice Actor"
              },
              {
                quote: "The legal partner network connected me with a great attorney who understood my case immediately. Worth every euro.",
                author: "Thomas K.",
                role: "Podcast Host"
              }
            ].map((testimonial, i) => (
              <div key={i} className="card">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600">Start free, upgrade when you need more</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Free</h3>
              <p className="text-slate-600 mb-4">Try VoiceChain risk-free</p>
              <div className="text-4xl font-bold text-slate-900 mb-6">€0</div>
              <ul className="space-y-3 text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  1 scan per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  100 videos analyzed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Basic report
                </li>
              </ul>
              <Link to="/upload" className="btn-secondary w-full block text-center">
                Get Started
              </Link>
            </div>

            <div className="card border-2 border-primary-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-sm px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Standard</h3>
              <p className="text-slate-600 mb-4">For active creators</p>
              <div className="text-4xl font-bold text-slate-900 mb-1">€16<span className="text-lg font-normal text-slate-500">/mo</span></div>
              <p className="text-sm text-slate-500 mb-6">or €24 one-time scan</p>
              <ul className="space-y-3 text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  5 scans per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  1,000 videos per scan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Full confidence range
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Guided action workflow
                </li>
              </ul>
              <Link to="/upload" className="btn-primary w-full block text-center">
                Start Standard
              </Link>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pro</h3>
              <p className="text-slate-600 mb-4">For professionals</p>
              <div className="text-4xl font-bold text-slate-900 mb-6">€79<span className="text-lg font-normal text-slate-500">/mo</span></div>
              <ul className="space-y-3 text-slate-600 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Unlimited scans
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  10,000 videos per scan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Priority processing
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  €120 legal consultation credit
                </li>
              </ul>
              <Link to="/upload" className="btn-secondary w-full block text-center">
                Start Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take Control of Your Voice Today
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of creators protecting their voice rights. Start your free scan now.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-slate-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Start Free Voice Scan
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
