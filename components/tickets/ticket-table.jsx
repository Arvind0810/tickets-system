import { FaEdit, FaTrash } from "react-icons/fa";

const TicketTable = ({ tickets, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Date & Time</th>
            <th className="py-2 px-4 text-left">Service</th>
            <th className="py-2 px-4 text-left">Complaint</th>
            <th className="py-2 px-4 text-left">Priority</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b">
                <td className="py-2 px-4">{ticket.name}</td>
                <td className="py-2 px-4">{ticket.email}</td>
                <td className="py-2 px-4">{new Date(ticket.datetime).toLocaleString()}</td>
                <td className="py-2 px-4">{ticket.service}</td>
                <td className="py-2 px-4">{ticket.complaint}</td>
                <td className="py-2 px-4 font-semibold text-center">
                  <span
                    className={`px-2 py-1 rounded ${
                      ticket.priority === "High"
                        ? "bg-red-500 text-white"
                        : ticket.priority === "Medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-2 px-4">{ticket.status}</td>
                <td className="py-2 px-4 flex justify-center gap-4">
                  <button
                    onClick={() => onEdit(ticket.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(ticket.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 text-center text-gray-500">
                No tickets available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
