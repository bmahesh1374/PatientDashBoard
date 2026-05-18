import React from "react";
import "../styles/Navbar.css";
import testLogo from "../assets/TestLogo.svg";
import overviewIcon from "../assets/home_FILL0_wght300_GRAD0_opsz24.svg";
import patientsIcon from "../assets/group_FILL0_wght300_GRAD0_opsz24.svg";
import scheduleIcon from "../assets/calendar_today_FILL0_wght300_GRAD0_opsz24.svg";
import messageIcon from "../assets/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg";
import transactionIcon from "../assets/credit_card_FILL0_wght300_GRAD0_opsz24.svg";
import settingsIcon from "../assets/settings_FILL0_wght300_GRAD0_opsz24.svg";
import moreIcon from "../assets/more_vert_FILL0_wght300_GRAD0_opsz24.svg";
import doctorImg from "../assets/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc@2x.png";

function Navbar() {
  return (
    <section className="navbar">
      <div className="navbar-left">
        <img src={testLogo} alt="logo" className="logo" />
      </div>
      <div className="navbar-center">
        <a href="/home" className="nav-item">
          <img src={overviewIcon} alt="overview" className="icon" />
          Home
        </a>
        <a href="patients" className="nav-item active">
          <img src={patientsIcon} alt="patients" className="icon" />
          Patients
        </a>
        <a href="schedule" className="nav-item">
          <img src={scheduleIcon} alt="schedule" className="icon" />
          Schedule
        </a>
        <a href="messages" className="nav-item">
          <img src={messageIcon} alt="message" className="icon" />
          Message
        </a>
        <a href="transactions" className="nav-item">
          <img src={transactionIcon} alt="transactions" className="icon" />
          Transactions
        </a>
      </div>

      <div className="navbar-right">
        <div className="profile">
          <img src={doctorImg} alt="profile" className="profile-img" />
          <div>
            <p className="name">Dr. Jose Simmons</p>
            <span className="role">General Practitioner</span>
          </div>
        </div>

        <img src={settingsIcon} alt="settings" className="settings-icon" />
        <img src={moreIcon} alt="more" className="more-icon" />
      </div>
    </section>
  );
}

export default Navbar;
