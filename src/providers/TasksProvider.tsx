import {createContext, PropsWithChildren, useContext, useMemo} from "react";

import useTaskList, {TaskMutations, UseTaskOptions} from "../hooks/useTaskList";
import Task from "../models/Task";

export type TaskStatus = "Pending" | "Working" | "Completed"

export interface TaskManagementFunctions {
  pendingMutations: TaskMutations
  workingMutations: TaskMutations
  completedMutations: TaskMutations
}

function createUseTasksOptions(key: string): UseTaskOptions {
  return {
    getInitialTasks: () => {
      const tasks = window.localStorage.getItem(key)
      if (tasks === null)
        return []
      return JSON.parse(tasks).map((t: Task) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        created: new Date(t.created),
        updated: new Date(t.updated)
      }))
    },
    saveTasks: tasks => window.localStorage.setItem(key, JSON.stringify(tasks))
  }
}

const PendingTasksContext = createContext<Task[]>([])
const WorkingTasksContext = createContext<Task[]>([])
const CompletedTasksContext = createContext<Task[]>([])
// @ts-ignore
const TasksManagementFunctions = createContext<TaskManagementFunctions>()

export default function TasksProvider({children}: PropsWithChildren<unknown>) {
  const [pending, pendingMutations] = useTaskList(createUseTasksOptions("pending"))
  const [working, workingMutations] = useTaskList(createUseTasksOptions("working"))
  const [completed, completedMutations] = useTaskList(createUseTasksOptions("completed"))

  const functions = useMemo<TaskManagementFunctions>(() => ({
    completedMutations,
    pendingMutations,
    workingMutations
  }), [pendingMutations, workingMutations, completedMutations])

  return (
    <TasksManagementFunctions.Provider value={functions}>
      <PendingTasksContext.Provider value={pending}>
        <WorkingTasksContext.Provider value={working}>
          <CompletedTasksContext.Provider value={completed}>
            {children}
          </CompletedTasksContext.Provider>
        </WorkingTasksContext.Provider>
      </PendingTasksContext.Provider>
    </TasksManagementFunctions.Provider>
  )
}

export function useCompletedTasks() {
  return useContext(CompletedTasksContext)
}

export function usePendingTasks() {
  return useContext(PendingTasksContext)
}

export function useTaskManagementFunctions() {
  return useContext(TasksManagementFunctions)
}

export function useWorkingTasks() {
  return useContext(WorkingTasksContext)
}
