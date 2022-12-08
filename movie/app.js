const express = require('express')
const fs = require('fs')
const port = 5000
const app = express()
app.use(express.json())
const uuid = require('uuid')
const uniqueRandomID = uuid.v4()
//get the user data from json file
app.get('/movies', (req, res) => {
    const movies = getMovieData()
    res.send(movies)
})

app.post('/movies', (req, res) => {
    const existMovies = getMovieData()
    const movieData = req.body

    if (movieData.type == null || movieData.producer == null || movieData.moviename == null || movieData.rating == null) {
        return res.status(401).send({error: true, msg: 'Movie data missing'})
    }
    const findExist = existMovies.find( movie => movie.moviename === movieData.moviename )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'movie  already exist'})
    }

     //append the user data
    existMovies.push(movieData)
    saveMovieData(existMovies);
    res.send({success: true, msg: 'Movie data added successfully'})
})


app.patch('/movies/:moviename', (req, res) => {
   
    //get the id from url
    const moviename = req.params.moviename

    //get the update data
    const movieData = req.body
    const existMovies = getMovieData()
    const findExist = existMovies.find( movie => movie.moviename === moviename)
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'moviename not exist'})
    }
    const updateMovie = existMovies.filter( movie => movie.moviename !== moviename)

   //push the updated data
    updateMovie.push(movieData)
    
    //finally save it
    saveMovieData(updateMovie)
    res.send({success: true, msg: 'Movie data updated successfully'})
})

app.delete('/movies/:moviername', (req, res) => {
    const moviename = req.params.moviename
    const existMovies = getMovieData()
    const filterMovie = existMovies.filter( movie => movie.moviename !== moviename )

    if ( existMovies.length === filterMovie.length ) {
        return res.status(409).send({error: true, msg: 'moviename does not exist'})
    }
    saveMovieData(filterMovie)
    res.send({success: true, msg: 'Movie removed successfully'})
    
})

const saveMovieData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('data.json', stringifyData)
}

const getMovieData = () => {
    const jsonData = fs.readFileSync('data.json')
    return JSON.parse(jsonData)    
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })