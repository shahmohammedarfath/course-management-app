import { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import { Link } from "react-router-dom";

export default function CourseCombination() {
  const {
    courseTypes,
    courses,
    courseCombination,
    addCourseCombination,
    updateCourseCombination,
    deleteCourseCombination,
  } = useCourseContext();
  const [selectedType, setSelectedType] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [editId, setEditId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateCourseCombination(editId, selectedType, selectedName);
      setEditId(null);
    } else {
      addCourseCombination(selectedType, selectedName);
    }
    setSelectedType("");
    setSelectedName("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Combination Screen</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Select Course Type</option>
          {courseTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Select Course Name</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editId ? "Update" : "Add"} Combination
        </button>
      </form>
      <ul className="space-y-2">
        {courseCombination.map((combo) => (
          <li key={combo.id} className="flex items-center">
            <span className="mr-2">
              {courseTypes.find((type) => type.id === combo.typeId)?.name} -{" "}
              {courses.find((course) => course.id === combo.nameId)?.name}
            </span>
            <button
              onClick={() => {
                setEditId(combo.id);
                setSelectedType(combo.typeId);
                setSelectedName(combo.nameId);
              }}
              className="bg-yellow-500 text-white p-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCourseCombination(combo.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
      <Link to="/courses" className="text-blue-500 hover:underline mr-4">
          Back: Course Name
        </Link>
        <Link to="/register" className="text-blue-500 hover:underline mr-4">Next: Student Registration</Link>
      </div>
    </div>
  );
}
