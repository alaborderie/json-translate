class Translator {

    constructor(sourceLang, exportsLang) {
        this.sourceLang = sourceLang;
        this.exportsLang = exportsLang;
    }

    async translateJson(json) {
            try {
                let result = {};
                this.exportsLang.forEach(async (lang) => {
                    result[lang] = {};
                    result[lang] = await this.iterateJson(json, result[lang], lang);
                });
                return result;
            }
            catch(e) {
                throw e;
            }
    }

    async iterateJson(json, result, lang) {
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                if (typeof json[key] === typeof {}) {
                    result[key] = {};
                    return await this.iterateJson(json[key], result[key]);
                } else {
                        result[key] = await this.translateText(json[key], lang);
                        return result;
                }
            } else {
                throw "Error in JSON format";
            }
        }
        return true;
    }

    async translateText(text, lang) {
        return text;
    }
}

module.exports = Translator;