export default async function getBoardContents() {
  return await fetch("http://183.107.5.160:8080/api", {
    method: "GET",
  }).then((data) => data.json());
}
