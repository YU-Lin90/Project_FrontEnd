import { useEffect } from 'react';

const siteName = window.location.hostname;

function Jumbotron() {
  useEffect(() => {}, []);
  return (
    <>
      <div className="w100p h500 ta-c padV50 padH50 of-h zi10">
        <div className="outterFrame h100p">
          <div className="pa_frame h100p">
            <div className="card_plate">
              {Array(4)
                .fill(1)
                .map((v, i) => {
                  return (
                    <div key={i} className="imgFR">
                      <img
                        src={` http://${siteName}:3001/images/HP00${
                          i < 3 ? i + 1 : 1
                        }.jpg`}
                        alt=""
                      />
                    </div>
                  );
                })}
              {/* <div className="imgFR">
                <img src={` http://${siteName}:3001/images/HP001.jpg`} alt="" />
              </div>
              <div className="imgFR">
                <img src={` http://${siteName}:3001/images/HP002.jpg`} alt="" />
              </div>
              <div className="imgFR">
                <img src={` http://${siteName}:3001/images/HP003.jpg`} alt="" />
              </div>
              <div className="imgFR">
                <img src={` http://${siteName}:3001/images/HP001.jpg`} alt="" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Jumbotron;
