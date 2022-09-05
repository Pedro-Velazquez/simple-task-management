import {useState} from "react";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {CreateTaskOptions} from "../hooks/useTaskList";
import Task from "../models/Task";
import {useCompletedTasks, useTaskManagementFunctions} from "../providers/TasksProvider";

export default function CompletedTasks() {
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>()
  const {completedMutations, workingMutations} = useTaskManagementFunctions()
  const tasks = useCompletedTasks()

  const handleMoveBack = (id: number) => {
    const task = completedMutations.findTask(id) as Task
    completedMutations.deleteTask(id)
    workingMutations.addTask(task)
  }

  const handleEdit = (options: CreateTaskOptions) => {
    completedMutations.editTask(taskToEdit?.id as number, options)
    setTaskToEdit(undefined)
  }

  return (
    <>
      <TaskList movePreviousStatus={handleMoveBack} onEdit={setTaskToEdit} tasks={tasks} status="Completed" />
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
