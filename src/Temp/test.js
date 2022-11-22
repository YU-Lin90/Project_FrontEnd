import { useState } from 'react';

function CBtest() {
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const [lengthNow, setLengthNow] = useState(0);
  const limit = 3;
  return (
    <>
      {Array(5)
        .fill(1)
        .map((v, i) => {
          return (
            <input
              type="checkbox"
              disabled={lengthNow === limit && !checks[i] ? true : false}
              checked={checks[i]}
              onChange={(e) => {
                if (!e.target.checked) {
                  const newArr = [...checks];
                  newArr[i] = false;
                  // console.log(lengthNow);
                  setChecks(newArr);
                  setLengthNow(lengthNow - 1);
                } else if (lengthNow < limit && e.target.checked) {
                  const newArr = [...checks];
                  newArr[i] = true;
                  setChecks(newArr);
                  setLengthNow(lengthNow + 1);
                }
              }}
            />
          );
        })}
    </>
  );
}
export default CBtest;
