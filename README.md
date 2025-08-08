# Cardmarket Wants Lists Helper

> A lightweight Chrome extension that turns Cardmarket’s “Wants” pages into a quick copy‑and‑paste tool for the Cardmarket format, with experimental Scryfall/Archidekt parsing support.

---

## 📦 Features

| Feature | Description |
|---------|-------------|
| **Copy All** | Adds a button next to the “Add to list” button that copies the entire list in Cardmarket format (`qty cardname (set)`). |
| **Row‑by‑row copy** | Adds a button to each row that copies that single card’s entry. |
| **Paste & parse from Scryfall/Archidekt** | On the “Add Decklist” page, a new button reads the clipboard, parses a `[cardname (set)]` list, converts set codes to Cardmarket set names, and pastes the result into the decklist textarea. |
| **Toast notifications** | Success, error, and info toasts appear at the bottom of the page to confirm actions. |

> ⚠️ The Scryfall/Archidekt parsing feature is experimental and may not work for all list formats.

---

## 🚀 Installation

1. **Download** the repository or clone it locally.  
2. Open Chrome → `chrome://extensions/` → **Load unpacked** → select the `cm-copy-lists` folder.  
3. The extension will automatically inject the copy buttons on any Cardmarket “Wants” page and the paste‑parse button on the “Add Decklist” page.

> **Tip**: If you want to use the extension on a private browsing window, enable “Allow in incognito” in the extension’s details page.

---

## 📸 Screenshot

![Cardmarket Wants Lists Helper](https://i.imgur.com/your-screenshot.png)

---

## 📚 How to Use

| Page | What to do | What happens |
|------|------------|--------------|
| **Wants list page** | Click **Copy All** to copy the whole list. | The list is copied to your clipboard and a toast confirms the action. |
| | Click the **copy** icon next to a row to copy that single card. | The card is copied and a toast confirms the action. |
| **Add Decklist page** | Click **Paste and parse list from Scryfall/Archidekt**. | The extension reads the clipboard, parses lines of the form `qty cardname (set)`, converts set codes to Cardmarket set names, and pastes the result into the textarea. A toast reports how many lines were parsed and if any sets were not found. |

---

## 🛠️ Development

- **Manifest**: `manifest.json` (v1.1.0) declares the content scripts `wantsCopyUtils.js` and `wantsAddUtils.js`.  
- **Parser**: `parser.js` contains a comprehensive `cardmarketToScryfall` mapping that now includes sets up to 2025‑08‑01.  
- **UI**: `toast.js` provides a lightweight toast system used by both copy and paste actions.  

Feel free to fork, tweak, or extend the mapping for new sets or formats.

---

## 📄 License

This project is released under the  GPL-2.0 License. It is **not** an official Cardmarket feature and is provided as a convenience only.
