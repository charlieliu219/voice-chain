export interface Match {
  id: string
  thumbnail: string
  videoTitle: string
  channelName: string
  channelUrl: string
  channelEmail: string
  videoUrl: string
  uploadDate: string
  confidence: number
  views: number
  isMonetized: boolean
  matchTimestamps: string[]
  category: 'action' | 'monitor' | 'review'
  estimatedRevenue: number
  description: string
}

export interface ScanReport {
  id: string
  scanDate: string
  totalVideosScanned: number
  matchesFound: number
  estimatedTotalRevenueLoss: number
  reputationRisk: 'high' | 'medium' | 'low'
  trendPercentage: number
  matches: Match[]
}

export const mockMatches: Match[] = [
  {
    id: '1',
    thumbnail: 'https://picsum.photos/seed/vid1/320/180',
    videoTitle: 'AI Voice Tutorial: How to Clone Any Voice in Minutes',
    channelName: 'TechGuru Pro',
    channelUrl: 'https://youtube.com/@techgurupro',
    channelEmail: 'contact@techgurupro.com',
    videoUrl: 'https://youtube.com/watch?v=abc123',
    uploadDate: '2025-12-01',
    confidence: 94,
    views: 523000,
    isMonetized: true,
    matchTimestamps: ['2:34', '5:12', '8:45'],
    category: 'action',
    estimatedRevenue: 2100,
    description: 'This video uses your cloned voice to demonstrate AI voice cloning technology without permission.'
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/seed/vid2/320/180',
    videoTitle: 'Best Gaming Commentary Compilation 2025',
    channelName: 'GameStream Daily',
    channelUrl: 'https://youtube.com/@gamestreamdaily',
    channelEmail: 'business@gamestreamdaily.com',
    videoUrl: 'https://youtube.com/watch?v=def456',
    uploadDate: '2025-11-28',
    confidence: 91,
    views: 189000,
    isMonetized: true,
    matchTimestamps: ['0:45', '3:22'],
    category: 'action',
    estimatedRevenue: 756,
    description: 'Gaming compilation featuring AI-generated commentary using your voice profile.'
  },
  {
    id: '3',
    thumbnail: 'https://picsum.photos/seed/vid3/320/180',
    videoTitle: 'Product Review: New Tech Gadgets You Need',
    channelName: 'ReviewMaster',
    channelUrl: 'https://youtube.com/@reviewmaster',
    channelEmail: 'hello@reviewmaster.net',
    videoUrl: 'https://youtube.com/watch?v=ghi789',
    uploadDate: '2025-11-15',
    confidence: 87,
    views: 67000,
    isMonetized: true,
    matchTimestamps: ['1:20', '4:55', '7:30', '9:15'],
    category: 'monitor',
    estimatedRevenue: 268,
    description: 'Product review video with narration matching your vocal patterns.'
  },
  {
    id: '4',
    thumbnail: 'https://picsum.photos/seed/vid4/320/180',
    videoTitle: 'Podcast Episode: The Future of Content Creation',
    channelName: 'Digital Talks',
    channelUrl: 'https://youtube.com/@digitaltalks',
    channelEmail: 'info@digitaltalks.io',
    videoUrl: 'https://youtube.com/watch?v=jkl012',
    uploadDate: '2025-11-10',
    confidence: 84,
    views: 34000,
    isMonetized: false,
    matchTimestamps: ['12:45'],
    category: 'monitor',
    estimatedRevenue: 0,
    description: 'Podcast discussing AI and content creation with a voice segment matching yours.'
  },
  {
    id: '5',
    thumbnail: 'https://picsum.photos/seed/vid5/320/180',
    videoTitle: 'Educational Video: Learning German for Beginners',
    channelName: 'LanguageLab',
    channelUrl: 'https://youtube.com/@languagelab',
    channelEmail: 'support@languagelab.edu',
    videoUrl: 'https://youtube.com/watch?v=mno345',
    uploadDate: '2025-10-25',
    confidence: 79,
    views: 12000,
    isMonetized: false,
    matchTimestamps: ['5:00'],
    category: 'review',
    estimatedRevenue: 0,
    description: 'Language learning content with voice patterns similar to yours - may require manual verification.'
  },
  {
    id: '6',
    thumbnail: 'https://picsum.photos/seed/vid6/320/180',
    videoTitle: 'ASMR Relaxation: Gentle Voice for Sleep',
    channelName: 'CalmSounds',
    channelUrl: 'https://youtube.com/@calmsounds',
    channelEmail: 'calmsounds.asmr@gmail.com',
    videoUrl: 'https://youtube.com/watch?v=pqr678',
    uploadDate: '2025-10-18',
    confidence: 76,
    views: 8500,
    isMonetized: true,
    matchTimestamps: ['0:00', '15:30', '28:00'],
    category: 'review',
    estimatedRevenue: 34,
    description: 'ASMR content with voice characteristics resembling yours. Lower confidence - verify before action.'
  },
  {
    id: '7',
    thumbnail: 'https://picsum.photos/seed/vid7/320/180',
    videoTitle: 'Breaking News Commentary: Tech Industry Update',
    channelName: 'NewsFlash',
    channelUrl: 'https://youtube.com/@newsflash',
    channelEmail: 'press@newsflash.media',
    videoUrl: 'https://youtube.com/watch?v=stu901',
    uploadDate: '2025-12-05',
    confidence: 92,
    views: 245000,
    isMonetized: true,
    matchTimestamps: ['0:30', '2:15', '4:00'],
    category: 'action',
    estimatedRevenue: 980,
    description: 'News commentary video using AI-generated voice matching your vocal signature.'
  }
]

export const mockReport: ScanReport = {
  id: 'scan-001',
  scanDate: '2025-12-10',
  totalVideosScanned: 2847,
  matchesFound: 7,
  estimatedTotalRevenueLoss: 4138,
  reputationRisk: 'high',
  trendPercentage: 200,
  matches: mockMatches
}

export interface ActionPlan {
  id: string
  name: string
  createdAt: string
  cases: ActionCase[]
}

export interface ActionCase {
  matchId: string
  status: 'pending' | 'evidence_collected' | 'platform_reported' | 'contacted' | 'waiting' | 'escalated' | 'resolved'
  currentStep: number
  notes: string[]
  timeline: TimelineEvent[]
}

export interface TimelineEvent {
  date: string
  action: string
  details: string
}

export const mockActionPlan: ActionPlan = {
  id: 'plan-001',
  name: 'Q1 2026 Voice Protection',
  createdAt: '2025-12-10',
  cases: [
    {
      matchId: '1',
      status: 'contacted',
      currentStep: 4,
      notes: ['High priority - commercial use', 'Sent initial outreach on Dec 10'],
      timeline: [
        { date: '2025-12-10', action: 'Case Created', details: 'Added to action plan' },
        { date: '2025-12-10', action: 'Evidence Collected', details: 'Downloaded video, screenshots captured' },
        { date: '2025-12-11', action: 'Platform Report Filed', details: 'YouTube copyright claim submitted' },
        { date: '2025-12-11', action: 'Creator Contacted', details: 'Email sent requesting removal' }
      ]
    },
    {
      matchId: '2',
      status: 'evidence_collected',
      currentStep: 2,
      notes: ['Gaming content - clear commercial use'],
      timeline: [
        { date: '2025-12-10', action: 'Case Created', details: 'Added to action plan' },
        { date: '2025-12-10', action: 'Evidence Collected', details: 'Downloaded video, screenshots captured' }
      ]
    }
  ]
}

export const legalPartners = [
  {
    id: '1',
    name: 'Dr. Anna Müller',
    firm: 'Müller & Partner Rechtsanwälte',
    specialization: 'IP & Media Law',
    location: 'Berlin',
    rating: 4.9,
    consultationFee: 'Free 15-min',
    hourlyRate: '€250-350',
    languages: ['German', 'English'],
    available: true
  },
  {
    id: '2',
    name: 'Thomas Weber',
    firm: 'Weber Legal',
    specialization: 'Digital Rights & GDPR',
    location: 'Munich',
    rating: 4.8,
    consultationFee: 'Free 15-min',
    hourlyRate: '€200-300',
    languages: ['German', 'English', 'French'],
    available: true
  },
  {
    id: '3',
    name: 'Dr. Sarah Klein',
    firm: 'Klein Intellectual Property',
    specialization: 'Copyright & Personality Rights',
    location: 'Hamburg',
    rating: 4.7,
    consultationFee: 'Free 15-min',
    hourlyRate: '€280-380',
    languages: ['German', 'English'],
    available: false
  }
]
