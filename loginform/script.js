

function preventBack() { window.history.forward(); }
        setTimeout("preventBack()", 0);
        window.onunload = function () { null };
function logoutFunct()
{
    
    window.location.href="/index.html";
}





 /* Centering the modal vertically */ 
 
  $(document).ready(function(){
    fetch("https://localhost:44369/api/Patient",
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
      var table=$('#patientdata').DataTable({
        "paging":true,
     "PaginationType":"full_numbers",
     
        data:data,
        "columns":[
          
          {title: 'Name',data:"name"},
          {title: 'Age',data:"age"},
          {title: 'Gender',data:"gender"},
          {title: 'Phone',data:"phone"},
          {title: 'IsAffected',data:"isAffected"},
          {title: 'Edit/Delete',data:"patientDtoId",
            'render':function(data, type, row){
              
              return  '<button id="' + row.patientDtoId + '"  class="edit-button btn btn-primary" data-toggle="modal" type="button" onclick="editClick(this)">Edit</button> / <button id="' + row.patientDtoId + '" class="btn btn-danger" data-toggle="modal"   onclick="deleteClick(this)">Delete</button>'
            }}
          
        ],
        "language":{
          "emptyTable":"No data found, Please check on <b> Add New </b> Button"
        }
        
   
      })
    });
    
  });
  function deleteClick (obj) {
    
    var rowID = $(obj).attr('Id');
    
    fetch('https://localhost:44369/api/Patient' + "/" + rowID, {
      method: 'DELETE'
    }).then(function(response){
      if(response.status==200){
        window.location.reload();
      }
      else{
          alert("Please enter valid username and password!!");
      }

  }).catch(err => {
      console.error(err)
    });
    $('#delete').modal('show');
    
  }
  
  $(document).ready(function(){
      $("#launch-modal").click(function(){
          $("#addModal").modal({
              backdrop: 'static'
      });
      $("#addModal .modal-title").html("Add Patient");
      let hospitaldropdown = document.getElementById('hospital-dropdown');
  hospitaldropdown.length=0;
  let hospitaldefaultOption = document.createElement('option');
  hospitaldefaultOption.text = 'Select';
  hospitaldropdown.add(hospitaldefaultOption);
  hospitaldropdown.selectedIndex = 0;
  
  fetch('https://localhost:44369/api/Hospital')  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
          return;  
        }
  
        // Examine the text in the response  
        response.json().then(function(data) {  
          let option;
      
          for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            
              option.text=data[i].name;
              hospitaldropdown.add(option);
              
          }    
        });  
      }  
    )  
    .catch(function(err) {  
      console.error('Fetch Error -', err);  
    });
    let dropdown = document.getElementById('disease-dropdown');
    dropdown.length=0;
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select';
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
     
    fetch('https://localhost:44369/api/Disease')  
      .then(  
        function(response) {  
          if (response.status !== 200) {  
            console.warn('Looks like there was a problem. Status Code: ' + 
              response.status);  
            return;  
          }
    
          // Examine the text in the response  
          response.json().then(function(data) {  
            let option;
        
          for (let i = 0; i < data.length; i++) {
              option = document.createElement('option');
                option.text=data[i].name;
                option.value=data[i].name;
                dropdown.add(option);
                
          }    
          }) 
        }  
      )  
      .catch(function(err) {        console.error('Fetch Error -', err);  
      });
  
    function getDisease()
    {
      
      const url = 'https://localhost:44369/api/Disease';
      fetch(url,
          {
              method: 'GET',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify()
          })
          .then(function (res) {
              return res.json();
          })
          .then(function (data) {
              let result = `<option value="">--Select--</option>`;
              data.forEach((disease) => {
                  result +=
                      '<option value="' + disease['name'] + '">' + disease['name'] + '</option>';
                  document.getElementById('disease-dropdown').innerHTML = result;
              });
          })
          .catch(error => console.error('Unable to load roles.', error));
    }
      document.getElementById('postData').addEventListener('submit',postData);
  function postData(e)
  {
      e.preventDefault();
      
      let patient={};
      
  
      
      patient.name=document.getElementById("name").value;
      patient.age=document.getElementById("age").value;
      patient.gender=document.getElementById("gender").value;
      patient.phone=document.getElementById("phone").value;
      patient.aadharId=document.getElementById("aadharid").value;
      patient.isaffected=document.getElementById("isaffected").value;
      patient.addresses = [
          { 
             addresstype:document.getElementById("addresstype").value,
             hno:document.getElementById("hno").value,
             street:document.getElementById("street").value,
             city:document.getElementById("city").value,
             state:document.getElementById("state").value,
             country:document.getElementById("country").value
             
  
          }
  
         
        ];
  
       patient.occupations=[
           {
       name:document.getElementById("occname").value,
       phone:document.getElementById("occphone").value,
       streetno:document.getElementById("occstreetno").value,
       area:document.getElementById("occarea").value,
       city:document.getElementById("occcity").value,
       state:document.getElementById("occstate").value,
       country:document.getElementById("occcountry").value,
       pincode:document.getElementById("occpincode").value
           }
       
          ];
          patient.treatments=[
            {
          admitteddate:document.getElementById("admitteddate").value,
          percentagecure:document.getElementById("percentagecure").value,
          relievingdate:document.getElementById("relievingdate").value,
          isfatility:document.getElementById("isfatility").value,
          diseasedto:{
            name : (document.getElementById("disease-dropdown")).options[(document.getElementById("disease-dropdown")).selectedIndex].text
          },
          hospitaldto:{
            
            name : (document.getElementById("hospital-dropdown")).options[(document.getElementById("hospital-dropdown")).selectedIndex].text
  
          }
          }];
          
         
      fetch('https://localhost:44369/api/Patient',{
          method:'POST',
          mode:'cors',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              //'Access-Control-Allow-Origin':'*'
          },
          body:JSON.stringify(patient)
      }).then(response => response.json())
          .then(data => {
               console.log(data);
               
            })
          .catch(error => console.error(error)) 
       
  }
  
    });
   
  });
   
  
   function editClick(obj){
    var rowID = $(obj).attr('Id');
    console.log(rowID);
    fetch('https://localhost:44369/api/Patient' + "/" + rowID, {
      method: 'GET',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify()
          })
          .then(function (res) {
              return res.json();
          })
          .then(function (data) {
            console.log(data.addresses[0].hno);
           document.getElementById('name').value=data.name;
           document.getElementById('age').value=data.age;
           document.getElementById('gender').value=data.gender;
           document.getElementById('phone').value=data.phone;
           document.getElementById('aadharid').value=data.aadharId;
           document.getElementById('isaffected').value=data.isAffected;
           document.getElementById('hno').value=data.addresses[0].hno;
           document.getElementById('street').value=data.addresses[0].street;
           document.getElementById('city').value=data.addresses[0].city;
           document.getElementById('state').value=data.addresses[0].state;
           document.getElementById('pincode').value=data.addresses[0].pincode;
          
          })
          .catch(error => console.error('Unable to load roles.', error));
  
          $('#addModal').modal('show');
          $("#addModal .modal-title").html("Edit Patient");
         
          $("#submit").click(function(){
            console.log("fecth");
            let patient={};
      
  
      
            patient.name=document.getElementById("name").value;
            patient.age=document.getElementById("age").value;
            patient.gender=document.getElementById("gender").value;
            patient.phone=document.getElementById("phone").value;
            patient.aadharId=document.getElementById("aadharid").value;
            patient.isaffected=document.getElementById("isaffected").value;
            fetch('https://localhost:44369/api/Patient' + "/" + rowID, {
              
                method: 'PUT',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(patient)
          })
          .then(function (res) {
              return res.json();
          })
          .then(function (data) {
            
          })
          .catch(error => console.error('Unable to load roles.', error));
  
          });
  
  
  }
      
  

  
$(document).ready(function(){
  fetch("https://localhost:44369/api/Hospital",
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
    var table=$('#hospitaldata').DataTable({
      "paging":true,
     "PaginationType":"full_numbers",
      data:data,
      "columns":[
          {title: 'ID',data:"hospitalDtoId"},
        {title: 'Name',data:"name"},
        {title: 'Phone',data:"phone"},
        {title: 'Streetno',data:"streetNo"},
        {title: 'Area',data:"area"},
        {title: 'State',data:"state"},
        {title: 'Country',data:"country"},
        {title: 'Edit/Delete',data:"hospitalDtoId",
          'render':function(data, type, row){
            
            return  '<button id="' + row.hospitalDtoId + '"  class="edit-button btn btn-primary" data-toggle="modal" type="button" onclick="editHospitalClick(this)">Edit</button> / <button id="' + row.hospitalDtoId + '" class="btn btn-danger" data-toggle="modal"   onclick="deleteHospitalClick(this)">Delete</button>'
          }}
        
      ],
      "language":{
        "emptyTable":"No data found, Please check on <b> Add New </b> Button"
      }
      
 
    })

    
  });
  
});
$(document).ready(function(){
  $("#launchhospitalmodal").click(function(){
  $("#addHospitalModal").modal({
    backdrop: 'static'
  });
  $("#addHospitalModal .modal-title").html("Add Hospital");
  document.getElementById('hospitalData').addEventListener('submit',hospitalData);
function hospitalData(e)
{
  e.preventDefault();
  debugger;
  let name=document.getElementById('hname').value;
  let phone=document.getElementById('hphone').value;
  let streetno=document.getElementById('hstreetno').value;
  let area=document.getElementById('harea').value;
  let city=document.getElementById('hcity').value;
  let state=document.getElementById('hstate').value;
  let country=document.getElementById('hcountry').value;
  let pincode=document.getElementById('hpincode').value;
  
  fetch('https://localhost:44369/api/Hospital',{
      method:'POST',
      mode:'cors',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          //'Access-Control-Allow-Origin':'*'
      },
      body:JSON.stringify({
          name:name,
         phone:phone,
         streetno:streetno,
         area:area,
         city:city,
         state:state,
         country:country,
         pincode:pincode
         

      })
  }).then(response => response.json())
      .then(data => {
           console.log(data)
        })
      .catch(error => console.error(error)) 

}
})
})


function editHospitalClick(obj){
  var rowID = $(obj).attr('Id');
  console.log(rowID);
  fetch('https://localhost:44369/api/Hospital' + "/" + rowID, {
    method: 'GET',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
          console.log(data);
         document.getElementById('hname').value=data.name;
         document.getElementById('hphone').value=data.phone;
         document.getElementById('hstreetno').value=data.streetno;
         document.getElementById('harea').value=data.area;
         document.getElementById('hcity').value=data.city;
         document.getElementById('hstate').value=data.state;
         document.getElementById('hcountry').value=data.country;
         document.getElementById('hpincode').value=data.pincode;
         
        })
        .catch(error => console.error('Unable to load roles.', error));

        $('#addHospitalModal').modal('show');
        $("#addHospitalModal .modal-title").html("Edit Hospital Details");
       
        $("#hsubmit").click(function(){
         
          let name=document.getElementById('hname').value;
          let phone=document.getElementById('hphone').value;
          let streetno=document.getElementById('hstreetno').value;
          let area=document.getElementById('harea').value;
          let city=document.getElementById('hcity').value;
          let state=document.getElementById('hstate').value;
          let country=document.getElementById('hcountry').value;
          let pincode=document.getElementById('hpincode').value;
          fetch('https://localhost:44369/api/Hospital' + "/" + rowID, {
            
              method: 'PUT',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name:name,
              phone:phone,
              streetno:streetno,
              area:area,
              city:city,
              state:state,
              country:country,
              pincode:pincode
            })
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(error => console.error('Unable to load roles.', error));

        });


}
function deleteHospitalClick (obj) {

  var rowID = $(obj).attr('Id');
  
  fetch('https://localhost:44369/api/Hospital' + "/" + rowID, {
    method: 'DELETE'
  }).then(() => {
     console.log('removed');
  }).catch(err => {
    console.error(err)
  });
  $('#deletehospital').modal('show');
  
}


$(document).ready(function(){
  fetch("https://localhost:44369/api/DiseaseType",
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
    var table=$('#diseasedata').DataTable({
     "paging":true,
     "PaginationType":"full_numbers",
      data:data,
      "columns":[
          {title: 'ID',data:"diseaseTypeId"},
        {title: 'Type of Disease',data:"typeOfDisease"},
        {title: 'Disease Name',data:"disease[0].name"},
       
        {title: 'Edit/Delete',data:"hospitalDtoId",
          'render':function(data, type, row){
            
            return  '<button id="' + row.diseaseTypeId + '"  class="edit-button btn btn-primary" data-toggle="modal" type="button" onclick="editDiseaseClick(this)">Edit</button> / <button id="' + row.diseaseTypeId + '" class="btn btn-danger" data-toggle="modal"   onclick="deleteDiseaseClick(this)">Delete</button>'
          }}
        
      ],
      "language":{
        "emptyTable":"No data found, Please check on <b> Add New </b> Button"
      }
      
 
    })

    
  });
  
});
$(document).ready(function(){
  $("#launchdiseasemodal").click(function(){
  $("#addDiseaseModal").modal({
    backdrop: 'static'
  });
  $("#addDiseaseModal .modal-title").html("Add Disease");
  document.getElementById('loginData').addEventListener('submit',loginData);
  function loginData(e)
  {
      e.preventDefault();
      
      let diseasetype={};
       diseasetype.typeofdisease=document.getElementById('mySelect').value;
       diseasetype.disease=[
           {
              name:document.getElementById("diseasename").value
           }
       ];
      
      fetch('https://localhost:44369/api/DiseaseType',{
          method:'POST',
          mode:'cors',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json',
              //'Access-Control-Allow-Origin':'*'
          },
          body:JSON.stringify(diseasetype)
      }).then(response => response.json())
          .then(data => {
               console.log(data)
            })
          .catch(error => console.error(error)) 
  
  }
  
})
})


function editDiseaseClick(obj){
  var rowID = $(obj).attr('Id');
  console.log(rowID);
  fetch('https://localhost:44369/api/DiseaseType' + "/" + rowID, {
    method: 'GET',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
          console.log(data.disease[0].name);
         document.getElementById('mySelect').value=data.typeofdisease;
         document.getElementById('diseasename').value=data.disease[0].name;
        
         
        })
        .catch(error => console.error('Unable to load roles.', error));

        $('#addDiseaseModal').modal('show');
        $("#addDiseaseModal .modal-title").html("Edit Disease Details");
       
        $("#submitdisease").click(function(){
         
          let diseasetype={};
       diseasetype.typeofdisease=document.getElementById('mySelect').value;
       diseasetype.disease=[
           {
              name:document.getElementById("diseasename").value
           }
       ];
          fetch('https://localhost:44369/api/DiseaseType' + "/" + rowID, {
            
              method: 'PUT',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(diseasetype)
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
          
        })
        .catch(error => console.error('Unable to load roles.', error));

        });


}
function deleteDiseaseClick (obj) {

  var rowID = $(obj).attr('Id');
  
  fetch('https://localhost:44369/api/DiseaseType' + "/" + rowID, {
    method: 'DELETE'
  }).then(() => {
     console.log('removed');
  }).catch(err => {
    console.error(err)
  });
  $('#deletedisease').modal('show');
  
}
  