import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const COLORS = ["#4CAF50", "#FFC107", "#2196F3"];

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcels?email=${email}`
      );
      return res.data;
    },
  });

  const calculateEarning = (parcel) => {
    const cost = Number(parcel.cost);
    return parcel.sender_center === parcel.receiver_center
      ? cost * 0.8
      : cost * 0.3;
  };

  let totalEarnings = 0;
  let totalPending = 0;
  let totalCashedOut = 0;

  parcels.forEach((parcel) => {
    const earning = calculateEarning(parcel);
    totalEarnings += earning;
    if (parcel.cashout_status === "cashed_out") {
      totalCashedOut += earning;
    } else {
      totalPending += earning;
    }
  });

  const data = [
    { name: "Delivered Parcels", value: parcels.length },
    { name: "Pending Earnings", value: totalPending },
    { name: "Cashed Out Earnings", value: totalCashedOut },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">Rider Dashboard</h1>

      {isLoading ? (
        <p>Loading your data...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Delivered Parcels Count */}
            <div className="bg-base-200 p-6 rounded-xl shadow text-center">
              <h2 className="text-xl font-semibold mb-2">Delivered Parcels</h2>
              <p className="text-4xl font-bold">{parcels.length}</p>
            </div>

            {/* Total Earnings */}
            <div className="bg-base-200 p-6 rounded-xl shadow text-center">
              <h2 className="text-xl font-semibold mb-2">Total Earnings</h2>
              <p className="text-4xl font-bold text-green-600">
                ৳{totalEarnings.toFixed(2)}
              </p>
            </div>

            {/* Pending Earnings */}
            <div className="bg-base-200 p-6 rounded-xl shadow text-center">
              <h2 className="text-xl font-semibold mb-2">Pending Earnings</h2>
              <p className="text-4xl font-bold text-yellow-600">
                ৳{totalPending.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="bg-base-200 p-6 rounded-xl shadow mx-auto max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Overview Pie Chart
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) =>
                    entry.name === "Delivered Parcels"
                      ? `${entry.name}: ${entry.value}`
                      : `${entry.name}: ৳${entry.value.toFixed(2)}`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) =>
                    name === "Delivered Parcels"
                      ? value
                      : `৳${value.toFixed(2)}`
                  }
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default RiderDashboard;
