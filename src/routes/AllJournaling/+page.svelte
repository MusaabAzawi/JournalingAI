<script lang="ts">
  import Journal from '../Journal/+page.svelte';
  
  export const postType = 'preview';
  
  let valueToPass = 'something awesome';
  
  let Journaling = [
    {
      id: 1,
      title: "Simple Journaling Input",
      date: "16-june-2025",
      content: "This is a simple journaling input example.",
      closed: false
    },
    {
      title: "Advanced Journaling Input",
      date: "17-june-2025",
      content: "This is an advanced journaling input example with more features.",
      closed: false
    },
    {
      title: "Another Journaling Input",
      date: "18-june-2025",
      content: "This is another journaling input example.",
      closed: true
    },
    {
      title: "Advanced Journaling Input",
      date: "17-june-2025",
      content: "This is an advanced journaling input example with more features.",
      closed: false
    }
  ];
    let totalEntries = Journaling.length;
    let closedEntries = Journaling.filter(entry => entry.closed).length;
   export const entries: typeof Journaling[] = [];
</script>

<h1>Welcome to AllJournaling</h1>
<ul>
	<li><a href="/blog/one">one</a></li>
	<li><a href="/blog/two">two</a></li>
	<li><a href="/blog/three">three</a></li>
</ul>
 {#each Journaling as entry}
<div class="artifact-container">
 
    <div class="artifact-content">
      <div class="artifact-title">{entry.title}</div>
      <div class="artifact-subtitle">{entry.date}</div>
      <p>{entry.content}</p>
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
  {/each}
   

    <style>
  * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
  textarea {
   margin: auto;
   justify-content: center;
   align-items: center;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
  }
  button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  p {
    margin-top: 10px;
    font-size: 16px;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
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
        }

        .artifact-container:hover {
            border-color: #7090c0;
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
        }

        /* Atom-like icon SVG */
        .atom-icon {
            width: 24px;
            height: 24px;
        }

        /* Editable version */
        .artifact-editable {
            width: 100%;
            max-width: 800px;
            background-color: #ffffff;
            border: 2px solid #7090c0;
            border-radius: 24px;
            padding: 24px 32px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .input-group {
            margin-bottom: 16px;
        }

        .input-label {
            font-size: 14px;
            color: #666666;
            margin-bottom: 8px;
            display: block;
        }

        .input-field {
            width: 100%;
            padding: 12px 16px;
            font-size: 16px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        .input-field:focus {
            outline: none;
            border-color: #7090c0;
            box-shadow: 0 0 0 3px rgba(112, 144, 192, 0.1);
        }

        .version-input {
            width: 120px;
        }

        /* Demo section */
        .demo-section {
            width: 100%;
            max-width: 800px;
            margin-top: 40px;
        }

        h2 {
            font-size: 24px;
            color: #1a1a1a;
            margin-bottom: 20px;
        }

        .description {
            color: #666666;
            line-height: 1.6;
            margin-bottom: 20px;
        }

</style>
