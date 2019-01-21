const express = require('express');
const router = express.Router();
const Translator = require('../utils/translator.js');
const http = require('http');

/**
 * @api {post} /api/translate Translate your JSON to any language
 * @apiName Translate
 * @apiGroup Translate
 * @apiParam {Object} json Contains the JSON you want to translate
 * @apiParam {string} sourceLang The source language you are using
 * @apiParam {string[]} exportLangs An array containing each language you want to translate to as a string (i.e "en" for english)
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
 * @author Antoine Laborderie
 */
router.post('/', async function (req, res, next) {
    try {
        const json = req.body.json;
        const sourceLang = req.body.sourceLang;
        const exportLangs = req.body.exportLangs;

        let translator = new Translator(sourceLang, exportLangs, http);
        const result = await translator.translateJson(json);

        res.send(result);
    }
    catch (e) {
        res.status(409).send("There was an error during process: " + e.message);
    }
});

router.get('/', function(req, res, next) {
    res.render('translate', { title: 'Express' });
});

module.exports = router;
