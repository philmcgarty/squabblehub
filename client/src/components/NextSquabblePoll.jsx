import React, { useState } from 'react';

import choiceOne from '../images/300.jpg'
import choiceTwo from '../images/Annihilation.jpg'
import choiceThree from '../images/Forrest Gump.jpg'

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POLLS } from '../utils/queries';
import { NEXT_VOTE_ONE, NEXT_VOTE_TWO, NEXT_VOTE_THREE } from '../utils/mutations';

const NextSquabblePoll = () => {

  const { loading, data } = useQuery(QUERY_POLLS);
  const {question, oneTitle, oneVoteCount, twoTitle, twoVoteCount, threeTitle, threeVoteCount} = data?.polls[0] || [];

  const totalVotes = oneVoteCount + twoVoteCount + threeVoteCount;
  const title1VotePercentage = Math.round(oneVoteCount / totalVotes * 100);
  const title2VotePercentage = Math.round(twoVoteCount / totalVotes * 100);
  const title3VotePercentage = Math.round(threeVoteCount / totalVotes * 100);

  const [voteNextOptOne] = useMutation(NEXT_VOTE_ONE);
  const [voteNextOptTwo] = useMutation(NEXT_VOTE_TWO);
  const [voteNextOptThree] = useMutation(NEXT_VOTE_THREE);

  

  const handleClick = (event) => {
    
    switch (event.currentTarget.id) {
      case "choice1":
        voteNextOptOne();
        window.location.reload(false);
        break; 

      case "choice2":
        voteNextOptTwo();
        window.location.reload(false);
        break;

      case "choice3":
        voteNextOptThree();
        window.location.reload(false);
        break;

      default:
        break;  
    } 
  };
  
    return (
      
        <section>
          <div className="container display-grid">
            {/* <!-- Total container --> */}
            <div className="row justify-content-center mt-2" id="sqabble-choices">
            {loading ? ( <div>Loading</div> ) : (
              <h3 className="text-center">{question}</h3>
            )}
              {/* <!-- Card container --> */}
              <div className="row text-center mt-3">
  
                {/* <!-- 1st Squabble choice --> */}
                <div className="col content" >
                  <div className="card shadow squabble-choice" style={{width: '18rem'}}>
                    <button type='button' onClick={handleClick} className="btn btn-primary-outline img-thumbnail" data-bs-toggle="button" aria-pressed="true" id="choice1">
                      <div className="card-body">
                        <h4>{oneTitle}</h4>
                      </div>
                      <img src={choiceOne} className="card-img-top" alt={`Voting option Title: ${oneTitle}`}/>
                    </button>
                    <h5 className='my-2'>{title1VotePercentage}% of Votes</h5>
                  </div>
                </div>
  
                {/* <!-- 2nd Squabble choice --> */}
                <div className="col content">
                  <div className="card shadow squabble-choice" style={{width: '18rem'}}>
                    <button type='button' onClick={handleClick} className="btn btn-primary-outline img-thumbnail" data-bs-toggle="button" aria-pressed="true" id="choice2">
                      <div className="card-body">
                        <h4>{twoTitle}</h4>
                      </div>
                      <img src={choiceTwo} className="card-img-top" alt={`Voting option Title: ${twoTitle}`}/>
                    </button>
                    <h5 className='my-2'>{title2VotePercentage}% of Votes</h5>
                  </div>
                </div>
            
                {/* <!-- 3rd Squabble choice --> */}
                <div className="col content">
                  <div className="card shadow squabble-choice" style={{width: '18rem'}}>
                    <button type='button' onClick={handleClick} className="btn btn-primary-outline img-thumbnail " data-bs-toggle="button" aria-pressed="true" id="choice3">
                      <div className="card-body">
                        <h4>{threeTitle}</h4>
                      </div>
                      <img src={choiceThree} className="card-img-top" alt={`Voting option Title: ${threeTitle}`}/>
                    </button>
                    <h5 className='my-2'>{title3VotePercentage}% of Votes</h5>
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