// Force scroll to top on reload (Aggressive Reset)
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Fallback for some browsers
setTimeout(() => {
    window.scrollTo(0, 0);
}, 10);

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.createElement("footer");
const copyright = document.createElement("p");

copyright.innerHTML = `&copy; Miguel Hernandez ${thisYear}`;
footer.appendChild(copyright);
document.body.appendChild(footer);

const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "HTML5",
    "CSS3",
    "Python",
    "Deep Learning",
    "Git",
    "Automation",
];

const skillsSection = document.getElementById("Skills");

if (skillsSection) {
    let skillsList = skillsSection.querySelector("ul");
    if (!skillsList) {
        skillsList = document.createElement("ul");
        skillsSection.appendChild(skillsList);
    }
    skills.forEach(skillText => {
        const skill = document.createElement("li");
        skill.innerText = skillText;
        skillsList.appendChild(skill);
    });
}

const messageForm = document.forms.leave_message;
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

// Initial state: hide messages if empty
if (messageList.children.length === 0) {
    messageSection.style.display = "none";
}

if (messageForm) {
    messageForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const usersName = event.target.usersName.value;
        const usersEmail = event.target.usersEmail.value;
        const usersMessage = event.target.usersMessage.value;

        // Logging for verification
        console.log("Submission:", { usersName, usersEmail, usersMessage });

        const newMessage = document.createElement("li");

        newMessage.innerHTML = `
            <a href="mailto:${usersEmail}">${usersName}</a>
            <span>${usersMessage}</span>
        `;

        const removeButton = document.createElement("button");
        removeButton.innerText = "remove";
        removeButton.type = "button";

        removeButton.addEventListener("click", () => {
            const entry = removeButton.parentNode;
            entry.remove();

            if (messageList.children.length === 0) {
                messageSection.style.display = "none";
            }
        });

        newMessage.appendChild(removeButton);
        messageList.appendChild(newMessage);

        messageSection.style.display = "block";
        messageForm.reset();
    });
}
