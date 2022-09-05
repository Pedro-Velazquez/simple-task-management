
import {useState} from "react";
import Modal from "../components/Modal";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {CreateTaskOptions} from "../hooks/useTaskList";
import Task from "../models/Task";
import {usePendingTasks, useTaskManagementFunctions} from "../providers/TasksProvider";

export default function PendingTasks() {
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>()
  const {pendingMutations, workingMutations} = useTaskManagementFunctions()
  const tasks = usePendingTasks()

  const handleMove = (id: number) => {
    const task = pendingMutations.findTask(id) as Task
    pendingMutations.deleteTask(id)
    workingMutations.addTask(task)
  }

  const handleEdit = (options: CreateTaskOptions) => {
    pendingMutations.editTask(taskToEdit?.id as number, options)
    setTaskToEdit(undefined)
  }

  return (
    <>
      <TaskList moveNextStatus={handleMove} onEdit={setTaskToEdit} tasks={tasks} status="Pending" />
      {taskToEdit &&
        <Modal open>
          <TaskForm
            label="Edit task"
            onSubmit={handleEdit}
            name={taskToEdit.name}
            description={taskToEdit.description} />
        </Modal>
      }
    </>
  )
}
