(async () => {
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
  const sortSelect = document.querySelector("#sortBy");
  const sortSelectParent = sortSelect.parentElement;
  const checkboxView = document.createElement("input");
  checkboxView.type = "checkbox";
  checkboxView.name = "cardsOnList";
  checkboxView.id = "cardsOnList";

  const labelView = document.createElement("label");
  labelView.htmlFor = "cardsOnList";
  labelView.classList = "";
  labelView.innerText = " View Cards in list ";
  labelView.prepend(checkboxView);
  const labelViewContainer = document.createElement("div");
  labelViewContainer.classList = "col col-lg-3 ms-3";
  labelViewContainer.innerHTML = labelView.outerHTML;
  sortSelectParent.after(labelViewContainer);

  document.querySelector("#cardsOnList").addEventListener("change", (e) => {
    const rows = document.querySelectorAll("#UserOffersTable .article-row");
    if (e.target.checked) {
      listView("cardsOnList", rows);
      localStorage.setItem("usersCardsOnList", "true");
    } else {
      // reload the page to reset the view
      localStorage.removeItem("usersCardsOnList");
      location.reload();
    }
  });
  const usersCardsOnList = localStorage.getItem("usersCardsOnList");
  if (usersCardsOnList && usersCardsOnList === "true") {
    document.querySelector("#cardsOnList").checked = true;
    const rows = document.querySelectorAll("#UserOffersTable .article-row");
    listView("cardsOnList", rows);
  }
})();
