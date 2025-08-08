(async () => {
    const { scryfallToCardmarket, cardmarketToScryfall } = await import(chrome.runtime.getURL('parser.js'));
    const { showToast } = await import(chrome.runtime.getURL('toast.js'));
    const extensionName = 'Cardmarket Wants Lists Helper';

    const h1Div = document.querySelector('h1.H1_PageTitle + div');
    const pasteBtn = document.createElement('button');
    pasteBtn.type = 'button';
    pasteBtn.innerHTML = '<span class="fonticon-paste"></span> Paste and parse list from Scryfall / Archidekt';
    pasteBtn.classList = 'icon-copy btn btn-sm btn-outline-info ms-sm-2 mb-3';
    pasteBtn.title = 'Paste and parse list from Scryfall / Archidekt format : 2x Lightning Bolt (M21)';
    pasteBtn.style = "transform: translateX(-50%); margin-left: 50% !important;";
    pasteBtn.addEventListener('click', () => {
        navigator.clipboard.readText().then((text) => {
            if (text) {
                const lines = text.split(/\r?\n/);
                let outputParsed = '';
                let linesWithErrors = [];
                let notParsedSets = [];
                lines.forEach(line => {
                    const matches = line.trim().match(/^(?<qty>\d+)x?\s+(?<name>.+?)\s*\((?<set>\w+)\)\s*$/i);
                    if (matches && matches.groups) {
                        const { qty, name, set } = matches.groups;
                        const cmSet = scryfallToCardmarket[set];
                        if (!cmSet) {
                            notParsedSets.push(set);
                        }
                        outputParsed += `${qty} ${name} (${cmSet})` + '\n';
                    } else {
                        // If no match is found, keep the original line
                        outputParsed += line + '\n';
                        linesWithErrors.push(line);
                    }



                });
                //let hasNoMatches = linesWithErrors.length > 0;
                if (outputParsed) {
                    document.querySelector('textarea[name="addDecklist"]').value = outputParsed;
                    //const hasNoMatchesText = hasNoMatches ? `⚠️ ${linesWithErrors.length} have been added without matching.` : '';
                    const hasNotParsedSetsText = notParsedSets.length > 0 ? `⚠️ ${notParsedSets.length + linesWithErrors.length} have been added without parsing.` : '';
                    showToast(`Parsed ${lines.length} lines from Scryfall! ${hasNotParsedSetsText}`, ms = 5000, mode = 'info');
                }
            } else {
                showToast(`No text found in clipboard`, ms = 3000, mode = 'error');
            }
        });

    });
    h1Div.insertAdjacentElement('afterbegin', pasteBtn);
    const disclaimerText = document.createElement('p');
    disclaimerText.className = 'text-muted small text-center';
    disclaimerText.innerHTML = `
    * This action is added by ${extensionName} and will try to parse the format <i><strong>[cardname (set)]</strong></i> list and convert it to Cardmarket format. 
    If a set is not found, it will be added as is. 
    The funcionality is experimental and may not work for all lists.
    This is not an official Cardmarket feature and is provided as a convenience.
    `;
    h1Div.insertAdjacentElement('afterbegin', disclaimerText);

})();