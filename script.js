//baseURL that you can find in API documentation
const baseURL = "https://api.thedogapi.com/v1/images/search"
//apikey if the documentation asks for it
const apiKEY = "live_y93U7zjeFdD5VZUgo84ipiCoRFbraPYtS2TYEUhrQ0XuykLld2n0DNC1fQ5OsGgC"
let dogInfo = ""
let dogFact

/*//fetch method, it's going to return you a Promise (js obj that represents an async func)
fetch(baseURL)
    .then(response => {
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        // Parse the JSON response
        return response.json()
    })
    .then(data => {
        // later can do smth with our data
        console.log(data.text);
        // catFactsData = data
        // catFactsData.forEach (catFact =>
        //     console.log(catFact.text))
    })
    .catch(error => {
        // Handle errors
        console.error('Fetch error:', error);
    }); */

    function fetchDog() {
        console.log("I fetch dog fact")
        fetch(baseURL, {
            headers: {
                "x-api-key": apiKEY
            }
        })
        //return promise
        .then(response => response.json())
        .then(data => {
            //even if we have only one fact is still return us an array so need to loop
            const dogData = data
            console.log(data)
            dogData.forEach(dog => {

                console.log("Dog image url " + dog.url)
                //console.log(dog.breeds.life_span)
                if (dog.breeds != []) {
                dog.breeds.forEach(breed => {
                    //also need to check if this information exists and not empty
                    dogInfo = `Breed: ${(breed.name ?? "Don't know")}. Live for ${(breed.life_span ?? "Don't know")}, height: ${(breed.height.metric ?? "Don't know")}m.`
                    dogFact = `Temperament: ${breed.temperament}`
                    
                    document.getElementById("dogInfo").textContent = dogInfo
                    document.getElementById("dogFact").textContent = dogFact
                } )
            } else {
                //dogInfo = ""
            }
                document.getElementById("dogImage").src = dog.url
            }); 
        })

        //catch errors
        .catch(error => {
            // Handle errors
            document.getElementById("dogFact").textContent = error
        });

        //finally 
    }

    document.getElementById("showDogButton").addEventListener("click", fetchDog)

    //to have one fact when the page is loaded
    fetchDog()