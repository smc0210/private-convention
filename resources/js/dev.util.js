/*
	jQurey Util Class
*/ 
(function($) {
	
	$Util = {
			
		/*
			현재 브리우져가 쿠키를 사용할 수 있는지 체크한다.
			@return boolean
		*/
		checkCookieEnabled : function () {
			setCookie("checkCookie","Y",1);
			var value = getCookie("checkCookie");
			deleteCookie("checkCookie");
			return (value == "Y");
		},
		
		/*
			쿠키를 삭제한다
			@param String cookieName (쿠키명)
			@return void
		*/
		deleteCookie :function ( cookieName ){
			var expireDate = new Date();
			expireDate.setDate( expireDate.getDate() - 1 );
			document.cookie = cookieName + "= " + "; path=/; expires=" + expireDate.toGMTString();
		},

		/*
			length 만큼 앞에 '0'을 채운다. 
			@param value 0을 추가할 숫자
			@param length 최소 문자열 길이
			@return String 0을 채운 문자열 
		*/
		fillZero : function (value, length) {
			var val = new String(value);
			var valLength = val.length;
			for(var i = 1; i <= length - valLength; i++) {
				val = "0"+val;
			}
			return val;
		},
			
		/*
			해당 단어에 맞는 조사로 변경해 준다
			@param value 조사를 붙일 단어
			@param type	(을/를/은/는/이/가/와/과)
			@return String (을/를/은/는/이/가/와/과)
		*/
		getAux : function(value, type){
			var typeNum = 1,
				aux = '을를은는이가와과',
				lastChars = ' ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ',
				c, lastChar;
			
			c = value.charCodeAt(value.length-1);
			lastChar = lastChars.charAt((c-0xAC00) % 588 % 28); //종성

			if(type == '을' || type == '를') typeNum = 1;
			else if(type == '은' || type == '는') typeNum = 2;
			else if(type == '이' || type == '가') typeNum = 3;
			else if(type == '와' || type == '과') typeNum = 4;
			
			return (aux.charAt(typeNum*2-($Util.trim(lastChar) != "" ? 2 : 1)));
		},
		
		/*
			저장된 쿠키의 쿠키값을 가져온다
			@param String cookieName (쿠키명)
			@return String
		*/
		getCookie : function (cookieName){ 
			var nameOfCookie = cookieName + "="; 
			var x = 0; 
			
			while ( x <= document.cookie.length ) {
				var y = (x+nameOfCookie.length); 
				if ( document.cookie.substring( x, y ) == nameOfCookie ) { 
					if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
						endOfCookie = document.cookie.length; 
					return unescape( document.cookie.substring( y, endOfCookie ) ); 
				} 
				x = document.cookie.indexOf( " ", x ) + 1; 
				if ( x == 0 ) break; 
			}
			return ""; 
		},

		/*
			서버의 Date를 가져온다.
			@return Date
		*/
		getServerDate : function() {
			var date;
			$.ajax("/blank.html", {
			    async:false,
			    complete : function(xhr) {
					var headerDate = xhr.getResponseHeader("Date");
					date = new Date(headerDate);
				}
			});
			return date;
		},
		
		/*
			페이지 사이즈 구하기
			@return Array(페이지전체넓이,페이지전체높이,페이지가시면넓이,페이지가시화면높이)
		*/
		getPageSize : function(){
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {	
				xScroll = document.body.scrollWidth;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else if (document.documentElement.scrollHeight > document.documentElement.offsetHeight){
				xScroll = document.documentElement.scrollWidth;
				yScroll = document.documentElement.scrollHeight;
			} else {
				xScroll = document.documentElement.offsetWidth;
				yScroll = document.documentElement.offsetHeight;
			}
			
			var windowWidth, windowHeight;
			if (self.innerHeight) {
				windowWidth = self.innerWidth;
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) {
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) {
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}	
			
			if(yScroll < windowHeight){
				pageHeight = windowHeight;
			} else { 
				pageHeight = yScroll;
			}

			if(xScroll < windowWidth){	
				pageWidth = windowWidth;
			} else {
				pageWidth = xScroll;
			}

			return {
				pageWidth:pageWidth,
				pageHeight:pageHeight,
				windowWidth:windowWidth,
				windowHeight:windowHeight
			};
		},

		/*
			페이지 스크롤 좌표 구하기
			@return 스크롤 좌표값
		*/
		getPageScroll : function(){

			var xScroll, yScroll;

			if (self.pageXOffset && self.pageYOffset) {
				xScroll = self.pageXOffset;
				yScroll = self.pageYOffset;
			} else if (document.documentElement && document.documentElement.scrollTop){
				xScroll = document.documentElement.scrollLeft;
				yScroll = document.documentElement.scrollTop;
			} else if (document.body) {
				xScroll = document.body.scrollLeft;
				yScroll = document.body.scrollTop;
			}

			return {
				left:xScroll,
				top:yScroll
			};
		},

		/*
			해당 객체와 겹치는 객체를 hidden 한다. 
			(IE6버그인 div객체위로 select 객체가 위로 튀어나오는 문제를 해결 할때 사용한다.)
			@return void
		*/
		hideOverlapElement : function(obj, targetSelector) {
			obj = $(obj);
			var uniq = (new Date()).getMilliseconds();
			obj.attr("overlapHide",uniq);
			
			var innerObj = obj.find(targetSelector);
			var targetObj = $("body").find(targetSelector);
			
			// 레이어 좌표
			var ly_left  = obj.position().left;
			var ly_top    = obj.offset().top;
			var ly_right  = obj.offset().left + obj.width();
			var ly_bottom = obj.offset().top + obj.height();

			// 셀렉트박스의 좌표
			var el;

			targetObj.each(function(i, node) {
				node = $(node);
				var checkSame = false;
				
				innerObj.each(function(z, node) {
					if(node == node) {
						checkSame = true;
						return false;
					}
				});
				
				if(!checkSame) {
					var el_left  = node.offset().left;
					var el_top    = node.offset().top;
					var el_right  = node.offset().left + $(node).width();
					var el_bottom = node.offset().top + $(node).height();
	
					// 좌표를 따져 레이어가 셀렉트 박스를 침범했으면 셀렉트 박스를 hidden 시킴
					if ( (el_left >= ly_left && el_top >= ly_top && el_left <= ly_right && el_top <= ly_bottom) ||
						(el_right >= ly_left && el_right <= ly_right && el_top >= ly_top && el_top <= ly_bottom) ||
						(el_left >= ly_left && el_bottom >= ly_top && el_right <= ly_right && el_bottom <= ly_bottom) ||
						(el_left >= ly_left && el_left <= ly_right && el_bottom >= ly_top && el_bottom <= ly_bottom) ) {
						
						node.css('visibility','hidden');
						node.addClass("overlapHide"+uniq);
					}
						
				}
			});
		},
		
		/*
			숫자에  ,(Comma) 추가
			@param str comma 추가될 값 
			@return String comma가 추가 된 값 
		*/
		insertComma : function (str) {
			var comval = "";
			var rstr = "";
			
			str = this.removeComma(str);
			
			for ( i = 0 ; i < str.length ; i++ ) {
				if ( i != 0 && i%3 == 0 ) {
					comval += ",";
				}
				comval += str.charAt(str.length-(i+1));
			}

			for ( i = 0 ; i < comval.length; i++ ) {
				rstr += comval.charAt(comval.length-(i+1));
			}
			return rstr;
		},

		/*
			숫자에서  ,(Comma) 제거
			@param str comma 제거될 값 
			@return String comma가 제거 된 값 
		*/
		removeComma  : function (str) {
			var rstr = "";
			if (str.length > 0) {
				for (i = 0; i < str.length; i++) {
					var ch = str.charAt(i);
					if (ch != ',') rstr += ch;
				}
			}
			return rstr;
		},
		
		/*
			쿠키를 생성한다 (활성주기는 일단위로 설정)
			@param String cookieName (쿠키명)
			@param String value (쿠키값)
			@param int expiredays (활성일수)
			@return void
		*/
		setCookie : function ( cookieName, value, expiredays ){
			var todayDate = new Date();
			var expireSeconds = expiredays * 60 * 60 * 24;
			todayDate.setSeconds( todayDate.getDate() + expireSeconds );
			var cookieTxt = cookieName + "=" + escape( value ) + "; path=/; ";
			if(!!expiredays) cookieTxt += "expires=" + todayDate.toGMTString() + ";";
			document.cookie = cookieTxt;
		},

		/*
			hideOverlapElement에서 hidden 한 객체를 다시 visible 한다.
			@return void
		*/
		showOverlapElement : function(obj, targetSelector) {
			var uniq = $(obj).attr('overlapHide');
			$(targetSelector+'.overlapHide'+uniq).css('visibility','visible');
		},
			
		/*
			문자열에서 앞뒤 공백 제거 , return 공백 제거된 문자열
			@param value
			@return String
		*/
		trim : function (value) {
			return new String(value).replace(/\s/g, "");
		}
		
	};
})(jQuery);