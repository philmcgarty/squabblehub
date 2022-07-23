import React from "react";

const LoginForm = () => {
    return (
        // {/* <!-- Login Form--> */}
        <div className="col card m-5 shadow d-grid">
          <h3 className="text-center mt-3">login</h3>
          <div className="card-body d-block">
          <form >
            <div className="form-group mt-4">
              <div className="form-group">
                <label for="formGroupExampleInput">Username</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Enter your username"/>
              </div>
            </div>
            <div className="form-group mt-3">
              <label for="InputPassword2">Password</label>
              <input type="password" className="form-control" id="InputPassword2" placeholder="Password"/>
            </div>
            <div className="card-body d-grid mt-3" id="login-btn">
              <a href="#" className="btn btn-danger">Login</a>
            </div>
          </form>
          </div>
        </div>

    //   {/* <!-- END of Login Form --> */}
    )
}

export default LoginForm;