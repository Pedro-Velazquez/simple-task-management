export default interface Task {
  readonly id: number
  name: string
  description: string
  readonly created: Date
  updated: Date
}
