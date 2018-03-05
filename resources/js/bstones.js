/**
 * ! Bstones Js v0.1 (http://bstones.co.kr)
 * Copyright 2016 Bstones.
 * @author		MCShin
 * @write		2016-03-16 
 * @modify		2016
 */

if(typeof jQuery === 'undefined'){
	throw new Error('Bstones Js는 jQuery를 필요로합니다.');
}

/**
 * Bstones Js Global Variable
 * DOM Control val
 */
var _win = $(window);
var _doc = $(document);
var _docBody = $(document.body);
var _winW = _win.width();
var _winH = _win.height();
var _docW = _doc.width();
var _docH = _doc.height();

/* ========================================================================
 * Bstones: layerpopup.js v0.2
 * http://bstones.co.kr
 * Copyright 2016 Bstones.
 * ========================================================================
 * @author    MCShin
 * @date      2016-03-22
 * @param     Object		settings
 *		dim				:	dim 처리 유무	 boolean	(default true)
 *		opacity			:	dim 투명도		 num		(default 0.8)
 *		align			:	세로정렬 타입	 String		(default center) 
 *                  	    center : 현재 보이는 화면에서 항상 중앙 (scrollTop 계산방식)
 *                     		fixed  : 현재화면에 중앙 위치에 픽스 되어 따라다니는 방식
 *      name			: 	이벤트 핸들링용  String
 *      dimHtml			: 	dim Markup       String     
 * ======================================================================== */

+function ($) {
	'use strict';

	$.fn.layerPop = function(settings){
		$.fn.layerPop.defaults = {
			dim : true,
			opacity : 0.8,
			alignType : 'center',
			name : null,
			dimHtml : '<div class=\'dim\'></div>',
		}

    	return this.each(function(){
    		var options  	    = $.extend({}, $.fn.layerPop.defaults, settings || {});
    		var $el 	        = $(this);
    		var $target    	    = $($el.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
    		var $targetLayer    = $target[0];
    		
    		var _elHeight = ($target.outerHeight())/2;
    		var _elWidth = ($target.outerWidth())/2;
   
    		
    		$($el[0]).on('click', function(){
    			
    			if(options.alignType == 'center'){
    				var _scrollY = _win.scrollTop();
    				var centerTop = Math.max(0, ((_win.height() - $target.outerHeight()) / 2) + _scrollY);
    				$('#'+$targetLayer.id).css({'display':'block', 'z-index' : 110, 'position':'absolute', 'left' : '50%', 'top' : centerTop, 'margin-left' : -_elWidth });
    			}
    			else if(options.alignType == 'top'){
    				$('#'+$targetLayer.id).css({'display':'block', 'z-index' : 110, 'position':'absolute', 'left' : '50%', 'top' : 100 , 'margin-left' : -_elWidth });
    			}
    			else if(options.alignType == 'fixed'){
    				$('#'+$targetLayer.id).css({'display':'block', 'z-index' : 110, 'position':'fixed', 'left' : '50%', 'top' : '50%' , 'margin-left' : -_elWidth, 'margin-top' : -_elHeight });
    			}
    			
    			if(options.dim == true){
    				if(!$('.dim').length > 0){
    					_docBody.append(options.dimHtml);
    				}
    				_winW = _win.width();
    				_docH = _doc.height();
    				$('.dim').css({ 'width':_winW, 'height' : _docH, 'opacity': options.opacity, 'top' : 0 , 'width' : _docW, 'height' : _docH }).show();
    			}
    		});

			$('.layer_close').on('click',function(){
				var $this = $(this);
				$('.dim').hide();
				$target.hide();
			});
    	});    	
	};

	$(window).resize(function(){
	
		var scrollH = _win.scrollTop();
		var outerH = _win.outerHeight();
		var outerW = _win.outerWidth();
	    
		$('.dim').css({'height': scrollH + outerH, 'width': outerW })
	});

}(jQuery);

/* ========================================================================
 * Bstones: touchSlider.js v0.1
 * http://bstones.co.kr
 * Copyright 2016 Bstones.
 * ========================================================================
 * @author MCShin
 * @date      2016-03-16
 * @param Object		settings	환경변수 오브젝트
 *		roll			:	순환 (default true)
 *		flexible		:	유동 레이아웃 (default true)
 *		resize			:	리사이즈 사용 (default false)
 *		view			:	다중 컬럼 (default 1)
 *		speed			:	애니메이션 속도 (default 75)
 *		range			:	넘김 판정 범위 (default 0.15)
 *		page			:	초기 페이지 (default 1)
 *		transition		:	CSS3 transition 사용 (default true)
 *		btn_prev		:	prev 버튼 (jQuery Object, default null)
 *		btn_next		:	next 버튼 (jQuery Object, default null)
 *		paging			:	page 버튼 (jQuery Object, default null)
 *		sidePage		:	사이드 페이지 사용 (default false)
 *		initComplete 	:	초기화 콜백
 *		counter			:	슬라이드 콜백, 카운터
 *		autoplay		:	자동움직임 관련 옵션 (Object)
 * ======================================================================== */

+function ($) {
	'use strict';

	$.fn.touchSlider = function (settings) {
		
		$.fn.touchSlider.defaults = {
			roll : true,
			flexible : true,
			resize : false,
			btn_prev : null,
			btn_next : null,
			paging : null,
			speed : 150,
			view : 1,
			range : 0.15,
			page : 1,
			sidePage : false,
			transition : true,
			initComplete : null,
			counter : null,
			propagation : false,
			autoplay : {
				enable : false,
				pauseHover : true,
				addHoverTarget : "",
				interval : 3500
			},
			supportsCssTransitions : (function (style) {
				var prefixes = ['Webkit','Moz','Ms'];
				for(var i=0, l=prefixes.length; i < l; i++ ) {
					if( typeof style[prefixes[i] + 'Transition'] !== 'undefined') {
						return true;
					}
				}
				return false;
			})(document.createElement('div').style)
		};
		
		var opts = $.extend(true, {}, $.fn.touchSlider.defaults, settings);
		
		return this.each(function () {
			
			var _this = this;
			
			$.fn.extend(this, touchSlider);	
			this.opts = opts;
			this.init();
			
			$(window).on("orientationchange resize", function () {
				_this.resize(_this);
			});
		});
	
	};
	
	var touchSlider = {
		
		init : function () {
			var _this = this;
			
			this._view = this.opts.view;
			this._speed = this.opts.speed;
			this._tg = $(this);
			this._list = this._tg.children().children();
			this._width = parseInt(this._tg.css("width"));
			this._item_w = parseInt(this._list.css("width"));
			this._len = this._list.length;
			this._range = this.opts.range * this._width;
			this._pos = [];
			this._start = [];
			this._startX = 0;
			this._startY = 0;
			this._left = 0;
			this._top = 0;
			this._drag = false;
			this._link = true;
			this._scroll = false;
			this._btn_prev;
			this._btn_next;
			this._timer;
			this._hover_tg = [];
			
			this._tg
					.off("touchstart", this.touchstart)
					.off("touchmove", this.touchmove)
					.off("touchend", this.touchend)
					.off("touchcancel", this.touchend)
					.off("dragstart", this.touchstart)
					.off("drag", this.touchmove)
					.off("dragend", this.touchend)
					.on("touchstart", this.touchstart)
					.on("touchmove", this.touchmove)
					.on("touchend", this.touchend)
					.on("touchcancel", this.touchend)
					.on("dragstart", this.touchstart)
					.on("drag", this.touchmove)
					.on("dragend", this.touchend);
			
			this._tg.children().css({
				"width":this._width + "px",
				"overflow":"visible"
			});
			
			if(this.opts.flexible) this._item_w = this._width / this._view;
			
			if(this.opts.roll) {
				if(this._len % this._view > 0) {
					var blank = $(document.createElement(this._list.eq(0).prop("tagName"))).hide();
					var cnt = this._view - (this._len % this._view);
					for(var i=0; i<cnt; ++i) {
						this._list.parent().append(blank.clone());
					}
				}
				this._list = this._tg.children().children();
				this._len = this._list.length;
				this._len = (this._len / this._view) * this._view;
			}
			
			var page_gap = (this.opts.page > 1 && this.opts.page <= this._len) ? (this.opts.page - 1) * this._item_w * this._view : 0;
			
			for(var i=0, len=this._len; i<len; ++i) {
				this._pos[i] = this._item_w * i - page_gap;
				this._start[i] = this._pos[i];
				this._list.eq(i).css({
					"float" : "none",
					"position" : "absolute",
					"top" : "0",
					"width" : this._item_w + "px"
				});
					
				this.move({
					tg : this._list.eq(i),
					speed : 0,
					to : this._pos[i]
				});
			}
			
			if(this.opts.btn_prev && this.opts.btn_next) {
				this.opts.btn_prev.off("click").on("click", function() {
					_this.animate(1, true);
					return false;
				})
				this.opts.btn_next.off("click").on("click", function() {
					_this.animate(-1, true);
					return false;
				});
			}
			
			if(this.opts.paging) {
				$(this._list).each(function (i, el) {
					var btn_page = _this.opts.paging.eq(0).clone();
					_this.opts.paging.before(btn_page);
					
					btn_page.off("click").on("click", function(e) {
						_this.go_page(i, e);
						return false;
					});
				});
				
				this.opts.paging.remove();
			}
			
			if(this.opts.autoplay.enable) {
				this._hover_tg = [];
				this._hover_tg.push(this._tg);
				
				if(this.opts.btn_prev && this.opts.btn_next) {
					this._hover_tg.push(this.opts.btn_prev);
					this._hover_tg.push(this.opts.btn_next);
				}
				
				if(this.opts.autoplay.addHoverTarget != "") {
					this._hover_tg.push($(this.opts.autoplay.addHoverTarget));
				}
				
				if(this.opts.autoplay.pauseHover) {
					$(this._hover_tg).each(function(i, el) {
						$(this).off("mouseenter mouseleave").on("mouseenter mouseleave", function (e) {
							if(e.type == "mouseenter") {
								_this.autoStop();
							} else {
								_this.autoPlay();
							}
						});
					});
				}
				
				this.autoStop();
				this.autoPlay();
			}
			
			this._tg.find("a").off("click").on("click", function (e) {
				if(!_this._link) {
					return false;
				}
			});
			
			this.initComplete();
			this.counter();
		},
		
		initComplete : function () {
			if(this.opts.sidePage) {
				this.animate(-1, true, 0);
				this.animate(1, true, 0);
			}
			if(typeof(this.opts.initComplete) == "function") {
				this.opts.initComplete.call(this,this);
			}
		},
		
		resize : function (e) {
			if(e.opts.flexible) {
				var tmp_w = e._item_w;
				
				e._width = parseInt(e._tg.css("width"));
				e._item_w = e._width / e._view;
				e._range = e.opts.range * e._width;
				
				for(var i=0, len=e._len; i<len; ++i) {
					e._pos[i] = e._pos[i] / tmp_w * e._item_w;
					e._start[i] = e._start[i] / tmp_w * e._item_w;
					e._list.eq(i).css({
						"width" : e._item_w + "px"
					});
					
					this.move({
						tg : e._list.eq(i),
						speed : 0,
						to : e._pos[i]
					});
				}
			}
			
			this.counter();
		},
		
		touchstart : function (e) {
			if(!this.opts.propagation) {
				e.stopPropagation();
			}
			if((e.type == "touchstart" && e.originalEvent.touches.length <= 1) || e.type == "dragstart") {
				this._startX = e.pageX || e.originalEvent.touches[0].pageX;
				this._startY = e.pageY || e.originalEvent.touches[0].pageY;
				this._scroll = false;
				this._start = this._pos.slice(0);
			}
		},
		
		touchmove : function (e) {
			if(!this.opts.propagation) {
				e.stopPropagation();
			}
			if((e.type == "touchmove" && e.originalEvent.touches.length <= 1) || e.type == "drag") {
				this._left = (e.pageX || e.originalEvent.touches[0].pageX) - this._startX;
				this._top = (e.pageY || e.originalEvent.touches[0].pageY) - this._startY;
				var w = this._left < 0 ? this._left * -1 : this._left;
				var h = this._top < 0 ? this._top * -1 : this._top;
				
				if (w < h || this._scroll) {
					this._left = 0;
					this._drag = false;
					this._link = true;
					this._scroll = true;
				} else {
					e.preventDefault();
					this._drag = true;
					this._link = false;
					this._scroll = false;
					this.position(e);
				}
				
				for(var i=0, len=this._len; i<len; ++i) {
					var tmp = this._start[i] + this._left;
					
					this.move({
						tg : this._list.eq(i),
						speed : 0,
						to : tmp
					});
					
					this._pos[i] = tmp;
				}
			}
		},
		
		touchend : function (e) {
			if(!this.opts.propagation) {
				e.stopPropagation();
			}
			if(this._scroll) {
				this._drag = false;
				this._link = true;
				this._scroll = false;
			} else {
				this.animate(this.direction());
				this._drag = false;
				this._scroll = true;
				
				var _this = this;
				setTimeout(function () {
					_this._link = true;
				},50);
			}
		},
		
		position : function (d) { 
			var len = this._len,
				view = this._view,
				gap = view * this._item_w;
			
			if(d == -1 || d == 1) {
				this._startX = 0;
				this._start = this._pos.slice(0);
				this._left = d * gap;
			} else {
				if(this._left > gap) this._left = gap;
				if(this._left < - gap) this._left = - gap;
			}
			
			if(this.opts.roll) {
				var tmp_pos = this._pos.slice(0).sort(function(a,b){return a-b;}),
					max_chk = tmp_pos[len-view],
					p_min = $.inArray(tmp_pos[0], this._pos),
					p_max = $.inArray(max_chk, this._pos),
					p = (this.opts.sidePage) ? 3 : 1;

				if(view <= 1) max_chk = len - p;
				
				if((d == 1 && tmp_pos[p-1] >= 0) || (this._drag && tmp_pos[p-1] > 0)) {
					for(var i=0; i<view; ++i, ++p_min, ++p_max) {
						this._start[p_max] = this._start[p_min] - gap;
						this.move({
							tg : this._list.eq(p_max),
							speed : 0,
							to : this._start[p_max]
						});
					}
				} else if((d == -1 && tmp_pos[max_chk] <= 0) || (this._drag && tmp_pos[max_chk] <= 0)) {
					for(var i=0; i<view; ++i, ++p_min, ++p_max) {
						this._start[p_min] = this._start[p_max] + gap;
						this.move({
							tg : this._list.eq(p_min),
							speed : 0,
							to : this._start[p_min]
						});
					}
				}
			} else {
				if(this.limit_chk()) this._left = this._left / 2;
			}
		},
		
		move : function (obj) {
			var transition = obj.speed + "ms",
				transform = "translate3d(" + obj.to + "px,0,0)";
			if(this.opts.supportsCssTransitions && this.opts.transition) {
				obj.tg.css({
					"left" : "0",
					"-moz-transition" : transition,
					"-moz-transform" : transform,
					"-ms-transition" : transition,
					"-ms-transform" : transform,
					"-webkit-transition" : transition,
					"-webkit-transform" : transform,
					"transition" : transition,
					"transform" : transform
				});
			} else {
				obj.tg.css("left", obj.to + "px");
			}
		},
		
		animate : function (d, btn_click, speed) {
			if(this._drag || !this._scroll || btn_click) {
				var speed = (speed > -1) ? speed : this._speed,
					gap = d * (this._item_w * this._view),
					list = this._list,
					len = this._len,
					transition = speed + "ms ease",
					transform = "";
				
				if(btn_click) this.position(d);
				
				if(this._left == 0 || (!this.opts.roll && this.limit_chk()) ) gap = 0;

				for(var i=0; i<len; ++i) {
					this._pos[i] = this._start[i] + gap;

					if(this.opts.supportsCssTransitions && this.opts.transition) {
						transform = "translate3d(" + this._pos[i] + "px,0,0)";
						list.eq(i).css({
							"left" : "0",
							"-moz-transition" : transition,
							"-moz-transform" : transform,
							"-ms-transition" : transition,
							"-ms-transform" : transform,
							"-webkit-transition" : transition,
							"-webkit-transform" : transform,
							"transition" : transition,
							"transform" : transform
						});
					} else {
						list.eq(i).stop().animate({"left": this._pos[i] + "px"}, speed);
					}
				}	
				
				this.counter();
			}
		},
		
		direction : function () { 
			var r = 0;
		
			if(this._left < -(this._range)) r = -1;
			else if(this._left > this._range) r = 1;
			
			if(!this._drag || this._scroll) r = 0;
			
			return r;
		},
		
		limit_chk : function () {
			var last_p = parseInt((this._len - 1) / this._view) * this._view;
			return ( (this._start[0] == 0 && this._left > 0) || (this._start[last_p] == 0 && this._left < 0) );
		},
		
		go_page : function (i, e) {
			var crt = ($.inArray(0, this._pos) / this._view) + 1;
			var cal = crt - (i + 1);
			
			while(cal != 0) {
				if(cal < 0) {
					this.animate(-1, true);
					cal++;
				} else if(cal > 0) {
					this.animate(1, true);
					cal--;
				}
			}
		},
		
		get_page : function () {
			return {
				obj : this,
				total : Math.ceil(this._len / this._view),
				current : ($.inArray(0, this._pos) / this._view) + 1
			}
		},
		
		counter : function () {
			if($.inArray(0, this._pos) < 0) {
				this.init();
			}
			this.opts.page = this.get_page().current;
			if(this.opts.resize) {
				this._tg.css({
					"height" : this._list.eq(this.opts.page-1).height() + "px"
				});
			}
			if(typeof(this.opts.counter) == "function") {
				this.opts.counter.call(this, this.get_page());
			}
		},
		
		autoPlay : function () {
			var _this = this;
			this._timer = setInterval(function () {
				if(_this.opts.autoplay.enable) {
					var page = _this.get_page();
					if(page.current == page.total) {
						_this.go_page(0);
					} else {
						_this.animate(-1, true);
					}
				}
			}, this.opts.autoplay.interval);
		},
		
		autoStop : function () {
			clearInterval(this._timer);
		},
		
		autoPauseToggle : function () {
			if(this.opts.autoplay.enable) {
				this.autoStop();
				this.opts.autoplay.enable = false;
				return "stopped";
			} else {
				this.opts.autoplay.enable = true;
				this.autoPlay();
				return "started";
			}
		}
		
	};

}(jQuery);

/* ========================================================================
 * Bstones: dropdown.js v1.0
 * http://bstones.co.kr
 * ========================================================================
 * @author MCShin
 * @date      2016-03-21
 * @Event	settings	dropdownEvent
 *		$('.dropdown-toggle').dropdown()
 *
 * 		show.bs.dropdown		:    이 이벤트는 show 인스턴스 메소드가 호출되는 즉시 실행됩니다.
 * 		shown.bs.dropdown		:    이 이벤트는 드롭다운 메뉴가 사용자에게 보여지면 실행됩니다 (CSS 전환이 완료되기를 기다릴 것입니다).
 * 		hide.bs.dropdown		:    이 이벤트는 hide 인스턴스 메소드가 호출되는 즉시 실행됩니다.
 * 		hidden.bs.dropdown		:    이 이벤트는 드롭다운 메뉴가 사용자로부터 가려지면 실행됩니다 (CSS 전환이 완료되기를 기다릴 것입니다).
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // 드롭다운 클래스 정의
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // 드롭다운 플러그인 정의
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // 네임스페이스 충돌방지 NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // 드롭다운 엘리먼트 기본적용
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);


/* ========================================================================
 * Bstones: holder.js 
 * http://bstones.co.kr
 * Copyright 2016 Bstones.
 * ========================================================================
 * @author    MCShin
 * @date      2016-03-22
 * @param     Object		settings
 *		test			:	test    처리 유무    boolean    (default true)
 *                  	    test1    : 
 *                     		test2    : 
 * ======================================================================== */


