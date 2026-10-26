// =====================================================
// RLT TSA CALENDAR
// =====================================================


// =====================================================
// ELEMENTS
// =====================================================

const calendarYear =
    document.getElementById("calendar-year");

const monthTitle =
    document.getElementById("calendar-month-title");

const previousButton =
    document.getElementById("previous-month");

const nextButton =
    document.getElementById("next-month");

const eventsButton =
    document.getElementById("events-button");

const eventsMenu =
    document.getElementById("events-menu");

const calendarSelection =
    document.getElementById("calendar-selection");


// =====================================================
// EVENT FORMATS
// =====================================================
//
// presubmit = January 17
// onsite    = January 28
// both      = January 17 + January 28
//
// =====================================================

const eventFormats = {

    "Animatronics": "onsite",

    "Architectural Design": "both",

    "Artificial Intelligence": "onsite",

    "Audio Podcasting": "both",

    "Automated Manufacturing Systems": "onsite",

    "Biotechnology Design": "onsite",

    "Board Game Design": "onsite",

    "Chapter Team": "onsite",

    "Children's Stories": "onsite",

    "CAD Architecture": "presubmit",

    "CAD Engineering": "onsite",

    "Cybersecurity": "onsite",

    "Data Science and Analytics": "presubmit",

    "Debating Technological Issues": "onsite",

    "Digital Video Production": "presubmit",

    "Dragster Design": "onsite",

    "Drone Challenge (UAV)": "onsite",

    "Engineering Design": "onsite",

    "Extemporaneous Speech": "onsite",

    "Fashion Design and Technology": "presubmit",

    "Flight Endurance": "onsite",

    "Forensic Science": "onsite",

    "Future Technology and Engineering Teacher": "presubmit",

    "Hybrid Racer XL": "onsite",

    "Interior Design": "presubmit",

    "Manufacturing Prototype": "onsite",

    "Music Production": "presubmit",

    "On-Demand Video": "presubmit",

    "Photographic Technology": "presubmit",

    "Prepared Presentation": "onsite",

    "Promotional Design": "presubmit",

    "Robotics": "onsite",

    "Software Development": "presubmit",

    "STEM Mass Media": "presubmit",

    "Structural Design and Engineering": "onsite",

    "Technology Bowl": "onsite",

    "Technology Problem Solving": "onsite",

    "Transportation Modeling": "onsite",

    "Video Game Design": "presubmit",

    "Virtual Reality Simulation": "presubmit",

    "Vlogging": "presubmit",

    "Webmaster": "presubmit"

};


// =====================================================
// MEETINGS
// =====================================================

const meetings = [

    {
        date: "2026-10-26",
        title: "Events Meeting",
        range: "October 26, 2026"
    }

];


// =====================================================
// DISTRICT COMPETITION
// =====================================================
//
// These ALWAYS stay on the calendar.
//
// =====================================================

const districtCompetition = {

    "2027-02-04": [
        {
            title: "District Competition",
            range: "February 4-6, 2027"
        }
    ],

    "2027-02-05": [
        {
            title: "District Competition",
            range: "February 4-6, 2027"
        }
    ],

    "2027-02-06": [
        {
            title: "District Competition",
            range: "February 4-6, 2027"
        }
    ]

};

const statecompetition = {

    "2027-04-01": [
        {
            title: "State Competition",
            range: "April 1-3, 2027"
        }
    ],

    "2027-04-02": [
        {
            title: "State Competition",
            range: "April 1-3, 2027"
        }
    ],

    "2027-04-03": [
        {
            title: "State Competition",
            range: "April 1-3, 2027"
        }
    ]

};

const nationalscompetition = {

    "2027-06-23": [
        {
            title: "National Competition",
            range: "June 23-27, 2027"
        }
    ],

    "2027-06-24": [
        {
            title: "National Competition",
            range: "June 23-27, 2027"
        }
    ],

    "2027-06-25": [
        {
            title: "National Competition",
            range: "June 23-27, 2027"
        }
    ],

    "2027-06-26": [
        {
            title: "National Competition",
            range: "June 23-27, 2027"
        }
    ],
    "2027-06-27": [
        {
            title: "National Competition",
            range: "June 23-27, 2027"
        }
    ]

};

// Competitions shown in blue alongside District.
// Add any new competition object to this list.

const otherCompetitions = [
    statecompetition,
    nationalscompetition
];

// =====================================================
// MISCELLANEOUS DEADLINES (purple)
// =====================================================
//
// Put every item for the same day in that day's array.
//
// =====================================================

const miscellaneous = {

    "2026-10-26": [
        {
            title: "Consent Forms Due",
            range: "October 26, 2026"
        },
        {
            title: "$45 Due",
            range: "October 26, 2026"
        }
    ]

};


// =====================================================
// MONTHS
// =====================================================

const months = [

    {
        year: 2026,
        month: 8
    },

    {
        year: 2026,
        month: 9
    },

    {
        year: 2026,
        month: 10
    },

    {
        year: 2026,
        month: 11
    },

    {
        year: 2027,
        month: 0
    },

    {
        year: 2027,
        month: 1
    },

    {
        year: 2027,
        month: 2
    },

    {
        year: 2027,
        month: 3
    },

    {
        year: 2027,
        month: 4
    },

    {
        year: 2027,
        month: 5
    },

    {
        year: 2027,
        month: 6
    },

    {
        year: 2027,
        month: 7
    }

];


// =====================================================
// CURRENT STATE
// =====================================================

let currentMonthIndex = 0;

let selectedEvent = "all";

let meetingsOnly = false;

// Set to true to show the Pre-Submission / Onsite Submission dates again
const showSubmissionDates = false;


// =====================================================
// DATE KEY
// =====================================================

function getDateKey(
    year,
    month,
    day
) {

    return (
        year +
        "-" +
        String(month + 1).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0")
    );

}


// =====================================================
// CREATE EVENT MENU
// =====================================================

function createEventMenu() {

    eventsMenu.innerHTML = "";


    // ALL EVENTS BUTTON

    const allButton =
        document.createElement("button");

    allButton.type = "button";

    allButton.className =
        "event-select active";

    allButton.dataset.event =
        "all";

    allButton.textContent =
        "All Events";

    eventsMenu.appendChild(
        allButton
    );


    // EVENT BUTTONS

    Object.keys(eventFormats)
        .sort()
        .forEach(eventName => {

            const button =
                document.createElement("button");

            button.type =
                "button";

            button.className =
                "event-select";

            button.dataset.event =
                eventName;

            button.textContent =
                eventName;

            eventsMenu.appendChild(
                button
            );

        });


    addEventListeners();

}


// =====================================================
// EVENT SELECTION
// =====================================================

function addEventListeners() {

    const eventButtons =
        document.querySelectorAll(
            ".event-select"
        );


    eventButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    // Return to normal event view
                    meetingsOnly = false;


                    selectedEvent =
                        button.dataset.event;


                    // Remove active state
                    eventButtons.forEach(
                        otherButton => {

                            otherButton.classList.remove(
                                "active"
                            );

                        }
                    );


                    // Add active state
                    button.classList.add(
                        "active"
                    );


                    // Update selection text
                    const selectedName =
                        selectedEvent === "all"
                            ? "All Events"
                            : selectedEvent;


                    calendarSelection.innerHTML = `

                        <span class="selection-label">
                            VIEWING
                        </span>

                        <strong>
                            ${selectedName}
                        </strong>

                    `;


                    // Close Events menu
                    eventsButton.classList.remove(
                        "open"
                    );

                    eventsMenu.classList.remove(
                        "open"
                    );


                    // Re-render calendar
                    renderCurrentMonth();

                }
            );

        }
    );

}


// =====================================================
// GET EVENT SUBMISSION DATES
// =====================================================
//
// presubmit = January 17
// onsite    = January 28
//
// =====================================================

function getSubmissionDates() {

    const dates = {};


    if (
        !showSubmissionDates
    ) {

        return dates;

    }


    // =============================================
    // ALL EVENTS
    // =============================================

    if (
        selectedEvent === "all"
    ) {

        dates["2027-01-17"] = [

            {
                title:
                    "Pre-Submission Turn In",

                range:
                    "January 17, 2027"
            }

        ];


        dates["2027-01-28"] = [

            {
                title:
                    "Onsite Submission",

                range:
                    "January 28, 2027"
            }

        ];


        return dates;

    }


    // =============================================
    // SPECIFIC EVENT
    // =============================================

    const format =
        eventFormats[selectedEvent];


    if (
        !format
    ) {

        return dates;

    }


    // =============================================
    // PRE-SUBMISSION
    // =============================================

    if (
        format === "presubmit" ||
        format === "both"
    ) {

        dates["2027-01-17"] = [

            {
                title:
                    "Pre-Submission Turn In",

                range:
                    `${selectedEvent} • January 17, 2027`
            }

        ];

    }


    // =============================================
    // ONSITE
    // =============================================

    if (
        format === "onsite" ||
        format === "both"
    ) {

        dates["2027-01-28"] = [

            {
                title:
                    "Onsite Submission",

                range:
                    `${selectedEvent} • January 28, 2027`
            }

        ];

    }


    return dates;

}


// =====================================================
// GET MEETING DATES
// =====================================================

function getMeetingDates() {

    const dates = {};


    meetings.forEach(
        meeting => {

            if (
                !dates[meeting.date]
            ) {

                dates[meeting.date] = [];

            }


            dates[meeting.date].push({

                title:
                    meeting.title,

                range:
                    meeting.range

            });

        }
    );


    return dates;

}


// =====================================================
// CREATE CALENDAR
// =====================================================

function createCalendar(
    year,
    month
) {

    calendarYear.innerHTML = "";


    // =============================================
    // MONTH TITLE
    // =============================================

    monthTitle.textContent =
        new Date(
            year,
            month,
            1
        ).toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );


    // =============================================
    // MONTH CONTAINER
    // =============================================

    const monthContainer =
        document.createElement("section");

    monthContainer.className =
        "calendar-month";


    // =============================================
    // WEEKDAYS
    // =============================================

    const weekdays =
        document.createElement("div");

    weekdays.className =
        "calendar-weekdays";


    const weekdayNames = [

        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"

    ];


    weekdayNames.forEach(
        name => {

            const weekday =
                document.createElement("div");

            weekday.textContent =
                name;

            weekdays.appendChild(
                weekday
            );

        }
    );


    monthContainer.appendChild(
        weekdays
    );


    // =============================================
    // DAYS GRID
    // =============================================

    const daysGrid =
        document.createElement("div");

    daysGrid.className =
        "calendar-days";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const daysInPreviousMonth =
        new Date(
            year,
            month,
            0
        ).getDate();


    // =============================================
    // PREVIOUS MONTH DAYS
    // =============================================

    for (
        let i = firstDay - 1;
        i >= 0;
        i--
    ) {

        const day =
            daysInPreviousMonth - i;


        const cell =
            document.createElement("div");

        cell.className =
            "calendar-day other-month";


        cell.innerHTML = `

            <span class="day-number">
                ${day}
            </span>

        `;


        daysGrid.appendChild(
            cell
        );

    }


    // =============================================
    // CURRENT MONTH DAYS
    // =============================================

    const submissionDates =
        getSubmissionDates();

    const meetingDates =
        getMeetingDates();


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const cell =
            document.createElement("div");

        cell.className =
            "calendar-day";


        // DAY NUMBER

        const dayNumber =
            document.createElement("span");

        dayNumber.className =
            "day-number";

        dayNumber.textContent =
            day;


        cell.appendChild(
            dayNumber
        );


        // DATE KEY

        const dateKey =
            getDateKey(
                year,
                month,
                day
            );


        // =========================================
        // COLLECT EVENTS FOR THIS DAY
        // =========================================

        let dayEvents = [];


        // =========================================
        // MEETINGS-ONLY VIEW
        // =========================================

        if (
            meetingsOnly
        ) {

            if (
                meetingDates[dateKey]
            ) {

                dayEvents =
                    dayEvents.concat(
                        meetingDates[dateKey]
                    );

            }

        }


        // =========================================
        // NORMAL VIEW
        // =========================================

        else {

            // DISTRICT COMPETITION

            if (
                districtCompetition[dateKey]
            ) {

                dayEvents =
                    dayEvents.concat(
                        districtCompetition[dateKey]
                    );

            }


            // STATE & NATIONAL COMPETITIONS

            otherCompetitions.forEach(
                competition => {

                    if (
                        competition[dateKey]
                    ) {

                        dayEvents =
                            dayEvents.concat(
                                competition[dateKey]
                            );

                    }

                }
            );


            // MEETINGS

            if (
                meetingDates[dateKey]
            ) {

                dayEvents =
                    dayEvents.concat(
                        meetingDates[dateKey]
                    );

            }


            // SUBMISSION DEADLINE

            if (
                submissionDates[dateKey]
            ) {

                dayEvents =
                    dayEvents.concat(
                        submissionDates[dateKey]
                    );

            }


            // MISCELLANEOUS DEADLINES

            if (
                miscellaneous[dateKey]
            ) {

                dayEvents =
                    dayEvents.concat(
                        miscellaneous[dateKey]
                    );

            }

        }


        // =========================================
        // HIGHLIGHT DATE
        // =========================================

        if (
            dayEvents.length > 0
        ) {

            cell.classList.add(
                "important-date"
            );


            // =====================================
            // DETERMINE COLOR
            // =====================================

            const hasMeeting =
                meetingDates[dateKey] &&
                meetingDates[dateKey].length > 0;


            const hasCompetition =
                (
                    districtCompetition[dateKey] &&
                    districtCompetition[dateKey].length > 0
                ) ||
                (
                    !meetingsOnly &&
                    otherCompetitions.some(
                        competition =>
                            competition[dateKey] &&
                            competition[dateKey].length > 0
                    )
                );


            const hasSubmission =
                submissionDates[dateKey] &&
                submissionDates[dateKey].length > 0;


            const hasMiscellaneous =
                !meetingsOnly &&
                miscellaneous[dateKey] &&
                miscellaneous[dateKey].length > 0;


            // PURPLE — MISCELLANEOUS DEADLINE

            if (
                hasMiscellaneous
            ) {

                cell.classList.add(
                    "miscellaneous-date"
                );

            }


            // GREEN — MEETING

            else if (
                hasMeeting
            ) {

                cell.classList.add(
                    "meeting-date"
                );

            }


            // BLUE — DISTRICT COMPETITION

            else if (
                hasCompetition
            ) {

                cell.classList.add(
                    "competition-date"
                );

            }


            // PINK — SUBMISSION

            else if (
                hasSubmission
            ) {

                cell.classList.add(
                    "submission-date"
                );

            }


            // =====================================
            // DOT
            // =====================================

            const marker =
                document.createElement("span");

            marker.className =
                "event-marker";


            cell.appendChild(
                marker
            );


            // =====================================
            // TOOLTIP
            // =====================================

            const tooltip =
                document.createElement("div");

            tooltip.className =
                "calendar-tooltip";


            dayEvents.forEach(
                event => {

                    const title =
                        document.createElement("strong");

                    title.textContent =
                        event.title;


                    const range =
                        document.createElement("span");

                    range.textContent =
                        event.range;


                    tooltip.appendChild(
                        title
                    );

                    tooltip.appendChild(
                        range
                    );

                }
            );


            cell.appendChild(
                tooltip
            );

        }


        daysGrid.appendChild(
            cell
        );

    }


    // =============================================
    // NEXT MONTH DAYS
    // =============================================

    const totalCells =
        firstDay +
        daysInMonth;


    const remainingCells =
        totalCells % 7 === 0
            ? 0
            : 7 -
                (
                    totalCells % 7
                );


    for (
        let day = 1;
        day <= remainingCells;
        day++
    ) {

        const cell =
            document.createElement("div");

        cell.className =
            "calendar-day other-month";


        cell.innerHTML = `

            <span class="day-number">
                ${day}
            </span>

        `;


        daysGrid.appendChild(
            cell
        );

    }


    // =============================================
    // ADD GRID
    // =============================================

    monthContainer.appendChild(
        daysGrid
    );


    calendarYear.appendChild(
        monthContainer
    );


    // =============================================
    // ARROW STATES
    // =============================================

    previousButton.disabled =
        currentMonthIndex === 0;


    nextButton.disabled =
        currentMonthIndex ===
        months.length - 1;

}


// =====================================================
// RENDER CURRENT MONTH
// =====================================================

function renderCurrentMonth() {

    const current =
        months[currentMonthIndex];


    createCalendar(
        current.year,
        current.month
    );

}


// =====================================================
// PREVIOUS MONTH
// =====================================================

previousButton.addEventListener(
    "click",
    () => {

        if (
            currentMonthIndex > 0
        ) {

            currentMonthIndex--;

            renderCurrentMonth();

        }

    }
);


// =====================================================
// NEXT MONTH
// =====================================================

nextButton.addEventListener(
    "click",
    () => {

        if (
            currentMonthIndex <
            months.length - 1
        ) {

            currentMonthIndex++;

            renderCurrentMonth();

        }

    }
);


// =====================================================
// EVENTS BUTTON
// =====================================================

eventsButton.addEventListener(
    "click",
    () => {

        // Turn off meetings-only mode

        meetingsOnly = false;


        // Toggle Events menu

        eventsButton.classList.toggle(
            "open"
        );

        eventsMenu.classList.toggle(
            "open"
        );


        // Update viewing label

        const selectedName =
            selectedEvent === "all"
                ? "All Events"
                : selectedEvent;


        calendarSelection.innerHTML = `

            <span class="selection-label">
                VIEWING
            </span>

            <strong>
                ${selectedName}
            </strong>

        `;


        // Re-render

        renderCurrentMonth();

    }
);


// =====================================================
// INITIALIZE EVENT MENU
// =====================================================

createEventMenu();


// =====================================================
// INITIALIZE CALENDAR
// =====================================================

renderCurrentMonth();