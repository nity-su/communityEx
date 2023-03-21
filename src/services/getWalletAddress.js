export default async function getWalletAddress() {
  if (window.ethereum) {
    return await window.ethereum.request({ method: "eth_requestAccounts" });
  } else {
    return null;
  }
}
