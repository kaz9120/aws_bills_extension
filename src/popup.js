document.getElementById('service').addEventListener('click', () => {
    // 現在のアクティブなタブの情報を取得
    chrome.tabs.executeScript({
        code: `
            var container = document.querySelector('[id*="charges-by-service-panel"]');
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
                        rowData.push('"' + cell.innerText + '"');
                    });
                    data += rowData.join(',') + '\\n';
                });
                allData += data;
            });
            allData ? allData : 'テーブルが見つかりません';
        `
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
