import { Route, Router, Routes } from "react-router-dom";
import CourseCombination from "./components/CourseCombination";
import Courses from "./components/Courses";
import CourseTypes from "./components/CourseTypes";
import StudentReg from "./components/StudentReg";
import { CourseProvider } from "./context/CourseContext";

function App() {
  return (
    <CourseProvider>
        <Routes>
          <Route path="/" element={<CourseTypes/>}></Route>
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/combination" element={<CourseCombination />}></Route>
          <Route path="/register" element={<StudentReg />}></Route>
        </Routes>
    </CourseProvider>
  );
}

export default App;
