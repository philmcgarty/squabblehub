import React from "react";
import lotrBookCard from '../images/LOTR_Book.webp';
import vsGraphic from '../images/vs-img.png';
import lotrFilmCard from '../images/LOTR-movie-resized.jpg';

const  Card = (props) => {

    return (
        <div className="card col text-center shadow-lg" style={{width: "18rem"}}>

            <div className="card-body">
                <h4 className={props.props.typeClass + " card-title"} >The {props.props.mediaFormat}</h4>
                <img src={props.props.imageName} className="card-img" />

            </div>
            <div className="card-body d-grid" id={props.props.typeId}>
                <a href="#" className={"btn " + props.props.buttonClass}>Vote for the {props.props.mediaFormatCaps}</a>
            </div>
        </div>
    )
}

export default Card;