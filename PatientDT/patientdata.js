
 

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
        {title: 'Id',data:"patientDtoId"},
        {title: 'Name',data:"name"},
        {title: 'Age',data:"age"},
        {title: 'Gender',data:"gender"},
        {title: 'Eddit',data: null,
        'render': function (data, type, row) {
                          return '<button id="' + row.patientDtoId + '" class="btn btn-danger" data-toggle="modal" data-target="#edit"  >Edit</button>' 
                  }
      },
        {title: 'Delete',data: null,
        'render': function (data, type, row) {
                          return '<button id="' + row.patientDtoId + '" class="btn btn-danger" data-toggle="modal" data-target="#delete"  onclick="deleteClick(this.pattientDtoID)">Delete</button>' 
                  }
      }
        
      ]

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
  
}