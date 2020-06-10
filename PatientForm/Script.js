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
             console.log(data)
          })
        .catch(error => console.error(error)) 

}

function validate()
{ 
  if( document.patientform.name.value == "" )
  {
    alert( "Please enter Patient Name!" );
    document.patientform.name.focus() ;
    return false;
  }
  if( document.patientform.age.value == "" )
  {
    alert( "Please provide your Age!" );
    document.patientform.age.focus() ;
    return false;
  }
  if( document.patientform.gender.value == "" )
  {
    alert( "Please select Gender!" );
    document.patientform.name.focus() ;
    return false;
  }
  if( document.patientform.phone.value == "" ||
  isNaN( document.patientform.phone.value) ||
  document.patientform.phone.value.length != 10 )
{
alert( "Please provide a Mobile No in the format 123." );
document.hospitalform.phone.focus() ;
return false;
}
  var aadharpattern=/^\d{16}$/;
  if( document.patientform.aadharid.value == "" )
  {
    if(!(document.patientform.aadharid.value.match(aadharpattern)))
    {
    alert( "Please enter AadharId!" );
    document.patientform.aadharid.focus() ;
    return false;
    }
  }
  if( document.patientform.addresstype.value == "" )
  {
    alert( "Please enter addresstype!" );
    document.patientform.addresstype.focus() ;
    return false;
  }
  if( document.patientform.hno.value == "" )
  {
    alert( "Please enter hno!" );
    document.patientform.hno.focus() ;
    return false;
  }
  if( document.patientform.street.value == "" )
  {
    alert( "Please enter Street!" );
    document.patientform.street.focus() ;
    return false;
  }
  if( document.patientform.city.value == "" )
  {
    alert( "Please enter City!" );
    document.patientform.city.focus() ;
    return false;
  }
  if( document.patientform.state.value == "" )
  {
    alert( "Please enter State!" );
    document.patientform.state.focus() ;
    return false;
  }
  if( document.patientform.country.value == "" )
  {
    alert( "Please enter Country!" );
    document.patientform.country.focus() ;
    return false;
  }
  if( document.patientform.pincode.value == "" || isNaN( document.patientform.pincode.value) ||
  document.patientform.pincode.value.length != 6  )
  {
    alert( "Please enter Pincode!" );
    document.patientform.pincode.focus() ;
    return false;
  }
  if( document.patientform.occname.value == "" )
  {
    alert( "Please enter Occupation name!" );
    document.patientform.occname.focus() ;
    return false;
  }
  
  if( document.patientform.occstreetno.value == "" )
  {
    alert( "Please enter Streetno!" );
    document.patientform.occstreetno.focus() ;
    return false;
  }
  if( document.patientform.occarea.value == "" )
  {
    alert( "Please enter Occupation area!" );
    document.patientform.occarea.focus() ;
    return false;
  }
  if( document.patientform.occcity.value == "" )
  {
    alert( "Please enter Occupation city!" );
    document.patientform.occcity.focus() ;
    return false;
  }
  if( document.patientform.occstate.value == "" )
  {
    alert( "Please enter Occupation state!" );
    document.patientform.occstate.focus() ;
    return false;
  }
  if( document.patientform.occcountry.value == "" )
  {
    alert( "Please enter Occupation country!" );
    document.patientform.occcountry.focus() ;
    return false;
  }
  if( document.patientform.pincode.value == "" || isNaN( document.patientform.pincode.value) ||
  document.patientform.pincode.value.length != 6  )
  {
    alert( "Please enter Occupation Pincode!" );
    document.patientform.occpincode.focus() ;
    return false;
  }
  if( document.patientform.admitteddate.value == "2020-05-25T12:44:41.913Z" )
  {
    alert( "Please enter Admitteddate in the given format!" );
    document.patientform.admitteddate.focus() ;
    return false;
  }
  if( document.patientform.percentagecure.value == "" )
  {
    alert( "Please enter Percentagecure!" );
    document.patientform.occcountry.focus() ;
    return false;
  }
  if( document.patientform.relievingdate.value == "2020-05-25T12:44:41.913Z" )
  {
    alert( "Please enter RelievingDate in the given format!" );
    document.patientform.relievingdate.focus() ;
    return false;
  }
  if( document.patientform.isfatility.value == "" )
  {
    alert( "Please enter IsFatility!" );
    document.patientform.occcountry.focus() ;
    return false;
  }
  
  return true;
}