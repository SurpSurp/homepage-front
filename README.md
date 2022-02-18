-- mobile

    [] web 뒤로가기 click -- to select-treatment
        [] 초기화면으로 돌아 갑니다. alert
        [] 모든 캐시 초기화

    [] next, prev Btn && calender-date -> click시(focus: outline-none)

    [] /appointment로 접속시 select-treatment로 redirect

    [] front texts
        - Page:select-date
            [] 마지막 이미지
                - 예약은 30분 전까지만 가능
                - 신청임을 공지(데스크에서 처리하고 문자 발송 해줘야함)

        - Page:check-appointment
            [] 예약 완료 => 예약 신청 완료??

        [] alert texts

    1. select-treatment

       - nextBtn(useRouter.push)
             [✅] if !cachedTreatment => alert

    2. select-date

        - nextBtn(useRouter.push)
            [✅] if !cachedDate => alert
            [✅] if !cachedTime => alert


        - prevBtn(useRouter.push)
            [✅] dateVar, timeVar 리셋 alert


        - [✅] !cachedTreatment -> url접속 시 select-treatment로 redirect
          [✅] 렌더 전에 router.replace 되게 수정
                ==> build 후 해결!


        - [✅] datevar(selectedDate) => viewPoint to time-body


    *** 날짜 선택(default: today) -> getTable -> 시간 선택 -> caching -> applyAppoint -> 확인 페이지 렌더링

        - react-day-picker
            [✅] optional
            [✅] style

        - time-table-container
            [✅] fetching
            [✅] mapping by timeType 시간순으로
            [✅] style
            [✅] caching

    3. patient-info

        - [] input-type-tel => formmat

        - nextBtn(useRoute.push)
            [✅] if !isAgreed => alert
            [✅] if !name, !phone => alert
            [] useMutation(applyReservation)
                [✅] cTreatment, cDate, cTime -> check if !exist
                    [] 없을 경우 ??
                [✅] run trigger with variable
                [✅] onComplete -> router.replace(check-appointment)


         - prevBtn(useRouter.push)
            [✅] nameVar, phoneVar, requestTextVar 리셋 alert



        - [✅] !cachedDate || !cachedTime  -> url접속 시 select-date로 redirect
                [✅] 렌더 전에 router.replace 되게 수정


        - [✅] isAgreed => viewPoint to input-body


        - [✅] privacy-handling
        - [✅] patient-input


    4. check-appointment

        - [✅] !cachedTreatment || !cachedDate || !cachedTime  -> url접속 시 select-treatment로 redirect
                [✅] 렌더 전에 router.replace 되게 수정
