'use client'

export default function UserItems(props){
    const user = props.user

    return (
        <li key={user.id}>{user.name} - {user.email}</li>
    )
}