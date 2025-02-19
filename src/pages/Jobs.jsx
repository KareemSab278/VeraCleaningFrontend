import React, { useState } from "react";
import PopupWrapper from "../components/PopUp";
import TextBox from "../components/TextBox";
import Dropdown from "../components/Dropdown";

// ============================== Import Data ============================== //
import { jobOptions, employeeOptions, tempTasks } from "../tempData";

// ============================== Jobs Component ==============================
export const Jobs = () => {
  // ========================== State Declarations ==========================
  const [jobName, setJobName] = useState("");
  const [selectedJob, setSelectedJob] = useState(jobOptions[0]);

  // ========================== Form Submission Handler ==========================
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Name:", jobName);
  };

  // ========================== Render Component ==========================
  return ( 
    <div>
      <h1>Jobs</h1>
      <p>This section is for creating a new job</p>
      
      {/* ------------------ Create New Job Section ------------------ */}
      <PopupWrapper trigger={<button>Create New Job</button>}>
        <h2>New Job</h2>
        <form onSubmit={handleSubmit}>
          <TextBox
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            placeholder="Enter Job Name"
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </PopupWrapper>
      <br />

      {/* ------------------ Job Details Buttons ------------------ */}
      <h3>View Details For Current Jobs</h3>
      {jobOptions.map((job) => (
        <PopupWrapper key={job.value} trigger={<button>{job.label}</button>}>
          <h2>{job.label} Details</h2>
          <ul>
            {tempTasks.map((emp, index) => (
              <li key={index}>
                Employee: {emp.name} — Task: {emp.task} <br />
                (Start: {emp.startTime}, End: {emp.endTime})
              </li>
            ))}
          </ul>
            {/* ------------------ TERMINATE JOB ------------------ */}
          <button style={{ marginRight: "30px", backgroundColor: "red"}}
          onClick={()=>{console.log('YOU ENDED THE JOB')}}
          >!! TERMINATE JOB !!
          </button>

        </PopupWrapper>
      ))}

<h3>View Details For Terminated  Jobs</h3>
      {jobOptions.map((job) => (
        <PopupWrapper key={job.value} trigger={<button>{job.label}</button>}>
          <h2>{job.label} Details</h2>
          <ul>
            {tempTasks.map((emp, index) => (
              <li key={index}>
                Employee: {emp.name} — Task: {emp.task} <br />
                (Start: {emp.startTime}, End: {emp.endTime})
              </li>
            ))}
          </ul>
            {/* ------------------ TERMINATE JOB ------------------ */}
          <button style={{ marginRight: "30px", backgroundColor: "red"}}
          onClick={()=>{console.log('YOU ENDED THE JOB')}}
          >!! TERMINATE JOB !!
          </button>

        </PopupWrapper>
      ))}



    </div>
    
  );
};

export default Jobs;