import DayPicker, { DayModifiers } from "react-day-picker";

interface ICalenderProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Calender: React.FC<ICalenderProps> = ({ date, setDate }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const modifiers = {
    saturday: { daysOfWeek: [6] },
    selected: date,
  };

  const modifiersStyles = {
    disabled: {
      color: "#E5E5E5",
    },

    saturday: {
      color: "#60a5fa",
    },
    selected: {
      color: "white",
      background: "#01BF1B",
    },
  };

  const handleDayClick = (day: Date, { disabled }: DayModifiers) => {
    if (disabled) return;

    setDate(day);
  };

  const MONTHS = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const WEEKDAYS_SHORT = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <DayPicker
      onDayClick={handleDayClick}
      selectedDays={date}
      disabledDays={[{ daysOfWeek: [0] }, { before: new Date() }]}
      months={MONTHS}
      fromMonth={new Date(year, month)}
      //toMonth={new Date(year, month + 1)}
      weekdaysShort={WEEKDAYS_SHORT}
      firstDayOfWeek={0}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
    />
  );
};

export default Calender;
