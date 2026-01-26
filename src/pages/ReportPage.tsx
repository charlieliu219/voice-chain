import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  DollarSign,
  Eye,
  Calendar,
  ExternalLink,
  Download,
  Filter,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react'
import { mockReport, Match } from '../data/mockData'

export default function ReportPage() {
  const navigate = useNavigate()
  const [selectedMatches, setSelectedMatches] = useState<string[]>([])
  const [filterCategory, setFilterCategory] = useState<'all' | 'action' | 'monitor' | 'review'>('all')

  const filteredMatches = mockReport.matches.filter(
    match => filterCategory === 'all' || match.category === filterCategory
  )

  const toggleMatch = (matchId: string) => {
    setSelectedMatches(prev =>
      prev.includes(matchId)
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    )
  }

  const toggleAll = () => {
    if (selectedMatches.length === filteredMatches.length) {
      setSelectedMatches([])
    } else {
      setSelectedMatches(filteredMatches.map(m => m.id))
    }
  }

  const getCategoryBadge = (category: Match['category']) => {
    switch (category) {
      case 'action':
        return <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">Take Action</span>
      case 'monitor':
        return <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-1 rounded-full">Monitor</span>
      case 'review':
        return <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-1 rounded-full">Review</span>
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-red-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-slate-600'
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Voice Detection Report</h1>
            <p className="text-slate-600 mt-1">
              Scan completed on {new Date(mockReport.scanDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="h-5 w-5 text-slate-500" />
              <span className="text-sm text-slate-600">Videos Scanned</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {mockReport.totalVideosScanned.toLocaleString()}
            </p>
          </div>

          <div className="card bg-red-50 border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-600">Matches Found</span>
            </div>
            <p className="text-3xl font-bold text-red-600">
              {mockReport.matchesFound}
            </p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-slate-500" />
              <span className="text-sm text-slate-600">Est. Revenue Loss</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              €{mockReport.estimatedTotalRevenueLoss.toLocaleString()}
            </p>
          </div>

          {/* <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-slate-500" />
              <span className="text-sm text-slate-600">Voice Usage Trend</span>
            </div>
            <p className="text-3xl font-bold text-red-600">
              +{mockReport.trendPercentage}%
            </p>
            <p className="text-xs text-slate-500">vs last 6 months</p>
          </div> */}
        </div>

        {/* Impact Assessment */}
        {/* <div className="card mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Impact Assessment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Estimated Lost Revenue</p>
                <p className="text-xl font-bold text-slate-900">€{mockReport.estimatedTotalRevenueLoss.toLocaleString()}</p>
                <p className="text-xs text-slate-500">Based on 1.1M total views across matches</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${mockReport.reputationRisk === 'high' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                <AlertTriangle className={`h-5 w-5 ${mockReport.reputationRisk === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />
              </div>
              <div>
                <p className="text-sm text-slate-600">Reputation Risk</p>
                <p className="text-xl font-bold text-slate-900 capitalize">{mockReport.reputationRisk}</p>
                <p className="text-xs text-slate-500">Based on content type and reach</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Trend Analysis</p>
                <p className="text-xl font-bold text-slate-900">+{mockReport.trendPercentage}% growth</p>
                <p className="text-xs text-slate-500">Your voice usage increased significantly</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Matches Table */}
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Detected Matches</h2>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <div className="flex gap-1">
                {(['all', 'action', 'monitor', 'review'] as const).map(category => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                      filterCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedMatches.length > 0 && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4 flex items-center justify-between">
              <span className="text-primary-700 font-medium">
                {selectedMatches.length} match{selectedMatches.length > 1 ? 'es' : ''} selected
              </span>
              <button
                onClick={() => navigate('/action-workflow')}
                className="btn-primary flex items-center gap-2"
              >
                Add to Action Plan
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-600 mb-2">
            <div className="col-span-1">
              <input
                type="checkbox"
                checked={selectedMatches.length === filteredMatches.length && filteredMatches.length > 0}
                onChange={toggleAll}
                className="rounded border-slate-300"
              />
            </div>
            <div className="col-span-4">Video</div>
            <div className="col-span-2">Channel</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1">Confidence</div>
            <div className="col-span-1">Views</div>
            <div className="col-span-2">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {filteredMatches.map(match => (
              <div
                key={match.id}
                className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                  selectedMatches.includes(match.id) ? 'border-primary-500 bg-primary-50/50' : 'border-slate-200'
                }`}
              >
                <div className="md:grid md:grid-cols-12 gap-4 items-center">
                  {/* Checkbox */}
                  <div className="hidden md:block col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedMatches.includes(match.id)}
                      onChange={() => toggleMatch(match.id)}
                      className="rounded border-slate-300"
                    />
                  </div>

                  {/* Video Info */}
                  <div className="col-span-4 flex items-center gap-3 mb-3 md:mb-0">
                    <input
                      type="checkbox"
                      checked={selectedMatches.includes(match.id)}
                      onChange={() => toggleMatch(match.id)}
                      className="rounded border-slate-300 md:hidden"
                    />
                    <img
                      src={match.thumbnail}
                      alt={match.videoTitle}
                      className="w-24 h-14 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <a
                        href={`${match.videoUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-900 hover:text-primary-600 truncate block"
                      >
                        {match.videoTitle}
                      </a>
                      <div className="mt-1">
                        {getCategoryBadge(match.category)}
                      </div>
                    </div>
                  </div>

                  {/* Channel */}
                  <div className="col-span-2 text-slate-600 text-sm mb-2 md:mb-0">
                    <span className="md:hidden text-slate-500">Channel: </span>
                    {match.channelName}
                  </div>

                  {/* Date */}
                  <div className="col-span-1 text-slate-600 text-sm mb-2 md:mb-0">
                    <span className="md:hidden text-slate-500">Date: </span>
                    {new Date(match.uploadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>

                  {/* Confidence */}
                  <div className={`col-span-1 font-bold text-lg mb-2 md:mb-0 ${getConfidenceColor(match.confidence)}`}>
                    <span className="md:hidden text-slate-500 font-normal text-sm">Confidence: </span>
                    {match.confidence}%
                  </div>

                  {/* Views */}
                  <div className="col-span-1 text-slate-600 text-sm mb-3 md:mb-0">
                    <span className="md:hidden text-slate-500">Views: </span>
                    {(match.views / 1000).toFixed(0)}K
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex gap-2">
                    <Link
                      to={`/report/${match.id}`}
                      className="flex-1 md:flex-none btn-secondary text-sm py-2 px-3 flex items-center justify-center gap-1"
                    >
                      Details
                    </Link>
                    <a
                      href={match.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm py-2 px-3 flex items-center justify-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Action Workflow CTA Section */}
        <div className="card mt-8 bg-gradient-to-br from-primary-50 to-slate-50 border-primary-200">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Take Action on Your Matches</h2>
              <p className="text-slate-600 mb-4">
                Our Action Workflow guides you through protecting your voice rights with automated tools and professional support.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-1.5 rounded-lg mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">DMCA Takedown Requests</p>
                    <p className="text-slate-500 text-xs">Auto-generated legal notices sent directly to platforms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-1.5 rounded-lg mt-0.5">
                    <DollarSign className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Revenue Recovery</p>
                    <p className="text-slate-500 text-xs">Claim ad revenue from infringing videos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-1.5 rounded-lg mt-0.5">
                    <Shield className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Legal Escalation</p>
                    <p className="text-slate-500 text-xs">Connect with IP attorneys for serious cases</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary-100 p-1.5 rounded-lg mt-0.5">
                    <Eye className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Ongoing Monitoring</p>
                    <p className="text-slate-500 text-xs">Get alerts when new matches are detected</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center lg:border-l lg:border-primary-200 lg:pl-6">
              <p className="text-sm text-slate-600 mb-3 text-center lg:text-left">
                {selectedMatches.length > 0
                  ? `${selectedMatches.length} match${selectedMatches.length > 1 ? 'es' : ''} selected`
                  : 'Select matches above or start with all cases'
                }
              </p>
              <button
                onClick={() => navigate('/action-workflow')}
                className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Start Action Workflow
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Zero-Knowledge Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Voice sample auto-deleted</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Report generated {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
