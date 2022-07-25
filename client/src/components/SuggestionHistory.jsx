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

// {props.comments.map(comment => (
//     <div key={comment._id} className="card-body">

//         {/* <!-- Comment --> */}
//         <div className="card shadow-sm" style={{ width: "25rem" }}>
//             <div className="card-body">

//                 <blockquote className="blockquote mb-0">
//                     {/* User Review */}
//                     <p>{comment.commentText}</p>
//                     {/* User Name */}
//                     <footer className="blockquote-footer">User: <cite title="Source Title">{comment.username}</cite></footer>
//                 </blockquote>
//             </div>
//             {/* footer needs to be conditionally rendered based on user */}
//             <div className="card-footer text-center">
//                 <span className="edit m-2"><a href="#"><i className="fa-solid fa-pencil"></i> edit comment</a></span>
//                 <span className="delete m-2"><a href="#"><i className="fa-solid fa-trash-can"></i> delete comment</a></span>
//             </div>
//         </div>
//     </div>
// ))}