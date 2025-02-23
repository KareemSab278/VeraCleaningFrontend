import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PopupWrapper from "../components/PopUp";
import TextBox from "../components/TextBox";
import { createJob, getJobs } from "../app";
import Dropdown from "../components/Dropdown";
import { employeeOptions } from "../tempData";
import { employeeNames } from "../tempData";

//================================================================================

export const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const manager = location.state?.manager;
  const [jobName, setJobName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(employeeOptions[0]);
  const [employeeTask, setEmployeeTask] = useState("");
  const [showEmployeesPopup, setShowEmployeesPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleEmployeeClick = () => {
    navigate("/employees");
  };

  //================================================================================
  // Fetch jobs when the component mounts

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  //================================================================================
  // Handle form submission to create a new job

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobName.trim()) {
      setError("Job name cannot be empty.");
      return;
    }
    setLoading(true);
    setError(null);
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
      setError("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //================================================================================
  // Handle assigning an employee to a job

  const handleAssignEmployee = async (e) => {
    e.preventDefault();

    // Check if jobName is set
    if (!jobName) {
      setError("No job selected. Please select a job first.");
      return;
    }

    // Validate employee name and task
    if (!employeeName.trim() || !employeeTask.trim()) {
      setError("Employee name and task cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Find the job by jobName
      const job = jobs.find((j) => j.jobName === jobName);
      if (!job) {
        setError("Job not found.");
        return;
      }

      const response = await fetch(`/jobs/${job._id}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName,
          employeeTask,
        }),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        setJobs((prevJobs) =>
          prevJobs.map((j) => (j._id === job._id ? updatedJob : j))
        );
        setEmployeeName("");
        setEmployeeTask("");
      } else {
        setError("Failed to assign employee.");
      }
    } catch (error) {
      console.error("Error assigning employee:", error);
      setError("Failed to assign employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //================================================================================
  // Open the employees popup for a specific job

  const handleViewEmployees = (job) => {
    setSelectedJob(job);
    setShowEmployeesPopup(true);
  };

  //================================================================================
  // Render the employees popup

  const renderEmployeesPopup = () => {
    if (!selectedJob) return null; // Guard clause if no job is selected
    return (
      <PopupWrapper
        isOpen={showEmployeesPopup}
        onClose={() => setShowEmployeesPopup(false)}
      >
        <h2>Employees for {selectedJob.jobName}</h2>
        {selectedJob.employees && selectedJob.employees.length > 0 ? (
          selectedJob.employees.map((employee) => (
            <button
              key={employee.employeeId}
              style={{ display: "block", margin: "10px 0" }}
              onClick={() => handleEmployeeClick(employee)} // Navigate on employee click
            >
              {employee.fullName}
            </button>
          ))
        ) : (
          <p>No employees assigned to this job.</p>
        )}
      </PopupWrapper>
    );
  };

  //================================================================================
  // Show all tasks for the jobs based on tempdata

  const renderTasks = (job) => {
    const allTasks = job.employees?.flatMap((emp) => emp.tasks) || [];
    if (allTasks.length > 0) {
      return (
        <ul>
          {allTasks.map((task) => (
            <li key={task.taskId}>
              <strong>Task:</strong> {task.taskName} <br />
              <strong>Status:</strong> {task.status} <br />
              <strong>Start:</strong> {new Date(task.startTime).toLocaleString()} <br />
              <strong>End:</strong>{" "}
              {task.endTime ? new Date(task.endTime).toLocaleString() : "N/A"}
            </li>
          ))}
        </ul>
      );
    } else {
      return <p>No tasks found for this job.</p>;
    }
  };

  //================================================================================
  // Render the component

  return (
    <div>
      <h1>Jobs</h1>
      {manager && (
        <p>
          Signed in as: <strong>{manager.fullName}</strong>
        </p>
      )}
      <p>This section is for creating a new job</p>

      {/* ======================================================================== */}
      {/* Create New Job Section */}

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

      {/* ======================================================================== */}
      {/* Display Existing Jobs */}

      <h3>View Details For Current Jobs</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <PopupWrapper
            key={job._id}
            trigger={
              <button onClick={() => setJobName(job.jobName)}>{job.jobName}</button>
            }
          >
            <h2>{job.jobName} Details</h2>
            <p>
              <strong>Created By:</strong> {job.createdBy}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(job.createdAt).toLocaleString()}
            </p>
            {renderTasks(job)}

            {/* ======================================================================== */}
            {/* View Employees Button */}

            <PopupWrapper
              trigger={
                <button
                  style={{ marginRight: "30px", backgroundColor: "blue" }}
                >
                  View Employees
                </button>
              }
            >
              <h2>{job.jobName} Employees</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <strong>
                  {employeeNames.map((emp, index) => (
                    <React.Fragment key={index}>
                      {emp.label}
                      <br />
                      tasks:
                      <br />
                      <br />
                    </React.Fragment>
                  ))}
                </strong>
                <br />
              </form>
              <button onClick={handleEmployeeClick}>Go To Employees Page</button>
              <br />
            </PopupWrapper>

            {/* ======================================================================== */}
            {/* Assign Employee and Task Button */}

            {/* <PopupWrapper trigger={<button>Assign Employee and Task</button>}>
              <h2>New Employee</h2>
              <form onSubmit={handleAssignEmployee}>
                <TextBox
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Enter Employee FullName"
                />
                <br />
                <br />
                <TextBox
                  value={employeeTask}
                  onChange={(e) => setEmployeeTask(e.target.value)}
                  placeholder="Enter Task (room)"
                />
                <br />
                <br />
                <button type="submit">Submit</button>
              </form>
            </PopupWrapper> */}

            {/* ======================================================================== */}
            {/* Terminate Job Button */}

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

      {/* Employees Popup */}
      {renderEmployeesPopup()}
    </div>
  );
};

export default Jobs;