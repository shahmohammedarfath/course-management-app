import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseCombination, setCourseCombination] = useState([]);
  const [students, setStudents] = useState([]);

  const addCourseTypes = (name) => {
    setCourseTypes([...courseTypes, { id: Date.now().toString(), name }]);
  };

  const updateCourseTypes = (id, name) => {
    setCourseTypes(
      courseTypes.map((type) => (type.id === id ? { ...type, name } : type))
    );
  };

  const deleteCourseTypes = (id) => {
    setCourseTypes(courseTypes.filter((type) => type.id !== id));
  };

  const addCourseName = (name) => {
    setCourses([...courses, { id: Date.now().toString(), name }]);
  };

  const updateCourseName = (id, name) => {
    setCourses(
      courses.map((course) => (course.id === id ? { ...course, name } : course))
    );
  };

  const deleteCourseName = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const addCourseCombination = (typeId, nameId) => {
    setCourseCombination([
      ...courseCombination,
      { id: Date.now().toString(), typeId, nameId },
    ]);
  };

  const updateCourseCombination = (id, typeId, nameId) => {
    setCourseCombination(
      courseCombination.map((combo) =>
        combo.id === id ? { ...combo, typeId, nameId } : combo
      )
    );
  };

  const deleteCourseCombination = (id) => {
    setCourseCombination(courseCombination.filter((combo) => combo.id !== id));
  };

  const addStudent = (name, combinationId) => {
    setStudents([
      ...students,
      { id: Date.now().toString(), name, combinationId },
    ]);
  };

  const updateStudent = (id, name, combinationId) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, name, combinationId } : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };
  return (
    <CourseContext.Provider
      value={{
        courseTypes,
        courses,
        courseCombination,
        students,
        addCourseTypes,
        updateCourseTypes,
        deleteCourseTypes,
        addCourseName,
        updateCourseName,
        deleteCourseName,
        addCourseCombination,
        updateCourseCombination,
        deleteCourseCombination,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};
