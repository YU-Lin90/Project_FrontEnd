import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';
//這邊要放會員NAVBAR
function Admin() {
  return (
    <>
      <AdminNav />
      <div className="container">{<Outlet />}</div>
    </>
  );
}
export default Admin;
