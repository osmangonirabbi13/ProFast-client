import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: completedParcels = [], isLoading } = useQuery({
    queryKey: ["completedParcels"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Completed Deliveries</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : completedParcels.length === 0 ? (
        <p className="text-gray-500">No completed deliveries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Receiver</th>
                <th>Delivered At</th>
              </tr>
            </thead>
            <tbody>
              {completedParcels.map((parcel) => (
                <tr key={parcel._id}>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.receiver_name}</td>
                  <td>{new Date(parcel.delivered_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedDeliveries;
