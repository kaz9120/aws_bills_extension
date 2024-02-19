document.getElementById('service').addEventListener('click', () => {
    // 現在のアクティブなタブの情報を取得
    chrome.tabs.executeScript({
        code: generateCode('charges-by-service-panel')
    }, function(results) {
        // テーブルデータをクリップボードにコピー
        var tableData = results[0];
        navigator.clipboard.writeText(tableData).then(() => {
            alert('テーブルデータをクリップボードにコピーしました。');
        }, () => {
            alert('クリップボードへのコピーに失敗しました。');
        });
    });
});

// アカウントの会計 account's account
document.getElementById('account').addEventListener('click', () => {
    // 現在のアクティブなタブの情報を取得
    chrome.tabs.executeScript({
        code: generateCode('charges-by-account-panel')
    }, function(results) {
        // テーブルデータをクリップボードにコピー
        var tableData = results[0];
        navigator.clipboard.writeText(tableData).then(() => {
            alert('テーブルデータをクリップボードにコピーしました。');
        }, () => {
            alert('クリップボードへのコピーに失敗しました。');
        });
    });
});

const generateCode = (panelId) => `
    var container = document.querySelector('[id*="${panelId}"]');
    var tables = container.querySelectorAll('table');
    var allData = '';
    tables.forEach((table) => {
        var data = '';
        // theadとtbodyの中のtr要素をすべて取得
        var rows = table.querySelectorAll('thead tr, tbody tr');
        rows.forEach((row) => {
            var cells = row.querySelectorAll('td, th');
            var rowData = [];
            cells.forEach((cell) => {
                var text = cell.innerText;
                if (text.startsWith('USD ')) {
                    text = text.substring(4);
                }
                rowData.push('"' + text + '"');
            });
            data += rowData.join(',') + '\\n';
        });
        allData += data;
    });
    allData ? allData : 'テーブルが見つかりません';
`;