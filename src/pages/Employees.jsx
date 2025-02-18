import React, { useState } from 'react';
import Button from "../components/Button";
import { buttonClickedExperiemnt } from "../app";
import PopupWrapper from '../components/PopUp';
import TextBox from '../components/TextBox';
import Dropdown from '../components/Dropdown';

const options = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' }
];

const Employees = () => {
    const [employeeInput, setEmployeeInput] = useState("");
    const [taskName, setTaskName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selected, setSelected] = useState(options[0]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Employee:", employeeInput);
        console.log("Task:", taskName);
        console.log("Start Time:", startTime);
        console.log("End Time:", endTime);
    };

    return (
        <>
            <div>
                <h1>Employee Name</h1>
                <Button text="View All Employees" onClick={() => buttonClickedExperiemnt("View All Employees")} />
                <br />
                {/* ============================================================== */}
                <PopupWrapper trigger={<button>Create New Task</button>}>
                    <h2>New Task</h2>
                    <form onSubmit={handleSubmit}>
                        <TextBox
                            value={employeeInput}
                            onChange={(e) => setEmployeeInput(e.target.value)}
                            placeholder="Enter Employee Name"
                        />
                        <br />
                        <Dropdown
                            options={options}
                            selected={selected}
                            onSelectedChange={setSelected}
                        />
                        <p>Selected: {selected.label}</p>
                        <br />
                        <TextBox
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="Enter Task Name"
                        />
                        <br />
                        <br />
                        <TextBox
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            placeholder="Enter Start Time"
                        />
                        <br />
                        <br />
                        <TextBox
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            placeholder="Enter End Time"
                        />
                        <br />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </PopupWrapper>
                {/* ============================================================== */}
            </div>
        </>
    );
};

export default Employees;