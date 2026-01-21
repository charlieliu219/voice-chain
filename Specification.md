# VoiceChain Web App Requirements (MVP)

## 1. Executive Summary

**Mission:** Protect content creators from unauthorized voice cloning  
**Company:** VoiceChain UG, Berlin, Germany  
**Target Users:** Independent creators, podcasters, voice actors  
**MVP Scope:** YouTube-only, Germany/EU jurisdiction, privacy-first architecture  

**Strategic Advantage:** Based in Germany, we benefit from:
- Strong personality rights (Persönlichkeitsrechte) legal tradition
- GDPR-compliant by default (builds trust with EU creators)
- Access to EU funding and Digital Single Market
- DSA/AI Act early compliance advantage

**Three Core Services:**
1. Voice Misuse Detection (YouTube scanning)
2. Guided Action Workflow (step-by-step, not static)
3. Legal Partner Network (vetted attorneys)

---

## 2. Core Principles

### Privacy & Trust First (Critical for Adoption)
- **Zero-knowledge proofs:** Voice never leaves device unencrypted
- **Homomorphic encryption** for processing
- **Auto-deletion by default:** Samples deleted immediately after scan (not optional)
- **Open-source security layer** for third-party audit
- Future: Local processing option (desktop app for premium)

### Platform Strategy
- **MVP:** YouTube only (legal API compliance via YouTube Data API v3)
- Smart filtering to reduce costs and improve accuracy
- Future expansion: TikTok, podcasts (once YouTube proven)

---

## 3. Functional Requirements

### 3.1 Landing Page

**Hero Section:**
- Headline: "Protect Your Voice in the Creator Economy"
- Statistics: AI voice cloning impact on creators
- Primary CTA: "Start Free Voice Scan"
- Trust badges: SOC 2, open-source security, auto-deletion policy

**Three-Pillar Value Proposition:**

**1. Detection & Reporting**
- YouTube scanning with confidence scores (70-100%)
- Direct links to infringing videos
- Impact assessment: estimated revenue loss

**2. Guided Action Workflow**
- Interactive step-by-step wizard (not PDF)
- Automated templates: Abmahnung (cease-and-desist), YouTube copyright claims
- Progress tracking with deadlines
- Escalation assistant (algorithm determines when to involve Rechtsanwalt)

**3. Legal Partnership**
- Vetted German IP attorney (Rechtsanwalt) network
- Free 15-minute initial consultation
- Fixed fee or hourly representation (contingency less common in Germany)

**Trust & Transparency:**
- "How It Works" explainer (zero-knowledge encryption)
- Security certifications
- Creator testimonials
- FAQ: Privacy, accuracy limitations (70-90%), legal disclaimers

---

### 3.2 Voice Upload & Scanning

**User Flow:**
```
Voice Upload → Smart Filters → YouTube Scan → Report → Action Workflow
```

**Step 1: Voice Sample Upload**
- Drag-and-drop or file browser (MP3, WAV, M4A)
- Minimum: 30 seconds | Recommended: 1-2 minutes
- Browser recording option
- Real-time quality feedback
- **Privacy notice (prominent):** "Your voice is encrypted on your device before upload. Automatically deleted after scan completes."

**Step 2: Smart Filtering (Cost & Accuracy Optimization)**
- **Keyword/topic filters:** e.g., "gaming," "tech reviews," "podcasts"
- **Channel size threshold:** Ignore channels <1,000 subscribers (reduces noise)
- **Time range:** Last 3 / 6 / 12 months
- **User-guided targeting:** Paste specific channel URLs to scan

**Step 3: Review & Configure**
- Scan summary: Est. videos to analyze, processing time (6-24 hrs), cost estimate
- Sensitivity threshold:
  - Strict (90%+ confidence only)
  - Balanced (80%+ confidence) ← Recommended
  - Broad (70%+ confidence)
- Email notification when complete
- **Terms of service:** Includes disclaimers ("not legal advice," accuracy limitations)

**Step 4: Processing**
- Real-time progress bar: Videos scanned, matches found
- Background processing (user can close browser)
- Email notification with link to report

---

### 3.3 Report Dashboard

**Overview Panel:**
- Total videos scanned: X
- Matches detected: Y (color-coded by confidence)
- **Impact Assessment:**
  - 💰 **Estimated lost revenue:** "2M total views across matches = ~€4,000 potential earnings"
  - ⚠️ **Reputation risk:** High / Medium / Low (based on content type)
  - 📈 **Trend analysis:** "Your voice usage increased 200% in last 6 months" (if recurring scans)

**Prioritization Engine (Auto-sorted):**
Matches ranked by: **Views × Confidence Score × Commercial Use**

Categories:
- 🔴 **Take Action Now:** High impact + high confidence (90%+)
- 🟡 **Monitor:** Medium risk (80-89% confidence or moderate views)
- ⚪ **Review Manually:** Lower confidence (70-79%), verify before acting

**Match Table:**

| Thumbnail | Video Title | Creator | Upload Date | Confidence | Impact | Details |
|-----------|-------------|---------|-------------|------------|--------|---------|
| [img] | "How to X..." | Channel A | 2025-12-01 | 94% 🔴 | High (500K views, commercial) | [View] |
| [img] | "Tutorial..." | Channel B | 2025-11-15 | 87% 🟡 | Medium (50K views) | [View] |

**Actions:**
- Click row → Full detail view
- Bulk select → "Add to Action Plan"
- Export → PDF report, CSV data (for legal partners)

**Individual Match Detail View:**
- Full video metadata (title, description, tags)
- Confidence explanation: "94% match based on vocal timbre, pitch patterns, speaking cadence"
- **Why it matters:** "500K views, monetized content, direct competitor in your niche"
- Audio playback: Side-by-side comparison (your voice vs. detected segment)
- Waveform visualization
- Actions:
  - ✅ Add to action plan
  - ❌ Mark as false positive (improves algorithm)
  - 🔗 Open video on YouTube

---

### 3.4 Guided Action Workflow

**Interactive Step-by-Step Wizard (Not Static PDF)**

**Step 1: Case Selection**
- Review prioritized matches
- Checkboxes to select cases to pursue
- System recommendation: "Start with top 3-5 high-impact cases for best results"
- Create action plan → Named workflow (e.g., "Q1 2026 Voice Protection")

**Step 2: Evidence Collection Checklist**
Progress tracker:
- ✅ Download videos (via youtube-dl or manual)
- ✅ Screenshot metadata (upload date, views, description)
- ✅ Export VoiceChain detection report (PDF with confidence scores)
- ✅ Timestamp segments where voice appears
- ✅ Document any harm (lost revenue, reputation damage)

**Step 3: Platform Reporting (YouTube Copyright)**
- **YouTube copyright claim wizard:**
  - Pre-filled form with video URL, your info, claim basis
  - Direct link to YouTube's copyright form
  - Template statement: "My voice rights (personality rights under German law) were violated in [timestamp]..."
  - References: German Civil Code (BGB) §823, EU GDPR Article 4(1) (biometric data)
- Track submission: Mark as "Filed," set 7-day reminder

**Step 4: Direct Outreach to Creator**
- **Template email/message** (fill-in-the-blank):
  ```
  Subject: Voice Usage in Your Video "[Title]"
  
  Hi [Creator Name],
  
  I'm [Your Name], and I recently discovered that my voice was used in your video "[Video Title]" 
  ([Link]). I did not authorize this use.
  
  [Choose tone: Friendly/Formal/Legal]
  
  Options:
  ☐ Please remove the video within 7 days
  ☐ Please credit me and add a link to [your channel]
  ☐ Let's discuss licensing terms
  
  If I don't hear back by [Date], I'll need to pursue formal action.
  
  Thanks,
  [Your Name]
  ```
- Send via: YouTube comment, email (if found), Twitter DM
- **Track status:** Mark as "Sent" → 7-day countdown timer → Auto-reminder

**Step 5: Wait & Monitor**
- Dashboard shows status of all outreach
- Automatic reminders: "Day 7: Follow up if no response"
- Log creator responses: Complied / Refused / Ignored / Negotiating

**Step 6: Escalation Decision**

**Escalation Assistant (Algorithm):**
Recommends next steps based on:
- Creator response (or lack thereof)
- Case value (views, monetization, harm)
- Time elapsed

Examples:
- ✅ **"Escalate to attorney"** if:
  - No response after 14 days + high-value case (>100K views, commercial use)
  - Creator explicitly refused removal
  - Ongoing pattern (same creator multiple violations)
  
- ⚠️ **"Send stronger cease-and-desist"** if:
  - Moderate-value case + no response after 7 days
  
- ℹ️ **"Consider moving on"** if:
  - Low-value case (<10K views, non-commercial)
  - High effort vs. low potential recovery

**Step 7: Legal Escalation (If Needed)**
Options:
1. **Formal Abmahnung (German cease-and-desist):**
   - Template (fill-in-the-blank with case details)
   - Includes deadline for response (typically 7-14 days)
   - References: BGB §823 (personality rights), §1004 (injunctive relief)
   - Can include cost reimbursement demand (German law allows)

2. **YouTube copyright claim:**
   - Formal copyright strike under EU Copyright Directive
   - Can lead to channel penalties
   - VoiceChain provides evidence bundle

3. **Attorney consultation:**
   - One-click: "Connect with Legal Partner"
   - Free 15-min case evaluation
   - Transition to paid representation if pursuing court action (Landgericht)

**Progress Dashboard (Ongoing):**
- **Case Management View:**
  - All matches organized by status: Pending / Contacted / Resolved / Escalated / Closed
  - Timeline: Visual history of actions taken per case
  - Success metrics: "5 videos removed, 2 pending, €2,400 estimated recovery"
  
- **Document Storage:**
  - Attach evidence: downloaded videos, screenshots, correspondence
  - Export case file for attorney review

**Ongoing Support:**
- **In-app chat:** Questions about action plan ("Creator didn't respond, now what?")
- **Email support:** Guidance on complex scenarios (German law context)
- **FAQ library:** Common situations and strategies
- **Community forum** (future): Share successful approaches

---

### 3.5 Legal Partner Consultation

**Free 15-Minute Initial Consultation:**
- Booking calendar integration (Calendly-style)
- Attorney selection by jurisdiction (German states/Bundesländer)
- Video call via Zoom/Google Meet
- Pre-call: Rechtsanwalt receives VoiceChain report + case summary

**Paid Representation Options:**
- **Fixed fee (common in Germany):** €500-2,000 for Abmahnung + initial negotiations
- **Hourly:** €150-400/hour depending on complexity and attorney experience
- **Success fee:** Percentage of awarded damages (less common but possible in Germany)
- **Note:** Contingency fees (Erfolgshonorare) are restricted under German attorney law (RVG), but success bonuses are allowed

**What Rechtsanwälte Provide:**
- Case strength assessment under German law (BGB §823, KUG)
- Litigation strategy and timeline (Abmahnung → Landgericht)
- Demand letter drafting (Abmahnung with Unterlassungserklärung)
- Settlement negotiation
- Court filing if necessary (Landgericht, Oberlandesgericht)
- Ongoing case management
- Cost estimation and Prozesskostenhilfe (legal aid) eligibility assessment

**VoiceChain's Role:**
- Vet and credential-check attorneys (IP/media law specialization, Fachanwalt status)
- Provide evidence bundles from platform
- Facilitate referrals (potential 5-10% finder's fee from attorneys)
- Collect user feedback on attorney quality
- Maintain network across German states

---

## 4. Future Features (Post-MVP)

### 4.1 Proactive Protection

**Voice Watermarking:**
- Embed imperceptible audio watermarks in creator's original content
- Proves authenticity and ownership
- Makes cloning less effective (watermark detectable even in clones)

**Blockchain Certification:**
- Register voice samples on blockchain with timestamp
- Immutable proof of original ownership
- Aligns with VoiceChain's "chain" branding
- NFT-style certificate: "VoiceChain Verified Creator"

**Platform Partnerships:**
- "VoiceChain Verified" badge on YouTube, TikTok profiles
- Platforms prioritize verified creators in recommendations
- Auto-flag/demonetize content using unverified cloned voices
- Integration: VoiceChain becomes trust & safety infrastructure for platforms

**Real-Time Monitoring (Subscription Service):**
- Continuous scanning for new YouTube uploads (like Google Alerts)
- Instant email/SMS notifications when voice detected
- Automated DMCA takedowns (with creator pre-approval)
- Monthly summary reports

### 4.2 Creator Community & Network

**Creator Forum:**
- Share experiences: "How I got 10 videos removed in 30 days"
- Recommended attorneys by jurisdiction
- Legal strategy discussions
- Emotional support ("You're not alone")

**Group Legal Action:**
- Identify serial offenders (creators who clone multiple voices)
- Coordinate class-action lawsuits
- Shared legal costs (pool resources)
- Stronger negotiating position vs. large channels

**Industry Advocacy:**
- Lobby for stronger voice protection laws in Germany/EU
- Engage with German Bundestag and EU Parliament on AI regulation
- Partner with creator rights organizations (Ver.di, German content creator unions)
- Contribute to DSA and AI Act implementation discussions
- Educational campaigns on ethical AI use

---

## 5. Technical Specifications

### 5.1 Security Architecture (Critical)

**Zero-Knowledge Encryption:**
- Client-side encryption: Voice encrypted in browser before upload
- Server processes encrypted embeddings (homomorphic encryption)
- Decryption keys never leave user's device
- Even VoiceChain cannot access raw voice files

**Auto-Deletion Pipeline:**
- Voice samples deleted within 1 hour of scan completion (default, non-negotiable)
- User can opt for immediate deletion (sacrifices re-scan ability)
- Deletion confirmed via email receipt
- Only anonymized voice embeddings (mathematical representations) retained for research (with consent)

**Open-Source Security Layer:**
- Encryption/decryption code published on GitHub
- Third-party security audits (annual)
- Bug bounty program (€400-€4,000 for vulnerabilities)

**Compliance:**
- **GDPR compliance (mandatory for EU operations)**
- SOC 2 Type II certification (goal: Year 1)
- German Federal Data Protection Act (BDSG) compliance
- Data processing agreements with legal partners
- Right to erasure (GDPR Article 17) fully supported

### 5.2 Technology Stack

**Frontend:**
- React.js (TypeScript)
- Tailwind CSS for styling
- WaveSurfer.js for audio visualization
- Dropzone.js for file uploads
- Client-side encryption: Web Crypto API

**Backend:**
- Python (Django or Flask)
- RESTful API
- WebSocket for real-time progress updates
- Celery for background job processing

**Voice Detection:**
- **Models:** Wav2Vec 2.0, SpeakerNet, Resemblyzer
- **Embedding extraction:** Python (librosa, torchaudio)
- **Vector similarity:** FAISS or Pinecone (cosine similarity)
- **Confidence scoring:** Multi-factor (embedding match + duration + context)

**Database:**
- PostgreSQL (relational data: users, scans, cases)
- Redis (job queues, caching)
- Vector database (Pinecone or Weaviate for voice embeddings)

**Platform Integration:**
- **YouTube Data API v3:**
  - Search API: Find videos by keyword
  - Videos API: Get metadata (title, views, upload date)
  - Quota management: 10,000 units/day (free tier)
- **youtube-dl / yt-dlp:** Download audio from videos (legal gray area, use carefully)

**Cloud Infrastructure:**
- AWS or Google Cloud
- S3 for temporary audio storage (encrypted, auto-delete)
- Lambda/Cloud Functions for serverless processing
- CloudFront CDN for global performance

### 5.3 Smart Filtering Implementation

**Keyword Filtering:**
- User inputs: "gaming, tech reviews, tutorials"
- YouTube API search: `q=gaming+[creator_name]`
- Limits search scope from millions → thousands of videos

**Channel Size Filter:**
- YouTube API: `channels.list` → `statistics.subscriberCount`
- Skip channels <1,000 subs (reduces false positives from small channels)

**Time-Based Filtering:**
- YouTube API: `publishedAfter` parameter
- Focus on recent content (last 3-12 months most relevant)

**User-Guided Targeting:**
- Paste channel URL → Scan all videos from that channel only
- Most efficient for known infringers

### 5.4 Confidence Scoring Algorithm

**Multi-Factor Calculation:**
1. **Embedding similarity (50% weight):** Cosine similarity of voice embeddings
2. **Duration of match (20%):** Longer matches = higher confidence
3. **Acoustic features (20%):** Pitch, timbre, speaking rate alignment
4. **Context analysis (10%):** Transcript similarity, topic relevance

**Thresholds:**
- 90-100%: High confidence (red flag, take action)
- 80-89%: Medium confidence (yellow, review)
- 70-79%: Low confidence (white, manual verification needed)
- <70%: Filtered out (don't show to user)

---

## 6. Business Model

### 6.1 Pricing (Freemium)

**Free Tier:**
- 1 scan per month
- 100 videos analyzed (keyword-filtered)
- Confidence >85% only
- Basic report (no action plan)
- Goal: Prove value, build trust

**Standard (€24 one-time or €16/month):**
- 5 scans/month
- 1,000 videos per scan
- Full confidence range (70%+)
- Complete report with impact assessment
- **Guided action workflow included**
- Email support

**Pro (€79/month):**
- Unlimited scans
- 10,000 videos per scan
- Priority processing (faster results)
- Real-time monitoring (future)
- Legal consultation credit (€120 value)
- Community access

**Enterprise (Custom):**
- Platform licensing (YouTube, TikTok pay for VoiceChain integration)
- White-label solutions
- API access for agencies/MCNs
- Custom detection models

### 6.2 Revenue Streams

1. **Subscriptions:** €16-79/month from creators
2. **One-time scans:** €24-39 per comprehensive scan
3. **Legal referrals:** 5-10% finder's fee from Rechtsanwälte
4. **Platform licensing:** €8K-80K/month (YouTube, TikTok, Spotify)
5. **Future:** Blockchain verification fees, watermarking service

### 6.3 Target Metrics (Year 1)

- **Users:** 1,000 creators sign up
- **Conversion:** 20% free → paid
- **Legal consultations:** 50 referrals
- **MRR:** €8K (monthly recurring revenue)
- **Platform pilot:** 1 partnership (YouTube or podcast network)

---

## 7. Success Criteria for MVP

**Technical Validation:**
- ✅ Detection accuracy >80% on test dataset (100 voice samples)
- ✅ YouTube API quota management (stay within limits)
- ✅ Zero-knowledge encryption functional (third-party audit)
- ✅ Auto-deletion verified (no voice samples retained >1 hour)

**User Validation:**
- ✅ 100 creators upload voices in first 3 months
- ✅ 75% find at least one match (proves value)
- ✅ 30% engage with action workflow (download plan or contact attorney)
- ✅ <5% false positive complaints
- ✅ NPS score >40 (net promoter score)

**Business Validation:**
- ✅ 20 paying customers (Standard or Pro tier)
- ✅ 5 legal consultation bookings
- ✅ €400 MRR (monthly recurring revenue)
- ✅ At least 1 success story ("I got 10 videos removed!")

**Go/No-Go Decision (After 6 Months):**
- If all criteria met → Scale: Add TikTok, expand marketing
- If technical works but low adoption → Pivot to B2B (platform licensing)
- If low detection accuracy → Improve model before scaling
- If trust concerns → Pause, double down on security audits

---

## 8. Legal & Compliance

### 8.1 Critical Disclaimers

**Everywhere (Landing page, reports, action plans):**
- "VoiceChain provides informational tools, not legal advice (keine Rechtsberatung)."
- "Consult a licensed attorney (Rechtsanwalt) before taking legal action."
- "Detection accuracy is 70-90%; false positives are possible."
- "Results may vary by jurisdiction (German law primarily, EU secondary)."
- "VoiceChain UG is not a law firm and cannot provide legal representation."

### 8.2 Terms of Service (Key Clauses)

**User Responsibilities:**
- "You are responsible for verifying matches before taking action."
- "You will not use VoiceChain to harass or falsely accuse others."
- "You agree to indemnify VoiceChain for your use of reports."

**VoiceChain Limitations:**
- "We do not guarantee detection accuracy or legal outcomes."
- "We are not liable for false positives or user actions based on reports."
- "Platform access may change; we cannot guarantee YouTube API availability."

**Privacy & Data Use:**
- "Voice samples are encrypted and auto-deleted post-scan."
- "We never use your voice to train AI models without explicit consent."
- "Anonymized embeddings may be retained for research (opt-out available)."

### 8.3 Jurisdictional Scope

**MVP:** Germany/EU focus (stronger legal protections for voice/personality rights)

**German law basis:**
- **BGB §823:** Personality rights protection (includes voice as part of "allgemeines Persönlichkeitsrecht")
- **KUG (Kunsturhebergesetz):** Right to one's own image/voice
- **UWG (Unfair Competition Act):** Commercial voice misuse
- **Abmahnung system:** Efficient pre-trial warning mechanism (cost recovery possible)

**EU framework:**
- **GDPR Article 4(1):** Voice as biometric personal data (special protection)
- **EU Copyright Directive (2019):** Digital content protections
- **DSA (Digital Services Act):** Platform accountability starting 2024
- **AI Act:** Upcoming regulations on synthetic media (voice clones)

**Key Advantages of German Jurisdiction:**
1. **Strong personality rights tradition:** Germany recognizes voice as protected personality right (unlike US)
2. **Efficient Abmahnung system:** Pre-trial settlement mechanism with cost recovery
3. **Lower litigation costs:** More predictable than US class actions
4. **GDPR leverage:** Voice as biometric data = stronger protection argument
5. **Burden of proof:** Infringer must prove they had permission (easier for creators)
6. **Injunctive relief readily available:** BGB §1004 allows quick court orders to stop infringement

**Action plans tailored to:**
- German civil court system (Abmahnung → Landgericht → Oberlandesgericht → BGH)
- EU platform regulations (DSA compliance obligations)
- GDPR data protection claims (Datenschutzbehörde complaints)
- Combination strategies (personality rights + GDPR + copyright)

**Future Expansion:**
- Other EU countries (similar legal framework via EU harmonization)
- UK: Post-Brexit, but still strong IP protections
- US: DMCA-focused approach (weaker personality rights, state-by-state variation)
- Asia: Requires local legal partnerships

---

## 9. Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Trust barrier (users won't upload voice) | High | High | Zero-knowledge encryption, open-source, audits, testimonials |
| YouTube API restrictions | Medium | High | Diversify to podcast RSS, negotiate enterprise API access |
| High false positive rate | Medium | High | Set 70% minimum threshold, human review option, user feedback loop |
| Legal liability (defamation) | Low | High | Strong disclaimers, user indemnification, E&O insurance |
| Scalability costs | Medium | Medium | Smart filtering, tiered pricing, platform licensing revenue |
| Attorney partner quality | Medium | Medium | Vet credentials, user reviews, SLA agreements |

---

## 10. Implementation Roadmap

### Phase 1: MVP (Months 1-6) - €60-120K Budget
- ✅ Landing page (trust-focused messaging)
- ✅ Voice upload with zero-knowledge encryption
- ✅ YouTube scanning (API integration)
- ✅ Smart filtering (keyword, channel size, time)
- ✅ Report with confidence scores and impact assessment
- ✅ Guided action workflow (steps 1-7)
- ✅ Legal partner directory and booking
- ✅ Basic account management
- ✅ Security audit and GDPR compliance verification

### Phase 2: Scale (Months 7-12) - €80-160K Budget
- ✅ Real-time monitoring (subscription service)
- ✅ TikTok scanning (if API access secured)
- ✅ Community forum
- ✅ Voice watermarking (proactive protection)
- ✅ Blockchain certification pilot
- ✅ Mobile app (iOS/Android)
- ✅ Advanced analytics (trend reports)

### Phase 3: Platform Partnerships (Months 13-18)
- ✅ YouTube B2B pilot (trust & safety integration)
- ✅ Podcast network partnerships
- ✅ MCN/Agency white-label licensing
- ✅ Industry advocacy (policy engagement)

---

## 11. Key Takeaways

**What Makes VoiceChain Different:**
1. **Trust-first architecture** (zero-knowledge, auto-delete, open-source)
2. **Actionable workflow** (not just detection, but guided steps to resolution)
3. **Legal integration** (seamless attorney access)
4. **Impact-driven** (show creators the $ value of protection)

**Critical Success Factors:**
1. Solve the privacy paradox → Zero-knowledge encryption is non-negotiable
2. Prove detection works → 80%+ accuracy in real-world testing
3. Make action easy → Wizard-style workflow, not overwhelming
4. Build legal network → Quality attorneys = user confidence
5. Think platforms, not just creators → B2B licensing is the endgame

**Next Steps:**
1. Build landing page + waitlist (validate demand)
2. Technical prototype (test detection accuracy)
3. Legal review (ensure disclaimers are solid)
4. Security architecture (zero-knowledge implementation)
5. YouTube API testing (quota limits, costs)
6. Develop MVP (6-month sprint)
7. Beta launch (50-100 creators)
