import React, { useState, useEffect } from 'react';

function FilterMenu(props) {
    const [selectedFilter, setSelectedFilter] = useState();

    useEffect(() => {
        if (selectedFilter) {
            applyFilter(selectedFilter);
            props.toggleMenu();
        }
    }, [selectedFilter]);

    const applyFilter = (filter) => {
        const elements = document.querySelectorAll('.note');
        elements.forEach((element) => {
            if (filter === "remove") {
                props.setFilter("none");
                element.style.display = "inline-block";
            } else if (filter === "simple") {
                props.setFilter("simple");
                element.style.display = element.querySelector('.note-type')?.textContent.includes("#simple note") ? "inline-block" : "none";
            } else if (filter === "video") {
                props.setFilter("video");
                element.style.display = element.querySelector('.note-type')?.textContent.includes("#video note") ? "inline-block" : "none";
            }
        });
    };

    return (
        <div id="filter-options-component">
            <div>
                <button
                    className={`filter-button ${selectedFilter === "simple" ? 'selected' : ''}`}
                    onClick={() => setSelectedFilter("simple")}
                >
                    Simple Note
                </button>
            </div>
            <div>
                <button
                    className={`filter-button ${selectedFilter === "video" ? 'selected' : ''}`}
                    onClick={() => setSelectedFilter("video")}
                >
                    Video Note
                </button>
            </div>
            <div>
                <button
                    className={`filter-button ${selectedFilter === "remove" ? 'selected' : ''}`}
                    onClick={() => setSelectedFilter("remove")}
                >
                    Remove Filter
                </button>
            </div>
        </div>
    );
}

export default FilterMenu;
