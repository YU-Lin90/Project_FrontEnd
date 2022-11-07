import { Outlet } from 'react-router-dom';
import DeliverNav from './DeliverNav';
function DeliverLayout() {
  return (
    <>
      <div className="deliverContainer">
        <DeliverNav />
        <Outlet />
      </div>
    </>
  );
}
export default DeliverLayout;
