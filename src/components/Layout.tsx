import { Outlet, Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'voicechain_workflow_state'

function getWorkflowProgress(): { step: number; total: number } | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.highestStepReached && parsed.highestStepReached > 1) {
        return { step: parsed.currentStep || 1, total: 7 }
      }
    }
  } catch (e) {
    // Ignore errors
  }
  return null
}

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [workflowProgress, setWorkflowProgress] = useState<{ step: number; total: number } | null>(null)
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  // Check workflow progress on mount and when location changes
  useEffect(() => {
    setWorkflowProgress(getWorkflowProgress())
  }, [location])

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`z-50 ${isLandingPage ? 'absolute top-0 left-0 w-full bg-transparent' : 'sticky top-0 bg-white border-b border-slate-200'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Shield className={`h-8 w-8 ${isLandingPage ? 'text-white' : 'text-primary-600'}`} />
              <span className={`text-xl font-bold ${isLandingPage ? 'text-white' : 'text-slate-900'}`}>
                VoiceChain
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className={`font-medium transition-colors ${isLandingPage ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Home
              </Link>
              <Link
                to="/upload"
                className={`font-medium transition-colors ${isLandingPage ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Scan
              </Link>
              <Link
                to="/report"
                className={`font-medium transition-colors ${isLandingPage ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Report
              </Link>
              <Link
                to="/action-workflow"
                className={`font-medium transition-colors flex items-center gap-2 ${isLandingPage ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Action Workflow
                {workflowProgress && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isLandingPage
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {workflowProgress.step}/{workflowProgress.total}
                  </span>
                )}
              </Link>
              <Link
                to="/upload"
                className={`${isLandingPage ? 'bg-white text-primary-600 hover:bg-slate-100' : 'bg-primary-600 text-white hover:bg-primary-700'} px-4 py-2 rounded-lg font-semibold transition-colors`}
              >
                Start Free Scan
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`h-6 w-6 ${isLandingPage ? 'text-white' : 'text-slate-900'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${isLandingPage ? 'text-white' : 'text-slate-900'}`} />
              )}
            </button>
          </div>

          {/* Mobile nav */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4 absolute left-4 right-4">
              <div className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/upload"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Scan
                </Link>
                <Link
                  to="/report"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Report
                </Link>
                <Link
                  to="/action-workflow"
                  className="text-slate-600 hover:text-slate-900 font-medium flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Action Workflow</span>
                  {workflowProgress && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-primary-100 text-primary-700">
                      Step {workflowProgress.step}/{workflowProgress.total}
                    </span>
                  )}
                </Link>
                <Link
                  to="/upload"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free Scan
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary-400" />
                <span className="text-lg font-bold">VoiceChain</span>
              </div>
              <p className="text-slate-400 text-sm">
                Protecting content creators from unauthorized voice cloning.
              </p>
              <p className="text-slate-500 text-xs mt-2">
                VoiceChain UG, Berlin, Germany
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/upload" className="hover:text-white transition-colors">Voice Scan</Link></li>
                <li><Link to="/report" className="hover:text-white transition-colors">Reports</Link></li>
                <li><Link to="/action-workflow" className="hover:text-white transition-colors">Action Workflow</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Trust & Security</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-800 text-xs px-2 py-1 rounded">GDPR Compliant</span>
                <span className="bg-slate-800 text-xs px-2 py-1 rounded">Zero-Knowledge</span>
                <span className="bg-slate-800 text-xs px-2 py-1 rounded">Auto-Delete</span>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
            <p>VoiceChain provides informational tools, not legal advice. Consult a licensed attorney before taking legal action.</p>
            <p className="mt-2">&copy; 2025 VoiceChain UG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
