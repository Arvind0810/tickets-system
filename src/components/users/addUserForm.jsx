'use client'

import { useState } from "react"

export default function AddUserForm(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        const response = await fetch('/api/users', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        })

        if(response.ok){
            setMessage("User Added successfully!")
            setName("")
            setEmail("")
            setPassword("")
        }else{
            setMessage("Error Encountered!")
        }

        setLoading(false)
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4">Add a New User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium">Name</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block font-medium">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
                />
            </div>
            <div>
                <label className="block font-medium">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded-md"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add User"}
            </button>
            </form>
            {message && <p className="mt-3 text-center">{message}</p>}
        </div>
        );
}