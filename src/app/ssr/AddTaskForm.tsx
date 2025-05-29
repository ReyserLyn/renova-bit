'use client'
import { addTask } from '@/app/ssr/actions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function AddTaskForm() {
  const [taskName, setTaskName] = useState('')
  const router = useRouter()

  async function onSubmit() {
    await addTask(taskName)
    setTaskName('')
    router.refresh()
  }

  return (
    <form action={onSubmit}>
      <input
        autoFocus
        type="text"
        name="name"
        placeholder="Enter new task"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
      />
      <button type="submit">Add</button>
    </form>
  )
}
export default AddTaskForm
