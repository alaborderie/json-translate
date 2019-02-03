const express = require('express');
const router = express.Router();
const Translator = require('../utils/translator.js');

/**
 * @api {post} /translate/api/v1 Translate your JSON to any language
 * @apiName Translate
 * @apiGroup Translate
 * @apiVersion 1.0.0
 * @apiParam {Object} json Contains the JSON you want to translate
 * @apiParam {string} sourceLang The source language you are using
 * @apiParam {string[]} exportLangs An array containing each language you want to translate to as a string (i.e "en" for english)
 * @apiParam {string} apiKey Your google translate API Key
 * @apiParamExample {json} Request-Example:
 *      {
 *          "json": {
 *              "test": "Ce texte était en français"
 *          },
 *          "sourceLang": "fr",
 *          "exportLangs": [
 *              "en",
 *              "es"
 *          ]
 *      }
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "en": {
 *              "test": "This text was in French"
 *          },
 *          "es": {
 *              "test": "Este texto estaba en francés"
 *          }
 *      }
 * @apiErrorExample {json} Error-Response:
 *      HTTP/1.1 401 KO
 *      {
 *          "error": "Invalid API Key"
 *      }
 * @author Antoine Laborderie
 */
router.post('/api/v1', async function (req, res, next) {
    try {
        const json = req.body.json;
        const sourceLang = req.body.sourceLang;
        const exportLangs = req.body.exportLangs;
        const apiKey = req.body.apiKey;

        let translator = new Translator(sourceLang, exportLangs, apiKey);
        const result = await translator.translateJson(json);

        res.send(result);
    } catch (e) {
        res.status(e.error.error.code).json(e.error.error);
    }
});

router.get('/', function (req, res, next) {
    const languages = [
        "af",
        "sq",
        "am",
        "ar",
        "hy",
        "az",
        "eu",
        "be",
        "bn",
        "bs",
        "bg",
        "ca",
        "ceb",
        "zh-CN",
        "zh-TW",
        "co",
        "hr",
        "cs",
        "da",
        "nl",
        "en",
        "eo",
        "et",
        "fi",
        "fr",
        "fy",
        "gl",
        "ka",
        "de",
        "el",
        "gu",
        "ht",
        "ha",
        "haw",
        "he",
        "hi",
        "hmn",
        "hu",
        "is",
        "ig",
        "id",
        "ga",
        "it",
        "ja",
        "jw",
        "kn",
        "kk",
        "km",
        "ko",
        "ku",
        "ky",
        "lo",
        "la",
        "lv",
        "lt",
        "lb",
        "mk",
        "mg",
        "ms",
        "ml",
        "mt",
        "mi",
        "mr",
        "mn",
        "my",
        "ne",
        "no",
        "ny",
        "ps",
        "fa",
        "pl",
        "pt",
        "pa",
        "ro",
        "ru",
        "sm",
        "gd",
        "sr",
        "st",
        "sn",
        "sd",
        "si",
        "sk",
        "sl",
        "so",
        "es",
        "su",
        "sw",
        "sv",
        "tl",
        "tg",
        "ta",
        "te",
        "th",
        "tr",
        "uk",
        "ur",
        "uz",
        "vi",
        "cy",
        "xh",
        "yi",
        "yo",
        "zu"
    ];
    res.render('translate', { languages });
});

module.exports = router;
