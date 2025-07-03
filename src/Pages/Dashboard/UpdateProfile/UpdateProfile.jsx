import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "@dr.pogodin/react-helmet";

const UpdateProfile = () => {
  const { user, updateUserProfile, changeUserPassword } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [profilePic, setProfilePic] = useState(user?.photoURL || "");
  const [isUploading, setIsUploading] = useState(false);

  // Load current user info into form fields on mount
  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
      setProfilePic(user.photoURL || "");
    }
  }, [user, setValue]);

  // Image upload handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`,
        formData
      );
      setProfilePic(res.data.data.url);
      Swal.fire("Success", "Profile picture uploaded!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Update profile name and photo
  const onSubmitProfile = async (data) => {
    try {
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });
      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // Change Password states and handler
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      return Swal.fire(
        "Error",
        "Password must be at least 6 characters",
        "error"
      );
    }
    if (newPassword !== confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }
    try {
      await changeUserPassword(newPassword);
      Swal.fire("Success", "Password changed successfully", "success");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to change password", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-12">
      <Helmet>
        <title>UpdateProfile - QuickDrop Courier</title>
        <meta name="description" content="QuickDrop Courier UpdateProfile" />
      </Helmet>
      <h2 className="text-3xl font-bold text-center">Update Profile</h2>

      {/* Profile Update Form */}
      <form
        onSubmit={handleSubmit(onSubmitProfile)}
        className="space-y-6 border p-6 rounded-lg shadow-md"
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Image Preview */}
          <img
            src={profilePic || "/default-profile.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
            className="file-input file-input-bordered"
          />
        </div>

        <div>
          <label className="label">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <button type="submit" className="btn bg-[#CAEB66]  text-black w-full">
          Update Profile
        </button>
      </form>

      {/* Change Password Section */}
      <div className="border p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-semibold">Change Password</h3>

        <input
          type="password"
          placeholder="New Password"
          className="input input-bordered w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="input input-bordered w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleChangePassword} className="btn btn-error w-full">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
