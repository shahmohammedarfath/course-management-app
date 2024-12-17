import { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import { Link } from "react-router-dom";

export default function Courses() {
  const { courses, addCourseName, updateCourseName, deleteCourseName } =
    useCourseContext();

  const [newCourse, setNewCourse] = useState("");
  const [editId, setEditId] = useState(null);

  const hanedleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateCourseName(editId, newCourse);
      setEditId(null);
    } else {
      addCourseName(newCourse);
    }
    setNewCourse("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Name</h1>
      <form onSubmit={hanedleSubmit} className="mb-4">
        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Enter Course Name"
          className="border p-2 mr-2"
        />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">
          {editId ? "Update" : "Add"}Course Name
        </button>
      </form>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li className="flex items-center" key={course.id}>
            <span className="mr-2">{course.name}</span>
            <button
              onClick={() => {
                setEditId(course.id);
                setNewCourse(course.name);
              }}
              className="bg-yellow-500 text-white p-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCourseName(course.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline mr-4">
          Back: Course Types
        </Link>
        <Link to="/combination" className="text-blue-500 hover:underline mr-4">
          Next: Combination
        </Link>
      </div>
    </div>
  );
}
