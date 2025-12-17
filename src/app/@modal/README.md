# 모달 사용법

1. 인터셉트 + 패러렐 + createPortal() + dialog 활용
   (@modal내 파일들, components/organisms/modal.tsx, app/layout.tsx의 모달 관련 코드 참고)
2. 해당 모달이 쓰이는 페이지의 모든 경로 + 하위 경로로 폴더를 일일이 설정하는 것이 좋음
   (pathname의 각종 정보를 쉽게 활용하기 위함, 브라우저 url의 ui를 고려한 방식이기도 함)
3. 모달을 닫을 때는 router.back()을 사용하는 것을 추천 (이전 페이지 스크롤 유지)
4. 간단한 모달이거나 props가 너무 많은 경우에는 단순 조건부 렌더링을 활용해도 됨 (인터셉팅+패러렐이 아닌)
   - "state를 쓰지 않은, ?modal=true 쿼리 여부에 따른 렌더링 방식 + modal.tsx"를 활용
   - 모달에 적합한 스타일들을 utilities.css에 모아놓음. 이들을 잘 활용 (fixed, absolute center 및 z-index 등)
5. 모달을 닫고나서 다시 fetch를 해야하는 상황이라면, 이전 페이지에서 pathname따라 fetch를 다시 실행하는 useEffect()를 활용해볼 것
