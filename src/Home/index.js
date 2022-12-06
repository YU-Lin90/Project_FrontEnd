import './home.css';
import Jumbotron from './Jumbotron';
import Citys from './Citys';
import Random from './Random';
import HomeCoupons from './HomeCoupons';
import SearchByAddress from './SearchByAddress';
import DailyTimeCounter from './DailyTimeCounter';
function Home() {
  return (
    <>
      <SearchByAddress />
      <Jumbotron />
      <DailyTimeCounter />
      <Random />
      <HomeCoupons />
      <Citys />
    {/* <NewHomePage/> */}
      {/* <FoodTypes /> */}
    </>
  );
}
export default Home;
