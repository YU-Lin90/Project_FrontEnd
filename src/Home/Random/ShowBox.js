import { useEffect } from 'react';

function ShowBox({ radomArrays, cutAmount }) {
  //radomArrays[0]
  useEffect(() => {});
  return (
    <div>
      <p>{cutAmount !== 0 ? <>折價金額:{cutAmount}</> : null}</p>
    </div>
  );
}
export default ShowBox;
