
(async () => {
    const { showToast } = await import(chrome.runtime.getURL('toast.js'));

    function copyRowInfo(row) {
        // Card name
        const nameTd = row.querySelector('td.name.min-size.text-start.p-2 a');
        if (!nameTd) return;
        const cardName = nameTd.textContent.trim();

        // Amount
        const amountTd = row.querySelector('td.amount');
        if (!amountTd) return;
        const cardAmount = amountTd.textContent.trim();

        // Expansion
        const expansionTd = row.querySelector('td.expansion');
        let expansion = '';
        if (expansionTd) {
            const tooltipSpan = expansionTd.querySelector('[data-bs-toggle="tooltip"]');
            if (tooltipSpan) {
                expansion =
                    tooltipSpan.getAttribute('aria-label') ||
                    tooltipSpan.getAttribute('data-bs-original-title') ||
                    '';
            } else {
                expansion = expansionTd.textContent.trim() || '';
            }
        }
        return `${cardAmount} ${cardName} (${expansion})`;
    }


    const rows = document.querySelectorAll('table.tablesorter tbody tr');

    console.log('[Cardmarket Copy List] Found', rows.length, 'rows.');
    const addToListBtn = document.querySelector('a[href*="AddDeckList"]');
    const copyAllBtn = document.createElement('button');
    copyAllBtn.type = 'button';
    copyAllBtn.innerHTML = '<span class="fonticon-copy"></span> Copy All';
    copyAllBtn.classList = 'icon-copy btn btn-outline-info ms-3';
    copyAllBtn.title = 'Copy all cards in the current view to clipboard';
    addToListBtn.parentNode.insertBefore(copyAllBtn, addToListBtn.nextSibling);
    copyAllBtn.addEventListener('click', () => {
        const lines = [];
        rows.forEach(row => {
            lines.push(copyRowInfo(row));
        });
        if (lines.length > 0) {
            const cardsInfo = lines.join('\n');
            navigator.clipboard.writeText(cardsInfo).then(() => {
                console.log('[Cardmarket Copy List] Copied:', cardsInfo);
                showToast('Copied ' + lines.length + ' lines to clipboard!');
            }).catch(err => {
                console.error('[Cardmarket Copy List] Could not copy:', err);
            });
        } else {
            console.warn('[Cardmarket Copy List] No card info found for this row.');
        }

    });


    rows.forEach(row => {
        //search for trash icon and add a copy icon after
        const trashIcon = row.querySelector('button[id^="deleteWant"]');
        if (trashIcon) {
            const copyIcon = document.createElement('button');
            copyIcon.type = 'button';
            copyIcon.innerHTML = '<span class="fonticon-copy"></span>';
            copyIcon.classList = 'icon-copy btn btn-sm btn-outline-info ms-sm-2';
            copyIcon.title = 'Copy card info to clipboard';
            trashIcon.parentNode.insertBefore(copyIcon, trashIcon.nextSibling);
            copyIcon.addEventListener('click', () => {
                const cardInfo = copyRowInfo(row);
                if (cardInfo) {
                    navigator.clipboard.writeText(cardInfo).then(() => {
                        console.log('[Cardmarket Copy] Copied:', cardInfo);
                        showToast('Copied card info to clipboard!');
                    }).catch(err => {
                        console.error('[Cardmarket Copy] Could not copy:', err);
                    });
                } else {
                    console.warn('[Cardmarket Copy List] No card info found for this row.');
                }
            });
        }
    });
})();