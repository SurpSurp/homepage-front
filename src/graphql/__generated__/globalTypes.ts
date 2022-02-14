/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum TimeType {
  Bookable = "Bookable",
  HighComplexity = "HighComplexity",
  LowComplexity = "LowComplexity",
  Unbookable = "Unbookable",
}

export enum TimeUnit {
  Eleven = "Eleven",
  ElevenHalf = "ElevenHalf",
  Five = "Five",
  FiveHalf = "FiveHalf",
  Four = "Four",
  FourHalf = "FourHalf",
  NineHalf = "NineHalf",
  One = "One",
  OneHalf = "OneHalf",
  Six = "Six",
  SixHalf = "SixHalf",
  Ten = "Ten",
  TenHalf = "TenHalf",
  Three = "Three",
  ThreeHalf = "ThreeHalf",
  Twelve = "Twelve",
  TwelveHalf = "TwelveHalf",
  Two = "Two",
  TwoHalf = "TwoHalf",
}

export enum TreatmentType {
  Dr = "Dr",
  Extraction = "Extraction",
  So = "So",
}

export interface GetReservationInput {
  hp_no: string;
}

export interface GetTimeTableInput {
  date: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
