const express = require('express')
const fs = require('fs')
const port = 9000
const app = express()
var cors = require('cors')
app.use(express.json())

const { v4: uuidv4 } = require('uuid');
app.use(cors())

app.get('/movies', (req, res) => {
    const movies = getMovieData()
    res.send(movies)
})

app.get('/movies/id', (req, res) => {
    
    const id = req.params.id
    const existMovies = getMovieData()
    const findExist = existMovies.find( movie => movie.id === id)
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'id not exist'})
    }
    else {
        res.send(findExist)
    }
})

app.post('/movies',

 (req, res) => {
    
    const existMovies = getMovieData()
    const id = uuidv4()
   //const userData = req.body
    const movieData= {
         ...req.body,
        id:uuidv4()
    } 

   /*if (movieData.type == null || movieData.mname == null || movieData.producer == null || movieData.rating == null||movieData.id ) {
        return res.status(401).send({error: true, msg: 'Movie data missing'}) 
    } */
    //const findExist = existMovies.find( movie =>  movie.movieName === movieData.movieName)
    const findExist = existMovies.find( movie =>  movie.id === id)
    if (findExist) {
        return res.status(409).send({error: true, msg: 'id  already exist'})
    }

     //append the user data
    existMovies.push(movieData)
    saveMovieData(existMovies);
    res.send({ msg: 'Movie data added successfully',id})
})


app.patch('/movies/:id', (req, res) => {
    //get the id from url
    const id = req.params.id
   //get the update data
    const movieData ={
        ...req.body,
        id:uuidv4()
    }
     const existMovies = getMovieData()
    const findExist = existMovies.find( movie => movie.id === id)
    // if (!findExist) {
    //     return res.status(409).send({id, msg:'id not exist'})
    // }
    const updateMovie = existMovies.filter( movie => movie.id !== id)
    updateMovie.push(movieData)
    saveMovieData(updateMovie)
    res.send({success: true, msg: 'Movie data updated successfully',id})
})

app.delete('/movies/:id', (req, res) => {
    const id = req.params.id
    const existMovies = getMovieData()
    const filterMovie = existMovies.filter( movie => movie.id !== id )
    if ( existMovies.length === filterMovie.length ) {
        return res.status(409).send({error: true, msg: 'id does not exist'})
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