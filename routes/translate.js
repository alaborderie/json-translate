const express = require('express');
const router = express.Router();
const Translator = require('../utils/translator.js');
const http = require('http');

/* POST Translate in put JSON file to multiple languages */
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
