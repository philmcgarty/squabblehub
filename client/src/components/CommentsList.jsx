import React from "react";

const CommentsList = (props) => {
    
    // console.log(comments.comments)
    
    props.comments.map(comment => (
        // console.log(comment.id);
        // console.log(comment.quote)
        console.log(comment.user)
    ))
    
    // return (
    //     // {/* <!-- Comments container --> */}
    //     <div className="card col" style={{width: "27rem"}} id="book-comments">
        
    //     <div className="card-body">
            
    //         {/* <!-- Example comment --> */}
    //         <div className="card shadow-sm" style={{width: "25rem"}}>
    //             <div className="card-body">
                    
    //                 <blockquote className="blockquote mb-0">
    //                     <p>The MOVIE is better because they got rid of the character Tom Bombadil who was soooooooo annoying!</p>
    //                     <footer className="blockquote-footer">User: <cite title="Source Title">NarcPat</cite></footer>
    //                 </blockquote>

    //             </div>
    //         </div>

    //     </div>
    // </div>
    // )
}

export default CommentsList;