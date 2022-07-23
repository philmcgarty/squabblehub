import React from "react";
import vsGraphic from '../images/vs-img.png';
import CommentsList from "./CommentsList";

const SquabbleComments = () => {
    
    const bookComments = [
        {
            id: '1',
            quote: 'This book is awesome, Tom Bombadil is the best! More singing please!',
            user: 'TolkienFiend'
        },
        {
            id: '2',
            quote: 'The movies were not long enough, they left way too much out. What happened to the forest and the most important character, Tom Bombadil?',
            user: 'Bookreader666'
        }
    ]
    
    const movieComments = [
        {
            id: '3',
            quote: 'You have to watch the extended cut, it is da Bombadil!',
            user: 'ILoveMovies'
        },
        {
            id: '4',
            quote: 'No way I have time to read the books, movie all the way!',
            user: 'B.Baggins'
        }
    ]
    
    return (
        <section>
                {/* <!-- MOVIE CHOICE = Cards for those who select movies --> */}
                <div className="container display-grid">
                    <div className="row justify-content-center">
                        <h2 className="m-4 text-center">Squabble</h2>

                        <div className="row" id="vote-count">
                            <div className="card mb-4 shadow-lg">
                                <div className="card-body">

                                    {/* BELOW IS PLACEHOLDER - NEEDS TO BE CHANGED */}
                                    
                                    <p className="card-text text-center text-bg-primary">The MOVIE is winning with 1 vote</p>
                                    
                                </div>
                            </div>
                        </div>

                        {/* <!-- BOOK CHOICE = Cards for those who select books --> */}
                        <div className="col mt-3">
                            <h3 className="text-center the-book">The BOOK is better because...</h3>

                            <CommentsList comments={bookComments}/>
                            
                        </div>
                        {/* <!-- BOOK END-->  */}

                        {/* <!-- vs graphic --> */}
                        <div className="col content">
                            <img src={vsGraphic} className="img-fluid" />
                        </div>

                        {/* <!--  MOVIE CHOICE = Cards for those who select movies --> */}
                        <div className="col mt-3">
                            <h3 className="text-center the-movie">The MOVIE is better because...</h3>


                            <CommentsList comments={movieComments}/>


                        </div>
                        {/* <!-- MOVIE END--> */}
                    </div>
                </div>
            </section>
    )
}

export default SquabbleComments;