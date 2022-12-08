import './home.css';
import Jumbotron from './Jumbotron';
import Citys from './Citys';
import Random from './Random';
import HomeCoupons from './HomeCoupons';
import SearchByAddress from './SearchByAddress';
import DailyTimeCounter from './DailyTimeCounter';
import { useState } from 'react';
function Home() {
  const [fakeCounter, setFakeCounter] = useState(0);
  return (
    <>
      <SearchByAddress />
      <Jumbotron />
      {/* <DailyTimeCounter /> */}
      <Random setFakeCounter={setFakeCounter} />
      <HomeCoupons fakeCounter={fakeCounter}   />
      <Citys />
      {/* <NewHomePage/> */}
      {/* <FoodTypes /> */}
    </>
  );
}
export default Home;
