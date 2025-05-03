import { useState } from 'react'

export default function AssignTaskModal({ task, users, onClose, onAssign }) {
  const [selectedUser, setSelectedUser] = useState(task.assignedTo)

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Assign Task: {task.title}</h3>
        <select 
          value={selectedUser} 
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => onAssign(selectedUser)}>Save</button>
        </div>
      </div>
    </div>
  )
}
