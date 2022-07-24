import React from "react";

const CommentsList = (props) => {

    return (
        // {/* <!-- Comments container --> */}
        <div className="card col" style={{ width: "27rem" }}
        // id="book-comments"
        >
            {props.comments.map(comment => (
                <div key={comment.id} className="card-body">

                    {/* <!-- Comment --> */}
                    <div className="card shadow-sm" style={{ width: "25rem" }}>
                        <div className="card-body">

                            <blockquote className="blockquote mb-0">
                                {/* User Review */}
                                <p>{comment.quote}</p>
                                {/* User Name */}
                                <footer className="blockquote-footer">User: <cite title="Source Title">{comment.user}</cite></footer>
                            </blockquote>
                        </div>
                        {/* footer needs to be conditionally rendered based on user */}
                        <div className="card-footer text-center">
                            <span className="edit m-2"><a href="#"><i className="fa-solid fa-pencil"></i> edit comment</a></span>
                            <span className="delete m-2"><a href="#"><i className="fa-solid fa-trash-can"></i> delete comment</a></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentsList;