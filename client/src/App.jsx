import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [view, setView] = useState("form");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            view === "form" ? "bg-blue-500 text-white" : "bg-white border"
          }`}
          onClick={() => setView("form")}
        >
          Add Student
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "list" ? "bg-blue-500 text-white" : "bg-white border"
          }`}
          onClick={() => setView("list")}
        >
          View Students
        </button>
      </div>

      {view === "form" ? <StudentForm /> : <StudentList />}
    </div>
  );
}

export default App;
