import './home.css';
import Jumbotron from './Jumbotron';
import Citys from './Citys';
import Random from './Random';
import FoodTypes from './FoodTypes';
function Home() {
  return (
    <>
      <Jumbotron />
      <Random />
      <Citys />
      <FoodTypes />
    </>
  );
}
export default Home;
