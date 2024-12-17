import { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import { Link } from "react-router-dom";

export default function CourseTypes() {
  const { courseTypes, addCourseTypes, updateCourseTypes, deleteCourseTypes } =
    useCourseContext();

  const [newType, setNewType] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateCourseTypes(editId, newType);
      setEditId(null);
    } else {
      addCourseTypes(newType);
    }
    setNewType("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Type Screen</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Enter Course Type"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editId ? "Update" : "Add"} Course Type
        </button>
      </form>
      <ul className="space-y-2">
        {courseTypes.map((type) => (
          <li key={type.id} className="flex items-center">
            <span className="mr-2">{type.name}</span>
            <button
              onClick={() => {
                setEditId(type.id);
                setNewType(type.name);
              }}
              className="bg-yellow-500 text-white p-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCourseTypes(type.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/courses" className="text-blue-500 hover:underline mr-4">
          Next: Course Name
        </Link>
      </div>
    </div>
  );
}
