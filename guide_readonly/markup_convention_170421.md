# Bstones Markup Coding Convention

## 목차

### 용어 설명

### 작성 규칙
- ### 1. html
 - #### 1-1. 기본 규칙
 - #### 1-2. DTD 및 인코딩
 - #### 1-3. 엘리먼트
 - #### 1-4. 애트리뷰트
 - #### 1-5. 주석

- ### 2. css
 - #### 2-1. 기본 규칙
 - #### 2-2. 인코딩
 - #### 2-3. 선택자
 - #### 2-4. 속성
 - #### 2-5. 벤더 프리픽스
 - #### 2-6. 미디어쿼리
 - #### 2-7. 주석

- ### 3. js

### 네이밍
 - #### 1. 레이아웃 네이밍
 - #### 2. 선택자 네이밍
 - #### 3. 파일 네이밍
 - #### 4. 이미지 네이밍

### 템플릿
 - #### 1. 퍼블리싱 템플릿
 - #### 2. html 문서 템플릿
<br>

## 용어 설명

마크업 코딩 컨벤션에서 자주 사용되는 용어에 대해 설명한다.

**엘리먼트 (element)**
html 문서를 구성하는 요소를 의미한다. 일반적으로 시작 태그(tag), 내용, 종료 태그로 구성된다.

**애트리뷰트 (attribute)**
엘리먼트에 부여할 수 있는 특성을 의미한다.

**선택자 (selector)**
엘리먼트를 식별할 수 있는 이름을 의미한다.

**속성 (property)**
엘리먼트에 부여할 css 속성을 의미한다.
<br>

## 작성 규칙

### 1. html

html 작성 규칙에 대해 설명한다.

#### 1-1. 기본 규칙

###### W3C validation

- html은 해당 DTD의 명세에 맞게 작성하며, W3C validation을 통과해야 한다. (http://validator.kldp.org/)

###### 영문 소문자 사용

- 태그, 애트리뷰트, 애트리뷰트 값은 영문 소문자를 사용한다.

 ```xml
 <!-- bad -->
 <INPUT type="text"> <!-- 태그가 대문자이므로 X -->
 <input TYPE="text"> <!-- 애트리뷰트가 대문자이므로 X -->
 <input type="TEXT"> <!-- 애트리뷰트 값이 대문자이므로 X -->

 <!-- good -->
 <input type="text">
 ```

###### 애트리뷰트 값 표기

- 애트리뷰트 값은 큰따옴표`""`로 묶는다.

 ```xml
 <!-- bad -->
 <p class='desc'>문장입니다</p>

 <!-- good -->
 <p class="desc">문장입니다</p>
 ```

###### 단일 태그 표기

- html5에서는 단일 태그에 슬래시`/`를 사용하지 않는다.

 ```xml
 <!-- bad -->
 <br />
 <input type="text" />
 <img src="icon.gif" />

 <!-- good -->
 <br>
 <input type="text">
 <img src="icon.gif">
 ```

###### 엔티티 코드 사용

- 특수문자는 되도록 엔티티(entity) 코드를 사용한다.

 ```xml
 <!-- not good -->
 <p class='desc'>you & I</p>

 <!-- good -->
 <p class="desc">you &amp; I</p>
 ```

- 이미지의 `alt`값에 특수문자가 들어가는 경우에도 엔티티 코드를 사용한다.

- 모든 모바일 기기에서 copyright 기호`(c)`를 동일하게 보이게 하려면, 엔티티 코드 대신 이미지를 사용한다.

###### 들여쓰기 및 개행

- 코드의 가독성을 높이기 위해 1탭씩 들여쓰기 한다. (1탭=4칸)

- 빈줄은 의미있는 객체를 구분하기 위해 사용한다.
빈줄의 간격은 최대 1줄을 넘기지 않는다.

###### 인라인 방식 지양

- 태그 안에 인라인 방식으로 `style`애트리뷰트를 사용하지 않는다.
class명을 부여하고 css로 컨트롤한다.

 ```xml
 <!-- bad -->
 <p style="font-size:12px;">문장입니다.</p>

 <!-- good -->
 <p class="desc">문장입니다.</p>
 <style>
 	.desc {font-size:12px;}
</style>
 ```

- 되도록 태그 안에 인라인 방식으로 이벤트를 핸들링하지 않는다.
class명을 부여하고 js단에서 컨트롤한다.

 ```xml
 <!-- bad -->
 <span onClick="clickEv();"></span>
 <!--
 	인라인 방식의 이벤트를 사용하면
	 html과 스크립트가 섞여 성능에 영향을 줄 수 있으며, 수정시 소스 분석이 힘들고, 추후 유지보수도 어려움
 -->

 <!-- good -->
 <span class="btn"></span>
 <script>
 	$('.btn').on('click', function(){ /* 해당 엘리먼트를 클릭했을 때의 이벤트 로직 */ });
 </script>
 ```
<br>

#### 1-2. DTD 및 인코딩

###### DTD

- DTD(Document Type Definition)는 일반적으로 `html5`로 선언한다.

- 반드시 html 문서의 맨앞에 작성한다.
(그렇지 않으면, 쿼크모드(quirks mode)로 렌더링된다)

 ```xml
 <!doctype html>
 ```

###### 인코딩

- 일반적으로 `utf-8`로 선언한다.

- `charset`메타태그는 `head`엘리먼트 맨앞에 작성한다.

 ```xml
 <head>
 	<meta charset="utf-8">
 </head>
 ```
<br>

#### 1-3. 엘리먼트

##### 1-3-1. 전역 구조화 엘리먼트

###### html

- 모더나이저(modernizr) 라이브러리 사용을 위해 `html`태그에 `no-js`라는 class를 추가한다.
(참고 : http://webdir.tistory.com/82)

- 문서에서 사용하는 주언어를 `lang`애트리뷰트에 선언한다.

 ```xml
 <html class="no-js" lang="ko">
 ```

###### meta

- IE 브라우저의 호환성을 위해 문서 모드를 `edge`로 선언해, 최신 버전의 IE로 렌더링되도록 한다.

 ```xml
 <meta http-equiv="x-ua-compatible" content="ie=edge">
 ```

- 모바일의 경우, 아래의 `viewport`메타태그를 추가해 모바일 기기 화면에 맞게 렌더링되도록 한다.

 ```xml
 <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
 ```

> **content 애트리뷰트의 값**
> 
> - width : 화면 너비값. px 단위 생략
> ex.
> width=320
> width=device-width (브라우저 너비를 기기 너비에 맞춤)
>
> - height : 화면 높이값. px 단위 생략
> ex.
> height=480
> height=device-height (브라우저 높이를 기기 높이에 맞춤)
>
> - initial-scale : 초기 화면 배율. 1.0은 100%와 같음
>
> - minimum-scale : 최소 축소 배율. 1.0은 100%와 같음
>
> - maximum-scale : 최대 확대 배율. 1.0은 100%와 같음
>
> - user-scalable : 확대 축소 가능 여부
> ex.
> user-scalable=yes (크기 조절 가능)
> user-scalable=no (크기 조절 불가능)
>
> - target-densitydpi : 안드로이드에서 기기의 실제 해상도 dpi
> ex.
> target-densitydpi=device-dpi
> target-densitydpi=high-dpi
> target-densitydpi=medium-dpi (기본값. 이 경우, target-densitydpi 자체를 선언하지 않아도 됨)
> target-densitydpi=low-dpi

- 모바일의 경우, 아래의 메타태그를 추가해 전화번호, 주소, 이메일, 날짜 포맷에 링크가 자동으로 걸리는 것을 방지한다.

 ```xml
 <meta name="format-detection" content="telephone=no, address=no, email=no, date=no">
 ```

###### script

- 모더나이저와 제이쿼리 라이브러리는 `head`엘리먼트 하단에 연결한다.

- 나머지 스크립트는 문서 하단에 연결한다.

 ```xml
 <html class="no-js" lang="ko">
 	<head>
		<!-- 모더나이저와 제이쿼리 라이브러리는 head 엘리먼트 하단에 연결 -->
		<script src="resource/js/vendor/modernizr-2.8.3.min.js"></script>
		<script src="resource/js/vendor/jquery-1.12.1.min.js"></script>
	</head>
	<body>
		<div id="wrap">
		</div>
		<!-- 기타 스크립트는 문서 하단에 연결 -->
		<script src="resource/js/bstones.js"></script>
		<script src="resource/js/common.js"></script>
		<script></script>
	</body>
</html>
 ```
<br>

##### 1-3-2. form 엘리먼트

###### 폼 전송

- 상황에 따라 `form`태그는 사용하지 않는 경우도 있다. (개발단에서 삽입)

- `form`태그 사용시에는 `form`태그 안에 class를 제외한 다른 애트리뷰트는 사용하지 않는다. (개발단에서 관리)

- 그룹핑이 필요한 엘리먼트(ex. 라디오 버튼)를 제외한 폼 관련 태그에 `name`애트리뷰트를 사용하지 않는다.

- 폼 관련 버튼은 `button`엘리먼트로 마크업하고, `type`애트리뷰트의 값을 `button`으로 명시한다.

- 페이지 이동을 위한 버튼은 `data-href`사용자정의 애트리뷰트를 이용해 링크 이동처를 적어준다. (우선 아래와 같이 마크업)

 ```xml
 <!-- bad -->
 <form action="info.php" method="post" class="form_info"> <!-- class 외 다른 애트리뷰트를 사용했으므로 X -->
 	<input type="text" name="tf_age"> <!-- 그룹핑이 필요하지 않은 엘리먼트에 name 애트리뷰트를 사용했으므로 X -->
	 <input type="submit" value="전송"> <!-- 폼 관련 버튼에 button 태그가 아닌 input 태그를 사용했으므로 X -->
 </form>

 <!-- good -->
 <form class="form_info">
 	<input type="text">
	 <button type="button">전송</button>
	 <button type="button" data-href="#none">목록</button>
 </form>
 ```

- html5에서는 프로퍼티 값이 true인 경우, 값을 생략한다.

 ```xml
 <!-- bad -->
 <input type="text" readonly="readonly">
 <input type="checkbox" checked="checked">

 <!-- good -->
 <input type="text" readonly>
 <input type="checkbox" checked>
 ```

###### 접근성

- `input`, `select`, `textarea`엘리먼트는 접근성 향상을 위해 `label`엘리먼트와 함께 사용한다.

- `label`엘리먼트를 사용할 수 없는 경우에는 `title`애트리뷰트를 보조 수단으로 사용할 수 있다.

 ```xml
 <label for="userTel">전화번호</label> <!-- label 태그의 for 애트리뷰트 값과 -->
 <input type="text" id="userTel"> <!-- input 태그의 id 애트리뷰트 값을 동일하게 작성 -->
 <input type="text" title="가운데자리 입력"> <!-- title 애트리뷰트를 보조로 사용 -->
 <input type="text" title="마지막자리 입력">
 ```
<br>

##### 1-3-3. table 엘리먼트

###### 접근성

- 정보 제공을 위한 표의 경우, `thead`, `tfoot`, `tbody`, `caption`, `th`엘리먼트 및 `scope`애트리뷰트를 제공한다.
(`thead`, `tfoot` 엘리먼트는 존재하는 경우만 작성한다)

- 표의 요약 내용을 표기해야 할 경우, `summary`애트리뷰트를 선택적으로 사용한다.
(html5에서는 `summary`애트리뷰트를 사용하지 않는다)

 ```xml
 <table>
 	<caption>테이블 제목</caption>
	 <thead>
		 <tr>
		 	<th scope="col">이름</th> <!-- th 엘리먼트에 scope 애트리뷰트를 지정해 셀의 범위를 알려줌 -->
			 <th scope="col">나이</th> <!-- 열 범위는 col, 행 범위는 row -->
		 </tr>
	 </thead>
	 <tbody>
		 <tr>
		 	<td>홍길동</td>
			 <td>24</td>
		 </tr>
		 <tr>
		 	<td>김철수</td>
			 <td>26</td>
		 </tr>
    </tbody>
</table>
 ```

###### 레이아웃 용도

- 레이아웃 용도의 표의 경우, `thead`, `tfoot`, `tbody`, `caption`, `th`엘리먼트 및 `scope`애트리뷰트를 제공하지 않는다.

- 왼쪽에서 오른쪽으로 탐색했을 때 내용 파악에 문제가 없는 경우, 레이아웃 용도의 표로 간주한다.
(참고 : http://nuli.navercorp.com/sharing/a11y/checklist/2.3.3)
<br>

#### 1-4. 애트리뷰트

###### 애트리뷰트 선언 순서

- `type`, `name`, `id` 순으로 선언하고, `class`를 가장 마지막에 선언한다.

- `title`애트리뷰트는 필요시 사용하며, 사용시 가장 마지막에 선언한다.

 ```xml
 <input type="" name="" id="" class="" title="">
 ```
<br>

#### 1-5. 주석

- html 코드의 주석은 코드 그룹을 구분하거나 참고해야 하는 사항을 기술한다.

###### 기본 형식

- 주석을 한줄로 작성할 경우, 주석 내용 앞뒤로 공백을 한칸 추가한다.

- 두줄 이상일 경우, 시작 주석과 내용과 끝 주석을 모두 개행하고, 내용은 들여쓰기 한다.

 ```xml
 <!-- 한줄로 작성할 경우, 주석 내용 앞뒤로 공백을 한칸 추가함 -->

 <!--
 	두줄 이상일 경우, 모두 개행하고
	 내용은 들여쓰기 함
 -->
 ```

###### 그룹 구분 표기

- 코드 그룹 구분을 위한 주석은 콘텐츠 영역 시작과 끝에 표기하며, 구조가 복잡해 구분이 힘든 경우에만 선택적으로 사용한다.

- 시작 주석과 끝 주석은 동일한 이름으로 작성한다.

- 끝 주석은 슬래시`/`를 두번 입력한다.

 ```xml
 <!-- 정보입력폼 -->
 <form class="form_info">
 </form>
 <!-- //정보입력폼 -->
 ```

###### 참고 표기

- 퍼블리싱 및 개발에서 참고해야 하는 내용은 해당되는 영역 위에 표기하며, 종료 주석은 작성하지 않는다.

- 퍼블리싱 관련 주석은 맨앞에 `[P]`를, 개발 관련 주석은 `[D]`를 추가해 작성한다. (Publisher, Developer의 약자)

 ```xml
 <!-- [P] background값 교체해야 함 -->
 <div class="bg"></div>

 <!-- [D] 활성화된 버튼에 .on 추가 -->
 <button type="button" class="btn on"></button>
 ```
<br>

---

### 2. css

css 작성 규칙에 대해 설명한다.

#### 2-1. 기본 규칙

###### 영문 소문자 사용

- 속성명, 속성값은 영문 소문자를 사용한다.

 ```css
 /* bad */
 .desc {FONT-SIZE:12px;} /* 속성명을 대문자로 썼으므로 X */
 .desc {overflow:HIDDEN;} /* 속성값을 대문자로 썼으므로 X */

 /* good */
 .desc {overflow:hidden; font-size:12px;}
 ```

###### 속성값 표기

-- 따옴표

- 속성값은 일반적으로 작은따옴표`''`로 묶고, `@charset` 선언에서만 큰따옴표`""`로 묶는다.

 ```css
 .desc {font-family:'돋움', Dotum, 'source code pro';}
 .desc:after {content:'+';}
 input[type='text'] {font-size:12px;}

 /* 큰따옴표를 사용하는 경우 */
 @charset "utf-8";
 ```

- url 데이터 타입에는 따옴표를 생략한다.

 ```css
 /* bad */
 .bg {background:url('bg_wave.png');}

 /* good */
 .bg {background:url(bg_wave.png);}
 ```

-- 쉼표

- 쉼표`,`가 들어가는 경우, 뒤에 공백을 추가한다.

 ```css
 /* bad */
 .desc {font-family:'돋움',Dotum;}

 /* good */
 .desc {font-family:'돋움', Dotum;}
 ```

- `rect()`속성값 안에서는 구 IE 브라우저와의 호환성을 위해 쉼표를 사용하지 않는다.

 ```css
 /* bad */
 .blind {position:absolute; clip:rect(0, 0 ,0, 0);}

 /* good */
 .blind {position:absolute; clip:rect(0 0 0 0);}
 ```

###### @import 지양

- `@import`는 성능 문제로 사용하지 않는다.
여러개의 `link`엘리먼트로 연결한다.

 ```xml
 <!-- bad -->
 <style>
 	@import url(a.css);
	 @import url(b.css);
</style>

 <!-- good -->
 <link rel="stylesheet" href="a.css">
 <link rel="stylesheet" href="b.css">
 ```
<br>

#### 2-2. 인코딩

- css 인코딩은 html의 인코딩과 동일하게 선언한다.

 ```css
 @charset "utf-8";
 ```
<br>

#### 2-3. 선택자

###### class 사용

- 렌더링 엔진 최적화를 위해 스타일 또는 스크립트 제어가 필요한 모든 엘리먼트에는 class를 부여한다.
태그 단독 사용을 지양한다.
(참고 : https://developer.mozilla.org/ko/docs/Web/CSS/Writing_Efficient_CSS)

 ```css
 /* bad */
 div {overflow-y:auto;}
 div p {font-size:12px;}

 /* good */
 .box {overflow-y:auto;}
 .desc {font-size:12px;}
 ```

- `.gnb > li`처럼 절대 바뀌지 않는 구조에서는 예외로 태그 사용을 허용한다. (자식 선택자 추천)

 ```css
 /* not bad */
 .gnb > li {padding-bottom:5px;}
 .list > li {margin-left:10px;}
 .tbl td {font-size:12px;} 
 ```

###### 선택자 선언 규칙

- 여러 선택자를 선언할 때는 쉼표 후 개행한다.

 ```css
 /* bad */
 .tit_a, .tit_b, .tit_c {color:#fff;}

 /* good */
 .tit_a,
 .tit_b,
 .tit_c {color:#fff;}
 ```

- 선택자와 중괄호`{}` 사이에는 공백을 한칸 추가한다.

 ```css
 /* bad */
 .desc{font-size:12px;}

 /* good */
 .desc {font-size:12px;}
 ```

- 선택자 선언은 되도록 3depth를 넘기지 않는다.
(ex. #container에 root class를 두고, 구별 가능한 class들만 선언하도록 한다)

 ```css
 /* bad */
 .container_faq .section .article .box_a .area {padding-bottom:10px;}
 .container_faq .section .article .box_a .area .desc .txt {color:#fff;}

 /* good */
 .container_faq .box_a .area {padding-bottom:10px;}
 .container_faq .box_a .txt {color:#fff;}
 ```

###### 다중 선택자 (활성화 class)

- 엘리먼트의 활성화 상태를 나타내기 위해 다중 선택자로 `on`class를 사용할 수 있다.

- 활성화 상태가 중첩되어 사용될 경우, 중첩된 엘리먼트는 `on`class 대신 다른 class를 사용한다.
(동일한 활성화 class를 사용하지 않는다)

 ```css
 /* bad */
 .section {background-color:#000;}
 .section.on {background-color:#fff;} /* 활성화 상태를 나타내기 위해 다중 선택자 on 사용 */

 .section .desc {color:#000;}
 .section.on .desc.on {color:#fff;} /* 활성화 상태가 중첩되었는데, 동일한 다중 선택자를 사용했으므로 X */

 /* good */
 .section {background-color:#000;}
 .section.on {background-color:#fff;}

 .section .desc {color:#000;}
 .section.on .desc.active {color:#fff;}
 ```
<br>

#### 2-4. 속성

###### 속성 선언 순서

- 속성 선언 순서는 아래 표를 참고해 따른다.
(박스모델의 위치 양식 &rarr; 크기 양식 &rarr; 텍스트의 정렬 &rarr; 꾸밈 &rarr; 기타)

- 대표 속성 외 관련 속성의 순서는 자유롭게 사용한다.

 | 의미 | 대표 속성 | 관련 속성 |
 |-|-|-|
 | 표시 | display | visibility |
 | 넘침 | overflow | |
 | 흐름 | float | clear |
 | 위치 | position | z-index, top, right, bottom, left |
 | 박스모델 | box-sizing | |
 | 크기 | width, height | |
 | 간격 | padding | |
 | 테두리 | border | |
 | 여백 | margin | |
 | 배경 | background | background-size |
 | 정렬 | text-align | vertical-align, text-indent, white-space |
 | 폰트 | font | font-size, line-height, color, letter-spacing, font-weight, font-family, text-decoration 등 |
 | 동작 | animation | animation, transform, transition 등 |
 | 기타 | | 위에 언급되지 않은 나머지 속성들은 폰트 관련 속성 이후에 선언하며, 기타 속성 내의 선언 순서는 무관함 |

 ```css
 /* bad */
 .desc {font-size:12px; padding-bottom:20px; float:left;}

 /* good */
 .desc {float:left; padding-bottom:20px; font-size:12px;}
 ```

###### 속성 선언 규칙

- 속성은 개행하지 않고 일렬로 작성한다.

 ```css
 /* bad */
 .desc {
 	display:block;
	 font-size:12px;
}

 /* good */
 .desc {display:block; font-size:12px;}
 ```

- 속성명과 속성값은 붙여쓴다.

 ```css
 /* bad */
 .desc {display: block;}

 /* good */
 desc {display:block;}
 ```

- 하나의 속성 선언이 끝나면 뒤에 공백을 한칸 추가한다.
맨마지막 속성 뒤에는 공백을 추가하지 않는다.

 ```css
 /* bad */
 .desc {display:block;font-size:12px;color:#fff;} /* 속성을 모두 붙여썼으므로 X */
 .desc {display:block; font-size:12px; color:#fff; } /* 마지막 속성 뒤에 공백을 추가했으므로 X */

 /* good */
 .desc {display:block; font-size:12px; color:#fff;}
 ```

###### 축약

- 16진수 값은 가능하다면 축약형으로 표기한다.

 ```css
 /* bad */
 .desc {color:#000000;}

 /* good */
 .desc {color:#000;}
 ```

- 속성값이 0인 값은 단위를 생략한다.

 ```css
 /* bad */
 .desc {padding-bottom:0px;}

 /* good */
 .desc {padding-bottom:0;}
 ```

- 소수점 앞자리 0은 생략하지 않는다.

 ```css
 /* bad */
 .bg {background-color:rgba(0, 0, 0, .33);}

 /* good */
 .bg {background-color:rgba(0, 0, 0, 0.33);}
 ```

###### z-index

- `z-index`속성값의 범위는 최소 10, 최고 1000이며 10단위로 증감한다.

- 10단위 사이의 예외 변수(예상치 못했거나 추후 추가되는 항목이 있을 경우)가 발생하면 1단위 값을 지정할 수 있다.
<br>

#### 2-5. 벤더 프리픽스

- 벤더 프리픽스가 붙은 속성을 일반 속성보다 먼저 선언한다.

- 가독성을 위해 벤더 프리픽스를 제외한 속성명을 기준으로 정렬한다. (공백 허용)

 ```css
 .box {
 	-webkit-transform:traslateX(-50%); /* transform이라는 속성명을 기준으로 정렬 */
        -moz-transform:traslateX(-50%);
          -m-transform:traslateX(-50%);
             transform:traslateX(-50%);
 }
 ```

- 벤더 프리픽스가 붙은 속성은 가독성을 위해 속성 선언 순서를 무시하고 가장 마지막에 개행하여 작성한다.

 ```css
 .box {display:block; padding-bottom:20px; font-size:12px;
    width:-webkit-calc(100% - 25px);
    width:   -moz-calc(100% - 25px);
    width:        calc(100% - 25px);
 }
 ```
<br>

#### 2-6. 미디어쿼리

- 반응형 미디어쿼리는 모바일 css를 먼저 작성한다.
<br>

#### 2-7. 주석

- css 주석은 각 그룹을 구분하거나 참고해야 하는 사항을 기술한다.

###### 기본 형식

- 주석을 한줄로 작성할 경우, 주석 내용 앞뒤로 공백을 한칸 추가한다.

- 두줄 이상일 경우, 시작 주석과 내용과 끝 주석을 모두 개행하고, 내용은 들여쓰기 한다.

 ```css
 /* 한줄로 작성할 경우, 주석 내용 앞뒤로 공백을 한칸 추가함 */
 
 /*
 	두줄 이상일 경우, 모두 개행하고
 	내용은 들여쓰기 함
 */
 ```

- 중괄호`{}` 안에는 주석을 작성하지 않는다.
속성 관련 주석은 바로 윗줄에 작성한다.

 ```css
 /* bad */
 .desc {font-size:12px;/*16px*/}
 
 /* good */
 /* line-height을 높여야 할 경우 font-size:16px로 조절 */
 .desc {font-size:12px;}
 ```

- 2명 이상의 작업자가 작업할 경우, 필요에 따라 수정된 코드 그룹 상단에 수정일, 작성자, 코멘트를 작성한다.

 ```css
 /* 170421 수정 (ARShin) : UI 변경에 따른 color값 변경 */
 .tit {color:#cecece;}
 .bg {background-color:#fff;}
 ```

###### 그룹 구분 표기

- 그룹 구분을 위한 주석은 그룹 시작에 표기하고, 종료 주석은 선택적으로 사용한다.

- 그룹 구분을 위한 주석은 상위 메뉴명을 포함해 작성한다.

 ```css
 /* 고객센터 - FAQ */
 .container_faq .section {padding-bottom:10px;}
 .container_faq .section .tit {font-size:12px;}
 
 /* 고객센터 - 공지사항*/
 .container_notice .section {margin-bottom:20px;}
 .container_notice .section .desc {color:#ff0000;}
 ```
<br>

---

### 3. js

js 작성 규칙에 대해 설명한다.

###### 기본 규칙

- 기본적으로 작은따옴표`''`로 묶는다.

- 쉼표 다음에는 공백을 추가한다.

 ```javascript
 /* bad */
 $(".container_customer .btn_banner").on('click', function(){}); //제이쿼리 선택자에 큰따옴표를 사용했으므로 X
 $('.container_customer .btn_banner').on("click", function(){}); //이벤트 타입에 큰따옴표를 사용했으므로 X
 $('.container_customer .btn_banner').on('click',function(){}); //쉼표 후 공백을 두지 않았으므로 X

 /* good */
 $('.container_customer .btn_banner').on('click', function(){});
 ```

###### 작성 위치

- `gnb` 등 공통으로 사용되는 js는 `common.js`에 작성한다.

- 그외에는 페이지 하단에 직접 작성한다.
<br>

## 네이밍

레이아웃, 선택자, 파일 및 폴더, 이미지의 네이밍 규칙에 대해 설명한다.

### 1. 레이아웃 네이밍

- 문서 기본 레이아웃에는 약속된 선택자를 사용한다.

 | 약속어 | 범위 |
 |-|-|
 | #wrap | 페이지 전체영역 |
 | #header | 머리글 영역 |
 | #container | 본문 영역 |
 | #footer | 바닥글 영역 |

 ```xml
 <div id="wrap">
 	<div id="header"></div>
	 <div id="container"></div>
	 <div id="footer"></div>
 </div>
 ```
<br>

### 2. 선택자 네이밍

#### 2-1. 선택자 종류

- id는 레이아웃 및 스크립트 제어를 위한 용도로만 사용한다.
스타일 제어를 위해 사용하지 않는다.

- 선택자 종류에 따른 네이밍 표기법은 아래와 같다.

 | 선택자 종류 | 네이밍 표기법 | 표기 |
 |-|-|-|
 | id | 카멜케이스(camel case) 방식 | `<div id="viewBoard">` |
 | class | 언더스코어(under score) 방식 | `<div class="section_board">` |
 | helper class | 하이픈(hyphen) 방식 | `<div class="text-overflow">` |
 | html5 사용자정의 data 애트리뷰트 | 하이픈(hyphen) 방식 | `<div data-target="pop-layer">` |
<br>

#### 2-2. 선택자 작성 규칙

###### 기본 규칙

- 이해하기 쉬운 이름으로 작성한다.

- 숫자로 끝나는 네이밍은 지양한다.
단어와 숫자를 함께 사용해야 하는 경우에는 붙여서 쓴다.

 ```xml
 <!-- bad -->
 <div class="section_1"></div>

 <!-- good -->
 <div class="section1"></div>
 ```

-- class 선택자

- 프리픽스를 사용해 기본적으로 `형태_의미`로 구성한다.

- 필요에 따라 서픽스를 활용해 `형태_의미_상태` 순으로 조합한다.
(프리픽스, 서픽스는 아래에서 설명)

- 각 조합은 되도록 3단계를 초과하지 않도록 한다.

 ```xml
 <div class="area_info"></div> <!-- 형태_의미 -->
 <button type="button" class="btn_attention_on">주의</button> <!-- 형태_의미_상태 -->
 ```

###### 프리픽스 및 서픽스

-- 프리픽스

- 프리픽스(prefix)는 접두사를 의미하며, 주로 형태를 나타내는 데 사용한다.

- 서브 프리픽스가 필요한 경우, 언더스코어`_`로 구분해 표기한다.

- 프리픽스 명은 아래와 같이 구분한다. (자유롭게 작명해 사용 가능)

 | 분류 | 프리픽스 명 | 설명 |
 |-|-|-|
 | 영역 | wrap | 영역들의 전체 묶음 |
 | | inner | 부모 wrap이 존재하며, 자식 묶음이 별도로 필요할 경우 사용 |
 | | area | 배치를 위한, 또는 성격별로 분류한 대략적인 영역 |
 | | section | 주제를 가진 영역. 주로 heading 태그와 함께 사용 |
 | | article | 독립적으로 사용할 수 있는 영역. 주로 heading 태그와 함께 사용<br>(ex. 블로그 글, 뉴스 본문, 댓글 등) |
 | | aside | 본문과 직접적으로 상관이 없는 내용 영역<br>(ex. 관련 사이트 링크, 광고 등) |
 | | util | 유틸리티 영역 |
 | | pop | 팝업 영역 |
 | 네비게이션 | gnb (global navigation bar) | 대표 메뉴 목록 |
 | | lnb (local navigation bar) | 지역 메뉴 목록 (페이지별 메뉴) |
 | | snb (sub navigation bar) | 서브 메뉴 목록 (일반적으로 좌측 메뉴) |
 | | location | 페이지 현재 위치 안내 |
 | 타이틀 | tit | 각종 타이틀 |
 | | subtit | 서브 타이틀 |
 | 폼 | form | 폼 |
 | | tf | 텍스트 영역<br>(ex. `<input type="text">`, `<textarea>`) |
 | | radio | 라디오 버튼 |
 | | checkbox | 체크박스 |
 | | select | 셀렉트박스 |
 | 테이블 | tbl | 테이블 |
 | 목록 | list | 목록그룹 |
 | 이미지 | img | 이미지 |
 | | thumb | 썸네일 |
 | | logo | 로고 |
 | 텍스트 | txt | 글자 |
 | | num | 숫자 |
 | | date | 날짜 |
 | | time | 시간 |
 | | desc | 설명, 문장 |
 | 링크 | link | 링크 |
 | | more | 더보기 링크 |
 | 버튼 | btn | 버튼 |
 | 아이콘 | icon | 아이콘 |
 | | bul | 불릿 |
 | 배경 | bg | 배경 |
 | 멀티미디어 | video | 동영상 |
 | | audio | 음성파일 |

-- 서픽스

- 서픽스(suffix)는 접미사를 의미하며, 주로 상태를 나타내는 데 사용한다.
프리픽스와 함께 부가 설명 용도로만 사용한다.

- 서픽스가 필요한 경우, 언더스코어`_`로 구분해 표기한다.

- 서픽스 명은 아래와 같이 구분한다. (자유롭게 작명해 사용 가능)

 | 분류 | 서픽스 명 | 설명 |
 |-|-|-|
 | 상태변화 | _on / _off / _over / _hit / _focus | 주로 마우스, 키보드 이벤트시 사용 |
 | 위치변화 | _top / _mid / _bot / _left / _right |  자바스크립트 애니메이션 등에서 사용 |
 | 순서변화 | _first / _last | 주로 이벤트 제어시 사용 |
 | 이전/다음 | _prev / _next | 주로 버튼에 사용 |

 ```xml
 <button type="button" class="btn_prev">이전버튼</button>
 <button type="button" class="btn_confirm_on">확인</button>
 ```
<br>

### 3. 파일 네이밍

- 기본적으로 `메뉴명`으로 구성한다.

 ```text
 main.html
 intro.html
 main.css
 intro.css
 ```

- 필요에 따라 `메뉴명_의미_상태` 순으로 추가해 조합한다.

- 각 조합은 언더스코어`_`로 구분해 표기하며, 되도록 3단계를 초과하지 않도록 한다.

 ```text
 faq_list.html (메뉴명_상태)
 news_board_view.html (메뉴명_의미_상태)
 ```
<br>

### 4. 이미지 네이밍

- 기본적으로 `형태_의미`로 구성한다.

 ```text
 btn_submit.gif
 bg_wave.png
 ```

- 필요에 따라 `형태_의미(영역명)_상태` 순으로 추가해 조합한다.

- 각 조합은 언더스코어`_`로 구분해 표기하며, 되도록 3단계를 초과하지 않도록 한다.

 ```text
 btn_faq.gif (형태_영역명)
 btn_submit_on.gif (형태_의미_상태)
 ```

- 같은 분류의 이미지가 2개 이상이면, 파일명 마지막에 숫자를 추가해 구분한다.
숫자는 이미지 확장자와 관계없이 순차적으로 적용한다.

 ```text
 img_intro1.gif
 img_intro2.png
 img_intro3.jpg
 ```
<br>

## 템플릿

### 1. 퍼블리싱 템플릿

- 아래 경로에 있는 템플릿을 기준으로 퍼블리싱한다.
svn://bstones.co.kr/bstones/trunk/default_html
<br>

#### 1-1. 템플릿 구조

 - `admin`폴더 : 관리자 페이지 관련

 - `resources`폴더 : images, css, js, fonts 등의 리소스

 - `index.html`파일 : 퍼블리싱 페이지 목차
(프로젝트시에는 page_index.html의 파일명을 index.html로 변경)
<br>

#### 1-2. resources 폴더

###### images 폴더

 - common, 대메뉴별로 폴더를 생성한다.

 - 이외 하위 디렉토리는 만들지 않는다.

###### css 폴더

 - `reset.min.css`

 > - 크로스 브라우징을 위한 코드 초기화 css (수정하지 말것)
 > - 실 사용할 파일은 `reset.min.css` (코드 블록을 제외한 주석 및 공백 제거)
 > - 가이드용 파일은 `reset.css` 참조

 - `basic.min.css`

 > - 전역 공통, 헬퍼 클래스 css (수정하지 말것)
 > - 실 사용할 파일은 `basic.min.css` (코드 블록을 제외한 주석 및 공백 제거)
 > - 가이드용 파일은 `basic.css` 참조

 - `font.css`

 > - 웹폰트 css
 > - 폰트 관련 속성값 참조 (ex. `font-family`, `font-weight` 등)

 - `common.css`

 > - 공통 css
 > - `header`, `footer`, `gnb` 및 공통 사용 css

 - `layout.css`

 > - `common.css`를 제외한 모든 페이지의 css
 > - 사이트 규모가 클 경우, `layout.css` 대신 대메뉴별로 css 파일 생성

 - `admin` 폴더

 > - 관리자에서 사용

 - `page` 폴더

 > - index.html (퍼블리싱 페이지 목차) 에서 사용

###### js 폴더

 - `dev.form.js`,  `dev.util.js`, `dev.validate.js`

 > - 폼 유효성 검사, 자바스크립트 쿠키 및 세션, 폼 관련 유틸

 - `bstones.js`

 > - 비스톤스 자체 플러그인
 > - 레이어 팝업, 터치 슬라이드 기능 제공

 - `common.js`

 > - 모든 페이지에서 공통으로 사용하는 js
 > - 페이지별 js는 각 페이지 하단에 작성

 - `vendor` 폴더

 > - 부트스트랩, 모더나이저, 제이쿼리 등 라이브러리 모음

###### fonts 폴더

- 프로젝트에서 쓰이는 폰트만 사용할 것
<br>

### 2. html 문서 템플릿

```xml
<!doctype html>
<html class="no-js" lang="ko">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>문서 제목</title>
	<meta name="description" content="문서에 대한 설명입니다.">
	<meta name="keywords" content="키워드1, 키워드2">
	<!-- 모바일 뷰포트 설정 -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="format-detection" content="telephone=no, address=no, email=no, date=no">
	<link rel="shortcut icon" href="favicon.ico">
	<!-- 모바일 iOS용 파비콘 -->
	<link rel="apple-touch-icon" href="favicon.png">
	<link rel="stylesheet" href="resources/css/reset.min.css">
	<link rel="stylesheet" href="resources/css/basic.min.css">
	<link rel="stylesheet" href="resources/css/font.css">
	<link rel="stylesheet" href="resources/css/common.css">
	<link rel="stylesheet" href="resources/css/layout.css">
	<script src="resources/js/vendor/modernizr-2.8.3.min.js"></script>
	<script src="resources/js/vendor/jquery-1.12.1.min.js"></script>
</head>

<body>
<!--[if lt IE 8]>
<p>현재 사용하고 계신 브라우저는 <strong>공식 지원</strong>이 끊긴 브라우저입니다. 다음 페이지에서 <a href="http://browsehappy.com/">브라우저 업그레이드</a>를 진행해 주세요.</p>
<![endif]-->

	<!-- wrap -->
	<div id="wrap">
		<!-- header -->
		<div id="header"></div>
		<!-- //header -->

		<!-- container -->
		<div id="container"></div>
		<!-- //container -->

		<!-- footer -->
		<div id="footer"></div>
		<!-- //footer -->
	</div>
	<!-- //wrap -->

	<script src="resources/js/dev.common.js"></script>
	<script src="resources/js/dev.form.js"></script>
	<script src="resources/js/dev.util.js"></script>
	<script src="resources/js/dev.validate.js"></script>
	<script src="resources/js/bstones.js"></script>
	<script src="resources/js/common.js"></script>
	<!-- 페이지별 js는 하단에 -->
	<script>
	$(function () {
	});
	</script>
</body>
</html>
```
