const { json, response } = require('express');

function addData() {
   let mname = document.getElementById('mname').value;
    let producer = document.getElementById('producer').value;
    let year= document.getElementById('year').value;
    let rating = document.getElementById('rating').value;
   
    let movieObj = {
               "movieName":mname,
               "producer":producer,
               "year":year,
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

function getMovieData() {
   
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
            year: arrayOfMovie[i].year,
            rating: arrayOfMovie[i].rating 
          };
          table.innerHTML +=`
          <tr id='tr'>
              <td id='td'>${objectOfMovie.id}</td>
              <td id='td'>${objectOfMovie.mname}</td>
              <td id='td'>${objectOfMovie.producer}</td>
              <td id='td'>${objectOfMovie.year}</td>
              <td id='td'>${objectOfMovie.rating}</td>
              <td><button id="edit" onclick='edit("${objectOfMovie.id}","${objectOfMovie.mname}","${objectOfMovie.producer}",${objectOfMovie.year}",${objectOfMovie.rating}")'>Edit</button></td>&nbsp
              <td><button id="delete" onclick='deleteData("${objectOfMovie.id}")'>Delete</button></td>

          </tr>`
           
        }
      } else {
        console.log("Problem Occur");
      }
      
    };
    xhr.send();
  }

  function deleteData(movieId) {
   //  console.log(studentId);
    //let id = document.getElementById("search").value
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `http://localhost:5000/movies/${movieId}`, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log(xhr.response);
        console.log("record delete");
      } else {
        console.log("Problem Occur");
      }
      
    };
    if (window.confirm("Do you want to delete this user data?")) {
      alert("record deleted successfully");
      xhr.send();
    } else {
      return;
    }
  }
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  