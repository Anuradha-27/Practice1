/*const express =require('express');
const { fromString } = require('uuidv4');
const port = 5000
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/registration.html');
})

app.post('/',(req,res) => {
    const users = {
        
        "username":uname,
        "email":email,
        "age":age,
        "password":pwd,
    }
    const userData = JSON.stringify(users);
    fs.writeFileSync('data.json',userData);
})
app.listen(port,() => {
console.log(`Example app listening at http://localhost:${port}`)
}); */
//created event listener
//for calling get api
function makeRequest() {
    console.log("Show Button clicked");
    //create xhr object
    const xhr = new XMLHttpRequest();
    //give url
    const url = "http://localhost:3000/api/user";
    //called open method of xhr object which take 3 parameters
    xhr.open("GET", url, true);
    console.log('READYSTATE: ', xhr.readyState)
    xhr.onreadystatechange = function () {
        console.log('READYSTATE: ', xhr.readyState)
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log(xhr);
                console.log(xhr.response);
                let contactList = JSON.parse(xhr.response) ?? [];
                table.innerHTML = ``
                //looping data and show data in table
                contactList.forEach(function (value, i) {
                    var table = document.getElementById('table')
                    table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${value.fullName}</td>
                <td>${value.email}</td>
                <td>${value.contact}</td>
                <td>
                    <button type="button" onclick="find(${value.id})">Edit
                    </button>
                </td>
                <td>
                    <button type="button" onclick="removeData(${value.id})">Delete
               </button>
                </td>
            </tr>`
                })
            }
            else {
                console.log("problem occurred")
            }
        }
    };
    xhr.send();
}
//for calling post api
function save() {
    const item = {
    
        lastName: document.getElementById('LastName').value,
        firstName: document.getElementById('FirstName').value,
        email: document.getElementById('Email').value,
    }
    let list = JSON.stringify(item)
    console.log(list);
    console.log("Save Button clicked");
    const xhr = new XMLHttpRequest();
    const urlPost = "http://localhost:8000/users";
    xhr.open("POST", urlPost, true);
    
    // console.log('READYSTATE', xhr.readyState);
    xhr.onreadystatechange = function () {
        console.log('READYSTATE', xhr.readyState);
        if (xhr.readyState === XMLDocument.XMLHttpRequest, this.DONE) {
            if (xhr.status === 200) {
                 console.log(xhr);
            }
        }
    }
    xhr.setRequestHeader("Content-type", "application/json:Charset=UTF-8");
    xhr.send(list)
}
document.getElementById("btnLogin").addEventListener("click", makeRequest);