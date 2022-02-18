import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import AppointmentBodyHeader from "../../components/appointment/body-header";
import AppointmentBodySubHeader from "../../components/appointment/body-item-header";
import Calender from "../../components/appointment/calender";
import AppointmentMenu from "../../components/appointment/menu";
import { dateVar, timeVar, treatmentTypeVar } from "../../libs/apolloClient";
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
import { addDays, handleLocalTime } from "../../libs/util";
import {
  getNotExtractionTimeTable,
  getNotExtractionTimeTableVariables,
} from "../../src/graphql/__generated__/getNotExtractionTimeTable";
import { TreatmentType } from "../../src/graphql/__generated__/globalTypes";
import PrevBtn from "../../public/images/appointment/prev-btn.png";
import NextBtn from "../../public/images/appointment/next-btn.png";
import { useRouter } from "next/router";

const SelectDate = () => {
  const router = useRouter();
  const cachedTreatment = useReactiveVar(treatmentTypeVar);
  const cachedDate = useReactiveVar(dateVar);
  const cachedTime = useReactiveVar(timeVar);

  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);

  const [canScroll, setCanScroll] = useState(false);

  const [date, setDate] = useState<Date>(
    cachedDate
      ? new Date(cachedDate)
      : new Date().getDay() === 0
      ? addDays(new Date(), 1)
      : new Date()
  );

  const onClick = (event: any) => {
    const {
      target: { id },
    } = event;

    if (id == "prev") {
      alert("진료 날짜와 시간을 선택하신 경우 초기화됩니다.");
      dateVar("");
      timeVar(null);
      router.replace("/appointment/select-treatment");
      return;
    }

    if (!cachedDate) {
      alert("진료 날짜를 선택해주세요.");
      return;
    }
    if (!cachedTime) {
      alert("진료 시간을 선택해주세요.");
      return;
    }

    router.replace("/appointment/patient-info");
  };

  const [tableResult, SetTableResult] = useState<
    getExtractionTimeTable_getExtractionTimeTable_result[] | null
  >(null);

  const EComplete = (data: getExtractionTimeTable) => {
    const {
      getExtractionTimeTable: { ok, result },
    } = data;

    if (ok) {
      SetTableResult(result);
    }
  };

  const NeComplete = (data: getNotExtractionTimeTable) => {
    const {
      getNotExtractionTimeTable: { ok, result },
    } = data;

    if (ok) {
      SetTableResult(result);
    }
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
    dateVar(handleLocalTime(date.getTime()));
  }, [cachedTreatment, date, getExtractionTable, getNExtractionTable]);

  useEffect(() => {
    if (!cachedTreatment) {
      router.replace("/appointment/select-treatment");
    }
  }, []);

  useEffect(() => {
    firstRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!canScroll) {
      setCanScroll(true);
      return;
    }

    secondRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [date]);

  useEffect(() => {
    if (!cachedTime) return;

    thirdRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, [cachedTime]);

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

        <div
          className="bg-white px-7 py-7 mt-4 h-[471px] flex flex-col justify-between"
          ref={secondRef}
        >
          <div>
            <div />
            <AppointmentBodySubHeader text="시간 선택" icon={TimeIcon} />
            <div ref={firstRef} />
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
        <div className="bg-white mt-4 ">
          <Image
            src={DateTimeNoti}
            alt="date-time-notification"
            layout="responsive"
          />
        </div>
        <div className="flex w-full justify-between mt-12" ref={thirdRef}>
          <button className="w-20 h-20" onClick={onClick}>
            <Image id="prev" src={PrevBtn} alt="prev-btn" layout="responsive" />
          </button>
          <button className="w-20 h-20" onClick={onClick}>
            <Image id="next" src={NextBtn} alt="next-btn" layout="responsive" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDate;
