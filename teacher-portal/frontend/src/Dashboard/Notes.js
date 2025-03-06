import React, { useState, useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ subject: "", units: [] });
  const [newUnit, setNewUnit] = useState({ unit_name: "", file: null });
  const [editingUnit, setEditingUnit] = useState(null);
  const [updatedUnit, setUpdatedUnit] = useState({ unit_name: "", file: null });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Add Subject
  const addSubject = async () => {
    if (!newSubject.subject.trim()) return alert("Subject name is required!");
    try {
      const response = await axios.post("http://localhost:5000/api/notes", newSubject);
      setSubjects([...subjects, response.data]);
      setNewSubject({ subject: "", units: [] });
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  // Delete Subject
  const deleteSubject = async (subjectId) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/notes/${subjectId}`);
      setSubjects(subjects.filter((s) => s._id !== subjectId));
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  // Add Unit with File Upload
  const addUnit = async (subjectId) => {
    if (!newUnit.unit_name.trim() || !newUnit.file) {
      return alert("Unit name and PDF file are required!");
    }

    const formData = new FormData();
    formData.append("unit_name", newUnit.unit_name);
    formData.append("pdfFile", newUnit.file);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/notes/upload/${subjectId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSubjects(subjects.map((s) => (s._id === subjectId ? response.data : s)));
      setNewUnit({ unit_name: "", file: null });
    } catch (error) {
      console.error("Error uploading unit:", error);
    }
  };

  // Delete Unit
  const deleteUnit = async (subjectId, unitIndex) => {
    try {
      const subject = subjects.find((s) => s._id === subjectId);
      const updatedUnits = subject.units.filter((_, index) => index !== unitIndex);

      await axios.put(`http://localhost:5000/api/notes/${subjectId}`, { 
        subject: subject.subject, 
        units: updatedUnits 
      });

      setSubjects(subjects.map((s) => (s._id === subjectId ? { ...s, units: updatedUnits } : s)));
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>📚 Subjects</h2>

      {/* Add Subject */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Subject"
          value={newSubject.subject}
          onChange={(e) => setNewSubject({ ...newSubject, subject: e.target.value })}
        />
        <button className="btn btn-primary" onClick={addSubject}>➕ Add Subject</button>
      </div>

      {/* Display Subjects and Units */}
      <ul className="list-group">
        {subjects.map((subject) => (
          <li key={subject._id} className="list-group-item">
            <h4>{subject.subject}</h4>
            <button className="btn btn-danger btn-sm" onClick={() => deleteSubject(subject._id)}>🗑️ Delete Subject</button>

            {/* Add Unit */}
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Unit Name"
                value={newUnit.unit_name}
                onChange={(e) => setNewUnit({ ...newUnit, unit_name: e.target.value })}
              />
            <input
  type="file"
  className="form-control"
  accept=".ppt, .pptx"  // ✅ Restricts file selection to only .ppt and .pptx
  onChange={(e) => setNewUnit({ ...newUnit, file: e.target.files[0] })}
/>

              <button className="btn btn-success" onClick={() => addUnit(subject._id)}>📄 Add Unit</button>
            </div>

            {/* List Units */}
            <ul className="list-group mt-2">
  {subject.units.map((unit, index) => (
    <li key={index} className="list-group-item">
      <strong>{unit.unit_name}</strong> -  
      <a href={unit.pdf_link} target="_blank" rel="noopener noreferrer"> Download File</a> {/* ✅ Uses Cloudinary URL */}
      <button className="btn btn-danger btn-sm mx-2" onClick={() => deleteUnit(subject._id, index)}>🗑 Delete</button>
    </li>
  ))}
</ul>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
