import React from "react";
import NextSquabblePoll from "../components/NextSquabblePoll";
import SuggestionForm from "../components/SuggestionForm";
import SuggestionHistory from "../components/SuggestionHistory";
import { QUERY_POLLS } from '../utils/queries';
import { useQuery } from '@apollo/client';
const Profile = () => {

    const { loading, data } = useQuery(QUERY_POLLS);
    const pollData = data?.polls[0] || [];
    
    return (
        <div>
            {loading ? ( <h3 className="text-center">Loading...</h3> ) : (
           <NextSquabblePoll pollData={pollData}/>
            )}
           <section>
                <div className ="container display-grid mt-3">
                    <div className="row">
                        <SuggestionForm />
                        <SuggestionHistory />
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Profile;