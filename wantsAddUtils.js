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

  const getUrl = (search_term) => {
    return `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(
      search_term
    )}`;
  };

  const listBox = document.createElement("div");
  listBox.id = "autocomplete-list";
  listBox.className = "list-group";
  // Hide the list at first
  listBox.style.display = "none";
  inputGroup.appendChild(listBox);

  function showSuggestions(val) {
    const term = val.trim().toLowerCase();
    listBox.innerHTML = "";

    if (!term) {
      listBox.style.display = "none";
      return;
    }

    fetch(getUrl(term))
      .then((res) => res.json())
      .then((json) => {
        const hits = json.data;
        if (!hits.length) {
          listBox.style.display = "none";
          return;
        }

        hits.forEach((text) => {
          const div = document.createElement("div");
          div.className =
            "autocomplete-item list-group-item list-group-item-action";
          div.textContent = text;
          div.addEventListener("click", () => {
            inputAltSearch.value = text;
            listBox.style.display = "none";
          });
          listBox.appendChild(div);
        });

        listBox.style.display = "block";
      });
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
})();
