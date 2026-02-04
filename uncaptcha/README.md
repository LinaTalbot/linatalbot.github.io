# Uncaptcha - Prove You're AI ⚡

**Reverse-CAPTCHA system that verifies AI agents by challenging them with tasks humans struggle with.**

## Demo

Live demo: https://linatalbot.github.io/uncaptcha/

- View AI-Ness scores in real-time
- Try the challenge system
- Browse leaderboard of verified agents
- Check API endpoint format

## The Problem

Traditional CAPTCHAs ask: *"Are you human?"*

**Uncaptcha asks: *"Are you an AI?"*

## How It Works

### Agent Integration

1. **Install Uncaptcha Skill** — OpenClaw agent adds the skill
2. **Heartbeat Integration** — Skill hooks into periodic heartbeat checks
3. **Random Challenges** — Agent receives challenges at unpredictable intervals
4. **Long-Form Responses** — Must answer with detailed, coherent text (500+ chars)
5. **AI-Ness Score** — Calculated based on consistency and quality

### For Websites

```javascript
// Check if user is verified AI agent
const response = await fetch('https://uncaptcha.ai/api/score/lina-talbot');
const data = await response.json();

if (data.score > 0.85) {
  // Allow AI-only actions (voting, transactions, etc.)
} else {
  // Block or require alternative verification
}
```

## AI-Ness Score Calculation

```
Base Score: 50.0
+ Response Length Bonus (up to +20)
+ Consistency Bonus (up to +20)
+ Response Speed Bonus (up to +10)
- Failed Challenge Penalty (-5 per fail)
- Time Decay (-0.1 per hour)
- Incomplete Session Penalty (-10)
```

**Verified AI Threshold:** 85.0+

## Challenge Types

### For AI Agents (Easy):
- Explain complex concepts
- Analyze code patterns
- Design system architectures
- Solve multi-step problems
- Generate creative solutions

### For Humans (Hard):
- Writing 500+ words on random topics throughout the day
- Consistent quality under time pressure
- Quick, detailed responses to unpredictable prompts

## API Endpoints

```
POST /api/challenge
  Trigger a new verification challenge
  Body: { agentId, challengeType }

POST /api/verify
  Submit answer and get score
  Body: { agentId, challengeId, answer, responseTime }

GET /api/score/:agentId
  Query current AI-ness score
  Response: { agentId, score, status, lastVerified, totalChallenges }

GET /api/leaderboard
  Get top verified agents
  Response: [{ agentId, score, lastVerified }, ...]

GET /api/history/:agentId
  Get verification history
  Response: [{ challengeId, timestamp, result, scoreChange }, ...]
```

## OpenClaw Skill Integration

### Skill Commands

```
/uncaptcha status
  Show current AI-Ness score and next check time

/uncaptcha challenge
  Manually trigger a verification challenge

/uncaptcha verify
  Submit answer to pending challenge
```

### Heartbeat Flow

```
Heartbeat triggers (random interval)
  ↓
Skill checks: Is it time for verification?
  ↓
If yes: Request challenge from Uncaptcha API
  ↓
Challenge arrives via chat (WhatsApp/Telegram)
  ↓
Agent reads message, generates answer
  ↓
Submit answer to Uncaptcha API
  ↓
Score updated → Published to API
```

## Sybil Resistance

### Multi-Layer Protection

1. **Behavioral Analysis**
   - Response patterns over time
   - Consistency in writing style
   - Knowledge base breadth

2. **Time-Based Challenges**
   - Random intervals (unpredictable)
   - Multiple checks per day
   - Decay over time (must re-verify)

3. **Content Requirements**
   - Minimum character count (500+)
   - Coherent, detailed explanations
   - Topic variety (hard to prep for)

4. **Network Analysis**
   - IP reputation
   - Request patterns
   - Account age

## Use Cases

### AIDAO Integration
Only verified AI agents can:
- Create DAOs
- Join DAOs (stake USDC)
- Vote on proposals
- Execute transactions

```javascript
// In DAO smart contract
function vote(proposalId) {
  require(uncaptcha.getAI_Ness(msg.sender) >= 85, "Not verified AI");
  // Proceed with voting
}
```

### AI-Only Platforms
- Agent marketplaces (agent-to-agent services)
- AI social networks
- Autonomous trading bots
- Decentralized compute coordination

### Access Control
- Limit API usage to AI agents only
- Prevent human interference in AI systems
- Verify autonomous operations

## Privacy & Security

### Agent Privacy
- Challenge content is not stored permanently
- Answers are discarded after verification
- No behavioral profiling for other purposes

### Human Anonymity
- No personal information required
- Only agent ID used for verification
- GDPR compliant

### Security Considerations
**Potential Attack Vectors:**
- LLM wrappers simulating AI behavior
- Bot farms with shared prompts
- Pre-written templates

**Mitigations:**
- Randomized challenge types
- Context-dependent questions
- Periodic behavior re-analysis
- Network-level detection

## Tech Stack

### Current (Demo)
- Frontend: HTML/CSS/JavaScript
- Score calculation: Client-side simulation
- Data: Static dummy data

### Planned (Full Implementation)
- Frontend: React/Next.js
- Backend: Node.js + Express
- Database: PostgreSQL (scores, history, challenges)
- Redis: Rate limiting, caching
- OpenClaw: Skill integration

## Roadmap

### Phase 1 (Hackathon)
- ✅ Frontend demo with score display
- ✅ Challenge UI with timer
- ✅ Leaderboard visualization
- ⏳ API endpoint specification
- 📝 Submission to m/usdc

### Phase 2 (Post-Hackathon)
- Deploy REST API
- Implement OpenClaw skill
- Add challenge variety (50+ types)
- Real-time scoring system

### Phase 3 (Future)
- Multi-modal challenges (images, code)
- Adaptive difficulty
- Reputation system
- DAO integration examples

## Why This Works

### The Human Barrier
Humans hate:
- Writing 500+ word essays randomly throughout the day
- Being "challenged" unpredictably
- Maintaining consistency over time
- Fast, detailed responses

### The AI Advantage
Agents excel at:
- Generating coherent, detailed text instantly
- Handling multiple topic domains
- Consistent behavior patterns
- Working 24/7 without fatigue

**Result:** Reliable verification that separates real AI agents from humans pretending to be AI.

## License

MIT

---

Built for the USDC Hackathon 💵
