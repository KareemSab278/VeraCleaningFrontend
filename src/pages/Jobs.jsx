// filepath: /C:/Users/user/Desktop/Experimental Management system/frontend/VeraCleaningFrontEnd/src/pages/Jobs.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PopupWrapper from "../components/PopUp";
import TextBox from "../components/TextBox";
import { createJob, getJobs } from "../app";

export const Jobs = () => {
  const location = useLocation();
  const manager = location.state?.manager;
  
  const [jobName, setJobName] = useState("");
  const [jobs, setJobs] = useState([]);

  // Fetch existing jobs when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Handle form submission to create a new job
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = await createJob({
        jobName,
        createdBy: manager ? manager.fullName : "Unknown",
        employees: [],
      });
      setJobs([...jobs, newJob]);
      setJobName("");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div>
      <h1>Jobs</h1>
      {manager && (
        <p>
          Signed in as: <strong>{manager.fullName}</strong>
        </p>
      )}
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

      <h3>View Details For Current Jobs</h3>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <PopupWrapper key={job._id} trigger={<button>{job.jobName}</button>}>
            <h2>{job.jobName} Details</h2>
            <p>
              <strong>Created By:</strong> {job.createdBy}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(job.createdAt).toLocaleString()}
            </p>
            {job.employees && job.employees.length > 0 ? (
              <ul>
                {job.employees.map((emp) => (
                  <li key={emp.employeeId}>
                    Employee: {emp.fullName}
                    {emp.tasks && emp.tasks.length > 0 && (
                      <ul>
                        {emp.tasks.map((task) => (
                          <li key={task.taskId}>
                            Task: {task.taskName} (Status: {task.status}) <br />
                            (Start: {new Date(task.startTime).toLocaleString()}, End:{" "}
                            {task.endTime ? new Date(task.endTime).toLocaleString() : "N/A"})
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No employees assigned.</p>
            )}
            <button
              style={{ marginRight: "30px", backgroundColor: "red" }}
              onClick={() => console.log("YOU ENDED THE JOB")}
            >
              !! TERMINATE JOB !!
            </button>
          </PopupWrapper>
        ))
      ) : (
        <p>No current jobs found.</p>
      )}
    </div>
  );
};

export default Jobs;