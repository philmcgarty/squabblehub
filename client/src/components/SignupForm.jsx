import React from "react";

const SignupForm = () => {

    return (
        // {/* <!-- Sign Up Form --> */}
        <div className="col card shadow m-5 d-grid">
            <h3 className="text-center mt-3">Sign Up</h3>
            <div className="card-body d-block">
                <form >
                    <div className="form-group mt-4">
                        <div className="form-group">
                            <label for="formGroupExampleInput">Username</label>
                            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Choose your username" />
                        </div>
                        <label className="mt-3" for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group mt-3">
                        <label for="InputPassword1">Password</label>
                        <input type="password" className="form-control" id="InputPassword1" placeholder="Password" />
                    </div>
                    <div className="card-body d-grid" id="subscribe-btn">
                        <a href="#" className="btn btn-primary">Subscribe</a>
                    </div>
                </form>
            </div>
        </div>
        // {/* <!-- END of Sign Up Form --> */ }
    )
}

export default SignupForm;