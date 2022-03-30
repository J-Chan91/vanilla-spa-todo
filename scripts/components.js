const fetchData = async (url) => {
  return await (await fetch(url)).json();
};

export const LandingPage = async () => {
  const [result] = await fetchData("../data/all.json");

  return result.content;
};
