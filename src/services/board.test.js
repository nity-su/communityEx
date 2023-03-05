import "isomorphic-fetch";
test("board fetch test", async () => {
  await fetch("http://183.107.5.160:8080/api", {
    method: "GET",
  })
    .then((data) => data.json())
    .then(console.log)
    .catch(console.log);

  //   console.log(result);
  //   expect(result).toBeUndefined(false);
});
