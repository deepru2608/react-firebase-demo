import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { firestore } from '../firebase/config';

function Users() {
    const [users, setuUsers] = useState([]);

    useEffect(() => {
        const userRef = firestore.collection('users');
        const unsubscribe = userRef.onSnapshot(querySnapshot => {
            const users = querySnapshot.docs.map(doc => doc.data());
            setuUsers(users);
        });

        return unsubscribe;
    }, []);

    return (
        <div className="jumbotron bg-light">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Specialty</th>
                        <th>Secret Address</th>
                        <th>Phone</th>
                        <th>IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.uid} style={user.phone === "9717082608" ? { backgroundColor: '#F5C160' } 
                            : { backgroundColor: '#E8DEA5' }}>
                                <td><Link to={`/profile/${user.uid}`}>{user.name}</Link></td>
                                <td>{user.specialty}</td>
                                <td>{user.address}, {user.city}, {user.state}-{user.zip}</td>
                                <td>{user.phone}</td>
                                <td>{user.ip}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Users
