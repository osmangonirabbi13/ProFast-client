import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useTrackingLogger from "../../../Hooks/useTrackingLogger";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { logTracking } = useTrackingLogger();
  const { user } = useAuth();

  // Load parcels assigned to the current rider
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation for updating parcel status
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ parcel, status }) => {
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["riderParcels"]);
    },
  });

  const handleStatusUpdate = (parcel, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus({ parcel, status: newStatus })
          .then(async () => {
            Swal.fire("Updated!", "Parcel status updated.", "success");

            // log tracking
            let trackDetails = `Picked up by ${user.displayName}`;
            if (newStatus === "delivered") {
              trackDetails = `Delivered by ${user.displayName}`;
            }
            await logTracking({
              tracking_id: parcel.tracking_id,
              status: newStatus,
              details: trackDetails,
              updated_by: user.email,
            });
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to update status.", "error");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📦 Pending Deliveries
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading deliveries...</p>
      ) : parcels.length === 0 ? (
        <p className="text-center text-gray-500">No assigned deliveries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Receiver</th>
                <th>Receiver Center</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td className="font-mono text-blue-600">
                    {parcel.tracking_id}
                  </td>
                  <td>{parcel.title}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>{parcel.receiver_center}</td>
                  <td>৳{parcel.cost}</td>
                  <td className="capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          parcel.delivery_status === "rider_assigned"
                            ? "bg-yellow-100 text-yellow-700"
                            : parcel.delivery_status === "in_transit"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {parcel.delivery_status.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    {parcel.delivery_status === "rider_assigned" && (
                      <button
                        className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500"
                        onClick={() => handleStatusUpdate(parcel, "in_transit")}
                      >
                        🚚 Start Delivery
                      </button>
                    )}
                    {parcel.delivery_status === "in_transit" && (
                      <button
                        className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleStatusUpdate(parcel, "delivered")}
                      >
                        ✅ Mark Delivered
                      </button>
                    )}
                    {parcel.delivery_status === "delivered" && (
                      <span className="text-green-600 font-medium">
                        Delivered
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
