import React, { useState, useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  // ✅ Fetch Notes from Backend
  useEffect(() => {
    axios.get("http://localhost:5000/dashboard/notes")
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>📚 Notes</h2>

      {/* Display Subject List */}
      {!selectedSubject ? (
        <ul className="list-group">
          {notes.map((note, index) => (
            <li 
              key={index} 
              className="list-group-item list-group-item-action"
              onClick={() => setSelectedSubject(note)}
              style={{ cursor: "pointer" }}
            >
              {note.subject}
            </li>
          ))}
        </ul>
      ) : selectedSubject && !selectedUnit ? (
        <>
          <h3>🔹 {selectedSubject.subject} - Units</h3>
          <ul className="list-group">
            {selectedSubject.units.map((unit, idx) => (
              <li 
                key={idx} 
                className="list-group-item list-group-item-action"
                onClick={() => setSelectedUnit(unit)}
                style={{ cursor: "pointer" }}
              >
                Unit {unit.unit_number}: {unit.unit_name}
              </li>
            ))}
          </ul>
          <button className="btn btn-secondary mt-3" onClick={() => setSelectedSubject(null)}>🔙 Back to Subjects</button>
        </>
      ) : (
        <>
          <h3>📖 {selectedUnit.unit_name}</h3>
          <p>Unit {selectedUnit.unit_number}</p>
          <a 
            href={selectedUnit.pdf_link} 
            className="btn btn-primary"
            download
          >
            📥 Download Notes
          </a>
          <button className="btn btn-secondary mt-3" onClick={() => setSelectedUnit(null)}>🔙 Back to Units</button>
        </>
      )}
    </div>
  );
};

export default Notes;
