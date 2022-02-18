import AppointmentMenuItem from "./menu-item";

interface IReservationMenuProps {
  currentSession: number;
}

const AppointmentMenu: React.FC<IReservationMenuProps> = ({
  currentSession,
}) => {
  return (
    <div className="mb-6 bg-[#027ACC] py-7 px-7">
      <div className="flex flex-col">
        <span className="text-white text-lg font-light text-center">
          잎사귀치과병원
        </span>
        <span className="text-white text-3xl font-bold text-center mt-0.5">
          온라인 예약
        </span>
      </div>
      <div className="flex flex-col mt-5 text-[1.1rem] text-white font-light text-center">
        <span>사랑니 당일 발치예약</span>
        <span>평일 1시 30분부터</span>
        <span>토요일 9시 30분부터</span>
        <div>
          예약가능
          <span className="italic">!</span>
        </div>

        <span className="mt-3 text-white text-sm text-opacity-80">
          ※ 일요일 및 공휴일은 휴진입니다.
        </span>
      </div>
      <hr className="mt-6 opacity-80" />
      <div className="mt-5 space-y-1">
        <AppointmentMenuItem
          id={1}
          text={"진료 과목"}
          isDisplayed={currentSession === 0}
        />
        <AppointmentMenuItem
          id={2}
          text={"날짜&시간"}
          isDisplayed={currentSession === 1}
        />
        <AppointmentMenuItem
          id={3}
          text={"예약자 정보"}
          isDisplayed={currentSession === 2}
        />
        <AppointmentMenuItem
          id={4}
          text={"예약 확인"}
          isDisplayed={currentSession === 3}
        />
      </div>
      <div className="w-full flex justify-end mt-5">
        <button className="text-white border border-white px-3 pt-2 pb-1 text-[1.3rem] flex items-end justify-center">
          예약 취소 및 변경
        </button>
      </div>
    </div>
  );
};

export default AppointmentMenu;
