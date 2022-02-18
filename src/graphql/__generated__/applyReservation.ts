/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApplyReservationInput, TimeUnit, TreatmentType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: applyReservation
// ====================================================

export interface applyReservation_applyReservation_reservation {
  __typename: "UnhandledReservation";
  pnt_name: string;
  hp_no: string;
  date: string;
  time: TimeUnit;
  treatmentType: TreatmentType;
}

export interface applyReservation_applyReservation {
  __typename: "ApplyReservationOutput";
  ok: boolean;
  error: string | null;
  reservation: applyReservation_applyReservation_reservation | null;
}

export interface applyReservation {
  applyReservation: applyReservation_applyReservation;
}

export interface applyReservationVariables {
  input: ApplyReservationInput;
}
