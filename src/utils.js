const getAssetsFile = (url) => {
  // console.log('111',new URL(`./assets/site/${url}.png`, import.meta.url).href, url);
  return new URL(`./assets/${url}.png`, import.meta.url).href;
};

const timeFormat = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // const hour = date.getHours();
  // const minute = date.getMinutes();
  // const second = date.getSeconds();
  return `${year}-${month}-${day}`;
};

const jump = (data, router) => {
  const { metaInfo } = data;
  let params = {};
  let path = "";
  if (metaInfo.listStyle === 4) {
    path = "special";
    const groupid = data.metaInfo.specialDoc.groups[0].groupId;
    const { docId } = data;
    params = {
      groupid,
      docid: docId,
    };
  } else {
    path = "detail";
    params = {
      id: data.id,
    };
  }
  const herf = router.resolve({
    name: path,
    query: params,
  });
  window.open(herf.href, "_blank");
};

export default {
  getAssetsFile,
  timeFormat,
  jump,
};
