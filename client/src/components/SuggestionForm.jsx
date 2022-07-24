import React from "react";

const SuggestionForm = () => {
    return (

        <div className="col">
            <h3 className="text-center">Suggest a Squabble</h3>
            {/* <!-- Suggest a Squabble FORM --> */}
            <div className="card shadow mt-3 p-4">
                <div className="mb-3 text-center">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter the book / movie title(s)</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary" type="submit" id="suggestion-submit">Submit your suggestion</button>
                </div>
            </div>
        </div>
    )
}

export default SuggestionForm;