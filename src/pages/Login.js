import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { login } from '../firebase/auth';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

function Login(props) {
    const { register, handleSubmit, reset, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const routeOnLogin = async (user) => {
        const token = await user.getIdTokenResult();
        if (token.claims.admin) {
            props.history.push('/users');
        } else {
            props.history.push(`/profile/${user.uid}`);
        }
    }

    const onSubmit = async (data) => {
        let user;
        setIsLoading(true);
        try {
            user = await login(data);
            reset();
            console.info("Success");
        } catch (error) {
            console.log(error);
        }

        if (user) {
            await routeOnLogin(user);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div className="jumbotron bg-light">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className={classNames("form-control", { "is-invalid": errors.email })}
                                name="email" placeholder="Email Address"
                                ref={register({ required: 'Please enter your email address!' })} />
                            <small className="form-text text-danger">{errors.email && errors.email.message}</small>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className={classNames("form-control", { "is-invalid": errors.password })}
                                name="password" placeholder="Password"
                                ref={register({
                                    required: 'Please enter your password!',
                                    minLength: {
                                        value: 6,
                                        message: 'Password should be at least 6 characters!'
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: 'Password should be 15 length maximum!'
                                    }
                                })} />
                            <small className="form-text text-danger">{errors.password && errors.password.message}</small>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center mt-2">
                        <div className="d-flex justify-content-center">
                            <div className="p-2">
                                <button type="submit" className="btn btn-primary btn-sm">Login</button>
                            </div>
                            <div className="p-2">
                                {isLoading ? <CircularProgress size={20} /> : ''}
                            </div>
                            <div className="p-2">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
