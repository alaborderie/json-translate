var express = require('express');
var router = express.Router();
var Translator = require('../utils/translator.js');

/* POST Translate in put JSON file to multiple languages */
router.post('/', async function (req, res, next) {
    try {
        const json = req.body.json;
        const sourceLang = req.body.sourceLang;
        const exportLangs = req.body.exportLangs;

        let translator = new Translator(sourceLang, exportLangs);
        const result = await translator.translateJson(json);

        res.send(result);
    }
    catch(e) {
        res.status(409).send("There was an error during process: " + e.message);
    }
});

module.exports = router;
