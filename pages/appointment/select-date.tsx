import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import AppointmentBodyHeader from "../../components/appointment/body-header";
import AppointmentBodySubHeader from "../../components/appointment/body-item-header";
import Calender from "../../components/appointment/calender";
import AppointmentMenu from "../../components/appointment/menu";
import { treatmentTypeVar } from "../../libs/apolloClient";
import CalIcon from "../../public/images/appointment/cal-icon.png";
import TimeIcon from "../../public/images/appointment/time-icon.png";
import DateTimeNoti from "../../public/images/appointment/select-dateTime-notification.jpeg";
import Image from "next/image";
import {
  getExtractionTimeTable,
  getExtractionTimeTableVariables,
  getExtractionTimeTable_getExtractionTimeTable_result,
} from "../../src/graphql/__generated__/getExtractionTimeTable";
import {
  GET_EXTRACTION_TABLE,
  GET_N_EXTRACTION_TABLE,
} from "../../src/graphql/query";
import TimeItem from "../../components/appointment/time-item";
import { handleLocalTime } from "../../libs/util";
import {
  getNotExtractionTimeTable,
  getNotExtractionTimeTableVariables,
} from "../../src/graphql/__generated__/getNotExtractionTimeTable";
import { TreatmentType } from "../../src/graphql/__generated__/globalTypes";
import HandlePage from "../../components/appointment/handle-page";

const SelectDate = () => {
  const cachedTreatment = useReactiveVar(treatmentTypeVar);

  const addDays = (dateInput: Date, days: number) => {
    var result = new Date(dateInput);
    result.setDate(result.getDate() + days);
    return result;
  };

  const [date, setDate] = useState<Date>(
    new Date().getDay() === 0 ? addDays(new Date(), 1) : new Date()
  );

  const [tableResult, SetTableResult] = useState<
    getExtractionTimeTable_getExtractionTimeTable_result[] | null
  >(null);

  console.log(Boolean(tableResult));

  const EComplete = (data: getExtractionTimeTable) => {
    console.log("called");

    const {
      getExtractionTimeTable: { ok, result },
    } = data;

    if (ok) {
    }
    console.log(result);
    SetTableResult(result);
  };

  const NeComplete = (data: getNotExtractionTimeTable) => {
    console.log("called");

    const {
      getNotExtractionTimeTable: { ok, result },
    } = data;

    if (ok) {
    }

    SetTableResult(result);
  };

  const [getExtractionTable, { loading: ELoading }] = useLazyQuery<
    getExtractionTimeTable,
    getExtractionTimeTableVariables
  >(GET_EXTRACTION_TABLE, {
    onCompleted: EComplete,
  });

  const [getNExtractionTable, { loading: NeLoading }] = useLazyQuery<
    getNotExtractionTimeTable,
    getNotExtractionTimeTableVariables
  >(GET_N_EXTRACTION_TABLE, {
    onCompleted: NeComplete,
  });

  useEffect(() => {
    if (cachedTreatment == TreatmentType.Extraction) {
      getExtractionTable({
        variables: {
          input: {
            date: handleLocalTime(date.getTime()),
          },
        },
      });
    } else {
      getNExtractionTable({
        variables: {
          input: {
            date: handleLocalTime(date.getTime()),
          },
        },
      });
    }
  }, [cachedTreatment, date, getExtractionTable, getNExtractionTable]);

  return (
    <div className="px-4 py-[5.5rem] w-full">
      <AppointmentMenu currentSession={1} />
      <div className="bg-[#F2F2F2] px-7 py-7">
        <AppointmentBodyHeader
          text="날짜&시간 선택"
          subText="원하시는 날짜와 시간을 선택해주세요"
        />
        <div className="bg-white flex flex-col justify-between items-center w-full px-7 py-7 mt-6 h-[471px]">
          <div className="flex flex-col w-full space-y-1">
            <AppointmentBodySubHeader text="날짜 선택" icon={CalIcon} />
            <Calender date={date} setDate={setDate} />
          </div>
          <div className="flex w-full items-end justify-end text-gray-700 -mb-1">
            <div className="flex items-center mr-4">
              <div className="w-3.5 h-3.5 bg-[#01BF1B] mr-1.5" />
              <span className="pt-0.5 font-medium">선택</span>
            </div>
            <div className="flex items-center">
              <div className="w-3.5 h-3.5 bg-gray-100 border border-gray-300 mr-1.5" />
              <span className="pt-0.5 font-medium">불가</span>
            </div>
          </div>
        </div>

        <div className="bg-white px-7 py-7 mt-4 h-[471px] flex flex-col justify-between">
          <div>
            <AppointmentBodySubHeader text="시간 선택" icon={TimeIcon} />
            <div className="w-full grid grid-cols-3 pt-5 gap-3">
              {tableResult &&
                tableResult.map((timeunit, idx) => (
                  <TimeItem
                    key={idx}
                    time={timeunit.time}
                    timeType={timeunit.timeType}
                  />
                ))}
              {ELoading && (
                <div className="col-start-2 mt-36 text-xl font-medium text-gray-700">
                  Loading...
                </div>
              )}
              {NeLoading && (
                <div className="col-start-2 mt-36 text-xl font-medium text-gray-700">
                  Loading...
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full items-end justify-end text-gray-700 -mb-1">
            <div className="flex items-center mr-4">
              <div className="w-3.5 h-3.5 bg-[#52A0F8] mr-1.5" />
              <span className="pt-0.5 font-medium text-[#52A0F8]">원활</span>
            </div>
            <div className="flex items-center">
              <div className="w-3.5 h-3.5 bg-[#EC645F] mr-1.5" />
              <span className="pt-0.5 font-medium text-[#EC645F]">혼잡</span>
            </div>
          </div>
        </div>
        <div className="bg-white mt-4 h-[471px]">
          <Image
            src={DateTimeNoti}
            alt="date-time-notification"
            layout="responsive"
          />
        </div>
        <HandlePage prevRoute="select-treatment" nextRoute="select-treatment" />
      </div>
    </div>
  );
};

export default SelectDate;
