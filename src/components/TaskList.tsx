import { FiCornerUpLeft, FiCornerUpRight, FiEdit } from "react-icons/fi"
import Task from "../models/Task";
import {TaskStatus} from "../providers/TasksProvider";
import IconButton from "./IconButton";

export interface TaskListProps {
  onEdit: (task: Task) => void
  moveNextStatus?: (id: number) => void
  movePreviousStatus?: (id: number) => void
  tasks: Task[]
  status: TaskStatus
}

export default function TaskList({moveNextStatus, movePreviousStatus, onEdit, status, tasks}: TaskListProps) {
  return (
    <section className="bg-white rounded-md shadow-md">
      <header className={[
        "p-3",
        status === "Completed" ? "bg-completed" : "",
        status === "Working" ? "bg-working" : "",
        status === "Pending" ? "bg-pending" : "",
      ].join(" ")}>
        <h1 className="text-white text-center text-lg">{status}</h1>
      </header>
      <div className="p-3 space-y-1.5 text-black">
        {tasks.length === 0 && (
          <h4 className="text-center">No data</h4>
        )}
        {tasks.map(t => (
          <div key={t.id} className="flex justify-between items-center">
            <div className="flex flex-col">
              <h6 className="text-md">{t.name}</h6>
              <span className="text-sm">{t.updated.toLocaleDateString()}</span>
            </div>
            <div className="flex space-x-1.5">
              <IconButton Icon={FiEdit} onClick={() => onEdit(t)} />
              {moveNextStatus && <IconButton Icon={FiCornerUpLeft} onClick={() => moveNextStatus(t.id)} />}
              {movePreviousStatus && <IconButton Icon={FiCornerUpRight} onClick={() => movePreviousStatus(t.id)} />}
              </div>
          </div>
        ))}
      </div>
    </section>
  )
}
