const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login');
});

router.post('/welcome', (req, res) => {
    res.render('welcome');
});

router.get('/welcome', (req, res) => {
    res.render('welcome');
});

// router.get('/Login', (res, req) => {
//     req.render('login');
// });

router.get('/characterBuilder', (req, res) => {
    res.render('characterBuilder');
});

router.post('/characterBuilder', (req, res) => {
    //console.log(req.body);
    res.cookie('class', req.body.class)
    res.cookie('name', req.body.heroName)
    res.redirect('backgroundAndSpecies');
});

router.get('/backgroundAndSpecies', (req, res) => {
    res.render('backgroundAndSpecies');
});

router.post('/backgroundAndSpecies', (req, res) => {
    //console.log(req.body);
    res.cookie('background', req.body.background)
    res.cookie('specie', req.body.specie)
    res.redirect('abilityScore');
});

router.get('/abilityScore', (req, res) => {
    res.render('abilityScore');
});

router.post('/abilityScore', (req, res) => {
    //console.log(req.body);
    const abilityScores = {
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma
    }
    //Convert to string (is this needed)
    const stringy = JSON.stringify(abilityScores);

    res.cookie('abilityScores', abilityScores);
    res.redirect('characterSheet');
});

router.get('/characterSheet', (req, res) => {

    const cookieData = req.cookies
    //const background = req.cookie.class;
    //console.log(abilityScore.strength);
    // console.log(background);
    res.render('characterSheet', 
        {name: cookieData.name, 
        background: cookieData.background,
        specie: cookieData.specie,
        mainClass: cookieData.class,
        strength: cookieData.abilityScores.strength,
        dexterity: cookieData.abilityScores.dexterity,
        constitution: cookieData.abilityScores.constitution,
        intelligence: cookieData.abilityScores.intelligence,
        wisdom: cookieData.abilityScores.wisdom,
        charisma: cookieData.abilityScores.charisma
    });
});
``

module.exports = router;