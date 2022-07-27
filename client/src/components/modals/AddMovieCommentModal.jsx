// MODAL FOR ADDING A MOVIE
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { COMMENT_ADD_CURRENT_MOVIE } from "../../utils/mutations";

const AddMovieCommentModal = (props) => {
    const [commentText, setText] = useState('');
    const [addComment, { error }] = useMutation(COMMENT_ADD_CURRENT_MOVIE);
    const [characterCount, setCharacterCount] = useState(0);
    
    // stops modal from showing by default
    if (!props.showMovie) {
        return null
    }

    // function copied from module 21 code
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // function copied from module 21 code
    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addComment({
                variables: { commentText }
            });
            setText('');
        } catch (e) {
            console.log(e);
        }
        props.onClose();
    };

    return (
        // <!-- Modal to Add MOVIE Comment -->
        <div className="new-modal" id="add-movie-comment-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" onClick={props.onClose}>
            <div className="modal-dialog">
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h4 className="modal-title m-2 p-2 text-center the-movie" id="add-movie-comment-modal-btn">Add your comment</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group p-3">
                            <label htmlFor="new-comment" className="white-text">Comment on the MOVIE here:</label>
                            <textarea
                                className="form-control" id="new-movie-comment" rows="3"
                                value={commentText}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.onClose} >Close</button>
                            <button type="submit" className="btn btn-danger" id="submit-new-movie-comment" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // <!-- END of Modal to Add Comment-->
    )
}

export default AddMovieCommentModal;