//baseURL that you can find in API documentation
const baseURL = "https://api.thedogapi.com/v1/images/search"
//apikey if the documentation asks for it
const apiKEY = "live_y93U7zjeFdD5VZUgo84ipiCoRFbraPYtS2TYEUhrQ0XuykLld2n0DNC1fQ5OsGgC"
let dogInfo = ""
let dogFact = ""

function fetchDog() {
    console.log("I fetch a dog")
    fetch(baseURL, {
        headers: {
            "x-api-key": apiKEY
        }
    })
        .then(response => {
            if (response.ok) {
                console.log("Response status " + response.status)
                return response.json()
            } else {
                throw new Error(`Request failed with status: ${response.status}`)
            }
        })
        .then(data => {
            //even if we have only one fact is still return us an array so need to loop
            const dogData = data
            console.log("Data: ")
            console.log(data)
            dogData.forEach(dog => {

                if (dog.breeds != []) {
                    dog.breeds.forEach(breed => {
                        //also need to check if this information exists and not empty
                        dogInfo = `Breed: ${(breed.name ?? "Don't know")}. Live for ${(breed.life_span ?? "Don't know")}, height: ${(breed.height.metric ?? "Don't know")}m.`
                        dogFact = `Temperament: ${breed.temperament}`

                        document.getElementById("dogInfo").textContent = dogInfo
                        document.getElementById("dogFact").textContent = dogFact
                    })
                } else {
                    dogInfo = "No info to load"
                    document.getElementById("dogInfo").textContent = dogInfo
                    document.getElementById("dogFact").textContent = dogInfo
                }
                document.getElementById("dogImage").src = dog.url
            });
        })

        //catch errors
        .catch(error => {
            // Handle errors
            document.getElementById("dogFact").textContent = "Something went wrong. Developer fucked up((("
            console.log(error)
        });
}

document.getElementById("showDogButton").addEventListener("click", fetchDog)

//to have one fact when the page is loaded
fetchDog()