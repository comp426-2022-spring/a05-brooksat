// Focus div based on nav button click
const home_nav = document.getElementById("homenav")
const single_nav = document.getElementById("singlenav")
const multi_nav = document.getElementById("multinav")
const guess_nav = document.getElementById("guessnav")

home_nav.addEventListener("click", home)
single_nav.addEventListener("click", single)
multi_nav.addEventListener("click", multi)
guess_nav.addEventListener("click", guess)

function home() {
    document.getElementById("home").setAttribute("class", "active")
    document.getElementById("single").setAttribute("class", "hidden")
    document.getElementById("multi").setAttribute("class", "hidden")
    document.getElementById("guess").setAttribute("class", "hidden")
}
function single() {
    document.getElementById("home").setAttribute("class", "hidden")
    document.getElementById("single").setAttribute("class", "active")
    document.getElementById("multi").setAttribute("class", "hidden")
    document.getElementById("guess").setAttribute("class", "hidden")
}
function multi() {
    document.getElementById("home").setAttribute("class", "hidden")
    document.getElementById("single").setAttribute("class", "hidden")
    document.getElementById("multi").setAttribute("class", "active")
    document.getElementById("guess").setAttribute("class", "hidden")
}
function guess() {
    document.getElementById("home").setAttribute("class", "hidden")
    document.getElementById("single").setAttribute("class", "hidden")
    document.getElementById("multi").setAttribute("class", "hidden")
    document.getElementById("guess").setAttribute("class", "active")
}


// Flip one coin and show coin image to match result when button clicked

// button for single coin flip
const coin = document.getElementById("coin")
// add event listener for a coin button
coin.addEventListener("click", flipCoin)

function flipCoin() {
    fetch('http://localhost:5000/app/flip/')
    .then(function(response) {
    return response.json();
    })
    .then(function(result) {
      console.log(result);
      document.getElementById("result").innerHTML = result.flip;
      document.getElementById("quarter").setAttribute("src", "./assets/img/"+result.flip+".png");
      //coin.disabled = true
    })
}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
const coins = document.getElementById("coins")
			// Add event listener for coins form
			coins.addEventListener("submit", flipCoins)
			// Create the submit handler
			async function flipCoins(event) {
                // turn off url change from submit
				event.preventDefault();
                // Building URL
				const endpoint = "app/flip/coins/"
				const url = document.baseURI+endpoint
                
                // Grabs from event itself
				const formEvent = event.currentTarget

				try {
					const formData = new FormData(formEvent);
                    // primary action
					const flips = await sendFlips({ url, formData });

					console.log(flips);
					document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
					document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
				} catch (error) {
					console.log(error);
				}
			}
			// Create a data sender request object
			async function sendFlips({ url, formData }) {
				const plainFormData = Object.fromEntries(formData.entries());
				const formDataJson = JSON.stringify(plainFormData);
				console.log(formDataJson);

                const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: formDataJson
			};
            // primary
			const response = await fetch(url, options);
			return response.json()
        }
// Guess a flip by clicking either heads or tails button

const guess_queen = document.getElementById("guess_flip")

guess_queen.addEventListener("submit", guessFlip)

async function guessFlip(event) {
        // turn off url change from submit
        event.preventDefault();
        // Building URL
        const endpoint = "app/flip/call/"
        const url = document.baseURI+endpoint
        // Grabs from event itself
        const formEvent = event.currentTarget
        try {
            const formData = new FormData(formEvent);
            console.log(formData)
            // primary action
            var game = await sendGuess({ url, formData });
            document.getElementById("guess_results").innerHTML = "guess: "+game;
        
        } catch (error) {
            console.log(error);
        }
}

async function sendGuess({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
	const formDataJson = JSON.stringify(plainFormData);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    }
    const response = await fetch(url, options)
    return response.json()
}

