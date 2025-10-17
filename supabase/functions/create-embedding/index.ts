import OpenAI from 'https://deno.land/x/openai@v4.24.0/mod.ts'
const openai = new OpenAI({
	apiKey: Deno.env.get('OPENAI_API_KEY')
})

Deno.serve(async (req) => {
	if (req.method === 'OPTIONS') {
		return new Response(null, {
			status: 204,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization'
			}
		})
	}

	// Get the input
	const { input } = await req.json()

	// Get the embedding response
	const embeddingResponse = await openai.embeddings.create({
		model: 'text-embedding-3-small',
		input: input,
		encoding_format: 'float'
	})

	// Extract the actual embedding vector
	const embedding = embeddingResponse.data[0].embedding

	// Return the embedding vector back to the client (as the response)
	return new Response(JSON.stringify({ embedding }), {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization'
		}
	})
})
