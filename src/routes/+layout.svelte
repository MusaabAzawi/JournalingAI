<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  
  let { children } = $props();
</script>

<div class="app-layout">
  <nav class="main-nav">
    <div class="nav-container">
      <a href="/" class="nav-brand">
        🤖 JournalingAI
      </a>
      
      <div class="nav-links">
        <a href="/" class="nav-link">
          📝 Journal
        </a>
        <a href="/about" class="nav-link">
          ℹ️ About
        </a>
      </div>
    </div>
  </nav>

  <main class="main-content">
    {@render children()}
  </main>

  <footer class="app-footer">
    <p>Made with ❤️ using SvelteKit</p>
  </footer>
</div>

<style>
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .main-nav {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }

  .nav-brand {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-links {
    display: flex;
    gap: 20px;
  }

  .nav-link {
    color: #4a5568;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s;
    font-size: 0.9rem;
  }

  .nav-link:hover {
    background: rgba(66, 153, 225, 0.1);
    color: #2b6cb0;
  }

  .main-content {
    flex: 1;
    padding: 20px 0;
  }

  .app-footer {
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding: 20px;
    color: #718096;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .nav-container {
      padding: 0 15px;
    }

    .nav-links {
      gap: 15px;
    }

    .nav-link {
      font-size: 0.85rem;
      padding: 6px 10px;
    }

    .main-content {
      padding: 15px 0;
    }
  }
</style>