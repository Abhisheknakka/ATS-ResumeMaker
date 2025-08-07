import React from 'react'

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              ATS Resume Builder
            </h1>
            <p className="text-gray-600 mt-1">
              Optimize your resume for Applicant Tracking Systems
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Powered by AI
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 