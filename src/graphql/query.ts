import { gql } from "@apollo/client";

export const GET_EXTRACTION_TABLE = gql`
  query getExtractionTimeTable($input: GetTimeTableInput!) {
    getExtractionTimeTable(input: $input) {
      ok
      error
      result {
        time
        timeType
      }
    }
  }
`;

export const GET_N_EXTRACTION_TABLE = gql`
  query getNotExtractionTimeTable($input: GetTimeTableInput!) {
    getNotExtractionTimeTable(input: $input) {
      ok
      error
      result {
        time
        timeType
      }
    }
  }
`;

export const GET_RESERVATION = gql`
  query getReservation($input: GetReservationInput!) {
    getReservation(input: $input) {
      ok
      error
      reservation {
        treatmentType
      }
    }
  }
`;
