import React, { useEffect, useRef } from "react";
import "../styles/DashBoard.css";
import BirthIcon from "../assets/BirthIcon.svg";
import FemaleIcon from "../assets/FemaleIcon.svg";
import PhoneIcon from "../assets/PhoneIcon.svg";
import InsuranceIcon from "../assets/InsuranceIcon.svg";
import HeartIcon from "../assets/HeartBPM.svg";
import RespiratoryIcon from "../assets/respiratory rate.svg";
import TempIcon from "../assets/temperature.svg";

// const patient = {
//   name: "Jessica Taylor",
//   profile_picture: "https://fedskillstest.ct.digital/4.png",
//   date_of_birth: "August 23, 1996",
//   gender: "Female",
//   phone: "(415) 555-1234",
//   emergency: "(415) 555-5678",
//   insurance: "Sunrise Health Assurance",

//   history: [
//     { m: "Oct, 2023", s: 120, d: 80 },
//     { m: "Nov, 2023", s: 118, d: 65 },
//     { m: "Dec, 2023", s: 160, d: 108 },
//     { m: "Jan, 2024", s: 115, d: 80 },
//     { m: "Feb, 2024", s: 150, d: 70 },
//     { m: "Mar, 2024", s: 160, d: 78 },
//   ],

//   latest: {
//     sys: 160,
//     sysLevel: "Higher than Average",
//     dia: 78,
//     diaLevel: "Lower than Average",
//     hr: 78,
//     hrLevel: "Lower than Average",
//     rr: 20,
//     rrLevel: "Normal",
//     temp: 98.6,
//     tempLevel: "Normal",
//   },

//   diagnostics: [
//     {
//       name: "Hypertension",
//       description: "Chronic high blood pressure",
//       status: "Under Observation",
//     },
//     {
//       name: "Type 2 Diabetes",
//       description: "Insulin resistance and elevated blood sugar",
//       status: "Cured",
//     },
//     {
//       name: "Asthma",
//       description: "Recurrent episodes of bronchial constriction",
//       status: "Inactive",
//     },
//     {
//       name: "Osteoarthritis",
//       description: "Degenerative joint disease",
//       status: "Under Observation",
//     },
//     {
//       name: "Hyperlipidemia",
//       description: "High levels of lipids in the blood",
//       status: "Under Observation",
//     },
//   ],

//   labResults: [
//     "Blood Tests",
//     "CT Scans",
//     "Radiology Reports",
//     "X-Rays",
//     "Urine Test",
//   ],
// };

function statusClass(status) {
  if (status === "Cured") return "status-cured";
  if (status === "Inactive") return "status-inactive";
  return "status-observation";
}
function DashBoard({selectedPatient}) {
  const chartRef = useRef(null);

  useEffect(() => {
    const init = () => {
      if (typeof window.Chart === "undefined") {
        setTimeout(init, 100);
        return;
      }
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;
      if (chartRef.current._chart) chartRef.current._chart.destroy();

      chartRef.current._chart = new window.Chart(ctx, {
        type: "line",
        data: {
          labels: selectedPatient.diagnosis_history.map((i) => i.month),
          datasets: [
            {
              label: "Systolic",
              data: selectedPatient.diagnosis_history?.map((i) => i.blood_pressure?.systolic?.value),
              borderColor: "#e066a8",
              tension: 0.45,
              pointBackgroundColor: "#e066a8",
              pointRadius: 5,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Diastolic",
              data: selectedPatient.diagnosis_history?.map((i) => i.blood_pressure?.systolic?.value),
              borderColor: "#8a63d2",
              tension: 0.45,
              pointBackgroundColor: "#8a63d2",
              pointRadius: 5,
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 11 }, color: "#6b7280" },
            },
            y: {
              min: 60,
              max: 180,
              grid: { color: "#ede9f6" },
              ticks: { stepSize: 20, font: { size: 11 }, color: "#6b7280" },
            },
          },
        },
      });
    };

    if (!document.querySelector('script[src*="chart.js"]')) {
      const s = document.createElement("script");
      s.src =
        "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
      s.onload = init;
      document.head.appendChild(s);
    } else {
      init();
    }
  }, [selectedPatient]);

  if (!selectedPatient) {
    return <h2 style={{ padding: "20px"}}>Select a patient</h2>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-main">
        <div className="section-card">
          <h2 className="section-title">Diagnosis History</h2>
          <div className="bp-card">
            <div className="bp-left">
              <div className="bp-header">
                <span className="bp-title">Blood Pressure</span>
                <select className="bp-select">
                  <option>Last 6 months</option>
                </select>
              </div>
              <div className="chart-area">
                <canvas ref={chartRef} />
              </div>
            </div>
            <div className="bp-right">
              <div className="bp-stat">
                <div className="bp-dot" style={{ background: "rgb(224, 102, 168)" }} />
                <span className="bp-label">Systolic</span>
                <span className="bp-value">{selectedPatient.latest?.sys}</span>
                <span className="bp-level">
                  &#9650; {selectedPatient.latest?.sysLevel}
                </span>
              </div>
              <hr className="bp-divider" />
              <div className="bp-stat">
                <div className="bp-dot" style={{ background: "rgb(138, 99, 210)" }} />
                <span className="bp-label">Diastolic</span>
                <span className="bp-value">{selectedPatient.latest?.dia}</span>
                <span className="bp-level">
                  &#9660; {selectedPatient.latest?.diaLevel}
                </span>
              </div>
            </div>
          </div>
          <div className="vitals-row">
            <div className="vital-card vital-respiratory">
              <img
                src={RespiratoryIcon}
                alt="respiratory"
                className="vital-icon"
              />
              <p className="vital-name">Respiratory Rate</p>
              <p className="vital-val">
                {selectedPatient.latest?.rr} <span className="vital-unit">bpm</span>
              </p>
              <p className="vital-level">{selectedPatient.latest?.rrLevel}</p>
            </div>
            <div className="vital-card vital-temperature">
              <img src={TempIcon} alt="temperature" className="vital-icon" />
              <p className="vital-name">Temperature</p>
              <p className="vital-val">
                {selectedPatient.latest?.temp}
                <span className="vital-unit">°F</span>
              </p>
              <p className="vital-level">{selectedPatient.latest?.tempLevel}</p>
            </div>
            <div className="vital-card vital-heart">
              <img src={HeartIcon} alt="heart rate" className="vital-icon" />
              <p className="vital-name">Heart Rate</p>
              <p className="vital-val">
                {selectedPatient.latest?.hr} <span className="vital-unit">bpm</span>
              </p>
              <p className="vital-level">&#9660; {selectedPatient.latest?.hrLevel}</p>
            </div>
          </div>
        </div>
        <div className="section-card">
          <h2 className="section-title">Diagnostic List</h2>
          <div className="diag-table-wrapper">
            <table className="diag-table">
              <thead>
                <tr>
                  <th>Problem/Diagnosis</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedPatient.diagnostics?.map((d, i) => (
                  <tr key={i}>
                    <td>{d.name}</td>
                    <td>{d.description}</td>
                    <td>
                      <span className={"status-badge " + statusClass(d.status)}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="dashboard-right">
        <div className="patient-profile">
          <img
            src={selectedPatient.profile_picture}
            alt={selectedPatient.name}
            className="patient-avatar"
          />
          <h3 className="patient-fullname">{selectedPatient.name}</h3>
          <div className="info-list">
            <div className="info-row">
              <img src={BirthIcon} alt="dob" className="info-icon" />
              <div className="info-text">
                <p className="info-label">Date Of Birth</p>
                <p className="info-value">{selectedPatient.date_of_birth}</p>
              </div>
            </div>
            <div className="info-row">
              <img src={FemaleIcon} alt="gender" className="info-icon" />
              <div className="info-text">
                <p className="info-label">Gender</p>
                <p className="info-value">{selectedPatient.gender}</p>
              </div>
            </div>
            <div className="info-row">
              <img src={PhoneIcon} alt="phone" className="info-icon" />
              <div className="info-text">
                <p className="info-label">Contact Info.</p>
                <p className="info-value">{selectedPatient.phone}</p>
              </div>
            </div>
            <div className="info-row">
              <img src={PhoneIcon} alt="emergency" className="info-icon" />
              <div className="info-text">
                <p className="info-label">Emergency Contacts</p>
                <p className="info-value">{selectedPatient.emergency}</p>
              </div>
            </div>
            <div className="info-row">
              <img src={InsuranceIcon} alt="insurance" className="info-icon" />
              <div className="info-text">
                <p className="info-label">Insurance Provider</p>
                <p className="info-value">{selectedPatient.insurance}</p>
              </div>
            </div>
          </div>
          <button className="show-all-btn">Show All Information</button>
        </div>
        <div className="lab-card">
          <h3 className="lab-title">Lab Results</h3>
          <ul className="lab-list">
            {selectedPatient.labResults?.map((item, i) => (
              <li key={i} className="lab-item">
                <span className="lab-name">{item}</span>
                <button className="lab-download" title="Download">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default DashBoard;
