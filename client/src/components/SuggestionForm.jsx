import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SUGGESTION_ADD } from '../utils/mutations';
import { QUERY_SUGGESTIONS, QUERY_USER_ME } from '../utils/queries';

const SuggestionForm = () => {

    const [suggestionTitle, setTitle] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [suggestionAdd, { error }] = useMutation(SUGGESTION_ADD, {
        update(cache, { data: { suggestionAdd } }) {
      
            // could potentially not exist yet, so wrap in a try/catch
            try {
                // update me array's cache
                const { userMe } = cache.readQuery({ query: QUERY_USER_ME });
                cache.writeQuery({
                    query: QUERY_USER_ME,
                    data: { userMe: { ...userMe, suggestions: [...userMe.suggestions, suggestionAdd] } },
                });
            } 
            catch (e) {
                console.warn("First suggestion insertion by user!")
            }
        
            // update thought array's cache
            const { suggestionAllorByUser } = cache.readQuery({ query: QUERY_SUGGESTIONS });
            console.log(suggestionAllorByUser)
            cache.writeQuery({
                query: QUERY_SUGGESTIONS,
                data: { suggestionAllorByUser: [suggestionAdd, ...suggestionAllorByUser] }
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 100) {
            setTitle(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };
    const handleFormSubmit = async event => {
        event.preventDefault();
        
        try {
            // add suggestion to database
            await suggestionAdd({
                variables: { suggestionTitle }
            });
        
            // clear form value
            setTitle('');
            setCharacterCount(0);
        } 
        catch (e) {
            console.error(e);
        }
      };

    return (

        <div className="col">
            <h3 className="text-center">Suggest a Squabble</h3>
            {/* <!-- Suggest a Squabble FORM --> */}
            <form onSubmit={handleFormSubmit} className="card shadow mt-3 p-4">
                <div className="mb-3 text-center">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter the book / movie title(s)</label>
                    <textarea 
                    className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    value={suggestionTitle}
                    onChange={handleChange}
                    ></textarea>
                    <p className={`m-0 ${characterCount === 100 || error ? 'text-error' : ''}`}>
                        Character Count: {characterCount}/100
                        {error && <span className="ml-2"> Something went wrong...</span>}
                    </p>
                </div>
                
                <div className="d-grid">
                    <button className="btn btn-primary" type="submit" id="suggestion-submit">Submit your suggestion</button>
                </div>
            </form>
        </div>
    )
}

export default SuggestionForm;