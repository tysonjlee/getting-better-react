export default async function createEmbedding(input) {
  // Send a request to create-embedding edge function & get response 
  const response = await fetch("https://rvmotmagqmbbbdsvmbcs.functions.supabase.co/create-embedding", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  // Extract embedding
  const data = await response.json();
  const embedding = data.embedding;

  // TODO: Store embedding in vector database 

  // Return embedding 
  return embedding;
}
