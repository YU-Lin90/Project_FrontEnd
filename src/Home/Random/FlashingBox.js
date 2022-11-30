//閃爍框
import { useEffect, useState } from 'react';

function FlashingBox({ radomArrays, setStartFlashing, startFlashing }) {
  const [count, setCount] = useState(0);
  const interVals = () => {
    setCount((v) => {
      if (v <= 30) return v + 1;
      else return 0;
    });
  };
  useEffect(() => {
    const intervalSet = setInterval(interVals, 50);
    setInterval(() => {
      clearInterval(intervalSet);
      // setStartFlashing(false);
    }, 50 * 30);
    return () => {
      clearInterval(intervalSet);
    };
  }, [startFlashing, radomArrays]);
  return (
    <>
      <div className="randomFlashingBox">
        {radomArrays[count] ? radomArrays[count].name : radomArrays[0].name}
      </div>
    </>
  );
}
export default FlashingBox;
