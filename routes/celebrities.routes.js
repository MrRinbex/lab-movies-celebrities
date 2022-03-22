require('../db')
const async = require("hbs/lib/async");
const Celebrity = require('../models/Celebrity.model')
const router = require("express").Router();

router.get('/celebrities/create', (req, res, next) => {
res.render('celebrities/new-celebrity.hbs')
})

router.post('/celebrities/create', async (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    try {
    await Celebrity.create({name, occupation, catchPhrase})
    res.render("celebrities/new-celebrity.hbs",)
    res.redirect("/celebrities")
    }
    catch(error) {
       console.log(" Error is :", error) 
    };
})

router.get('/celebrities', async(req, res, next)=>{
        try  {
        const celebrity = await Celebrity.find()
        res.render('celebrities/celebrities', {celebrity})
         }
        catch(error) {
        console.log(" Error is :", error) 
     }
})

module.exports = router;