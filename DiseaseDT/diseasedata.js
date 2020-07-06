
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
            console.log(data.disease[0]);
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