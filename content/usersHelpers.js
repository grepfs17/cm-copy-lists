(async () => {
  // BEGIN: View cards on list in user offers
  function listView(view = "cardsOnList", rows = []) {
    if (view === "cardsOnList") {
      rows.forEach((row) => {
        const imageCol = row.querySelector(".col-thumbnail");
        imageCol.style.width = "auto";

        const currentImage = imageCol
          .querySelector("span[data-bs-title]")
          .getAttribute("data-bs-title");
        // Create a template to parse the image HTML
        const template = document.createElement("template");
        template.innerHTML = currentImage.trim();
        const img = template.content.querySelector("img");
        img.setAttribute("loading", "lazy");
        img.classList = "img-thumbnail my-1";
        img.style = "max-width: unset;width:260px;border-radius:8px;";
        imageCol.innerHTML = img.outerHTML;
        template.remove();
      });
    }
  }

  const { cardsOnList } = await chrome.storage.local.get(["cardsOnList"]);
  if (cardsOnList && cardsOnList === true) {
    const rows = document.querySelectorAll("#UserOffersTable .article-row");
    listView("cardsOnList", rows);
  }

  // Keep the in-page checkbox synced when storage changes elsewhere
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (changes.cardsOnList !== undefined) {
      const newVal = !!changes.cardsOnList.newValue;
      if (newVal === true) {
        const rows = document.querySelectorAll("#UserOffersTable .article-row");
        listView("cardsOnList", rows);
      } else {
        window.location.reload();

      }
    }
  });
  // END: View cards on list in user offers


})();
