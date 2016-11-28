$(document).ready(function() {
$( 'form' ).submit(function( event ) {
  //
  event.preventDefault();

  var form = $( this );
  var myData = {"id_number": $( "#id" ).val()}
  var tempURL = "/person/" + myData;
  $.ajax({
    type: 'POST',
    url: tempURL,
    contentType: 'application/json',
    data: JSON.stringify(myData),
    dataType: 'json'
  })
  .done(function( json_string ) {
    json = JSON.parse(json_string)
   json = JSON.parse(json_string)
      $("#LineOne").empty()
      $("#LineTwo").empty()
      $("#LineThree").empty()
      $("#LineOne").append("<p>" + "Full Name: " + json.first + " " + json.last + "</p>")
      $("#LineTwo").append("<p>" + "ID Number: " + json.ID + "</p>")
      $("#LineThree").append("<p>" + "Years Worked: " + json.years + "</p>")
  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function( xhr, status, errorThrown ) {
    alert("There was a problem:");
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })
});
});