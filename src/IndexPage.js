import { Outlet } from 'react-router-dom';
import MemberNav from './MemberNav';
//這邊要放會員NAVBAR
function IndexPage() {
  return (
    <>
      <MemberNav />
      <Outlet />
    </>
  );
}
export default IndexPage;
