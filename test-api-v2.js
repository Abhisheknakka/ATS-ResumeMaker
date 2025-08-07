const axios = require('axios');

const BASE_URL = 'https://openrouter.ai/api/v1';

// Try different API key formats
const apiKeys = [
  '6251faaaa05438c9f39cb7919e356796ef4566e136558be655388d078cc1a645',
  'sk-or-' + '6251faaaa05438c9f39cb7919e356796ef4566e136558be655388d078cc1a645',
  'sk-' + '6251faaaa05438c9f39cb7919e356796ef4566e136558be655388d078cc1a645'
];

async function testAPIKey(key, format) {
  try {
    console.log(`\nTesting API key format: ${format}`);
    console.log('Key (first 10 chars):', key.substring(0, 10) + '...');
    
    const response = await axios.post(
      `${BASE_URL}/chat/completions`,
      {
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'user',
            content: 'Hello, this is a test message.'
          }
        ],
        temperature: 0.3,
        max_tokens: 50
      },
      {
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3001',
          'X-Title': 'ATS Resume Builder Test'
        }
      }
    );

    console.log('✅ SUCCESS! API is working with this format.');
    return true;
    
  } catch (error) {
    console.log(`❌ Failed: ${error.response?.data?.error?.message || error.message}`);
    return false;
  }
}

async function testAllFormats() {
  console.log('Testing different API key formats...\n');
  
  const formats = ['Raw Key', 'sk-or- prefix', 'sk- prefix'];
  
  for (let i = 0; i < apiKeys.length; i++) {
    const success = await testAPIKey(apiKeys[i], formats[i]);
    if (success) {
      console.log(`\n🎉 Use this format: ${formats[i]}`);
      console.log(`API Key: ${apiKeys[i]}`);
      return apiKeys[i];
    }
  }
  
  console.log('\n❌ None of the formats worked. Please check your OpenRouter account.');
  return null;
}

testAllFormats(); 