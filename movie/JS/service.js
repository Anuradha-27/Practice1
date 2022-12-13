const { json } = require("express");

function movieData() {

    //console.log("sdjhfgsfsjhvjh")
    let mname = document.getElementById('mname').value;
    let producer = document.getElementById('producer').value;
    let type= document.getElementById('type').value;
    let rating = document.getElementById('rating').value;
   
    let movieObj = {
               "movieName":mname,
               "producer":producer,
               "type":type,
               "rating":rating
           }
   
           console.log(movieObj)
   const url = "http://localhost:5000/movies";
   let xhr = new XMLHttpRequest();
   xhr.response = "json";
   xhr.open('POST', url,true)
   xhr.onload = ()=>{
       if(xhr.status === 200){
         console.log(xhr.response);
       } else {
           console.log("data not send")
       }
   }
   xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
   xhr.send(JSON.stringify(movieObj));  
  
    
}

function getData() {
   
    let table = document.getElementById("tableData");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:5000/movies", true);
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status === 200) {
        let arrayOfMovie = xhr.response;
        console.log(arrayOfMovie);
        for (let i = 0; i < arrayOfMovie.length; i++) {
          let objectOfMovie = {
            id: arrayOfMovie[i].id,
            mname: arrayOfMovie[i].mname,
            producer: arrayOfMovie[i].producer,
            type: arrayOfMovie[i].type,
            rating: arrayOfMovie[i].rating 
          };
          table.innerHTML +=`
          <tr id='tr'>
              <td id='td'>${objectOfMovie.id}</td>
              <td id='td'>${objectOfMovie.mname}</td>
              <td id='td'>${objectOfMovie.producer}</td>
              <td id='td'>${objectOfMovie.type}</td>
              <td id='td'>${objectOfMovie.rating}</td>
              <td><button id="edit" onclick='edit("${objectOfMovie.mname}","${objectOfMovie.producer}","${objectOfMovie.type}","${objectOfMovie.rating}";);updateData("${objectOfMovie.id}")'>Edit</button></td>&nbsp
              <td><button id="delete" onclick='deleteData("${objectOfMovie.id}")'>Delete</button></td>&nbsp
          </tr>`
           
        }
      } else {
        console.log("Problem Occur");
      }
    };
    xhr.send();
  }
  function deleteData() {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:5000/movies/id", true);
    xhr.responseType = "json";
    let index,table = document.getElementById("tableData");
    for (let i=0; i<table.rows.length;i++) {
        table.rows[i].cells[3].onclick=function() {
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
            console.log(index);
        }
        
    }
  }
