import React from 'react'

function JobDescriptionInput({ value, onChange }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Job Description
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Paste the job description here
          </label>
          <textarea
            id="jobDescription"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste the complete job description, including requirements, responsibilities, and qualifications..."
            className="input-field min-h-[400px] resize-none"
            rows="15"
          />
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            💡 Tips for better optimization:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include the complete job posting text</li>
            <li>• Make sure to include all requirements and qualifications</li>
            <li>• Include specific skills and technologies mentioned</li>
            <li>• The more detailed the description, the better the optimization</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JobDescriptionInput 