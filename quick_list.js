/* Javascript quick_list -  v1.0 
* Copyright (c) 2017 Joshy Francis
* designed for Material Design
*/
	function quick_list(el,conf){
		"use strict";
		this.__bind = function(me,fn ){ return function(){ return fn.apply(me, arguments); }; };
		//			var adjrz = __bind(this,  this.adjustresize);
		this.addEvent  = function (obj, evt, fn) {
			if (obj.addEventListener)
				obj.addEventListener(evt, fn, false);
			else if (obj.attachEvent)
				obj.attachEvent('on' + evt, fn);
		};
		this.removeEvent  = function (obj, evt, fn) {
			if (obj.removeEventListener)
				obj.removeEventListener(evt, fn, false);
			else if (obj.detachEvent)
				obj.detachEvent('on' + evt, fn);
		};
		this.addProperty= function(name,getf,setf){
			if(!this.checkProperty(name)){
				if(Object.defineProperty){
						Object.defineProperty(this,name, {
							 get:  getf,
							set:  setf
						});
				}else if(this.__defineGetter__ ){
					this.__defineGetter__( name,getf   );
					this.__defineSetter__( name, setf  );
				}
			}
		};
		this.checkProperty= function(name ){
			if(Object.getOwnPropertyDescriptor){
				return Object.getOwnPropertyDescriptor(this,name);
			}else if(this.__lookupGetter__ ){
				return this.__lookupGetter__(name) || this.__lookupSetter__(name)  ;
			}
		};
		this.offset =function ( el  ) {
			var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			var rect = el.getBoundingClientRect();
			return { top: rect.top + scrollTop,
						  left: rect.left + scrollLeft,
						  width:el.offsetWidth,
						  height:el.offsetHeight
					};
		};
		this.ready= function (fn) {
			  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
				fn();
			  } else {
				document.addEventListener('DOMContentLoaded', fn);
			  }
		};
		this.deepExtend = function(out) {//deepExtend({}, objA, objB);
			  out = out || {};

			  for (var i = 1; i < arguments.length; i++) {
				var obj = arguments[i];

				if (!obj)
				  continue;

				for (var key in obj) {
				  if (obj.hasOwnProperty(key)) {
					if (typeof obj[key] === 'object')
					  out[key] = deepExtend(out[key], obj[key]);
					else
					  out[key] = obj[key];
				  }
				}
			  }

				  return out;
			};
		this.extend = function(out) {//extend({}, objA, objB);
			  out = out || {};

			  for (var i = 1; i < arguments.length; i++) {
				if (!arguments[i])
				  continue;

				for (var key in arguments[i]) {
				  if (arguments[i].hasOwnProperty(key))
					out[key] = arguments[i][key];
				}
			  }

			  return out;
		};
		this.parseHTML = function(str) {//parseHTML(htmlString);
			  var tmp = document.implementation.createHTMLDocument();
			  tmp.body.innerHTML = str;
			  return tmp.body.children;
		};
		this.addstyle=function(id,css){
			var head = document.head || document.getElementsByTagName('head')[0];
			var style =document.getElementById(id);
			var exists=false;
				if(!style){
					style =document.createElement('style');
					style.id=id;
					style.type = 'text/css';
				}else{
					exists=true;
						for(var i=style.childNodes.length-1;i>=0;i--){
							style.removeChild(style.childNodes[i]);
						}
				}
				if (style.styleSheet){
					style.styleSheet.cssText = css;
				} else {
					style.appendChild(document.createTextNode(css));
				}
				if(exists==false){
					head.appendChild(style);
				}
		};
		this.insertAfter= function (newNode, referenceNode) {
			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		};
		this.ajax=function (o) {
			var url=o.url;
			var type=( o.type || 'post').toUpperCase();
			var data=( o.data || '');
			var cache=( o.cache===undefined?false:o.cache);
			var success=o.success;
			var error=o.error;
			// Must encode data
			if(data && typeof(data) === 'object') {
				var y = '', e = encodeURIComponent;
				for (x in data) {
					y += '&' + e(x) + '=' + e(data[x]);
				}
				data = y.slice(1) + (! cache ? '&_t=' + new Date : '');
			}

			try {
				var x =null;
				if(window.XMLHttpRequest){
						x= new XMLHttpRequest();
				 }else{
					 x=(new  ActiveXObject('MSXML2.XMLHTTP.3.0') ) || (new  ActiveXObject('Microsoft.XMLHTTP') );
				 }
				 //x.open(type, url, 1);
				 if (x && "withCredentials" in x){
					x.open(type, url, true);
				} else if (typeof XDomainRequest != "undefined"){
					x = new XDomainRequest();
					x.open(type, url);
				}
				
				x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				//x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
				x.onreadystatechange = function () {
					if(x.readyState ==4 &&   x.status >= 200 && x.status < 400 && success){
						success(x.responseText, x);
					}else if(x.readyState ==4 &&  error){
							error(x, x.status);
					}
				};
				
				x.send(data);
			} catch (e) {
				if(error){
					error(x,e);
				}
			}
		};
		var css='';
			css+='.ql_item, .ql_item:link, .ql_item:visited, .ql_item:focus, .ql_item:active {';	
			css+='			border:0px;';	
			css+='			border-bottom:1px solid lightgray;';	
			css+='			border-left:1px solid lightgray;';	
			css+='			border-right:1px solid lightgray;';	
			css+='			border-radius:unset;';	
			css+='			padding: 10px 15px;';	
			css+='			display: block;';	
			css+='			background-color: #fff;';	
			css+='			text-decoration: none;';	
			css+='			color:black;';	
			css+='		}';	
			css+='		.ql_item:hover{';	
			css+='				background-color: #f5f5f5;';	
			css+='				text-decoration: none;';	
			css+='		}';	
			css+='		.ql_item_no_border{';	
			css+='			border:0px !important;';
			css+='		}';	
			css+='		.ql_item_border{';	
			css+='			border-top:1px solid lightgray !important;';
			css+='			border-bottom:0px solid lightgray !important;';
			css+='		}';	
			css+='		.ql_item_selected{';	
			css+='			background-color:#3598dc!important;';	
			css+='			color:white!important;';	
			css+='		}';	
			css+='		.ql_item_prev_selected{';	
			css+='			background-color:lightgray!important;';	
			css+='		}';	
				css+='.whirl {';	
				 css+='		position: relative; ';	
				css+='  }';	
				css+='.whirl:before {';	
				css+='  content: "";';	
				css+='  z-index: 100053;';	
				css+='  position: absolute;';	
				css+='  top: 0;';	
				css+='  left: 0;';	
				 css+=' display: block;';	
				css+='  height: 100%;';	
				css+='  width: 100%;';	
				//css+='  background-color: #999;';	
				//css+='  opacity: 0.6; ';	
				css+='  }';	
				css+='.whirl:after {';	
				css+='  z-index: 100054;';	
				css+='  content: "";';	
				css+='  height: 30px;';	
				css+='  width: 30px;';	
				css+='  position: absolute;';	
				css+='  top: 1%;';	
				css+='  left: 50%;';	
				//css+='  margin: -20px 0 0 -20px;';	
				css+='  -webkit-transition: all .75s ease 0s;';	
				css+='  transition: all .75s ease 0s;';	
				css+='  border-radius: 100%;';	
				 css+=' border-top: 4px solid #555;';	
				css+='  -webkit-animation: standard .75s infinite linear;';	
				css+='  animation: standard .75s infinite linear; ';	
				css+='}';	
				css+='.whirl.no-overlay:before {';	
				css+='  content: none;';	
				css+='  display: none; ';	
				css+='}';	
				css+='/* whirl standard rotation animation used for duo, double-up etc. */';	
				css+='@-webkit-keyframes standard {';	
				css+='  from {';	
				css+='	-webkit-transform: rotate(0deg);';	
				css+='	transform: rotate(0deg); }';	
				css+='  to {';	
				css+='	-webkit-transform: rotate(360deg);';	
				css+='	transform: rotate(360deg); } }';	
				css+='@keyframes standard {';	
				css+='  from {';	
				css+='	-webkit-transform: rotate(0deg);';	
				css+='	transform: rotate(0deg); }';	
				css+='  to {';	
				css+='	-webkit-transform: rotate(360deg);';	
				css+='	transform: rotate(360deg); } }';	

		this.addstyle('ql_item',css);
		this.el=el;
		this.el.setAttribute('autocomplete','off');
		this.main_container=document.createElement('div');
		this.insertAfter( this.main_container,this.el);
		this.main_container.style.cssText='display:block;border: 0px solid rgb(231, 236, 241);width:100%;';
			if(this.el.style['border-bottom'] && this.el.style['border-bottom'] !=''){
				this.main_container.style['border-bottom']=this.el.style['border-bottom'];
				this.main_container.style['border-top']=this.el.style['border-bottom'];
			}else{
				this.main_container.style['border-bottom']='1px solid lightgray';
				this.main_container.style['border-top']='1px solid lightgray';
			}
		this.list_content=document.createElement('div');
		this.main_container.appendChild	(this.list_content);
		this._list_height=(conf.list_height===undefined)?200:conf.list_height;
		this.list_content.style.cssText='display:block;max-height:'+this._list_height+'px;width:100%;overflow-y:auto;';
		this.list=document.createElement('div');	
		this.list_content.appendChild	(this.list);
		this.footer_content=document.createElement('div');
		this.main_container.appendChild	(this.footer_content);
		this.footer_content.style.cssText='display:block; width:100%; padding:0px;';
		//this.footer_content.innerHTML='<a href="javascript:;" class="ql_item ql_item_no_border"  > <span style="font-weight: bold;  font-size: 16px;"> Add</span><br>test </a>';
		
		this.footer_links=[];
		this.add_footer=this.__bind(this,function(caption,f){
			var a=document.createElement('a');
				a.className='ql_item ql_item_border';// +(this.footer_content.childNodes.length==0?' ql_item_no_border':'') ;
				a.innerHTML=caption;
				a.href="javascript:;";
				/*
				a.setAttribute('footer_f','var footer_f='+(  f?f.toString():'function(){}') + ';');
				var _click=this.__bind( this,function (e) {
						e = e || window.event;
						var  target = e.target || e.srcElement;
						if ( target.nodeType === 3) target = target.parentNode; //Safari bug
							var f=target.getAttribute('footer_f');
							eval(f + 'footer_f();' ) ;
						if (e.preventDefault) e.preventDefault(); else e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation(); return false;
				});
				a.onclick=_click;
				*/
				a.onclick=f;
				this.footer_content.appendChild	(a);
		});
		this.main_container.style.display='none';
		this.search_visible=false;
		this.selectedrowid=-1;
		this.id_column=conf.id_column || '';
		this.display_column=conf.display_column || '';
		this.value_column=(conf.value_column===undefined)?this.display_column:conf.value_column ;
		this.cur_data={};
		if(conf.default_data){this.cur_data=conf.default_data;};
		this.search_callbacks=[];
		this.addProperty('default_data',function(){
			return this.cur_data;
		},function(data){
			this.cur_data=data;
				
			var _callback=this.__bind(this,function(){
					this.hide();
				});
				this.find(this.cur_data[this.id_column],_callback);
		});
		this.addProperty('list_height',function(){
			return this._list_height;
		},function(h){
			this._list_height=h;
			this.list_content.style['max-height']=h+'px';
		});
		this.show=function(){
			this.search_visible=true;
			this.main_container.style.display='block';
		};
		this.hide=function(){
			this.search_visible=false;
			this.main_container.style.display='none';
		};
		this._select=function(target){
			var data=JSON.parse( target.getAttribute('ql_data'));
				this.cur_data=data;
				this.value_column=(this.value_column===undefined)?this.display_column:this.value_column ;
				 
				this.el.value=data[this.value_column] || '';
				if(this.on_select){
					this.on_select(data);
				}
				this.hide();
		};
		this.find=function(id_value,callback){
				this.cur_data={};
				this.cur_data[this.id_column]=id_value;
				this.cur_data.callback=callback;
				
			var _callback=this.__bind(this,function(i){
					this.search_callbacks.splice(i,1);										
					for(var i=0;i<this.list.childNodes.length;i++){
							var a=this.list.childNodes[i];
							var data=JSON.parse( a.getAttribute('ql_data'));
							if( (data[this.id_column]+'').toLowerCase()==(this.cur_data[this.id_column]+'').toLowerCase()){
								this.cur_data=this.extend(this.cur_data, data);
								this.selectedrowid=i;
								this.value_column=(this.value_column===undefined)?this.display_column:this.value_column ;
								this.el.value=data[this.value_column] || '';
								break;
							}
					}
					if(this.selectedrowid!=-1){
						this.select();
						//this.el.focus();
						//this.hide();
					}
						if(this.cur_data.callback){
							this.cur_data.callback();
							this.cur_data.callback=null;
						}
					
				});
			this.search_callbacks.push(_callback);
			this.search();
		};
		this.addProperty('ajax_data',function(){
			return this._ajax_data;
		},function(data){
			 this._ajax_data=this.extend( this._ajax_data,data);
		});							
		
		this.url=conf.url ||  '';
		this._ajax_data=this.extend( {}, conf.ajax_data);
		this.type=(conf.type===undefined)?'post' :conf.type   ;
		this.min_search_length=(conf.min_search_length===undefined)?0:conf.min_search_length  ;
		this.highlight_tag=(conf.highlight_tag===undefined)?'<b>[content]</b>':conf.highlight_tag  ;
		this.dataset=(conf.dataset===undefined)?[]:conf.dataset  ;
		this.online=(conf.online===undefined)?true:conf.online  ;
		this.replace_within_tags=function(str,find,replace,fun){//replace_within_tags('<a href="javascript:;"> an example <span> another <b>exa</b>mple</span> </a>','exa','EXA');
				str=str+'';
				find=(find+'').toLowerCase();
				replace=replace+'';
				var c='',tag_open=false,out='',temp='';
			for(var i=0;i<str.length;i++){
				c=str.substr(i,1);
				switch(c){
					case '<':
							out+=temp;
							temp='';
						tag_open=true;
						out+=c;
					break;
					case '>':
							out+=temp;
							temp='';
						tag_open=false;
						out+=c;
					break;
					default:
						if(tag_open==false){
							temp+=c;				
							if( find.substr(0,temp.length)==temp.toLowerCase()){
									if(find.length==temp.length){
										if(fun && typeof(fun)==='function'){
											out+=fun(replace,temp);
										}else{
											out+=replace;
										}
										temp='';
									}
							}else {
								out+=temp;
								temp='';
							}
						}else{
							out+= c;
						}
					break;
				}
					
			}
				return out+temp;
		};
		this.search_items=function(items){
				this.dataset=items;
				//var searchMask = this.el.value;
				//var regEx = new RegExp(searchMask, "ig");
				//var replaceMask = "<b>"+this.el.value+"</b>";
				var replaceMask =this.highlight_tag.replace('[content]', this.el.value);
			//var html='';
			this.list.innerHTML='';
			var cur_item=false;
			var found=false;
			for(var i=0;i<items.length;i++){
						if(this.online===false){
								found=false;
							for(var a in items[i]){
								if( ( items[i][a]+'').toLowerCase().indexOf( this.el.value.toLowerCase())!=-1){
									found=true;
									break;
								}
							}
								if(found==false){
									continue;
								}
						}
				//var item=items[i][this.display_column] ;
					var item=this.display_column;
							for(var a in items[i]){
								var searchMask = a ;
								var regEx = new RegExp(searchMask, "g");
								var replaceMask = items[i][a];

								item = item.replace(regEx, replaceMask);

							}
							//item = item.replace(regEx, replaceMask);
							item=this.replace_within_tags(item,this.el.value,this.highlight_tag,function(highlight_tag,replace){
									return highlight_tag.replace('[content]', replace);
							});
							
				//html+='<a href="javascript:alert(\'ok\');" class="ql_item">'+ item +'</a>';
				var a=document.createElement('a');
					a.className='ql_item';
							cur_item=false;
						if( (items[i][this.id_column]+'').toLowerCase()==(this.cur_data[this.id_column]+'').toLowerCase()){
						//	a.className+=' ql_item_prev_selected';
							cur_item=true;
						}
						
					a.innerHTML=item;
					a.href="javascript:;";
					a.setAttribute('ql_data',JSON.stringify(items[i]));
					var _select=this.__bind( this,function (e) {
							e = e || window.event;
							var  target = e.target || e.srcElement;
							if ( target.nodeType === 3) target = target.parentNode; //Safari bug
								while((target.className+'').indexOf('ql_item')==-1){
									target=target.parentNode;
								}
							this._select(target);
							if (e.preventDefault) e.preventDefault(); else e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation(); return false;
					});
					a.onclick=_select;
						if(cur_item==true){
									this.selectedrowid=0;
									a.style['font-weight']='bold';
								if(this.list.childNodes.length==0){
									this.list.appendChild	(a);
								}else{
									this.list.insertBefore(a, this.list.childNodes[0]);
								}
						}else{
								
							this.list.appendChild	(a);
						}
			}
			//this.list.innerHTML=html;
			if(this.list.childNodes.length >0 ){
					if(  this.footer_content.childNodes.length>0){
						//this.list.childNodes[this.list.childNodes.length -1].style['border-bottom']='0px solid lightgray';
						this.list.lastChild.style['border-bottom']='0px solid lightgray';	
					}
					//if(!this.list.firstChild.style['border-top'] ){
					//	this.list.firstChild.style['border-top']=this.main_container.style['border-bottom'];	
					//}
				this.show();
				for( var i=this.search_callbacks.length-1;i>=0;i--){
					this.search_callbacks[i](i);
				}
			}else{
				this.hide();
			}
		};
		this.search=function(){
				var value=this.el.value.replace(/\n/g,'').replace(/^ +| +$/gm, '');
				if(value.length< this.min_search_length){
						return;
				}
			this.selectedrowid=-1;
					this._ajax_data.search= value.toLowerCase();
					this._ajax_data.id_value=(this.cur_data[this.id_column]?this.cur_data[this.id_column]:'');
					this.list.className+=' whirl';		
					//this.el.className+=' whirl';
				if(this.online===false){
					this.search_items(this.dataset);
					this.list.className=this.list.className.replace('whirl','');
					return;
				}
			this.ajax({
					url: this.url,
					type: this.type,
					data:this._ajax_data,
					success:this.__bind( this,function (data,xhr) {
							try{
								var items=JSON.parse(data);
									
								this.search_items(items);
									
							}catch(e){
								//alert(xhr.responseText);
								if(this.on_error){
									this.on_error(xhr.responseText,xhr);
								}
								this.hide();
							}
							 
							this.list.className=this.list.className.replace('whirl','');
							//this.el.className=this.el.className.replace('whirl','');
					}),
					error:this.__bind(this, function (xhr, e) {
						//alert(xhr.responseText);
						if(this.on_error){
							this.on_error(xhr.responseText,xhr);
						}
						 this.hide();
						 
						this.list.className=this.list.className.replace('whirl','');
						//this.el.className=this.el.className.replace('whirl','');
						
					}),
				});
		
		};
		this.select=function(){
			if(this.selectedrowid>this.list.childNodes.length-1){
					//this.selectedrowid=0;
					this.selectedrowid=this.list.childNodes.length-1
			}
			if(this.selectedrowid<0){
					//this.selectedrowid=this.list.childNodes.length-1;
					this.selectedrowid=0;
			}
			for(var i=0;i<this.list.childNodes.length;i++){
				var a=this.list.childNodes[i];
				a.className=a.className.replace('ql_item_selected','');
			}
			var a=this.list.childNodes[this.selectedrowid];
				a.className+=' ql_item_selected';
			
			//document.body.scrollTop = top; //Chrome
			//document.documentElement.scrollTop = top; //IE8          
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;  
			//if(a.offsetTop<=this.list_content.offsetTop || (a.offsetTop+a.offsetHeight)>=this.list_content.offsetHeight){
				this.list_content.scrollTop =a.offsetTop-a.offsetHeight;
			//}
		};
		this._keydown=this.__bind(this,function(e){
			//alert(e.keyCode);
					 switch (e.keyCode) {
							case 9: case 13: /* TAB Key or Enter Key*/
								if (this.search_visible=true && this.selectedrowid != -1 && this.list.childNodes.length > 0) {
										this._select(this.list.childNodes[this.selectedrowid]);	 				 
								} else  if (this.search_visible=true && this.list.childNodes.length > 0) {
									this.selectedrowid=0;
									 
									this._select(this.list.childNodes[this.selectedrowid]);	 
								}
								// if (e.preventDefault) e.preventDefault(); else e.cancelBubble = true;if (e.stopPropagation) e.stopPropagation(); return false;
								break;
							case 27:
									this.hide();
								break;
							case 40:/*down arrow*/
								if (this.search_visible=true && this.list.childNodes.length > 0) {
										
									this.selectedrowid+=1;
									this.select();
									
									if (e.preventDefault) e.preventDefault(); else e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation(); return false;
								}
								break;
							case 38:  /* Up arrow*/
								if (this.search_visible=true && this.list.childNodes.length > 0) {
										
									this.selectedrowid-=1;
									this.select();
									if (e.preventDefault) e.preventDefault(); else e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation(); return false;
								}
								break;
							default:
								break;
						}
			
		});
		this._keyup=this.__bind(this,function(e){
			//alert(e.keyCode);
					 switch (e.keyCode) {
							case 9: case 13: /* TAB Key or Enter Key*/
								break;
							case 27:
								break;
							case 40:/*down arrow*/
								break;
							case 38:  /* Up arrow*/
								break;
							default:
									this.search();
								break;
						}
			
		});
		this._paste=this.__bind(this,function(e){
			var _callback=this.__bind(this,function(){
					this.search();
				});
			setTimeout(_callback , 0);
		});
		this._focus=this.__bind(this,function(e){
				var _callback=this.__bind(this,function(){
					this.show();
				});
				this.find(this.cur_data[this.id_column],_callback);
		});
		this._blur=this.__bind(this,function(e){
				e = e || window.event;
				var  target = e.target || e.srcElement;
				if ( target.nodeType === 3) target = target.parentNode; //Safari bug
			if(target!=this.el && !this.main_container.contains(target)){
				this.hide();
			}
		});
		this.addEvent(this.el,'keydown',this._keydown);
		this.addEvent(this.el,'keyup',this._keyup);
		//this.addEvent(this.el,'change',this._keyup);
		this.addEvent(this.el,'cut',this._paste);
		this.addEvent(this.el,'paste',this._paste);
		this.addEvent(this.el,'focus',this._focus);
		this.addEvent(document,'click',this._blur);
		return this;
	}
