const translateJson = () => {
    const json = JSON.parse(document.getElementById('json').value);
    const sourceLang = Array.from(document.getElementsByName('sourceLang')).find((e) => e.checked).value;
    const exportLangs = Array.from(document.getElementsByName('exportLangs')).filter((e) => e.checked).map((e) => e.value);
    const apiKey = document.getElementById('apiKey').value;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({
            json,
            sourceLang,
            exportLangs,
            apiKey
        })
    };

    fetch('https://translate-json.com/translate/api/v1', options)
        .then(async (response) => {
            if (response.status === 200) {
                const jsonFiles = [];
                const jsonResponse = await response.json();
                Object.keys(jsonResponse).forEach((key) => {
                    jsonFiles.push({
                        fileName: key + '.json',
                        data: jsonResponse[key]
                    });
                });
                for (let jsonFile of jsonFiles) {
                    const file = new Blob([JSON.stringify(jsonFile.data)], {type: 'text/plain'});
                    if (window.navigator.msSaveOrOpenBlob) // IE10+
                        window.navigator.msSaveOrOpenBlob(file, jsonFile.fileName);
                    else { // Others
                        const a = document.createElement("a"),
                            url = URL.createObjectURL(file);
                        a.href = url;
                        a.download = jsonFile.fileName;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(function () {
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                        }, 0);
                    }
                }
            }
        })
};
