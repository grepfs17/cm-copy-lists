(async () => {
  const { scryfallToCardmarket, cardmarketToScryfall } = await import(
    chrome.runtime.getURL("parser.js")
  );
  const { showToast } = await import(chrome.runtime.getURL("toast.js"));
  const extensionName = "Cardmarket Wants Lists Helper";

  const h1Div = document.querySelector("h1.H1_PageTitle + div");

  // BEGIN : Paste from Archidekt functionality
  const pasteBtn = document.createElement("button");
  pasteBtn.type = "button";
  pasteBtn.innerHTML =
    '<span class="fonticon-paste"></span> Paste and parse list from Scryfall / Archidekt';
  pasteBtn.classList = "icon-copy btn btn-sm btn-outline-info ms-sm-2 mb-3";
  pasteBtn.title =
    "Paste and parse list from Scryfall / Archidekt format : 2x Lightning Bolt (M21)";
  pasteBtn.style = "transform: translateX(-50%); margin-left: 50% !important;";
  pasteBtn.addEventListener("click", () => {
    navigator.clipboard.readText().then((text) => {
      if (text) {
        const lines = text.split(/\r?\n/);
        let outputParsed = "";
        let linesWithErrors = [];
        let notParsedSets = [];
        lines.forEach((line) => {
          const matches = line
            .trim()
            .match(/^(?<qty>\d+)x?\s+(?<name>.+?)\s*\((?<set>\w+)\)\s*$/i);
          if (matches && matches.groups) {
            const { qty, name, set } = matches.groups;
            const cmSet = scryfallToCardmarket[set];
            if (!cmSet) {
              notParsedSets.push(set);
            }
            outputParsed += `${qty} ${name} (${cmSet})` + "\n";
          } else {
            // If no match is found, keep the original line
            outputParsed += line + "\n";
            linesWithErrors.push(line);
          }
        });
        //let hasNoMatches = linesWithErrors.length > 0;
        if (outputParsed) {
          document.querySelector('textarea[name="addDecklist"]').value =
            outputParsed;
          //const hasNoMatchesText = hasNoMatches ? `⚠️ ${linesWithErrors.length} have been added without matching.` : '';
          const hasNotParsedSetsText =
            notParsedSets.length > 0
              ? `⚠️ ${
                  notParsedSets.length + linesWithErrors.length
                } have been added without parsing.`
              : "";
          showToast(
            `Parsed ${lines.length} lines from Scryfall! ${hasNotParsedSetsText}`,
            (ms = 5000),
            (mode = "info")
          );
        }
      } else {
        showToast(`No text found in clipboard`, (ms = 3000), (mode = "error"));
      }
    });
  });
  h1Div.insertAdjacentElement("afterbegin", pasteBtn);
  const disclaimerText = document.createElement("p");
  disclaimerText.className = "text-muted small text-center";
  disclaimerText.innerHTML = `
    * This action is added by ${extensionName} and will try to parse the format <i><strong>[cardname (set)]</strong></i> list and convert it to Cardmarket format. 
    If a set is not found, it will be added as is. 
    The funcionality is experimental and may not work for all lists.
    This is not an official Cardmarket feature and is provided as a convenience.
    `;
  h1Div.insertAdjacentElement("afterbegin", disclaimerText);
  // END : Paste from Archidekt functionality

  // BEGIN : New Search utility

  const inputAltSearchNum = document.createElement("input");
  inputAltSearchNum.id = "altSearchNum";
  inputAltSearchNum.name = "altSearchNum";
  inputAltSearchNum.className = "form-control";
  inputAltSearchNum.style = "flex:0 0 5%";
  inputAltSearchNum.value = 1;
  inputAltSearchNum.type = "number";
  inputAltSearchNum.placeholder = "Num.";

  const inputAltSearch = document.createElement("input");
  inputAltSearch.id = "altSearch";
  inputAltSearch.name = "altSearch";
  inputAltSearch.className = "form-control";
  inputAltSearch.style = "flex:0 0 85%";
  inputAltSearch.placeholder = "Start typing…";

  const inputAltSearchAdd = document.createElement("button");
  inputAltSearchAdd.id = "altSearchAdd";
  inputAltSearchAdd.className = "btn btn-light";
  inputAltSearchAdd.style =
    "flex:0 0 10%; border-top-right-radius:var(--bs-border-radius); border-bottom-right-radius:var(--bs-border-radius);";
  inputAltSearchAdd.innerHTML = `<span class='fonticon-plus'></span> Add Card`;

  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group mb-3 position-relative";
  inputGroup.appendChild(inputAltSearchNum);
  inputGroup.appendChild(inputAltSearch);
  inputGroup.appendChild(inputAltSearchAdd);

  h1Div.insertAdjacentElement("afterend", inputGroup);

  const debounce = (mainFunction, delay = 500) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };

  const listBox = document.createElement("div");
  listBox.id = "autocomplete-list";
  listBox.className = "list-group";
  // Hide the list at first
  listBox.style.display = "none";
  inputGroup.appendChild(listBox);

  async function showSuggestions(val) {
    const term = val.trim().toLowerCase();
    listBox.innerHTML = "";
    if (!term) {
      listBox.style.display = "none";
      return;
    }

    try {
      // 1. Autocomplete endpoint (names only)
      const autoRes = await fetch(
        `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(
          term
        )}`
      );
      const autoJson = await autoRes.json();
      const names = autoJson.data;
      if (!names?.length) {
        listBox.style.display = "none";
        return;
      }

      // 2. Fetch the first 8 cards' full objects in parallel
      const cardPromises = names.slice(0, 4).map(async (name) => {
        const cardRes = await fetch(
          `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(
            name
          )}`
        );
        return cardRes.ok ? cardRes.json() : null;
      });
      const cards = (await Promise.all(cardPromises)).filter(Boolean);

      if (!cards.length) {
        listBox.style.display = "none";
        return;
      }

      // 3. Build the miniature “cards”
      cards.forEach((card) => {
        //console.log(card);
        const imgUrl =
          card.image_uris?.normal || // normal cards
          card.card_faces?.[0]?.image_uris?.normal; // mdfcs / battles / etc.
        if (!imgUrl) return; // skip if Scryfall has no image

        const item = document.createElement("div");
        item.className =
          "autocomplete-item list-group-item list-group-item-action d-flex align-items-center";
        item.style.cursor = "pointer";
        item.style.padding = "4px 8px";

        const img = document.createElement("img");
        img.src = imgUrl;
        img.loading = "lazy";
        img.alt = card.name;
        img.style.height = "250px";
        img.style.marginRight = "8px";
        img.style.borderRadius = "6px";

        const label = document.createElement("span");
        const priceText =
          card.prices && card.prices.eur
            ? ` (<small class='fst-italic'>~${card.prices.eur} €</small>)`
            : "";
        const isGameChangerText = card.game_changer
          ? " <small><i>🔷 Game changer</i></small>"
          : "";
        label.innerHTML = `${card.name}${priceText}${isGameChangerText}`;
        label.style.fontSize = "14px";

        item.append(img, label);

        item.addEventListener("click", () => {
          inputAltSearch.value = card.name;
          listBox.style.display = "none";
        });

        listBox.appendChild(item);
      });

      listBox.style.display = "block";
    } catch (e) {
      console.error(e);
      listBox.style.display = "none";
    }
  }

  inputAltSearch.addEventListener(
    "input",
    debounce((e) => showSuggestions(e.target.value), 700)
  );

  // Hide on outside click
  document.addEventListener("click", (e) => {
    if (!inputGroup.contains(e.target)) listBox.style.display = "none";
  });

  inputAltSearchAdd.addEventListener("click", () => {
    const numCards = inputAltSearchNum.value;
    const cardName = inputAltSearch.value.trim();
    if (!cardName) return;
    document.querySelector(
      'textarea[name="addDecklist"]'
    ).value += `${numCards} ${cardName}\n`;
    inputAltSearchNum.value = 1;
    inputAltSearch.value = "";
  });

  // END : Paste from Archidekt functionality

  // BEGIN : Hover functionality on Textarea
  const formWrapper = document.querySelector("div.form-wrapper");
  formWrapper.style.position = "relative";

  const hoverPlaceholder = document.createElement("div");
  hoverPlaceholder.id = "hoverPlaceholder";
  Object.assign(hoverPlaceholder.style, {
    position: "absolute",
    top: 0,
    left: "-225px",
    width: "215px",
    height: "auto",
  });

  formWrapper.insertAdjacentElement("afterbegin", hoverPlaceholder);
  const ta = document.getElementById("AddDecklist");
  ta.style.lineHeight = "30px";
  const lineHeight = parseFloat(getComputedStyle(ta).lineHeight);

  let lastCardName = null; // Last card we asked for
  let currentController = null; // AbortController for the last fetch

  const debouncedFetchImage = debounce(async (cardName) => {
    if (!cardName || cardName === lastCardName) return; // Nothing new

    lastCardName = cardName;

    // Cancel any in-flight request
    if (currentController) currentController.abort();
    currentController = new AbortController();

    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(
          cardName
        )}`,
        { signal: currentController.signal }
      );
      if (!res.ok) throw new Error("not found");
      const card = await res.json();

      const imgUrl =
        card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;
      if (!imgUrl) return;

      hoverPlaceholder.innerHTML = `<img src="${imgUrl}" class="w-100 img-thumbnail"/>`;
    } catch (e) {
      if (e.name !== "AbortError") console.error(e);
    } finally {
      currentController = null;
    }
  }, 250);

  ta.addEventListener("mousemove", (e) => {
    const rect = ta.getBoundingClientRect();
    const y = e.clientY - rect.top + ta.scrollTop;
    const lineIndex = Math.floor(y / lineHeight);

    const lines = ta.value.split("\n");
    if (lineIndex < 0 || lineIndex >= lines.length) return;

    const cardName = lines[lineIndex].replace(/\([^)]*\)/g, "").trim();
    debouncedFetchImage(cardName);
  });

  // END : Hover functionality on Textarea
})();
