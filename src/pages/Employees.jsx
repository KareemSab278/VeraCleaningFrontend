import React, { useState, useEffect } from 'react';
import TextBox from '../components/TextBox';
import Dropdown from '../components/Dropdown';
import PopupWrapper from '../components/PopUp';
import { employeeOptions } from '../tempData';
import { getJobs } from '../app';

const Employees = () => {
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // State for jobs fetched from the backend
  const [jobs, setJobs] = useState([]);
  // Set selected employee from static data
  const [selectedEmployee, setSelectedEmployee] = useState(employeeOptions[0]);
  // Set selected job; will initialize once jobs are fetched.
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch created jobs from the backend when the component mounts
  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getJobs();
        setJobs(data);
        if (data.length > 0) {
          setSelectedJob(data[0]);
        }
      } catch (error) {
        console.error("Error fetching jobs in Employees:", error);
      }
    }
    fetchJobs();
  }, []);

  // Handle form submission – currently, it just logs to the console.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("-----------------------------------");
    console.log("Employee Selected:", selectedEmployee.label);
    console.log("Job Selected:", selectedJob ? selectedJob.jobName : "None");
    console.log("Task Name:", taskName);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
  };

  return (
    <div>
      <h1>Employee Page</h1>
      <form onSubmit={handleSubmit}>
        {/* ------------------ Employee Selection ------------------ */}
        <h3>Select Employee</h3>
        <Dropdown
          options={employeeOptions}
          selected={selectedEmployee}
          onSelectedChange={setSelectedEmployee}
        />
        <p>Employee Selected: {selectedEmployee.label}</p>
        <br />

        {/* ------------------ Job Selection using Fetched Jobs ------------------ */}
        <h3>Select Job</h3>
        {jobs.length > 0 ? (
          <Dropdown
            // Map fetched jobs into dropdown-friendly options (each with value and label)
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
        <br />

        {/* ------------------ Task Details ------------------ */}
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
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Employees;