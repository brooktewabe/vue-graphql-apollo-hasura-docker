import Vue from "vue";
import App from "./App.vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

const httpLink = new HttpLink({
  uri: "YOUR_HASURA_URL",
  headers: {
    "x-hasura-admin-secret": "YOUR_KEY",
    // 'x-hasura-access-key': 'YOUR_ACCESS_KEY'    // Alternatively, use this header if required
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  el: "#app",
  apolloProvider,
  render: (h) => h(App),
});
