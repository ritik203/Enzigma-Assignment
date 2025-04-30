import  { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, selectedTask }) {
  const [task, setTask] = useState({
    assignedTo: '',
    status: '',
    due_date: '',
    priority: '',
    comments: ''
  });

  useEffect(() => {
    if (selectedTask) setTask(selectedTask);
  }, [selectedTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ assignedTo: '', 
        status: '',
         due_date: '', 
         priority: '', 
         comments: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="assignedTo" value={task.assignedTo} 
      onChange={handleChange} placeholder="Assigned To" />

      <input name="status" value={task.status} 
      onChange={handleChange} placeholder="Status" />

      <input name="due_date" value={task.due_date} 
      onChange={handleChange} placeholder="Due Date" type="date" />

      <input name="priority" value={task.priority} 
      onChange={handleChange} placeholder="Priority" />

      <input name="comments" value={task.comments} 
      onChange={handleChange} placeholder="Comments" />

      <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
      
    </form>
  );
}
