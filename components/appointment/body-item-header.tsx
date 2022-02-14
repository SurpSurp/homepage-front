import Image from "next/image";

interface IAppointmentBodySubHeaderProps {
  icon?: StaticImageData;
  text: string;
}

const AppointmentBodySubHeader: React.FC<IAppointmentBodySubHeaderProps> = ({
  text,
  icon,
}) => {
  return (
    <div className="flex border-b border-gray-300 pb-3.5 text-[1.5rem] font-medium text-opacity-95  text-[#767676]">
      {icon && (
        <div className="w-7 h-7 mr-2">
          <Image src={icon} alt="icon" layout="responsive" />
        </div>
      )}
      {text}
    </div>
  );
};

export default AppointmentBodySubHeader;
