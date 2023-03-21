export default async function getBoardContents() {
  return await fetch(`${process.env.domain}/api`, {
    method: "GET",
  }).then((data) => data.json());
}
