//======== Imports
import React, { useState, useEffect } from 'react';
import { getJobs, getJobEmployees } from '../app';
import Dropdown from '../components/Dropdown';
import TextBox from '../components/TextBox';
import PopupWrapper from '../components/PopUp';
import ImageUploadPopup from '../components/ImageUploadButton';
import  uploadImage from '../app'; // credentials for the cloudinary api and the upload image function

//================================================================================

const Employees = () => {
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [taskImageUrl, setTaskImageUrl] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

//================================================================================

useEffect(() => {
  async function fetchJobs() {
    try {
      const data = await getJobs();
      setJobs(data);
      if (data.length > 0) {
        setSelectedJob(data[0]);
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await uploadImage(file);
      setTaskImageUrl(imageUrl);
      // alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
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
      const employeeData = { fullName: employeeName };
      const response = await fetch(
        `http://localhost:3000/jobs/${selectedJob._id}/assign`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create employee.");
      }

      const updatedJob = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j._id === selectedJob._id ? updatedJob : j))
      );
      const updatedEmployees = await getJobEmployees(selectedJob._id);
      setEmployees(updatedEmployees);

      setEmployeeName("");
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
          updateExisting: false,
        };
  
        const response = await fetch(
          `http://localhost:3000/jobs/${selectedJob._id}/assign`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
          }
        );
  
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

    {/* ============================================================================== */}
      {/* Job Selection Section */}
      <h3>Select Job</h3>
      {jobs.length > 0 ? (
        <div className="dropdown-wrapper">
          <Dropdown
            options={jobs.map((job) => ({
              value: job._id,
              label: job.jobName,
              ...job,
            }))}
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
        <h3>Select Employee</h3>
        <div className="dropdown-wrapper">
          <Dropdown
            options={employees.map((emp) => ({
              value: emp._id,
              label: emp.fullName,
              ...emp,
            }))}
            selected={selectedEmployee}
            onSelectedChange={handleEmployeeSelect}
            className={selectedEmployee ? "dropdown-selected" : ""}
          />
        </div>
        <br />

    {/* ============================================================================== */}

        <PopupWrapper
          trigger={<button className="action-button">Add Employee</button>}
        >
          <h2>New Employee</h2>
          <form onSubmit={handleAssignEmployee}>
            <TextBox
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Enter Employee FullName"
              required
              className="input-field"
            />
            <br />
            <br />
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Saving..." : "Submit"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </PopupWrapper>

        <h3>Task Details</h3>
        <TextBox
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter Task Name"
          required
          className="input-field"
        />
        <br />
        <br />
        <TextBox
          value={taskImageUrl}
          onChange={(e) => setTaskImageUrl(e.target.value)} // Allow manual entry if needed
          placeholder="Image URL"
          required
          className="input-field"
        />
        <br />
        <br />
        <TextBox
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Enter Start Time"
          required
          className="input-field"
        />
        <br />
        <br />
        <TextBox
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="Enter End Time"
          required
          className="input-field"
        />
        <br />
<br />
        {/* Image Upload Section */}
        <div>
          <label htmlFor="imageUpload"><h3>Upload Image:</h3></label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={loading}
          />
        </div>
        <br />

        <button
          type="submit"
          disabled={loading || !isTaskDetailsComplete}
          className={`submit-button ${isTaskDetailsComplete ? "" : "disabled"}`}
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