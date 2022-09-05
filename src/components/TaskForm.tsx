import {FormEventHandler, useState} from "react";

import {CreateTaskOptions} from "../hooks/useTaskList";
import Button from "./Button";

export interface TaskFormProps {
  label: string
  name?: string
  description?: string
  onSubmit: (options: CreateTaskOptions) => void
}

export default function TaskForm(props: TaskFormProps) {
  const [name, setName] = useState(props.name ?? "")
  const [description, setDescription] = useState(props.description ?? "")

  const handleSubmit: FormEventHandler = ev => {
    ev.preventDefault()
    props.onSubmit({name, description})
  }

  return (
    <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
      <h1>{props.label}</h1>
      <input placeholder="Task name" onChange={ev => setName(ev.target.value)} required type="text" value={name} />
      <textarea onChange={ev => setDescription(ev.target.value)} placeholder="Task description" required value={description} />
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
