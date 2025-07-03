import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "@dr.pogodin/react-helmet";

const BeARider = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedRegion, setSelectedRegion] = useState("");
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  const regions = [...new Set(serviceCenters.map((s) => s.region))];
  const districts = serviceCenters
    .filter((s) => s.region === selectedRegion)
    .map((s) => s.district);

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application is pending approval.",
        });
        reset();
      }
    } catch (err) {
      if (err.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Already Applied",
          text: "You have already submitted a rider application with this email.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please try again later.",
        });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-xl shadow">
      <Helmet>
        <title>BeARider - QuickDrop Courier</title>
        <meta name="description" content=" QuickDrop Courier BeARider Page" />
      </Helmet>
      <h2 className="text-2xl font-bold mb-2">Become a Rider</h2>
      <p className="text-gray-500 mb-6">
        Fill out the form to apply as a delivery rider.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Name (read-only) */}
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered text-black w-full bg-gray-100"
          />

          {/* Email (read-only) */}
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered text-black w-full bg-gray-100"
          />

          {/* Age */}
          <input
            type="number"
            placeholder="Your Age"
            className="input input-bordered w-full"
            {...register("age", { required: true, min: 18 })}
          />
          {errors.age && (
            <span className="text-red-500 text-sm">
              You must be 18 or older
            </span>
          )}

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">
              Phone number is required
            </span>
          )}

          {/* National ID */}
          <input
            type="text"
            placeholder="National ID Card Number"
            className="input input-bordered w-full"
            {...register("nid", { required: true })}
          />
          {errors.nid && (
            <span className="text-red-500 text-sm">NID is required</span>
          )}

          {/* Region */}
          <select
            className="select select-bordered w-full"
            {...register("region", { required: true })}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Select Region</option>
            {regions.map((region, idx) => (
              <option key={idx} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <span className="text-red-500 text-sm">Region is required</span>
          )}

          {/* District */}
          <select
            className="select select-bordered w-full"
            {...register("district", { required: true })}
            disabled={!selectedRegion}
          >
            <option value="">Select District</option>
            {districts.map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <span className="text-red-500 text-sm">District is required</span>
          )}

          {/* Bike Brand */}
          <input
            type="text"
            placeholder="Bike Brand (e.g., Yamaha FZ)"
            className="input input-bordered w-full"
            {...register("bike_brand", { required: true })}
          />
          {errors.bike_brand && (
            <span className="text-red-500 text-sm">Bike brand is required</span>
          )}

          {/* Bike Registration */}
          <input
            type="text"
            placeholder="Bike Registration Number"
            className="input input-bordered w-full"
            {...register("bike_registration", { required: true })}
          />
          {errors.bike_registration && (
            <span className="text-red-500 text-sm">
              Registration number is required
            </span>
          )}

          {/* Additional Info */}
          <textarea
            placeholder="Additional information (optional)"
            className="textarea textarea-bordered w-full"
            {...register("note")}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn bg-[#CAEB66] text-black w-full mt-4"
        >
          Submit Rider Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
