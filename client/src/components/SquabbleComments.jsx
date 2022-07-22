import React from "react";
import vsGraphic from '../images/vs-img.png';

const SquabbleComments = () => {
    return (
        <section>
                {/* <!-- MOVIE CHOICE = Cards for those who select movies --> */}
                <div className="container display-grid">
                    <div className="row justify-content-center">
                        <h2 className="m-4 text-center">Squabble</h2>

                        <div className="row" id="vote-count">
                            <div className="card mb-4 shadow-lg">
                                <div className="card-body">
                                    {/* PLACEHOLDER - NEEDS TO BE CHANGED */}
                                    <p className="card-text text-center text-bg-primary">The MOVIE is winning with 1 vote</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- BOOK CHOICE = Cards for those who select movies --> */}
                        <div className="col mt-3">
                            <h3 className="text-center the-book">The BOOK is better because...</h3>

                            {/* <!-- BOOK comments container --> */}
                            <div className="card col" style={{width: "27rem"}} id="book-comments">
                                <div className="card-body">

                                    {/* <!-- Example comment --> */}



                                </div>
                            </div>

                        </div>
                        {/* <!-- BOOK END-->  */}

                        {/* <!-- vs graphic --> */}
                        <div className="col content">
                            <img src={vsGraphic} className="img-fluid" />
                        </div>

                        {/* <!--  MOVIE CHOICE = Cards for those who select books --> */}
                        <div className="col mt-3">
                            <h3 className="text-center the-movie">The MOVIE is better because...</h3>

                            {/* <!-- MOVIE comments container --> */}
                            <div className="card col" style={{width: "27rem"}} id="book-comments">
                                <div className="card-body">
                                    
                                    {/* <!-- Example comment --> */}
                                    <div className="card shadow-sm" style={{width: "25rem"}}>
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <p>The MOVIE is better because they got rid of the character Tom Bombadil who was soooooooo annoying!</p>
                                                <footer className="blockquote-footer">User: <cite title="Source Title">NarcPat</cite></footer>
                                            </blockquote>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <!-- MOVIE END--> */}
                    </div>
                </div>
            </section>
    )
}

export default SquabbleComments;