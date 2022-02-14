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
          !isDisplayed ? "text-white " : "text-[#FFEE12]",
          "text-[1.3rem] flex items-center pt-1 font-light"
        )}
      >
        {text}
      </span>
    </div>
  );
};

export default AppointmentMenuItem;
