/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetTimeTableInput, TimeUnit, TimeType } from "./globalTypes";

// ====================================================
// GraphQL query operation: getNotExtractionTimeTable
// ====================================================

export interface getNotExtractionTimeTable_getNotExtractionTimeTable_result {
  __typename: "GetTimeTableResult";
  time: TimeUnit;
  timeType: TimeType;
}

export interface getNotExtractionTimeTable_getNotExtractionTimeTable {
  __typename: "GetTimeTableOutput";
  ok: boolean;
  error: string | null;
  result: getNotExtractionTimeTable_getNotExtractionTimeTable_result[] | null;
}

export interface getNotExtractionTimeTable {
  getNotExtractionTimeTable: getNotExtractionTimeTable_getNotExtractionTimeTable;
}

export interface getNotExtractionTimeTableVariables {
  input: GetTimeTableInput;
}
