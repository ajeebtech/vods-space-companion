chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;

    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
            // This runs inside the page, matching content.js logic exactly
            const match = window.location.pathname.match(/^\/(\d+)\//) ||
                window.location.pathname.match(/^\/(\d+)$/);
            return match ? match[1] : null;
        }
    }, (results) => {
        const btn = document.getElementById('redirect-btn');
        const noMatch = document.getElementById('no-match');

        if (results && results[0] && results[0].result) {
            const matchId = results[0].result;
            btn.href = `https://vods.space/${matchId}`;
            btn.style.display = 'block';
            noMatch.style.display = 'none';
        } else {
            btn.style.display = 'none';
            noMatch.style.display = 'block';
        }
    });
});
