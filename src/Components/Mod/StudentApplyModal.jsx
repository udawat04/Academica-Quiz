import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentLoginModal from "./StudentLoginModal"; // import your login modal

const StudentApplyModal = ({ isOpen, onClose }) => {
  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    dob: "",
    profilePic: null,
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    bio: "",
    courses: [],
  };

  const [formData, setFormData] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [courseSearch, setCourseSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  // Fetch all courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/course/all-courses"
        );
        setCourses(result.data);
      } catch (err) {
        setCourses([]);
        console.log(err);
      }
    };
    fetchCourses();
  }, []);

  // Input change handler (fields + file)
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      if (
        file &&
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      ) {
        setFormData((prev) => ({ ...prev, [name]: file }));
        setPreview(URL.createObjectURL(file));
      } else {
        alert("Only .jpg, .jpeg, .png files are allowed");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add/remove courses in state
  const handleCourseToggle = (_title, _id) => {
    setFormData((prev) => {
      const courseIds = [...prev.courses];
      if (courseIds.includes(_id)) {
        return { ...prev, courses: courseIds.filter((c) => c !== _id) };
      } else {
        courseIds.push(_id);
        return { ...prev, courses: courseIds };
      }
    });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("age", formData.age);
    data.append("dob", formData.dob);
    data.append("address", formData.address);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("pincode", formData.pincode);
    data.append("bio", formData.bio);

    if (formData.profilePic) {
      data.append("images", formData.profilePic);
    }

    formData.courses.forEach((courseId) => {
      data.append("courses", courseId);
    });

    try {
     const result =  await axios.post("http://localhost:5000/user/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data,"data stored in db")

      alert("Application submitted!");

      // reset form + preview
      setFormData(initialForm);
      setPreview(null);

      // close apply modal & open login modal
      onClose();
      setShowLogin(true);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Submission failed");
    }
  };

  if (!isOpen) return null;

  // Filter courses
  const filteredCourses =
    courseSearch.trim() === ""
      ? courses
      : courses.filter((course) =>
          course.title.toLowerCase().includes(courseSearch.toLowerCase())
        );

  return (
    <>
      {/* Apply Modal */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-5xl shadow-xl overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 cursor-pointer text-4xl font-bold text-gray-600"
            aria-label="Close modal"
          >
            ×
          </button>

          {/* Left Visual */}
          <div className="w-full md:w-1/2 bg-gray-100 p-6 flex flex-col items-center justify-center text-center">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-40 h-40 object-cover rounded-full mb-4"
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1672248652488-73f8a07e3307?w=600&auto=format&fit=crop&q=60"
                alt="Apply Visual"
                className="w-40 h-40 object-cover rounded-full mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">Ready to Begin?</h2>
            <h1 className="text-2xl font-bold text-blue-900">
              Apply to Academica
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Fill out your student application
            </p>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 overflow-y-auto">
            <h3 className="text-3xl font-semibold mb-6 text-blue-900">
              Student Application
            </h3>
            <form onSubmit={handleSubmit}>
              {[
                {
                  label: "First Name",
                  name: "firstName",
                  type: "text",
                  required: true,
                },
                {
                  label: "Last Name",
                  name: "lastName",
                  type: "text",
                  required: true,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  required: true,
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  required: true,
                },
                { label: "Phone", name: "phone", type: "tel", required: true },
                { label: "Age", name: "age", type: "number", required: true },
                {
                  label: "Date of Birth",
                  name: "dob",
                  type: "date",
                  required: true,
                },
                {
                  label: "Address",
                  name: "address",
                  type: "text",
                  required: true,
                },
                { label: "City", name: "city", type: "text", required: true },
                { label: "State", name: "state", type: "text", required: true },
                {
                  label: "Country",
                  name: "country",
                  type: "text",
                  required: true,
                },
                {
                  label: "Pincode",
                  name: "pincode",
                  type: "text",
                  required: true,
                },
              ].map(({ label, name, type, required }) => (
                <div key={name}>
                  <label className="text-sm font-medium text-gray-700">
                    {label}
                    {required && " *"}
                  </label>
                  <input
                    name={name}
                    type={type}
                    required={required}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded mt-1 mb-3"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}

              {/* Profile Pic Upload */}
              <label className="text-sm font-medium text-gray-700">
                Profile Picture *
              </label>
              <input
                name="profilePic"
                type="file"
                accept=".jpg, .jpeg, .png"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded mt-1 mb-3"
              />

              {/* Bio */}
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded mt-1 mb-3"
                placeholder="Tell us something about you..."
              />

              {/* Courses */}
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Courses *
              </label>
              <input
                type="text"
                placeholder="Search courses..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />

              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto border rounded p-3 mb-4"
                role="list"
                aria-label="Courses checklist"
              >
                {filteredCourses.length === 0 ? (
                  <p className="col-span-full text-center text-gray-500">
                    No courses found.
                  </p>
                ) : (
                  filteredCourses.map(({ title, _id }) => (
                    <label
                      key={_id}
                      className="inline-flex items-center space-x-2 cursor-pointer hover:bg-blue-50 rounded p-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.courses.includes(_id)}
                        onChange={() => handleCourseToggle(title, _id)}
                        className="form-checkbox text-blue-600"
                      />
                      <span>{title}</span>
                    </label>
                  ))
                )}
              </div>

              <button
                type="submit"
                className="bg-[#0B2450] w-full text-white py-2 rounded-full cursor-pointer font-semibold mt-2"
              >
                APPLY NOW
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <StudentLoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
};

export default StudentApplyModal;
