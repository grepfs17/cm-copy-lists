(async () => {
  const { encryptData, decryptData } = await import(
    chrome.runtime.getURL("utils/encrypt.js")
  );
  const loginReminder = await chrome.storage.local.get("loginReminder");
  if (!loginReminder) {
    return null;
  }

  async function saveCredentialsSecure(username, password) {
    const encryptedUsername = await encryptData(username);
    const encryptedPassword = await encryptData(password);

    await chrome.storage.local.set({
      encryptedUsername: JSON.stringify(encryptedUsername),
      encryptedPassword: JSON.stringify(encryptedPassword),
      encryptedUpdated: Date.now(),
    });
  }

  async function getCredentialsSecure() {
    try {
      const result = await chrome.storage.local.get([
        "encryptedUsername",
        "encryptedPassword",
      ]);
      if (result.encryptedUsername && result.encryptedPassword) {
        const encryptedUsername = JSON.parse(result.encryptedUsername);
        const encryptedPassword = JSON.parse(result.encryptedPassword);

        const decryptedUsername = await decryptData(encryptedUsername);
        const decryptedPassword = await decryptData(encryptedPassword);

        return {
          username: decryptedUsername,
          password: decryptedPassword,
        };
      }
      return null;
    } catch (error) {
      console.error("Error retrieving credentials:", error);
      return null;
    }
  }

  const loginForm = document.querySelector("#login-signup form");
  if (!loginForm) return;
  const credentials = await getCredentialsSecure();

  const usernameInput = loginForm.querySelector('input[name="username"]');
  const passwordInput = loginForm.querySelector('input[name="userPassword"]');
  if (credentials) {
    usernameInput.value = credentials.username;
    passwordInput.value = credentials.password;
    loginForm.submit();
  }
  usernameInput.addEventListener("change", async () => {
    await saveCredentialsSecure(usernameInput.value, passwordInput.value);
  });
  passwordInput.addEventListener("change", async () => {
    await saveCredentialsSecure(usernameInput.value, passwordInput.value);
  });

})();
