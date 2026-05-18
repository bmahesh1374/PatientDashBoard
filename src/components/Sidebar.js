import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import searchIcon from "../assets/search_FILL0_wght300_GRAD0_opsz24.svg";
import moreIcon from "../assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg";

function Sidebar({setSelectedPatient}) {
  const [patients, setPatients] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
      headers: {
        Authorization: "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or failed request");
        }
        return res.json();
      })
      .then((data) => {
        console.log("DATA ", data);

        setPatients(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR ", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Patients</h3>
        <img src={searchIcon} alt="search" className="search-icon" />
      </div>
      <div className="patient-list">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : patients.length === 0 ? (
          <p className="loading">No patients found</p>
        ) : (
          patients.map((patient, index) => (
            <div
              key={index}
              className={`patient-item ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => {
  setActiveIndex(index);
  setSelectedPatient(patient);
}}
            >
              <img
                src={patient.profile_picture}
                alt={patient.name}
                className="patient-img"
              />

              <div className="patient-info">
                <p className="patient-name">{patient.name}</p>
                <span className="patient-meta">
                  {patient.gender}, {patient.age}
                </span>
              </div>
              <img src={moreIcon} alt="more" className="more-icon" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;
