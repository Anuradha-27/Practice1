const express = require('express')
const fs = require('fs')
const port = 6000
const app = express()
app.use(express.json())

//get the user data from json file
app.get('/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

app.post('/add', (req, res) => {
    const existUsers = getUserData()
    const userData = req.body

    if (userData.id == null ||userData.email == null || userData.age == null || userData.username == null || userData.password == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
    const findExist = existUsers.find( user => user.id === userData.id )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'id  already exist'})
    }

     //append the user data
    existUsers.push(userData)
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})


app.patch('/update/:id', (req, res) => {
   
    //get the id from url
    const id = req.params.id

    //get the update data
    const userData = req.body
    const existUsers = getUserData()
    const findExist = existUsers.find( user => user.id === id )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'id not exist'})
    }
    const updateUser = existUsers.filter( user => user.id !== id )

   //push the updated data
    updateUser.push(userData)
    
    //finally save it
    saveUserData(updateUser)
    res.send({success: true, msg: 'User data updated successfully'})
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    const existUsers = getUserData()
    const filterUser = existUsers.filter( user => user.id !== id )

    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'id does not exist'})
    }
    saveUserData(filterUser)
    res.send({success: true, msg: 'User removed successfully'})
    
})

const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('data.json', stringifyData)
}

const getUserData = () => {
    const jsonData = fs.readFileSync('data.json')
    return JSON.parse(jsonData)    
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })