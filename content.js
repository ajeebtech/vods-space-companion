function injectButton() {
    // 1. Extract Match ID from URL
    const match = window.location.pathname.match(/^\/(\d+)\//);
    if (!match) return;
    const matchId = match[1];

    // 2. Find the injection point (VODs section)
    const vodsContainer = document.querySelector('.match-vods');
    if (!vodsContainer) return;

    // Check if button already exists
    if (document.getElementById('vods-space-btn')) return;

    // 3. Create the button element
    const btn = document.createElement('a');
    btn.id = 'vods-space-btn';
    btn.href = `https://vods.space/${matchId}`;
    btn.target = '_blank';
    btn.className = 'vods-space-link wf-card mod-dark';

    btn.innerHTML = `
        <div class="vs-content">
            <img src="${chrome.runtime.getURL('globe-duotone.png')}" class="vs-logo" alt="vods.space">
            <span class="vs-text">Watch on Vods.space</span>
            <span class="vs-arrow">→</span>
        </div>
    `;

    // 4. Inject it! 
    // We'll append it to the container, or insert it after the label if preferred.
    // Let's insert it right after the header label for visibility.
    const label = vodsContainer.querySelector('.wf-label');
    if (label) {
        label.after(btn);
    } else {
        vodsContainer.prepend(btn);
    }
}

// Run on load and whenever the content might change (for SPAs if VLR does that)
injectButton();

// Optional: Observe the DOM for changes if VLR navigation is dynamic
const observer = new MutationObserver((mutations) => {
    injectButton();
});

observer.observe(document.body, { childList: true, subtree: true });
