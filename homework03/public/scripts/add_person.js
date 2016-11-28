$(document).ready(function(){
  $( 'form' ).submit(function( event ) {
    //prevents the html event from happaning and allows the js script to run instead
    event.preventDefault();

    var form = $( this );
    var myData = {"user_first_name": $( "#first" ).val(),
                  "user_last_name": $( "#last" ).val(),
                  "user_id_number": $( "#id" ).val(),
                  "user_start_date": $( "#date" ).val()}

    $.ajax({
      type: 'POST',
      url: '/people',
      contentType: 'application/json',
      data: JSON.stringify(myData),
      dataType: 'json'
    })
    //Runs this code 
    .done(function( json_string ) {
      json = JSON.parse(json_string)
      $( "#tempArea" ).empty()
      $( "#tempArea" ).append("<p>" + "Succesfully entered: [" + json.first + " " + json.last + "] to the database" + "</p>")
    })
    //If the function fails. this code is run. status codes are passed onto this function and written to console
    .fail(function( xhr, status, errorThrown ) {
      alert("There was a problem:");
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    })
  });
});