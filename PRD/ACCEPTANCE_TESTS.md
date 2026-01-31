# ACCEPTANCE_TESTS — MVP Manual QA

## A. 기본 생성
1) 모델=gemini, 타입=summary, 기본 Lite로 실행
- After에 Role/Context/Instruction 구조가 보인다.
- 제약(길이/톤/안전출구/서두제거)이 포함된다.
- Copy가 정상 동작한다.

2) 모델=claude, 타입=email_reply
- After가 XML 태그로 래핑된다.
- 태그가 중첩 없이 닫힌다.

3) 모델=openai, 타입=marketing_copy
- 최상단에 명령(Instruction)이 먼저 온다.

## B. 옵션 반영
4) length=very_short로 바꾸면 제약 문구가 2문장 이내로 바뀐다.
5) tone=persuasive로 바꾸면 톤 안내 문구가 바뀐다.
6) format=json 선택 시 output_format에 JSON 요구가 포함되고, 다운로드 .json이 가능하다.

## C. Diff
7) Diff 토글 ON 시 After에만 있는 블록이 하이라이트된다.

## D. 민감정보
8) 입력에 이메일(test@example.com)을 넣으면 경고가 뜬다.
9) “마스킹 적용”을 누르면 결과에서 이메일이 ***로 가려진 버전이 사용된다.

## E. 히스토리
10) 최적화 결과가 localStorage에 저장되고 새로고침 후에도 불러올 수 있다.
11) 기록 삭제가 동작한다.

## F. 길이/토큰
12) 입력을 매우 길게 붙여넣으면 토큰 경고가 뜬다(80% 기준).

