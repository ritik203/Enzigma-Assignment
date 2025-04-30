import  { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form, setForm] = useState({
    assignedTo: '',
    status: '',
    due_date: '',
    priority: '',
    comments: ''
  });

  const API_URL = 'http://localhost:8888/api';

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask) {
        await axios.put(`${API_URL}/task/${selectedTask.id}`, form);
      } else {
        await axios.post(`${API_URL}/task`, form);
      }
      setForm({ assignedTo: '', status: '', due_date: '', priority: '', comments: '' });
      setSelectedTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setForm(task);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/task/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit}>
        <input name="assignedTo" value={form.assignedTo} onChange={handleChange} placeholder="Assigned To" />
        <input name="status" value={form.status} onChange={handleChange} placeholder="Status" />
        <input name="due_date" value={form.due_date} onChange={handleChange} placeholder="Due Date" type="date" />
        <input name="priority" value={form.priority} onChange={handleChange} placeholder="Priority" />
        <input name="comments" value={form.comments} onChange={handleChange} placeholder="Comments" />
        <button type="submit">{selectedTask ? 'Update Task' : 'Add Task'}</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <p><strong>{task.assignedTo}</strong> - {task.status}</p>
            <p>Due: {task.due_date} | Priority: {task.priority}</p>
            <p>{task.comments}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default App;
