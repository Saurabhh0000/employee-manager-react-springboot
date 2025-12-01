import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ListEmployee from "./components/ListEmployee";
import AddEmployee from "./components/AddEmployee";
import "bootstrap/dist/js/bootstrap.bundle.min";


function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<ListEmployee />} />
        <Route path="/employees" element={<ListEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        {/* http://localhost:3000/edit-employee/id */}
        <Route path="/edit-employee/:id" element={<AddEmployee />} />
        {/* http://localhost:3000/delete-employee/id */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
