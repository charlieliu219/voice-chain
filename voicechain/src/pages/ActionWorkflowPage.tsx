import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  Download,
  Copy,
  ExternalLink,
  Mail,
  FileText,
  Scale,
  AlertTriangle,
  Clock,
  Calendar,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react'
import { mockMatches, legalPartners } from '../data/mockData'

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7

export default function ActionWorkflowPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [selectedCases, setSelectedCases] = useState<string[]>(['1', '2', '7'])
  const [expandedTemplates, setExpandedTemplates] = useState<string[]>([])

  const steps = [
    { id: 1, label: 'Case Selection', shortLabel: 'Select' },
    { id: 2, label: 'Evidence Collection', shortLabel: 'Evidence' },
    { id: 3, label: 'Platform Reporting', shortLabel: 'Report' },
    { id: 4, label: 'Direct Outreach', shortLabel: 'Outreach' },
    { id: 5, label: 'Wait & Monitor', shortLabel: 'Monitor' },
    { id: 6, label: 'Escalation', shortLabel: 'Escalate' },
    { id: 7, label: 'Legal Consultation', shortLabel: 'Legal' }
  ]

  const selectedMatches = mockMatches.filter(m => selectedCases.includes(m.id))

  const toggleTemplate = (id: string) => {
    setExpandedTemplates(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/report" className="text-slate-600 hover:text-slate-900 text-sm mb-2 inline-block">
            ← Back to Report
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Guided Action Workflow</h1>
          <p className="text-slate-600 mt-1">Step-by-step guidance to protect your voice rights</p>
        </div>

        {/* Step Progress */}
        <div className="card mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(step.id as Step)}
                  className={`flex flex-col items-center ${
                    currentStep === step.id ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : currentStep === step.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    currentStep === step.id ? 'text-primary-600' : 'text-slate-600'
                  }`}>
                    {step.shortLabel}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-slate-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="card">
          {/* Step 1: Case Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 1: Select Cases to Pursue</h2>
              <p className="text-slate-600 mb-6">
                Choose which matches you want to take action on. We recommend starting with 3-5 high-impact cases.
              </p>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                <p className="text-primary-800 text-sm">
                  <strong>Recommendation:</strong> Start with high-confidence matches (90%+) that have significant views.
                  These cases have the strongest evidence and highest potential recovery.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {mockMatches.filter(m => m.category === 'action' || m.category === 'monitor').map(match => (
                  <div
                    key={match.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCases.includes(match.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => {
                      setSelectedCases(prev =>
                        prev.includes(match.id)
                          ? prev.filter(id => id !== match.id)
                          : [...prev, match.id]
                      )
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedCases.includes(match.id)}
                        onChange={() => {}}
                        className="rounded border-slate-300"
                      />
                      <img src={match.thumbnail} alt="" className="w-20 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{match.videoTitle}</p>
                        <p className="text-sm text-slate-600">{match.channelName}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          match.confidence >= 90 ? 'text-red-600' : 'text-yellow-600'
                        }`}>{match.confidence}%</p>
                        <p className="text-sm text-slate-600">{(match.views/1000).toFixed(0)}K views</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Selected cases:</span>
                  <span className="font-bold text-slate-900">{selectedCases.length}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-slate-600">Total estimated recovery:</span>
                  <span className="font-bold text-green-600">
                    €{selectedMatches.reduce((sum, m) => sum + m.estimatedRevenue, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Evidence Collection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 2: Collect Evidence</h2>
              <p className="text-slate-600 mb-6">
                Build a strong case by gathering all necessary evidence for each selected match.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  { id: 'download', label: 'Download infringing videos', desc: 'Save copies of the videos using youtube-dl or manual download' },
                  { id: 'screenshot', label: 'Screenshot video metadata', desc: 'Capture upload date, views, description, and monetization status' },
                  { id: 'export', label: 'Export VoiceChain detection report', desc: 'PDF with confidence scores and analysis' },
                  { id: 'timestamp', label: 'Document timestamps where voice appears', desc: 'Note exact times in the video where your voice is used' },
                  { id: 'harm', label: 'Document any harm caused', desc: 'Lost revenue, reputation damage, confusion among audience' }
                ].map((item, index) => (
                  <div key={item.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <input type="checkbox" className="mt-1 rounded border-slate-300" />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{item.label}</p>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                    {index === 2 && (
                      <button className="btn-secondary text-sm py-2 px-3 flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Export
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm">
                  <strong>Tip:</strong> Store all evidence in a dedicated folder for each case.
                  This will be essential if you need to escalate to legal action.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Platform Reporting */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 3: File Platform Reports</h2>
              <p className="text-slate-600 mb-6">
                Submit copyright claims directly to YouTube for each infringing video.
              </p>

              <div className="border rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-slate-900 mb-4">YouTube Copyright Claim</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Video URL</label>
                    <input
                      type="text"
                      value="https://youtube.com/watch?v=abc123"
                      readOnly
                      className="input bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Claim Statement (Template)</label>
                    <textarea
                      className="input min-h-[120px]"
                      defaultValue={`My voice rights (personality rights under German law, BGB §823) were violated in this video.

The content at timestamps [2:34, 5:12, 8:45] contains unauthorized use of my voice, which was cloned using AI technology without my consent.

Under German Civil Code (BGB) §823 and EU GDPR Article 4(1) regarding biometric data, I request immediate removal of this content.

I have not authorized [Channel Name] to use my voice in any capacity.`}
                    />
                  </div>

                  <a
                    href="https://www.youtube.com/copyright_complaint_form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open YouTube Copyright Form
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-2">Track Submissions</h4>
                <div className="space-y-2">
                  {selectedMatches.slice(0, 3).map(match => (
                    <div key={match.id} className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
                      <span className="text-slate-700">{match.videoTitle.slice(0, 40)}...</span>
                      <select className="text-sm border rounded px-2 py-1">
                        <option>Not Filed</option>
                        <option>Filed - Pending</option>
                        <option>Resolved</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Direct Outreach */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 4: Contact Creators Directly</h2>
              <p className="text-slate-600 mb-6">
                Many cases can be resolved with direct communication. Choose your tone and send an outreach message.
              </p>

              <div className="border rounded-lg mb-6">
                <button
                  onClick={() => toggleTemplate('email')}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-slate-500" />
                    <span className="font-medium text-slate-900">Email/Message Template</span>
                  </div>
                  {expandedTemplates.includes('email') ? (
                    <ChevronUp className="h-5 w-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  )}
                </button>

                {expandedTemplates.includes('email') && (
                  <div className="px-4 pb-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
                      <div className="flex gap-2">
                        {['Friendly', 'Formal', 'Legal'].map(tone => (
                          <button
                            key={tone}
                            className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50"
                          >
                            {tone}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      className="input min-h-[200px] font-mono text-sm"
                      defaultValue={`Subject: Voice Usage in Your Video "[Video Title]"

Hi [Creator Name],

I'm [Your Name], and I recently discovered that my voice was used in your video "[Video Title]" ([Video URL]). I did not authorize this use.

I understand this may have been unintentional, but as my voice is protected under German personality rights law (BGB §823), I need to address this.

I'd appreciate if you could:
☐ Remove the video within 7 days
☐ Credit me and add a link to my channel
☐ Discuss potential licensing terms

If I don't hear back by [Date + 7 days], I'll need to pursue formal action through YouTube's copyright system.

Thanks for understanding,
[Your Name]`}
                    />

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => copyToClipboard('')}
                        className="btn-secondary text-sm py-2 px-3 flex items-center gap-1"
                      >
                        <Copy className="h-4 w-4" />
                        Copy Template
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-3">Outreach Tracker</h4>
                <p className="text-sm text-slate-600 mb-3">Track your communications for each case:</p>
                {selectedMatches.slice(0, 3).map(match => (
                  <div key={match.id} className="flex items-center justify-between py-3 border-b border-slate-200 last:border-0">
                    <span className="text-slate-700">{match.channelName}</span>
                    <div className="flex items-center gap-2">
                      <select className="text-sm border rounded px-2 py-1">
                        <option>Not Contacted</option>
                        <option>Message Sent</option>
                        <option>Awaiting Response</option>
                        <option>Responded</option>
                      </select>
                      <button className="text-primary-600 text-sm hover:underline">
                        Log Response
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Wait & Monitor */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 5: Wait & Monitor</h2>
              <p className="text-slate-600 mb-6">
                Track responses and set follow-up reminders. Most creators respond within 7-14 days.
              </p>

              <div className="space-y-4 mb-6">
                {selectedMatches.slice(0, 3).map((match, i) => (
                  <div key={match.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-slate-900">{match.channelName}</p>
                        <p className="text-sm text-slate-600">{match.videoTitle.slice(0, 50)}...</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        i === 0 ? 'bg-green-100 text-green-700' :
                        i === 1 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {i === 0 ? 'Responded' : i === 1 ? 'Awaiting' : 'Not Contacted'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Contacted: Dec 10</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Follow-up: Dec 17</span>
                      </div>
                    </div>

                    {i === 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-sm text-slate-700">
                          <strong>Response:</strong> "Hi, I apologize for the confusion. I'll remove the video within 48 hours."
                        </p>
                        <div className="mt-2 flex gap-2">
                          <button className="text-green-600 text-sm hover:underline">Mark Resolved</button>
                          <button className="text-slate-600 text-sm hover:underline">Send Follow-up</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary-800">Automatic Reminders</p>
                    <p className="text-sm text-primary-700">
                      We'll send you email reminders when it's time to follow up or escalate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Escalation */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 6: Escalation Decision</h2>
              <p className="text-slate-600 mb-6">
                Based on responses (or lack thereof), our system recommends next steps for each case.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">Escalate to Attorney</p>
                      <p className="text-sm text-red-700 mb-2">TechGuru Pro - No response after 14 days, high-value case (523K views)</p>
                      <button className="btn-primary text-sm py-2">Connect with Legal Partner</button>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800">Send Formal Abmahnung</p>
                      <p className="text-sm text-yellow-700 mb-2">GameStream Daily - No response after 7 days, moderate case</p>
                      <button className="btn-secondary text-sm py-2">Generate Abmahnung</button>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Case Resolved</p>
                      <p className="text-sm text-green-700">NewsFlash - Creator complied and removed video</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Abmahnung Template */}
              <div className="border rounded-lg">
                <button
                  onClick={() => toggleTemplate('abmahnung')}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-slate-500" />
                    <span className="font-medium text-slate-900">German Abmahnung Template (Cease & Desist)</span>
                  </div>
                  {expandedTemplates.includes('abmahnung') ? (
                    <ChevronUp className="h-5 w-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  )}
                </button>

                {expandedTemplates.includes('abmahnung') && (
                  <div className="px-4 pb-4">
                    <textarea
                      className="input min-h-[250px] font-mono text-sm"
                      defaultValue={`ABMAHNUNG

[Your Name]
[Your Address]
[Date]

An: [Creator/Company Name]
[Address if known]

Betreff: Unterlassungsforderung wegen Verletzung von Persönlichkeitsrechten

Sehr geehrte Damen und Herren,

hiermit fordere ich Sie auf, die unerlaubte Nutzung meiner Stimme in Ihrem Video "[Video Title]" ([URL]) unverzüglich zu unterlassen.

Die Verwendung meiner Stimme ohne meine Einwilligung verstößt gegen:
• BGB §823 Abs. 1 (Allgemeines Persönlichkeitsrecht)
• BGB §1004 (Unterlassungsanspruch)
• Art. 4(1) DSGVO (Biometrische Daten)

Ich fordere Sie auf:
1. Das Video innerhalb von 7 Tagen zu entfernen
2. Eine strafbewehrte Unterlassungserklärung abzugeben
3. Mir die entstandenen Kosten zu erstatten

Sollten Sie dieser Aufforderung nicht nachkommen, behalte ich mir rechtliche Schritte vor.

Mit freundlichen Grüßen,
[Your Name]`}
                    />
                    <div className="mt-3 flex gap-2">
                      <button className="btn-secondary text-sm py-2 px-3 flex items-center gap-1">
                        <Copy className="h-4 w-4" />
                        Copy
                      </button>
                      <button className="btn-secondary text-sm py-2 px-3 flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 7: Legal Consultation */}
          {currentStep === 7 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Step 7: Legal Partner Consultation</h2>
              <p className="text-slate-600 mb-6">
                Connect with vetted German IP attorneys who specialize in personality rights and digital media.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Free 15-Minute Consultation</p>
                    <p className="text-sm text-green-700">All our legal partners offer a free initial case evaluation</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {legalPartners.map(partner => (
                  <div key={partner.id} className="border rounded-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xl">
                          {partner.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{partner.name}</h3>
                          <p className="text-slate-600">{partner.firm}</p>
                          <p className="text-sm text-primary-600">{partner.specialization}</p>

                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                            <span>{partner.location}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span>{partner.rating}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {partner.languages.map(lang => (
                              <span key={lang} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-slate-600 mb-1">{partner.consultationFee}</p>
                        <p className="text-sm text-slate-600 mb-3">Hourly: {partner.hourlyRate}</p>
                        {partner.available ? (
                          <button className="btn-primary text-sm">
                            Book Consultation
                          </button>
                        ) : (
                          <span className="text-slate-500 text-sm">Currently Unavailable</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-3">What to Expect</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: 'Case strength assessment', desc: 'Under German personality rights law' },
                    { label: 'Litigation strategy', desc: 'Abmahnung → Landgericht pathway' },
                    { label: 'Cost estimation', desc: 'Fixed fee or hourly options' },
                    { label: 'Timeline guidance', desc: 'Expected duration and milestones' }
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1) as Step)}
              disabled={currentStep === 1}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {currentStep < 7 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(7, prev + 1) as Step)}
                className="btn-primary flex items-center gap-2"
              >
                Next Step
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button className="btn-primary flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Complete Workflow
              </button>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 card bg-slate-50">
          <div className="flex items-start gap-4">
            <MessageSquare className="h-6 w-6 text-primary-600" />
            <div>
              <h3 className="font-semibold text-slate-900">Need Help?</h3>
              <p className="text-slate-600 text-sm mt-1">
                Our support team is available to answer questions about your action plan.
                Common questions are covered in our FAQ.
              </p>
              <div className="mt-3 flex gap-3">
                <button className="text-primary-600 text-sm font-medium hover:underline">
                  View FAQ
                </button>
                <button className="text-primary-600 text-sm font-medium hover:underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
