import firebase from 'firebase';
import { createUserDocument } from './user';

export const signup = async ({ firstName, lastName, email, password }) => {
    const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
    var user = resp.user;
    await user.updateProfile({ displayName: `${firstName} ${lastName}` });
    await createUserDocument(user);
    return user;
}

export const logout = async () => {
    return await firebase.auth().signOut();
}

export const login = async ({ email, password }) => {
    const resp = await firebase.auth().signInWithEmailAndPassword(email, password);
    return resp.user;
}