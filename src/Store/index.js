import { Outlet } from 'react-router-dom';
import StoreNav from './StoreNav';
//這邊要放會員NAVBAR
function Store() {
  return (
    <>
      <StoreNav />
      <div className="container">{<Outlet />}</div>
    </>
  );
}
export default Store;
