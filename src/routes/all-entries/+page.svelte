<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  interface JournalEntry {
    id: string;
    date: string;
    content: string;
    mood: number;
    aiInsight?: string;
    createdAt: number;
  }

  let entries = $state<JournalEntry[]>([]);
  let filteredEntries = $state<JournalEntry[]>([]);
  let searchTerm = $state('');
  let selectedMood = $state<number | null>(null);
  let sortBy = $state<'newest' | 'oldest' | 'mood'>('newest');

  // Load entries from localStorage
  onMount(() => {
    const stored = localStorage.getItem('journal-entries');
    if (stored) {
      try {
        entries = JSON.parse(stored);
        filterEntries();
      } catch (error) {
        console.error('Failed to load entries:', error);
        entries = [];
      }
    }
  });

  // Filter and sort entries
  function filterEntries() {
    let filtered = [...entries];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.content.toLowerCase().includes(term) ||
        entry.aiInsight?.toLowerCase().includes(term)
      );
    }

    // Filter by mood
    if (selectedMood !== null) {
      filtered = filtered.filter(entry => entry.mood === selectedMood);
    }

    // Sort entries
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'oldest':
        filtered.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case 'mood':
        filtered.sort((a, b) => b.mood - a.mood);
        break;
    }

    filteredEntries = filtered;
  }

  // Reactive filtering
  $effect(() => {
    filterEntries();
  });

  // Get mood emoji
  function getMoodEmoji(mood: number): string {
    const emojis = ['😢', '😟', '😐', '😊', '😄'];
    return emojis[mood - 1] || '😐';
  }

  // Format date
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Format time
  function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  // Clear filters
  function clearFilters() {
    searchTerm = '';
    selectedMood = null;
    sortBy = 'newest';
  }

  // Delete entry
  function deleteEntry(entryId: string) {
    if (confirm('Are you sure you want to delete this entry?')) {
      entries = entries.filter(entry => entry.id !== entryId);
      localStorage.setItem('journal-entries', JSON.stringify(entries));
    }
  }

  // Get stats
  let totalEntries = $derived(entries.length);
  let averageMood = $derived(
    entries.length > 0 
      ? entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length
      : 0
  );
</script>

<svelte:head>
  <title>All Journal Entries</title>
</svelte:head>

<div class="all-entries-page">
  <!-- Header -->
  <header class="page-header">
    <button class="back-button" onclick={() => goto('/')}>
      ← Back to Journal
    </button>
    <h1>All Entries</h1>
    <div class="header-stats">
      <span>{totalEntries} total entries</span>
      <span>Average mood: {averageMood.toFixed(1)} {getMoodEmoji(Math.round(averageMood))}</span>
    </div>
  </header>

  <!-- Filters -->
  <div class="filters">
    <div class="search-box">
      <input 
        type="text" 
        bind:value={searchTerm}
        placeholder="Search entries..."
        class="search-input"
      />
    </div>

    <div class="filter-controls">
      <select bind:value={sortBy} class="sort-select">
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="mood">By mood</option>
      </select>

      <div class="mood-filter">
        <span>Mood:</span>
        <button 
          class="mood-filter-btn {selectedMood === null ? 'active' : ''}"
          onclick={() => selectedMood = null}
        >
          All
        </button>
        {#each [1,2,3,4,5] as mood}
          <button 
            class="mood-filter-btn {selectedMood === mood ? 'active' : ''}"
            onclick={() => selectedMood = mood}
          >
            {getMoodEmoji(mood)}
          </button>
        {/each}
      </div>

      {#if searchTerm || selectedMood !== null}
        <button class="clear-filters" onclick={clearFilters}>
          Clear filters
        </button>
      {/if}
    </div>
  </div>

  <!-- Results -->
  <div class="results-info">
    {#if searchTerm || selectedMood !== null}
      Showing {filteredEntries.length} of {totalEntries} entries
    {:else}
      {totalEntries} entries
    {/if}
  </div>

  <!-- Entries -->
  <div class="entries-list">
    {#if filteredEntries.length === 0}
      <div class="empty-state">
        {#if entries.length === 0}
          <h3>No entries yet</h3>
          <p>Start journaling to see your entries here!</p>
          <button class="primary-button" onclick={() => goto('/')}>
            Write your first entry
          </button>
        {:else}
          <h3>No entries match your filters</h3>
          <p>Try adjusting your search or filters.</p>
        {/if}
      </div>
    {:else}
      {#each filteredEntries as entry (entry.id)}
        <article class="entry-card">
          <header class="entry-header">
            <div class="entry-meta">
              <h3 class="entry-date">{formatDate(entry.date)}</h3>
              <time class="entry-time">{formatTime(entry.createdAt)}</time>
            </div>
            <div class="entry-actions">
              <span class="entry-mood" title="Mood: {entry.mood}/5">
                {getMoodEmoji(entry.mood)}
              </span>
              <button 
                class="delete-button" 
                onclick={() => deleteEntry(entry.id)}
                title="Delete entry"
              >
                🗑️
              </button>
            </div>
          </header>

          <div class="entry-content">
            <p>{entry.content}</p>
          </div>

          {#if entry.aiInsight}
            <div class="entry-insight">
              <h4>💡 AI Insight</h4>
              <p>{entry.aiInsight}</p>
            </div>
          {/if}
        </article>
      {/each}
    {/if}
  </div>
</div>

<style>
  .all-entries-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .page-header {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
  }

  .back-button {
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    color: #666;
    text-decoration: none;
    width: fit-content;
    transition: all 0.2s;
  }

  .back-button:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }

  .page-header h1 {
    margin: 0;
    font-size: 32px;
    color: #333;
  }

  .header-stats {
    display: flex;
    gap: 20px;
    color: #666;
    font-size: 14px;
  }

  .filters {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .search-box {
    margin-bottom: 15px;
  }

  .search-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: #007bff;
  }

  .filter-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
  }

  .sort-select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: white;
    cursor: pointer;
  }

  .mood-filter {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .mood-filter span {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }

  .mood-filter-btn {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mood-filter-btn:hover {
    border-color: #007bff;
  }

  .mood-filter-btn.active {
    border-color: #007bff;
    background: #007bff;
    color: white;
  }

  .clear-filters {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }

  .results-info {
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .entries-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .empty-state h3 {
    margin: 0 0 10px 0;
    color: #333;
  }

  .empty-state p {
    margin: 0 0 20px 0;
  }

  .primary-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  }

  .primary-button:hover {
    background: #0056b3;
  }

  .entry-card {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 16px;
    padding: 25px;
    transition: all 0.2s;
  }

  .entry-card:hover {
    border-color: #007bff;
    box-shadow: 0 4px 12px rgba(0,123,255,0.1);
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }

  .entry-meta h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
    font-weight: 600;
  }

  .entry-time {
    font-size: 12px;
    color: #999;
    display: block;
    margin-top: 2px;
  }

  .entry-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .entry-mood {
    font-size: 20px;
  }

  .delete-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  .delete-button:hover {
    opacity: 1;
  }

  .entry-content p {
    margin: 0;
    line-height: 1.6;
    color: #333;
    font-size: 16px;
  }

  .entry-insight {
    background: #f8f9fa;
    border-left: 4px solid #007bff;
    padding: 15px 20px;
    margin-top: 15px;
    border-radius: 0 8px 8px 0;
  }

  .entry-insight h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #007bff;
    font-weight: 600;
  }

  .entry-insight p {
    margin: 0;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .all-entries-page {
      padding: 15px;
    }

    .page-header {
      text-align: center;
    }

    .header-stats {
      flex-direction: column;
      gap: 5px;
    }

    .filter-controls {
      flex-direction: column;
      align-items: stretch;
    }

    .mood-filter {
      justify-content: center;
    }

    .entry-header {
      flex-direction: column;
      gap: 10px;
    }

    .entry-actions {
      justify-content: space-between;
      width: 100%;
    }
  }
</style>