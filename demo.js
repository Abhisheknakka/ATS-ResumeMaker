const axios = require('axios');

// Sample data for testing
const sampleJobDescription = `
Software Engineer - Full Stack Developer

We are looking for a talented Full Stack Developer to join our team. The ideal candidate will have experience with modern web technologies and a passion for creating exceptional user experiences.

Requirements:
- 3+ years of experience in software development
- Proficiency in JavaScript, React, Node.js, and Python
- Experience with databases (PostgreSQL, MongoDB)
- Knowledge of cloud platforms (AWS, Azure)
- Strong problem-solving skills
- Excellent communication abilities

Responsibilities:
- Develop and maintain web applications
- Collaborate with cross-functional teams
- Write clean, maintainable code
- Participate in code reviews
- Troubleshoot and debug issues
`;

const sampleResume = `
JOHN DOE
Software Developer
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software developer with 2 years of experience in web development and a strong foundation in modern programming languages and frameworks.

SKILLS
- Programming Languages: JavaScript, Python, Java
- Frontend: HTML, CSS, React
- Backend: Node.js, Express
- Databases: MySQL, MongoDB
- Tools: Git, Docker, VS Code

EXPERIENCE
Software Developer | Tech Company | 2022 - Present
- Developed web applications using React and Node.js
- Collaborated with team members on various projects
- Implemented new features and fixed bugs
- Participated in code reviews and team meetings

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2022
`;

async function testResumeOptimization() {
  try {
    console.log('Testing Resume Optimization API...\n');
    
    const response = await axios.post('http://localhost:3001/api/optimize-resume', {
      jobDescription: sampleJobDescription,
      resumeText: sampleResume,
      originalFormat: 'text/plain'
    });

    console.log('✅ API Response Received!');
    console.log('ATS Score:', response.data.optimizedResume.atsScore + '%');
    console.log('\nOptimization Summary:');
    response.data.optimizedResume.summary.forEach(item => {
      console.log('•', item);
    });
    
    console.log('\nOptimized Resume Sections:');
    response.data.optimizedResume.sections.forEach((section, index) => {
      console.log(`\n${section.type.toUpperCase()}:`);
      console.log(section.content.substring(0, 200) + '...');
    });

  } catch (error) {
    console.error('❌ Error testing API:', error.response?.data || error.message);
  }
}

// Run the test
testResumeOptimization(); 