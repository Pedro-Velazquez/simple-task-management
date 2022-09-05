import {useState} from "react";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {CreateTaskOptions} from "../hooks/useTaskList";
import Task from "../models/Task";
import {useTaskManagementFunctions, useWorkingTasks} from "../providers/TasksProvider";

export default function WorkingTasks() {
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>()
  const {completedMutations, pendingMutations, workingMutations} = useTaskManagementFunctions()
  const tasks = useWorkingTasks()

  const handleMoveNext = (id: number) => {
    const task = workingMutations.findTask(id) as Task
    workingMutations.deleteTask(id)
    completedMutations.addTask(task)
  }

  const handleMoveBack = (id: number) => {
    const task = workingMutations.findTask(id) as Task
    workingMutations.deleteTask(id)
    pendingMutations.addTask(task)
  }

  const handleEdit = (options: CreateTaskOptions) => {
    workingMutations.editTask(taskToEdit?.id as number, options)
    setTaskToEdit(undefined)
  }

  return (
    <>
      <TaskList
      moveNextStatus={handleMoveNext}
      movePreviousStatus={handleMoveBack}
      onEdit={setTaskToEdit}
      tasks={tasks}
      status="Working" />
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
