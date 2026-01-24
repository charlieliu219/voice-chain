import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Play,
  AlertTriangle,
  DollarSign,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  Plus,
  ThumbsDown
} from 'lucide-react'
import { mockMatches } from '../data/mockData'

export default function MatchDetailPage() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const match = mockMatches.find(m => m.id === matchId)

  if (!match) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Match Not Found</h2>
          <Link to="/report" className="text-primary-600 hover:underline">
            Return to Report
          </Link>
        </div>
      </div>
    )
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-red-600 bg-red-100'
    if (confidence >= 80) return 'text-yellow-600 bg-yellow-100'
    return 'text-slate-600 bg-slate-100'
  }

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'action':
        return { color: 'bg-red-100 text-red-700 border-red-200', label: 'Take Action Now', icon: AlertTriangle }
      case 'monitor':
        return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Monitor', icon: Eye }
      default:
        return { color: 'bg-slate-100 text-slate-700 border-slate-200', label: 'Review Manually', icon: Clock }
    }
  }

  const categoryInfo = getCategoryInfo(match.category)

  // Convert timestamp string (e.g., "2:34" or "1:15:30") to seconds
  const timestampToSeconds = (timestamp: string): number => {
    const parts = timestamp.split(':').map(Number)
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2]
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1]
    }
    return 0
  }

  // Generate YouTube URL with timestamp
  const getVideoUrlWithTimestamp = (timestamp: string): string => {
    const seconds = timestampToSeconds(timestamp)
    const baseUrl = match.videoUrl
    const separator = baseUrl.includes('?') ? '&' : '?'
    return `${baseUrl}${separator}t=${seconds}`
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/report"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Report
        </Link>

        {/* Header */}
        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Video Thumbnail */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="relative">
                <img
                  src={match.thumbnail}
                  alt={match.videoTitle}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <a
                  href={match.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                >
                  <div className="bg-white/90 p-3 rounded-full">
                    <Play className="h-8 w-8 text-slate-900" />
                  </div>
                </a>
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${categoryInfo.color} mb-3`}>
                <categoryInfo.icon className="h-4 w-4" />
                {categoryInfo.label}
              </div>

              <h1 className="text-2xl font-bold text-slate-900 mb-2">{match.videoTitle}</h1>

              <a
                href={match.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline font-medium"
              >
                {match.channelName}
              </a>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {match.views.toLocaleString()} views
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(match.uploadDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                {match.isMonetized && (
                  <div className="flex items-center gap-1 text-green-600">
                    <DollarSign className="h-4 w-4" />
                    Monetized
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate('/action-workflow')}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add to Action Plan
                </button>
                <a
                  href={match.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Confidence Analysis */}
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Confidence Analysis</h2>

              <div className="flex items-center gap-4 mb-6">
                <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getConfidenceColor(match.confidence)}`}>
                  {match.confidence}%
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {match.confidence >= 90 ? 'High Confidence Match' :
                     match.confidence >= 80 ? 'Medium Confidence Match' :
                     'Lower Confidence - Verify'}
                  </p>
                  <p className="text-sm text-slate-600">
                    Based on vocal timbre, pitch patterns, and speaking cadence
                  </p>
                </div>
              </div>

              {/* Confidence Breakdown */}
              <div className="space-y-3">
                {[
                  { label: 'Vocal Timbre Match', value: Math.min(100, match.confidence + 3) },
                  { label: 'Pitch Pattern Match', value: Math.min(100, match.confidence - 2) },
                  { label: 'Speaking Cadence', value: Math.min(100, match.confidence + 1) },
                  { label: 'Acoustic Features', value: Math.min(100, match.confidence - 5) }
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-medium text-slate-900">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Comparison */}
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Audio Comparison</h2>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Your Voice */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-slate-900 mb-3">Your Original Voice</p>
                  <div className="h-16 bg-slate-100 rounded-lg flex items-center justify-center gap-1 px-4">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-primary-400 rounded-full"
                        style={{ height: `${20 + Math.random() * 60}%` }}
                      ></div>
                    ))}
                  </div>
                  <button className="mt-3 w-full btn-secondary text-sm py-2 flex items-center justify-center gap-2">
                    <Play className="h-4 w-4" />
                    Play Sample
                  </button>
                </div>

                {/* Detected Voice */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium text-slate-900 mb-3">Detected Voice Segment</p>
                  <div className="h-16 bg-slate-100 rounded-lg flex items-center justify-center gap-1 px-4">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-400 rounded-full"
                        style={{ height: `${20 + Math.random() * 60}%` }}
                      ></div>
                    ))}
                  </div>
                  <button className="mt-3 w-full btn-secondary text-sm py-2 flex items-center justify-center gap-2">
                    <Play className="h-4 w-4" />
                    Play Detected
                  </button>
                </div>
              </div>

              {/* Timestamps */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-900 mb-2">Voice Detected at Timestamps:</p>
                <div className="flex flex-wrap gap-2">
                  {match.matchTimestamps.map(timestamp => (
                    <a
                      key={timestamp}
                      href={getVideoUrlWithTimestamp(timestamp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 px-3 py-1 rounded-full text-sm text-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Play className="h-3 w-3" />
                      {timestamp}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Analysis Summary</h2>
              <p className="text-slate-600">{match.description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Card */}
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Impact Assessment</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Total Views</span>
                  <span className="font-bold text-slate-900">{match.views.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Est. Revenue</span>
                  <span className="font-bold text-slate-900">€{match.estimatedRevenue.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Monetization</span>
                  <span className={`font-medium ${match.isMonetized ? 'text-green-600' : 'text-slate-500'}`}>
                    {match.isMonetized ? 'Yes' : 'No'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-600">Priority</span>
                  <span className={`font-medium ${
                    match.category === 'action' ? 'text-red-600' :
                    match.category === 'monitor' ? 'text-yellow-600' : 'text-slate-600'
                  }`}>
                    {match.category === 'action' ? 'High' :
                     match.category === 'monitor' ? 'Medium' : 'Low'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-2">Why this matters:</p>
                <p className="text-sm text-slate-700">
                  {match.views.toLocaleString()} views on {match.isMonetized ? 'monetized' : 'non-monetized'} content
                  {match.isMonetized && ` represents approximately €${match.estimatedRevenue.toLocaleString()} in potential earnings`}.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            {/* <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>

              <div className="space-y-2">
                <button
                  onClick={() => navigate('/action-workflow')}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Add to Action Plan
                </button>

                <button className="w-full btn-secondary flex items-center justify-center gap-2">
                  <ThumbsDown className="h-4 w-4" />
                  Mark as False Positive
                </button>

                <a
                  href={match.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-secondary flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on YouTube
                </a>
              </div>
            </div> */}

            {/* Legal Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Verify this match before taking action. Detection accuracy is 70-90%.
                Consult a legal professional for advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
