
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
      var table=$('#patientdata').DataTable({
        
        data:data,
        "columns":[
            {title: 'ID',data:"hospitalDtoId"},
          {title: 'Name',data:"name"},
          {title: 'Phone',data:"phone"},
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
         
          $("#submit").click(function(){
           
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