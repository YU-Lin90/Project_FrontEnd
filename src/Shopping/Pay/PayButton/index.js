import { usePay } from '../../../Context/PayPageContext';
//payWay 0現金 1LINEPAY
function PayButton() {
  const { payWay } = usePay();
  return (
    <>
      <div
        onClick={() => {
          console.log(payWay);
        }}
        className="as-e payPageButton"
      >
        確認
      </div>
    </>
  );
}
export default PayButton;
