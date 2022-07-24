import React from "react";
import NextSquabblePoll from "../components/NextSquabblePoll";
import SuggestionForm from "../components/SuggestionForm";
import SuggestionHistory from "../components/SuggestionHistory";

const Profile = () => {


    return (
        <div>
           <NextSquabblePoll />
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