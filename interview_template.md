# Interview API — JSON Template

## Endpoint

```
POST /api/interviews
Header: x-admin-secret: <your-admin-secret>
Content-Type: application/json
```

## Full JSON Body

```json
{
  "company": "Google",
  "role": "SDE Intern",
  "difficulty": "Hard",
  "type": "On-campus",
  "rounds": [
    {
      "roundName": "Online Assessment",
      "date": "2025-08-10",
      "description": "90-minute coding test with 3 DSA problems on HackerRank.",
      "questionsAsked": [
        "Find the longest palindromic substring",
        "Design a LRU Cache",
        "Binary tree maximum path sum"
      ],
      "duration": "90 mins",
      "tips": "Focus on optimal solutions; brute force won't pass the time limits."
    },
    {
      "roundName": "Technical Interview 1",
      "date": "2025-08-18",
      "description": "1-on-1 DSA round with a senior engineer. Two coding problems on a shared doc.",
      "questionsAsked": [
        "Merge K sorted linked lists",
        "Design a rate limiter"
      ],
      "duration": "60 mins",
      "tips": "Think out loud and discuss trade-offs before coding."
    },
    {
      "roundName": "System Design",
      "date": "2025-08-20",
      "description": "High-level system design discussion on designing a URL shortener.",
      "questionsAsked": [
        "Design a URL shortening service like bit.ly"
      ],
      "duration": "45 mins",
      "tips": "Start with requirements, then go top-down. Mention caching and DB sharding."
    },
    {
      "roundName": "HR Round",
      "date": "2025-08-22",
      "description": "Behavioral and cultural fit discussion.",
      "questionsAsked": [
        "Why Google?",
        "Tell me about a challenging project",
        "How do you handle disagreements in a team?"
      ],
      "duration": "30 mins",
      "tips": "Use the STAR method for behavioral answers."
    }
  ],
  "detailedWriteup": {
    "preparation": "Spent 3 months grinding LeetCode (300+ problems). Focused on graphs, DP, and sliding window patterns. Read 'Designing Data-Intensive Applications' for system design.",
    "technicalQuestions": [
      "Explain time complexity of merge sort",
      "What is the CAP theorem?",
      "Difference between SQL and NoSQL databases"
    ],
    "systemDesign": "Designed a URL shortener covering hashing strategies, base62 encoding, read-heavy architecture with Redis caching, and horizontal scaling with consistent hashing.",
    "projectDiscussion": "Discussed my full-stack portfolio project — architecture choices (MERN), deployment pipeline, and performance optimizations.",
    "behavioralQuestions": [
      "Describe a time you failed and what you learned",
      "How do you prioritize tasks under pressure?"
    ],
    "myPerformance": "Strong in DSA rounds, decent in system design. Could have elaborated more on trade-offs during the design round.",
    "reflections": "The interview process was well-structured. Each round tested a different skill set. Being comfortable with fundamentals made a huge difference.",
    "tipsForFuture": "Start early, be consistent with DSA practice, and don't neglect system design and behavioral prep. Mock interviews help a lot.",
    "outcome": "Selected"
  },
  "tags": ["DSA", "System Design", "React", "Node.js", "MongoDB"],
  "featured": true
}
```

## Field Reference

| Field | Type | Required | Options |
|---|---|---|---|
| `company` | String | ✅ | Max 100 chars |
| `role` | String | ✅ | Max 100 chars |
| `difficulty` | String | ✅ | `Easy`, `Medium`, `Hard` |
| `type` | String | ✅ | `On-campus`, `Off-campus`, `Referral`, `Direct Apply` |
| `rounds[].roundName` | String | ✅ | — |
| `rounds[].date` | Date | ❌ | ISO format (`YYYY-MM-DD`) |
| `rounds[].description` | String | ✅ | — |
| `rounds[].questionsAsked` | String[] | ❌ | — |
| `rounds[].duration` | String | ❌ | e.g. `60 mins` |
| `rounds[].tips` | String | ❌ | — |
| `detailedWriteup.preparation` | String | ✅ | Min 10 chars |
| `detailedWriteup.technicalQuestions` | String[] | ❌ | — |
| `detailedWriteup.systemDesign` | String | ❌ | — |
| `detailedWriteup.projectDiscussion` | String | ❌ | — |
| `detailedWriteup.behavioralQuestions` | String[] | ❌ | — |
| `detailedWriteup.myPerformance` | String | ✅ | — |
| `detailedWriteup.reflections` | String | ✅ | — |
| `detailedWriteup.tipsForFuture` | String | ✅ | — |
| `detailedWriteup.outcome` | String | ❌ | e.g. `Selected`, `Rejected` |
| `tags` | String[] | ❌ | — |
| `featured` | Boolean | ❌ | Default: `false` |

## Minimal Example

```json
{
  "company": "Startup XYZ",
  "role": "Frontend Developer",
  "difficulty": "Easy",
  "type": "Direct Apply",
  "rounds": [
    {
      "roundName": "Technical Round",
      "date": "2025-09-15",
      "description": "React and JavaScript fundamentals discussion."
    }
  ],
  "detailedWriteup": {
    "preparation": "Revised React hooks, context API, and common JS patterns.",
    "myPerformance": "Answered all questions confidently.",
    "reflections": "Straightforward process, good experience overall.",
    "tipsForFuture": "Know your React fundamentals well."
  }
}
```
