import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) {
          setLoading(false);
          return;
        }

        const { data } = await axios.get("http://localhost:5000/api/teachers/me", {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
        });

        setTeacher(data);
      } catch (error) {
        console.error("Error fetching teacher details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherDetails();
  }, []);

  return (
    <div>
      <center><h2>🏡 Welcome to Dashboard Home</h2></center>
      <br></br>
      {loading ? (
        <p>Loading teacher details...</p>
      ) : teacher ? (
        <p>👨‍🏫 Welcome, <strong>{teacher.name}</strong> (Employee ID: {teacher.employeeID})</p>
      ) : (
       <center><img src="https://d1vwxdpzbgdqj.cloudfront.net/pes-software-dev/pes-banner-image.jpg"></img></center> 
      
      )}
      <br></br>
      <center><h2>Welcome to PES NOTES</h2></center>
    </div>
  );
};

export default Home;
