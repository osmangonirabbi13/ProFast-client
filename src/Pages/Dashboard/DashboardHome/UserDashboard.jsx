import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4CAF50", "#FFC107", "#B0BEC5"]; // Delivered, Pending, Others

const UserDashboard = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userParcels", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading your parcels data...</p>;
  if (isError)
    return <p>Failed to load parcels data. Please try again later.</p>;

  const totalParcels = parcels.length;
  const deliveredCount = parcels.filter(
    (p) => p.delivery_status === "delivered"
  ).length;
  const pendingCount = parcels.filter(
    (p) => p.delivery_status !== "delivered"
  ).length;

  // Data for PieChart
  const data = [
    { name: "Delivered", value: deliveredCount },
    { name: "Pending", value: pendingCount },
  ];

  return (
    <div className="p-8 w-full max-w-5xl mx-auto bg-base-200 rounded-xl shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="mb-6 text-xl">
        <p>
          Total Parcels Sent: <strong>{totalParcels}</strong>
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} parcels`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDashboard;
