import {
  TimeUnit,
  TreatmentType,
} from "../src/graphql/__generated__/globalTypes";

export const FormatPhone = (phone: string): string => {
  return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
};

export const FormatDate = (dateInput: string): string => {
  const year = parseInt(dateInput.slice(0, 4));
  const month = parseInt(dateInput.slice(5, 7));
  const date = parseInt(dateInput.slice(8, 10));
  const dayNumber = new Date(year, month - 1, date).getDay();
  let day: string;
  if (dayNumber === 0) {
    day = "일";
  } else if (dayNumber === 1) {
    day = "월";
  } else if (dayNumber === 2) {
    day = "화";
  } else if (dayNumber === 3) {
    day = "수";
  } else if (dayNumber === 4) {
    day = "목";
  } else if (dayNumber === 5) {
    day = "금";
  } else {
    day = "토";
  }

  return `${year}년 ${month}월 ${date}일(${day})`;
};

export const ConvertTreatmentToString = (
  treatmentType: TreatmentType
): string => {
  if (treatmentType === TreatmentType.Extraction) {
    return "사랑니 발치";
  } else if (treatmentType === TreatmentType.Dr) {
    return "발치부위 소독";
  } else {
    return "실밥 제거";
  }
};
export const ConvertTimeEnumToString = (timeunit: TimeUnit): string => {
  if (timeunit === TimeUnit.NineHalf) {
    return "9:30";
  } else if (timeunit === TimeUnit.Ten) {
    return "10:00";
  } else if (timeunit === TimeUnit.TenHalf) {
    return "10:30";
  } else if (timeunit === TimeUnit.Eleven) {
    return "11:00";
  } else if (timeunit === TimeUnit.ElevenHalf) {
    return "11:30";
  } else if (timeunit === TimeUnit.Twelve) {
    return "12:00";
  } else if (timeunit === TimeUnit.TwelveHalf) {
    return "12:30";
  } else if (timeunit === TimeUnit.One) {
    return "13:00";
  } else if (timeunit === TimeUnit.OneHalf) {
    return "13:30";
  } else if (timeunit === TimeUnit.Two) {
    return "14:00";
  } else if (timeunit === TimeUnit.TwoHalf) {
    return "14:30";
  } else if (timeunit === TimeUnit.Three) {
    return "15:00";
  } else if (timeunit === TimeUnit.ThreeHalf) {
    return "15:30";
  } else if (timeunit === TimeUnit.Four) {
    return "16:00";
  } else if (timeunit === TimeUnit.FourHalf) {
    return "16:30";
  } else if (timeunit === TimeUnit.Five) {
    return "17:00";
  } else if (timeunit === TimeUnit.FiveHalf) {
    return "17:30";
  } else if (timeunit === TimeUnit.Six) {
    return "18:00";
  } else {
    return "18:30";
  }
};

export const getTimeByCondition = (
  isHoliday: boolean,
  isExtraction: boolean,
  isSat: boolean
): TimeUnit[] => {
  let timeunits: TimeUnit[] = [];
  if (isHoliday) {
    return timeunits;
  }
  if (isSat) {
    Object.values(TimeUnit).forEach((timeunit) => {
      if (
        timeunit === TimeUnit.NineHalf ||
        timeunit === TimeUnit.Ten ||
        timeunit === TimeUnit.TenHalf ||
        timeunit === TimeUnit.Eleven ||
        timeunit === TimeUnit.ElevenHalf ||
        timeunit === TimeUnit.Twelve ||
        timeunit === TimeUnit.TwelveHalf ||
        timeunit === TimeUnit.One ||
        timeunit === TimeUnit.OneHalf
      ) {
        timeunits.push(timeunit);
      }
    });
  } else if (!isSat) {
    if (isExtraction) {
      Object.values(TimeUnit).forEach((timeunit) => {
        if (
          timeunit !== TimeUnit.NineHalf &&
          timeunit !== TimeUnit.Ten &&
          timeunit !== TimeUnit.TenHalf &&
          timeunit !== TimeUnit.Eleven &&
          timeunit !== TimeUnit.ElevenHalf &&
          timeunit !== TimeUnit.Twelve &&
          timeunit !== TimeUnit.TwelveHalf &&
          timeunit !== TimeUnit.One
        ) {
          timeunits.push(timeunit);
        }
      });
    } else if (!isExtraction) {
      Object.values(TimeUnit).forEach((timeunit) => {
        if (
          timeunit !== TimeUnit.Twelve &&
          timeunit !== TimeUnit.TwelveHalf &&
          timeunit !== TimeUnit.One
        ) {
          timeunits.push(timeunit);
        }
      });
    }
  }
  return timeunits;
};

export const handleLocalTime = (beforeChange: number): string => {
  const offset = new Date().getTimezoneOffset() * 60000;
  return new Date(beforeChange - offset).toISOString().slice(0, 10);
};

export const addDays = (dateInput: Date, days: number) => {
  var result = new Date(dateInput);
  result.setDate(result.getDate() + days);
  return result;
};

export const handleTailwind = (...classname: string[]) => {
  return classname.join(" ");
};
