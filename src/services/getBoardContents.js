export default async function getBoardContents(index) {
  return await fetch(`http://183.107.5.134:8080/api?start=${index}`, {
    method: "GET",
  }).then((data) => data.json());
}
