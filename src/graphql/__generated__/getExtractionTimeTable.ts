/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetTimeTableInput, TimeUnit, TimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: getExtractionTimeTable
// ====================================================

export interface getExtractionTimeTable_getExtractionTimeTable_result {
  __typename: "GetTimeTableResult";
  time: TimeUnit;
  timeType: TimeType;
}

export interface getExtractionTimeTable_getExtractionTimeTable {
  __typename: "GetTimeTableOutput";
  ok: boolean;
  error: string | null;
  result: getExtractionTimeTable_getExtractionTimeTable_result[] | null;
}

export interface getExtractionTimeTable {
  getExtractionTimeTable: getExtractionTimeTable_getExtractionTimeTable;
}

export interface getExtractionTimeTableVariables {
  input: GetTimeTableInput;
}
