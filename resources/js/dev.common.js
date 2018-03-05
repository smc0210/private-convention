
// 월, 일 0 삽입 ex) 01, 05, 09
function leadingZeros(n, digits){
	var zero = '';
	n = n.toString();
	
	if(n.length < digits){
	  for(var i = 0; i < digits - n.length; i++)
	    zero += '0';
	}
	return zero + n;
}

// 팝업
function openWinPopup(url, id, wid, hei, left, top, scrolltag){
	window.open(url, id, "width="+wid+",height="+hei+",left="+left+",top="+top+",scrollbars="+scrolltag);
}

// jquery calendar popup
function setCalendar(target, ico){
    //set calendar
    $(target).datepicker({
        datepicker : true,
        dateFormat : 'yymmdd',
        prevText: '이전달',
        nextText: '다음달',
        curruntText: '오늘',
        closeText: '닫기',
        showOn: "button",
        showOtherMonths: true,
        buttonImage: ico,
        buttonImageOnly: true,
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        //yearSuffix : '년',
        showMonthAfterYear: true,
        changeYear: true,
        changeMonth: true,
        showButtonPanel: false
    });
}

//체크박스 전체 선택/해제
function doCheckboxAll(chk){
	if($("#total").is(":checked")) {
		for(var i=0; i < $('input[name="'+chk+'[]"]').length; i++) {
			if($('input[name="'+chk+'[]"]').eq(i).is(':disabled') == false) {
				$('input[name="'+chk+'[]"]').eq(i).prop({checked: true});
			}
		}
	} else {
		$('input[name="'+chk+'[]"]').prop({checked: false});
	}
}

//리스트에서 체크박스 선택 후 다중 삭제
function doListCheckDelete(chk, url){
	
	var checkObj = $('input[name="'+chk+'[]"]');
	
	if (!checkObj.is(":checked")) {
		alert("1개 이상 선택하셔야 합니다.");
	} else {
		if (confirm("정말로 삭제하시겠습니까?")) {
			for (var i = 0; i < checkObj.length; i++) {
				if (checkObj.eq(i).is(":checked")) {
					$.ajax({
						type:"POST",
						url:url,
						data:{
							'deleteSeq' : checkObj.eq(i)[0].id, 
							'cmd' : "d"
						},
						success:function(data){
						}
					});
				}
			}
			alert("선택하신 데이터가 삭제되었습니다."); 
			location.reload();
		}
	}
}



