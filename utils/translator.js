const request = require('request-promise');

class Translator {

    constructor(sourceLang, exportsLang) {
        this.sourceLang = sourceLang;
        this.exportsLang = exportsLang;
    }

    async translateJson(json) {
        try {
            let result = {};
            for (let lang of this.exportsLang) {
                result[lang] = {};
                await this.iterateJson(json, result[lang], lang);
            }
            return result;
        } catch (e) {
            throw e;
        }
    }

    async iterateJson(json, result, lang) {
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                if (typeof json[key] === typeof {}) {
                    result[key] = {};
                    await this.iterateJson(json[key], result[key], lang);
                } else {
                    result[key] = await this.translateText(json[key], lang);
                }
            } else {
                throw "Error in JSON format";
            }
        }
        return true;
    }

    async translateText(text, lang) {
        const options = {
            uri: 'https://translation.googleapis.com/language/translate/v2',
            method: 'GET',
            qs: {
                'source': this.sourceLang,
                'target': lang,
                'q': text,
                'key': 'AIzaSyC8hvcPfF8iMfhrpc-WennzssrvHHjSkIk'
            },
            json: true
        };
        try {
            const response = await request.post(options);
            if (response) {
                return response.data.translations[0].translatedText;
            }
        }
        catch(e) {
            throw e;
        }
    }
}

module.exports = Translator;