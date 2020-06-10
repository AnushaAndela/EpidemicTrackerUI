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


function Diseasevalidate()
{ 
    if( document.diseaseform.name.value == "" )
    {
      alert( "Please provide your Name!" );
      document.diseaseform.name.focus() ;
      return false;
    }
    return true;
}