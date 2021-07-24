const express = require("express");
const router = express.Router();

module.exports = router;

const data = require('./db/data');

router
    .get('/', function(req, res) {
        res.sendFile(__dirname + "/" + "views/index.html");
    });

router
    .get('/view/matchs/', function(req, res) {
        res.sendFile(__dirname + "/" + "views/matchs.html");
    });

router
    .get('/view/match/', function(req, res) {
        res.sendFile(__dirname + "/" + "views/match.html");
    });

router
    .post('/match/choix/:code', function(req, res) {
        let r = data.addVote(req.body.idmatch, req.body.resultat, req.params.code);
        console.log(r)
        res.status(r);
        res.json('A VOTE')
    });

router
    .get('/view/resultats/', function(req, res) {
        res.sendFile(__dirname + "/" + "views/resultats.html");
    });

router
    .get('/resultats/', function(req, res) {
        res.status(201);
        res.json(data.getResultats());
    });

router
    .get('/view/resultatsOngoing/', function(req, res) {
        res.sendFile(__dirname + "/" + "views/resultatsOngoing.html");
    });

router
    .get('/resultatsOngoing/', function(req, res) {
        res.status(201);
        res.json(data.getResultatsOngoing());
    });

router
    .get('/match/', function(req, res) {
        res.status(201);
        res.json(data.allMatchs());
    });

router
    .get('/match/:idmatch', function(req, res) {
        res.status(201);
        res.json(data.getMatch(req.params.idmatch));
    });

router
    .get('/match/:idmatch/detaille', function(req, res) {
        res.status(201);
        res.json(data.getMatchDetaille(req.params.idmatch));
    });

router
    .get('/save/', function(req, res) {
        res.status(201);
        res.json(data.save());
    });

router
    .get('/update/', function(req, res) {
        res.status(201);
        res.json(data.update());
    });

router
    .get('/:code', function(req, res) {
        
        let personne = data.getPersonne(req.params.code)
        if (personne) {
            res.status(201);
            res.json(personne.name);
        }
        res.status(403);
        res.json("Non trouvé");
        
    });

router
    .get('/check/:code', function(req, res) {
        
        let personne = data.getPersonne(req.params.code)
        if (personne) {
            res.status(200);
            res.json(personne.name);
        }
        res.status(403);
        res.json("Non trouvé");
        
    });

    
router
   .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });