import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import AppointmentBodyHeader from "../../components/appointment/body-header";
import AppointmentMenu from "../../components/appointment/menu";
import {
  dateVar,
  nameVar,
  phoneVar,
  timeVar,
  treatmentTypeVar,
} from "../../libs/apolloClient";
import {
  ConvertTimeEnumToString,
  ConvertTreatmentToString,
  FormatDate,
  FormatPhone,
} from "../../libs/util";
import checkOk from "../../public/images/appointment/check-ok.png";

const CheckAppointment: NextPage = () => {
  const router = useRouter();
  const cachedTreatment = useReactiveVar(treatmentTypeVar);
  const cachedName = useReactiveVar(nameVar);
  const cachedPhone = useReactiveVar(phoneVar);
  const cachedTime = useReactiveVar(timeVar);
  const cachedDate = useReactiveVar(dateVar);

  const firstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !cachedTreatment ||
      !cachedDate ||
      !cachedTime ||
      !cachedName ||
      !cachedPhone
    ) {
      router.replace("/appointment/select-treatment");
    }
  }, [
    cachedTreatment,
    cachedDate,
    cachedTime,
    cachedName,
    cachedPhone,
    router,
  ]);

  useEffect(() => {
    firstRef.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="px-4 py-[5.5rem] w-full">
      <AppointmentMenu currentSession={3} />
      <div className="bg-[#F2F2F2] px-7 py-7" ref={firstRef}>
        <AppointmentBodyHeader
          text="예약 확인"
          subText="완료된 예약을 확인해주세요"
        />

        <div className="h-[471px] bg-white flex flex-col items-center justify-center mt-6">
          <div className="w-20 h-20 mb-5">
            <Image src={checkOk} alt="ok-logo" layout="responsive" />
          </div>

          <div className="text-lg mb-8 font-medium text-center">
            <span className="text-[#007BCC] text-[1.2rem] font-semibold">
              {cachedName}
            </span>
            님,
            <br /> 예약이 완료되었습니다
            <span className="italic">!</span>
          </div>
          <div className="flex flex-col text-lg opacity-70 space-y-0.5">
            <span className="text-center">
              {cachedTreatment && ConvertTreatmentToString(cachedTreatment)}
            </span>
            <div className="text-center">
              <span className="mr-1.5">{FormatDate(cachedDate)}</span>
              {cachedTime && ConvertTimeEnumToString(cachedTime)}
            </div>
            <span className="text-center">{FormatPhone(cachedPhone)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckAppointment;
