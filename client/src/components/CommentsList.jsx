import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { COMMENT_DELETE } from "../utils/mutations";
import Auth from "../utils/auth";

const CommentsList = (props) => {
    
    // const [deleteComment] = useMutation(COMMENT_DELETE);

    // const handelDelete = (e) => {
    //     e.preventDefault()
    //     const commentId = e.target.getAttribute("data-id")
    //     deleteComment({ _id: commentId });
    //   }

    const [deleteComment] = useMutation(COMMENT_DELETE);
    
    const deleteItem = (itemId, name) => (event) =>  {
        console.log(itemId); 
        event.preventDefault()
        deleteComment({
            // variables: {
            _id: itemId,
            username: name
        //   }
        })
      }

    return (
        // {/* <!-- Comments container --> */}
        <div className="card col" style={{ width: "27rem" }}
        // id="book-comments"
        >
            {props.comments.map(comment => (
                <div key={comment._id} className="card-body">

                    {/* <!-- Comment --> */}
                    <div className="card shadow-sm" style={{ width: "25rem" }}>
                        <div className="card-body">

                            <blockquote className="blockquote mb-0">
                                {/* User Review */}
                                <p>{comment.commentText}</p>
                                {/* User Name */}
                                <footer className="blockquote-footer">User: <cite title="Source Title">{comment.username}</cite></footer>
                            </blockquote>
                        </div>
                        {/* footer needs to be conditionally rendered based on user */}
                        
                        {Auth.loggedIn() && (
                        <form data-id={comment.id}>
                        <div className="card-footer text-center">
                            {/* <span className="edit m-2"><a href="#"><i className="fa-solid fa-pencil" ></i> Edit comment</a></span> */}
                            <button  onClick={deleteItem(comment._id, comment.username)}><span className="delete m-2"><a href="#"><i className="fa-solid fa-trash-can"></i> Delete comment</a></span></button>
                        </div>
                        </form>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CommentsList;