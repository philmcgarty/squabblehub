// MODAL FOR ADDING A BOOK
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { COMMENT_ADD_CURRENT_BOOK } from "../../utils/mutations";
import  {QUERY_CURRENT_BOOK_COMMENTS, QUERY_USER_ME} from '../../utils/queries'

const AddBookCommentModal = (props) => {
  const [commentText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  
  const [commentAddCurrentBook, { error }] = useMutation(COMMENT_ADD_CURRENT_BOOK, {
    update(cache, { data: { commentAddCurrentBook } }) {
      
      // could potentially not exist yet, so wrap in a try/catch
      try {
          // update me array's cache
          const { userMe } = cache.readQuery({ query: QUERY_USER_ME });
          cache.writeQuery({
              query: QUERY_USER_ME,
              data: { userMe: { ...userMe, comments: [...userMe.comments, commentAddCurrentBook] } },
          });
      } 
      catch (e) {
          console.warn("First comment insertion by user!")
      }
  
      // update thought array's cache
      const { commentsByCurrentBook } = cache.readQuery({ query:QUERY_CURRENT_BOOK_COMMENTS });
      cache.writeQuery({
          query: QUERY_CURRENT_BOOK_COMMENTS,
          data: { commentsByCurrentBook: [commentAddCurrentBook, ...commentsByCurrentBook] },
      });
  }
  });


  // stops modal from showing by default
  if (!props.show) {
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
      await commentAddCurrentBook({
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
              <label htmlFor="new-comment" className="white-text">Comment on the BOOK here:</label>
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