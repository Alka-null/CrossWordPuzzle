var currentSlide = 0;
var currentQuestionIndex =0
// var questionCells = {
//     "1":{
//         "question": "A famous doctor",
//         "answer": ""
//     },
//     "2":{
//         "question": "A large snake",
//         "answer": ""
//     },
//     "3":{
//         "question": "The largest city",
//         "answer": ""
//     }
// }
function populateQuestion(index){
    var questionContainer = document.querySelector('#questionIndex')
    questionContainer.innerText = index
    questionContainer.innerText = questionContainer.innerText + "  --  " + questionCells[index]['direction']

    // var direction = document.querySelector('#direction')
    // direction.innerText = questionCells[index]['direction']

    var questionBox = document.querySelector('#question')
    questionBox.innerText = questionCells[index]['question']
}
//populateQuestion(1)

function showSlide(index) {
    //const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = Object.keys(questionCells).length;;
    
    if (index > totalSlides) {
        currentSlide = 1;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    console.log(currentSlide)
    populateQuestion(currentSlide)
    const offset = -currentSlide * 100;
    //document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initialize the carousel
showSlide(currentSlide+1);
