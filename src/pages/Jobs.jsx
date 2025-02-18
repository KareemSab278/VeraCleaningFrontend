import React, { useState } from "react";
import Button from "../components/Button";
import { buttonClickedExperiemnt } from "../app";
import PopupWrapper from "../components/PopUp";
import TextBox from "../components/TextBox";

export const Jobs = () => {
  const [jobName, setJobName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Name:", jobName);
  };

  return (
    <div>
      <h1>Jobs</h1>
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
      <Button text="View Jobs" onClick={() => buttonClickedExperiemnt("View Job")} />
      <br />
      <Button text="Add Employees" onClick={() => buttonClickedExperiemnt("Add Employees")} />
      <br />
      {/* Add any additional features here */}
    </div>
  );
};

