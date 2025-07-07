// netlify/functions/ollama-proxy.js
exports.handler = async (event, context) => {
  console.log('🚀 Proxy function called');
  console.log('Method:', event.httpMethod);
  console.log('Body:', event.body);

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    console.log('✅ OPTIONS request handled');
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    console.log('❌ Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Votre URL RunPod Ollama
    const OLLAMA_URL = 'https://usizvecpl32e6v-11434.proxy.runpod.net';
    console.log('🎯 Calling:', `${OLLAMA_URL}/api/generate`);
    
    // Vérifier que le body existe
    if (!event.body) {
      throw new Error('No body provided');
    }

    // Transférer la requête vers Ollama
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: event.body,
      // Ajouter timeout
      signal: AbortSignal.timeout(30000) // 30 secondes
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error(`RunPod responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Success, response length:', JSON.stringify(data).length);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('❌ Proxy error:', error);
    
    // Détail de l'erreur pour débugger
    const errorResponse = {
      error: 'Proxy error',
      message: error.message,
      timestamp: new Date().toISOString(),
      runpodUrl: 'https://usizvecpl32e6v-11434.proxy.runpod.net'
    };

    return {
      statusCode: 502,
      headers,
      body: JSON.stringify(errorResponse)
    };
  }
};