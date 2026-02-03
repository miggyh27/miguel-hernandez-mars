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

    // Ensure ul exists for robustness
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
