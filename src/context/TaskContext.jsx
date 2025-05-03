import { createContext, useState } from 'react'
import { mockTasks } from '../data/mockTasks'

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(mockTasks)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }
  
  const assignTask = (taskId, userId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, assignedTo: userId } : task
    ))
    setIsModalOpen(false)
  }
  
  const searchTasks = (searchTerm) => {
    if (!searchTerm) return mockTasks
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  return (
    <TaskContext.Provider value={{
      tasks,
      selectedTask,
      setSelectedTask,
      isModalOpen,
      setIsModalOpen,
      updateTaskStatus,
      assignTask,
      searchTasks
    }}>
      {children}
    </TaskContext.Provider>
  )
}