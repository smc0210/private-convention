# 추적코드 삽입하기

## 개요

웹사이트에 `추적코드(Tracking Code)`를 삽입해 두면 해당 사이트의 방문자 현황을 알 수 있다.

예를 들면 하루에 몇명이 접속했는지, 방문자가 어디에서 유입되었는지, 사이트에 얼마나 머물렀는지 등 방문자의 유입률, 이탈률과 관련된 통계를 낼 수 있다.(페이지콜)

양식 제출, 동영상 재생, 자료 다운로드, 버튼 클릭 등 상호작용이 일어나는 이벤트에 대한 추적도 가능하다.(버튼콜)
만약 팝업으로 열린 가입폼이라면 팝업은 몇번 열렸는지, 저장버튼은 몇번 눌렀는지, 머무른 시간 등을 확인해 가입폼의 문제점을 파악, 이를 개선하는 데 도움이 될 수 있다.

이러한 기능을 제공하는 대표적인 서비스로는 `구글 웹로그 분석(Google Analytics)`을 들 수 있다.
(구글 웹로그 분석 : https://www.google.com/analytics/)
<br>
** 구글 웹로그 분석을 통해 얻을 수 있는 정보 **

<img src="http://blogfiles.naver.net/MjAxNjExMDRfMTE4/MDAxNDc4MjMwMDkxNTk5._0kSpkTZkypKj-K61-VvQTdgaCjp98ZwEChS4R6WJicg.5fg7sIyx2-yU8xc5wOtJ0XOIHUdQWxUFFxJumpjZRK8g.GIF.areum1227/google_analytics.gif" alt="">
: 대시보드를 통해 자세한 내용과 통계를 확인할 수 있다.

<br>
## 추적코드 삽입

방문자가 사이트에 접속하면 추적코드는 접속 페이지 url, 접속 시간, 사용자 브라우저 정보 등을 인식하고 해당 데이터를 로그 수집 서버로 전송한다.

사이트 전반에 대한 추적을 하려면 모든 페이지에 추적코드를 삽입해야 한다.
그러므로 모든 페이지에 공통으로 노출되는 `<head>` 또는 `<body>` 가장 하단에 삽입하는 것을 권장한다.

<br>
## 코드 실행 확인

웹 디버깅 툴인 `피들러(Fiddler)`를 사용해 추적코드가 제대로 실행되고 있는지 확인할 수 있다.

피들러는 프록시 역할을 하면서 사용자 컴퓨터와 인터넷 사이에서 일어나는 여러 http 트래픽 문제를 디버깅한다.
즉 클라이언트에서 서버로 요청한 내역과 결과에 대한 모든 데이터를 확인할 수 있다.
이를 통해 추적코드가 로그 수집 서버에 제대로 접속하고 있는지 확인할 수 있다.

######피들러 사용 방법

1. 아래 url에서 피들러를 다운로드해 설치한다.
<http://fiddler.kr.uptodown.com/windows>

2. 사이트에 접속하고 피들러를 실행한다.

3. 피들러의 왼쪽 화면에서는 접속한 사이트의 http 프로토콜을 읽어 요청(Request) 정보를 리스트로 보여준다.
현재 열려있는 다른 사이트들의 요청 정보도 표시되므로, 확인하려는 사이트의 정보만 확인하려면 아래와 같이 실행한다.

 > 1) 확인하려는 사이트에 접속
 > 2) 피들러 왼쪽 화면의 리스트를 전체선택한 후(Ctrl + A) 삭제(Delete키) (모든 요청 정보 초기화)
 > 3) 확인하려는 사이트를 새로고침
 > 4) 해당 사이트 첫 접속부터의 요청 정보를 확인할 수 있음

4. 왼쪽 화면에서 추적코드와 관련된 요청 정보를 찾아볼 수 있다.
또한 요청 정보를 클릭하면 오른쪽 화면에서 상세 내용을 확인할 수 있는데,
오른쪽 화면의 `Inspectors` 메뉴 > `WebForms` 항목에서 추적코드와 관련된 내용을 확인할 수 있다.

추적코드는 다양한 변수에 사용자 접속 정보를 담아 서버에 전송하므로, 추적코드 안에 있는 변수명이나 url 정보가 피들러에서 확인된다면 코드가 제대로 실행되고 있는 것으로 판단할 수 있다.
<br>
** 구글 웹로그 분석 추적코드 실행 확인 **

<img src="http://blogfiles.naver.net/MjAxNjExMDRfMjU5/MDAxNDc4MjI5NDAzOTA0.j2rbQakXpGFxHsGmUe-sjI4aA1g6ryNxyP7xxpwkXkEg.1o_4WP26Yp4QRlLN7a3JgnAWcu00zrrcdy0ugbwvTjog.GIF.areum1227/google_code.gif" alt="">
: 문서 하단에 추적코드를 삽입한다.

<img src="http://blogfiles.naver.net/MjAxNjExMDRfMjM4/MDAxNDc4MjI5NDA0MTc0.nGfta_9S9xyaD2aZvXc-qIJIGwWNMWC02YwJ-764_JQg.XuTVxD3XwUF2LqhWb6hxcI4jlPoR34MBAqLukMyMHDgg.GIF.areum1227/google_fiddler.gif" alt="">
: 피들러 왼쪽 화면에서 구글 애널리틱스 서버에 접속하는 것을 확인할 수 있다.
<br>
** 타사 추적코드 실행 확인 **

<img src="http://blogfiles.naver.net/MjAxNjExMDRfMTM3/MDAxNDc4MjI5NDg4OTQ5.VOT1_Sz2o1mg0HGvVH3PKvrvwzjv5aCDE5tScXf6Q2Qg.ygan6qsek8smbVnsFSdSKTO_vTJ0mU0-AttPmgUeeUEg.GIF.areum1227/etc_code.gif" alt="">
: 추적코드 내에서 return값으로 넘어가는 객체의 key와 값을 확인할 수 있다.
관련 js url도 확인할 수 있다.

<img src="http://blogfiles.naver.net/MjAxNjExMDRfMTcy/MDAxNDc4MjI5NDg5MTI1.QdYZUlHrSEOtXdKvBR1xlGNeaUikh_tWEgoKzhONVhgg.jCdKuO-JhJbJdWg7Qn8MsnPESHRXwO2JDL1sJC75LcEg.GIF.areum1227/etc_fiddler.gif" alt="">
: 피들러 왼쪽 화면에서 관련 js url에 접속하는 것을 확인할 수 있다.
오른쪽 화면 > `Inspectors` 메뉴 > `WebForms` 항목에서 return값으로 넘어간 key와 값을 확인할 수 있다.