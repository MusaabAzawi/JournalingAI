
<svelte:head>
  <title>About - JournalingAI</title>
</svelte:head>

<div class="about-container">
  <div class="hero-section">
    <h1>🤖 JournalingAI</h1>
    <p class="hero-subtitle">Your Personal AI-Powered Journaling Companion</p>
  </div>

  <div class="content-section">
    <div class="purpose-card">
      <h2>📝 Application Purpose</h2>
      <p>
        JournalingAI is designed to make journaling more engaging and insightful by combining 
        your personal reflections with AI-powered responses. Write about your day, thoughts, 
        or feelings, and receive thoughtful AI feedback that helps you explore deeper.
      </p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">💭</div>
        <h3>Smart Conversations</h3>
        <p>AI responds to your journal entries with empathetic questions and insights</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h3>Mood Tracking</h3>
        <p>Automatically detects and visualizes your emotional patterns over time</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Private & Secure</h3>
        <p>Your journals are stored locally in your browser for complete privacy</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">💡</div>
        <h3>Reflection Prompts</h3>
        <p>Get thoughtful questions that help you explore your thoughts deeper</p>
      </div>
    </div>

    <div class="tech-section">
      <h2>🛠️ Technology Stack</h2>
      <div class="tech-grid">
        <div class="tech-item">
          <strong>Frontend:</strong> SvelteKit + TypeScript
        </div>
        <div class="tech-item">
          <strong>AI API:</strong> Google Gemini 2.0 Flash
        </div>
        <div class="tech-item">
          <strong>Styling:</strong> Modern CSS with Tailwind
        </div>
        <div class="tech-item">
          <strong>Storage:</strong> Browser LocalStorage
        </div>
      </div>
    </div>

    <div class="data-structure">
      <h2>📋 Data Structure</h2>
      <div class="code-block">
        <pre><code>{`interface JournalEntry {
  id: string;                    // Unique identifier
  title: string;                 // Auto-generated title
  content: string;               // User's journal content
  aiResponse?: string;           // AI's response
  createdAt: Date;              // Timestamp
  mood?: 'happy' | 'neutral' |   // Detected mood
         'sad' | 'excited' | 
         'thoughtful';
  conversation?: Array<{         // Extended conversations
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
  }>;
}`}</code></pre>
      </div>
    </div>

    <div class="visual-outcomes">
      <h2>👁️ Visual Outcomes</h2>
      <div class="outcomes-grid">
        <div class="outcome-item">
          <h4>📈 Statistics Dashboard</h4>
          <p>View total entries, daily counts, and mood distribution</p>
        </div>
        <div class="outcome-item">
          <h4>💬 Conversation Flow</h4>
          <p>See the natural dialogue between you and the AI</p>
        </div>
        <div class="outcome-item">
          <h4>😊 Mood Indicators</h4>
          <p>Visual emojis represent detected emotions in each entry</p>
        </div>
        <div class="outcome-item">
          <h4>📅 Timeline View</h4>
          <p>Chronological display of your journaling journey</p>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <h2>Ready to Start Journaling?</h2>
      <p>Begin your mindful journaling journey with AI assistance</p>
      <a href="/" class="cta-button">✨ Start Writing Now</a>
    </div>
  </div>
</div>

<style>
  .about-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 50px;
  }

  .hero-section h1 {
    font-size: 3rem;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: #4a5568;
    margin: 10px 0 0 0;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .purpose-card {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    text-align: center;
  }

  .purpose-card h2 {
    color: #2d3748;
    margin-bottom: 20px;
  }

  .purpose-card p {
    color: #4a5568;
    line-height: 1.7;
    font-size: 1.1rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }

  .feature-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    text-align: center;
    transition: transform 0.2s;
  }

  .feature-card:hover {
    transform: translateY(-3px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  .feature-card h3 {
    color: #2d3748;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  .feature-card p {
    color: #4a5568;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  .tech-section {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }

  .tech-section h2 {
    color: #2d3748;
    margin-bottom: 20px;
    text-align: center;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .tech-item {
    background: #f7fafc;
    padding: 15px;
    border-radius: 8px;
    color: #4a5568;
  }

  .tech-item strong {
    color: #2d3748;
  }

  .data-structure {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }

  .data-structure h2 {
    color: #2d3748;
    margin-bottom: 20px;
    text-align: center;
  }

  .code-block {
    background: #1a202c;
    padding: 20px;
    border-radius: 10px;
    overflow-x: auto;
  }

  .code-block pre {
    margin: 0;
    color: #e2e8f0;
    font-family: 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .visual-outcomes {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }

  .visual-outcomes h2 {
    color: #2d3748;
    margin-bottom: 20px;
    text-align: center;
  }

  .outcomes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .outcome-item {
    background: #f7fafc;
    padding: 20px;
    border-radius: 10px;
  }

  .outcome-item h4 {
    color: #2d3748;
    margin-bottom: 8px;
    font-size: 1rem;
  }

  .outcome-item p {
    color: #4a5568;
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0;
  }

  .cta-section {
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px;
    border-radius: 15px;
  }

  .cta-section h2 {
    margin-bottom: 10px;
  }

  .cta-section p {
    margin-bottom: 25px;
    opacity: 0.9;
  }

  .cta-button {
    display: inline-block;
    background: white;
    color: #667eea;
    padding: 15px 30px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s;
  }

  .cta-button:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
    }

    .features-grid,
    .tech-grid,
    .outcomes-grid {
      grid-template-columns: 1fr;
    }

    .code-block {
      font-size: 0.8rem;
    }
  }
</style>