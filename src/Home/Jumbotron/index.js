const siteName = window.location.hostname;
function Jumbotron() {
  return (
    <>
      <div className="w100p h500 ta-c padV50 padH50 of-h zi10">
        <div className="outterFrame h100p">
          <div className="pa_frame h100p">
            <div className="card_plate">
              <div className="imgFR">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Jumbotron;
