import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BASE_URL } from "./constants";

export const client = new ApolloClient({
    uri: `${BASE_URL}/items/songs`,
    cache: new InMemoryCache(),
});