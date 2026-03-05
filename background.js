chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update') {
    const url = chrome.runtime.getURL('whats-new.html');
    chrome.tabs.create({ url });
  }
});
