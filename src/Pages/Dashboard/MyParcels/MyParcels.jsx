import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      const sorted = res.data.sort(
        (a, b) => new Date(b.creation_date) - new Date(a.creation_date)
      );
      return sorted;
    },
  });

  const handleView = (parcel) => {
    setSelectedParcel(parcel);
    document.getElementById("viewParcelModal").showModal();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Tracking ID copied!",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
    });
    if (confirm.isConfirmed) {
      try {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Parcel has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        });
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to delete parcel", "error");
      }
    }
  };

  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <div className="overflow-x-auto shadow-md rounded-xl">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className="max-w-[180px] truncate">{parcel.title}</td>
              <td className="capitalize">{parcel.type}</td>
              <td>{formatDate(parcel.creation_date)}</td>
              <td>৳{parcel.cost}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  onClick={() => handleView(parcel)}
                  className="btn btn-xs btn-outline"
                >
                  View
                </button>
                {parcel.payment_status === "unpaid" && (
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="btn btn-xs btn-primary text-black"
                  >
                    Pay
                  </button>
                )}
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {parcels.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-6">
                No parcels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* View Modal */}
      <dialog id="viewParcelModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Parcel Status</h3>

          {selectedParcel?.delivery_status === "rider_assigned" ||
          selectedParcel?.delivery_status === "in_transit" ||
          selectedParcel?.delivery_status === "delivered" ? (
            <div>
              <p className="mb-2">
                <strong>Status:</strong>{" "}
                <span className="capitalize">
                  {selectedParcel?.delivery_status.replace("_", " ")}
                </span>
              </p>
              <p className="mb-4">
                <strong>Tracking ID:</strong>{" "}
                <span className="text-blue-600 font-mono">
                  {selectedParcel?.tracking_id}
                </span>
                <button
                  className="ml-2 btn btn-xs btn-outline"
                  onClick={() => handleCopy(selectedParcel?.tracking_id)}
                >
                  Copy
                </button>
              </p>
            </div>
          ) : (
            <p className="text-yellow-600 font-medium">
              🚧 Waiting for assign a rider.
            </p>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyParcels;
