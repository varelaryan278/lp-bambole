export const loadGoogleFont = async (family: string, text: string) => {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
  ).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Fonte não encontrada: ${family}`);
  return fetch(url).then((res) => res.arrayBuffer());
};
