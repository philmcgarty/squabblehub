import React from "react";
import lotrBookCard from '../images/LOTR_Book.webp';
import vsGraphic from '../images/vs-img.png';
import lotrFilmCard from '../images/LOTR-movie-resized.jpg';
import Card from "./Card";

const ThisWeekSquabble = () => {

    const cards = [
        {   
            mediaFormat: 'Book',
            mediaFormatCaps: 'BOOK',
            typeClass: 'the-book',
            imageName: lotrBookCard,
            typeId: 'vote-book',
            buttonClass: 'btn-danger'
        },
        {
            mediaFormat: 'Movie',
            mediaFormatCaps: 'MOVIE',
            typeClass: 'the-movie',
            imageName: lotrFilmCard,
            typeId: 'vote-movie',
            buttonClass: 'btn-primary'
        }
    ]

    return (
        // {/* <!-- Book vs Movie container --> */}
        <div className="row text-center">

        {/* <!-- Book card --> */}
        <Card props={cards[0]}/>
        
        {/* <!-- vs graphic --> */}
        <div className="col content">
            <img src={vsGraphic} className="img-fluid" />
        </div>

        {/* <!-- Movie card --> */}
        <Card props={cards[1]}/>
        

    </div>
    )
}

export default ThisWeekSquabble;