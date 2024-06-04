export async function getItems() {
  const res = await fetch("http://localhost:3000/data/data.json");
  const data = await res.json();
  return data;
}
