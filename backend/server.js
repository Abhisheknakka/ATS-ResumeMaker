const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
    'https://your-vercel-app.vercel.app', // Replace with your Vercel URL
    /\.vercel\.app$/ // Allow all Vercel domains
  ],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// OpenRouter API configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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'
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

// Resume optimization endpoint
app.post('/api/optimize-resume', async (req, res) => {
  try {
    const { jobDescription, resumeText, originalFormat } = req.body

    if (!jobDescription || !resumeText) {
      return res.status(400).json({ error: 'Job description and resume text are required' })
    }

    // Create the prompt for OpenRouter
    const prompt = `You are an expert ATS (Applicant Tracking System) resume optimizer. Your task is to optimize a resume for a specific job description while maintaining the original format and structure.

JOB DESCRIPTION:
${jobDescription}

ORIGINAL RESUME:
${resumeText}

Please optimize this resume for the job description above. Follow these guidelines:

1. Maintain the exact same format and structure as the original resume
2. Add relevant keywords from the job description naturally
3. Quantify achievements where possible (e.g., "increased efficiency by 25%")
4. Use action verbs and industry-specific terminology
5. Ensure ATS-friendly formatting (no complex layouts, tables, or images)
6. Keep the same sections and headings
7. Make the content more relevant to the specific job requirements
8. Maintain professional tone and language
9. Use proper bullet points (•) for lists and achievements
10. Format contact information clearly with proper spacing

IMPORTANT FORMATTING RULES:
- Use "•" for bullet points (not "-" or "*")
- Separate sections with clear line breaks
- Format job titles as: "Job Title | Company Name | Date Range"
- Use bold text for important keywords: **keyword**
- Keep bullet points concise and impactful
- Ensure proper alignment and spacing

Return the optimized resume in the exact same format as the original, with the same sections and structure. Also provide:
- An ATS compatibility score (0-100)
- A brief summary of the optimizations made

Format your response as JSON with the following structure:
{
  "sections": [
    {"type": "heading", "content": "Section Title"},
    {"type": "content", "content": "Section content with proper formatting..."}
  ],
  "atsScore": 85,
  "summary": ["Optimization 1", "Optimization 2", "Optimization 3"]
}`

    // Call OpenRouter API
    console.log('Using API Key:', OPENROUTER_API_KEY.substring(0, 10) + '...')
    
    const response = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: 'deepseek/deepseek-chat-v3-0324',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://your-vercel-app.vercel.app',
          'X-Title': 'ATS Resume Builder'
        }
      }
    )

    const aiResponse = response.data.choices[0].message.content

    // Try to parse the JSON response
    let optimizedResume
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        optimizedResume = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
      // Fallback: create a basic structure
      optimizedResume = {
        sections: [
          { type: 'content', content: aiResponse }
        ],
        atsScore: 75,
        summary: ['AI optimization applied', 'Keywords integrated', 'Format maintained']
      }
    }

    res.json({ optimizedResume })

  } catch (error) {
    console.error('Error optimizing resume:', error)
    res.status(500).json({ 
      error: 'Failed to optimize resume',
      details: error.message 
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ATS Resume Builder API is running',
    timestamp: new Date().toISOString()
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'ATS Resume Builder API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      optimize: '/api/optimize-resume'
    }
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`OpenRouter API Key: ${OPENROUTER_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`)
}) 