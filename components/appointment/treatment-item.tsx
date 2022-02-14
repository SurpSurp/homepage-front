import { useReactiveVar } from "@apollo/client";
import Image from "next/image";
import { treatmentTypeVar } from "../../libs/apolloClient";
import { ConvertTreatmentToString, handleTailwind } from "../../libs/util";
import { TreatmentType } from "../../src/graphql/__generated__/globalTypes";

interface ITreatmentItemProps {
  img: StaticImageData;
  treatmentType: TreatmentType;
}

const TreatmentItem: React.FC<ITreatmentItemProps> = ({
  img,
  treatmentType,
}) => {
  const cacheTreatment = useReactiveVar(treatmentTypeVar);

  const handleOnClick = () => {
    treatmentTypeVar(treatmentType);
  };

  return (
    <button
      className={handleTailwind(
        cacheTreatment == treatmentType
          ? "border-2 border-[#0179CB] border-opacity-70 focus:outline-none"
          : "",
        "bg-white w-full flex items-center pl-6 py-[1.9rem]"
      )}
      onClick={handleOnClick}
    >
      <div className="border-r border-gray-400 w-2/5 border-opacity-50 pr-5">
        <Image src={img} alt={treatmentType.toString()} layout="responsive" />
      </div>
      <div className={`mx-auto  text-[1.7rem] font-bold pt-1 text-[#767676]`}>
        {treatmentType === TreatmentType.Dr ? (
          <span>
            발치부위 <br />
            소독
          </span>
        ) : (
          ConvertTreatmentToString(treatmentType)
        )}
      </div>
    </button>
  );
};

export default TreatmentItem;
