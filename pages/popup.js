// Load saved preferences or set defaults
chrome.storage.local.get(['loginReminder', 'cardsOnList'], (result) => {
  const loginToggle = document.getElementById('loginToggle');
  const listToggle = document.getElementById('cardsOnListToggle');

  const loginEnabled = result.loginReminder !== undefined ? result.loginReminder : false;
  const listEnabled = result.cardsOnList !== undefined ? result.cardsOnList : false;

  loginToggle.checked = loginEnabled;
  listToggle.checked = listEnabled;

  updateLoginStatus(loginEnabled);
  updateListStatus(listEnabled);
});

// Keep popup UI updated when storage changes elsewhere (content scripts, background)
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if (changes.loginReminder !== undefined) {
    const newVal = !!changes.loginReminder.newValue;
    const loginToggle = document.getElementById('loginToggle');
    if (loginToggle) loginToggle.checked = newVal;
    updateLoginStatus(newVal);
  }
  if (changes.cardsOnList !== undefined) {
    const newVal = !!changes.cardsOnList.newValue;
    const listToggle = document.getElementById('cardsOnListToggle');
    if (listToggle) listToggle.checked = newVal;
    updateListStatus(newVal);
  }
});

// Login toggle
document.getElementById('loginToggle').addEventListener('change', (e) => {
  const isEnabled = e.target.checked;
  chrome.storage.local.set({ loginReminder: isEnabled }, () => {
    updateLoginStatus(isEnabled);
  });
});

// List view toggle (saves to the existing `cardsOnList` key used by page scripts)
document.getElementById('cardsOnListToggle').addEventListener('change', (e) => {
  const isEnabled = e.target.checked;
  chrome.storage.local.set({ cardsOnList: isEnabled }, () => {
    updateListStatus(isEnabled);
  });
});

function updateLoginStatus(isEnabled) {
  const status = document.getElementById('status');
  status.textContent = `Auto-login: ${isEnabled ? 'Enabled' : 'Disabled'}`;
}

function updateListStatus(isEnabled) {
  const status = document.getElementById('cardsOnListStatus');
  status.textContent = `List view: ${isEnabled ? 'Enabled' : 'Disabled'}`;
}