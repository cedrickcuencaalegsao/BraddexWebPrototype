import axios from "axios";
import React, { useState, useEffect } from "react";

const ClientUserProfile = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const id = localStorage.getItem('id');
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/profile/${id}`);
            setData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) 
        return <div>Loading...</div>;
    if (error) 
        return <div>Error: {error.message}</div>;

    return (
        <div className="profile">
            <a href="/client-home">Home</a>
            <h1>profile</h1>
            <p>first name: <span>{data.f_name}</span></p>
            <p>last Name: <span>{data.l_name}</span></p>
            <p>Email: <span>{data.email}</span></p>
            <p>Phone No: <span>{data.phone_no}</span></p>
            <p>Address: <span>{data.address}</span></p>
            <p>Profile: <span>{data.prof_pic}</span></p>
            <p>id: <span>{data.birthday}</span></p>
            <p>id: <span>{data.isActive}</span></p>
            <p>id: <span>{data.isOnline}</span></p>
        </div>
    )
}

export default ClientUserProfile;