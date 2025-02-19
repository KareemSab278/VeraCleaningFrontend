export const tempTasks = [
    { name: "sigma", task: "clean room 1738", startTime: "12:00", endTime: "13:00" },
    { name: "bro", task: "clean room 69", startTime: "12:00", endTime: "13:00" },
    { name: "him", task: "clean room 80085", startTime: "12:00", endTime: "13:00" }
];

const tempJobs = [
    { name: "Birmingham Univeristy" },
    { name: "Aston University" },
    { name: "Birmingham City University" },
];

export const employeeOptions = tempTasks.map(task => ({
    value: task.name,
    label: task.name,
}));

export const jobOptions = tempJobs.map(job => ({
    value: job.name,
    label: job.name,
}));

