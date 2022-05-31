




var details = document.getElementById('detail-container');
var container = document.getElementById('card-col');
var select_month = document.getElementById('select');
var select_month = document.getElementById('select');
console.log(details)

var date = new Date(), y = date.getFullYear(), m = date.getMonth();
var day = date.getDate()
var month = date.getMonth() + 1
var year = date.getFullYear()
console.log(year)
var firstDay = `${year}-0${month}-01`
var lastDay = `${year}-0${month}-${day}`
var last_day




select_month.addEventListener('input', (e) => {
  if(select_month.value > '0'){
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var day = date.getDate()
    var month = select_month.value;
    if(month == 02){
      last_day = 28  
    }else{
      last_day = 30
    }
    
    var year = date.getFullYear()
    console.log(year)
    firstDay = `${year}-${month}-01`
    lastDay = `${year}-${month}-${last_day}`

  }

  asyncCall(firstDay)

} )

var key = "ZHplkQtNXGbbClKhZykVBvAdgUqWSpz93hadavaw"

var ex_data
var image_selectior


async function asyncCall(firstDay) {
  if(lastDay){
    var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${firstDay}&end_date=${lastDay}`
  }else{
    var url = `https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${firstDay}`
  }
  
  console.log(url)
  console.log("function called")
  const response = await fetch(url);
  data = await response.json();
  generateHTML(data.hits)
  console.log(data)
  if(generateHTML()){
    console.log(document.querySelectorAll('.img-selectior'))
  }
}

generateHTML = () => {
  let html = "";
  data.map(result => {


    if(result.media_type == "image"){
      html += `
    <div class="card m-5">
      <img class="card-img-top img-selectior" src="${result.hdurl}" alt="Card image cap">
        <div class="card-body">
          <input type="hidden" name="" value = "${data}">
          <h5 class="card-title">${result.title}</h5>
          <p class="card-text"> <data value="${data}">${result.explanation} </data></p>
          <p class="card-text"><small class="text-muted"> ${result.date} </small></p>
        </div>
  </div>
    
    `
    }else{
      html += `
      <div class="card m-5">
      <iframe class="card-image-top"
      src="${result.url}">
      </iframe>
      <div class="card-body">
            <input type="hidden" name="" value = "${data}">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text"> <data value="${data}">${result.explanation} </data></p>
            <p class="card-text"><small class="text-muted"> ${result.date} </small></p>
          </div>
    </div>
      
      `
    }
    
  })



  container.innerHTML = html;
}

// container.addEventListener('click',get_data);


// function get_data(e){
//   e.preventDefault();
  
//   if(e.target.classList.contains('img-selectior')){
//     let data = e.target.parentElement.parentElement;
//     console.log(data)
//     window.open('details.html','_blank')
//     console.log(document.getElementById('detail-container'))
//     details(data)
//   }
// }

asyncCall(firstDay)




//    fetch(url)
//   .then(response => response.json())
//   .then(data => {
//       ex_data = data
//       let html = "";
//       console.log(data.length)
//       data.forEach(element => {
//           if(element.media_type == 'image'){
//               console.log(element)
//               var stri = element.explanation.substring(0, 50)
//               html += `
//                   <div class="card m-5">
//                     <a href="#">
//                       <img class="card-img-top img-selectior" src="${element.hdurl}" alt="Card image cap">
//                         <div class="card-body">
//                           <input type="hidden" name="" value = "${element}">
//                           <h5 class="card-title">${element.title}</h5>
//                           <p class="card-text"> <data value="${element}">${element.explanation} </data></p>
//                           <p class="card-text"><small class="text-muted"><i class="fas fa-eye"></i>1000<i class="far fa-user"></i>admin<i class="fas fa-calendar-alt"></i> ${element.date} </small></p>
//                         </div>
//                     </a>
//                   </div>
//               `;
//           }
          
//       });
//       container.innerHTML = html;
//       image_selectior = document.querySelector(".img-selectior")

//   })
  
// }

// console.log("images",image_selectior.length)

