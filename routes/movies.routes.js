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
        const data = await Movie.findById(req.params.id).populate("cast")
        try{
             return res.render('movies/movie-details.hbs', {data})
        }
        catch(error) {
            console.log(" Error is :", error) 
         }
    })
    router.post('/movies/:id/delete', async(req, res, next) => {
        try{
            await Movie.findByIdAndDelete(req.params.id)
            res.redirect("/movies")
        }
        catch(error) {
            console.log(" Error is :", error) 
         }
    })
    router.get('/movies/:id/edit', async(req, res, next) => {
        try{
            const movie = await Movie.findById(req.params.id).populate('cast')
            console.log(movie)
            const celebrity = await Celebrity.find()
            arrayCheck = [];
            celebrity.forEach((el)=>{
                arrayCheck.push({name :el.name, math: false })
            })
            arrayCheck.forEach((elCeleb)=>{
                movie.cast.forEach((elMovie)=>{
                elCeleb.name === elMovie.name? elCeleb.match = true : elCeleb.match = false    
                })
            })
            res.render("movies/edit-movie", {movie, arrayCheck})
        }
        catch(error) {
            console.log(" Error is :", error) 
         }
    })
    router.post('/movies/:id/edit', async(req, res, next) => {
        const q = req.body
        try{
            await Movie.findByIdAndUpdate(req.params.id, q, {new : true})
            res.redirect("/movies")
        }
        catch(error) {
            console.log(" Error is :", error) 
         }
    })

    

module.exports = router;