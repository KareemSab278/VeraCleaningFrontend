import React, { useState } from 'react';
import TextBox from '../components/TextBox';
import Dropdown from '../components/Dropdown';
import PopupWrapper from '../components/PopUp';

// ========================== Data for Dropdown ========================== //

import { employeeOptions } from '../tempData';
import { jobOptions } from '../tempData';

// ============================= Employees Component ============================= //

const Employees = () => {

    // ========================== State Declarations ========================== //

    const [employeeInput, setEmployeeInput] = useState("");
    const [taskName, setTaskName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    /// ========================== Selection states for dropdowns ========================== //

    const [selectedEmployee, setSelectedEmployee] = useState(employeeOptions[0]);
    const [selectedJob, setSelectedJob] = useState(jobOptions[0]);

    // ========================== Form Submission Handler ========================== //

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("-----------------------------------");
        console.log("Employee Selected:", selectedEmployee.label);
        console.log("Job Selected:", selectedJob.label);
        console.log("Task Name:", taskName);
        console.log("Start Time:", startTime);
        console.log("End Time:", endTime);
    };

    // ========================== Render Component ========================== //

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

                {/* ------------------ Job Selection ------------------ */}
                <h3>Select Job</h3>
                <Dropdown
                    options={jobOptions}
                    selected={selectedJob}
                    onSelectedChange={setSelectedJob}
                />
                <p>Job Selected: {selectedJob.label}</p>
                <br />

                {/* ------------------ Task Details ------------------ */}
                <h3>Input Fields</h3>
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