import React from 'react';
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <>
            <div className="sign-in-from">
                <h1 className="mb-0">Sign in</h1>
                <p>Enter your email address and password to access admin panel.</p>
                <form className="mt-4">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control mb-0" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <Link to="/" className="float-right">Forgot password?</Link>
                        <input type="password" className="form-control mb-0" id="exampleInputPassword1"
                            placeholder="Password" />
                    </div>
                    <div className="d-inline-block w-100">
                        <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember Me</label>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Sign in</button>
                    </div>
                    <div className="sign-info">
                        <span className="dark-color d-inline-block line-height-2">Don't have an account?
                            <Link to="/">Sign up</Link></span>
                        <ul className="iq-social-media">
                            <li><Link to="/"><i className="ri-facebook-box-line" /></Link></li>
                            <li><Link to="/"><i className="ri-twitter-line" /></Link></li>
                            <li><Link to="/"><i className="ri-instagram-line" /></Link></li>
                        </ul>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignIn;