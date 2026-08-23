<script lang="ts">
  let open = false;
  let input = "";
  let messages: { role: "user" | "assistant"; text: string }[] = [
    { role: "assistant", text: "Ciao, sono matteo.ai. Chiedimi del percorso, delle competenze o dei progetti di Matteo." }
  ];
  let loading = false;

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    messages = [...messages, { role: "user", text: userMsg }];
    input = "";
    loading = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      messages = [...messages, { role: "assistant", text: data.reply || "Errore nella risposta." }];
    } catch (e) {
      messages = [...messages, { role: "assistant", text: "Errore di connessione. Riprova più tardi." }];
    } finally {
      loading = false;
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === "Enter") send();
  }
</script>

<div class="chat-widget">
  {#if open}
    <div style="width: 360px; max-width: 90vw; background: var(--bg); border: 1px solid var(--fg); display: flex; flex-direction: column; max-height: 500px;">
      <div style="padding: 1rem; border-bottom: 1px solid var(--fg); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase;">matteo.ai</span>
        <button on:click={() => open = false} style="background: none; border: none; font-family: var(--font-mono); cursor: pointer; font-size: 1rem;">×</button>
      </div>
      <div style="flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
        {#each messages as msg}
          <div style="align-self: {msg.role === 'user' ? 'flex-end' : 'flex-start'}; max-width: 80%;">
            <div style="font-family: var(--font-mono); font-size: 0.65rem; text-transform: uppercase; color: var(--muted); margin-bottom: 0.25rem;">
              {msg.role === 'user' ? 'Tu' : 'AI'}
            </div>
            <div style="padding: 0.75rem; background: {msg.role === 'user' ? 'var(--fg)' : '#e8e8e0'}; color: {msg.role === 'user' ? 'var(--bg)' : 'var(--fg)'}; font-size: 0.875rem; line-height: 1.5;">
              {msg.text}
            </div>
          </div>
        {/each}
        {#if loading}
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--muted);">matteo.ai sta scrivendo...</div>
        {/if}
      </div>
      <div style="padding: 1rem; border-top: 1px solid var(--fg); display: flex; gap: 0.5rem;">
        <input
          bind:value={input}
          on:keypress={handleKey}
          placeholder="Es: Quali tecnologie conosce?"
          style="flex: 1; padding: 0.75rem; border: 1px solid var(--fg); background: transparent; font-family: var(--font-sans); font-size: 0.875rem; outline: none;"
        />
        <button on:click={send} class="btn" style="padding: 0.75rem 1rem;">→</button>
      </div>
    </div>
  {:else}
    <button on:click={() => open = true} class="btn btn-accent" style="border-radius: 0;">
      matteo.ai
    </button>
  {/if}
</div>

<style>
  .chat-widget {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 100;
  }
</style>
