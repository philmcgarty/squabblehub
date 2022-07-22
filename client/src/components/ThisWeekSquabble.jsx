import React from "react";
import lotrBookCard from '../images/LOTR_Book.webp';
import vsGraphic from '../images/vs-img.png';
import lotrFilmCard from '../images/LOTR-movie-resized.jpg';

const ThisWeekSquabble = () => {
    return (
        // {/* <!-- Book vs Movie container --> */}
        <div className="row text-center">

        {/* <!-- Book card --> */}
        <div className="card col text-center shadow-lg" style={{width: "18rem"}}>

            <div className="card-body">
                <h4 className="card-title the-book">The Book</h4>
                <img src={lotrBookCard} className="card-img" />

                <div className="card-body d-grid" id="vote-book">
                    <a href="#" className="btn btn-danger">Vote for the BOOK</a>
                </div>
            </div>

        </div>

        {/* <!-- vs graphic --> */}
        <div className="col content">
            <img src={vsGraphic} className="img-fluid" />
        </div>

        {/* <!-- Movie card --> */}
        <div className="card col text-center shadow-lg" style={{width: "18rem"}}>

            <div className="card-body">
                <h4 className="card-title the-movie">The Movie</h4>
                <img src={lotrFilmCard} className="card-img" />

            </div>
            <div className="card-body d-grid" id="vote-movie">
                <a href="#" className="btn btn-primary">Vote for the MOVIE</a>
            </div>
        </div>

    </div>
    )
}

export default ThisWeekSquabble;