import { Outlet } from 'react-router-dom';
import DeliverNav from './DeliverNav';
import BottomNav from './BottomNav/BottomState';

function DeliverLayout() {
  return (
    <>
      <div className="deliverContainer">
        <DeliverNav />
          <Outlet />
        <BottomNav /> 
      </div>
    </>
  );
}
export default DeliverLayout;
