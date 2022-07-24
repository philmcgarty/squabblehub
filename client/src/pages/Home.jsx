import React from "react";
import lotrBookCard from '../images/LOTR_Book.webp';
import vsGraphic from '../images/vs-img.png';
import lotrFilmCard from '../images/LOTR-movie-resized.jpg';
import ThisWeekSquabble from "../components/ThisWeekSquabble";
import SquabbleComments from "../components/SquabbleComments";


const Home = () => {

    return (
        <main>
            {/* HERO */}
            <section className="hero">
                <div className="container display-grid">
                    <div className="row justify-content-center">
                        {/* <!-- This week's squabble --> */}
                        <h2 className="m-4 text-center">This week...</h2>
                        {/* Book v Film images */}
                        <ThisWeekSquabble />
                    </div>

                </div>
            </section>
            {/* <!-- HERO END --> */}

            {/* <!-- Squabbles --> */}
            <SquabbleComments />
        </main>  
        //  <!-- MAIN END --> 
    )
}

export default Home;