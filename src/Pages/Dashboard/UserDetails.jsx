import axios from "axios";
import React, { useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;
import moment from "moment";

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);

  // Get user data from localStorage
  const getUserData = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : {};
  };

  const [user, setUser] = useState(getUserData());

  // Extract user details
  const {
    firstName = "N/A",
    lastName = "N/A",
    email = "N/A",
    phone = "N/A",
    age = "N/A",
    dob = "N/A",
    street = "N/A",
    city = "N/A",
    state = "N/A",
    pincode = "N/A",
    country = "N/A",
    bio = "N/A",
    courses = [],
    profilePic = "",
  } = user;

  const coursesCount = courses.length;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({
      firstName,
      lastName,
      email,
      phone,
      age,
      dob: dob && dob !== "N/A" ? moment(dob).format("YYYY-MM-DD") : "",
      street,
      city,
      state,
      pincode,
      country,
      bio,
      profilePic,
    });
  };

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedUser = { ...user, ...editedUser };
      const id = updatedUser._id;

      const formData = new FormData();
      formData.append("firstName", updatedUser.firstName || "");
      formData.append("lastName", updatedUser.lastName || "");
      formData.append("email", updatedUser.email || "");
      formData.append("phone", updatedUser.phone || "");
      formData.append("age", updatedUser.age || "");
      formData.append("dob", updatedUser.dob || "");
      formData.append("street", updatedUser.street || "");
      formData.append("city", updatedUser.city || "");
      formData.append("state", updatedUser.state || "");
      formData.append("pincode", updatedUser.pincode || "");
      formData.append("country", updatedUser.country || "");
      formData.append("bio", updatedUser.bio || "");

      if (profilePicFile) {
        formData.append("images", profilePicFile);
      }

      const updateData = await axios.put(
        `${baseUrl}/user/update-profile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (updateData.status === 200) {
        setUser(updateData.data); // get updated user from backend
        localStorage.setItem("user", JSON.stringify(updateData.data));
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({});
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <span>👤</span> User Details
          </h2>
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Edit Profile
            </button>
          ) : (
            <span className="text-sm text-orange-600 font-medium flex items-center gap-1">
              ✏️ Edit Mode Active
            </span>
          )}
        </div>

        {/* Profile Picture Section */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <img
              src={
                profilePicFile
                  ? URL.createObjectURL(profilePicFile) // newly uploaded image
                  : editedUser.profilePic || profilePic || "" // existing server image
              }
              alt="Profile"
              className={`w-32 h-32 rounded-full object-cover border-4 shadow-lg transition-all duration-300 ${
                isEditing
                  ? "border-blue-400 shadow-blue-200 group-hover:scale-105"
                  : "border-gray-200"
              }`}
            />

            {!profilePicFile && !editedUser.profilePic && !profilePic && (
              <div
                className={`w-32 h-32 rounded-full bg-gray-200 border-4 shadow-lg flex items-center justify-center transition-all duration-300 ${
                  isEditing
                    ? "border-blue-400 shadow-blue-200 group-hover:scale-105"
                    : "border-gray-200"
                }`}
              >
                <span className="text-gray-500 text-3xl">👤</span>
              </div>
            )}

            {isEditing && (
              <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-3 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
          {[
            ["First Name", "firstName", firstName],
            ["Last Name", "lastName", lastName],
            ["Email", "email", email],
            ["Phone", "phone", phone],
            ["Age", "age", age],
            ["Date of Birth","dob",dob !== "N/A" ? moment(dob).format("YYYY-MM-DD") : ""],
            ["Street", "street", street],
            ["City", "city", city],
            ["State", "state", state],
            ["Pincode", "pincode", pincode],
            ["Country", "country", country],
            ["Bio", "bio", bio],
          ].map(([label, field, value]) => (
            <div
              key={field}
              className={`p-4 rounded-lg border ${
                isEditing
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <span className="font-medium text-gray-600 text-sm uppercase">
                {label}
              </span>
              {isEditing ? (
                field === "dob" ? (
                  <input
                    type="date"
                    value={editedUser.dob || ""} 
                    onChange={(e) =>
                      handleInputChange(
                        field,
                        moment(e.target.value).format("YYYY-MM-DD") 
                      )
                    }
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={editedUser[field] || value || ""}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                )
              ) : (
                <div className="mt-2 font-medium">
                  {field === "dob" && value
                    ? moment(value).format("DD/MM/YYYY") // ✅ pretty format on UI
                    : value}
                </div>
              )}
            </div>
          ))}

          {/* Courses */}
          <div className="md:col-span-2 p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
            <span className="font-medium text-gray-600 text-sm uppercase">
              Courses Enrolled
            </span>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600">
                {coursesCount}
              </span>
              <span className="text-gray-600">
                {coursesCount === 1 ? "Course" : "Courses"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-3 text-white bg-green-600 rounded-lg"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;



