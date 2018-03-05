/*
	jQurey Validate Class
*/ 
(function($) {
	
	$Validate = {
		
		// 공백값 체크
		isNull : function(value) {
			return value == "" ? true : false;
		},
		
		//아이디 패턴검사 (영문소문자/숫자 조합 min~max자리면 "TRUE", 아니면 "FALSE")
		isUserId : function(value, min, max) {
			var filter = new RegExp('^[a-z][a-z\\d]{'+(min-1)+','+max+'}$');	//첫글자는 반드시 영문자
			//var filter = new RegExp('^[a-z0-9]{'+(min-1)+','+max+'}$');			//첫글자 구분안함
			var filter2 = new RegExp('[a-z]+');
			var filter3 = new RegExp('\\d+');
			//return (filter.test(value) && filter2.test(value) && filter3.test(value));
			return (filter.test(value) && this.isWord(value));
		},

        // 비밀번호 패턴검사 (영문소문자/숫자 조합 min~max자리면 "TRUE", 아니면 "FALSE")
        isUserPw : function(value, min, max) {
            var filter = new RegExp('^[a-z\\d\!@#$%^&*(){}\\[\\]\\-_+=><?`~//:;\'"]{'+(min)+','+max+'}$');
            var filter2 = new RegExp('[a-z]+');
            var filter3 = new RegExp('\\d+');
			var filter4= new RegExp('[\!@#$%^&*(){}\\[\\]\\-_+=><?`~//:;\'"]+');

            return (filter.test(value) && filter2.test(value));
        },
		
		//이메일 패턴검사 (이메일주소면 "TRUE", 아니면 "FALSE")
		isEmail : function(value) {
			var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return (filter.test(value)) ?  true : false;
		},

        // 사업자등록번호 패턴검사 (숫자 조합 min~max자리면 "TRUE", 아니면 "FALSE")
        isCorp : function(value, min, max) {
            var filter = new RegExp('^[\\d]{'+(min-1)+','+max+'}$');
            return ((filter.test(value)));
        },
		
		// 한글만 유효 검사 (한글만 포함되어 잇으면 "TRUE", 다른 문자가 폼함되어 있으면 "FALSE")
		isKorean : function(value) {
			var filter=/^[ㄱ-힣]+$/;
			return (filter.test(value)) ?  true : false;
		},
		
		// 알파벳만 유효 검사 (알파벳만 포함되어 잇으면 "TRUE", 다른 문자가 폼함되어 있으면 "FALSE")
		isAlphabet : function(value) {
			var filter=/^[a-zA-Z]+$/;
			return (filter.test(value)) ?  true : false;
		},
		
		// 숫자만 유효 검사 (숫자만 포함되어 잇으면 "TRUE", 다른 문자가 폼함되어 있으면 "FALSE")
		isNumber : function(value) {
			var filter=/^[\d]+$/;
			return (filter.test(value)) ?  true : false;
		},
		
		// 날짜 유효 검사 (날짜형식(YYYY-MM-DD) "TRUE", 아니면 "FALSE")
		isDate : function(value, delimiter) {
			delimiter = delimiter || '';
			if(delimiter == '-') delimiter = '\\'+delimiter;
			var filter = new RegExp('^[\\d]{4}'+delimiter+'[\\d]{2}'+delimiter+'[\\d]{2}$');
			return (filter.test(value)) ?  true : false;
		},
		
		// 전화번호형식 유효 검사 (000-0000-0000 이면 "TRUE", 아니면 "FALSE")
		isPhoneNumber : function(value) {
			var filter=/^[\d]{2,3}\-[\d]{3,4}\-[\d]{4}$/;
			return (filter.test(value)) ?  true : false;
		},
		
		// 우편번호 형식 유효 검사 (날짜형식(YYYY-MM-DD) "TRUE", 아니면 "FALSE")
		isZipcode : function(value, delimiter) {
			delimiter = delimiter || '';
			if(delimiter == '-') delimiter = '\\'+delimiter;
			var filter = new RegExp('^[\\d]{3}'+delimiter+'[\\d]{3}$');
			return (filter.test(value)) ?  true : false;
		},
		
		// 알파벳/숫자만 유효 검사 (알파벳과 숫자만 포함되어 잇으면 "TRUE", 다른 문자가 폼함되어 있으면 "FALSE")
		isWord : function(value) {
			var filter=/^[\w]+$/;
			return (filter.test(value)) ?  true : false;
		},
		
		// 숫자에 ,와 . 만 허용
		isMoney : function(value) {
			var filter=/^[\d,.]+$/;
			return (filter.test(value)) ?  true : false;
		},
		
		// 주민등록번호 유효 검사 (주민등록번호면 "TRUE", 아니면 "FALSE")
		isSSN : function(value) {
			var ssn = value.replace("-","");
			var filter = /^[\d]{6}[1234][\d]{6}$/;
			if(!filter.test(ssn)) return false;
		
			var sex = parseInt(ssn.substr(6,1),10);
			var yy  = parseInt(sex > 2 ? "20"+ssn.substr(0,2) : "19"+ssn.substr(0,2),10);
			var mm  = parseInt(ssn.substr(2,2),10);
			var dd  = parseInt(ssn.substr(4,2),10);
			if(yy < 1900 || yy > 2100 || mm < 1 || mm > 12 || dd < 1 || dd > 31) return false;
			
			var chk = 0;
			for(var i = 0; i <=11; i++){
				chk = chk + (((i % 8) + 2) * parseInt(ssn.substring(i, i + 1),10));
			}
			
			return ((11 - (chk % 11)) % 10) == ssn.substr(12,1) ? true : false;
		},
		
		// 외국인등록번호 유효 검사 (주민등록번호면 "TRUE", 아니면 "FALSE")
		isFGN : function(value) {
			var ssn = value.replace("-","");
			var filter = /^[\d]{6}[5678][\d]{6}$/;
			if(!filter.test(ssn)) return false;
		
			var sum = 0;
			var odd = 0;
			var buf = new Array(13);
		
			for(i = 0; i < 13; i++) {
				buf[i] = parseInt(ssn.charAt(i));
			}
		
			odd = buf[7]*10 + buf[8];
			if(odd%2 != 0) return false;
			if((buf[11] != 6)&&(buf[11] != 7)&&(buf[11] != 8)&&(buf[11] != 9)) return false;
		
			multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
		
			for (i = 0, sum = 0; i < 12; i++){
				sum += (buf[i] *= multipliers[i]);
			}
		
			sum = 11-(sum%11);
			if(sum >= 10) sum -= 10;
			sum += 2;
			if(sum >= 10) sum -= 10;
			return (sum == buf[12]) ? true : false ;
		},
		
		// 이미지파일 유효 검사 (이미지면 "TRUE", 아니면 "FALSE")
		isImageFile : function(value) {
			value = value.substr(value.lastIndexOf("\\")+1);
			var filter=/\.(jpg|gif|png|bmp)$/i;
			return (filter.test(value)) ?  true : false;
		},
		
		// 실행파일인지 검사 (실행파일이면 "TRUE", 실행파일이 아니면 "FALSE")
		isExeFile : function(value) {
			value = value.substr(value.lastIndexOf("\\")+1);
			var filter=/\.(asp|jsp|php|cgi|exe|sh|class)$/i;
			return (filter.test(value)) ?  true : false;
		},
		
		// 엑셀파일인지 검사 (엑셀파일이면 "TRUE", 실행파일이 아니면 "FALSE")
		isExcelFile : function(value) {
			value = value.substr(value.lastIndexOf("\\")+1);
			var filter=/\.(xls|xlsx)$/i;
			//var filter=/\.(xls)$/i;
			return (filter.test(value)) ?  true : false;
		},

		// 텍스트파일인지 검사 (텍스트파일이면 "TRUE", 실행파일이 아니면 "FALSE")
		isTextFile : function(value) {
			value = value.substr(value.lastIndexOf("\\")+1);
			var filter=/\.(txt)$/i;
			return (filter.test(value)) ?  true : false;
		},

		// 특수문자 입력 검사 (특수문자가 포함되어 있지 않으면 "TRUE", 포함되어 잇으면 "FALSE")
		checkSpecialChar : function(value) {
			var filter= new RegExp("[#/:;'\"]");
			var filter2=/[\-]{2}/;
			return (!filter.test(value) && !filter2.test(value)) ?  true : false;
		},

		// 아이피 입력 검사
		// var filter = /^((0x[\dA-F]{2}|0[1-3]?[0-7]{1,3}|1?\d{1,2}|2[0-4]\d|25[0-5])(\.(?!$)|$)){4}$/;
		
		// 문자열 길이 검사 (문자열의 길이가 넘지 않으면 "TRUE", 넘으면 "FALSE")
		checkLength : function(value, min, max) {
			if(!!min && !!max) 
				return (value.length >= min && value.length <= max);
			else if(!!min)
				return (value.length >= min);
			else if(!!max)
				return (value.length <= max);
		},
		
		// 숫자/문자 범위 검사 (숫자범위가 넘지 않으면 "TRUE", 넘으면 "FALSE")
		checkRange : function(value, min, max) {
			if(!!min && !!max) 
				return (value >= min && value <= max);
			else if(!!min)
				return (value >= min);
			else if(!!max)
				return (value <= max);
		}
	};
})(jQuery);