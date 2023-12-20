import getUsers from "../actions/getUsers"
import SideBarUsers from "../components/sidebar/SideBarUsers"
import UsersList from "./components/UsersList"

async function UserLayout({children}:{children:React.ReactNode}) {
  const users=await getUsers()
  return (
    <SideBarUsers>
    <div className="h-full">
      <UsersList users={users}/>
      {children}
    </div>
    </SideBarUsers>
  )
}

export default UserLayout
