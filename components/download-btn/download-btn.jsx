import { useState } from "react";
import * as XLSX from "xlsx";

const DownloadButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to fetch tickets & generate Excel
  const handleDownload = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range!");
      return;
    }

    try {
      const response = await fetch(
        `/api/tickets/download?start=${startDate}&end=${endDate}`
      );
      const data = await response.json();

      if (!data.length) {
        alert("No tickets found in this date range.");
        return;
      }

      // Convert data to Excel format
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Tickets");

      // Create and download file
      XLSX.writeFile(wb, `tickets_${startDate}_to_${endDate}.xlsx`);

      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file!");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download Tickets
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Select Date Range</h2>

            <label className="block mb-2">
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 w-full"
              />
            </label>

            <label className="block mb-4">
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 w-full"
              />
            </label>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
