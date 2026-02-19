import { useEffect, useState } from "react";
import axios from "axios";

interface Workout {
  _id: string;
  workoutType: string;
  duration: number;
  calories: number;
  steps: number;
}

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    axios.get("https://fitness-tracker-ietn.onrender.com/api/workouts")
      .then(res => setWorkouts(res.data))
      .catch(err => console.error(err));
  }, []);

  const totalSteps = workouts.reduce((sum, w) => sum + (w.steps || 0), 0);
  const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <nav className="bg-slate-900/60 backdrop-blur-md border-b border-slate-700 p-4 shadow-xl">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Fitness Tracker Dashboard
        </h1>
      </nav>

      <div className="p-10 max-w-7xl mx-auto">
        {/* Add Workout Form */}
<div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700 p-6 rounded-2xl shadow-xl mb-8">
  <h2 className="text-xl font-semibold mb-4 text-green-400">
    Add New Workout
  </h2>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      axios.post("http://localhost:5000/api/workouts", {
        workoutType: formData.get("workoutType"),
        duration: Number(formData.get("duration")),
        caloriesBurned: Number(formData.get("caloriesBurned")),
        steps: Number(formData.get("steps")),
      }).then(() => window.location.reload());
    }}
    className="grid md:grid-cols-4 gap-4"
  >
    <input name="workoutType" placeholder="Workout Type"
      className="p-3 rounded-lg bg-slate-900/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500" required />

    <input name="duration" type="number" placeholder="Duration (min)"
      className="p-3 rounded-lg bg-slate-900/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500" required />

    <input name="caloriesBurned" type="number" placeholder="Calories"
      className="p-3 rounded-lg bg-slate-900/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500" required />

    <input name="steps" type="number" placeholder="Steps"
      className="p-3 rounded-lg bg-slate-900/70 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500" required />

    <button
      type="submit"
      className="bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-all duration-300 text-black font-bold py-3 px-4 rounded-lg col-span-full"
    >
      Add Workout
    </button>
  </form>
</div>


        {/* KPI Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300
">
            <h2 className="text-gray-400">Total Steps</h2>
            <p className="text-3xl font-bold text-green-400 mt-2">
              {totalSteps}
            </p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300
">
            <h2 className="text-gray-400">Total Calories</h2>
            <p className="text-3xl font-bold text-orange-400 mt-2">
              {totalCalories} kcal
            </p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-lg border border-slate-700 p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300
">
            <h2 className="text-gray-400">Total Workouts</h2>
            <p className="text-3xl font-bold text-blue-400 mt-2">
              {workouts.length}
            </p>
          </div>

        </div>

        {/* Workout List */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            Recent Workouts
          </h2>

          <ul className="space-y-3">
            {workouts.map(w => (
              <li key={w._id} className="flex justify-between bg-slate-900 p-4 rounded-lg">
                <span>{w.workoutType}</span>
                <span>{w.duration} mins</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;
