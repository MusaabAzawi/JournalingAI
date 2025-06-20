<script lang="ts">
  import { goto } from '$app/navigation';

  let prmt = $state("");
  
  async function handlePrompt() {
     const response = await fetch('./Journal');
     const json = await response.json();
     const data = json?.candidates?.[0]?.content?.parts?.[0]?.text;
     prmt = JSON.stringify(data);
    if (response.ok) {
      console.log('Response from server:', data);
    } else {
      console.error('Error:', response.statusText);
    }
  }

  // Function to create a new journal entry
  async function createNewJournal() {
    // Generate a unique journal ID (timestamp-based)
    const journalId = `journal-${Date.now()}`;
    
    // Navigate to the new journal page
    await goto(`/Journal/${journalId}`);
  }

  // Handle click on artifact container
  function handleArtifactClick() {
    createNewJournal();
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1>Create a New Journal Entry</h1>
<body>
  <ul>
    <!-- Make the artifact container clickable -->
    <div class="artifact-container" onclick={handleArtifactClick}>
      <div class="artifact-content">
        <div class="artifact-title">Start New Journal Entry</div>
        <div class="artifact-subtitle">Click to begin journaling with AI assistance</div>
      </div>
      <div class="artifact-icon-container">
        <svg class="atom-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Center circle -->
          <circle cx="12" cy="12" r="2" fill="#666666"/>
          <!-- Orbital paths -->
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" stroke="#666666" stroke-width="1.5" fill="none"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" stroke="#666666" stroke-width="1.5" fill="none"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" stroke="#666666" stroke-width="1.5" fill="none"/>
        </svg>
      </div>
    </div>
  </ul>
</body>

<!-- Keep your existing demo form for testing -->
<form method="get">
  <p><label for="w3review">Quick Journal Test</label></p>
  <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder="Write your thoughts here..."></textarea>
  <br>
  <button type="submit">Submit</button>
</form>

<button onclick={handlePrompt}>Test API Connection</button>
{#if prmt}
  <div class="api-response">
    <p><strong>API Response:</strong></p>
    <p>{prmt}</p>
  </div>
{/if}

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f5f5f5;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    gap: 20px;
  }

  .artifact-container {
    width: 100%;
    max-width: 800px;
    background-color: #ffffff;
    border: 2px solid #a0b4d3;
    border-radius: 24px;
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    margin: 20px 0;
  }

  .artifact-container:hover {
    border-color: #7090c0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  .artifact-container:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .artifact-content {
    flex: 1;
  }

  .artifact-title {
    font-size: 20px;
    font-weight: 500;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .artifact-subtitle {
    font-size: 16px;
    color: #666666;
  }

  .artifact-icon-container {
    width: 48px;
    height: 48px;
    background-color: #ffffff;
    border: 2px solid #d0d0d0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    transition: all 0.3s ease;
  }

  .artifact-container:hover .artifact-icon-container {
    border-color: #a0b4d3;
    background-color: #f8f9fa;
  }

  .atom-icon {
    width: 24px;
    height: 24px;
  }

  textarea {
    margin: auto;
    justify-content: center;
    align-items: center;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px;
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #f8f9fa;
    transition: all 0.2s;
  }

  button:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }

  p {
    margin-top: 10px;
    font-size: 16px;
    max-width: 800px;
    text-align: center;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
  }

  .api-response {
    max-width: 800px;
    padding: 20px;
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-top: 20px;
  }

  .api-response p {
    text-align: left;
    margin: 5px 0;
    word-wrap: break-word;
  }

  ul {
    width: 100%;
    max-width: 800px;
    list-style: none;
    padding: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 30px 0;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: white;
  }

  label {
    font-weight: 500;
    color: #333;
  }

  @media (max-width: 768px) {
    .artifact-container {
      padding: 20px;
      flex-direction: column;
      text-align: center;
      gap: 15px;
    }

    .artifact-icon-container {
      margin-left: 0;
    }

    textarea {
      width: 90%;
    }
  }
</style>