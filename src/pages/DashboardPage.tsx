import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Send,
  Mail,
  Clock,
  Scale,
  CheckCircle,
  Circle,
  ExternalLink,
  ArrowRight,
  Plus
} from 'lucide-react'
import { mockMatches } from '../data/mockData'

const STORAGE_KEY = 'voicechain_workflow_state'

type StepStatus = 'pending' | 'in_progress' | 'completed'

interface CaseStatus {
  evidence: StepStatus
  report: StepStatus
  outreach: StepStatus
  legal: StepStatus
}

const steps = [
  { key: 'evidence', label: 'Evidence Downloaded', icon: FileText },
  { key: 'report', label: 'Report Filed', icon: Send },
  { key: 'outreach', label: 'Creator Responded', icon: Mail },
  { key: 'legal', label: 'Legal Case Settled', icon: Scale }
] as const

// Hard-coded statuses for demo - different progress for each case
const hardcodedStatuses: { [caseId: string]: CaseStatus } = {
  '1': {
    evidence: 'completed',
    report: 'completed',
    outreach: 'completed',
    legal: 'in_progress'
  },
  '2': {
    evidence: 'completed',
    report: 'completed',
    outreach: 'in_progress',
    legal: 'pending'
  },
  '3': {
    evidence: 'completed',
    report: 'in_progress',
    outreach: 'pending',
    legal: 'pending'
  },
  '4': {
    evidence: 'completed',
    report: 'pending',
    outreach: 'pending',
    legal: 'pending'
  },
  '5': {
    evidence: 'in_progress',
    report: 'pending',
    outreach: 'pending',
    legal: 'pending'
  },
  '6': {
    evidence: 'pending',
    report: 'pending',
    outreach: 'pending',
    legal: 'pending'
  },
  '7': {
    evidence: 'completed',
    report: 'completed',
    outreach: 'completed',
    legal: 'completed'
  }
}

const defaultCaseStatus: CaseStatus = {
  evidence: 'pending',
  report: 'pending',
  outreach: 'pending',
  legal: 'pending'
}

function loadSelectedCases(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.selectedCases || []
    }
  } catch (e) {
    console.error('Failed to load selected cases:', e)
  }
  return []
}

export default function DashboardPage() {
  const [selectedCases, setSelectedCases] = useState<string[]>([])

  useEffect(() => {
    setSelectedCases(loadSelectedCases())
  }, [])

  const selectedMatches = mockMatches.filter(m => selectedCases.includes(m.id))

  const getCaseStatus = (caseId: string): CaseStatus => {
    return hardcodedStatuses[caseId] || defaultCaseStatus
  }

  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Circle className="h-5 w-5 text-slate-300" />
    }
  }

  const getStatusColor = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'in_progress':
        return 'bg-yellow-50 border-yellow-200'
      default:
        return 'bg-slate-50 border-slate-200'
    }
  }

  const getOverallProgress = (caseId: string) => {
    const status = getCaseStatus(caseId)
    const completed = Object.values(status).filter(s => s === 'completed').length
    return Math.round((completed / 4) * 100)
  }

  const totalRecovery = selectedMatches.reduce((sum, m) => sum + m.estimatedRevenue, 0)

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="h-8 w-8 text-indigo-500" />
            <h1 className="text-3xl font-bold text-slate-900">Case Dashboard</h1>
          </div>
          <p className="text-slate-600">Track the progress of your voice protection cases</p>
        </div>

        {selectedMatches.length === 0 ? (
          /* Empty State */
          <div className="card text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="h-8 w-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No Cases Selected</h2>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Start by selecting cases from your scan report to pursue through the action workflow.
            </p>
            <Link
              to="/action-workflow"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Go to Action Workflow
            </Link>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <p className="text-sm text-slate-500 mb-1">Active Cases</p>
                <p className="text-3xl font-bold text-slate-900">{selectedMatches.length}</p>
              </div>
              <div className="card">
                <p className="text-sm text-slate-500 mb-1">Total Estimated Recovery</p>
                <p className="text-3xl font-bold text-green-600">€{totalRecovery.toLocaleString()}</p>
              </div>
              <div className="card">
                <p className="text-sm text-slate-500 mb-1">Average Progress</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {selectedMatches.length > 0
                    ? Math.round(selectedMatches.reduce((sum, m) => sum + getOverallProgress(m.id), 0) / selectedMatches.length)
                    : 0}%
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mb-6 text-sm">
              <span className="text-slate-500">Status:</span>
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-slate-300" />
                <span className="text-slate-600">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-slate-600">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-slate-600">Completed</span>
              </div>
              {/* <span className="text-slate-400 text-xs">(Click to change status)</span> */}
            </div>

            {/* Cases Table */}
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-4 px-4 font-semibold text-slate-900">Case</th>
                      {steps.map(step => (
                        <th key={step.key} className="text-center py-4 px-2 font-semibold text-slate-900">
                          <div className="flex flex-col items-center gap-1">
                            <step.icon className="h-4 w-4 text-slate-500" />
                            <span className="text-xs">{step.label}</span>
                          </div>
                        </th>
                      ))}
                      <th className="text-center py-4 px-4 font-semibold text-slate-900">Progress</th>
                      {/* <th className="text-right py-4 px-4 font-semibold text-slate-900">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMatches.map(match => {
                      const status = getCaseStatus(match.id)
                      const progress = getOverallProgress(match.id)

                      return (
                        <tr key={match.id} className="border-b border-slate-100 last:border-0">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <a
                                href={match.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0"
                              >
                                <img
                                  src={match.thumbnail}
                                  alt=""
                                  className="w-16 h-10 object-cover rounded hover:opacity-80 transition-opacity"
                                />
                              </a>

                              <div>
                                <a
                                  href={match.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-slate-900 text-sm line-clamp-1 hover:text-indigo-600 transition-colors"
                                >
                                  {match.videoTitle}
                                </a>
                                <a
                                  href={match.channelUrl}
                                  target="_balck"
                                  rel='noopener noreferrer'
                                  className="text-xs text-slate-500  hover:text-indigo-600 transition-colors"
                                  >
                                    {match.channelName}
                                  </a>
                                <p className="text-xs text-green-600 font-medium">
                                  €{match.estimatedRevenue.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </td>
                          {steps.map(step => (
                            <td key={step.key} className="py-4 px-2 text-center">
                              <div
                                className={`p-2 rounded-lg border inline-flex ${getStatusColor(status[step.key])}`}
                                title={`${step.label}: ${status[step.key]}`}
                              >
                                {getStatusIcon(status[step.key])}
                              </div>
                            </td>
                          ))}
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-indigo-500 rounded-full transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-slate-700 w-10">
                                {progress}%
                              </span>
                            </div>
                          </td>
                          {/* <td className="py-4 px-4 text-right"> */}
                            {/* <div className="flex items-center justify-end gap-2">
                              <Link
                                to={`/report/${match.id}`}
                                className="text-slate-500 hover:text-slate-700 p-2"
                                title="View Details"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                              <a
                                href={match.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-500 hover:text-slate-700 p-2"
                                title="View on YouTube"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div> */}
                          {/* </td> */}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 flex justify-end">
              <Link
                to="/action-workflow"
                className="btn-primary inline-flex items-center gap-2"
              >
                Continue Action Workflow
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
