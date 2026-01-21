import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload,
  Mic,
  FileAudio,
  X,
  Lock,
  Trash2,
  ChevronRight,
  Info,
  Search,
  Clock,
  Filter,
  Play,
  Pause,
  Square
} from 'lucide-react'

type Step = 'upload' | 'filters' | 'review'

export default function UploadPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<Step>('upload')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackProgress, setPlaybackProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  // Recording refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Filter state
  const [keywords, setKeywords] = useState('')
  const [channelSize, setChannelSize] = useState('1000')
  const [timeRange, setTimeRange] = useState('6')
  const [specificChannels, setSpecificChannels] = useState('')
  const [sensitivity, setSensitivity] = useState<'strict' | 'balanced' | 'broad'>('balanced')

  // Cleanup audio URL on unmount or when file changes
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [audioUrl])

  // Handle audio element events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setPlaybackProgress(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setAudioDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setPlaybackProgress(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const file = new File([blob], `recording-${Date.now()}.webm`, { type: 'audio/webm' })
        setUploadedFile(file)

        // Create URL for playback
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingDuration(0)

      // Start duration counter
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      alert('Could not access microphone. Please ensure you have granted permission.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
        recordingIntervalRef.current = null
      }
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const togglePlayback = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const time = parseFloat(e.target.value)
    audioRef.current.currentTime = time
    setPlaybackProgress(time)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('audio/')) {
        setUploadedFile(file)
        const url = URL.createObjectURL(file)
        setAudioUrl(url)
      }
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadedFile(file)
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
    }
  }

  const handleRemoveFile = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setUploadedFile(null)
    setAudioUrl(null)
    setPlaybackProgress(0)
    setAudioDuration(0)
    setIsPlaying(false)
  }

  const handleStartScan = () => {
    navigate('/processing')
  }

  const steps = [
    { id: 'upload', label: 'Voice Sample', icon: Mic },
    { id: 'filters', label: 'Smart Filters', icon: Filter },
    { id: 'review', label: 'Review & Start', icon: Search }
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hidden audio element for playback */}
        {audioUrl && (
          <audio ref={audioRef} src={audioUrl} preload="metadata" />
        )}

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (step.id === 'upload' || (step.id === 'filters' && uploadedFile) || (step.id === 'review' && uploadedFile)) {
                      setCurrentStep(step.id as Step)
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentStep === step.id
                      ? 'bg-primary-600 text-white'
                      : uploadedFile || index === 0
                      ? 'bg-white text-slate-600 hover:bg-slate-100'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                  <span className="font-medium">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-slate-400 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Upload */}
        {currentStep === 'upload' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Your Voice Sample</h2>
            <p className="text-slate-600 mb-6">
              We'll use this to detect unauthorized copies across YouTube.
            </p>

            {/* Privacy Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex gap-3">
              <Lock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Your voice is protected</p>
                <p className="text-green-700 text-sm">
                  Voice encrypted on your device before upload. Automatically deleted within 1 hour after scan completes.
                </p>
              </div>
            </div>

            {!uploadedFile ? (
              <>
                {/* Drag & Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                    dragActive
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-slate-300 hover:border-primary-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-slate-900 mb-2">
                    Drag and drop your voice sample here
                  </p>
                  <p className="text-slate-500 mb-4">
                    MP3, WAV, or M4A • Minimum 30 seconds • Recommended 1-2 minutes
                  </p>
                  <label className="btn-primary inline-flex items-center gap-2 cursor-pointer">
                    <FileAudio className="h-5 w-5" />
                    Browse Files
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Or Record */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-slate-500 text-sm">or record directly</span>
                  </div>
                </div>

                {/* Recording Button */}
                <button
                  onClick={toggleRecording}
                  className={`w-full py-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                    isRecording
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-slate-200 hover:border-primary-400 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isRecording ? (
                      <Square className="h-5 w-5 fill-current" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                    )}
                    <span className="font-medium">
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </span>
                  </div>
                  {isRecording && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span>Recording: {formatTime(recordingDuration)}</span>
                    </div>
                  )}
                </button>

                {isRecording && (
                  <p className="text-center text-sm text-slate-500 mt-3">
                    Speak clearly for at least 30 seconds. Click stop when finished.
                  </p>
                )}
              </>
            ) : (
              /* File Uploaded / Recorded */
              <div className="border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <FileAudio className="h-8 w-8 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{uploadedFile.name}</p>
                      <p className="text-sm text-slate-500">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                        {audioDuration > 0 && ` • ${formatTime(audioDuration)}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-slate-500" />
                  </button>
                </div>

                {/* Audio Player */}
                <div className="bg-slate-100 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause Button */}
                    <button
                      onClick={togglePlayback}
                      className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5 ml-0.5" />
                      )}
                    </button>

                    {/* Progress Bar */}
                    <div className="flex-1">
                      <input
                        type="range"
                        min={0}
                        max={audioDuration || 100}
                        value={playbackProgress}
                        onChange={handleSeek}
                        className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-primary-600"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>{formatTime(playbackProgress)}</span>
                        <span>{formatTime(audioDuration)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Waveform Visualization (decorative) */}
                  <div className="mt-4 h-12 flex items-center justify-center gap-0.5">
                    {[...Array(60)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isPlaying ? 'bg-primary-500' : 'bg-slate-400'
                        }`}
                        style={{
                          height: `${20 + Math.sin(i * 0.3 + (isPlaying ? playbackProgress : 0)) * 30 + Math.random() * 20}%`,
                          opacity: i / 60 <= playbackProgress / audioDuration ? 1 : 0.4
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                  <Lock className="h-4 w-4" />
                  <span>Voice sample ready for encrypted processing</span>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setCurrentStep('filters')}
                disabled={!uploadedFile}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Filters
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Filters */}
        {currentStep === 'filters' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Configure Smart Filters</h2>
            <p className="text-slate-600 mb-6">
              Narrow down the search to find relevant matches faster and reduce costs.
            </p>

            <div className="space-y-6">
              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Keywords / Topics
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., gaming, tech reviews, tutorials"
                  className="input"
                />
                <p className="mt-1 text-sm text-slate-500">
                  Comma-separated topics to focus the search
                </p>
              </div>

              {/* Channel Size */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Minimum Channel Size
                </label>
                <select
                  value={channelSize}
                  onChange={(e) => setChannelSize(e.target.value)}
                  className="input"
                >
                  <option value="0">All channels</option>
                  <option value="1000">1,000+ subscribers</option>
                  <option value="10000">10,000+ subscribers</option>
                  <option value="100000">100,000+ subscribers</option>
                </select>
                <p className="mt-1 text-sm text-slate-500">
                  Skip smaller channels to reduce noise
                </p>
              </div>

              {/* Time Range */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Time Range
                </label>
                <div className="flex gap-3">
                  {[
                    { value: '3', label: 'Last 3 months' },
                    { value: '6', label: 'Last 6 months' },
                    { value: '12', label: 'Last 12 months' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTimeRange(option.value)}
                      className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                        timeRange === option.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Channels */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Specific Channels (Optional)
                </label>
                <textarea
                  value={specificChannels}
                  onChange={(e) => setSpecificChannels(e.target.value)}
                  placeholder="Paste YouTube channel URLs, one per line"
                  className="input min-h-[100px]"
                />
                <p className="mt-1 text-sm text-slate-500">
                  Target specific channels if you suspect certain creators
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setCurrentStep('upload')}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep('review')}
                className="btn-primary flex items-center gap-2"
              >
                Review Settings
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 'review' && (
          <div className="card">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Start Scan</h2>
            <p className="text-slate-600 mb-6">
              Confirm your settings and start the voice detection scan.
            </p>

            {/* Scan Summary */}
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Scan Summary</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Search className="h-4 w-4" />
                    <span className="text-sm">Est. Videos</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">~2,500</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Processing Time</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">6-12 hrs</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm">Filters Applied</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                </div>
              </div>
            </div>

            {/* Sensitivity */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-900 mb-3">Detection Sensitivity</h3>
              <div className="space-y-3">
                {[
                  { value: 'strict', label: 'Strict', desc: '90%+ confidence only - fewer matches, highest certainty', color: 'red' },
                  { value: 'balanced', label: 'Balanced (Recommended)', desc: '80%+ confidence - good balance of matches and accuracy', color: 'yellow' },
                  { value: 'broad', label: 'Broad', desc: '70%+ confidence - more matches, may include false positives', color: 'gray' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSensitivity(option.value as typeof sensitivity)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      sensitivity === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{option.label}</p>
                        <p className="text-sm text-slate-600">{option.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full ${
                        sensitivity === option.value ? 'bg-primary-500' : 'bg-slate-200'
                      }`}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Notification */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email for Notification
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="input"
              />
              <p className="mt-1 text-sm text-slate-500">
                We'll notify you when the scan is complete
              </p>
            </div>

            {/* Terms */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex gap-3">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Important Disclaimers</p>
                <ul className="list-disc list-inside space-y-1 text-amber-700">
                  <li>VoiceChain provides informational tools, not legal advice</li>
                  <li>Detection accuracy is 70-90%; false positives are possible</li>
                  <li>Verify matches before taking action</li>
                </ul>
              </div>
            </div>

            {/* Privacy Reminder */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg mb-8">
              <Trash2 className="h-5 w-5 text-green-600" />
              <p className="text-sm text-green-800">
                <strong>Auto-Delete Enabled:</strong> Your voice sample will be permanently deleted within 1 hour of scan completion.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep('filters')}
                className="btn-secondary"
              >
                Back
              </button>
              <button
                onClick={handleStartScan}
                className="btn-primary flex items-center gap-2"
              >
                Start Voice Scan
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
