// Creating a function that will be used to send a request to an API, converting the returned data into a JavaScript Object which can be used to print food images to the DOM
function foodGenerator(e) {
    // Starting an AJAX request and getting the object representation of the "loading" message so that two out of the three "if" statements can access this variable
    let ajax = new XMLHttpRequest();
    let loadingMessage = document.getElementById(`loadingMessage`);

    // Creating a function that will run when the network event finishes
    ajax.onreadystatechange = function() {
        // Creating a message that will tell the user if the request has not been initialized and if the page errors, whether that's a client or server error
        if(this.readyState == 0 && this.status >= 400) {
            let errorMessage = document.getElementById(`errorMessage`);
            errorMessage.innerText = `An error has occured.`;
            alert(`An error has occured.`);
        }

        // Creating a message that will tell the user when each image is loading and there are no errors
        if(this.readyState == 3 && this.status == 200) {
            loadingMessage.innerText = `The image is loading...`;
            alert(`The image is loading...`);
        }

        // Creating a function that will convert the returned data into a Javascript Object as a image-URL key-value pair, and use it to print each food image to the DOM once the network event has finished and there are no errors, "removing" the "loading" message from the DOM
        if(this.readyState == 4 && this.status == 200) {
            let foodObject = JSON.parse(this.responseText);
            let foodContainer = document.getElementById(`foodImageContainer`);
            foodContainer.innerHTML = `<img src="${foodObject.image}">`;
            loadingMessage.style.display = `none`;
        }
    }

    // Configuring the AJAX request
    ajax.open(`GET`, `https://foodish-api.herokuapp.com/api/`, true);

    // Sending the request
    ajax.send();
}

// Adding an click event will call a function that allows the user to generate random food images when the "generate" button is clicked
let foodButton = document.getElementById(`foodButton`);
foodButton.addEventListener(`click`, foodGenerator);

// ----- Note for Alex -----
// I put "alerts" in the conditionals along with printing the messages to the DOM because the time when the page is loading and has loaded is very fast so I put "alerts" in there to see if it actually runs through the conditional