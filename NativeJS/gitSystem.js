// define namespace
const githubApp = (function () {
    // private members
    let input;          // the user input
    let lastSearch;     // last search of the user
    const headers = {   // headers to send for the Ajax
        'Accept': 'application/json',
        'Content-type': 'application/json',
    };

    // the returned object
    let agit = {};

    agit.refresh = ()=> {
        input ="";
        lastSearch = undefined;
    }

    function urlFetch(url, init = null) {
        return fetch(url, init).then((response) => {
            if (response != 200) {
                throw Error(response.statusText);
            }
            return response.json();
        })
    }

    function searchInGitHub(name){
        urlFetch(`https://api.github.com/users/${input.value}`).then((user)=>{
                lastSearch = {
                    "username":user.login,
                    "html_url":user.html_url
                };
                document.getElementById('input-username').innerHTML= user.login;
            })


    }

    agit.searchUser = ()=> {
       input =  document.getElementById('name-text').value.trim();
       if(input ="") {
           setErrorMsg("Empty input detected.");
       }
       else {
           searchInGitHub(name);
       }

    }
    return agit;
})();

function setErrorMsg(value) {
    document.getElementById('error-msg').innerHTML = value;
    document.getElementById('error-msg').style.display = "block";
}
function clearErrorMsg() {
    document.getElementById('error-msg').innerHTML = "";
    document.getElementById('error-msg').style.display = "none";
}

document.addEventListener('DOMContentLoaded', (event) => {

   document.getElementById('ser-btn').addEventListener('click', (e) => {
        e.preventDefault();
        try {
            githubApp.searchUser();
        }
        catch(err) {
            setErrorMsg(err);
            githubApp.refresh();
        }
   });

});
