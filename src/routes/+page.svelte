
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1>The textarea element</h1>

<form method="get">
  <p><label for="w3review">Review of W3Schools:</label></p>
  <textarea id="w3review" name="w3review" rows="4" cols="50">At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.</textarea>
  <br>
 <button type="submit">Submit</button>
</form>
<button onclick={handlePrompt}>Prompt</button>
<p>{prmt}</p>
<script lang="ts">
    let prmt = $state("");
  // You can add a submit handler here if needed
  // Example:
  // function handleSubmit(event: Event) {
  //   event.preventDefault();
  //   // Your logic here
  // }

    // You can also use the response variable to store the textarea value if needed
  async function handlePrompt() {
     const response = await fetch('/prompt');
     const json = await response.json();
     const data = json?.candidates?.[0]?.content?.parts?.[0]?.text;
     prmt = JSON.stringify(data);
    if (response.ok) {
      console.log('Response from server:', data);
    } else {
      console.error('Error:', response.statusText);
    }
  }
</script>