import React, { useState } from 'react'
import JobDescriptionInput from './components/JobDescriptionInput'
import ResumeUpload from './components/ResumeUpload'
import ResumeOutput from './components/ResumeOutput'
import Header from './components/Header'

function App() {
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [optimizedResume, setOptimizedResume] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOptimizeResume = async () => {
    if (!jobDescription.trim() || !resumeText.trim()) {
      setError('Please provide both job description and resume content')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Use environment variable for API URL, fallback to local development
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      
      const response = await fetch(`${apiUrl}/api/optimize-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          resumeText,
          originalFormat: resumeFile?.type
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to optimize resume')
      }

      const result = await response.json()
      setOptimizedResume(result.optimizedResume)
    } catch (err) {
      setError('Failed to optimize resume. Please try again.')
      console.error('Error optimizing resume:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Side - Job Description */}
          <div className="card">
            <JobDescriptionInput 
              value={jobDescription}
              onChange={setJobDescription}
            />
          </div>

          {/* Right Side - Resume Upload */}
          <div className="card">
            <ResumeUpload 
              onFileSelect={setResumeFile}
              onTextExtracted={setResumeText}
            />
          </div>
        </div>

        {/* Optimize Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleOptimizeResume}
            disabled={isLoading || !jobDescription.trim() || !resumeText.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg px-8 py-3"
          >
            {isLoading ? 'Optimizing Resume...' : 'Optimize Resume for ATS'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Output Section */}
        {optimizedResume && (
          <div className="card">
            <ResumeOutput 
              optimizedResume={optimizedResume}
              originalFile={resumeFile}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App 