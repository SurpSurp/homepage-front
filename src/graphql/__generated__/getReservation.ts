/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetReservationInput, TreatmentType } from "./globalTypes";

// ====================================================
// GraphQL query operation: getReservation
// ====================================================

export interface getReservation_getReservation_reservation {
  __typename: "Reservation";
  treatmentType: TreatmentType;
}

export interface getReservation_getReservation {
  __typename: "GetReservationOutput";
  ok: boolean;
  error: string | null;
  reservation: getReservation_getReservation_reservation | null;
}

export interface getReservation {
  getReservation: getReservation_getReservation;
}

export interface getReservationVariables {
  input: GetReservationInput;
}
