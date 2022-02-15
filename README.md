-- mobile

    1. select-treatment

       - nextBtn(useRouter.push)
             [✅] if !cachedTreatment => alert

    2. select-date

        - nextBtn(useRouter.push)
            [✅] if !cachedDate => alert
            [✅] if !cachedTime => alert


        - prevBtn(useRouter.push)
            [✅] dateVar, timeVar 리셋 alert


        - [] !cachedTreatment -> url접속 시 select-treatment로 redirect


        - [] datevar(selectedDate) => viewPoint to time-body


    *** 날짜 선택(default: today) -> getTable -> 시간 선택 -> caching -> applyAppoint -> 확인 페이지 렌더링

        - react-day-picker
            [✅] optional
            [✅] style

        - time-table-container
            [✅] fetching
            [✅] mapping by timeType 시간순으로
            [✅] style
            [✅] caching

    3. user-info

        - nextBtn(useRoute.push)
            [✅] if !isAgreed => alert
            [] if !cachedName => error-msg
            [] if !cachedPhone => error-msg


         - prevBtn(useRouter.push)
            [] nameVar, phoneVar, requestTextVar 리셋 alert



        - [] !cachedDate -> url접속 시 select-date로 redirect

        - [] !cachedTime -> url접속 시 select-date로 redirect


        - [] isAgreed => viewPoint to input-body


        - privacy-handling [✅]
        - patient-input [✅]
