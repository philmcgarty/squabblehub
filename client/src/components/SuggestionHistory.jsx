import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_SUGGESTIONS } from '../utils/queries';

const SuggestionHistory = () => {
    const {loading, data} = useQuery(QUERY_SUGGESTIONS);
        console.log(data)
        const suggestions = data?.suggestionAllorByUser || [];
        console.log(suggestions);
    return (
        <div className="col">
            <h3 className="text-center">Your Squabble Suggestions</h3>
            {/* <!-- List of suggestions --> */}
            
            <div className="card shadow mt-3 p-2 mb-5">
                {loading ? (
                <div>Loading</div>) : (
                    <ul className="list-group list-group-flush">   
                        {suggestions.map(suggestion => (
                        <li key={suggestion._id} className="list-group-item">{suggestion.suggestionTitle}</li>
                        ))}   
                    </ul>
                )}
            </div>    
        </div>
    )
};

export default SuggestionHistory;