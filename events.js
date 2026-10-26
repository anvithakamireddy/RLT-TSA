
/* =========================================
   RLT TSA EVENTS FILTER + DESCRIPTIONS
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const eventItems = document.querySelectorAll(".event-item");

const filterButtons = document.querySelectorAll(".filter-button");

const searchInput = document.getElementById("event-search");

const eventCount = document.getElementById("event-count");

const noResults = document.getElementById("no-results");

const descriptionPanel = document.getElementById("event-description");

const descriptionTitle = document.getElementById("description-title");

const descriptionText = document.getElementById("description-text");


/* =========================================
   EVENT DESCRIPTIONS
========================================= */

const eventDescriptions = {

    "animatronics":
        "Design and build an animatronic device that combines mechanical movement and creative design to bring a character or object to life.",

    "architectural-design":
        "Develop an architectural design solution by planning a building or space, creating design materials, and presenting your ideas.",

    "artificial-intelligence":
        "Explore artificial intelligence by developing or applying AI-based solutions to a problem, demonstrating your understanding of the technology.",

    "audio-podcasting":
        "Plan, produce, and present an audio podcast that communicates a topic or story through research, scripting, recording, and editing.",

    "automated-manufacturing-systems":
        "Work with automated manufacturing concepts to design, build, or demonstrate a system that uses technology to improve production.",

    "biotechnology-design":
        "Apply biotechnology concepts to develop a solution to a real-world challenge, combining scientific research, design, and technical presentation.",

    "board-game-design":
        "Create an original board game with engaging rules, a clear objective, and thoughtful game mechanics that make the experience enjoyable.",

    "chapter-team":
        "Collaborate with teammates to complete challenges that test your knowledge of TSA, communication, teamwork, and leadership.",

    "childrens-stories":
        "Develop an engaging children's story that combines creativity, storytelling, and visual or written elements to communicate an idea.",

    "cad-architecture":
        "Use computer-aided design software to create precise architectural drawings and demonstrate your understanding of spatial design.",

    "cad-engineering":
        "Use CAD software to develop detailed engineering drawings or models that demonstrate technical accuracy and design skills.",

    "cybersecurity":
        "Explore cybersecurity concepts and demonstrate your ability to understand digital threats, protect information, and solve security-related challenges.",

    "data-science-and-analytics":
        "Use data analysis, visualization, and statistical reasoning to investigate a problem, identify patterns, and communicate meaningful findings.",

    "debating-technological-issues":
        "Research a current technological issue, develop evidence-based arguments, and defend your position through structured debate.",

    "digital-video-production":
        "Plan, film, and edit a video that communicates a story or idea through effective visuals, sound, pacing, and editing.",

    "dragster-design":
        "Design and construct a dragster, applying engineering principles and careful craftsmanship to create a model optimized for performance.",

    "drone-challenge-uav":
        "Explore unmanned aerial vehicle technology by working with drones and applying planning, piloting, and problem-solving skills to a challenge.",

    "engineering-design":
        "Use the engineering design process to investigate a problem, develop a solution, create a prototype, and communicate your design.",

    "extemporaneous-speech":
        "Prepare and deliver a speech on an assigned topic within a limited preparation period, demonstrating organization and public-speaking skills.",

    "fashion-design-and-technology":
        "Combine fashion, creativity, and technology to develop a design concept that demonstrates style, functionality, and thoughtful construction.",

    "flight-endurance":
        "Design, construct, and test a model aircraft, applying aerodynamic principles to achieve sustained flight.",

    "forensic-science":
        "Apply scientific reasoning and forensic techniques to analyze evidence, interpret findings, and investigate a simulated case.",

    "future-technology-and-engineering-teacher":
        "Explore technology and engineering education by developing and presenting ideas that demonstrate your ability to explain technical concepts and teach others.",

    "hybrid-racer-xl":
        "Collaborate on a large-scale racing vehicle project, applying engineering, construction, and teamwork skills to meet the competition's design and performance goals.",

    "interior-design":
        "Develop an interior design concept by planning a functional, attractive space and communicating your choices through design materials.",

    "manufacturing-prototype":
        "Develop a prototype using manufacturing concepts, focusing on how a product can be designed, constructed, and improved.",

    "music-production":
        "Create an original music production by combining musical ideas, recording, sound design, and digital audio editing.",

    "on-demand-video":
        "Work with a team to plan and produce a video under competition time constraints, adapting to a prompt and managing the production process.",

    "photographic-technology":
        "Use photography and digital tools to create compelling images, demonstrating technical control, composition, and visual storytelling.",

    "prepared-presentation":
        "Research a topic, organize your findings, and deliver a prepared presentation that communicates your ideas clearly and effectively.",

    "promotional-design":
        "Create promotional materials that communicate a message or brand through effective visual design, typography, and layout.",

    "robotics":
        "Design, build, program, or operate a robot to complete competition challenges that test engineering, coding, and teamwork.",

    "software-development":
        "Develop a software solution to a problem by planning, programming, testing, and presenting an application or other digital product.",

    "stem-mass-media":
        "Use media production and storytelling to explain a STEM topic through engaging content, combining research, scripting, visuals, and editing.",

    "structural-design-and-engineering":
        "Apply structural engineering principles to design and construct a structure, considering stability, materials, and performance requirements.",

    "technology-bowl":
        "Test your knowledge of technology and TSA-related topics through a team-based competition that emphasizes quick thinking and collaboration.",

    "technology-problem-solving":
        "Work with teammates to analyze a technology-related problem, develop a practical solution, and explain your reasoning.",

    "transportation-modeling":
        "Explore transportation concepts by designing and constructing a model that demonstrates planning, technical skill, and attention to detail.",

    "video-game-design":
        "Create a video game concept or playable experience by combining game mechanics, programming, design, and storytelling.",

    "virtual-reality-simulation":
        "Design a virtual reality or simulation experience that uses immersive digital environments to communicate an idea or solve a problem.",

    "vlogging":
        "Create a vlog-style video that communicates a topic or experience through on-camera presentation, storytelling, and editing.",

    "webmaster":
        "Design and develop a website that communicates information effectively through organization, visual design, navigation, and web development."
};


/* =========================================
   DEFAULT DESCRIPTION
========================================= */

const defaultDescription = {
    title: "Explore an event",
    text: "Hover over any event to learn what it involves, what you will create, and the skills you can develop."
};


/* =========================================
   FILTER STATE
========================================= */

let filters = {
    type: [],
    format: [],
    participation: []
};


/* =========================================
   SHOW EVENT DESCRIPTION
========================================= */

function showEventDescription(event) {

    // Read the event slug from its link.
    const url = new URL(event.href, window.location.href);

    const eventSlug = url.searchParams.get("event");

    // Use the event heading as the title.
    const eventName = event.querySelector("h3").textContent.trim();

    // Look up the corresponding description.
    const description =
        eventDescriptions[eventSlug] ||
        "Explore this competitive event to learn more about its requirements, develop your skills, and demonstrate your creativity.";

    descriptionTitle.textContent = eventName;
    descriptionText.textContent = description;

    descriptionPanel.classList.add("is-active");
}


/* =========================================
   RESET DESCRIPTION
========================================= */

function resetEventDescription() {

    descriptionTitle.textContent = defaultDescription.title;
    descriptionText.textContent = defaultDescription.text;

    descriptionPanel.classList.remove("is-active");
}


/* =========================================
   ADD HOVER AND KEYBOARD SUPPORT
========================================= */

eventItems.forEach(event => {

    event.addEventListener("mouseenter", () => {
        showEventDescription(event);
    });

    event.addEventListener("focus", () => {
        showEventDescription(event);
    });

});


/* =========================================
   FILTER EVENTS
========================================= */

function filterEvents() {

    const searchTerm = searchInput.value.toLowerCase().trim();

    let visibleCount = 0;

    eventItems.forEach(event => {

        const eventName = event
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const type = event.dataset.type;

        const format = event.dataset.format;

        const participation = event.dataset.participation;


        // SEARCH

        const matchesSearch = eventName.includes(searchTerm);


        // EVENT TYPE

        const matchesType =
            filters.type.length === 0 ||
            filters.type.includes(type);


        // COMPETITION FORMAT

        const matchesFormat =
            filters.format.length === 0 ||
            filters.format.includes(format) ||
            (
                filters.format.includes("onsite") &&
                format === "both"
            ) ||
            (
                filters.format.includes("presubmit") &&
                format === "both"
            );


        // PARTICIPATION

        const matchesParticipation =
            filters.participation.length === 0 ||
            filters.participation.includes(participation) ||
            (
                filters.participation.includes("individual") &&
                participation === "both"
            ) ||
            (
                filters.participation.includes("team") &&
                participation === "both"
            );


        // FINAL RESULT

        const shouldShow =
            matchesSearch &&
            matchesType &&
            matchesFormat &&
            matchesParticipation;


        if (shouldShow) {

            event.style.display = "";

            visibleCount++;

        } else {

            event.style.display = "none";

        }

    });


    // UPDATE EVENT COUNT AND NO-RESULTS MESSAGE

    if (visibleCount === 0) {

        noResults.style.display = "block";

        eventCount.textContent = "No events found";

        resetEventDescription();

    } else {

        noResults.style.display = "none";

        eventCount.textContent =
            `Showing ${visibleCount} event${visibleCount === 1 ? "" : "s"}`;

    }

}


/* =========================================
   FILTER BUTTONS
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filterType = button.dataset.filter;

        const filterValue = button.dataset.value;


        // ALL BUTTON

        if (filterValue === "all") {

            filters[filterType] = [];

            document
                .querySelectorAll(
                    `.filter-button[data-filter="${filterType}"]`
                )
                .forEach(btn => {
                    btn.classList.remove("active");
                });

            button.classList.add("active");

        } else {

            // REMOVE ACTIVE STATE FROM ALL

            document
                .querySelectorAll(
                    `.filter-button[data-filter="${filterType}"][data-value="all"]`
                )
                .forEach(btn => {
                    btn.classList.remove("active");
                });


            // TOGGLE THE SELECTED FILTER

            if (filters[filterType].includes(filterValue)) {

                filters[filterType] = filters[filterType].filter(
                    value => value !== filterValue
                );

                button.classList.remove("active");

            } else {

                filters[filterType].push(filterValue);

                button.classList.add("active");

            }


            // REACTIVATE ALL IF NO FILTERS REMAIN

            if (filters[filterType].length === 0) {

                document
                    .querySelector(
                        `.filter-button[data-filter="${filterType}"][data-value="all"]`
                    )
                    .classList.add("active");

            }

        }


        filterEvents();

    });

});


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener("input", filterEvents);


/* =========================================
   INITIALIZE
========================================= */

filterEvents();
