const MESSAGES_KEY = 'messages';

function onFormSubmit(event) {
    // Preventing default submission
    event.preventDefault();

    let currentMessages = [];

    const email = document.getElementById('email').value;
    const fullName = document.getElementById('fullName').value;
    const message = document.getElementById('message').value;

    const nameObject = {
        email,
        fullName,
        message,
    };

    // Get any existing messages from session storage
    const messages = sessionStorage.getItem(MESSAGES_KEY);

    if (messages) {
        // If a message exists, lets store it as the current message as an object
        currentMessages = JSON.parse(messages);
    }

    // Add our form data to the current message
    currentMessages.push(nameObject);

    // Set session storage with current messages as a string
    sessionStorage.setItem(MESSAGES_KEY, JSON.stringify(currentMessages));

    convertMessagesToHtml();
}

function convertMessagesToHtml() {
    let currentMessages = [];
    let htmlItems = [];

    const messagesOutput = document.getElementById('messagesOutput');
    const deleteMessages = document.getElementById('deleteMessages');

    // Get any existing messages from session storage
    const messages = sessionStorage.getItem(MESSAGES_KEY);

    if (messages) {
        // If a message exists, lets store it as the current message as an object
        currentMessages = JSON.parse(messages);
        // If there are messages, show the delete button
        deleteMessages.style.display = 'block';
    } else {
        // If no messages, hide the delete button
        deleteMessages.style.display = 'none';
    }

    currentMessages.forEach((currentMessage) => {
        htmlItems.push(
            `<dt>${currentMessage.fullName} - ${currentMessage.email}</dt>
      <dd>${currentMessage.message}</dd>
      <br/>
      `
        );
    });

    messagesOutput.innerHTML = htmlItems.join('');
}

function deleteMessages(event) {
    if (sessionStorage.getItem(MESSAGES_KEY)) {
        sessionStorage.removeItem(MESSAGES_KEY);
        convertMessagesToHtml();
    }
}

convertMessagesToHtml();
