import Image from "next/image";
import { useState } from "react";
import AppointmentBodyHeader from "../../components/appointment/body-header";
import AppointmentBodySubHeader from "../../components/appointment/body-item-header";
import AppointmentMenu from "../../components/appointment/menu";
import PatientInput from "../../components/appointment/patient-input";
import PrivacyHandling from "../../components/appointment/privacy-handling";
import useIcon from "../../public/images/appointment/user-icon.png";
import PrevBtn from "../../public/images/appointment/prev-btn.png";
import NextBtn from "../../public/images/appointment/next-btn.png";
import { useReactiveVar } from "@apollo/client";
import { nameVar, phoneVar } from "../../libs/apolloClient";

const PatientInfo = () => {
  const cachedName = useReactiveVar(nameVar);
  const cachedPhone = useReactiveVar(phoneVar);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const onClick = (event: any) => {
    const {
      target: { id },
    } = event;

    if (id == "prev") {
    }

    if (!isAgreed) {
      alert("개인정보 수집 및 제공에 동의해주세요.");
      return;
    }
  };

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
          <form className="w-full mt-5 space-y-5">
            <PatientInput
              text="예약자"
              inputFor="name"
              type="text"
              placeholder="성함을 적어주세요."
            />
            {/* input type tel 포맷 서칭 후 적용 */}
            <PatientInput
              text="연락처"
              inputFor="phone"
              type="tel"
              placeholder="연락 가능한 번호를 적어주세요."
            />
            <PatientInput
              text="요청사항"
              inputFor="request"
              type="textarea"
              placeholder="요청하실 내용을 적어주세요."
            />
          </form>
        </div>
        <div className="flex w-full justify-between mt-12">
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
