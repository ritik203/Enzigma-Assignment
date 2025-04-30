export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <p><strong>{task.assignedTo}</strong> - {task.status}</p>
          <p>Due: {task.due_date} | Priority: {task.priority}</p>
          <p>{task.comments}</p>

          <button onClick={() => onEdit(task)}>Edit</button>

          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
