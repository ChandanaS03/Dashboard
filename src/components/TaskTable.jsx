
import React, { useState } from 'react';


// const [statusFilter, setStatusFilter] = useState('All');

// const filteredTasks = tasks.filter(task =>
//   (statusFilter === 'All' || task.status === statusFilter) &&
//   task.title.toLowerCase().includes(searchTerm.toLowerCase())
// );





export default function TasksTable({ tasks, onStatusChange, onTaskSelect }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Assigned To</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id} onClick={() => onTaskSelect(task)}>
            <td>{task.title}</td>
            <td>{task.assignedTo}</td>
            <td>
              <select 
                value={task.status} 
                onChange={(e) => onStatusChange(task.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
