import React, { useState } from 'react'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'

function ResumeOutput({ optimizedResume, originalFile }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const formatResumeContent = (content) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) {
        return <div key={index} className="h-2"></div>;
      }
      
      // Handle bullet points
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
        return (
          <div key={index} className="flex items-start mb-2">
            <span className="text-blue-600 font-bold mr-3 mt-1">•</span>
            <span className="flex-1">{trimmedLine.substring(1).trim()}</span>
          </div>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\./.test(trimmedLine)) {
        const match = trimmedLine.match(/^(\d+)\.\s*(.*)/);
        if (match) {
          return (
            <div key={index} className="flex items-start mb-2">
              <span className="text-blue-600 font-bold mr-3 mt-1 min-w-[20px]">{match[1]}.</span>
              <span className="flex-1">{match[2]}</span>
            </div>
          );
        }
      }
      
      // Handle bold text (text between ** or __)
      if (trimmedLine.includes('**') || trimmedLine.includes('__')) {
        const formattedLine = trimmedLine
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/__(.*?)__/g, '<strong>$1</strong>');
        return (
          <p key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      }
      
      // Handle contact information (email, phone, etc.)
      if (trimmedLine.includes('@') || trimmedLine.includes('|')) {
        return (
          <p key={index} className="text-gray-600 mb-2 font-medium">
            {trimmedLine}
          </p>
        );
      }
      
      // Handle job titles and company names
      if (trimmedLine.includes('|') && (trimmedLine.includes('Present') || trimmedLine.includes('202'))) {
        const parts = trimmedLine.split('|');
        return (
          <div key={index} className="mb-2">
            <div className="font-semibold text-gray-900">{parts[0].trim()}</div>
            <div className="text-gray-600">{parts[1].trim()}</div>
          </div>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-2">
          {trimmedLine}
        </p>
      );
    });
  };

  const downloadAsWord = async () => {
    setIsDownloading(true)
    
    try {
      // Create a new Word document
      const doc = new Document({
        sections: [{
          properties: {},
          children: optimizedResume.sections.map(section => {
            if (section.type === 'heading') {
              return new Paragraph({
                text: section.content,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
              })
            } else {
              return new Paragraph({
                children: [
                  new TextRun({
                    text: section.content,
                    size: 24
                  })
                ],
                spacing: { before: 200, after: 200 }
              })
            }
          })
        }]
      })

      const blob = await Packer.toBlob(doc)
      saveAs(blob, `optimized-resume-${Date.now()}.docx`)
    } catch (error) {
      console.error('Error creating Word document:', error)
      alert('Error creating Word document. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAsText = () => {
    const textContent = optimizedResume.sections
      .map(section => section.content)
      .join('\n\n')
    
    const blob = new Blob([textContent], { type: 'text/plain' })
    saveAs(blob, `optimized-resume-${Date.now()}.txt`)
  }

  const copyToClipboard = async () => {
    const textContent = optimizedResume.sections
      .map(section => section.content)
      .join('\n\n')
    
    try {
      await navigator.clipboard.writeText(textContent)
      alert('Resume copied to clipboard!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      alert('Error copying to clipboard. Please try again.')
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header with Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Optimized Resume
              </h2>
              <p className="text-gray-600 mt-1">
                ATS-optimized version of your resume
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={copyToClipboard}
                className="btn-secondary text-sm px-4 py-2"
              >
                📋 Copy Text
              </button>
              <button
                onClick={downloadAsText}
                className="btn-secondary text-sm px-4 py-2"
              >
                📄 Download TXT
              </button>
              <button
                onClick={downloadAsWord}
                disabled={isDownloading}
                className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
              >
                {isDownloading ? '⏳ Creating...' : '📝 Download DOCX'}
              </button>
            </div>
          </div>
        </div>

      {/* ATS Score */}
      {optimizedResume.atsScore && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-green-900">
                ATS Compatibility Score
              </h3>
              <p className="text-xs text-green-700 mt-1">
                Based on keyword matching and formatting analysis
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {optimizedResume.atsScore}%
              </div>
              <div className="text-xs text-green-600">
                Excellent Match
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optimized Resume Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="space-y-6 max-w-4xl mx-auto">
          {optimizedResume.sections.map((section, index) => (
            <div key={index} className="resume-section">
              {section.type === 'heading' ? (
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-4 uppercase tracking-wide">
                  {section.content}
                </h3>
              ) : (
                <div className="text-gray-800 leading-relaxed">
                  {formatResumeContent(section.content)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Summary */}
      {optimizedResume.summary && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Optimization Summary
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            {optimizedResume.summary.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  )
}

export default ResumeOutput 