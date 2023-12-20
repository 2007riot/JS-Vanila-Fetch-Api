
function fetchCat () {
const catURL = "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2"
//fetch method, it's going to return you a Promise (js obj that represents an async func)


fetch(catURL)
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
        // console.log(data.text);
        // document.getElementById("catFact").textContent = data.text
        // catFactsData = data
        // catFactsData.forEach (catFact =>
        //     console.log(catFact.text))
        data.forEach(cat => {
            console.log(cat)
            document.getElementById("catFact").textContent = cat.text
        });
    })
    .catch(error => {
        // Handle errors
        console.error('Fetch error:', error);
    }); 

}

document.getElementById("giveMeCatFact").addEventListener("click", fetchCat)
