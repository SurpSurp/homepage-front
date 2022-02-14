import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import AppointmentBodyHeader from "../../components/appointment/body-header";
import AppointmentMenu from "../../components/appointment/menu";
import TreatmentItem from "../../components/appointment/treatment-item";
import { treatmentTypeVar } from "../../libs/apolloClient";
import { TreatmentType } from "../../src/graphql/__generated__/globalTypes";
import ExtractionImg from "../../public/images/appointment/select-extraction.png";
import DrImg from "../../public/images/appointment/select-dr.png";
import SoImg from "../../public/images/appointment/select-so.png";
import HandlePage from "../../components/appointment/handle-page";

const SelectTreatment: NextPage = () => {
  const cacheTreatment = useReactiveVar(treatmentTypeVar);

  return (
    <div className="px-4 py-[5.5rem] w-full">
      <AppointmentMenu currentSession={0} />
      <div className="bg-[#F2F2F2] px-7 py-7">
        <div className="flex w-full justify-between">
          <AppointmentBodyHeader
            text="진료 과목 선택"
            subText="원하시는 진료 과목을 선택해주세요."
          />
          <div className="text-[#FF5200] flex mb-4 -ml-14 font-medium">
            ※ 필수
          </div>
        </div>
        <div className="mt-6 space-y-1">
          <TreatmentItem
            img={ExtractionImg}
            treatmentType={TreatmentType.Extraction}
          />
          <TreatmentItem img={DrImg} treatmentType={TreatmentType.Dr} />
          <TreatmentItem img={SoImg} treatmentType={TreatmentType.So} />
        </div>
        <HandlePage nextRoute="select-date" />
      </div>
    </div>
  );
};

export default SelectTreatment;
