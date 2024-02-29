chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var panelId = request.message;

    var container = document.querySelector(`[id*="${panelId}"]`);
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
            data += rowData.join(',') + '\n';
        });
        allData += data;
    });
    allData = allData ? allData : 'テーブルが見つかりません';

    sendResponse(allData);
});
