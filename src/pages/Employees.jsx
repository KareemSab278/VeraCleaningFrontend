//======== Imports
import React, { useState, useEffect } from 'react';
import { getJobs, getJobEmployees } from '../app';
import Dropdown from '../components/Dropdown';
import TextBox from '../components/TextBox';
import PopupWrapper from '../components/PopUp';
import ImageUploadPopup from '../components/ImageUploadButton';

//================================================================================
const Employees = () => {
  const [taskName, setTaskName] = useState("");       // Task name for Task Details form
  const [startTime, setStartTime] = useState("");     // Start time for Task Details form
  const [endTime, setEndTime] = useState("");         // End time for Task Details form
  const [taskImageUrl, setTaskImageUrl] = useState(""); // Image URL for Task Details form
  const [jobs, setJobs] = useState([]);               // List of jobs from API
  const [loading, setLoading] = useState(false);      // Loading state for API calls
  const [selectedJob, setSelectedJob] = useState(null); // Currently selected job
  const [employees, setEmployees] = useState([]);     // List of employees for selected job
  const [employeeName, setEmployeeName] = useState(""); // Employee name for Assign Employee form
  const [error, setError] = useState(null);           // Error message for form/API failures
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Currently selected employee

//================================================================================

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getJobs(); //get jobs
        setJobs(data);
        if (data.length > 0) {
          setSelectedJob(data[0]); // auto-select the first job
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    fetchJobs();
  }, []);

  //================================================================================

  useEffect(() => {
    if (selectedJob) {
      async function fetchEmployees() {
        try {
          const response = await getJobEmployees(selectedJob._id);//employees for each job
          setEmployees(response);
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      }
      fetchEmployees();
    }
  }, [selectedJob]);

  //================================================================================

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    if (employee && employee.tasks && employee.tasks.length > 0) {
      const task = employee.tasks[0];
      setEmployeeName(employee.fullName);
      // Keep Task Details form blank for new entry
      setTaskName("");
      setTaskImageUrl("");
      setStartTime("");
      setEndTime("");
    } else {
      setEmployeeName(employee.fullName);
      setTaskName("");
      setTaskImageUrl("");
      setStartTime("");
      setEndTime("");
    }
  };

  //================================================================================ 

  const handleAssignEmployee = async (e) => {
    e.preventDefault();
    if (!selectedJob) {
      setError("No job selected. Please select a job first.");
      return;
    }
    if (!employeeName.trim()) {
      setError("Employee name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const employeeData = { //this is for creating a new employee without any other data - didnt make an endpoint in backend to do it 
        fullName: employeeName
      };
      const response = await fetch(`http://localhost:3000/jobs/${selectedJob._id}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to create employee.");
      }

  //================================================================================ 

      const updatedJob = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j._id === selectedJob._id ? updatedJob : j))
      );
      const updatedEmployees = await getJobEmployees(selectedJob._id);
      setEmployees(updatedEmployees);

      setEmployeeName(""); // Reset form field
      alert("Employee created successfully!");
    } catch (error) {
      console.error("Error creating employee:", error);
      setError("Failed to create employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    //================================================================================ 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) {
      setError("No job selected. Please select a job first.");
      return;
    }
    if (!selectedEmployee) {
      setError("No employee selected. Please select an employee first.");
      return;
    }
    if (!taskName.trim()) {
      setError("Task name is required.");
      return;
    }
    if (!taskImageUrl.trim()) {
      setError("Image URL is required.");
      return;
    }
    if (!startTime) {
      setError("Start time is required.");
      return;
    }
    if (!endTime) {
      setError("End time is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const taskData = {
        fullName: selectedEmployee.fullName,
        task: {
          taskName: taskName,
          imageUrl: taskImageUrl,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          status: "pending",
          taskId: Date.now(),
        },
        updateExisting: false     //always add new task!!!!!! (pain in the a-)
      };

      const response = await fetch(`http://localhost:3000/jobs/${selectedJob._id}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to save task details.");
      }

      const updatedJob = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j._id === selectedJob._id ? updatedJob : j))
      );
      const updatedEmployees = await getJobEmployees(selectedJob._id);
      setEmployees(updatedEmployees);

  //================================================================================ 
      // Reset Task Details form but keep employee selected

      setTaskName("");
      setTaskImageUrl("");
      setStartTime("");
      setEndTime("");
      setEmployeeName(selectedEmployee.fullName);
      alert("Task details saved successfully! Ready for next task.");
    } catch (error) {
      console.error("Error saving task details:", error);
      setError("Failed to save task details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //================================================================================

  const isTaskDetailsComplete = taskName.trim() && taskImageUrl.trim() && startTime && endTime;   //condition for checking if all fields are there

  return (
    <div className="employees-container">
      <h1>Employee Page</h1>

      {/* Job Selection Section */}
      <h3>Select Job</h3>
      {jobs.length > 0 ? (
        <div className="dropdown-wrapper">
          <Dropdown
            options={jobs.map(job => ({ value: job._id, label: job.jobName, ...job }))}
            selected={selectedJob}
            onSelectedChange={setSelectedJob}
            className={selectedJob ? "dropdown-selected" : ""}
          />
        </div>
      ) : (
        <p>No jobs available</p>
      )}
      {selectedJob && <p>Job Selected: {selectedJob.jobName}</p>}

      <form onSubmit={handleSubmit}>

    {/* ================================================================================ */}

        <h3>Select Employee</h3>
        <div className="dropdown-wrapper">
          <Dropdown
            options={employees.map(emp => ({ value: emp._id, label: emp.fullName, ...emp }))}
            selected={selectedEmployee}
            onSelectedChange={handleEmployeeSelect}
            className={selectedEmployee ? "dropdown-selected" : ""}
          />
        </div>
        <br />

    {/* ================================================================================ */}

        <PopupWrapper trigger={<button className="action-button">Add Employee</button>}>
          <h2>New Employee</h2>
          <form onSubmit={handleAssignEmployee}>
            <TextBox
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter Employee FullName"
              required
              className="input-field"
            />
            <br /><br />
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Saving..." : "Submit"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </PopupWrapper>

    {/* ================================================================================ */}

        <h3>Task Details</h3>
        <TextBox
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter Task Name"
          required
          className="input-field"
        />
        <br /><br />
        <TextBox
          value={taskImageUrl}
          onChange={(e) => setTaskImageUrl(e.target.value)}
          placeholder="Enter Image URL"
          required
          className="input-field"
        />
        <br /><br />
        <TextBox
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Enter Start Time"
          required
          className="input-field"
        />
        <br /><br />
        <TextBox
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="Enter End Time"
          required
          className="input-field"
        />
        <br />

    {/* ================================================================================ */}

        <ImageUploadPopup />
        <br />
        <button
          type="submit"
          disabled={loading || !isTaskDetailsComplete}
          className={`submit-button ${isTaskDetailsComplete ? '' : 'disabled'}`}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

//================================================================================

export default Employees;

//end