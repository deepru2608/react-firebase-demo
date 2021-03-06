import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { signup } from '../firebase/auth';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

function Signup(props) {
    const { register, handleSubmit, reset, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        let newUser;
        setIsLoading(true);
        try {
            newUser = await signup(data);
            reset();
        } catch (error) {
            console.log(error);
        }

        if (newUser) {
            props.history.push(`/profile/${newUser.uid}`);
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
                            <label>First Name</label>
                            <input type="text" className={classNames("form-control", { "is-invalid": errors.firstName })}
                                name="firstName" placeholder="First Name"
                                ref={register({ required: 'Please enter your first name!' })} />
                            <small className="form-text text-danger">{errors.firstName && errors.firstName.message}</small>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className={classNames("form-control", { "is-invalid": errors.lastName })}
                                name="lastName" placeholder="Last Name"
                                ref={register({ required: 'Please enter your last name!' })} />
                            <small className="form-text text-danger">{errors.lastName && errors.lastName.message}</small>
                        </div>
                    </div>
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
                                <button type="submit" className="btn btn-primary btn-sm">Sign Up</button>
                            </div>
                            <div className="p-2">
                                {isLoading ? <CircularProgress size={20} /> : ''}
                            </div>
                            <div className="p-2">
                                <Link to="/login" className="nav-link">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
