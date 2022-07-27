import React from 'react';

import choiceOne from '../images/300.jpg'
import choiceTwo from '../images/Annihilation.jpg'
import choiceThree from '../images/Forrest Gump.jpg'

import { useMutation } from '@apollo/client';

import { NEXT_VOTE_ONE, NEXT_VOTE_TWO, NEXT_VOTE_THREE } from '../utils/mutations';

const NextSquabblePoll = (props) => {

  const {question, oneTitle, oneVoteCount, twoTitle, twoVoteCount, threeTitle, threeVoteCount} = props.pollData
  const totalVotes = oneVoteCount + twoVoteCount + threeVoteCount;     
 
  const [voteNextOptOne] = useMutation(NEXT_VOTE_ONE);
  const [voteNextOptTwo] = useMutation(NEXT_VOTE_TWO);
  const [voteNextOptThree] = useMutation(NEXT_VOTE_THREE);

  
  const handleClick = (event) => {
    
      if(event.currentTarget.id === "choice1" ) {
        voteNextOptOne();  
      }
      else if (event.currentTarget.id === "choice2") {
        voteNextOptTwo();       
      }
      else {
        voteNextOptThree();
 
      }  
  
    };

    const displayVote = (choice)=>{    
       
      if ( choice === 1) {
         const choiceOnePercentage = Math.round(oneVoteCount / totalVotes * 100)
          return choiceOnePercentage
      } 
      else if (choice === 2){
        const choiceTwoPercentage = Math.round(twoVoteCount / totalVotes * 100)
        return choiceTwoPercentage
      }
      else {
        const choiceThreePercentage = Math.round(threeVoteCount / totalVotes * 100)
        return choiceThreePercentage
      }   
  }
    return (
      
        <section>
          <div className="container display-grid">
            {/* <!-- Total container --> */}
            <div className="row justify-content-center mt-2" id="sqabble-choices">
            
              <h3 className="text-center">{question}</h3>
            
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
                    <h5 className='my-2' >{displayVote(1)}% of Votes</h5>
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
                    <h5 className='my-2'>{displayVote(2)}% of Votes</h5>
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
                    <h5 className='my-2'>{displayVote(3)}% of Votes</h5>
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