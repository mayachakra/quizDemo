const nameForm = document.getElementById("name-form");
const nameEntered = document.getElementById("name-input");
let NAME = "";
const welcomeMessage = document.getElementById("welcome-container");
const welcomeTemplate = Handlebars.compile(document.getElementById("welcome-template").innerHTML);

var currentQuest=-1;
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const answerContainer = document.getElementById("answer-container");

const questionTemp = Handlebars.compile(document.getElementById("question-template").innerHTML);
const choiceTemp = Handlebars.compile(document.getElementById("choices-template").innerHTML);

//new code

let score = 0;
const nextQuestButton = document.getElementById("answered");
const resultsMessage = document.getElementById("results-container");
const correctAnswer = document.getElementsByName("answer");

const quiz1HTML = document.getElementById('html'); 
const quiz2Java = document.getElementById('java'); 
//new code

const quizSelectButton = document.getElementById('next');
let userSelect = null;
const quizTitle = document.getElementById('quiz-title');


//java quiz
const javaQuest = [
    {
        question: "What is not a type of loop?",
        choice: ["For loop", "While loop", "If loop"],
        correctchoice: "If loop"
        //add explanation

    },

    {
        question: "What is the correct syntax to print 'Hello World' in Java?",
        choice: ["print('hello world');", "System.out.println('hello world');", "echo('hello world');"],
        correctchoice: "print('hello world');"
    },

    {
        question: "Which of these coding segments outputs a value of 2?",
        choice: ["img1", "img2", "img3"],
        correctchoice: "img2"

    },

    {
        question: "What is the correct syntax to print 'Hello World' in Java?",
        choice: ["print('hello world');", "System.out.println('hello world');", "echo('hello world');"]
    },  
    
    {
        question: "What is not a type of loop?",
        choice: ["For loop", "While loop", "If loop"],
        correctchoice: "If loop"

    }


];


//html quiz
const htmlQuest = [
    {
        question: "What can be used to write javascript in an html file?",
        choice: ["<src>", "<script>", "<br>"],
        correctchoice: "<script>"
        //add explanation

    },

    {
        question: "What is the correct syntax to print 'Hello World' in Java?",
        choice: ["print('hello world');", "System.out.println('hello world');", "echo('hello world');"],
        correctchoice: "print('hello world');"
    },

    {
        question: "Which of these coding segments outputs a value of 2?",
        choice: [
            {src: ".jpg", alt:"" },
            {src: ".jpg", alt:"" },
            {src: ".jpg", alt:"" }
        ],
        correctchoice: "img2"

    },

    {
        question: "What is the correct syntax to print 'Hello World' in Java?",
        choice: ["print('hello world');", "System.out.println('hello world');", "echo('hello world');"]
    },  
    
    {
        question: "What is not a type of loop?",
        choice: ["For loop", "While loop", "If loop"],
        correctchoice: "If loop"

    }


];

function startQuiz(){
    const selectedQuiz = document.querySelector('input[name="fav_language"]:checked');
    if (selectedQuiz){
        userSelect = selectedQuiz.value == 'html' ?  htmlQuest : javaQuest;
        welcomeMessage.style.display = 'none';
        welcomeTemplate.style.display = 'block';
        renderQuest();
    }else{
        alert('You must select a quiz to continue');
    }
}


function ask_quiz(){
    welcomeMessage.remove();
    var data = {
        question: "Which quiz would you like to select?",
        list:[
            {choice: "Java"},
            {choice: "HTML"}
        ],

    };
    //put in fake api
    var template = Handlebars.compile(document.querySelector("#quizprompt").innerHTML);
    var filled = template(data);
    document.querySelector("#displaychoice").innerHTML = filled;
}


//to check for each type of quiz

function renderQuest(){
    welcomeMessage.remove();
    nameForm.remove();
    const selectedQuiz = document.querySelector('input[name="fav_language"]:checked');
    //const currentQuiz = selectedQuiz[currentQuestion];
    /*how to check for certain quiz
    quizTitle.textContent = currentQuiz.question;
    questionContainer.innerHTML = questionTemp(question);
    choicesContainer.innerHTML = choiceTemp(question);
    */
   //check this
    
    if (selectedQuiz == 'java'){
        const question = javaQuest[currentQuest];
        //doesnt go to the javaquest
        questionContainer.innerHTML = questionTemp(question);
        choicesContainer.innerHTML = choiceTemp(question);

    }else{
        const question = htmlQuest[currentQuest];
        questionContainer.innerHTML = questionTemp(question);
        choicesContainer.innerHTML = choiceTemp(question);

    }
    
    //const question = javaQuest[currentQuest];
    //questionContainer.innerHTML = questionTemp(question);
    //choicesContainer.innerHTML = choiceTemp(question);

  

}

function answerCheck(){
    //new code
    let selectedAnswer = 0;

    correctAnswer.forEach(answer =>{
        if(answer.checked){
            selectedAnswer = answer.value;
        }
    });
//goes to next page but does not display score or check display wrong choice message

//check bc this is only for java quests NOT HTML so add HTML
    if (selectedAnswer === javaQuest[currentQuest].correctchoice){
        score++;
        resultsMessage.textContent= 'Correct!'; //make red in css with results-container
        setTimeout(function(){
            resultsMessage.style.display = 'none';
        }, 1000);
        //result-container message .textContent = ''; //for correct
    }else{
        resultsMessage.textContent= 'Unfortunately, this is incorrect. The correct choice was ' + javaQuest[currentQuest].correctchoice;
        //add explanation
        //check if you need to use
        //AWAIT/ASYNC
        setTimeout(function(){
            resultsMessage.style.display = 'none';
        }, 1000);
    }
    //new code

    currentQuest++;
    //currentQuest++;
//only goes to next question after #1
    if(currentQuest < javaQuest.length){
        renderQuest();
    }
    else{
        displayResult();
    }
/*
    if (correctAnswer){
        userAnswer = correctAnswer.value();
        if( userAnswer = javaQuest.correctchoice){
            currentQuest++;
            renderQuest();
        }else{
            answerContainer.innerHTML = "The correct choice was ";{correctchoice};

        }
}
*/
}

//new code
function displayResult(){
    questionContainer.innerHTML = "";
    resultsMessage.textContent = 'You scored a ${score} out of ${javaQuest.length}';
}

nameForm.addEventListener("submit", function(){
    event.preventDefault();
    nameForm.remove();
    NAME = nameEntered.value;
    const username = nameEntered.value;
    const nameInfo = {name: username};
    const welcomeHTML = welcomeTemplate(nameInfo);
    welcomeMessage.innerHTML = welcomeHTML;

    document.getElementById("next").addEventListener("click",function(){
    alert("The Quiz will now begin");
    console.log(renderQuest());
    //startQuiz();
    renderQuest();
        if(currentQuest < javaQuest.length - 1){
            currentQuest++;
            renderQuest();
            //with button click checks question
            //why does this only work with ONE question, not all??
            document.getElementById("answered").addEventListener("click", function(){
                answerCheck(correctAnswer);
            });

            //newcode
        }
        else{
            questionContainer.innerHTML = "Congratulations! You completed the quiz!";
            choicesContainer.innerHTML = "";
        }

    
    });

    

});



//ask about rest API, if i have it or its needed, JSON placeholder?
//is it 5 questions for each quiz


//remember to add remove elements after button clicks
//fix choices

//add scoreboard w students name
//implement system to track, counter for each correct each not
//retake or return to main options
//host with netlify


