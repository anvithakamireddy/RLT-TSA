/* ========================================
   EVENT FILTERING
======================================== */

/*
    Each filter is an array because
    multiple options can be selected.

    Example:

    type: ["technology", "science"]

    means:
    Technology OR Science
*/

let selectedFilters = {
    type: [],
    format: [],
    participation: []
};


/* ========================================
   FILTER BUTTONS
======================================== */

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;
        const value = button.dataset.value;


        /* -------------------------------
           ALL BUTTON
        -------------------------------- */

        if (value === "all") {

            /*
                Clicking All clears every
                selection in this category.
            */

            selectedFilters[filter] = [];

            const group = button.closest(".filter-group");

            group.querySelectorAll(".filter-button")
                .forEach(btn => {
                    btn.classList.remove("active");
                });

            button.classList.add("active");

        }


        /* -------------------------------
           NORMAL FILTER
        -------------------------------- */

        else {

            /*
                Remove "All" from the
                selected state.
            */

            const group = button.closest(".filter-group");

            const allButton =
                group.querySelector('[data-value="all"]');

            allButton.classList.remove("active");


            /*
                If the option is already
                selected, remove it.

                Otherwise, add it.
            */

            if (selectedFilters[filter].includes(value)) {

                selectedFilters[filter] =
                    selectedFilters[filter]
                        .filter(item => item !== value);

                button.classList.remove("active");

            }

            else {

                selectedFilters[filter].push(value);

                button.classList.add("active");

            }


            /*
                If nothing is selected,
                automatically return to All.
            */

            if (selectedFilters[filter].length === 0) {

                allButton.classList.add("active");

            }

        }


        filterEvents();

    });

});


/* ========================================
   SEARCH
======================================== */

const searchInput =
    document.getElementById("event-search");

searchInput.addEventListener("input", () => {

    filterEvents();

});


/* ========================================
   FILTER EVENTS
======================================== */

function filterEvents() {

    const events =
        document.querySelectorAll(".event-item");

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    let visibleEvents = 0;


    events.forEach(event => {

        const eventType =
            event.dataset.type;

        const eventFormat =
            event.dataset.format;

        const eventParticipation =
            event.dataset.participation;

        const eventName =
            event.querySelector("h3")
                .textContent
                .toLowerCase();


        /* ==================================
           TYPE FILTER
        ================================== */

        const typeMatches =
            selectedFilters.type.length === 0 ||
            selectedFilters.type.includes(eventType);


        /* ==================================
           FORMAT FILTER
        ================================== */

        let formatMatches = true;

        if (selectedFilters.format.length > 0) {

            formatMatches =
                selectedFilters.format.some(format => {

                    /*
                        "both" means the event can
                        appear under either option.
                    */

                    if (format === "onsite") {

                        return (
                            eventFormat === "onsite" ||
                            eventFormat === "both"
                        );

                    }

                    if (format === "presubmit") {

                        return (
                            eventFormat === "presubmit" ||
                            eventFormat === "both"
                        );

                    }

                    return eventFormat === format;

                });

        }


        /* ==================================
           PARTICIPATION FILTER
        ================================== */

        const participationMatches =
            selectedFilters.participation.length === 0 ||
            selectedFilters.participation
                .includes(eventParticipation);


        /* ==================================
           SEARCH
        ================================== */

        const searchMatches =
            searchTerm === "" ||
            eventName.includes(searchTerm);


        /* ==================================
           FINAL RESULT
        ================================== */

        if (
            typeMatches &&
            formatMatches &&
            participationMatches &&
            searchMatches
        ) {

            event.style.display = "flex";

            visibleEvents++;

        }

        else {

            event.style.display = "none";

        }

    });


    updateEventCount(visibleEvents);

}


/* ========================================
   EVENT COUNT
======================================== */

function updateEventCount(count) {

    const countElement =
        document.getElementById("event-count");


    if (count === 0) {

        countElement.textContent =
            "No events found";

    }

    else if (count === 1) {

        countElement.textContent =
            "Showing 1 event";

    }

    else {

        countElement.textContent =
            `Showing ${count} events`;

    }


    /* NO RESULTS MESSAGE */

    const noResults =
        document.getElementById("no-results");

    if (count === 0) {

        noResults.style.display = "block";

    }

    else {

        noResults.style.display = "none";

    }

}


/* ========================================
   INITIALIZE
======================================== */

/*
    Empty arrays = no filters selected.

    Therefore everything is shown when
    the page first loads.
*/

filterEvents();