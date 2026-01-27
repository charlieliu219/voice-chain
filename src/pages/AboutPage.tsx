import { Link } from 'react-router-dom'
import {
  Shield,
  Lock,
  Trash2,
  Code,
  Server,
  Fingerprint,
  Search,
  Database,
  CheckCircle,
  ArrowRight,
  Eye,
  GitBranch
} from 'lucide-react'
import Logo from '../components/Logo'

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="h-10 w-10 text-indigo-400" />
              <span className="text-2xl font-bold">VoiceChain</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technical Overview
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Learn how VoiceChain detects unauthorized voice cloning while keeping your voice data private and secure through zero-knowledge architecture.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How VoiceChain Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A four-stage pipeline that detects voice misuse without ever exposing your raw audio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: Fingerprint,
                title: 'Voice Fingerprinting',
                description: 'Your voice sample is processed locally in your browser to extract a unique acoustic fingerprint—a mathematical representation of your voice characteristics.',
                details: ['Mel-frequency cepstral coefficients (MFCCs)', 'Pitch and formant analysis', 'Speaker embedding vectors']
              },
              {
                step: 2,
                icon: Lock,
                title: 'Client-Side Encryption',
                description: 'Before any data leaves your device, the voice fingerprint is encrypted using AES-256 encryption. Your raw audio never touches our servers.',
                details: ['AES-256 encryption', 'Client-generated keys', 'Zero plaintext transmission']
              },
              {
                step: 3,
                icon: Search,
                title: 'Secure Matching',
                description: 'Our servers compare your encrypted fingerprint against a database of indexed online content using homomorphic comparison techniques.',
                details: ['YouTube content scanning', 'Podcast directory search', 'Social media monitoring']
              },
              {
                step: 4,
                icon: Trash2,
                title: 'Auto-Deletion',
                description: 'After scan completion, all voice data—including encrypted fingerprints—is automatically purged from our systems within 1 hour.',
                details: ['1-hour retention maximum', 'Cryptographic erasure', 'Audit-logged deletion']
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-slate-50 rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-100 w-10 h-10 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">{item.step}</span>
                    </div>
                    <item.icon className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Technology Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                AI-Powered Voice Detection
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our detection engine uses state-of-the-art deep learning models trained on millions of voice samples to identify your unique vocal characteristics with over 90% accuracy.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Database className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Speaker Embedding Model</h3>
                    <p className="text-slate-600 text-sm">
                      Neural network trained to map voice characteristics into a high-dimensional embedding space where similar voices cluster together.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Clone Detection</h3>
                    <p className="text-slate-600 text-sm">
                      Specialized classifiers trained to distinguish between authentic recordings and AI-generated voice clones, including ElevenLabs, VALL-E, and other synthesis tools.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Server className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Confidence Scoring</h3>
                    <p className="text-slate-600 text-sm">
                      Each match includes a confidence score (70-100%) based on acoustic similarity, temporal patterns, and synthesis artifact detection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-6">Detection Pipeline</h3>
              <div className="space-y-4">
                {[
                  { label: 'Audio Preprocessing', desc: 'Noise reduction, normalization, segmentation' },
                  { label: 'Feature Extraction', desc: 'MFCC, pitch, spectral features' },
                  { label: 'Embedding Generation', desc: 'Speaker verification neural network' },
                  { label: 'Similarity Search', desc: 'Approximate nearest neighbor matching' },
                  { label: 'Clone Classification', desc: 'Synthetic vs. authentic detection' },
                  { label: 'Report Generation', desc: 'Match details, confidence, evidence links' }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-slate-600">{i + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{step.label}</p>
                      <p className="text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Trust VoiceChain?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We built VoiceChain with privacy and transparency as core principles, not afterthoughts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="bg-cyan-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Zero-Knowledge Architecture</h3>
              <p className="text-slate-600 mb-4">
                We never see or hear your voice. All audio processing happens in your browser, and only encrypted fingerprints are transmitted.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  No raw audio storage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Client-side encryption
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Encrypted-only processing
                </li>
              </ul>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Code className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Open-Source Security</h3>
              <p className="text-slate-600 mb-4">
                Our client-side encryption and fingerprinting code is open source, allowing independent security researchers to verify our privacy claims.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Public GitHub repository
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Third-party audits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Bug bounty program
                </li>
              </ul>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <GitBranch className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">GDPR Compliant</h3>
              <p className="text-slate-600 mb-4">
                Fully compliant with EU data protection regulations. Your data rights are built into our architecture, not bolted on.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Data minimization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Right to erasure (automatic)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  EU data residency
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Built for accuracy, speed, and privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '90%+', label: 'Detection Accuracy', desc: 'Across synthetic voice types' },
              { metric: '<5min', label: 'Scan Time', desc: 'For 1,000 video analysis' },
              { metric: '1hr', label: 'Data Retention', desc: 'Maximum before auto-delete' },
              { metric: 'AES-256', label: 'Encryption', desc: 'Industry-standard security' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-indigo-400 mb-2">{item.metric}</div>
                <div className="font-semibold text-white mb-1">{item.label}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-800/50 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6">Supported Platforms & Content Types</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-indigo-400 mb-3">Video Platforms</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>YouTube (full support)</li>
                  <li>TikTok (coming soon)</li>
                  <li>Instagram Reels (coming soon)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-400 mb-3">Audio Formats</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>MP3, WAV, M4A, FLAC</li>
                  <li>WebM audio extraction</li>
                  <li>Minimum 10 seconds sample</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-400 mb-3">Clone Detection</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>ElevenLabs voices</li>
                  <li>VALL-E / Bark / Tortoise</li>
                  <li>Generic TTS systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to Protect Your Voice?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Start your free scan and see if your voice is being used without permission.
          </p>
          <Link
            to="/upload"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105"
          >
            Start Free Voice Scan
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
