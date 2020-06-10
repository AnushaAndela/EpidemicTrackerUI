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
function validateHospital()
{ 
   if( document.hospitalform.name.value == "" )
   {
     alert( "Please provide your Name!" );
     document.hospitalform.name.focus() ;
     return false;
   }
   if( document.hospitalform.phone.value == "" ||
   isNaN( document.hospitalform.phone.value) ||
   document.hospitalform.phone.value.length != 10 )
{
alert( "Please provide a Mobile No in the format 123." );
document.hospitalform.phone.focus() ;
return false;
}
   if( document.hospitalform.streetno.value == "" )
   {
     alert( "Please provide your Streetno!" );
     document.hospitalform.streetno.focus() ;
     return false;
   }
   if( document.hospitalform.area.value == "" )
   {
     alert( "Please provide your Area!" );
     document.hospitalform.area.focus() ;
     return false;
   }
   if( document.hospitalform.city.value == "" )
   {
     alert( "Please provide your City!" );
     document.hospitalform.city.focus() ;
     return false;
   }
   if( document.hospitalform.state.value == "" )
   {
     alert( "Please provide your State!" );
     document.hospitalform.state.focus() ;
     return false;
   }
   if( document.hospitalform.country.value == "" )
   {
     alert( "Please provide your country!" );
     document.hospitalform.country.focus() ;
     return false;
   }
   if( document.hospitalform.pincode.value == "" || isNaN( document.hospitalform.pincode.value) ||
   document.hospitalform.pincode.value.length != 6  )
   {
    alert( "Please provide a pincode in the format ######." );
     document.hospitalform.pincode.focus() ;
     return false;
   }
   
   
   return( true );
}