//strat the timer 
timer();
//prevent reload in exam time 
preventReloadInExam();
//control questions with left and right key 
controlInKeys();
//question function constructor
function Question(content, rightAnswer) {
  this.content = content;
  this.answers = []
  this.rightAnswer = rightAnswer;
  this.validation = false;
  this.checked = false;
}
//answers function constructor
function Answer(content) {
  this.content = content;
}
//add function in Question prototype to add answers
Question.prototype.addAnswer = function () {
  // this.answers.push(answer);
  for (var answer = 0; answer < arguments.length; answer++) {
    this.answers.push(arguments[answer]);
  }
}
//add right answer

Question.prototype.addRightAnswer = function (rightAnswer) {
  this.rightAnswer = rightAnswer;
}
//create questions
var q1 = new Question("What is the correct way to write a JavaScript array?")
  , q2 = new Question("How does a FOR loop start?")
  , q3 = new Question("How to insert a comment that has more than one line?")
  , q4 = new Question("The external JavaScript file must contain the <script> tag.")
  , q5 = new Question("What is the correct JavaScript syntax for opening a new window called \"w2\" ?")
  , q6 = new Question("JavaScript is the same as Java.")
  , q7 = new Question("How to write an IF statement for executing some code if \"i\" is NOT equal to 5?")
  , q8 = new Question("How do you call a function named \"myFunction\"?")
  , q9 = new Question("What is the correct JavaScript syntax to change the content of the HTML element below?")
q10 = new Question("Inside which HTML element do we put the JavaScript?")

q1.addAnswer(
  new Answer("var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")"),
  new Answer("var colors = \"red\", \"green\", \"blue\""),
  new Answer("var colors = [\"red\", \"green\", \"blue\"]"),
  new Answer("var colors = (1:\"red\", 2:\"green\", 3:\"blue\")")
)
q1.addRightAnswer(2)
// __________________
q2.addAnswer(
  new Answer("for i = 1 to 5"),
  new Answer("for (i = 0; i <= 5; i++)"),
  new Answer("for (i <= 5; i++)"),
  new Answer("for (i = 0; i <= 5)")
)
q2.addRightAnswer(1)
// ______________________
q3.addAnswer(
  new Answer("/*This comment has more than one line*/"),
  new Answer("//This comment has more than one line//"),
)
q3.addRightAnswer(0)
// _______________________
q4.addAnswer(
  new Answer("True"),
  new Answer("False"),
)
q4.addRightAnswer(1)
// _______________________
q5.addAnswer(
  new Answer("w2 = window.new(\"http://www.w3schools.com\");"),
  new Answer("w2 = window.open(\"http://www.w3schools.com\");"),
)
q5.addRightAnswer(1)
// _______________________
q6.addAnswer(
  new Answer("False"),
  new Answer("True"),
)
q6.addRightAnswer(0)
// ______________________
q7.addAnswer(
  new Answer("if (i != 5)"),
  new Answer("if (i <> 5)"),
  new Answer("if i =! 5 then"),
  new Answer("if i <> 5"),
)
q7.addRightAnswer(0)
// _______________________
q8.addAnswer(
  new Answer("myFunction()"),
  new Answer("call myFunction()"),
  new Answer("call function myFunction()"),
)
q8.addRightAnswer(0)
// _________________________
q9.addAnswer(
  new Answer("#demo.innerHTML = \"Hello World!\";"),
  new Answer("document.getElementById(\"demo\").innerHTML = \"Hello World!\";"),
  new Answer("document.getElement(\"p\").innerHTML = \"Hello World!\";"),
  new Answer("document.getElementByName(\"p\").innerHTML = \"Hello World!\";"),
)
q9.addRightAnswer(1)
// _________________________
q10.addAnswer(
  new Answer("&lt;javascript&gt;"),
  new Answer("&lt;script&gt;"),
  new Answer("&lt;js&gt;"),
  new Answer("&lt;scripting&gt;"),
)
q10.addRightAnswer(1)
// _______________________________________________________________________________________________________________________________________

//global array of questions
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10]
var checkedList = [];
//checked list

//global variable for question number
var questionCounter = 0;

//previous buttomn
var prevBtn = document.querySelector(".prev");
// next button
var NextBtn = document.querySelector(".next");
window.onload = function () {
  //shaffule the array (random numbers)
   questions.sort( () => .5 - Math.random());
   //draw the first question
  displayQuestion(questions[questionCounter])
  //handle first and last question i
  //if exam in first question make previous button (display none)
  //if in last question make next button (display none)
  nextAndPrev()

}

function displayQuestion(question) {
  var questionText = document.querySelector(".question-text");
  var answersContent = document.querySelector(".answers");
  var questionsHTML = "";
  questionText.innerHTML = question.content;
  answersContent.innerHTML = ""
  //make mark icon fill or not based on mark status
  changeIconStyle();
//looping over answers and return the all html of answers
  for (var answerIndex = 0; answerIndex < question.answers.length; answerIndex++) {
     //check if the answers had been checked befor or not 
     //if check make it checked if not do nothting 
  //  var checkedValue = (question.answers[answerIndex].checked == answerIndex + 1) ? "checked" : "";
    answersContent.innerHTML += drawAnswer(question.answers[answerIndex].content, "answer" + (answerIndex + 1), answerIndex + 1)
  }
   //append html answers in the answers container
  answersContent.append(questionsHTML)
  //add events listener to answers radio buttons 
  //if checked take actions 
  listenToAnswer();
  //display the question number
  displayNumber()
//if the answer already checked make it checked 
  checked()
  //handle buttons in  the first and last questions 
  nextAndPrev()

}
//change icon style
//if question marked make icon fill if not make icon unfilled
function changeIconStyle()
{
  if(isExistInChecked(questionCounter))
  {
    document.querySelector(".add-checked").firstChild.setAttribute("class","fa-5x fas fa-bookmark");
  }
  else {
    document.querySelector(".add-checked").firstChild.setAttribute("class","fa-5x far fa-bookmark");

  }
  }  

// draw answer
function drawAnswer(answerText, forAndId, id) {
  var answer = `
  <label for="${forAndId}">
  <input type="radio" name="question1" id="${forAndId}" data-id="${id}"  />
  <span class="first"></span>
  <span class="second">${answerText}</span>
</label>`;
  return answer;
}
//add events to next and previous btns to make thier actions 
NextBtn.addEventListener("click", nextBtnHandler)
prevBtn.addEventListener("click", prevBtnHandler)

//the handler of pervious btn 
// decrease the question number by one and display the new quetion 
function prevBtnHandler() {
  questionCounter--;
  displayQuestion(questions[questionCounter]);
  //handle btn in first and last question 
  nextAndPrev()
}

//next btn handler 
//increase the question number by one 
//draw the new queston
function nextBtnHandler() {
  questionCounter++;
  displayQuestion(questions[questionCounter]);
  //handle btns in the first and last question 
  nextAndPrev();
}



//handle the btns in the first and last questions 
//by making btns not visible in this questions 
function nextAndPrev() {
  if (questionCounter == 0) {
    prevBtn.style.visibility = "hidden";
  }
  else {
    prevBtn.style.visibility = "visible";
  }

  if (questionCounter == questions.length - 1) {
    NextBtn.style.visibility = "hidden";
  }
  else {
    NextBtn.style.visibility = "visible";
  }
}
//add events to answers 
function listenToAnswer() {
  //select all answers 
  document.querySelectorAll(".answers label input").forEach(function (element) {
    //add change event in every radio input
    element.addEventListener("change", function () {
      //make check property with the id of the selected questions 
      questions[questionCounter].checked = Number(this.dataset.id)-1 ;
      //if the selected answer == the right answer then make validation proberty true if not make it flase
      if (questions[questionCounter].rightAnswer == this.dataset.id) {
        questions[questionCounter].validation = true;
      }
      else {
        questions[questionCounter].validation = false;
      }
    })
  })
}

//timer handler
function timer()
{
  //select the progress bar 
  var bar = document.querySelector(".inner-bar")
var interval = 0
var countDown = setInterval(function () {
  interval++;
  var progesWidth = interval / 300 * 100;
  var minutes = Math.floor(interval / 60) || 0;
  var seconds = (interval - minutes * 60) || 0;
  drawCounter(minutes, seconds)
  if (interval !== 300) {
    bar.style.width = progesWidth + "%"
  }
  else {
    clearInterval(countDown);
    //finish the exam and show the result 
    submitHandler();
  }
}, 1000)
}

//draw the minutes and seconds in html
function drawCounter(m, s) {
  var countdown = document.querySelector(".timer");
  countdown.textContent = `${m}:${s}`
}

//display the number of question in html 
function displayNumber() {
  document.querySelector(".submit .controllers span").textContent = questionCounter + 1;
}



//check if the qustion number in question arry have propery checked with status true the make the radio input checked 
function checked() {
  var inputs = document.querySelectorAll("input[type='radio']")
  if (questions[questionCounter].checked || questions[questionCounter].checked===0) {
    inputs[Number(questions[questionCounter].checked)].checked = 'checked';
  }
}
//add question to check list
function addChecked(questionNumber) {
  if (isExistInChecked(questionNumber)) {
    return 0;
  }
  checkedList.push(questionNumber);
  drawCheckList()
}

//draw all the question in check array 
//we can apend and delete and we have not redraw it every time 
function drawCheckList() {
  var checkedContainer = document.querySelector('.checked-questions');
  checkedContainer.innerHTML = '';
  checkedList.forEach(function (element) {
    checkedContainer.innerHTML += (drawCheckedQuestion(element));
  })
}
//return checked question element
function drawCheckedQuestion(displayNumber) {
  return `<div data-index='${displayNumber}' onclick='gotoCheckedHandler(this,event)' >
question ${displayNumber + 1}
<div class="trash" onclick="deleteChecked(this)" id='${"checked-"+displayNumber}'><i class=" far fa-trash-alt"></i></div>

</div>`
}

//check if question exist in check list
function isExistInChecked(num) {
  for (var checkedIndex = 0; checkedIndex < checkedList.length; checkedIndex++) {
    if (checkedList[checkedIndex] == num) {
      return 1;
    }
  }
  return 0;
}

//add eventlistenger to add check icon
var addCheckedHandler = document.querySelector('.add-checked').addEventListener("click", function () {
  if( document.querySelector(".add-checked").firstChild.getAttribute('class')=="fa-5x fas fa-bookmark")
  {
    document.querySelector(".add-checked").firstChild.setAttribute("class","fa-5x far fa-bookmark");
    deleteChecked(document.querySelector("#checked-"+questionCounter));
  }
  else 
  {
    document.querySelector(".add-checked").firstChild.setAttribute("class","fa-5x fas fa-bookmark");
    addChecked(questionCounter)
  }
})


// select checked
function gotoCheckedHandler(element,event) {
  if(event.target==element)
  {
    questionCounter = Number(element.dataset.index);
    displayQuestion(questions[element.dataset.index])
  }

}
//delete checked handler
function deleteChecked(element) {
  var qNum = element.parentElement.dataset.index;
  checkedList.splice(checkedList.indexOf(Number(qNum)), 1);
  element.parentElement.remove()
}

//control left and right arrow key 
function controlInKeys()
{
  window.onkeydown = function (event) {
    if (event.key == "ArrowLeft" && questionCounter > 0) {
      prevBtnHandler();
    }
    if (event.key == "ArrowRight" && questionCounter < questions.length - 1) {
      nextBtnHandler();
    }
  }
}
//finish the exam and show result
function submitHandler() {
  var grade=calcGrade();
  drawGrade(grade);
}
//calculates grade
function calcGrade() {
  var grade = 0;
  var question;

  for (var questionIndex = 0; questionIndex < questions.length; questionIndex++) {
    question = questions[questionIndex];

    if (question.rightAnswer === question.checked) {
      grade++
    }

  }
return  grade

}
//draw calculated grade
function drawGrade(grade)
{
  document.querySelector('.container').style.display="none";
  document.querySelector(".result").style.display='block';
  document.querySelector(".grade").textContent=`${grade}/${questions.length}`
}

function preventReloadInExam()
{
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
  {
    window.location.href='/'
  }
  window.onbeforeunload=function(){
    return false;
  }
}

// handling icon bar
function iconBarHandler(element)
{
document.querySelector(".mark-list").classList.toggle("responsive-bar");
if(document.querySelector(".mark-list").className.split(' ')[1]=="responsive-bar")
{
  element.firstChild.setAttribute("class","fa-3x fas fa-times")
}
else {
  element.firstChild.setAttribute("class","fa-3x fas fa-bars")
}
}
function drawNameInHTML()
{
  var name =localStorage.getItem("name")
   document.querySelector(".name").textContent=name;
}
drawNameInHTML()