import React, { useEffect, useState } from 'react';

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        // const email = user?.email; 
        if (user) {
            fetch(`https://piccomment.onrender.com/users/${user.email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    // authorization: `Bearer ${localStorage.getItem('surveyTokenIs')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data, "data ");
                    if (data.error) {
                        setAdmin(false)
                        setAdminLoading(false);

                    }
                    else if (data.role) {
                        if (data.role == "admin") {
                            setAdmin(true);
                            setAdminLoading(false);

                        }
                        else {
                            setAdmin(false);
                            setAdminLoading(false);
                        }

                    }
                    else {
                        setAdmin(false)
                        setAdminLoading(false);
                    }


                })
                .catch(err => {
                    console.log(err);
                    setAdminLoading(false)
                })
        }
        else{
            setAdmin(false)
            setAdminLoading(false)
        }
    }, [user])

    return [admin, adminLoading]
};

export default useAdmin;