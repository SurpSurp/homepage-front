import { gql } from "@apollo/client";

export const APPLY_APPOINTMENT = gql`
  mutation applyReservation($input: ApplyReservationInput!) {
    applyReservation(input: $input) {
      ok
      error
      reservation {
        pnt_name
        hp_no
        date
        time
        treatmentType
      }
    }
  }
`;
