///////////////
// Variables //
///////////////
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];





///////////////
// Listeners //
///////////////
eventListeners();

function eventListeners() {
	// When the user attach a new tweet
	formulario.addEventListener('submit', agregarTweet);

	// When the document is ready
	document.addEventListener('DOMContentLoaded', () => {
		// Get the localStorage tweets and if the localStorage throws "null" then set equal to an empty array
		tweets = JSON.parse(localStorage.getItem('tweets') || []);
		
		createHTML();

	});

}








/////////////
// Eventos //
/////////////

// Add tweet
function agregarTweet(e) {
	e.preventDefault();

	// TextArea (Where the tweet is written) & the value of this
	const tweet = document.querySelector('#tweet').value;


	// empty text validation
	if (tweet === '') {
		raiseError('Un tweet no puede ir vacio');
		return; // This return prevents the code from running

	} 

	const tweetObj = {
		id: Date.now(),
		tweet
	}

	// put the tweet into the array (tweets)
	tweets = [...tweets, tweetObj];
	

	// Creating the HTML for show the array
	createHTML();


	// reboot form
	formulario.reset();


}



// raise an error
function raiseError(message) {
	// Creating the error paragraph
	const errorMessage = document.createElement('p');
	errorMessage.textContent = message;
	errorMessage.classList.add('error');

	// This is the parent where the paragraph will be inserted
	const contenido = document.querySelector('#contenido');

	// Inserting the error message in the HTML
	contenido.appendChild(errorMessage);

	// hide the error after several seconds
	setTimeout(() => {errorMessage.remove();}, 3000);

}



// Show a array of tweets
function createHTML() {
	cleanHTML();
	if (tweets.length > 0) {
		tweets.forEach( (t) => {
			// Create delete btn
			const deleteBtn = document.createElement('a');
			deleteBtn.classList.add('borrar-tweet');
			deleteBtn.innerText = 'X';

			// Add delete function to deleteBtn
			deleteBtn.onclick = () => {
				deleteTweet(t.id);
			}

			// Create the HTML
			const li = document.createElement('li');

			// add text
			li.innerText = t.tweet;

			// Add delete btn
			li.appendChild(deleteBtn);

			// insert into HTML
			listaTweets.appendChild(li);



		});
	}

	syncStorage();




}


// Delete tweet
function deleteTweet(id) {
	tweets = tweets.filter( tweet => tweet.id !== id);
	
	createHTML();


}




// Add the actual tweets to localStorage
function syncStorage() {

	localStorage.setItem('tweets', JSON.stringify(tweets));
}


// Clean the HTML
function cleanHTML() {
	while (listaTweets.firstChild) {
		listaTweets.removeChild(listaTweets.firstChild);
	}
}









