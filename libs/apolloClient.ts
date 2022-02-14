import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import {
  TimeUnit,
  TreatmentType,
} from "../src/graphql/__generated__/globalTypes";

export const nameVar = makeVar("");
export const phoneVar = makeVar("");
export const treatmentTypeVar = makeVar<null | TreatmentType>(null);
export const dateVar = makeVar("");
export const timeVar = makeVar<null | TimeUnit>(null);
export const requestedTextVar = makeVar("");

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Reservation: {
        fields: {
          name: {
            read() {
              return nameVar();
            },
          },
          phone: {
            read() {
              return phoneVar();
            },
          },
          treatmentType: {
            read() {
              return treatmentTypeVar();
            },
          },
          date: {
            read() {
              return dateVar();
            },
          },
          time: {
            read() {
              return timeVar();
            },
          },

          requestedText: {
            read() {
              return requestedTextVar();
            },
          },
        },
      },
    },
  }),
});

export default client;
