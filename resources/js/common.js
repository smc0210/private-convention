// 콘솔 출력 기능이 없는 웹브라우저에서 콘솔 로그를 피함
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // methods 배열 변수에서 정의하지 않은 남은 부분의 method 변수값 처리
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


// 추가적인 함수들은 하단부터 추가

$(function () {
	
});