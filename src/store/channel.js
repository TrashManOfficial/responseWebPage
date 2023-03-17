import { createStore } from "vuex";
import axiosReqres from "../axios";

const channelStore = createStore({
  state: {
    channelListRaw: {
      loading: false,
      data: [],
    },
    channelList: {
      loading: false,
      data: [],
    },
    currentChannelId: "",
    currentGroupId: "",
    currentDocId: "",
    articleList: {
      loading: false,
      data: [],
    },
    articleDetail: {},
    articleContent: {},
    featuresList: [],
    commentList: [],
    page: {
      current: 0,
      size: 20,
      keyword: "",
    },
    articleListOver: false,
    carouselList: [],
  },
  actions: {
    async getCommentList({ state, commit }, id) {
      const list = await axiosReqres(
        // `/fundapis/comment/api/comments/article/191165/exemption`,
        `/fundapis/comment/api/comments/article/${id}/exemption`,
        {
          baseURL: "",
        }
      );
      try {
        commit("COMMENT", list);
      } catch (err) {
        throw err;
      }
    },
    async searchArticleList({ state, commit }, text) {
      // state.page.current = 0;
      state.page.keyword = text;
      const articles = await axiosReqres("/articles", {
        params: {
          //区分不同web和客户端参数，固定
          visibility: 1,
          page: state.page.current,
          size: state.page.size,
          keyword: state.page.keyword,
        },
      });
      try {
        commit("CLEAR_ARTICLES");
        commit("ARTICLES", articles);
      } catch (err) {
        throw err;
      }
    },
    async searchArticleListAdd({ state, commit }) {
      // state.page.current = 0;
      // state.page.keyword = text;
      const articles = await axiosReqres("/articles", {
        params: {
          //区分不同web和客户端参数，固定
          visibility: 1,
          page: state.page.current,
          size: state.page.size,
          keyword: state.page.keyword,
        },
      });
      try {
        // commit("CLEAR_ARTICLES");
        commit("ARTICLES", articles);
      } catch (err) {
        throw err;
      }
    },
    async setCurrentDocId({ commit }, id) {
      try {
        commit("CURRENT_DOC_ID", id);
      } catch (err) {
        throw err;
      }
    },
    async setCurrentGroupId({ commit }, id) {
      try {
        commit("CURRENT_GROUP_ID", id);
        commit("CLEAR_ARTICLES");
      } catch (err) {
        throw err;
      }
    },
    async getSpecialList({ state, commit }, param) {
      // const data = await axiosReqres(`/articles/getSpecialGroupArticle`, {
      //   params: {
      //     docId: state.currentDocId,
      //     groupId: state.currentGroupId,
      //     visibility: 1,
      //     page: state.page.current,
      //     size: state.page.size,
      //   },
      // });
      const data = state.articleDetail.metaInfo.specialDoc.groups.find(
        (i) => i.groupId === state.currentGroupId
      ).docList;
      try {
        commit("SPECIAL_LIST", data);
      } catch (err) {
        throw err;
      }
    },
    async getArticleContent({ commit }, url) {
      const data = await axiosReqres(url);
      try {
        commit("ARTICLE_CONTENT", data);
      } catch (err) {
        throw err;
      }
    },
    async getArticleDetails({ commit }, id) {
      const data = await axiosReqres(`/getArticle/${id}`, {});
      try {
        commit("ARTICLE_DETAILS", data);
      } catch (err) {
        throw err;
      }
    },
    async getCarousel({ commit }, id) {
      const data = await axiosReqres("/articles/getRotationArticles", {
        params: {
          chnlId: id,
        },
      });
      try {
        commit("CAROUSEL", data);
      } catch (err) {
        throw err;
      }
    },
    async addPage({ commit }) {
      try {
        commit("ADD_PAGE");
      } catch (e) {
        throw e;
      }
    },
    async getChannel({ commit }) {
      const allChannel = await axiosReqres("/channels/getChildId", {
        params: {
          channelId: 348,
          size: 100,
        },
      });
      const addChannel = await axiosReqres("/channels/getChildId", {
        params: {
          channelId: 382,
          size: 100,
        },
      });
      const finalData = [...allChannel.data.data, ...addChannel.data.data];
      try {
        commit("CHANNEL", finalData);
      } catch (err) {
        throw err;
      }
    },
    async setCurrentId({ state, commit }, id) {
      state.page.keyword = "";
      try {
        commit("CURRENT_ID", id);
        commit("CLEAR_ARTICLES");
      } catch (err) {
        throw err;
      }
    },
    async getArticleList({ state, commit }, id) {
      const articles = await axiosReqres("/articles", {
        params: {
          chnlId: id || state.currentChannelId,
          //区分不同web和客户端参数，固定
          visibility: 1,
          page: state.page.current,
          size: id ? 10 : state.page.size,
          keyword: id ? '' : state.page.keyword,
        },
      });
      try {
        id ? commit("FEATURES", articles) : commit("ARTICLES", articles);
        // commit("ARTICLES", articles);
      } catch (err) {
        throw err;
      }
    },
    async exchangeItem({ commit }, params) {
      try {
        commit("EXCHANGE_ITEM", params);
      } catch (err) {
        throw err;
      }
    },
  },
  mutations: {
    COMMENT: (state, data) => {
      state.commentList = data.data.data;
    },
    CURRENT_DOC_ID: (state, id) => {
      state.currentDocId = id;
    },
    CURRENT_GROUP_ID: (state, id) => {
      state.currentGroupId = id;
    },
    // CLEAR_SPECIAL_ARTICLES: (state) => {
    //   state.articleList.data = [];
    //   state.page.current = 0;
    // },
    SPECIAL_LIST: (state, articles) => {
      // state.articleList.loading = false;
      // state.articleListOver = articles.data.data.length < 10 ? true : false;
      // state.articleList.data = [
      //   ...state.articleList.data,
      //   ...articles.data.data,
      // ];
      state.articleList.data = articles.map((i) => {
        return {
          ...i,
          metaInfo: {
            ...i,
          },
        };
      });
    },
    ARTICLE_CONTENT: (state, data) => {
      state.articleContent = data;
    },
    ARTICLE_DETAILS: (state, data) => {
      state.articleDetail = data.data.data;
    },
    CAROUSEL: (state, carousel) => {
      state.carouselList = carousel.data.data;
    },
    CHANNEL: (state, channel) => {
      state.channelListRaw.data = [...channel];
      const filterData = channel.filter(
        (i) => i.defaultPosition === 1 || i.defaultPosition === 2
      );
      state.channelList.loading = false;
      state.channelList.data = state.currentChannelId
        ? state.channelList.data
        : filterData;
      if (state.channelList.data.length) {
        state.currentChannelId =
          state.currentChannelId || state.channelList.data[0].id;
      }
    },
    CURRENT_ID: (state, id) => {
      state.currentChannelId = id;
    },
    ARTICLES: (state, articles) => {
      state.articleList.loading = false;
      state.articleListOver = articles.data.data.length < 10 ? true : false;
      state.articleList.data = [
        ...state.articleList.data,
        ...articles.data.data,
      ];
    },
    CLEAR_ARTICLES: (state) => {
      state.articleList.data = [];
      state.page.current = 0;
    },
    ADD_PAGE: (state) => {
      state.page.current += 1;
    },
    FEATURES: (state, articles) => {
      state.featuresList = articles.data.data;
    },
    EXCHANGE_ITEM: (state, params) => {
      const { index, data } = params;
      const dataIndex = state.channelList.data.findIndex(
        (i) => i.id === data.id
      );
      const temp = state.channelList.data[index - 1];
      state.channelList.data[index - 1] = state.channelList.data[dataIndex];
      state.channelList.data[dataIndex] = temp;
      state.channelList.data = [...state.channelList.data];
    },
  },
});

export default channelStore;
