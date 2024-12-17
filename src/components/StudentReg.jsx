import { useState } from "react";
import { useCourseContext } from "../context/CourseContext";
import { Link } from "react-router-dom";

export default function StudentReg() {
  const {
    courseTypes,
    courses,
    courseCombination,
    students,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useCourseContext();
  const [studentName, setStudentName] = useState("");
  const [selectedCombination, setSelectedCombination] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateStudent(editId, studentName, selectedCombination);
      setEditId(null);
    } else {
      addStudent(studentName, selectedCombination);
    }
    setStudentName("");
    setSelectedCombination("");
  };

  const filteredCombination = courseCombination.filter(
    (combo) => !filter || combo.typeId === filter
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter Student Name"
          className="border p-2 mr-2"
        />
        <label htmlFor="filter" className="mr-2">
          Filter by Course Type
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="">All</option>
          {courseTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <div className="flex-col mt-4">
          <select
            value={selectedCombination}
            onChange={(e) => setSelectedCombination(e.target.value)}
            className="border p-2 mr-6"
          >
            <option value="">Select Course Combination</option>
            {filteredCombination.map((combo) => (
              <option key={combo.id} value={combo.id}>
                {courseTypes.find((type) => type.id === combo.typeId)?.name} -{" "}
                {courses.find((name) => name.id === combo.nameId)?.name}
              </option>
            ))}
          </select>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {editId ? "Update" : "Register"} Student
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {students.map((student) => (
          <li key={student.id} className="flex items-center mt-4">
            <span className="mr-2">
              {student.name} -{" "}
              {(() => {
                const combo = courseCombination.find(
                  (c) => c.id === student.combinationId
                );
                if (combo) {
                  return `${
                    courseTypes.find((type) => type.id === combo.typeId)?.name
                  } - 
                        ${
                          courses.find((type) => type.id === combo.nameId)?.name
                        }`;
                }
                return "Unknow Combination";
              })()}
            </span>
            <button
              onClick={() => {
                setEditId(student.id);
                setStudentName(student.name);
                setSelectedCombination(student.combinationId);
              }}
              className="bg-yellow-500 text-white p-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteStudent(student.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
        <div className="mt-4">
          <Link
            to="/combination"
            className="text-blue-500 hover:underline mr-4"
          >
            Back: Combination
          </Link>
        </div>
      </ul>
    </div>
  );
}
