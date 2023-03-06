import { createStore } from "vuex";
import axiosReqres from "../axios";

const channelStore = createStore({
  state: {
    channelList: {
      loading: false,
      data: [],
    },
    currentChannelId: "",
    articleList: {
      loading: false,
      data: [],
    },
    featuresList: [],
    page: {
      current: 0,
      size: 10,
    },
    articleListOver: false,
    carouselList:[],
  },
  actions: {
    async getCarousel({ commit },id) {
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
      const allChannel = await axiosReqres("/channels", {
        params: {
          channelId: 350,
        },
      });
      try {
        commit("CHANNEL", allChannel);
      } catch (err) {
        throw err;
      }
    },
    async setCurrentId({ commit }, id) {
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
          size: state.page.size,
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
    CAROUSEL: (state, carousel) => {
      state.carouselList = carousel.data.data;
    },
    CHANNEL: (state, channel) => {
      state.channelList.loading = false;
      state.channelList.data = channel.data.data;
      if (state.channelList.data.length) {
        state.currentChannelId = state.channelList.data[0].id;
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
      state.carouselList = [];
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
