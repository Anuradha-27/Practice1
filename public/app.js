const express =require('express');
const port = 5000
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/registration.html');
})

app.post('/formpost',(req,res) => {
   
})

app.listen(port,() => {
console.log(`Example app listening at http://localhost:${port}`)
});