import React, { useState, useEffect } from 'react';
import TextBox from '../components/TextBox';
import Dropdown from '../components/Dropdown';
import PopupWrapper from '../components/PopUp';
import { employeeOptions } from '../tempData';
import { getJobs } from '../app';
import ImageUploadPopup from '../components/ImageUploadButton';

{/* ======================================================================== */ }

const Employees = () => {
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(employeeOptions[0]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  {/* ======================================================================== */ }

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

  {/* ======================================================================== */ }
  {/* Handle submit button */ }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("-----------------------------------");
    console.log("Employee Selected:", selectedEmployee.label);
    console.log("Job Selected:", selectedJob ? selectedJob.jobName : "None"); //   It only just shows avaerything in the logs - not connected to backend yet
    console.log("Task Name:", taskName);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
  };

  {/* ======================================================================== */ }
  // Show popup with task details

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setTaskName(employee.task); // Set task name from selected employee
    setStartTime(employee.startTime); // Set start time from selected employee
    setEndTime(employee.endTime); // Set end time from selected employee
    setPopupVisible(true); // Show the popup
  };
  return (
    <div>
      <h1>Employee Page</h1>

      {/* ======================================================================== */}

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
          options={employeeOptions}
          selected={selectedEmployee}
          onSelectedChange={handleEmployeeSelect} // Use the new handler
        />
        <br />

        {/* ======================================================================== */}

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

        {/* =================================== */}

        <ImageUploadPopup />

        {/* =================================== */}

        <br />
        <button type="submit">Submit</button>
      </form>

      {/* ======================================================================== */}
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

{/* ======================================================================== */ }

export default Employees;