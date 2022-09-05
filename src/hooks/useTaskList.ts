import {useMemo, useState} from "react";
import Task from "../models/Task";

export interface CreateTaskOptions {
  name: string
  description: string
}

export interface TaskMutations {
  addTask: (task: Task) => void
  createTask: (options: CreateTaskOptions) => void
  deleteTask: (id: number) => void
  editTask: (id: number, options: CreateTaskOptions) => void
  findTask: (id: number) => Task | undefined
}

export interface UseTaskOptions {
  getInitialTasks: () => Task[]
  saveTasks: (tasks: Task[]) => void
}

export type UseTaskList = [Task[], TaskMutations]

export default function useTaskList({getInitialTasks, saveTasks}: UseTaskOptions): UseTaskList {
  const [tasks, setTasks] = useState(getInitialTasks())
  const mutations = useMemo(() => {
    const addTask = (task: Task) => {
      const newTasks = [...tasks, task]
      saveTasks(newTasks)
      setTasks(newTasks)
    }

    const createTask = ({name, description}:  CreateTaskOptions) => {
      const newTask: Task = {
        id: Math.random(),
        name,
        description,
        created: new Date(),
        updated: new Date()
      }
      const newList = [...tasks, newTask]
      saveTasks(newList)
      setTasks(newList)
    }
    const deleteTask = (id: number) => {
      const restTasks = tasks.filter(t => t.id !== id)
      saveTasks(restTasks)
      setTasks(restTasks)
    }
    const editTask = (id: number, {name, description}: CreateTaskOptions) => {
      const targetIndex = tasks.findIndex(t => t.id == id)
      if (targetIndex > -1) {
        tasks[targetIndex].name = name
        tasks[targetIndex].description = description
        tasks[targetIndex].updated = new Date()
      }
      setTasks([...tasks])
    }
    const findTask = (id: number) => {
      return tasks.find(t => t.id === id)
    }
    return {addTask, createTask, deleteTask, editTask, findTask}
  }, [tasks, saveTasks])

  return [tasks, mutations]
}
