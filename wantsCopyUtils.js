(async () => {
  const { showToast } = await import(chrome.runtime.getURL("utils/toast.js"));
  const { scryfallToCardmarket, cardmarketToScryfall } = await import(
    chrome.runtime.getURL("utils/parser.js")
  );

  function copyRowInfo(row, setToScryfallFormat = false) {
    // Card name
    const nameTd = row.querySelector("td.name.min-size.text-start.p-2 a");
    if (!nameTd) return;
    const cardName = nameTd.textContent.trim();

    // Amount
    const amountTd = row.querySelector("td.amount");
    if (!amountTd) return;
    const cardAmount = amountTd.textContent.trim();

    // Expansion
    const expansionTd = row.querySelector("td.expansion");
    let expansion = "";
    if (expansionTd) {
      const tooltipSpan = expansionTd.querySelector(
        '[data-bs-toggle="tooltip"]'
      );
      if (tooltipSpan) {
        expansion =
          tooltipSpan.getAttribute("aria-label") ||
          tooltipSpan.getAttribute("data-bs-original-title") ||
          "";
        expansion = expansion.trim();
        expansion = setToScryfallFormat
          ? cardmarketToScryfall[expansion]
          : expansion;
      } else {
        expansion = expansionTd.textContent.trim() || "";
      }
    }
    expansion = expansion != "Any" ? ` (${expansion})` : "";
    return `${cardAmount} ${cardName}${expansion}`;
  }
  function copyCards(setToScryfallFormat = false) {
    const lines = [];
    rows.forEach((row) => {
      lines.push(copyRowInfo(row, setToScryfallFormat));
    });
    if (lines.length > 0) {
      const cardsInfo = lines.join("\n");
      navigator.clipboard
        .writeText(cardsInfo)
        .then(() => {
          console.log("[Cardmarket Copy List] Copied:", cardsInfo);
          showToast("Copied " + lines.length + " lines to clipboard!");
        })
        .catch((err) => {
          console.error("[Cardmarket Copy List] Could not copy:", err);
        });
    } else {
      console.warn("[Cardmarket Copy List] No card info found for this row.");
    }
  }

  function listView(view = "cardsOnList", rows = []) {
    if (view === "cardsOnList") {
      rows.forEach((row) => {
        const imageTd = row.querySelector("td.preview");
        const currentImage = imageTd
          .querySelector("span[data-bs-title]")
          .getAttribute("data-bs-title");
        // Create a template to parse the image HTML
        const template = document.createElement("template");
        template.innerHTML = currentImage.trim();
        const img = template.content.querySelector("img");
        // set attributes for better performance
        img.setAttribute("loading", "lazy");
        img.classList = "img-thumbnail my-1";
        img.style = "max-width: unset";
        imageTd.innerHTML = img.outerHTML;
        template.remove();
      });
    }
  }

  const rows = document.querySelectorAll("table.tablesorter tbody tr");

  if (rows) {
    // If we have a table we add the checkbox to change the view display
    const h2 = document.querySelector("h2");
    h2.insertAdjacentHTML(
      "beforeend",
      `
            <label id='cardsOnListLabel' class='ms-2 btn btn-outline-secondary'>
              <input type='checkbox' name='cardsOnList' id='cardsOnList'/>
              View Cards in list 
            </label>
            `
    );
    document
      .querySelector("input#cardsOnList")
      .addEventListener("change", (e) => {
        const input = e.target;
        if (input.checked) {
          chrome.storage.local.set({ cardsOnList: true });
          input.parentNode.classList.remove("btn-outline-secondary");
          input.parentNode.classList.add("btn-secondary");
          listView("cardsOnList", rows);
        } else {
          chrome.storage.local.remove(["cardsOnList"]);
          window.location.reload();
        }
      });
  }
  const { cardsOnList } = await chrome.storage.local.get(["cardsOnList"]);
  if (cardsOnList && cardsOnList === true) {
    const inputTrigger = document.querySelector("input#cardsOnList");
    inputTrigger.checked = true;
    inputTrigger.dispatchEvent(new Event("change"));
  }

  console.log("[Cardmarket Copy List] Found", rows.length, "rows.");
  const copyAllGroup = document.createElement("div");
  copyAllGroup.classList = "btn-group";
  const copyAllDropdown = document.createElement("button");
  Object.assign(copyAllDropdown, {
    id: "copyAllDropdown",
    type: "button",
    ariaExpanded: "false",
  });
  copyAllDropdown.classList = "btn btn-outline-info dropdown-toggle";
  copyAllDropdown.dataset.bsToggle = "dropdown";

  const copyAllBtn = document.createElement("button");
  copyAllBtn.type = "button";
  copyAllBtn.innerHTML = '<span class="fonticon-copy"></span> Copy All';
  copyAllBtn.classList = "icon-copy btn btn-outline-info ms-3";
  copyAllBtn.title = "Copy all cards in the current view to clipboard";

  copyAllBtn.addEventListener("click", () => {
    copyCards();
  });
  copyAllGroup.append(copyAllBtn);
  copyAllGroup.append(copyAllDropdown);
  const menu = document.createElement("ul");
  menu.className = "dropdown-menu p-0";
  menu.setAttribute("aria-labelledby", "copyAllDropdown");
  const item = document.createElement("li");
  item.innerHTML =
    '<a id="copyAllFormated" class="dropdown-item" href="#"><span class="fonticon-copy"></span> Copy for Archidekt / Moxfield</a>';
  menu.appendChild(item);
  copyAllGroup.append(copyAllBtn, copyAllDropdown, menu);
  const addToListBtn = document.querySelector('a[href*="AddDeckList"]');
  addToListBtn.parentNode.insertBefore(copyAllGroup, addToListBtn.nextSibling);

  document.querySelector("#copyAllFormated").addEventListener("click", (e) => {
    e.preventDefault();
    copyCards((setToScryfallFormat = true));
  });

  rows.forEach((row) => {
    //search for trash icon and add a copy icon after
    const trashIcon = row.querySelector('button[id^="deleteWant"]');
    if (trashIcon) {
      const copyIcon = document.createElement("button");
      copyIcon.type = "button";
      copyIcon.innerHTML = '<span class="fonticon-copy"></span>';
      copyIcon.classList = "icon-copy btn btn-sm btn-outline-info ms-sm-2";
      copyIcon.title = "Copy card info to clipboard";
      trashIcon.parentNode.insertBefore(copyIcon, trashIcon.nextSibling);
      copyIcon.addEventListener("click", () => {
        const cardInfo = copyRowInfo(row);
        if (cardInfo) {
          navigator.clipboard
            .writeText(cardInfo)
            .then(() => {
              console.log("[Cardmarket Copy] Copied:", cardInfo);
              showToast("Copied card info to clipboard!");
            })
            .catch((err) => {
              console.error("[Cardmarket Copy] Could not copy:", err);
            });
        } else {
          console.warn(
            "[Cardmarket Copy List] No card info found for this row."
          );
        }
      });
    }
  });
})();
