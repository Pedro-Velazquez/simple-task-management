import Button from "./components/Button";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";
import {CreateTaskOptions} from "./hooks/useTaskList";
import useToggle from "./hooks/useToggle";
import {useTaskManagementFunctions} from "./providers/TasksProvider";

export default function Header() {
  const {pendingMutations} = useTaskManagementFunctions()
  const [open, toggle] = useToggle()

  const handleSubmit = (options: CreateTaskOptions) => {
    pendingMutations.createTask(options)
    toggle()
  }

  return (
    <header className="bg-white flex items-center justify-between p-3 rounded-md shadow-lg">
      <h1 className="text-2xl text-slate-800">Task Management App</h1>
      <Button onClick={toggle}>Add Task</Button>
      <Modal open={open}>
        <div className="p-3">
          <TaskForm label="New task" onSubmit={handleSubmit} />
        </div>
      </Modal>
    </header>
  )
}
