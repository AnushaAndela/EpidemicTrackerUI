document.getElementById('loginData').addEventListener('submit',loginData);
        function loginData(e)
        {
            e.preventDefault();
            
            let login={};
             login.username=document.getElementById('username').value;
             login.password=document.getElementById('password').value;
            
            
            
            fetch('https://localhost:44369/api/Login/SignIn',{
                method:'POST',
                mode:'cors',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    //'Access-Control-Allow-Origin':'*'
                },
                body:JSON.stringify(login)
            })
            .then(function(response){
                if(response.status==200){
                  window.location.href="/loginform/login.html";
                }
                else{
                    alert("Please enter valid username and password!!");
                }
    
            })
                .then(data => {
                     console.log(data)
                  })
                .catch(error => console.error(error)) 
        
        }


fetch('https://localhost:44369/api/Patient/PatientData')  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
          return;  
        }
  
        // Examine the text in the response  
        response.json().then(function(data) {  
          let length=data.length;
      document.getElementById("cured").innerHTML=length;
          
        }) 
      }  
    )  
    .catch(function(err) {        console.error('Fetch Error -', err);  
    });



function myfunction()
{
  
$(document).ready(function(){
  fetch("https://localhost:44369/api/Patient/PatientData",
  {
    method:'GET',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify()
  })
  .then(function(res){
    return res.json();

  })
  .then(function(data){
    var table=$('#table_one').DataTable({
      "paging":true,
      "PaginationType":"full_numbers",
      fixedHeader: true,
      data:data,
      "columns":[
        {title: 'Patient Name',data:"patientDto.name"},
        {title: 'Gender',data:"patientDto.gender"},
        {title: 'PatientAge',data:"patientDto.age"},
        {title: 'AadharID',data:"patientDto.aadharId"},
        {title: 'Admitted Date',data:"admittedDate"},      
        {title: 'Disease',data:"diseaseDto.name"},
        {title: 'Hospital',data:"hospitalDto.name"}
      ]

    })
    var visible = true;
    var tableContainer = $(table.table().container());
 
    $('#curedbtn').on( 'click', function () {
        tableContainer.css( 'display', visible ? 'none' : 'block' );
        table.fixedHeader.adjust();
 
        visible = ! visible;
    } );
  })
   
});
}



fetch('https://localhost:44369/api/Patient/PatientDataUncured')  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
          return;  
        }
  
        // Examine the text in the response  
        response.json().then(function(data) {  
          let length=data.length;
      document.getElementById("uncured").innerHTML=length;
          
        }) 
      }  
    )  
    .catch(function(err) {        console.error('Fetch Error -', err);  
    });

function myfunctionuncured()
{
  
$(document).ready(function(){
  fetch("https://localhost:44369/api/Patient/PatientDataUncured",
  {
    method:'GET',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify()
  })
  .then(function(res){
    return res.json();

  })

  .then(function(data){
   
  
    var table=$('#table_two').DataTable({
      
      fixedHeader: true,
      "paging":true,
      "PaginationType":"full_numbers",
      data:data,
      "columns":[
        {title: 'Patient Name',data:"patientDto.name"},
        {title: 'Gender',data:"patientDto.gender"},
        {title: 'PatientAge',data:"patientDto.age"},
        {title: 'AadharID',data:"patientDto.aadharId"},
        {title: 'Admitted Date',data:"admittedDate"},      
        {title: 'Disease',data:"diseaseDto.name"},
        {title: 'Hospital',data:"hospitalDto.name"}
       

      ]

    })
   
    var visible = true;
    var tableContainer = $(table.table().container());
 
    $('#activebtn').on( 'click', function () {
        tableContainer.css( 'display', visible ? 'none' : 'block' );
        table.fixedHeader.adjust();
 
        visible = ! visible;
    } );
  })
});
}

fetch('https://localhost:44369/api/Patient/PatientDataFatility')  
.then(  
  function(response) {  
    if (response.status !== 200) {  
      console.warn('Looks like there was a problem. Status Code: ' + 
        response.status);  
      return;  
    }

    // Examine the text in the response  
    response.json().then(function(data) {  
      let length=data.length;
  document.getElementById("death").innerHTML=length;
      
    }) 
  }  
)  
.catch(function(err) {        console.error('Fetch Error -', err);  
});  

function myfunctionfatility()
{
 
$(document).ready(function(){
  fetch('https://localhost:44369/api/Patient/PatientDataFatility',
  {
    method:'GET',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify()
  })
  .then(function(res){
    return res.json();

  })
  .then(function(data){
    var table=$('#table_three').DataTable({
      fixedHeader: true,
      "paging":true,
      "PaginationType":"full_numbers",
      data:data,
      
      "columns":[
        {title: 'Patient Name',data:"patientDto.name"},
        {title: 'Gender',data:"patientDto.gender"},
        {title: 'PatientAge',data:"patientDto.age"},
        {title: 'AadharID',data:"patientDto.aadharId"},
        {title: 'Admitted Date',data:"admittedDate"},      
        {title: 'Disease',data:"diseaseDto.name"},
        {title: 'Hospital',data:"hospitalDto.name"}
      ]

    })
    var visible = true;
    var tableContainer = $(table.table().container());
 
    $('#deathbtn').on( 'click', function () {
        tableContainer.css( 'display', visible ? 'none' : 'block' );
        table.fixedHeader.adjust();
 
        visible = ! visible;
    } );
  })  
});

}


