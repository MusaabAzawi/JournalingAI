<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let journalId = $page.params.id; // Changed from journalId to id
  let messages = $state<Array<{role: string, content: string}>>([]);
  let currentInput = $state('');
  let isLoading = $state(false);
  let journalTitle = $state('');
  let journalDate = $state('');

  onMount(async () => {
    // Set journal metadata
    journalDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    journalTitle = `Journal Session ${journalId}`;

    await initializeJournal();
  });

  async function initializeJournal() {
    isLoading = true;
    try {
      const response = await fetch('/Journal/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Start a journaling session. Ask me an engaging question to help me reflect on my day or thoughts.',
          journalId: journalId
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (aiResponse) {
          messages = [
            { role: 'ai', content: aiResponse }
          ];
        }
      } else {
        console.error('Failed to initialize journal:', response.status);
        // Add a fallback message
        messages = [
          { role: 'ai', content: 'Hello! I\'m here to help you with your journaling. What\'s on your mind today?' }
        ];
      }
    } catch (error) {
      console.error('Error initializing journal:', error);
      // Add a fallback message
      messages = [
        { role: 'ai', content: 'Hello! I\'m here to help you with your journaling. What\'s on your mind today?' }
      ];
    } finally {
      isLoading = false;
    }
  }

  async function sendMessage() {
    if (!currentInput.trim() || isLoading) return;

    const userMessage = currentInput.trim();
    messages = [...messages, { role: 'user', content: userMessage }];
    currentInput = '';
    isLoading = true;

    try {
      const response = await fetch('/Journal/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage,
          journalId: journalId,
          context: messages
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (aiResponse) {
          messages = [...messages, { role: 'ai', content: aiResponse }];
        } else {
          messages = [...messages, { role: 'ai', content: 'I hear you. Could you tell me more about that?' }];
        }
      } else {
        messages = [...messages, { role: 'ai', content: 'I\'m having trouble responding right now, but I\'m listening. Please continue.' }];
      }
    } catch (error) {
      console.error('Error sending message:', error);
      messages = [...messages, { role: 'ai', content: 'I\'m having trouble responding right now, but I\'m listening. Please continue.' }];
    } finally {
      isLoading = false;
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<svelte:head>
  <title>{journalTitle}</title>
</svelte:head>

<div class="journal-container">
  <!-- Header -->
  <div class="journal-header">
    <button class="back-button" onclick={() => goto('/')}>
      ← Back to Home
    </button>
    <div class="journal-info">
      <h1 class="journal-title">{journalTitle}</h1>
      <p class="journal-date">{journalDate}</p>
    </div>
  </div>

  <!-- Messages Container -->
  <div class="messages-container">
    {#each messages as message, index (index)}
      <div class="message {message.role}">
        <div class="message-content">
          <div class="message-header">
            <strong>{message.role === 'user' ? 'You' : 'AI Assistant'}</strong>
          </div>
          <p>{message.content}</p>
        </div>
      </div>
    {/each}
    
    {#if isLoading}
      <div class="message ai">
        <div class="message-content">
          <div class="loading-indicator">
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>AI is thinking...</p>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <!-- Input Area -->
  <div class="input-container">
    <div class="input-wrapper">
      <textarea
        bind:value={currentInput}
        onkeypress={handleKeyPress}
        placeholder="Share your thoughts, feelings, or what's on your mind..."
        rows="3"
        disabled={isLoading}
      ></textarea>
      <button 
        onclick={sendMessage} 
        disabled={!currentInput.trim() || isLoading}
        class="send-button"
      >
        Send
      </button>
    </div>
  </div>
</div>

<style>
  .journal-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .journal-header {
    margin-bottom: 30px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 20px;
  }

  .back-button {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    color: #666;
    text-decoration: none;
    margin-bottom: 15px;
    display: inline-block;
    transition: all 0.2s;
  }

  .back-button:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }

  .journal-info {
    margin-top: 10px;
  }

  .journal-title {
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }

  .journal-date {
    font-size: 16px;
    color: #666;
    margin: 5px 0 0 0;
  }

  .messages-container {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 20px 0;
  }

  .message {
    margin-bottom: 20px;
    display: flex;
  }

  .message.user {
    justify-content: flex-end;
  }

  .message.ai {
    justify-content: flex-start;
  }

  .message-content {
    max-width: 70%;
    padding: 16px 20px;
    border-radius: 18px;
    position: relative;
  }

  .message.user .message-content {
    background: #007bff;
    color: white;
    border-bottom-right-radius: 4px;
  }

  .message.ai .message-content {
    background: #f8f9fa;
    color: #333;
    border: 1px solid #e0e0e0;
    border-bottom-left-radius: 4px;
  }

  .message-header {
    font-size: 12px;
    margin-bottom: 5px;
    opacity: 0.8;
  }

  .message-content p {
    margin: 0;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .loading-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .loading-dots {
    display: flex;
    gap: 4px;
  }

  .loading-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #666;
    animation: loading 1.4s infinite ease-in-out both;
  }

  .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
  .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

  @keyframes loading {
    0%, 80%, 100% {
      transform: scale(0);
    } 
    40% {
      transform: scale(1);
    }
  }

  .input-container {
    border-top: 1px solid #e0e0e0;
    padding-top: 20px;
    background: white;
    position: sticky;
    bottom: 0;
  }

  .input-wrapper {
    display: flex;
    gap: 12px;
    align-items: flex-end;
  }

  textarea {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    resize: none;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.5;
    transition: border-color 0.2s;
  }

  textarea:focus {
    outline: none;
    border-color: #007bff;
  }

  textarea:disabled {
    background: #f8f9fa;
    color: #666;
  }

  .send-button {
    padding: 12px 24px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.2s;
    min-width: 80px;
  }

  .send-button:hover:not(:disabled) {
    background: #0056b3;
    transform: translateY(-1px);
  }

  .send-button:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    .journal-container {
      padding: 15px;
    }

    .message-content {
      max-width: 85%;
    }

    .input-wrapper {
      flex-direction: column;
      gap: 8px;
    }

    .send-button {
      align-self: flex-end;
    }
  }
</style>