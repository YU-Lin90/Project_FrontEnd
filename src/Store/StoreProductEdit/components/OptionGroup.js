import React, { useEffect, useState } from 'react';

function OptionGroup({ ot, data, details, setDetails }) {
  const [checkState, setCheckState] = useState([]);
  const [nowNum, setNowNum] = useState(0);

  useEffect(() => {
    const newCheckState = data.options
      .filter((opt) => {
        return opt.options_type_sid === ot.sid;
      })
      .map((opt) => {
        return false;
      });
    setCheckState(newCheckState);
  }, []);
  const min = ot.min;
  const max = ot.max;
  return (
    <>
      {data.options
        .filter((opt) => {
          return opt.options_type_sid === ot.sid;
        })
        .map((opt, i) => {
          return (
            <>
              <label>
                {max === 1 ? (
                  <input
                    type="radio"
                    value={opt.sid}
                    name={ot.name}
                    onChange={(e) => {}}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name={ot.name}
                    value={ot.name}
                    checked={checkState[i]}
                    onChange={() => {
                      const newCheckState = [...checkState];
                      if (!newCheckState[i]) {
                        newCheckState[i] = true;
                        setNowNum(nowNum + 1);
                      } else {
                        newCheckState[i] = false;
                        setNowNum(nowNum - 1);
                        // 將選項資訊移出details
                      }
                      setCheckState(newCheckState);
                    }}
                    disabled={
                      min > 1 && !checkState[i] && nowNum === max ? true : false
                    }
                  />
                )}
                {opt.name}
              </label>
            </>
          );
        })}
    </>
  );
}

export default OptionGroup;
