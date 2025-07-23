import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minMarks, setMinMarks] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students/getstudents"
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = students
    .filter((s) => {
      const search = searchTerm.toLowerCase();
      return (
        s.name.toLowerCase().includes(search) ||
        s.rollNumber.toLowerCase().includes(search) ||
        s.subject.toLowerCase().includes(search)
      );
    })
    .filter((s) => minMarks === "" || s.marks >= Number(minMarks));

  const generateCertificate = (student) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const centerX = 105;

    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text("CERTIFICATE OF ACHIEVEMENT", centerX, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `This is to certify that ${student.name}, (Roll Number: ${student.rollNumber})`,
      centerX,
      60,
      { align: "center" }
    );
    doc.text(
      `has successfully completed the subject "${student.subject}" and has scored ${student.marks} marks.`,
      centerX,
      70,
      { align: "center" }
    );

    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 20, 120);
    doc.text("Signature: ____________________", 140, 120);

    doc.save(`${student.name}_certificate.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>

      {/* 🔍 Search & Filter Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search name, roll no, subject"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-72"
        />
        <input
          type="number"
          placeholder="Filter by min marks"
          value={minMarks}
          onChange={(e) => setMinMarks(e.target.value)}
          className="p-2 border rounded w-48"
        />
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Roll No</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Marks</th>
            <th className="border p-2">Certificate</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((student, i) => (
            <tr key={i}>
              <td className="border p-2 text-center">{student.name}</td>
              <td className="border p-2 text-center">{student.rollNumber}</td>
              <td className="border p-2 text-center">{student.subject}</td>
              <td className="border p-2 text-center">{student.marks}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => generateCertificate(student)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
