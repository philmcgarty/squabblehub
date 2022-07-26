import React, { useState } from "react";
import lotrBookCard from '../images/LOTR_Book.webp';
import vsGraphic from '../images/vs-img.png';
import lotrFilmCard from '../images/LOTR-movie-resized.jpg';
import AddBookCommentModal from "../components/modals/AddBookCommentModal";
import { ADD_VOTE_CURRENT_BOOK, ADD_VOTE_CURRENT_MOVIE } from "../utils/mutations";

const  Card = (props) => {

    // const [openModal, setOpenModal] = useState(false);
    
    const displayVal = ()=>{
        if (props.props.mediaFormat === 'Book'){
            console.log(ADD_VOTE_CURRENT_BOOK);
        } else {
            console.log(ADD_VOTE_CURRENT_MOVIE);
        }
        // console.log(props.props.mediaFormat)
    }

    return (
        <>
        <div className="card col text-center shadow-lg" style={{width: "18rem"}}>

            <div className="card-body">
                <h4 className={props.props.typeClass + " card-title"} >The {props.props.mediaFormat}</h4>
                <img src={props.props.imageName} className="card-img" />

            </div>
            <div className="card-body d-grid" id={props.props.typeId}>
                <button onClick={displayVal} className={"btn " + props.props.buttonClass}>Vote for the {props.props.mediaFormatCaps}</button>
            </div>
            
                
            {/* {openModal && <AddBookCommentModal />} */}
            
        </div>
            
        </>
    )
}

export default Card;