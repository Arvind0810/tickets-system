import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { SelectField } from "../form-fields";

const TicketTable = ({ tickets, onEdit, onDelete }) => {
  const [orderBy, setOrderBy] = useState("")
  const [order, setOrder] = useState("")
  const [records, setRecords] = useState(tickets)
  const [filter, setFilter] = useState('')

  function handleChange(e){
    setFilter(e.target.value)
  }

  useEffect(() => {
    async function fetchRecords() {
      if(filter){
        const res = await fetch(`/api/tickets?orderby=${orderBy}&order=${order}&filter=${filter}`);
        const data = await res.json();
        setRecords(data);
      }else{
        const res = await fetch(`/api/tickets?orderby=${orderBy}&order=${order}`);
        const data = await res.json();
        setRecords(data);
      }
      }
      fetchRecords();
  }, [orderBy, order, filter])

  function handleShort(e, col){
    e.preventDefault()
    setOrderBy(col)
    if(order == "" || order == "desc"){
      setOrder("asc")
    }else{
      setOrder("desc")
    }
    console.log(records);
  }
  return (
    <div className="overflow-x-auto">
      <SelectField 
        label="Filter"
        name="filter"
        options={[{label: "Pending", value:"Pending"},{label: "In Progress", value:"In Progress"},{label: "Closed", value:"Closed"},{label: "Open", value:"Open"}]}
        value={filter}
        onChange={handleChange}
        error=""
        className="w-2xl"
      />
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left hover:cursor-pointer" onClick={(e) => handleShort(e, 'name')}>Name</th>
            <th className="py-2 px-4 text-left hover:cursor-pointer" onClick={(e) => handleShort(e, 'datetime')}>Date & Time</th>
            <th className="py-2 px-4 text-left hover:cursor-pointer" onClick={(e) => handleShort(e, 'service')}>Service</th>
            <th className="py-2 px-4 text-left" >Complaint</th>
            <th className="py-2 px-4 text-left hover:cursor-pointer" onClick={(e) => handleShort(e, 'department')}>Department</th>
            <th className="py-2 px-4 text-left hover:cursor-pointer" onClick={(e) => handleShort(e, 'priority')}>Priority</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((ticket) => (
              <tr key={ticket.id} className="border-b">
                <td className="py-2 px-4">{ticket.name}</td>
                <td className="py-2 px-4">{new Date(ticket.datetime).toLocaleString()}</td>
                <td className="py-2 px-4">{ticket.service}</td>
                <td className="py-2 px-4">{ticket.complaint}</td>
                <td className="py-2 px-4">{ticket.department}</td>
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
