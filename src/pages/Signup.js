import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { signup } from '../firebase/auth';

function Signup() {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await signup(data);
            reset();
            console.info("Success");
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <div className="jumbotron bg-light">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" placeholder="First Name" ref={register} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" placeholder="Last Name" ref={register} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control" name="email" placeholder="Email Address" ref={register} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password" placeholder="Password" ref={register} />
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
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup
