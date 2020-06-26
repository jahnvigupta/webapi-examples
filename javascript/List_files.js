//author: Jahnvi
//Date: 23-05-20

var token = '5663ee3a12bc030a3a58504a43432d5f5eb36666' //Replace it with your token

var invocation = new XMLHttpRequest(); //Creates XMLHttpRequest Object to create Http Requests.

var url = 'https://cloud.iitmandi.ac.in/api2/repos/'; //URL to all the repos

//Takes path of directory and depth of directory and prints all directories and files in the directory
function dir_info(url, depth) {
    if(invocation) {    
        invocation.open('GET', url, true); //Opens the URL
        invocation.setRequestHeader("Authorization", "Token " + token); //For Authorisation with token
        invocation.onreadystatechange = function() {
            if(invocation.readyState == 4 && invocation.status == 200) {
                var results = JSON.parse(invocation.responseText);
                //iterate through all the repos
                for (var i=0 ; i < results.length ; i++)
                { 
                        console.log(" ".repeat(2*depth)+results[i]["name"]+' : '+results[i]["type"]); //Prints files inside Directory
                        if(results[i]["type"] === "dir"){
                            dir_info(url + '/' + results[i]["name"], depth+1)
                        }
                }
            }
        };

        invocation.send();
    }
}


//Takes repo id and prints all directories and files in the repo
function repo_info(id) {
    if(invocation) {    
        url = url+id+'/dir/' //For the URL of the repos inside the repo with given id
        invocation.open('GET', url, true); //Opens the URL
        invocation.setRequestHeader("Authorization", "Token " + token); //For Authorisation with token
        invocation.onreadystatechange = function() {
            if(invocation.readyState == 4 && invocation.status == 200) {
                var results = JSON.parse(invocation.responseText);
                //iterate through all the repos
                for (var i=0 ; i < results.length ; i++)
                { 
                        console.log(results[i]["name"]+' : '+results[i]["type"]); //Prints Repo Id and type of Repo
                        if(results[i]["type"] === "dir"){
                            dir_info(url + '?repo_id&p=/' + results[i]["name"],1) //prints files and directories inside the directory
                        }
                }
            }
        };

        invocation.send();
    }
}

repo_info("ed3d09f5-7904-4c46-9cc7-9d181991973f")
