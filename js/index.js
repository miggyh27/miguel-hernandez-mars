// Force scroll to top on reload (Aggressive Reset)
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Typing Effect for Hero
// Typing Effect for Hero
const designationElement = document.querySelector('.designation');
if (designationElement) {
    const text = designationElement.innerText;
    designationElement.innerText = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            designationElement.innerText += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50 + Math.random() * 30);
        }
    }

    // Start typing after a small delay
    setTimeout(typeWriter, 500);
}

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
    "Python (FastAPI, async patterns, multi-agent systems)",
    "TypeScript/JavaScript (Next.js, React, real-time applications)",
    "PostgreSQL, Redis (production data architecture)",
    "LLM Integration (GPT-5, Gemini 2.0, DeepSeek)",
    "Multi-agent orchestration (LangGraph, OpenAI Agents SDK)",
    "RAG systems (embeddings, vector search, context retrieval)",
    "Real-time systems (WebSocket, SSE, pub/sub)",
    "Options strategies, DEX integration, risk systems",
    "E-commerce operations (Shopify, Google Ads)",
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

// Message Form Handling
if (messageForm) {
    messageForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const usersName = event.target.usersName.value;
        const usersEmail = event.target.usersEmail.value;
        const usersMessage = event.target.usersMessage.value;

        // Log for verification (Lesson 12 Requirement)
        console.log("Form Submission:", { usersName, usersEmail, usersMessage });

        const newMessage = createMessageElement(usersName, usersEmail, usersMessage);

        messageList.appendChild(newMessage);

        // Show the message section since we added a specific message
        messageSection.style.display = "block";

        messageForm.reset();
    });
}

function createMessageElement(name, email, message) {
    const li = document.createElement("li");
    li.className = "message-item";

    li.innerHTML = `
        <div class="message-content">
            <a href="mailto:${email}" class="message-author">${name}</a>
            <span class="message-text">${message}</span>
        </div>
        <div class="message-actions">
            <button class="edit-btn" type="button">Edit</button>
            <button class="remove-btn" type="button">Remove</button>
        </div>
    `;

    // Remove Functionality
    const removeBtn = li.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
        const entry = removeBtn.closest("li");
        entry.remove();
        checkMessageListEmpty();
    });

    // Edit Functionality (Stretch Goal)
    const editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        const messageSpan = li.querySelector(".message-text");
        const currentText = messageSpan.innerText;

        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.className = "edit-input";

        // Save on Enter or Blur
        const saveEdit = () => {
            const newText = input.value;
            messageSpan.innerText = newText;
            input.replaceWith(messageSpan);
            editBtn.innerText = "Edit";
        };

        input.addEventListener("blur", saveEdit);
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") saveEdit();
        });

        messageSpan.replaceWith(input);
        input.focus();
        editBtn.innerText = "Editing...";
    });

    return li;
}

function checkMessageListEmpty() {
    if (messageList.children.length === 0) {
        messageSection.style.display = "none";
    }
}

// Featured Projects
const featuredProjects = [
    {
        name: "CLAWD — Art Intelligence System",
        description: "Multi-API art discovery engine with ambient atmosphere, command palette navigation, and real-time context (Weather/Wiki) integration.",
        stack: "JavaScript, ARTIC API, Open-Meteo, Wikipedia API",
        url: null
    },
    {
        name: "STRATCLAWD",
        description: "Autonomous trading platform with agent orchestration, sandbox exchange, and behavior monitoring systems.",
        stack: "FastAPI, OpenAI Agents, Supabase, Redis",
        url: null
    },
    {
        name: "Northstar Creative",
        description: "Multi-agent system for advertising research and generation with real-time collaborative canvas.",
        stack: "FastAPI, LangGraph, Supabase, WebSocket, React",
        url: null
    },
    {
        name: "Ad Intelligence Engine",
        description: "Competitive creative analysis at scale using GPT-5, Gemini embeddings, and multi-platform scraping.",
        stack: "Python, Next.js, Vector storage",
        url: null
    },
    {
        name: "Solana Trading Bot",
        description: "DEX automation with AI-driven wallet analysis and real-time transaction monitoring.",
        stack: "Python async, SQLAlchemy, DeepSeek, WebSocket",
        url: null
    },
    {
        name: "Painted Memory",
        description: "E-commerce business scaled to 1000+ orders through data-driven campaigns and optimized workflows.",
        stack: "Shopify, Google Ads",
        url: null
    }
];

const projectSection = document.getElementById("Projects");
const projectList = projectSection.querySelector("ul");

// Add featured projects first
// Add featured projects first
featuredProjects.forEach(proj => {
    const project = document.createElement("li");
    project.className = "project-card featured";

    const command = `> launch ${proj.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    const projectHTML = `
        <a href="${proj.url ? proj.url : '#'}" ${proj.url ? 'target="_blank" rel="noopener noreferrer"' : ''}>
            <span class="project-meta">${proj.stack.split(',')[0]}</span>
            <span class="project-name">${proj.name}</span>
        </a>
        <p class="project-desc">${proj.description}</p>
        <div class="terminal-prompt">
            <span>${command}</span>
        </div>
    `;

    project.innerHTML = projectHTML;
    projectList.appendChild(project);
});

// Then add GitHub repos

fetch("https://api.github.com/users/miggyh27/repos")
    .then(response => response.json())
    .then(repositories => {
        console.log("GitHub Repositories:", repositories);

        const excludedProjects = [
            "moon-dev-ai-agents",
            "moon-dev-ai-agents-for-trading",
            "Official",
            "openai-agents-python",
            "openai-cua-sample-app",
            "OpenAPI-Clawd",
            "postiz-app",
            "Pump.fun-bundler",
            "PupPace",
            "solana-raydium-token-launchpad",
            "web-ui",
            "InfiniteYou",
            "lobe-chat"
        ];

        for (let i = 0; i < repositories.length; i++) {
            const repoName = repositories[i].name;

            if (excludedProjects.includes(repoName)) {
                continue;
            }

            const project = document.createElement("li");
            project.className = "project-card";

            const repoUrl = repositories[i].html_url;
            const repoDesc = repositories[i].description || "No description";
            const repoLang = repositories[i].language || "—";

            project.innerHTML = `
                <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">
                    <span class="project-name">${repoName}</span>
                    <span class="project-meta">${repoLang}</span>
                </a>
                <p class="project-desc">${repoDesc}</p>
            `;

            projectList.appendChild(project);
        }
    })
    .catch(error => {
        console.error("Failed to fetch repositories:", error);
        projectList.innerHTML = `<li class="error-state">Unable to load projects. Please try again later.</li>`;
    });

const nav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
