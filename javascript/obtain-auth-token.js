var invocation = new XMLHttpRequest();
var url = 'https://cloud.iitmandi.ac.in/api2/auth-token/';
function getSeafileApiToken() {
    if(invocation) {    
        invocation.open('POST', url, true);
        invocation.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        invocation.onreadystatechange = function() {
            if(invocation.readyState == 4 && invocation.status == 200) {
                console.log(invocation.responseText);
            }
        };

        invocation.send("username=demo@seafile.com&password=demo");
    }
}

getSeafileApiToken();
