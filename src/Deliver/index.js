import { Outlet } from 'react-router-dom';
import DeliverNav from './DeliverNav';
import Footer from '../Footer';
import BottomNav from './BottomNav/BottomState';

function DeliverLayout() {
  return (
    <>
      <div className="deliverContainer">
        <DeliverNav />
        <Outlet />
        <Footer />
        <BottomNav />
      </div>
    </>
  );
}
export default DeliverLayout;
