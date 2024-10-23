// Question and Response Handling
let questions = [];
let currentQuestionIndex = null;

// Reference to DOM elements
const questionForm = document.getElementById('question-form');
const questionList = document.getElementById('question-list');
const rightPane = document.getElementById('right-pane');

// User Story 2: Add question when form is submitted
questionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const questionText = document.getElementById('question').value;
    
    const newQuestion = {
        title: title,
        question: questionText,
        responses: []
    };
    
    questions.push(newQuestion);
    renderQuestions();
    resetForm();
});

function resetForm() {
    document.getElementById('title').value = '';
    document.getElementById('question').value = '';
}

// User Story 3: Display question with response form when a question is clicked
function renderQuestions() {
    questionList.innerHTML = '';
    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.textContent = question.title;
        li.addEventListener('click', () => displayQuestion(index));
        questionList.appendChild(li);
    });
}

function displayQuestion(index) {
    currentQuestionIndex = index;
    const question = questions[index];
    
    rightPane.innerHTML = `
        <h3>${question.title}</h3>
        <p>${question.question}</p>
        <h4>Responses:</h4>
        <ul id="response-list">
            ${question.responses.map(response => `<li><strong>${response.name}</strong>: ${response.comment}</li>`).join('')}
        </ul>
        <form id="response-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <br>
            <label for="comment">Comment:</label>
            <textarea id="comment" name="comment" required></textarea>
            <br>
            <button type="submit">Submit Response</button>
        </form>
        <button id="resolve-button">Resolve</button>
    `;

    // User Story 4: Handle response submission
    document.getElementById('response-form').addEventListener('submit', handleResponse);

    // User Story 5: Handle resolve button
    document.getElementById('resolve-button').addEventListener('click', resolveQuestion);
}

function handleResponse(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const newResponse = {
        name: name,
        comment: comment
    };
    
    questions[currentQuestionIndex].responses.push(newResponse);
    displayQuestion(currentQuestionIndex); // Refresh the question with new response
}

function resolveQuestion() {
    questions.splice(currentQuestionIndex, 1);
    renderQuestions();
    // Display the default question form again
    rightPane.innerHTML = `
        <div id="question-form-container">
            <h3>Ask a Question</h3>
            <form id="question-form">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>
                <br>
                <label for="question">Question:</label>
                <textarea id="question" name="question" required></textarea>
                <br>
                <button type="submit">Submit Question</button>
            </form>
        </div>
    `;

    // Reattach the event listener for the form
    document.getElementById('question-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const questionText = document.getElementById('question').value;
        
        const newQuestion = {
            title: title,
            question: questionText,
            responses: []
        };
        
        questions.push(newQuestion);
        renderQuestions();
        resetForm();
    });
}
