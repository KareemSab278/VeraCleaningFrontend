import React, { useState, useEffect } from 'react';
import { getJobs, getJobEmployees } from '../app'; // Add this function to fetch job employees
import Dropdown from '../components/Dropdown';
import TextBox from '../components/TextBox';
import PopupWrapper from '../components/PopUp';
import ImageUploadPopup from '../components/ImageUploadButton';

const Employees = () => {
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeTask, setEmployeeTask] = useState("");
  const [error, setError] = useState(null);

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

  // Fetch employees when a job is selected
  useEffect(() => {
    if (selectedJob) {
      async function fetchEmployees() {
        try {
          const response = await getJobEmployees(selectedJob._id); // Fetch employees for selected job
          setEmployees(response); // Set employees state
        } catch (error) {
          console.error("Error fetching employees:", error);
        }
      }
      fetchEmployees();
    }
  }, [selectedJob]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee Selected:", selectedEmployee);
    console.log("Job Selected:", selectedJob ? selectedJob.jobName : "None");
    console.log("Task Name:", taskName);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setTaskName(employee.task);
    setStartTime(employee.startTime);
    setEndTime(employee.endTime);
    setPopupVisible(true);
  };

  return (
    <div>
      <h1>Employee Page</h1>
      <h3>Select Job</h3>
      {jobs.length > 0 ? (
        <Dropdown
          options={jobs.map(job => ({
            value: job._id,
            label: job.jobName,
            ...job
          }))}
          selected={selectedJob}
          onSelectedChange={setSelectedJob}
        />
      ) : (
        <p>No jobs available</p>
      )}

      {selectedJob && <p>Job Selected: {selectedJob.jobName}</p>}

      <form onSubmit={handleSubmit}>
        <h3>Select Employee</h3>
        <Dropdown
          options={employees.map(emp => ({
            value: emp.employeeId,
            label: emp.fullName,
            ...emp
          }))}
          selected={selectedEmployee}
          onSelectedChange={handleEmployeeSelect}
        />
        <br />

        <h3>Task Details</h3>
        <TextBox
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter Task Name"
        />
        <br /><br />
        <TextBox
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Enter Start Time"
        />
        <br /><br />
        <TextBox
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="Enter End Time"
        />
        <br />

        <ImageUploadPopup />
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Popup for task details */}
      {isPopupVisible && (
        <PopupWrapper onClose={() => setPopupVisible(false)}>
          <h3>Task Details</h3>
          <p><strong>Task:</strong> {selectedEmployee.task}</p>
          <p><strong>Start Time:</strong> {selectedEmployee.startTime}</p>
          <p><strong>End Time:</strong> {selectedEmployee.endTime}</p>
          <button onClick={() => setPopupVisible(false)}>Close</button>
        </PopupWrapper>
      )}
    </div>
  );
};

export default Employees;
