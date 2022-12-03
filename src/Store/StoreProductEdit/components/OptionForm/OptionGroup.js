import React, { useEffect, useState } from 'react';

function OptionGroup({
  ot,
  data,
  details,
  setDetails,
  optionBoolean,
  setOptionBoolean,
  otIndex,
}) {
  const min = ot.min;
  const max = ot.max;

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
    // 如果min為0的話將optionBoolean改成true
    console.log(optionBoolean)
    const newOptionBoolean = [...optionBoolean];
    console.log(otIndex, min === 0);
    newOptionBoolean[otIndex] = 123;
    console.log(newOptionBoolean);
    setOptionBoolean(newOptionBoolean);
  }, []);

  return (
    <>
      {data.options
        .filter((opt) => {
          return opt.options_type_sid === ot.sid;
        })
        .map((opt, i) => {
          return (
            <div className="opt-box">
              <label>
                {max === 1 ? (
                  <input
                    type="radio"
                    value={opt.sid}
                    name={ot.name}
                    onChange={() => {
                      const thisIndex = details.findIndex((detail, index) => {
                        return detail.sid === ot.sid;
                      });
                      const newDetails = [...details];
                      newDetails[thisIndex].list = [
                        { sid: opt.sid, name: opt.name, price: opt.price },
                      ];
                      setDetails(newDetails);
                      console.log(details);
                    }}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name={ot.name}
                    value={opt.name}
                    checked={checkState[i]}
                    onChange={(e) => {
                      const newCheckState = [...checkState];

                      if (!newCheckState[i]) {
                        newCheckState[i] = true;
                        setNowNum(nowNum + 1);
                        setCheckState(newCheckState);

                        // details
                        const thisIndex = details.findIndex((detail) => {
                          return detail.sid === ot.sid;
                        });
                        const newDetails = [...details];
                        if (!newDetails[thisIndex].list) {
                          newDetails[thisIndex].list = [];
                        }
                        newDetails[thisIndex].list.push({
                          sid: opt.sid,
                          name: opt.name,
                          price: opt.price,
                        });
                        setDetails(newDetails);
                        console.log(details);
                      } else {
                        newCheckState[i] = false;
                        setNowNum(nowNum - 1);
                        setCheckState(newCheckState);
                        // details
                        const thisIndex = details.findIndex((detail) => {
                          return detail.sid === ot.sid;
                        });
                        const newDetails = [...details];
                        if (!newDetails[thisIndex].list) {
                          newDetails[thisIndex].list = [];
                        }
                        const listIndex = details[thisIndex].list.findIndex(
                          (l) => {
                            return l.sid === opt.sid;
                          }
                        );
                        newDetails[thisIndex].list.splice(listIndex, 1);
                        setDetails(newDetails);
                        console.log(details);
                      }
                    }}
                    disabled={
                      !checkState[i] && nowNum === max
                        ? // min > 1 && !checkState[i] && nowNum === max
                          true
                        : false
                    }
                  />
                )}

                <div className="option-words">
                  <p>{opt.name}</p>
                  <p>{opt.price === 0 ? 'Free' : `$ ${opt.price}`}</p>
                </div>
              </label>
            </div>
          );
        })}
    </>
  );
}

export default OptionGroup;
