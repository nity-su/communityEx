/**
 * @param {number} index 데이터 베이스 요청은 0 부터 시작함.
 *
 */
export default async function getBoardContents(index) {
  return await fetch(`${process.env.domain}/api?start=${index}`, {
    method: "GET",
  }).then((data) => data.json());
}
