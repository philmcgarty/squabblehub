import React, { useState } from "react";
import { Link } from 'react-router-dom';
import lotrBookCard from '../images/LOTR_Book.webp';
import vsGraphic from '../images/vs-img.png';
import lotrFilmCard from '../images/LOTR-movie-resized.jpg';
import AddBookCommentModal from "../components/modals/AddBookCommentModal";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_VOTE_CURRENT_BOOK, ADD_VOTE_CURRENT_MOVIE } from "../utils/mutations";
import { QUERY_SQUABBLE_ALL } from "../utils/queries";
import Auth from '../utils/auth';

const  Card = (props) => {

    const {loading, data} = useQuery(QUERY_SQUABBLE_ALL);
    
    const {bookVoteCount, movieVoteCount} = data?.squabbleAll[0] || [];
    console.log(bookVoteCount,movieVoteCount)
    
    // const [openModal, setOpenModal] = useState(false);
    
    const [voteBook] = useMutation(ADD_VOTE_CURRENT_BOOK);
    const [voteMovie] = useMutation(ADD_VOTE_CURRENT_MOVIE)

    const handleVote = ()=> {
        if (props.props.mediaFormat === 'Book'){
                voteBook();
                console.log('You voted book!')    
        } else {
            voteMovie();
            console.log('You voted movie!');
        }
    }

    return (
        <>{loading ? ( <h3 className="text-center">Loading...</h3> ) : (
        <div className="card col text-center shadow-lg" style={{width: "18rem"}}>
            <div className="card-body">
                <h4 className={props.props.typeClass + " card-title"} >The {props.props.mediaFormat}</h4>
                <img src={props.props.imageName} className="card-img" />
            </div>
            <div className="card-body d-grid" id={props.props.typeId}>
                {/* if not logged in button redirects to login page */}
                {!Auth.loggedIn() ? (
                    <Link to="/login" className={"btn " + props.props.buttonClass}>Vote for the {props.props.mediaFormatCaps}</Link>
                ) : (
                    // else if logged in will allow vote
                    <button onClick={handleVote} className={"btn " + props.props.buttonClass}>Vote for the {props.props.mediaFormatCaps}</button>
                )}                
            </div>         
            {/* {openModal && <AddBookCommentModal />} */}
        </div>  )}          
        </>
    )
}

export default Card;