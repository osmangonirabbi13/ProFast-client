import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaMotorcycle } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "@dr.pogodin/react-helmet";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const queryClient = useQueryClient();

  // Step 1: Load assignable parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      // Sort oldest first
      return res.data.sort(
        (a, b) => new Date(a.creation_date) - new Date(b.creation_date)
      );
    },
  });

  // Step 2: Assign rider mutation
  const { mutateAsync: assignRider } = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assignableParcels"]);
      Swal.fire("Success", "Rider assigned successfully!", "success");
      document.getElementById("assignModal")?.close();
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign rider", "error");
    },
  });

  // Step 3: Open modal and load riders
  const openAssignModal = async (parcel) => {
    setSelectedParcel(parcel);
    setLoadingRiders(true);
    setRiders([]);

    try {
      const res = await axiosSecure.get("/riders/available", {
        params: {
          district: parcel.sender_center,
        },
      });
      setRiders(res.data);
    } catch (error) {
      console.error("Error fetching riders", error);
      Swal.fire("Error", "Failed to load riders", "error");
    } finally {
      setLoadingRiders(false);
      const modal = document.getElementById("assignModal");
      modal?.showModal();

      // ⚠ Fix: focus modal heading to avoid aria-hidden focus warning
      setTimeout(() => {
        modal?.querySelector(".modal-heading")?.focus();
      }, 100);
    }
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>AssignRider - QuickDrop Courier</title>
        <meta name="description" content="QuickDrop Courier AssignRider" />
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

      {isLoading ? (
        <p>Loading parcels...</p>
      ) : parcels.length === 0 ? (
        <p className="text-gray-500">No parcels available for assignment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Sender Center</th>
                <th>Receiver Center</th>
                <th>Cost</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.sender_center}</td>
                  <td>{parcel.receiver_center}</td>
                  <td>৳{parcel.cost}</td>
                  <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => openAssignModal(parcel)}
                      className="btn btn-sm bg-[#CAEB66]  text-black"
                    >
                      <FaMotorcycle className="inline-block mr-1 " />
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🛵 Assign Rider Modal */}
          <dialog id="assignModal" className="modal">
            <div className="modal-box max-w-2xl">
              <h3
                tabIndex="-1"
                className="text-lg font-bold mb-3 modal-heading"
              >
                Assign Rider for Parcel:{" "}
                <span className="text-primary">{selectedParcel?.title}</span>
              </h3>

              {loadingRiders ? (
                <p>Loading riders...</p>
              ) : riders.length === 0 ? (
                <p className="text-error">
                  No available riders in this district.
                </p>
              ) : (
                <div className="overflow-x-auto max-h-80 overflow-y-auto">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Bike Info</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riders.map((rider) => (
                        <tr key={rider._id}>
                          <td>{rider.name}</td>
                          <td>{rider.phone}</td>
                          <td>
                            {rider.bike_brand} - {rider.bike_registration}
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                assignRider({
                                  parcelId: selectedParcel._id,
                                  rider,
                                })
                              }
                              className="btn btn-xs btn-success"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
