const axios = require('axios');

const API_KEY = '6251faaaa05438c9f39cb7919e356796ef4566e136558be655388d078cc1a645';
const BASE_URL = 'https://openrouter.ai/api/v1';

async function testOpenRouterAPI() {
  try {
    console.log('Testing OpenRouter API connection...');
    console.log('API Key (first 10 chars):', API_KEY.substring(0, 10) + '...');
    
    const response = await axios.post(
      `${BASE_URL}/chat/completions`,
      {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'user',
            content: 'Hello, this is a test message. Please respond with "API is working!"'
          }
        ],
        temperature: 0.3,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3001',
          'X-Title': 'ATS Resume Builder Test'
        }
      }
    );

    console.log('✅ API Response:');
    console.log(response.data.choices[0].message.content);
    
  } catch (error) {
    console.error('❌ API Error:');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data);
    
    if (error.response?.status === 401) {
      console.log('\n🔍 Troubleshooting 401 Error:');
      console.log('1. Check if your API key is correct');
      console.log('2. Make sure you have credits in your OpenRouter account');
      console.log('3. Verify the API key is active');
      console.log('4. Try generating a new API key from OpenRouter dashboard');
    }
  }
}

testOpenRouterAPI(); 