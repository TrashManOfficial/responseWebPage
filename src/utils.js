const getAssetsFile = (url) => {
  // console.log('111',new URL(`./assets/site/${url}.png`, import.meta.url).href, url);
  return new URL(`./assets/${url}.png`, import.meta.url).href;
};

export default {
  getAssetsFile,
};