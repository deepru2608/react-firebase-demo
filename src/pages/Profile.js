import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSession } from '../firebase/UserProvider';
import { firestore } from "../firebase/config";
import classNames from 'classnames';
import { useForm } from "react-hook-form";
import { CircularProgress } from '@material-ui/core';
import mapValues from 'lodash/mapValues';
import { updateUserDocument } from '../firebase/user';
import ProfileImage from '../ProfileImage';

function Profile() {
    const { user } = useSession();
    const [userDocument, setUserDocument] = useState(null);
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { register, errors, setValue, handleSubmit } = useForm();

    useEffect(() => {
        const docRef = firestore.collection('users').doc(params.id);
        const unsubscribe = docRef.onSnapshot((doc) => {
            if (doc.exists) {
                const documentData = doc.data();
                setUserDocument(documentData);
                setTimeout(() => {
                    mapValues(documentData, (value, key) => setValue(key, value));
                });
            }
        });

        return unsubscribe;
    }, [user.uid, params.id, setValue])


    const updateUser = async (data) => {
        try {
            setIsLoading(true);
            await updateUserDocument({ uid: params.id, ...data });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!userDocument) {
        return null;
    }

    return (
        <div className="jumbotron bg-light">

            <div className="row">
                <div className="col-sm-3">
                    <ProfileImage id={params.id} />
                </div>
                <div className="col-sm-9">
                    <form onSubmit={handleSubmit(updateUser)}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.name })}
                                        name="name" placeholder="Full Name"
                                        ref={register({ required: 'Please enter your full name!' })} />
                                    <small className="form-text text-danger">{errors.name && errors.name.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.email })}
                                        name="email" placeholder="Email Address"
                                        ref={register({ required: 'Please enter your email address!' })} />
                                    <small className="form-text text-danger">{errors.email && errors.email.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.city })}
                                        name="city" placeholder="City"
                                        ref={register({ required: 'Please enter your city!' })} />
                                    <small className="form-text text-danger">{errors.city && errors.city.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>State</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.state })}
                                        name="state" placeholder="State"
                                        ref={register({ required: 'Please enter your state!' })} />
                                    <small className="form-text text-danger">{errors.state && errors.state.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Zip</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.zip })}
                                        name="zip" placeholder="Zip"
                                        ref={register({ required: 'Please enter your zip!' })} />
                                    <small className="form-text text-danger">{errors.zip && errors.zip.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.address })}
                                        name="address" placeholder="Address"
                                        ref={register({ required: 'Please enter your address!' })} />
                                    <small className="form-text text-danger">{errors.address && errors.address.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.phone })}
                                        name="phone" placeholder="Phone"
                                        ref={register({ required: 'Please enter your phone!' })} />
                                    <small className="form-text text-danger">{errors.phone && errors.phone.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Specialty</label>
                                    <select className={classNames("form-control", { "is-invalid": errors.specialty })}
                                        name="specialty" placeholder="Specialty"
                                        ref={register({
                                            required: 'Please enter your specialty!',
                                            validate: {
                                                defaultValue: value => value !== "Select Specialty" || 'Please select any specialty!'
                                            }
                                        })}>
                                        <option value="Select Specialty">Select Specialty</option>
                                        <option value="Field Agent">Field Agent</option>
                                        <option value="Office Agent">Office Agent</option>
                                    </select>
                                    <small className="form-text text-danger">{errors.specialty && errors.specialty.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label>Ip</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.ip })}
                                        name="ip" placeholder="Ip"
                                        ref={register({ required: 'Please enter your ip!' })} />
                                    <small className="form-text text-danger">{errors.ip && errors.ip.message}</small>
                                </div>
                            </div>
                            <div className="col-sm-12 text-right mt-2">
                                <div className="d-flex justify-content-center">
                                    <div className="p-2">
                                        <button type="submit" className="btn btn-primary btn-sm">Update Proile</button>
                                    </div>
                                    <div className="p-2">
                                        {isLoading ? <CircularProgress size={20} /> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Profile
