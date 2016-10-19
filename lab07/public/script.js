$( document ).ready(function() {
 	//click event for the jquery button widget.
    $( "#get-data-button" ).click(function( event ) {
    	$.ajax({
    		url:"/hello",
    		type:"GET",
    		data: {name: "lab07"}
    	})
    	//this function activates upon a seccesful return of data. adds the data that was returned to the screen in a nice message
    	.done(function(json_string){
    		const json = JSON.parse(json_string);
    		$("body").append("<p>" + json.message +"<p>");
    		console.log('request was completed');

    	})
    	//error message alert when the get data fails
    	.fail(function( xhr, status, error){
    		alert("There was an error");
    		console.log("Error: " + error);
    		console.log("Status: " + status);
    		console.dir( xhr);
    	})
    	
})

   
});
  