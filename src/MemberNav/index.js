import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './NavBar.css';
import Menu from './Menu';
import ChooseCart from '../Shopping/ChooseCart';
import Cart from '../Shopping/Cart';
const siteName = window.location.hostname;
//確認登入資訊
function fetchLoginCheck(setfunc) {
  fetch(`http://${siteName}:3001/LoginCheck/Member`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Member'),
    },
  })
    .then((r) => r.json())
    .then((res) => {
      // console.log({ res });
      if (res === 1) {
        setfunc(true);
      } else {
        setfunc(false);
      }
      //收到1代表有登入
      //收到0代表沒登入
    });
}
//獲得會員名
function getName(setMemberName) {
  const settedName = localStorage.getItem('MemberName');
  if (!!settedName) {
    setMemberName(settedName);
  }
}
function MemberNav() {
  const navi = useNavigate();
  //目錄開合切換
  const [toggle, setToggle] = useState(false);

  const { authMember, setAuthMember, cartTotal, setCartTotal } = useAuth();
  //登入的會員名
  const [memberName, setMemberName] = useState('');

  //TODO 之後購物車按鈕要獨立出去成為一個元件 不然這邊太擠
  //選擇店家頁面
  const [showChooseShop, setShowChooseShop] = useState(false);

  //購物車商品列表頁面(已經選擇店家)
  const [showCart, setShowCart] = useState(false);

  //購物車檢查
  function checkCartAmount() {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (!localCart || !localCart.cartTotal) {
      return;
    }
    setCartTotal(localCart.cartTotal);
  }

  useEffect(() => {
    checkCartAmount();
    fetchLoginCheck(setAuthMember);
  }, []);

  useEffect(() => {
    getName(setMemberName);
  }, [authMember]);
  return (
    <>
      <nav className="memberNav">
        <div className="disf ai-c jc-c pad5 gap10">
          <div
            // 目錄按鈕(三橫線)
            onClick={() => {
              setToggle(!toggle);
            }}
            className="menubtn"
          >
            <div
              className={`menubtn_bar menubtn_bar_01 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
            <div
              className={`menubtn_bar menubtn_bar_02 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
            <div
              className={`menubtn_bar menubtn_bar_03 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
          </div>
          <div
            className="h40"
            onClick={() => {
              setToggle(false);
            }}
          >
            <Link to="/">
              <svg
                className="h100p navLogo"
                viewBox="0 0 1510 1569"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M35.7346 0C143.92 28.5957 252.139 57.2003 360.324 85.7961C371.242 101.959 382.163 118.127 393.081 134.29H402.015C412.378 89.8377 449.516 76.2721 488.374 89.5264C494.376 100.866 503.014 145.06 512.196 152.94C546.291 182.2 672.035 273.514 696.825 253.658C701.788 246.198 706.752 238.736 711.715 231.276C743.476 232.52 775.246 233.763 807.007 235.007C813.955 246.196 820.905 257.39 827.853 268.579C877.822 244.001 1000.36 161.606 1024.39 108.178C1052.21 104.196 1080.95 97.9677 1104.8 108.178C1106.75 122.378 1107.92 126.225 1113.73 134.29C1118.69 133.046 1123.66 131.802 1128.62 130.559C1133.58 116.883 1138.55 103.203 1143.51 89.5264C1176.64 57.5267 1469.74 0.189993 1494.9 22.3816C1502.12 50.0199 1511.54 72.2409 1509.79 104.447C1480.27 142.567 1238.34 244.11 1170.31 227.547C1154.43 216.356 1138.54 205.164 1122.66 193.974H1119.69C1115.58 226.253 1101.21 237.397 1107.77 261.119C1145.32 276.002 1194.54 291.654 1247.73 279.77C1294.11 269.409 1379.21 228.912 1420.45 249.928V253.658C1417.05 268.169 1417.76 268.818 1408.54 276.039C1361.74 312.17 1290.36 322.962 1226.89 335.724H1092.89C1081.02 401.615 1017.56 425.148 976.747 455.092C977.739 457.579 978.732 460.066 979.725 462.553C1043.15 472.429 1130.39 516.999 1170.31 563.271V567C1065.1 543.377 959.862 519.748 854.654 496.126C664.307 457.671 491.814 538.02 339.479 567C340.471 564.514 341.464 562.026 342.457 559.54C357.345 547.107 372.237 534.67 387.126 522.237C432.751 497.273 505.283 495.408 536.02 451.363H530.064C481.201 415.172 446.464 387.254 413.927 331.993C339.356 365.539 118.695 313.976 95.2924 257.388L107.204 242.467C189.738 268.829 319.323 300.659 407.971 261.119L410.949 253.658C400.494 234.893 398.779 219.329 390.103 193.974C271.84 268.401 102.88 161.295 0 108.178C2.93381 58.4756 17.6784 29.5675 35.7346 0Z" />
                <path d="M448 603V1503C197.623 1483.93 197.043 621.977 448 603Z" />
                <path d="M1040 603C1285.19 615.95 1285.47 1473.38 1040 1486V603Z" />
                <path d="M613.998 623.545C613.998 571.727 533.999 601.954 494 623.545V990.062H522.915V723.073C524.12 709.908 530 678.681 543.879 659.091C612.553 606.957 571.348 683.578 543.879 764.149C521.903 828.605 547.252 840.506 562.674 838.4L571.348 884.215C578.336 882.635 593.613 867.626 598.818 820.232C574.529 812.017 574.24 757.829 577.131 731.762C584.36 718.334 601.854 677.891 613.998 623.545Z" />
                <path d="M707.973 635.394C713.178 604.429 664.841 603.008 640.022 606.167C639.058 607.747 640.89 618.964 655.926 651.192C670.962 683.42 696.889 654.088 707.973 635.394Z" />
                <path d="M741.949 731.762C757.563 697.006 680.504 717.281 640.022 731.762C634.48 742.558 636.119 760.673 687.01 746.771C750.623 729.393 666.046 786.266 655.926 807.593C687.01 812.333 687.732 854.988 681.227 884.215C674.721 913.441 647.251 899.223 632.071 959.256C616.89 1019.29 827.249 981.373 942.91 990.062C1035.44 997.013 981.464 964.522 942.91 947.407C903.151 946.617 811.779 944.406 764.358 941.878C716.937 939.35 700.744 922.92 698.576 915.021C706.527 904.752 719.539 871.418 707.973 820.232C687.732 763.359 707.973 802.854 741.949 731.762Z" />
                <path d="M781.707 723.073C785.081 761.516 781.852 853.724 741.949 915.021C755.202 915.021 781.707 914.073 781.707 910.281C781.707 905.542 805.562 758.619 835.201 738.082C940.741 691.477 927.729 812.333 931.344 856.568C934.958 900.803 911.103 896.063 880.742 893.693C850.381 891.324 883.634 911.071 916.886 915.021C972.548 932.399 942.91 764.149 936.404 723.073C931.199 690.213 831.104 709.382 781.707 723.073Z" />
                <path d="M809.9 793.375C923.392 784.686 927.729 783.896 926.284 799.694C924.838 815.493 795.596 835.24 809.9 793.375Z" />
                <path d="M802.671 839.98C914.718 836.03 929.175 829.711 926.284 847.879C923.392 866.047 784.599 864.467 802.671 839.98Z" />
                <path d="M613.998 623.545C613.998 571.727 533.999 601.954 494 623.545V990.062H522.915V723.073C524.12 709.908 530 678.681 543.879 659.091C612.553 606.957 571.348 683.578 543.879 764.149C521.903 828.605 547.252 840.506 562.674 838.4L571.348 884.215C578.336 882.635 593.613 867.626 598.818 820.232C574.529 812.017 574.24 757.829 577.131 731.762C584.36 718.334 601.854 677.891 613.998 623.545Z" />
                <path d="M707.973 635.394C713.178 604.429 664.841 603.008 640.022 606.167C639.058 607.747 640.89 618.964 655.926 651.192C670.962 683.42 696.889 654.088 707.973 635.394Z" />
                <path d="M741.949 731.762C757.563 697.006 680.504 717.281 640.022 731.762C634.48 742.558 636.119 760.673 687.01 746.771C750.623 729.393 666.046 786.266 655.926 807.593C687.01 812.333 687.732 854.988 681.227 884.215C674.721 913.441 647.251 899.223 632.071 959.256C616.89 1019.29 827.249 981.373 942.91 990.062C1035.44 997.013 981.464 964.522 942.91 947.407C903.151 946.617 811.779 944.406 764.358 941.878C716.937 939.35 700.744 922.92 698.576 915.021C706.527 904.752 719.539 871.418 707.973 820.232C687.732 763.359 707.973 802.854 741.949 731.762Z" />
                <path d="M781.707 723.073C785.081 761.516 781.852 853.724 741.949 915.021C755.202 915.021 781.707 914.073 781.707 910.281C781.707 905.542 805.562 758.619 835.201 738.082C940.741 691.477 927.729 812.333 931.344 856.568C934.958 900.803 911.103 896.063 880.742 893.693C850.381 891.324 883.634 911.071 916.886 915.021C972.548 932.399 942.91 764.149 936.404 723.073C931.199 690.213 831.104 709.382 781.707 723.073Z" />
                <path d="M809.9 793.375C923.392 784.686 927.729 783.896 926.284 799.694C924.838 815.493 795.596 835.24 809.9 793.375Z" />
                <path d="M802.671 839.98C914.718 836.03 929.175 829.711 926.284 847.879C923.392 866.047 784.599 864.467 802.671 839.98Z" />
                <path d="M774.97 499.065C779.833 542.586 742.837 553.466 723.732 553.466C702.021 567.782 671.626 593.169 723.732 580.189C788.865 563.964 774.97 560.147 744.574 607.867C714.179 655.587 754.127 646.043 782.785 614.548C811.444 583.052 807.97 570.645 826.207 567.782C897.419 551.557 910.445 529.606 886.129 529.606C807.97 554.42 812.312 536.287 814.918 512.426C817.523 488.566 794.075 492.384 774.97 499.065Z" />
                <path d="M921.83 593.561C904.892 590.635 857.009 589.644 800.988 609.093C770.623 635.429 831.353 633.404 849.325 628.001C867.296 622.599 846.846 661.766 831.353 665.818C747.074 683.376 800.988 695.531 883.409 696.206C965.829 696.881 957.153 664.467 937.942 665.818C918.732 667.168 872.874 665.143 872.874 648.26C874.113 626.651 878.451 625.3 915.633 619.898C945.379 615.576 932.158 600.539 921.83 593.561Z" />
                <path d="M978.498 1173.28C953.695 1168.56 953.4 1137.47 956.352 1122.51C963.734 1114.81 981.599 1091.6 994 1060.42C994 1030.68 912.307 1048.03 871.46 1060.42V1270.73H900.988V1117.53C902.218 1109.97 908.222 1092.05 922.395 1080.81C992.524 1050.9 950.447 1094.86 922.395 1141.1C899.954 1178.08 925.84 1184.91 941.588 1183.7L950.447 1209.99C957.583 1209.08 973.183 1200.47 978.498 1173.28Z" />
                <path d="M537.188 1140.65C505.418 1122.77 505.418 1122.77 581.04 1062.18C620.775 1011.85 605.65 1077.85 593.121 1117.14C570.002 1138 539.873 1174.69 604.308 1154.56C684.852 1129.39 660.241 1160.18 604.308 1241.3C548.375 1322.42 517.5 1278.05 552.402 1234.35C587.304 1190.64 590.884 1179.06 517.5 1190.31C444.116 1201.57 568.958 1158.53 537.188 1140.65Z" />
                <path d="M556.904 1378.14C536.281 1358.18 673.999 1298.21 745.436 1270.73C824.953 1298.69 977.754 1358.27 952.821 1372.91C927.889 1387.55 815.462 1333.22 762.366 1304.23L745.436 1293.78C691.185 1330.21 577.527 1398.1 556.904 1378.14Z" />
                <path d="M556.904 1378.14C536.281 1358.18 673.999 1298.21 745.436 1270.73C824.953 1298.69 977.754 1358.27 952.821 1372.91C927.889 1387.55 815.462 1333.22 762.366 1304.23L745.436 1293.78C691.185 1330.21 577.527 1398.1 556.904 1378.14Z" />

                <path d="M689.811 1148.36C774.885 1145.54 822.514 1156.11 807.454 1162.23C795.405 1167.12 716.269 1154.01 689.811 1148.36Z" />
                <path d="M711.698 1128.46C796.771 1125.63 845.313 1134.07 830.252 1140.19C818.204 1145.08 738.156 1134.1 711.698 1128.46Z" />
                <path d="M689.811 1148.36C774.885 1145.54 822.514 1156.11 807.454 1162.23C795.405 1167.12 716.269 1154.01 689.811 1148.36Z" />
                <path d="M711.698 1128.46C796.771 1125.63 845.313 1134.07 830.252 1140.19C818.204 1145.08 738.156 1134.1 711.698 1128.46Z" />
                <path d="M751.824 1048.12C748.541 1094.19 703.035 1105.71 680.692 1105.71C657.437 1105.71 680.692 1133.79 672.028 1203.46C663.364 1273.13 724.466 1267.09 745.441 1254.65C810.19 1227.99 822.501 1261.76 832.077 1243.63C841.652 1225.5 728.113 1194.77 755.928 1215.19C783.743 1235.61 757.752 1243.27 707.594 1218.75C657.437 1194.22 765.96 1196 791.494 1188.18C817.029 1180.36 710.33 1168.27 695.739 1156.89C681.148 1145.52 708.962 1126.32 745.441 1112.11C818.853 1085.44 791.039 1105.71 832.077 1115.3C873.115 1124.9 751.824 1204.88 813.837 1183.56C875.851 1162.23 867.643 1080.47 825.693 1084.73C783.743 1089 755.928 990.533 751.824 1048.12Z" />
                <path d="M759.338 1466.24C700.282 1443.27 749.117 1432.66 809.688 1432.66C811.328 1433.37 815.139 1434.36 817.259 1432.66C870.637 1428.07 776.752 1423.12 731.324 1427.01C672.267 1463.77 693.467 1418.17 681.732 1390.25C669.996 1362.33 775.238 1376.82 809.688 1376.82C866.094 1366.92 828.994 1419.58 836.187 1432.66C843.38 1445.74 853.223 1395.9 853.223 1384.24C892.972 1354.9 763.124 1352.08 701.796 1351.01C640.468 1349.95 648.039 1406.15 653.718 1447.15C687.789 1461.65 652.204 1566.62 704.824 1568.04C757.445 1569.45 809.688 1527.39 766.152 1534.81C722.617 1542.23 709.367 1522.79 709.367 1486.03C686.653 1449.27 906.222 1543.29 874.423 1522.79C842.623 1502.29 840.352 1489.92 874.423 1447.15C875.18 1402.62 818.395 1489.22 759.338 1466.24Z" />
                <path d="M691.953 1387.77C820.666 1387.77 849.058 1390.25 830.887 1399.44C816.35 1406.79 732.207 1394.73 691.953 1387.77Z" />
                <path d="M828.615 1419.23C777.635 1412.4 679.838 1400.99 696.495 1410.04C713.152 1419.09 791.516 1419.94 828.615 1419.23Z" />
                <path d="M691.953 1387.77C820.666 1387.77 849.058 1390.25 830.887 1399.44C816.35 1406.79 732.207 1394.73 691.953 1387.77Z" />
                <path d="M828.615 1419.23C777.635 1412.4 679.838 1400.99 696.495 1410.04C713.152 1419.09 791.516 1419.94 828.615 1419.23Z" />
                <defs></defs>
              </svg>
            </Link>
          </div>
        </div>

        {/* 名稱顯示 暫放 */}
        <p>會員名稱:{memberName}</p>

        <div className="disf gap10">
          <p
            className="cartButton"
            onClick={() => {
              if (showCart) {
                setShowCart(false);
              } else {
                // (T/F) 切換 設定方式
                setShowChooseShop((v) => !v);
              }
            }}
          >
            購物車{cartTotal}
          </p>
          <p
            className="logCheck"
            onClick={
              authMember
                ? () => {
                    localStorage.removeItem('Member');
                    localStorage.removeItem('MemberName');
                    setMemberName('');
                    setAuthMember(!authMember);
                  }
                : () => {
                    navi('/MemberLogin ');
                    // setDisplayIndex(0);
                  }
            }
          >
            {authMember ? '登出' : '登入'}
          </p>
        </div>
      </nav>
      {toggle ? <Menu setToggle={setToggle} toggle={toggle} /> : <></>}
      {showChooseShop ? (
        <ChooseCart
          setShowCart={setShowCart}
          setShowChooseShop={setShowChooseShop}
        />
      ) : (
        <></>
      )}
      {showCart ? (
        <Cart setShowCart={setShowCart} setShowChooseShop={setShowChooseShop} />
      ) : (
        <></>
      )}
    </>
  );
}
export default MemberNav;
