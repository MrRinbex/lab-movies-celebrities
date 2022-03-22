require('../db')
const async = require("hbs/lib/async");
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


router.get('/movies/create',async (req, res, next) => {
    const celebrities = await Celebrity.find()
    res.render('movies/new-movie.hbs', {celebrities})
    })
    
    router.post('/movies/create', async (req, res, next) => {
        const {title, genre, plot, cast} = req.body
       try{
        await Movie.create({title, genre, plot, cast})
        res.redirect("/movies")
       } 
      catch{
          next()
      }  
    })

    router.get('/movies', async(req, res, next)=>{
        
        try  {
        const movies = await Movie.find()
        res.render('movies/movies.hbs', {movies})
         }
        catch(error) {
        console.log(" Error is :", error) 
     }
})
    router.get('/movies/:id', async(req, res, next) => {
        
    })

module.exports = router;