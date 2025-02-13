'use server'
import AddUserForm from "../../components/users/addUserForm";
import UserList from "../../components/users/UserList";
// import prisma from "../../../lib/prisma";

export default async function Users(){
    
    return (
      <>
        <AddUserForm />
        <main>
          <UserList />
        </main>
      </>
    );
}