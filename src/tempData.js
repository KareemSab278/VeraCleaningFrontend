const tempTasks = [
    { name: "sigma", task: "clean room 1738", startTime: "12:00", endTime: "13:00" },
    { name: "bro", task: "clean room 69", startTime: "12:00", endTime: "13:00" },
    { name: "him", task: "clean room 80085", startTime: "12:00", endTime: "13:00" }
];

export const employeeNames = tempTasks.map(name=>({
    value: name.name,
    label: name.name,
}));

export const employeeOptions = tempTasks.map(task => ({
    value: task.name,
    label: task.name,
    task: task.task,
    startTime: task.startTime,
    endTime: task.endTime,
}));


const tempJobs = [
    { name: "Birmingham Univeristy" },
    { name: "Aston University" },
    { name: "Birmingham City University" },
];

export const jobOptions = tempJobs.map(job => ({
    value: job.name,
    label: job.name,
}));

