document.getElementById('service').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'charges-by-service-panel' }, (content) => {
            if (!content) {
                alert('Cannot Get! Try Reload First!');
                return;
            }
            navigator.clipboard.writeText(content).then(() => {
                alert('テーブルデータをクリップボードにコピーしました。');
            }, () => {
                alert('クリップボードへのコピーに失敗しました。');
            });
        });
    });
});

document.getElementById('account').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'charges-by-account-panel' }, (content) => {
            if (!content) {
                alert('Cannot Get! Try Reload First!');
                return;
            }
            navigator.clipboard.writeText(content).then(() => {
                alert('テーブルデータをクリップボードにコピーしました。');
            }, () => {
                alert('クリップボードへのコピーに失敗しました。');
            });
        });
    });
});
