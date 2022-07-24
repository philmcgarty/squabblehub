import React from 'react';

import choiceOne from '../images/300vs-thumbnail.jpg'
import choiceTwo from '../images/Annihilation-thumbnail.jpg'
import choiceThree from '../images/Forrest-Gump-vs-Thumbnail.jpg'

const NextSquabblePoll = () => {
    return (
        <section>
        <div className="container display-grid">
          {/* <!-- Total container --> */}
          <div className="row justify-content-center mt-2" id="sqabble-choices">
  
            <h3 className="text-center">Vote for the next Squabble</h3>
  
            {/* <!-- Card container --> */}
            <div className="row text-center mt-3">
  
              {/* <!-- 1st Squabble choice --> */}
              <div className="col content">
                <div className="card shadow" style={{width: '18rem'}}>
                  <a href="/profile" className="btn btn-primary-outline img-thumbnail" id="squabble-choice-1">
                    <div className="card-body">
                      <h4>300</h4>
                    </div>
                    <img src={choiceOne} className="card-img-top" alt="..."/>
                  </a>
                </div>
              </div>
  
              {/* <!-- 2nd Squabble choice --> */}
              <div className="col content">
                <div className="card shadow" style={{width: '18rem'}}>
                  <a href="/profile" className="btn btn-primary-outline img-thumbnail" id="squabble-choice-2">
                    <div className="card-body">
                      <h4>Annihilation</h4>
                    </div>
                    <img src={choiceTwo} className="card-img-top" alt="..."/>
                  </a>
                </div>
              </div>
            
              {/* <!-- 3rd Squabble choice --> */}
              <div className="col content">
                <div className="card shadow" style={{width: '18rem'}}>
                  <a href="/profile" className="btn btn-primary-outline img-thumbnail" id="squabble-choice-3">
                    <div className="card-body">
                      <h4>Forrest Gump</h4>
                    </div>
                    <img src={choiceThree} className="card-img-top" alt="..."/>
                  </a>
                </div>
              </div>
  
            </div>
            {/* <!-- END of card container --> */}
            </div>
            {/* <!-- END of total container --> */}
          </div>
      {/* <!-- END of Vote for next section --> */}
  
          <div className="mt-5 content">
            <div className="card-body p-3 text-danger text-center">
              <p><strong>Voting ends at 9PM (EST) every Sunday.</strong></p>
            </div>
          </div>
      </section>
    );
  };
  
  export default NextSquabblePoll;