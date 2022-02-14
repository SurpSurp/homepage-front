interface IAppointmentBodyHeaderProps {
  text: string;
  subText: string;
}

const AppointmentBodyHeader: React.FC<IAppointmentBodyHeaderProps> = ({
  text,
  subText,
}) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col space-y-0.5">
        <div className="flex items-center">
          <span className="text-lg font-light text-gray-600 mr-1 flex items-center">
            |
          </span>
          <span className="text-[1.3rem] font-bold text-header-black mr-2">
            {text}
          </span>
        </div>
        <span className="flex items-end text-header-black mr-3 text-sm">
          {subText}
        </span>
      </div>
    </div>
  );
};

export default AppointmentBodyHeader;
