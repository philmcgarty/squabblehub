import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { COMMENT_ADD_CURRENT_BOOK } from "../../utils/mutations";

const AddBookCommentModal = (props) => {
  const [commentText, setText] = useState('');
  const [addComment, { error }] = useMutation(COMMENT_ADD_CURRENT_BOOK);
  const [characterCount, setCharacterCount] = useState(0);
  
  if (!props.show) {
    return null
  }

  const handleChange = event => {
    if (event.target.value.length <= 280) {
        setText(event.target.value);
        setCharacterCount(event.target.value.length);
    }
};
  

  const handleFormSubmit = async event => {
      event.preventDefault();
      
      try {
          await addComment({
              // needs to be another variable for user id
            variables: { commentText }
          });
          setText('');
      } catch (e) {
          console.log(e);
      }
      props.onClose();
  };

  return (
    // <!-- Modal to Add BOOK Comment -->
    <div className="new-modal" id="add-book-comment-modal" tabIndex="-1" aria-labelledby="exampleModalLabel" onClick={props.onClose}>
      <div className="modal-dialog">
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title m-2 p-2 text-center the-book" id="add-book-comment-modal-btn">Add your comment</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.onClose}></button>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group p-3">
              <label htmlFor="new-comment">Comment on the BOOK here:</label>
              <textarea
                className="form-control" id="new-comment" rows="3"
                value={commentText}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.onClose} >Close</button>
              <button type="submit" className="btn btn-danger" id="submit-new-comment" data-bs-dismiss="modal">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <!-- END of Modal to Add Comment-->
  )
}

export default AddBookCommentModal;