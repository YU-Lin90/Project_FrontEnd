import { useState } from 'react';

function TypeChecks({ rejectedTypes, setRejectedTypes }) {
  const typeList = [
    { name: '美式', sid: 1 },
    { name: '日式', sid: 2 },
    { name: '中式', sid: 3 },
    { name: '義式', sid: 4 },
    { name: '飲料', sid: 5 },
    { name: '甜點', sid: 6 },
  ];
  const limit = 5;
  const [lengthNow, setLengthNow] = useState(0);
  return (
    <>
      <div className="disf jc-se w500 marHauto marV20 padV20 padH20">
        {typeList.map((v) => (
          <div key={v.sid} className="disf">
            <p>{v.name}</p>
            <input
              disabled={
                lengthNow === limit && !rejectedTypes[v.sid - 1] ? true : false
              }
              type="checkbox"
              checked={rejectedTypes[v.sid - 1]}
              onChange={() => {
                if (rejectedTypes[v.sid - 1]) {
                  const newArr = [...rejectedTypes];
                  newArr[v.sid - 1] = false;
                  // console.log(lengthNow);
                  setRejectedTypes(newArr);
                  setLengthNow(lengthNow - 1);
                } else if (lengthNow < limit && !rejectedTypes[v.sid - 1]) {
                  const newArr = [...rejectedTypes];
                  newArr[v.sid - 1] = true;
                  setRejectedTypes(newArr);
                  setLengthNow(lengthNow + 1);
                }

                // const newArr = [...rejectedTypes];
                // newArr[v.sid - 1] = !newArr[v.sid - 1];
                // setRejectedTypes(newArr);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
export default TypeChecks;
