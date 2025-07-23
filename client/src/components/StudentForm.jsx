import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const StudentForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      rollNumber: "",
      subject: "",
      marks: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      rollNumber: Yup.string().required("Roll Number is required"),
      subject: Yup.string().required("Subject is required"),
      marks: Yup.number()
        .typeError("Marks must be a number")
        .required("Marks are required")
        .min(0, "Marks cannot be negative")
        .max(100, "Marks cannot exceed 100"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(
          "http://localhost:5000/api/students/addstudent",
          values
        );
        alert("Student added ✅");
        resetForm();
      } catch (err) {
        console.error(err);
        alert("Error adding student ❌");
      }
    },
  });

  const subjectOptions = ["html", "css", "react", "dotnet", "angular", "other"];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {["name", "rollNumber", "subject", "marks"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>

            {field === "subject" ? (
              <select
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select Subject --</option>
                {subjectOptions.map((subj) => (
                  <option key={subj} value={subj}>
                    {subj.charAt(0).toUpperCase() + subj.slice(1)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field === "marks" ? "number" : "text"}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded"
              />
            )}

            {formik.touched[field] && formik.errors[field] && (
              <div className="text-red-500 text-sm">{formik.errors[field]}</div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
