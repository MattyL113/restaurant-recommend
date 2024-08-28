//Vars
const personElement = document.getElementById("person");
const questionElement = document.getElementById("question");
const recoElement = document.getElementById("recommendation");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");
const imageElement = document.getElementById("image");
const addressElement = document.getElementById("address");
const ratingElement = document.getElementById("rating");
let currentQIndex = 0;
let currentPeopleIndex = 0;
let peopleNo = 2;
let storedAnswers = [[],[]];
let objAnswer;
let questions;
let personOneScore;
let personTwoScore;
let distance;
let cuisine;
let restaurant;

//Init
function init(){
    currentQuestionIndex = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//Fetch Questions to Display
fetchQuestions();

async function fetchQuestions() {
    const res = await fetch('http://localhost:3000/questions')
    questions = await res.json()
    showQuestion()
}

//Render Questions
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQIndex];
    let questionNo = currentQIndex + 1;
    let personTracker = currentPeopleIndex + 1;
    personElement.innerHTML = "Person " + personTracker + "'s turn to answer.";
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.label = answer.label;
        button.shortened = answer.shortenedAnswer;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
    })
}

//Check on state
function stateReadout() {
    console.log(`Current question index: ${currentQIndex}`);
    console.log(`Current people index: ${currentPeopleIndex}`);
    console.log(storedAnswers);
}

//Reset between each question
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Reflect selected states and capture the answer
function selectAnswer(evt) {
    Array.from(answerButtons.children).forEach(button => {
        button.classList.remove("answered")
    })
    const selectedBtn = evt.target;
    objAnswer = {
        label: selectedBtn.label,
        answer: selectedBtn.innerText,
        shortened: selectedBtn.shortened
    }
    selectedBtn.classList.add("answered")
    if (objAnswer.label && objAnswer.answer){
        nextButton.style.display = "block";
    }
}

//Event listener for 'next' and to store the answer
nextButton.addEventListener("click", ()=>{
    //add logic to check if objAnswer has an answer
    if (objAnswer.label && objAnswer.answer){
        storedAnswers[currentPeopleIndex].push(objAnswer);
    }
    handleNext();
})

//Handle 'next' option
function handleNext(){
    currentQIndex++;
    if(currentQIndex < questions.length){
        stateReadout();
        showQuestion();
    } else if (currentPeopleIndex < (peopleNo - 1)){
        currentPeopleIndex++;
        currentQIndex = 0;
        stateReadout();
        showQuestion();
    } else {
        nextButton.style.display = "none";
        submitButton.style.display = "block";
        console.log("We made it!")
        createScore();
    }
}

// Consolidate all the inputs into a score
function createScore(){
    personOneAnswers = storedAnswers[0];
    personTwoAnswers = storedAnswers[1];

    //Prioritize one person over the other type logic
    if (personOneAnswers[2].shortened === "immad" && personTwoAnswers[2].shortened !== "immad") {
        console.log("take p1 pref");
        cuisine = personOneAnswers[0].shortened;
        distance = personOneAnswers[1].shortened;
        readScore()
        return
    } else if (personTwoAnswers[2].shortened === "introuble" && personOneAnswers[2].shortened !== "introuble") {
        console.log("take p1 pref");
        cuisine = personOneAnswers[0].shortened;
        distance = personOneAnswers[1].shortened;
        readScore()
        return
    } else if (personTwoAnswers[2].shortened === "immad" && personOneAnswers[2].shortened !== "immad") {
        console.log("take p2 pref");
        cuisine = personTwoAnswers[0].shortened;
        distance = personTwoAnswers[1].shortened;
        readScore()
        return
    } else if (personOneAnswers[2].shortened === "introuble" && personTwoAnswers[2].shortened !== "introuble") {
        console.log("take p2 pref");
        cuisine = personTwoAnswers[0].shortened;
        distance = personTwoAnswers[1].shortened;
        readScore()
        return
    }

    //if cuisineType is the same
    if (personOneAnswers[0].shortened === personTwoAnswers[0].shortened) {
        cuisine = personOneAnswers[0].shortened
    } else {
    //50/50 decision on cuisinetype if no one person prioritized
        randNum = Math.round(Math.random())
        cuisine = storedAnswers[randNum][0].shortened;
    }

    //if distance is the same
    if (personOneAnswers[1].shortened === personTwoAnswers[1].shortened) {
        distance = personOneAnswers[1].shortened
    } else {
    //50/50 decision on distance if no one person prioritized
        randNum = Math.round(Math.random())
        distance = storedAnswers[randNum][1].shortened;
    }
    readScore();
}

function readScore() {
    console.log(cuisine);
    console.log(distance);
}

submitButton.addEventListener('click', handleFormSubmit)

async function handleFormSubmit(evt) {
    evt.preventDefault();

    const res = await fetch('http://localhost:3000/recommend', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ distance, cuisine }),
    })

    restaurant = await res.json();
    console.log('Restaurant is: ', restaurant);
    renderRestaurant();
}

function resetforReco() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    questionElement.style.display = "none";
    personElement.style.display = "none";
    submitButton.style.display = "none";
    }
}

function renderRestaurant() {
    resetforReco();
    if(restaurant !== "") {
        recoElement.innerHTML = restaurant.restaurant;
        addressElement.innerText = restaurant.address;
        ratingElement.innerHTML = restaurant.rating + ' Ratings across ' + restaurant.reviews + ' reviews.'
        imageElement.src = restaurant.image
        restartButton.style.display = "block";
    } else {
        recoElement.innerText = "No restaurant found that matched your criteria. Maybe try Mcdonalds?";
        restartButton.style.display = "block";
    }
}

restartButton.addEventListener('click', restart)

function restart() {
    location.reload()
}

init();