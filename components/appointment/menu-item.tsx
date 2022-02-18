import { handleTailwind } from "../../libs/util";

interface IAppointmentMenuItemProps {
  id: number;
  text: string;
  isDisplayed: boolean;
}

const AppointmentMenuItem: React.FC<IAppointmentMenuItemProps> = ({
  id,
  text,
  isDisplayed,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div
          className={handleTailwind(
            !isDisplayed
              ? "border-white text-white"
              : "border-[#FFEE12] text-[#FFEE12]",
            "border-[1.5px] w-[1.3rem] h-[1.3rem] rounded-full flex justify-center items-center pt-[2px]"
          )}
        >
          <span>{id}</span>
        </div>
        <span
          className={handleTailwind(
            !isDisplayed ? "text-white " : "text-[#FFEE12] font-medium",
            "text-[1.3rem] flex items-center pt-1 "
          )}
        >
          {text}
        </span>
      </div>
      {isDisplayed && (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default AppointmentMenuItem;
