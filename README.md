# SkillBridge - AI-Powered Resume Analyzer

An intelligent web application that maps the gap between your resume and your dream job using Claude AI.

## Features

- **Resume Upload**: Drag-and-drop PDF resume upload with instant text extraction
- **Job Description Analysis**: Paste any job description or dream role
- **AI Skill-Gap Analysis**: Powered by Claude Sonnet 4.5 for deep analysis
- **Match Score**: Visual circular progress ring showing overall compatibility
- **Matched Skills**: Green cards showing your strengths with proficiency percentages
- **Missing Skills**: Priority-coded cards with learning resources
- **Personalized Recommendations**: AI-generated actionable next steps

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **PDF Processing**: pdf-parse
- **AI**: Anthropic Claude API (claude-sonnet-4-5-20250929)
- **Icons**: Lucide React
- **Fonts**: Space Grotesk + Inter (Google Fonts)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3001
VITE_API_URL=http://localhost:3001
```

Get your Anthropic API key from: https://console.anthropic.com/

### 3. Run the Application

**Terminal 1 - Start Backend Server:**
```bash
npm run server
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

1. Upload your resume (PDF format)
2. Paste the job description or type your dream role
3. Click "Analyze My Resume"
4. Review your match score, strengths, and skill gaps
5. Follow the AI recommendations to bridge the gap

## Project Structure

```
/
├── server/
│   └── index.js          # Express backend with Claude API integration
├── src/
│   ├── components/
│   │   ├── UploadZone.jsx       # Drag-and-drop file upload
│   │   ├── JobInput.jsx         # Job description textarea
│   │   ├── ProgressRing.jsx     # Animated circular progress
│   │   ├── SkillCard.jsx        # Matched/Missing skill cards
│   │   └── ResultsDashboard.jsx # Main results view
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles with custom fonts
├── package.json
└── .env
```

## API Endpoint

**POST /api/analyze**

- **Input**: multipart/form-data with `resume` (PDF) and `jobDescription` (string)
- **Output**: JSON with match score, skills analysis, and recommendations

```json
{
  "success": true,
  "analysis": {
    "matchScore": 75,
    "matchedSkills": [...],
    "missingSkills": [...],
    "summary": "...",
    "topRecommendation": "..."
  },
  "resumeText": "..."
}
```

## Design Features

- Dark theme with navy (#0a0f1e) background
- Electric blue (#3b82f6) accent colors
- Animated progress rings and skill bars
- Smooth transitions and hover effects
- Fully responsive mobile design
- Custom grid pattern background
- Gradient hero banner

## Error Handling

- PDF parsing errors show user-friendly messages
- API key validation with setup instructions
- Network error handling with retry logic
- Empty file detection

## License

MIT
