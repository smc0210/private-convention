/*
	jQurey Form Class
*/ 
(function($) {
	   
	$Form = function (formName, opt) {

		var form, 
			methods = {},
			entryInspector = [],
			options = {
				autoValidate : true,
				success : function() {}
			}
			optionsField = {
				require : true,
				minLength : undefined,
				maxLength : undefined,
				message : undefined, 
				filter : function() {return true;}
			},
			ignoresRequireCheck = ["fck", "ck"],
			ignoresLengthCheck = ["ssn","attachFile","attachImage","userId","userPw"];
	
		init();
		
		// 클래스 생성자 함수
		function init() {
			$.extend(options, opt || {});
			form = $('form[name="'+formName+'"]').get(0);
			$(form).submit(_submit);
		}

		// validate 및 ajaxSubmit 처리 
		function _submit() {
			if(options.autoValidate) {
				if(!validate()) {
					return false;
				}
			}
			return true;
		}

		// 검사할 Input을 등록한다. 	
		function setInspector(type, name, text, option) {
			var params = { type:type, name:name, text:text, option:option};
			entryInspector.push(params);
		}

		// 해당폼내에 등록된 Input의 값을 검사한다.
		function validate() {
			try {
				var result = true;
				$.each(entryInspector, function(i, params) {
					var _option = $.extend({}, optionsField, params.option);
					
					params.option = _option;
					
					// 1. filter check
					var _filted = true;
					if(typeof _option.filter == "function") _filted = _option.filter(form);
					
					if(_filted) {
						
						// 2. required check
						if(!_option.require
								&& $.inArray(params.type,ignoresRequireCheck) < 0) {
							if($.isArray(params.name)) {
								var _break = true;
								for(i=0; i < params.name.length; i++) {
									var _params = $.extend({}, params, {name:params.name[i]});
									if(!$_FormInspector.require(form,_params)) {
										_break = false;
										break;
									}
								}
								if(_break) {
									result = true;
									return result;
								}
							}
						}
						
						// 2.1 name이 배열로 넘어올경우 각각 타입에 맞게 체크해 준다.
						if($.inArray(params.type,ignoresRequireCheck) < 0) {
							if($.isArray(params.name)) {
								for(i=0; i < params.name.length; i++) {
									var _params = $.extend({}, params, {name:params.name[i]});
									if(!$_FormInspector.require(form,_params)) {
										result = !_option.require;
										return result;
										break;
									}
								}
							} else {
								if(!$_FormInspector.require(form,params)) {
									result = !_option.require;
									return result;
								}
							}
						}
						
						// 3. length check
						if((!!_option.minLength || !!_option.maxLength) 
								&& $.inArray(params.type,ignoresLengthCheck) < 0) {
							if(!$_FormInspector.charLength(form,params)) {
								result = false;
								return result;
							}
						}

						// 4. default inspect
						result = $_FormInspector[params.type](form,params);
					}
					return result;
				});
				return result;
				
			} catch(e) {
				if(!!console) console.error(e);
				//alert("Javascript Error \n" + e.message);
				return false;
			}
		}

		// 소스상에서 submit을 처리하기 위한 함수
		function submit() {
			form.submit();
		}
		
		// 소스상에서 validate 후 submit을 처리하기 위한 함수
		function validateSubmit() {
			if(_submit()) {
				form.submit();
			}
		}

		// controller method 화 
		$.each($_FormContoller, function(controllerName, func) {
			methods[controllerName] = function(name, text, params) {
				var _option = $.extend({}, optionsField, params || {});
				if($_FormInspector[controllerName]) {
					var _option = $.extend({}, optionsField, params);
					if(!!_option.maxLength 
							&& !$.isArray(name) 
							&& $.inArray(controllerName, ignoresLengthCheck) < 0)
						$(form[name]).attr('maxLength', _option.maxLength);
					
					setInspector(controllerName, name, text, _option);
				}
				
				$_FormContoller[controllerName](form, name, text, _option);
			};
		});

		// inspector method 화 
		$.each($_FormInspector, function(inspectorName, func) {
			if(!$_FormContoller[inspectorName]) {
				methods[inspectorName] = function(name, text, params) {
					var _option = $.extend({}, optionsField, params);
					if(!!_option.maxLength 
							&& !$.isArray(name) 
							&& $.inArray(inspectorName, ignoresLengthCheck) < 0)
						$(form[name]).attr('maxLength', _option.maxLength);

					setInspector(inspectorName, name, text, _option);
				};
			}
		});

		methods.validate = validate;
		methods.submit = submit;
		methods.validateSubmit = validateSubmit;
		methods.element = form;
		return methods;
	};
	
	// inspector 내에서 alert을 띄우는 함수
	$_FormMsg = function(input,text) {
		alert(text);
		if(input.focus && input.type != 'hidden' 
			&& !input.disabled && input.style.display != 'none') input.focus();
	};

	// field 에 validate 하는 함수
	$_FormInspector = {
		
		// 영문 알파벳으로만 입력가능
		alphabet : function(form, params) { 
			var input = form[params.name];
			if(!$Validate.isAlphabet(input.value)) {
				$_FormMsg(input, 
							params.option.message 
							|| (params.text + $Util.getAux(params.text,'은'))+" 영문 알파벳으로만 입력해 주세요.");
				return false;
			}
			return true;
		},
			
		// file 타입의 확장자가 실행파일인지 검사
		attachFile : function(form, params) { 
			var input = form[params.name];
			if($Validate.isExeFile(input.value)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text + $Util.getAux(params.text,'이') +' 첨부가 허용되지않는 확장자이거나, 파일명에 특수문자가 포함되어 있습니다.');
				return false;
			}
			return true;
		},
		
		// file 타입의 확장자가 엑셀/텍스트파일인지 검사
		attachExcelFile : function(form, params) { 
			var input = form[params.name];
			if(!$Validate.isExcelFile(input.value) && !$Validate.isTextFile(input.value)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text + $Util.getAux(params.text,'이') +' 허용되지않는 파일이거나, 파일명에 특수문자가 포함되어 있습니다.\n* 첨부 가능한 파일 : 엑셀파일(xls, xlsx), 텍스트파일(txt)');
				return false;
			}
			return true;
		},
			
		// file 타입의 확장자가 이미지 파일인지를 검사.
		attachImage : function(form, params) { 
			var input = form[params.name];
			if(!$Validate.isImageFile(input.value)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text + $Util.getAux(params.text,'이') +' 이미지 파일이 아니거나, 파일명에 특수문자가 포함되어 있습니다.');
				return false;
			}
			return true;
		},
	
		// 이메일 유효성 검사
		email : function(form, params) {
			var input = new Array();
			var value = '';

			if($.isArray(params.name)) {
				for (i = 0; i < 2; i++) {
					input[input.length] = form[params.name[i]];
					value += (i==1?'@':'') + input[input.length-1].value;
				}
			} else {
				input[0] = form[params.name];
				value = input[0].value;
			}
	
			if(!$Validate.isEmail(value)) {
				$_FormMsg(input[0], 
						params.option.message 
						|| '유효하지 않은 이메일 주소입니다. 다시한번 정확히 입력하세요.');
				return false;
			}
		
			return true;
		},
	
		// FCKEditor 타입의 공백체크
		fck : function(form, params) {
			var oEditor = FCKeditorAPI.GetInstance(params.name);
			if($Util.trim(oEditor.GetXHTML()) == '' || $Util.trim(oEditor.GetXHTML()) == '<br/>') {
				$_FormMsg(oEditor, 
						params.option.message 
						|| params.text + $Util.getAux(params.text,'을') +' 입력하세요.');
				oEditor.Focus();
				return false;
			}
			return true;
		},

		// CKEditor 타입의 공백체크
		ck : function(form, params) {
			var oEditor = CKEDITOR.instances[params.name];
			if($Util.trim(oEditor.getData()) == '' || $Util.trim(oEditor.getData()) == '<br/>') {
				$_FormMsg(params.name, 
						params.option.message 
						|| params.text + $Util.getAux(params.text,'을') +' 입력하세요.');
				oEditor.focus();
				return false;
			}
		
			return true;
		},
		
		// 필수 입력 검사
		require : function(form,params) {
			var name = $.isArray(params.name) ? params.name[0] : params.name;
			var input = form[name].tagName ? form[name] : form[name][0];
			var type = input.tagName == 'INPUT' ? input.type : input.tagName;
			switch(type.toUpperCase()) {
				case 'SELECT' :
					var input = form[params.name];
					if ($Validate.isNull(input.options[input.options.selectedIndex].value)) {
						if(params.option.require)
							$_FormMsg(input,
										params.option.message
										||params.text + $Util.getAux(params.text,'을') +' 선택하세요.');
						return false;
					}
					return true;
				break;

				case 'RADIO' :
					var input = form[params.name];
						if(input.length > 1) {
							for (i = 0; i < input.length; i++) {
								if (input[i].checked) return true;
							}
						} else {
							if (input.checked) return true;
						}
						if(params.option.require)
							$_FormMsg((input[0]||input),
								params.option.message
								||params.text + $Util.getAux(params.text,'을') +' 선택하세요.');
						return false;
				break;

				case 'CHECKBOX' :
					var input = [];
						if($.isArray(params.name)) {
							for (i = 0; i < params.name.length; i++) {
								input[input.length] = form[params.name[i]];
							}
						} else {
							if(form[params.name].length > 1) {
								input = form[params.name];
							} else {
								input[0] = form[params.name];
							}
						}

						for(i=0;i<input.length;i++) if(input[i].checked) return true;
						if(params.option.require)
							$_FormMsg(input[0],
								params.option.message
								||params.text + $Util.getAux(params.text,'을') +' 선택하세요.');
						return false;
				break;

				case 'FILE' :
					if($.isArray(params.name)) {
						for (i = 0; i < 2; i++) {
							var input = form[params.name[i]];
							if ($Validate.isNull(input.value)) {
								if(params.option.require)
									$_FormMsg(input,
										params.option.message
										||params.text + $Util.getAux(params.text,'을') +(i!=0?' 정확히':'')+' 입력하세요.');
								return false;
							}
						}
					} else {
						var input = form[params.name];
						if ($Validate.isNull(input.value)) {
							if(params.option.require)
								$_FormMsg(input,
									params.option.message
									||params.text + $Util.getAux(params.text,'을') +' 선택하세요.');
							return false;
						}
					}
					return true;
				break;

				default :
					if($.isArray(params.name)) {
						for (i = 0; i < 2; i++) {
							var input = form[params.name[i]];
							if ($Validate.isNull(input.value)) {
								if(params.option.require)
									$_FormMsg(input,
										params.option.message
										||params.text + $Util.getAux(params.text,'을') +(i!=0?' 정확히':'')+' 입력하세요.');
								return false;
							}
						}
					} else {
						var input = form[params.name];
						if ($Validate.isNull(input.value)) {
							if(params.option.require)
								$_FormMsg(input,
									params.option.message
									||params.text + $Util.getAux(params.text,'을') +' 입력하세요.');
							return false;
						}
					}
					return true;
			}
		},
	
		// 한글로만 입력가능
		korean : function(form, params) { 
			var input = form[params.name];
			if(!$Validate.isKorean(input.value)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text + $Util.getAux(params.text,'은') +' 한글로만 입력해 주세요.');
				return false;
			}
			return true;
		},
	
		// 3자리마다 ','가 들어가는 숫자만 입력가능
		money : function(form,params) {
			var option = $.extend({
				minRange : undefined,
				maxRange : undefined
			}, params.option);
			var input = form[params.name];
			
			var minRange = !!option.minRange ? $Util.removeComma(option.minRange) : option.minRange;
			var maxRange = !!option.maxRange ? $Util.removeComma(option.maxRange) : option.maxRange;
			var value = $Util.removeComma(input.value);
			if(isFinite(minRange) || isFinite(maxRange)) {
				if(!$Validate.checkRange(value, 
								isFinite(minRange)?minRange:Number.MIN_VALUE, 
								isFinite(maxRange)?maxRange:Number.MAX_VALUE)) {
					var msg = params.text + $Util.getAux(params.text,'은') +' ';
					if(isFinite(minRange) && isFinite(maxRange))
						msg += minRange+' ~ '+maxRange+' 사이로 입력하세요.';
					else if(isFinite(minRange)) 
						msg += minRange+' 이상의 수로 입력하세요.';
					else if(isFinite(maxRange))
						msg += maxRange+' 이하의 수로 입력하세요.';
					
					$_FormMsg(input, params.option.message || msg);
					return false;
				}
			}
			
			if(!$Validate.isMoney(input.value)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text + $Util.getAux(params.text,'은') +' 숫자와 자릿수 구분(,)만 입력해 주세요.');
				return false;
			}
			
			return true;
		},
	
		// 숫자입력 검사
		number : function(form,params) {
			var option = $.extend({
				minRange : undefined,
				maxRange : undefined
			}, params.option);
			var input = form[params.name];
			
			if(isFinite(option.minRange) || isFinite(option.maxRange)) {
				if(!$Validate.checkRange(input.value, 
								isFinite(option.minRange)?option.minRange:Number.MIN_VALUE, 
								isFinite(option.maxRange)?option.maxRange:Number.MAX_VALUE)) {
					var msg = params.text + $Util.getAux(params.text,'은') +' ';
					if(isFinite(option.minRange) && isFinite(option.maxRange))
						msg += option.minRange+' ~ '+option.maxRange+' 사이로 입력하세요.';
					else if(isFinite(option.minRange)) 
						msg += option.minRange+' 이상의 수로 입력하세요.';
					else if(isFinite(option.maxRange))
						msg += option.maxRange+' 이하의 수로 입력하세요.';
					
					$_FormMsg(input, params.option.message || msg);
					return false;
				}
			}
			
			if(!$Validate.isNumber(input.value)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text + $Util.getAux(params.text,'은') +' 숫자로만 입력해 주세요.');
				return false;
			}
			
			return true;
		},
		
		// 문자열 길이 검사
		charLength : function(form,params) {
			var option = params.option;
			var input = form[params.name];
			if(!$Validate.checkLength(input.value, option.minLength, option.maxLength)) {
				var msg = params.text + $Util.getAux(params.text,'은') +' ';
				if(!!option.minLength && !!option.maxLength)
					msg += option.minLength+'자 ~ '+option.maxLength+'자 사이로 입력하세요.';
				else if(!!option.minLength) 
					msg += option.minLength+'자 이상 입력하세요.';
				else if(!!option.maxRange)
					msg += option.maxLength+'자 이하로 입력하세요.';
				
				$_FormMsg(input, params.option.message || msg);
				return false;
			}
			return true;
		},
	
		// 특수문자 유효성 검사
		specialChar : function(form,params) {
			var input = form[params.name];
			if(!$Validate.checkSpecialChar(input.value)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text +'에 허용되지않는 특수문자가 포함되어있습니다.');
				return false;
			}
			return true;
		},
	
		// 주민번호 유효성 검사 (주민등록번호이거나 외국인 번호면 TRUE 아니면 FALSE)
		ssn : function(form,params) {
			var input = [];
			var value = '';
			if($.isArray(params.name)) {
				for (i = 0; i < 2; i++) {
					input.push(form[params.name[i]]);
					value += form[params.name[i]].value;
				}
			} else {
				input.push(form[params.name]);
				value = form[params.name].value;
			}
			
			if(!$Validate.isSSN(value) && !$Validate.isFGN(value)) {
				$_FormMsg(input[0], 
						params.option.message 
						|| params.text + $Util.getAux(params.text,'이') + ' 형식에 유효하지 않습니다. 다시한번 정확히 입력하세요.\n');
				return false;
			}
		
			return true;
		},
	
		// 회원아이디 유효성 검사
		userId : function(form,params) {
			var input = form[params.name];
			var min = params.option.minLength || 8;
			var max = params.option.maxLength || 12;
			if(!$Validate.isUserId(input.value,min,max)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text + $Util.getAux(params.text,'이') 
							+' 유효하지 않습니다.\n영문 소문자로 시작하는 숫자 조합의 문자를 '+min+'~'+max+'자 이내로 입력하세요.');
				return false;
			}
			return true;
		},
	
		// 비밀번호 유효성 검사
		userPw : function(form,params) {
			var option = $.extend({
				compare : null
			}, params.option);
			var input = form[params.name];
			var min = params.option.minLength || 6;
			var max = params.option.maxLength || 15;
			if(!$Validate.isUserPw(input.value,min,max)) {
				$_FormMsg(input, 
						params.option.message 
						||params.text + $Util.getAux(params.text,'이') +' 유효하지 않습니다.\n영문소문자와 숫자 조합 '+min+'~'+max+'자 이내로 입력하세요.');
				return false;
			}
			if(!!option.compare) {
				if(input.value != form[option.compare].value) {
					$_FormMsg(form[option.compare],params.text + $Util.getAux(params.text,'이') +' 동일하지 않습니다.\n다시 한번 정확히 입력하세요.');
					return false;
				}
			}
			return true;
		}, 
		
		// 전화번호 체크
		phone : function(form,params) {
			var input = [];
			var value = '';
			if($.isArray(params.name)) {
				for (i = 0; i < 3; i++) {
					input.push(form[params.name[i]]);
					value += (i!=0?"-":"")+form[params.name[i]].value;
				}
			} else {
				input.push(form[params.name]);
				value = form[params.name].value;
			}
			
			if(!$Validate.isPhoneNumber(value)) {
				$_FormMsg(input[0], 
						params.option.message 
						||params.text + $Util.getAux(params.text,'이') + ' 형식에 유효하지 않습니다. 다시한번 정확히 입력하세요.\n※예) 000-0000-0000');
				return false;
			}
			
			return true;
		}, 
		
		// 우편번호 체크
		zipcode : function(form,params) {
			var input = [];
			var value = '';
			if($.isArray(params.name)) {
				for (i = 0; i < 2; i++) {
					input.push(form[params.name[i]]);
					value += (i!=0?"-":"")+form[params.name[i]].value;
				}
			} else {
				input.push(form[params.name]);
				value = form[params.name].value;
			}
			
			if(!$Validate.isZipcode(value, '-')) {
				$_FormMsg(input[0], 
						params.option.message 
						||params.text + $Util.getAux(params.text,'이') + ' 형식에 유효하지 않습니다. 다시한번 정확히 입력하세요.\n※예) 000-000');
				return false;
			}
			
			return true;
		}
	};


	// field 에 자동 기능 속성을 셋팅하는 함수
	$_FormContoller = {
		// 숫자만 입력가능하게
		number : function(form, name, text, params) {
			$(form[name]).keydown(function(e) {
				var key = e.keyCode;
				if ((key >= 48 && key <= 57) // 키보드 상단 숫자키
						|| (key >= 96 && key <= 105) // 키패드 숫자키
						|| $.inArray(key, [8,37,39,46,13,9]) >= 0)
					return true;
				else 
					return false;
			});
		},
		
		// 배열 순서에 맞춰 자동으로 focus 이동
		autoFocus : function(form, name, text, params) {
			var arrLength = name.length;
			$(name).each(function(index, node) {
				var nextNode = form[name[index+1]];
				var prevNode = form[name[index-1]];
				var type = form[node].tagName == 'INPUT' ? form[node].type : form[node].tagName;
				if(type.toUpperCase() == "TEXT") {
					if(nextNode && !!$(form[node]).attr('maxLength')) {
						$(form[node]).keyup(function(e) {
							var key = e.keyCode;
							var obj = e.srcElement; 
							if(obj.value.length >=  $(obj).attr('maxLength')
									&& $.inArray(key, [0,8,9,16,17,18,37,38,39,40,46]) < 0) {
								nextNode.focus();
							}
						});
					}
					
					if(prevNode) {
						$(form[node]).keydown(function(e) {
							var key = e.keyCode;
							var obj = e.srcElement; 
							if(obj.value.length == 0 && key == 8){
								prevNode.focus();
								return false;
							}
						});
					}
				} else if(type.toUpperCase() == "SELECT") {
					$(form[node]).change(function(e){
						nextNode.focus();
					}); 
				}
			});
		},
		
		// 주민등록번호 자동 속성 부여
		ssn : function(form, name, text, params) {
			if($.isArray(name)) {
				$(name).each(function(index, node){
					$(form[node]).attr('maxLength',(index == 0?6:7));
					$_FormContoller.number(form, node, text, params);
				});
				$_FormContoller.autoFocus(form, name, text, params);
			} else {
				$(form[name]).attr('maxLength', params.maxLength || 13);
				$_FormContoller.number(form, name, text, params);
			}
		},
		
		// 전화번호 속성 자동 부여
		phone : function(form, name, text, params) {
			if($.isArray(name)) {
				$(name).each(function(index, node){
					$(form[node]).attr('maxLength',(index == 0?3:4));
					$_FormContoller.number(form, node, text, params);
				});
				$_FormContoller.autoFocus(form, name, text, params);
			} else {
				$(form[name]).attr('maxLength', params.maxLength || 13);
				$(form[name]).keydown(function(e) {
					var key = e.keyCode;
					if ((key >= 48 && key <= 57) // 키보드 상단 숫자키
							|| (key >= 96 && key <= 105) // 키패드 숫자키
							|| $.inArray(key, [8,37,39,46,13,9,187,189,109]) >= 0)
						return true;
					else 
						return false;
				});
			}
		},
		
		// 우편번호 속성 자동 부여
		zipcode : function(form, name, text, params) {
			if($.isArray(name)) {
				$(name).each(function(index, node){
					$(form[node]).attr('maxLength',3);
					$_FormContoller.number(form, node, text, params);
				});
				$_FormContoller.autoFocus(form, name, text, params);
			} else {
				$(form[name]).attr('maxLength', params.maxLength || 7);
				$(form[name]).keydown(function(e) {
					var key = e.keyCode;
					if ((key >= 48 && key <= 57) // 키보드 상단 숫자키
							|| (key >= 96 && key <= 105) // 키패드 숫자키
							|| $.inArray(key, [8,37,39,46,13,9,189,109]) >= 0)
						return true;
					else 
						return false;
				});
			}
		},
		
		// 자릿수(,) 포함한 숫자 (, 자동 부여)
		money : function(form, name, text, params) { 
			$(form[name]).keydown(function(e) {
				var key = e.keyCode;
				if ((key >= 48 && key <= 57) // 키보드 상단 숫자키
						|| (key >= 96 && key <= 105) // 키패드 숫자키
						|| $.inArray(key, [8,37,39,46,13,9]) >= 0) 
					return true;
				else 
					return false;
			});
			
			$(form[name]).keyup(function(e) {
				form[name].value = $Util.insertComma(form[name].value);
			});
		},
		
		// date
		date : function(form, name, text, params) {
			var option = $.extend({
				datepicker : true,
				dateFormat : 'yy-mm-dd',
				prevText: '이전달',
				nextText: '다음달',
				changeMonth: true,
				changeYear: true,
				buttonImageOnly: true,
				showButtonPanel: false,
				curruntText: '오늘',
				closeText: '닫기',
				showButtonPanel: false,
				showMonthAfterYear: true,
				monthNamesShort : ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
				dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
			}, params);
			if(option.datepicker) $(form[name]).datepicker(option);
		}
	};
})(jQuery);