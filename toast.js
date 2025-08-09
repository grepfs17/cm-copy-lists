export function showToast(text = 'Copied to clipboard!', ms = 1500, mode = 'success') {
    // remove any previous toast
    document.querySelectorAll('.cm-toast').forEach(el => el.remove());
    let modeColor;

    switch (mode) {
        case 'success':
            modeColor = '#28a745';
            break;
        case 'error':
            modeColor = '#dc3545';
            break;
        case 'info':
            modeColor = '#17a2b8';
            break;
        default:
            modeColor = '#28a745';
    }

    const toast = document.createElement('div');
    toast.className = 'cm-toast';
    toast.textContent = text;
    Object.assign(toast.style, {
        position: 'fixed',
        left: '50%',
        bottom: '20px',
        transform: 'translateX(-50%)',
        padding: '8px 16px',
        background: modeColor,
        color: '#fff',
        borderRadius: '4px',
        fontSize: '14px',
        zIndex: 9999,
        opacity: '0',
        transition: 'opacity .25s'
    });
    document.body.appendChild(toast);

    // fade in
    requestAnimationFrame(() => (toast.style.opacity = '1'));

    // fade out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove());
    }, ms);
}