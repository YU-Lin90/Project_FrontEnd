//店家評價 瀑布流 完成
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
  const [startLoad, setStartLoad] = useState(true);
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
    /*{
    "name": "陳資展",
    "sid": 6,
    "order_sid": 26,
    "member_sid": 1,
    "evaluation_score": 3,
    "evaluation_content": "餐點有點太鹹了",
    "evaluation_time": "2022/12/08 13:24:47"
    } */
    const arrays = [[...firstColumn], [...secondColumn], [...thirdColumn]];
    res.forEach((v, i) => {
      const cols = i % 3;
      arrays[cols].push(v);
    });
    setFirstColumn(arrays[0]);
    setSecondColumn(arrays[1]);
    setThirdColumn(arrays[2]);
    setAllData(res);
    setStartLoad(false);
    // setFirstColumn(Array(pageNow).fill(1));
    // setPageNow((v) => v + 1);
  };
  //滾動偵測
  const handleScroll = () => {
    //視窗高
    const screenHeight = window.innerHeight;
    //現在滾到哪
    const scrollNow = window.scrollY;
    //文件全高
    const bodyHeight = parseInt(
      window
        .getComputedStyle(document.querySelector('body'))
        .getPropertyValue('height')
    );
    console.log({ screenHeight, scrollNow, bodyHeight });
    //
    const scrollTop = scrollNow + screenHeight;
    if (
      bodyHeight > screenHeight &&
      scrollTop > bodyHeight - 100 &&
      !startLoad &&
      pageNow <= totalPage
    ) {
      console.log(123);
      setStartLoad(true);
      setPageNow((v) => v + 1);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startLoad]);
  //頁數增加的時候反應
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
          <div className="w33p padH10 padV10 disf fd-c jc-c ai-c">
            {firstColumn.map((v, i) => {
              return (
                <div className="w100p h200 bgcMain" key={i}>
                  {v.sid}
                  {v.evaluation_content}
                </div>
              );
            })}
          </div>
          <div className="w33p padH10 padV10 disf fd-c jc-c ai-c">
            {secondColumn.map((v, i) => {
              return (
                <div className="w100p h200 bgcMain" key={i}>
                  {v.sid}
                  {v.evaluation_content}
                </div>
              );
            })}
          </div>
          <div className="w33p padH10 padV10 disf fd-c jc-c ai-c">
            {thirdColumn.map((v, i) => {
              return (
                <div className="w100p h200 bgcMain" key={i}>
                  {v.sid}
                  {v.evaluation_content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default StoreEvaluation;
