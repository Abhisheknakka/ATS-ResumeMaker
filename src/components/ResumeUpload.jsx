import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

function ResumeUpload({ onFileSelect, onTextExtracted }) {
  const [extractedText, setExtractedText] = useState('')
  const [fileName, setFileName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const extractTextFromFile = async (file) => {
    setIsProcessing(true)
    
    try {
      let text = ''
      
      if (file.type === 'application/pdf') {
        // Handle PDF files
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        const textContent = []
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          const pageText = content.items.map(item => item.str).join(' ')
          textContent.push(pageText)
        }
        
        text = textContent.join('\n')
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                 file.type === 'application/msword') {
        // Handle Word documents
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        text = result.value
      } else {
        // Handle plain text files
        text = await file.text()
      }
      
      setExtractedText(text)
      onTextExtracted(text)
    } catch (error) {
      console.error('Error extracting text:', error)
      alert('Error extracting text from file. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setFileName(file.name)
      onFileSelect(file)
      extractTextFromFile(file)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    multiple: false
  })

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Upload Resume
      </h2>
      
      <div className="space-y-4">
        {/* File Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          
          {isProcessing ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600">Processing file...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl mb-2">📄</div>
              {isDragActive ? (
                <p className="text-primary-600 font-medium">Drop your resume here</p>
              ) : (
                <div>
                  <p className="text-gray-600 font-medium">Drag & drop your resume here</p>
                  <p className="text-gray-500 text-sm">or click to browse</p>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Supports PDF, DOCX, DOC, and TXT files
              </p>
            </div>
          )}
        </div>

        {/* File Name Display */}
        {fileName && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">
              <span className="font-medium">✓</span> {fileName}
            </p>
          </div>
        )}

        {/* Extracted Text Preview */}
        {extractedText && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extracted Resume Content
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 max-h-60 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                {extractedText.length > 500 
                  ? `${extractedText.substring(0, 500)}...` 
                  : extractedText
                }
              </pre>
            </div>
            {extractedText.length > 500 && (
              <p className="text-xs text-gray-500 mt-1">
                Showing first 500 characters. Full content will be used for optimization.
              </p>
            )}
          </div>
        )}

        {/* Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-yellow-900 mb-2">
            📋 Resume Tips:
          </h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Use a clean, simple format without complex layouts</li>
            <li>• Avoid images, tables, or fancy formatting</li>
            <li>• Include relevant keywords from your target job</li>
            <li>• Keep it under 2 pages for best ATS compatibility</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ResumeUpload 