
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
  }).then(() => {
     console.log('removed');
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
	




