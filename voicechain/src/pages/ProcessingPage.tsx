import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Shield, Clock, Mail, CheckCircle } from 'lucide-react'

export default function ProcessingPage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [videosScanned, setVideosScanned] = useState(0)
  const [matchesFound, setMatchesFound] = useState(0)
  const [stage, setStage] = useState<'encrypting' | 'uploading' | 'scanning' | 'analyzing' | 'complete'>('encrypting')

  useEffect(() => {
    const stages = [
      { name: 'encrypting', duration: 1000 },
      { name: 'uploading', duration: 1500 },
      { name: 'scanning', duration: 3000 },
      { name: 'analyzing', duration: 1500 },
      { name: 'complete', duration: 500 }
    ]

    let totalTime = 0
    stages.forEach((s, i) => {
      setTimeout(() => {
        setStage(s.name as typeof stage)
      }, totalTime)
      totalTime += s.duration
    })

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 120)

    // Videos scanned simulation
    const videoInterval = setInterval(() => {
      setVideosScanned(prev => {
        if (prev >= 2847) {
          clearInterval(videoInterval)
          return 2847
        }
        return prev + Math.floor(Math.random() * 50) + 20
      })
    }, 100)

    // Matches found simulation
    const matchInterval = setInterval(() => {
      setMatchesFound(prev => {
        if (prev >= 7) {
          clearInterval(matchInterval)
          return 7
        }
        if (Math.random() > 0.7) {
          return prev + 1
        }
        return prev
      })
    }, 800)

    // Navigate to report after completion
    const navigateTimeout = setTimeout(() => {
      navigate('/report')
    }, 7500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(videoInterval)
      clearInterval(matchInterval)
      clearTimeout(navigateTimeout)
    }
  }, [navigate])

  const stageInfo = {
    encrypting: { label: 'Encrypting your voice sample...', icon: Shield },
    uploading: { label: 'Uploading encrypted data...', icon: Search },
    scanning: { label: 'Scanning YouTube videos...', icon: Search },
    analyzing: { label: 'Analyzing matches...', icon: Search },
    complete: { label: 'Scan complete!', icon: CheckCircle }
  }

  const CurrentIcon = stageInfo[stage].icon

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="card text-center">
          {/* Animated Icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-primary-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative bg-primary-100 w-24 h-24 rounded-full flex items-center justify-center">
              <CurrentIcon className={`h-12 w-12 text-primary-600 ${stage !== 'complete' ? 'animate-pulse' : ''}`} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {stageInfo[stage].label}
          </h2>
          <p className="text-slate-600 mb-8">
            {stage === 'complete'
              ? 'Redirecting to your report...'
              : 'Your voice is being scanned across YouTube. This may take a moment.'}
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Progress</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {videosScanned.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Videos Scanned</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {matchesFound}
              </div>
              <div className="text-sm text-slate-600">Matches Found</div>
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {(['encrypting', 'uploading', 'scanning', 'analyzing', 'complete'] as const).map((s, i) => {
              const stages = ['encrypting', 'uploading', 'scanning', 'analyzing', 'complete']
              const currentIndex = stages.indexOf(stage)
              const stageIndex = stages.indexOf(s)

              return (
                <div
                  key={s}
                  className={`h-2 w-12 rounded-full transition-all ${
                    stageIndex <= currentIndex
                      ? 'bg-primary-500'
                      : 'bg-slate-200'
                  }`}
                ></div>
              )
            })}
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-800 text-sm">Zero-Knowledge Processing</p>
                <p className="text-green-700 text-xs">Your voice remains encrypted throughout</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 text-sm">Email Notification</p>
                <p className="text-blue-700 text-xs">You can close this page - we'll email you</p>
              </div>
            </div>
          </div>

          {/* Background Notice */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <Clock className="h-4 w-4" />
              <span>Processing continues in background if you leave this page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
