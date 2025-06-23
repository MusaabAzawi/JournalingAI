<script lang="ts">
  import { goto } from '$app/navigation';

  let prmt = $state("");
  let quickJournalText = $state("");
  let isTestingConnection = $state(false);
  
  async function handlePrompt() {
    isTestingConnection = true;
    try {
      const response = await fetch('/Journal', {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json();
      const data = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      prmt = data || 'Connection successful! AI responded.';
      
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error:', error);
      prmt = `Error: ${error.message}`;
    } finally {
      isTestingConnection = false;
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

  // Handle quick journal submission
  async function handleQuickJournal() {
    if (!quickJournalText.trim()) return;
    
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: quickJournalText,
          type: 'new_entry'
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        alert(`AI Response: ${aiResponse}`);
        quickJournalText = ''; // Clear the form
      } else {
        alert('Error submitting journal entry');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting journal entry');
    }
  }
</script>

<div class="main-container">
  <div class="hero-section">
    <h1>🤖 Welcome to JournalingAI</h1>
    <p>Your personal AI-powered journaling companion</p>
  </div>

  <div class="action-section">
    <h2>Start Your Journaling Journey</h2>
    
    <!-- Main Journal Entry Card -->
    <div class="artifact-container" onclick={handleArtifactClick}>
      <div class="artifact-content">
        <div class="artifact-title">🚀 Start New Journal Session</div>
        <div class="artifact-subtitle">Click to begin an AI-guided journaling conversation</div>
      </div>
      <div class="artifact-icon-container">
        <svg class="atom-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="2" fill="#666666"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" stroke="#666666" stroke-width="1.5" fill="none"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" stroke="#666666" stroke-width="1.5" fill="none"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" stroke="#666666" stroke-width="1.5" fill="none"/>
        </svg>
      </div>
    </div>

    <!-- Quick Journal Form -->
    <div class="quick-journal-section">
      <h3>💭 Quick Journal Entry</h3>
      <p>Share a quick thought and get instant AI feedback</p>
      
      <div class="quick-journal-form">
        <textarea
          bind:value={quickJournalText}
          placeholder="What's on your mind today? Share your thoughts, feelings, or experiences..."
          rows="4"
        ></textarea>
        
        <button 
          onclick={handleQuickJournal}
          disabled={!quickJournalText.trim()}
          class="submit-button"
        >
          💬 Get AI Feedback
        </button>
      </div>
    </div>

    <!-- Test Connection -->
    <div class="test-section">
      <h3>🔧 Test AI Connection</h3>
      <button 
        onclick={handlePrompt}
        disabled={isTestingConnection}
        class="test-button"
      >
        {#if isTestingConnection}
          Testing...
        {:else}
          Test Connection
        {/if}
      </button>
      
      {#if prmt}
        <div class="api-response">
          <p><strong>Response:</strong></p>
          <p>{prmt}</p>
        </div>
      {/if}
    </div>

    <!-- Navigation Links -->
    <div class="nav-section">
      <a href="/all-entries" class="nav-link">
        📚 View All Entries
      </a>
      <a href="/about" class="nav-link">
        ℹ️ Learn More
      </a>
    </div>
  </div>
</div>

<style>
  .main-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 40px;
  }

  .hero-section h1 {
    font-size: 2.5rem;
    margin: 0 0 10px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-section p {
    font-size: 1.2rem;
    color: #4a5568;
    margin: 0;
  }

  .action-section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .action-section h2 {
    text-align: center;
    color: #2d3748;
    margin-bottom: 20px;
  }

  .artifact-container {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 16px;
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .artifact-container:hover {
    border-color: #667eea;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }

  .artifact-content {
    flex: 1;
  }

  .artifact-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 5px;
  }

  .artifact-subtitle {
    color: #4a5568;
    font-size: 1rem;
  }

  .artifact-icon-container {
    width: 50px;
    height: 50px;
    background: #f7fafc;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    transition: all 0.3s ease;
  }

  .artifact-container:hover .artifact-icon-container {
    border-color: #667eea;
    background: #eef2ff;
  }

  .atom-icon {
    width: 24px;
    height: 24px;
  }

  .quick-journal-section {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .quick-journal-section h3 {
    margin: 0 0 8px 0;
    color: #2d3748;
    font-size: 1.2rem;
  }

  .quick-journal-section p {
    margin: 0 0 20px 0;
    color: #4a5568;
  }

  .quick-journal-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.5;
    resize: vertical;
    transition: border-color 0.2s;
  }

  textarea:focus {
    outline: none;
    border-color: #667eea;
  }

  .submit-button {
    align-self: flex-start;
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .submit-button:hover:not(:disabled) {
    background: #5a6fd8;
    transform: translateY(-1px);
  }

  .submit-button:disabled {
    background: #a0aec0;
    cursor: not-allowed;
    transform: none;
  }

  .test-section {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    text-align: center;
  }

  .test-section h3 {
    margin: 0 0 15px 0;
    color: #2d3748;
  }

  .test-button {
    background: #48bb78;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }

  .test-button:hover:not(:disabled) {
    background: #38a169;
  }

  .test-button:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }

  .api-response {
    margin-top: 20px;
    padding: 15px;
    background: #f7fafc;
    border-radius: 8px;
    text-align: left;
  }

  .api-response p {
    margin: 5px 0;
    color: #2d3748;
  }

  .nav-section {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .nav-link {
    background: white;
    color: #4a5568;
    text-decoration: none;
    padding: 12px 20px;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    transition: all 0.2s;
    font-weight: 500;
  }

  .nav-link:hover {
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2rem;
    }

    .artifact-container {
      flex-direction: column;
      text-align: center;
      gap: 15px;
      padding: 20px;
    }

    .artifact-icon-container {
      margin-left: 0;
    }

    .nav-section {
      flex-direction: column;
      align-items: center;
    }

    .nav-link {
      width: 100%;
      max-width: 300px;
      text-align: center;
    }
  }
</style>