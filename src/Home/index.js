import './home.css';
import Jumbotron from './Jumbotron';
import Citys from './Citys';
import Random from './Random';
import HomeCoupons from './HomeCoupons';
import FoodTypes from './FoodTypes';
import SearchByAddress from './SearchByAddress';
function Home() {
  return (
    <>
      <Jumbotron />
      <SearchByAddress />
      <Random />
      <HomeCoupons />
      <Citys />

      {/* <FoodTypes /> */}
    </>
  );
}
export default Home;
