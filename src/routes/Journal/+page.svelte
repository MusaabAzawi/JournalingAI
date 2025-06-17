
<h1>Welcome to Prompt</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1>The textarea element</h1>


<script lang="ts">
let masseges = $state([
  {
    role: "system",
    content: "You are a helpful assistant."
  },
  {
    role: "user",
    content: "What is the weather like today?"
  }
]);

function storeArtifact(title: string, date: string) {
  // Store the artifact title and date in a database or state management
  // For simplicity, we'll just log it to the console
  console.log(`Artifact Title: ${title}`);
  console.log(`Artifact Date: ${date}`);
}

let artifactTitle = "Simple Journaling Input";
let artifactDate = "16-june-2025";
storeArtifact(artifactTitle, artifactDate);



</script>