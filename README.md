# Cardmarket Wants Lists Helper

A extension to help with managing Magic: The Gathering wants lists on Cardmarket.

---

## 📦 Features

| Feature | Description |
|---------|-------------|
| **Copy All** | Adds a button next to the “Add to list” button that copies the entire list in Cardmarket format (`qty cardname (set)`). |
| **Row‑by‑row copy** | Adds a button to each row that copies that single card’s entry. |
| **Paste & parse from Scryfall/Archidekt** | On the “Add Decklist” page, a new button reads the clipboard, parses a `[cardname (set)]` list, converts set codes to Cardmarket set names, and pastes the result into the decklist textarea. |

> ⚠️ The Scryfall/Archidekt parsing feature is experimental and may not work for all list formats.

---

## 🚀 Installation

1. **Download** the repository or clone it locally.  
2. Open Chrome → `chrome://extensions/` → **Load unpacked** → select the `cm-copy-lists` folder.  
3. The extension will automatically inject the copy buttons on any Cardmarket “Wants” page and the paste‑parse button on the “Add Decklist” page.

---

## 📸 Example
https://github.com/user-attachments/assets/a6fbbc87-21fe-48d4-8332-1cc0d5e868cb

---

## 📚 How to Use

| Page | What to do | What happens |
|------|------------|--------------|
| **Wants list page** | Click **Copy All** to copy the whole list. | The list is copied to your clipboard. |
| | Click the **copy** icon next to a row to copy that single card. | The card is copied to your clipboard. |
| **Add Decklist page** | Click **Paste and parse list from Scryfall/Archidekt**. | The extension reads the clipboard, parses lines of the form `qty cardname (set)`, converts set codes to Cardmarket set names, and pastes the result into the textarea. |

---

Feel free to fork, tweak, or extend the mapping for new sets or formats.

---

## 📄 License

This project is released under the  GPL-2.0 License. It is **not** an official Cardmarket feature and is provided as a convenience only.
