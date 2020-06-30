//author: Jahnvi
//Date: 29-05-20

var token = prompt("Please enter your token (Token can be obtained by running command \"curl -d 'username=username@example.com&password=123456' https://cloud.iitmandi.ac.in/api2/auth-token/\""); // Taking token as input
var repo_id = prompt("Please enter your repo_id in which you want to make a search (You can find your repos listed on https://cloud.iitmandi.ac.in/api2/repos/)"); // Taking repo_id as input
var search_file = prompt("Please enter File_name that you want ti search"); // Taking File_name as input

var invocation = new XMLHttpRequest(); //Creates XMLHttpRequest Object to create Http Requests.
var url = 'https://cloud.iitmandi.ac.in/api2/repos/'; //URL to all the repos

//Takes path of directory and depth of directory and prints all directories and files in the directory
function dir_info(url, depth, url_print , search_file) {
    if(invocation) {    
        invocation.open('GET', url, true); //Opens the URL
        invocation.setRequestHeader("Authorization", "Token " + token); //For Authorisation with token
        invocation.onreadystatechange = function(){
            if(invocation.readyState == 4 && invocation.status == 200) {
                var results = JSON.parse(invocation.responseText);
                //iterate through all the repos
                for (var i=0 ; i < results.length ; i++)
                { 
                    if(results[i]["name"] === search_file){
                        console.log(url_print); //Prints URL of found File
                    if(results[i]["type"] === "dir"){
                        dir_info(url + '/' + results[i]["name"], depth+1,url_print+results[i]["name"]+'/', search_file) //Looks the file in the inside directories
                    }
                }
            }
        };

        invocation.send();
    }
} 

//Takes repo id and prints all directories and files in the repo
function repo_info(id, search_file) {
    if(invocation) {    
        url = url+id+'/dir/' //For the URL of the repos inside the repo with given id
        url_print = "https://cloud.iitmandi.ac.in/library/ed3d09f5-7904-4c46-9cc7-9d181991973f/My%20Library/";
        invocation.open('GET', url, true); //Opens the URL
        invocation.setRequestHeader("Authorization", "Token " + token); //For Authorisation with token
        invocation.onreadystatechange = function() {
            if(invocation.readyState == 4 && invocation.status == 200) {
                var results = JSON.parse(invocation.responseText);
                //iterate through all the repos
                for (var i=0 ; i < results.length ; i++)
                { 
                        if(results[i]["name"] === search_file){
                            console.log(url_print); //Prints URL of found File
                        }
                        if(results[i]["type"] === "dir"){
                            dir_info(url + '?repo_id&p=/' + results[i]["name"],1, url_print+results[i]["name"]+'/', search_file) //Looks the file in the inside directories
                        }
                }
            }
        };

        invocation.send();
    }
}

repo_info(repo_id, search_file)