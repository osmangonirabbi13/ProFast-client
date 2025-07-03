import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [trackingId, setTrackingId] = useState("");
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async () => {
    if (!trackingId.trim()) return;

    setLoading(true);
    setNotFound(false);
    setUpdates([]);

    try {
      const res = await axiosSecure.get(`/trackings/${trackingId}`);
      if (res.data.length === 0) {
        setNotFound(true);
      } else {
        setUpdates(res.data);
      }
    } catch (error) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Track Your Parcel</h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8 w-full">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          className="input input-bordered w-full sm:max-w-md"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button
          onClick={handleTrack}
          className="btn btn-primary w-full sm:w-auto"
        >
          Track
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading updates...</p>
      )}

      {notFound && (
        <p className="text-center text-red-500 font-semibold">
          No tracking updates found for "{trackingId}"
        </p>
      )}

      {!loading && updates.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <h3 className="text-xl font-semibold mb-4">Tracking History</h3>
          <ol className="relative border-l border-blue-300">
            {updates.map((update, index) => (
              <li key={index} className="mb-6 ml-4">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                <time className="text-sm text-gray-500">
                  {new Date(update.timestamp || update.time).toLocaleString()}
                </time>
                <h4 className="text-lg font-medium text-gray-900 capitalize">
                  {update.status.replace("_", " ")}
                </h4>
                {update.message && (
                  <p className="text-gray-600">{update.message}</p>
                )}
                {update.updated_by && (
                  <p className="text-sm text-gray-400">
                    Updated by: {update.updated_by}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
