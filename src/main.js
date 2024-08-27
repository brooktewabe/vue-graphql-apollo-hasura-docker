import Vue from "vue";
import App from "./App.vue";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

const httpLink = new HttpLink({
  uri: "https://nearby-barnacle-92.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "0N89apDMRhaTWQnVrP5yyarb5Dxa3TVpLBnWeSLB18bfQ7X4l5mg74Y5fKIyeOT7",
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
