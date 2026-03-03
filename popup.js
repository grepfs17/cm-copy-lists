// Load saved preference or set default to disabled
chrome.storage.local.get(['loginReminder'], (result) => {
  const toggle = document.getElementById('loginToggle');
  const status = document.getElementById('status');
  
  const isEnabled = result.loginReminder !== undefined ? result.loginReminder : false;
  toggle.checked = isEnabled;
  updateStatus(isEnabled);
});

// Toggle switch event listener
document.getElementById('loginToggle').addEventListener('change', (e) => {
  const isEnabled = e.target.checked;
  chrome.storage.local.set({ loginReminder: isEnabled }, () => {
    updateStatus(isEnabled);
  });
});

function updateStatus(isEnabled) {
  const status = document.getElementById('status');
  status.textContent = `Status: ${isEnabled ? 'Enabled' : 'Disabled'}`;
}