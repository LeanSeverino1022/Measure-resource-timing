$(document).ready(function () {

    $('button').click(function () {       
        
       var buttonId = $(this).attr('id').toLowerCase();
       
       //remove all base64 strings from the dom
       $(".base64-src").remove();


        
            //clear images
        $('#image_section').html("");

        //load either a base64 or a png image
        $(this).hasClass('b64') ? loadBase64Images('js/'+buttonId+'.js') :  loadPngImages(buttonId); 
        
        $(this).prop('disabled',true);

        //if all buttons
        if($("button:enabled").length < 1) {
            document.getElementById('result').innerHTML += '<h4>Page will reload so you can gather different set of results </h4>';
            setTimeout(() => { window.location.reload(true) }, 4000); 
        }  


    });

    function loadBase64Images(url)
    {        
        var scriptEl = document.createElement('script');        
        
        scriptEl.setAttribute('src',url);
        scriptEl.setAttribute('class','base64-src');
        
        document.head.appendChild(scriptEl);

        scriptEl.onload = function(){ 
            var image1 = new Image();
            image1.onload = calculateBase64StringTiming(url);
            image1.src = base64String;

            document.getElementById('image_section').appendChild(image1);
        }    
   
    }

    function loadPngImages(filename)
    {        
        // window.location.reload(true)
        var path = "images/"+filename+".png";
        var image1 = new Image();
        image1.onload = calculatePNGTiming;
        image1.src = path;

        document.getElementById('image_section').appendChild(image1);
        
        document.getElementById('result').innerHTML = "";
   
    }
 
    function calculateBase64StringTiming(url)
    {
        var resourceList = window.performance.getEntriesByType("resource");
        for (var i = 0; i < resourceList.length; i++)
        {
            //get only data of the script which contains the base64 string
           if (resourceList[i].initiatorType !== "img" && resourceList[i].name.includes(url))
           {
              alert("amount of time to fetch resource " + url + " : " + (resourceList[i].responseEnd - resourceList[i].startTime));
             
              document.getElementById('result').innerHTML += 'amount of time to fetch base64 string from ' + url + ' : ' + (resourceList[i].responseEnd - resourceList[i].startTime) + 'ms <br>';
           }
           
        }
    }

    function calculatePNGTiming()
    {
        const resourceList = window.performance.getEntriesByType("resource");

        const numOfImages = 3;
        
        for (var i = 0; i < resourceList.length; i++)
        {
            //get only data of the script which contains the base64 string
           if (resourceList[i].initiatorType == "img")
           {
              alert("amount of time to fetch png image " + resourceList[i].name +" : " + (resourceList[i].responseEnd - resourceList[i].startTime));
             
              document.getElementById('result').innerHTML += 'amount of time to fetch image ' + resourceList[i].name + " : " +  (resourceList[i].responseEnd - resourceList[i].startTime) + 'ms <br>';
           }
           
        }
    }
    
});//end ready 


// FROM MDN
//  PerformanceTiming.responseEnd read-only property returns an unsigned long long 
// representing the moment, in miliseconds since the UNIX epoch, when the browser received the 
// last byte of the response, or when the connection is closed if this happened first,
//  from the server from a cache or from a local resource.

// The PerformanceTiming.responseStart read-only property returns an unsigned long long 
// representing the moment in time (in milliseconds since the UNIX epoch)
//  when the browser received the first byte of the response from the server, cache, or local resource.


