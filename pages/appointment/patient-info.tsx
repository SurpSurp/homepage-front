import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AppointmentBodyHeader from "../../components/appointment/body-header";
import AppointmentBodySubHeader from "../../components/appointment/body-item-header";
import AppointmentMenu from "../../components/appointment/menu";
import PrivacyHandling from "../../components/appointment/privacy-handling";
import useIcon from "../../public/images/appointment/user-icon.png";
import PrevBtn from "../../public/images/appointment/prev-btn.png";
import NextBtn from "../../public/images/appointment/next-btn.png";
import { useMutation, useReactiveVar } from "@apollo/client";
import {
  dateVar,
  nameVar,
  phoneVar,
  requestedTextVar,
  timeVar,
  treatmentTypeVar,
} from "../../libs/apolloClient";
import { useRouter } from "next/router";
import { APPLY_APPOINTMENT } from "../../src/graphql/mutation";
import {
  applyReservation,
  applyReservationVariables,
} from "../../src/graphql/__generated__/applyReservation";
import { Cancel } from "../../src/graphql/__generated__/globalTypes";

const PatientInfo = () => {
  const router = useRouter();
  const cachedTreatment = useReactiveVar(treatmentTypeVar);
  const cachedDate = useReactiveVar(dateVar);
  const cachedTime = useReactiveVar(timeVar);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [request, setRequest] = useState<string>("");

  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const onChange = (event: any) => {
    const {
      target: { name, value },
    } = event;
    if (name == "name") setName(value);
    else if (name == "phone") setPhone(value);
    else setRequest(value);
  };

  const onCompleted = (data: applyReservation) => {
    const {
      applyReservation: { ok, reservation },
    } = data;
    if (ok) {
      nameVar(reservation?.pnt_name);
      phoneVar(reservation?.hp_no);

      router.replace("/appointment/check-appointment");
    }
  };

  const [applyReservation] = useMutation<
    applyReservation,
    applyReservationVariables
  >(APPLY_APPOINTMENT, {
    onCompleted,
  });

  const onClick = (event: any) => {
    const {
      target: { id },
    } = event;

    if (id == "prev") {
      alert("입력하신 정보는 유실됩니다.");
      nameVar("");
      phoneVar("");
      requestedTextVar("");
      router.push("/appointment/select-date");
      return;
    }

    if (!isAgreed) {
      alert("개인정보 수집 및 제공에 동의해주세요.");
      return;
    }

    if (!name || !phone) {
      alert("필수 예약자 정보를 입력헤주세요.");
      return;
    }

    if (cachedTreatment && cachedDate && cachedTime) {
      applyReservation({
        variables: {
          input: {
            pnt_name: name,
            hp_no: phone,
            treatmentType: cachedTreatment,
            date: cachedDate,
            time: cachedTime,
            requestedTerm: request,
            cancel: Cancel.Default,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!cachedTreatment || !cachedDate || !cachedTime) {
      router.replace("/appointment/select-treatment");
    }
    firstRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (!isAgreed) return;

    secondRef.current?.scrollIntoView({
      block: "end",
      behavior: "smooth",
    });
  }, [isAgreed]);

  return (
    <div className="px-4 py-[5.5rem] w-full">
      <AppointmentMenu currentSession={2} />
      <div className="bg-[#F2F2F2] px-7 py-7">
        <AppointmentBodyHeader
          text="예약자 정보 입력"
          subText="예약에 필요한 정보를 입력해주세요"
        />
        <div className="bg-white flex flex-col justify-between items-center w-full px-7 py-7 mt-6 h-[471px]">
          <AppointmentBodySubHeader text="개인정보 수집 및 제공" />
          <PrivacyHandling />
          <div className="w-full flex justify-end mt-5">
            <div className="mr-3 flex items-center">
              <button
                className={`${
                  isAgreed ? "bg-white" : "bg-black"
                } w-5 h-5  border border-reservation-main-font mr-1`}
                onClick={() => setIsAgreed(false)}
              />
              <span className="text-lg pt-1">비동의</span>
            </div>
            <div className="flex items-center">
              <button
                className={`${
                  isAgreed ? "bg-black" : "bg-white"
                } w-5 h-5  border border-reservation-main-font mr-1`}
                onClick={() => setIsAgreed(true)}
              />
              <span className="text-lg pt-1">동의</span>
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col items-center w-full px-7 py-7 mt-6 h-[471px]">
          <AppointmentBodySubHeader text="예약자 정보" icon={useIcon} />
          <div ref={firstRef} />
          <form className="w-full mt-5 space-y-5">
            <div className="relative space-y-0.5">
              <label htmlFor="name-input" className="text-gray-600 font-medium">
                예약자
              </label>
              <input
                type="text"
                name="name"
                id="name-input"
                placeholder="성함을 적어주세요."
                className="w-full border border-[#B3B3B3] focus:outline-none px-2 py-1.5 text-sm"
                value={name}
                onChange={onChange}
                required
              />
              <span className="absolute right-0 bottom-0 pb-1.5 pr-2.5 text-sm text-red-400 font-medium">
                필수
              </span>
            </div>

            <div className="relative space-y-0.5">
              <label
                htmlFor="phone-input"
                className="text-gray-600 font-medium"
              >
                연락처
              </label>
              <input
                type="tel"
                name="phone"
                id="phone-input"
                placeholder="연락 가능한 번호를 적어주세요."
                className="w-full border border-[#B3B3B3] focus:outline-none px-2 py-1.5 text-sm"
                value={phone}
                onChange={onChange}
                required
              />
              <span className="absolute right-0 bottom-0 pb-1.5 pr-2.5 text-sm text-red-400 font-medium">
                필수
              </span>
            </div>
            <div className="relative space-y-0.5">
              <label
                htmlFor="request-input"
                className="text-gray-600 font-medium"
              >
                요청사항
              </label>
              <textarea
                name="request"
                id="request-input"
                placeholder="요청하실 내용을 적어주세요."
                rows={7}
                className="w-full border border-[#B3B3B3] focus:outline-none px-2.5 py-1.5 text-sm"
                value={request}
                onChange={onChange}
              ></textarea>
            </div>
          </form>
        </div>
        <div className="flex w-full justify-between mt-12" ref={secondRef}>
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

export default PatientInfo;
