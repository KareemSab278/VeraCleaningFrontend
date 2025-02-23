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
    const [loading, setLoading] = useState(false);
  
  const [jobName, setJobName] = useState("");  
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

  // const handleAssignEmployee = async (e) => {
  //     e.preventDefault();
  
  //     // Check if jobName is set
  //     if (!jobName) {
  //       setError("No job selected. Please select a job first.");
  //       return;
  //     }
  
  //     // Validate employee name and task
  //     if (!employeeName.trim() || !employeeTask.trim()) {
  //       setError("Employee name and task cannot be empty.");
  //       return;
  //     }
  
  //     setLoading(true);
  //     setError(null);
  
  //     try {
  //       // Find the job by jobName
  //       const job = jobs.find((j) => j.jobName === jobName);
  //       if (!job) {
  //         setError("Job not found.");
  //         return;
  //       }
  
  //       const response = await fetch(`/jobs/${job._id}/assign`, {
  //         method: "PATCH",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           employeeName,
  //           employeeTask,
  //         }),
  //       });
  
  //       if (response.ok) {
  //         const updatedJob = await response.json();
  //         setJobs((prevJobs) =>
  //           prevJobs.map((j) => (j._id === job._id ? updatedJob : j))
  //         );
  //         setEmployeeName("");
  //         setEmployeeTask("");
  //       } else {
  //         setError("Failed to assign employee.");
  //       }
  //     } catch (error) {
  //       console.error("Error assigning employee:", error);
  //       setError("Failed to assign employee. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleAssignEmployee = async (e) => {
    e.preventDefault();
  
    if (!selectedJob) {
      setError("No job selected. Please select a job first.");
      return;
    }
  
    if (!employeeName.trim() || !employeeTask.trim()) {
      setError("Employee name and task cannot be empty.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      // Make the PATCH request to assign the employee
      const response = await fetch(`http://localhost:3000/jobs/${selectedJob._id}/assign`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeName,
          employeeTask,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to assign employee.");
  
      // After successful assignment, fetch the updated jobs and employees
      const updatedJob = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j._id === selectedJob._id ? updatedJob : j))
      );
  
      // Fetch the updated list of employees for the selected job
      const updatedEmployees = await getJobEmployees(selectedJob._id);
      setEmployees(updatedEmployees);
  
      // Reset form fields
      setEmployeeName("");
      setEmployeeTask("");
      setSelectedEmployee(null);
      alert("Employee assigned successfully!");
    } catch (error) {
      console.error("Error assigning employee:", error);
      setError("Failed to assign employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

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
        
          options={ employees.map(emp => ({
            value: emp.employeeId,
            label: emp.fullName,
            ...emp
          }))}
          selected={selectedEmployee}
          onSelectedChange={handleEmployeeSelect}
        />
        <br />

        {/* ======================================================================== */}
                    {/* Assign Employee and Task Button */}
        
                    <PopupWrapper trigger={<button>Assign Employee and Task</button>}>
  <h2>New Employee</h2>
  <form onSubmit={handleAssignEmployee}>
    <TextBox
      value={employeeName}
      onChange={(e) => setEmployeeName(e.target.value)}
      placeholder="Enter Employee FullName"
    />
    <br /><br />
    <TextBox
      value={employeeTask}
      onChange={(e) => setEmployeeTask(e.target.value)}
      placeholder="Enter Task (room)"
    />
    <br /><br />
    <button type="submit">Submit</button>
  </form>
</PopupWrapper>

        

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
