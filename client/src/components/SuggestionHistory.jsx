import React from "react";

const SuggestionHistory = () => {
    return (
        <div className="col">
            <h3 className="text-center">Your Squabble Suggestions</h3>
            {/* <!-- List of suggestions --> */}
            <div className="card shadow mt-3 p-2 mb-5">
                <ul className="list-group list-group-flush">
                <li className="list-group-item">Dune</li>
                <li className="list-group-item">V for Vendetta</li>
                <li className="list-group-item">50 Shades of Grey</li>
                <li className="list-group-item">Life of Pi</li>
                <li className="list-group-item">Scott Pilgrim vs. the World</li>
                <li className="list-group-item">Twilight</li>
                </ul>
            </div>
        </div>
    )
};

export default SuggestionHistory;