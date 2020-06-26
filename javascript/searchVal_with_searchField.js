//author: Jahnvi
//Date: 10-05-20
//The purpose of the file is to print result field information of a repo with matching search field.

var token = '5663ee3a12bc030a3a58504a43432d5f5eb36666' //Replace it with your token

var invocation = new XMLHttpRequest(); //Creates XMLHttpRequest Object to create Http Requests.
var url = 'https://cloud.iitmandi.ac.in/api2/repos/'; //URL to all the repos

//Takes SearchField and SearchVal of Repo and prints the resultField of the matching repo.
function repo_info(searchField, searchVal, resultField) {
    if(invocation) {    
        invocation.open('GET', url, true); //Opens the URL
        invocation.setRequestHeader("Authorization", "Token " + token); //For Authorisation with token
        invocation.onreadystatechange = function() {
            if(invocation.readyState == 4 && invocation.status == 200) {
                //Store JSON format repos in results
                var results = JSON.parse(invocation.responseText);
                //iterate through all the repos
                for (var i=0 ; i < results.length ; i++)
                {
                    if (results[i][searchField] == searchVal) {
                        console.log(results[i][resultField]); //Prints My Library Id
                    }
                }
            }
        };

        invocation.send();
    }
}

repo_info("name","My Library","id")
