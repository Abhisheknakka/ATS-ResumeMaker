const express = require('express')
const cors = require('cors')
const axios = require('axios')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.static(path.join(__dirname, 'dist')))

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
    const prompt = `You are an expert ATS (Applicant Tracking System) resume optimizer with deep knowledge of recruitment technology and hiring practices. Your task is to optimize a resume for a specific job description while maintaining the original format and structure.

JOB DESCRIPTION:
${jobDescription}

ORIGINAL RESUME:
${resumeText}

Please optimize this resume for the job description above. Follow these comprehensive guidelines:

**ATS OPTIMIZATION STRATEGIES:**
1. **Keyword Matching**: Extract and integrate exact keywords from the job description (skills, technologies, certifications, job titles)
2. **Action Verb Enhancement**: Use strong action verbs that ATS systems recognize (e.g., "Developed", "Implemented", "Managed", "Led", "Created", "Optimized")
3. **Quantified Achievements**: Add specific metrics and numbers where possible (e.g., "Increased efficiency by 25%", "Managed team of 8 developers", "Reduced costs by $50K")
4. **Industry-Specific Terminology**: Use the exact technical terms and jargon from the job description
5. **Relevant Experience Prioritization**: Emphasize experiences that directly relate to the job requirements

**FORMATTING REQUIREMENTS:**
- Maintain the exact same format and structure as the original resume
- Use "•" for bullet points (not "-" or "*")
- Separate sections with clear line breaks
- Format job titles as: "Job Title | Company Name | Date Range"
- Use bold text for important keywords: **keyword**
- Keep bullet points concise and impactful (1-2 lines each)
- Ensure proper alignment and spacing
- Use standard fonts and simple formatting (no tables, images, or complex layouts)

**CONTENT OPTIMIZATION:**
- Add relevant keywords naturally within existing content
- Rewrite bullet points to be more specific and achievement-focused
- Include quantifiable results and metrics
- Use industry-standard terminology from the job description
- Ensure each bullet point starts with a strong action verb
- Make experience descriptions more relevant to the specific role

**ATS COMPATIBILITY:**
- Ensure all text is machine-readable (no images, charts, or complex formatting)
- Use standard section headings (Experience, Education, Skills, etc.)
- Include a skills section with relevant technical skills
- Avoid abbreviations unless they're industry-standard
- Use consistent date formatting (MM/YYYY or Month YYYY)

**RESPONSE FORMAT:**
Return the optimized resume in the exact same format as the original, with the same sections and structure. Also provide:
- An ATS compatibility score (0-100) based on keyword matching, formatting, and content relevance
- A detailed summary of the optimizations made

Format your response as JSON with the following structure:
{
  "sections": [
    {"type": "heading", "content": "Section Title"},
    {"type": "content", "content": "Section content with proper formatting..."}
  ],
  "atsScore": 85,
  "summary": ["Optimization 1", "Optimization 2", "Optimization 3"],
  "keywordMatches": ["keyword1", "keyword2", "keyword3"],
  "improvements": ["Added quantifiable achievements", "Enhanced action verbs", "Integrated relevant skills"]
}`

    // Call OpenRouter API
    console.log('Using API Key:', OPENROUTER_API_KEY.substring(0, 10) + '...')
    
    const response = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'system',
            content: 'You are an expert ATS resume optimizer. Always respond with valid JSON format and provide detailed, actionable optimizations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 6000,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3001',
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
        
        // Validate the response structure
        if (!optimizedResume.sections || !Array.isArray(optimizedResume.sections)) {
          throw new Error('Invalid response structure: missing sections array')
        }
        
        // Ensure required fields exist
        if (!optimizedResume.atsScore) optimizedResume.atsScore = 75
        if (!optimizedResume.summary) optimizedResume.summary = ['AI optimization applied']
        if (!optimizedResume.keywordMatches) optimizedResume.keywordMatches = []
        if (!optimizedResume.improvements) optimizedResume.improvements = []
        
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
      console.error('Raw AI response:', aiResponse)
      
      // Fallback: create a basic structure with the raw response
      optimizedResume = {
        sections: [
          { type: 'content', content: aiResponse }
        ],
        atsScore: 75,
        summary: ['AI optimization applied', 'Keywords integrated', 'Format maintained'],
        keywordMatches: [],
        improvements: ['Applied AI optimization', 'Maintained original format']
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
  res.json({ status: 'OK', message: 'ATS Resume Builder API is running' })
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`OpenRouter API Key: ${OPENROUTER_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`)
}) 