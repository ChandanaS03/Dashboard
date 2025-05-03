import { useState, useEffect } from 'react'
import SummaryCards from './SummaryCards'
import TaskTable from './TaskTable'
import AssignTaskModal from './AssignTaskModal'

function DarkModeToggle() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);
  return (
    <button
      onClick={() => setDark(d => !d)}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}

// Mock data
const initialTasks = [
  { id: 1, title: 'UI   ', assignedTo: 'Chan', status: 'Pending' },
  { id: 2, title: 'UX   ', assignedTo: 'shank', status: 'Completed' },
]
const initialUsers = ['Chan', 'Shank', 'Mike', 'Emma']

export default function Dashboard() {
  const [tasks, setTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')    
  const [selectedTask, setSelectedTask] = useState(null)

  // Filter tasks by search and status
  const filteredTasks = tasks.filter(task =>
    (statusFilter === 'All' || task.status === statusFilter) &&
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Status update handler
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? {...task, status: newStatus} : task
    ))
  }

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-3xl p-6 bg-white dark:bg-gray-800 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <DarkModeToggle />
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded p-1"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border rounded p-1 mx-2"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <SummaryCards tasks={tasks} />
        <TaskTable 
          tasks={filteredTasks} 
          onStatusChange={handleStatusChange}
          onTaskSelect={setSelectedTask}
        />
        {selectedTask && (
          <AssignTaskModal
            task={selectedTask}
            users={initialUsers}
            onClose={() => setSelectedTask(null)}
            onAssign={(userId) => {
              setTasks(tasks.map(t => 
                t.id === selectedTask.id ? {...t, assignedTo: userId} : t
              ))
              setSelectedTask(null)
            }}
          />
        )}
      </div>
    </div>
  );
}
