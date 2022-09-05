import CompletedTasks from "./containers/CompletedTasks";
import PendingTasks from "./containers/PendingTasks";
import WorkingTasks from "./containers/WorkingTasks";
import TasksProvider from "./providers/TasksProvider";
import Header from "./Header";

function App() {
  return (
    <TasksProvider>
      <div className="bg-gray-50 flex flex-col h-screen p-6 space-y-3 w-screen">
        <Header />
        <div className="grid grid-cols-3 gap-x-3">
          <CompletedTasks />
          <WorkingTasks />
          <PendingTasks />
        </div>
      </div>
    </TasksProvider>
  )
}

export default App
