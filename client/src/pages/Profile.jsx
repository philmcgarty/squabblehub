import React from "react";
import { Navigate } from 'react-router-dom';

import NextSquabblePoll from "../components/NextSquabblePoll";
import SuggestionForm from "../components/SuggestionForm";
import SuggestionHistory from "../components/SuggestionHistory";

import { QUERY_POLLS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth'

const Profile = () => {
    
    const { loading, data } = useQuery(QUERY_POLLS);
    const pollData = data?.polls[0] || [];
    
    // navigate to personal profile page if username is the logged-in user's if not redirect to home page
     if (!Auth.loggedIn()) {
     return <Navigate to="/home" />;
    }
    else {
    
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
}
export default Profile;