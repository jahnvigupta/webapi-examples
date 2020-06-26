// replace with your own token
var token = '5663ee3a12bc030a3a58504a43432d5f5eb36666' //Replace it with your token

var invocation = new XMLHttpRequest();
var url = 'https://cloud.iitmandi.ac.in/api2/repos/';
function listLibraries() {
    if(invocation) {    
        invocation.open('GET', url, true);
        invocation.setRequestHeader("Authorization", "Token " + token);
        invocation.onreadystatechange = function() {
            if(invocation.readyState == 4 && invocation.status == 200) {
                console.log(JSON.parse(invocation.responseText)); //Prints Libraries in JSON Format
            }
        };

        invocation.send();
    }
}

listLibraries();
