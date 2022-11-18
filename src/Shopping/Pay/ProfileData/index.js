//第二段 付款方式
import { useEffect, useState } from 'react';
import PayTitleBlock from '../PayTitleBlock';
import { usePay } from '../../../Context/PayPageContext';
const siteName = window.location.hostname;
function ProfileData() {
  const { profile, setProfile } = usePay();

  //修改開關
  const [edit, setEdit] = useState(false);
  //獲得個人資料
  const getProfileData = () => {
    fetch(`http://${siteName}:3001/PayGetProfile`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Member'),
      },
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        setProfile(res);
        // setproductData(res);
      });
  };
  //INPUT修改函式
  const changeValue = (e) => {
    const names = e.target.name;
    setProfile({ ...profile, [names]: e.target.value });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  //

  /*{
    "name": "ゆう",
    "phone": "0952400243",
    "email": "test@test.com"
  }*/
  //profile.name
  //profile.phone
  //profile.email
  return (
    <>
      <div className="payDetailBox">
        <PayTitleBlock number={2} titleString={'個人資料'} />
        <div className="disf fd-c jc-sb gap20">
          <div className="fs16">
            <p className="fw6">姓名</p>
            {edit ? (
              <input
                name="name"
                value={profile.name}
                onChange={(e) => {
                  changeValue(e);
                }}
              />
            ) : (
              <p className="padV1">{profile.name}</p>
            )}
          </div>

          <div className="fs16">
            <p className="fw6">E-mail</p>
            {edit ? (
              <input
                name="email"
                value={profile.email}
                onChange={(e) => {
                  changeValue(e);
                }}
              />
            ) : (
              <p className="padV1">{profile.email}</p>
            )}
          </div>

          <div className="fs16">
            <p className="fw6">連絡電話</p>
            {edit ? (
              <input
                name="phone"
                value={profile.phone}
                onChange={(e) => {
                  changeValue(e);
                }}
              />
            ) : (
              <p className="padV1">{profile.phone}</p>
            )}
          </div>
          <div
            className="as-e payPageButton"
            onClick={() => {
              setEdit((v) => !v);
            }}
          >
            {edit ? '儲存' : '修改'}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileData;
