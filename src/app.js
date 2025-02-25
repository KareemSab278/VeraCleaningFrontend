import axios from "axios";
export const buttonClickedExperiemnt = (x) => {
    alert(`Button clicked: ${x}`);
};

const API_URL = 'http://localhost:3000';
export const IMAGE_API_KEY = '433386876646741';
export const API_SECRET_KEY = '82Ke3ZTMUp6HfyCHdGt7gGM4ooQ';
export const CLOUDINARY_URL= 'cloudinary://433386876646741:82Ke3ZTMUp6HfyCHdGt7gGM4ooQ@djlvcdcds';

export default async function uploadImage (file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");
  
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/djlvcdcds/image/upload",
    formData
  );
  
  return response.data.secure_url;
};

// Function to create a new job (POST /jobs)
export async function createJob(jobData) {
  try {
    const res = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobData)
    });
    if (!res.ok) {
      throw new Error('Error creating job');
    }
    return await res.json();
  } catch (error) {
    console.error('createJob error:', error);
    throw error;
  }
}

//======================================================
//trying something new

export async function createEmployee(jobData) {
  try {
    const res = await fetch(`${API_URL}/jobs/${jobData.jobId}/assign`, { // Use jobId if needed in the URL
      method: 'PATCH', // Use PATCH for partial updates
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        employeeName: jobData.employeeName,
        employeeTask: jobData.employeeTask
      })
    });

    if (!res.ok) {
      throw new Error('Error adding employee to job');
    }

    return await res.json();
  } catch (error) {
    console.error('createEmployee error:', error);
    throw error;
  }
}

//======================================================

// Function to get all jobs (GET /jobs)
export async function getJobs() {
  try {
    const res = await fetch(`${API_URL}/jobs`);
    if (!res.ok) {
      throw new Error('Error fetching jobs');
    }
    return await res.json();
  } catch (error) {
    console.error('getJobs error:', error);
    throw error;
  }
}

export async function getJobEmployees(jobId) {
  const response = await fetch(`http://localhost:3000/jobs/${jobId}/employees`);
  const data = await response.json();
  return data;
}

//======================================================
// Function to create a new manager (POST /managers)
export async function createManager(managerData) {
  try {
    const res = await fetch(`${API_URL}/managers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(managerData)
    });
    if (!res.ok) {
      throw new Error('Error creating manager');
    }
    return await res.json();
  } catch (error) {
    console.error('createManager error:', error);
    throw error;
  }
}

//======================================================
// Function to get all managers (GET /managers)
export async function getManagers() {
  try {
    const res = await fetch(`${API_URL}/managers`);
    if (!res.ok) {
      throw new Error('Error fetching managers');
    }
    return await res.json();
  } catch (error) {
    console.error('getManagers error:', error);
    throw error;
  }
}

//======================================================
// Function to sign in a manager with the provided credentials
export async function signInManager(credentials) {
  try {
    const managers = await getManagers();
    const manager = managers.find(
      m => m.username === credentials.username && m.password === credentials.password
    );
    if (!manager) {
      throw new Error('Invalid credentials');
    }
    return manager;
  } catch (error) {
    console.error('signInManager error:', error);
    throw error;
  }
}

//end