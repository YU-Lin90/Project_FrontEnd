import { useState } from 'react';
import './Evaluation.css';
import { useFunc } from '../../Context/FunctionProvider';
import { useEffect } from 'react';
function StoreEvaluation({ shopSid = 89 }) {
  const { notLoginGetFetch } = useFunc();
  const [allData, setAllData] = useState([]);
  const [firstColumn, setFirstColumn] = useState([]);
  const [secondColumn, setSecondColumn] = useState([]);
  const [thirdColumn, setThirdColumn] = useState([]);
  const [pageNow, setPageNow] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  //獲得總頁數
  const getTotalPages = async () => {
    const res = await notLoginGetFetch(
      `GetStoreEvas/getEvaTotalPages?shopSid=${shopSid}`
    );
    console.log(res);
    setTotalPage(res);
  };
  //獲得評價內容
  const getEva = async () => {
    const res = await notLoginGetFetch(
      `GetStoreEvas/getAllList/?shopSid=${shopSid}&getPage=${pageNow}`
    );
    console.log(res);
    setAllData(res);
  };
  useEffect(() => {
    if (totalPage !== 0) {
      getEva();
    } else if (totalPage === 0) {
      getTotalPages();
    }
  }, [totalPage, pageNow]);
  return (
    <>
      <div>
        <p className="ta-c fs36 fw6 padH20 padV20">店家評價</p>
        <div className="storeEvaluationOuter">
          <div className="w33p padH10 padV10 disf fd-c jc-c ai-c">1</div>
          <div className="w33p padH10 padV10 disf fd-c jc-c ai-c">2</div>
          <div className="w33p padH10 padV10 disf fd-c jc-c ai-c">3</div>
        </div>
      </div>
    </>
  );
}
export default StoreEvaluation;
