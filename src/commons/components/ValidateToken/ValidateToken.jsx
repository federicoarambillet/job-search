import React, { useContext, useEffect } from 'react';
import { authContext } from '../../../Context/AuthProvider.jsx';
import { postWithToken } from '../../../api';

function ValidateToken() {
    //Authentication
    const context = useContext(authContext);

    //Validate token
    useEffect(() => {
     
        postWithToken("/api/auth/validate")
            .then(({ data }) => {
                if (data.failed) {
                    console.log(data)
                } else {
                    //Storing user data
                    context.setAuth({
                        id: data.user.id,
                        name: data.user.name,
                        email: data.user.email,
                        role: data.user.role,
                        logged: true
                    })
                }
            })
    }, [])

    return (
        <></>
    )
}

export default ValidateToken;