import { Outlet } from 'react-router-dom';
import DeliverNav from './DeliverNav';
import Footer from '../Footer';
function DeliverLayout() {
  return (
    <>
      <div className="deliverContainer">
        <DeliverNav />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
export default DeliverLayout;
