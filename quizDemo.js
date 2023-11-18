const nameForm = document.getElementById("name-form");
const nameEntered = document.getElementById("name-input");
let NAME = "";
const welcomeMessage = document.getElementById("welcome-container");
const welcomeTemplate = Handlebars.compile(document.getElementById("welcome-template").innerHTML);
var namecount = 0;
let selectedQuiz = '';


const sessionStorage = window.sessionStorage;
sessionStorage.setItem("quizNameCheck","dummy");


let quizNameCheck = '';

let selectedAnswer = 0;
let currentQuest=-1;
const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const answerContainer = document.getElementById("answer-container");


const questionTemp = Handlebars.compile(document.getElementById("question-template").innerHTML);
const choiceTemp = Handlebars.compile(document.getElementById("choices-template").innerHTML);

let score = 0;
//const nextQuestButton = document.getElementById("answered");
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
        correctchoice: "System.out.println('hello world');"
    },


    {
        question: "If I want my input to be stored in a variable, which data type will hold it?",
        choice: ["inputString", "String", "Text"],
        correctchoice: "String"


    },

    {
        question: "What OOP mean in Java?",
        choice: ["Object Oriented Programming", "Object Oriented Processing", "Object Operations Programming"],
        correctchoice: "Object Oriented Programming"
    },  
    
    {
        question: "Riley is writing Java code but need to temporarily hide some code by commenting it out. How would Riley do this?",
        choice: ["//this", "/*this", "<!--"],
        correctchoice: "//this"
//make thiis narrative bases with text response
    }


];


//html quiz
const htmlQuest = [
    {
        question: "What can be used to write javascript in an html file?",
        choice: ["<src>", "<script>", "<br>"],
        correctchoice: "<script>"


    },


    {
        question: "What does HTML stand for?",
        choice: ["Helpful Text Markup Language", "Hyper Text Markup Language", "Helpful Tools Machine Language"],
        correctchoice: "Hyper Text Markup Language"
    },


    {
        question: "Which of these is would be coded using the <form> tag?",
        choice: ["Entering a name", "Aligning items", "Making a new page"],
        correctchoice: "Entering a name"


    },


    {
        question: "What do you use to close out a tag?",
        choice: ["/", "'-", ";"],
        correctchoice: "/"
    },  
    
    {
        question: "Katie wants to make a navigation bar on her website. How can she do this?",
        choice: ["nav, ul, li", "div ul li", "div ol li"],
        correctchoice: "nav, ul, li"


    }


];


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


function renderQuest(){
    if (namecount == 0){
        selectedQuiz = document.querySelector('input[type=radio]:checked');
        //console.log(selectedQuiz.value)
        sessionStorage.setItem("quizNameCheck",selectedQuiz.value);
        namecount++
    }
    
    console.log("renderQuest() inside")
    if (sessionStorage.getItem("quizNameCheck") == 'Java'){
        const question = javaQuest[currentQuest];
        questionContainer.innerHTML = questionTemp(question);
        choicesContainer.innerHTML = choiceTemp(question);
       


    }else{
        const question = htmlQuest[currentQuest];
        questionContainer.innerHTML = questionTemp(question);
        choicesContainer.innerHTML = choiceTemp(question);


    }

    console.log("currentQuest value: " + currentQuest)

    /*
    document.getElementById("answered").addEventListener("click", function(){
        setTimeout(function(){
            nextQuestion();
        }, 3000);
        });
        */
}

function answerCheck2(){//html
    //new code
    resultsMessage.style.display = 'block';

    //console.log("TEST" + correctAnswer);

    correctAnswer.forEach(answer =>{
        if(answer.checked){
            selectedAnswer = answer.value;
        }
    });
    console.log("1"+selectedAnswer)

//goes to next page but does not display score or check display wrong choice message
 
    var htmlCorrect = htmlQuest[currentQuest].correctchoice;
    console.log("2"+htmlCorrect)

    if (selectedAnswer === htmlCorrect){
        score++;
        resultsMessage.textContent= 'Correct!';
        setTimeout(function(){
            resultsMessage.style.display = 'none';
        }, 1500);
        //result-container message .textContent = ''; //for correct
    }
    else{ 
        resultsMessage.textContent= 'Unfortunately, this is incorrect. The correct choice was ' + htmlCorrect;
        setTimeout(function(){
            resultsMessage.style.display = 'none';
        }, 1500);
        
    }


//only goes to next question after #1
    if(currentQuest == htmlQuest.length - 1){
        console.warn("DDD");
        displayResult();
    }

    if(currentQuest < htmlQuest.length){
        console.log("htmlQuest: " + htmlQuest.length)
        console.log("Line 258 calling renderQuest()")
        setTimeout(
            renderQuest, 2000
        );
    }
   
    //currentQuest++;
}


//java quiz answer check
function answerCheck(){//java
    resultsMessage.style.display = 'block';
    //console.log("TEST" + correctAnswer);
    correctAnswer.forEach(answer =>{
        if(answer.checked){
            selectedAnswer = answer.value;
        }
    });
    console.log("1"+selectedAnswer)

//goes to next page but does not display score or check display wrong choice message
    var javaCorrect = javaQuest[currentQuest].correctchoice;
    console.log("2"+javaCorrect)

    if (selectedAnswer === javaCorrect){
        score++;
        resultsMessage.textContent= 'Correct!'; //make red in css with results-container
        setTimeout(function(){
            resultsMessage.style.display = 'none';
        }, 1500);
        //result-container message .textContent = ''; //for correct
    }
    else{ 
        resultsMessage.textContent= 'Unfortunately, this is incorrect. The correct choice was ' + javaCorrect;
        setTimeout(function(){
            resultsMessage.style.display = 'none';
        }, 1500);
        
    }
//only goes to next question after #1 
if(currentQuest == javaQuest.length - 1){
    console.warn("DDD");
    displayResult();
}

if(currentQuest < javaQuest.length){
    console.log("htmlQuest: " + javaQuest.length)
    console.log("Line 258 calling renderQuest()")
    setTimeout(
        renderQuest, 3000
    );
}

    //currentQuest++;
}


function nextQuestion(){
    let selectedQuizCheck = '';
    selectedQuizCheck = document.querySelector('input[type=radio]:checked');
    
        if (sessionStorage.getItem("quizNameCheck") == 'Java'){
            answerCheck(correctAnswer); //for java
            currentQuest++;
            //when it does ++ it skips to next
     
        }else{
            answerCheck2(correctAnswer); //for html
           // while(answerCheck2(correctAnswer) > htmlQuest.length){
            currentQuest++;
           // }
           // currentQuest++;
        
        }
    
        
}


//new code
function displayResult(){
    console.warn("QUIZ HAS FINISHED");
    questionContainer.innerHTML = "Congratulations! You completed the quiz! Lets see your results...";
    choicesContainer.innerHTML = "";
    setTimeout(function(){
        resultsMessage.style.display = 'block'
        resultsMessage.textContent = "You scored a "+ score + " out of 5";
    }, 5000);
    document.getElementById("answered").remove();
    //document.getElementById("results-container").innerHTML = score;
}


nameForm.addEventListener("submit", function(){
    event.preventDefault();
    nameForm.remove();
    NAME = nameEntered.value;
    const username = nameEntered.value;
    const nameInfo = {name: username};
    const welcomeHTML = welcomeTemplate(nameInfo);
    welcomeMessage.innerHTML = welcomeHTML;
    selectedQuiz = document.querySelector('input[id="lang"]:checked');


    document.getElementById("next").addEventListener("click",function(){
        alert("The Quiz will now begin");
        currentQuest++;
        renderQuest();
    //to get rid of welcome template
        welcomeMessage.innerHTML = "";
    });


});

const quizContainer = document.getElementById('quiz-container');
// Fetching quiz questions from JSONPlaceholder API (Assuming the /posts endpoint holds quiz data)



fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
        response.json()
        console.log('Fetched quiz questions:', renderQuest());
        renderQuest();

  });

