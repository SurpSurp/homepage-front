import { useReactiveVar } from "@apollo/client";
import React from "react";
import { timeVar } from "../../libs/apolloClient";
import { ConvertTimeEnumToString, handleTailwind } from "../../libs/util";
import {
  TimeType,
  TimeUnit,
} from "../../src/graphql/__generated__/globalTypes";

interface ITimeItemProps {
  time: TimeUnit;
  timeType: TimeType;
}

const TimeItem: React.FC<ITimeItemProps> = ({ time, timeType }) => {
  const cachedTime = useReactiveVar(timeVar);
  const onClick = () => {
    timeVar(time);
  };

  if (timeType == TimeType.Unbookable) {
    return (
      <button className="border-opacity-60 text-center text-white font-light bg-[#969696] pt-2 pb-1 pointer-events-none">
        예약불가
      </button>
    );
  }

  return (
    <button
      className={handleTailwind(
        "text-center pt-2 pb-1 transition-colors delay-[30ms]",
        time == cachedTime
          ? timeType == TimeType.HighComplexity
            ? "text-[#EC645F] border border-[#EC645F] bg-white font-medium"
            : "text-[#52A0F8] border border-[#52A0F8] bg-white font-medium"
          : timeType == TimeType.HighComplexity
          ? "bg-[#EC645F] text-white"
          : "bg-[#52A0F8] text-white"
      )}
      onClick={onClick}
    >
      {ConvertTimeEnumToString(time)}
    </button>
  );
};

export default TimeItem;
