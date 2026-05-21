chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update') {
    const url = chrome.runtime.getURL('pages/whats-new.html');
    chrome.tabs.create({ url });
  }
});
