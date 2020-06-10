

function preventBack() { window.history.forward(); }
        setTimeout("preventBack()", 0);
        window.onunload = function () { null };
function logoutFunct()
{
    
    window.location.href="/index.html";
}


$(document).ready(function() {
    $("#patient").load("/PatientForm/patient.html"); 
    
    $("#hospital").load("/HospitalForm/hospital.html"); 
    $("#disease").load("/DiseaseForm/disease.html"); 
});