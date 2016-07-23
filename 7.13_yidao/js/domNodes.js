//封装一个$函数
//function $(obj,content){
////		var firstChar=obj.charAt(0);
//		var content=content||document;
//		if(firstChar=="#"){
//			return content.getElementById(obj.substring(1));
//		}else if(firstChar=="."){
//			var arr=[];
//			var aEls=content.getElementsByTagName("*");
//				for(var i=0;i<aEls.length;i++){
//						var aClassName=	aEls[i].className.split(" ");
//							 for(var j=0;j<aClassName.length;j++){
//								if(aClassName[j]==obj.slice(1)){
//									arr.push(aEls[i]);
//									break;
//								}
//								
//							 }
//						}
//			return arr;
//		}else{
//			return document.getElementsByTagName(obj);
//		}
//	
//	}



        //获取的是第一个元素节点的函数
		function first(ele){
			var firstchild=ele.firstElementChild||ele.firstChild;
			if(!firstchild||firstchild.nodeType!==1){
				return null;
			}else{
				return firstchild;
			}
		}
		//获取最后一个元素节点的函数
		function last(ele){
			var lastchild=ele.lastElementChild||ele.lastChild;
			if(!lastchild||lastchild.nodeType!==1){
				return null;
			}else{
				return lastchild;
			}
		}
		
		//获取下一个兄弟元素节点的函数
		function next(ele){
			var nextnode=ele.nextElementSibling||ele.nextSibling;
			if(!nextnode||nextnode.nodeType!==1){
				return null;
			}else{
				return nextnode;
			}
		}
		//获取上一个兄弟元素节点
		function prev(ele){
			var prevnode=ele.previousElementSibling||ele.previousSibling;
			if(!prevnode||prevnode.nodeType!==1){
				return null;
			}else{
				return prevnode;
			}

//一个得到位置的函数
	function getPos(obj){
			var pos={left:0,top:0};
			
			while(obj){
				pos.left +=obj.offsetLeft;
				pos.top +=obj.offsetTop;
				obj=obj.offsetParent;
			}
			return pos;
		}	}


//封装一个得到样式的兼容性函数

function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,null)[attr];
		}
	}
//封装一个添加class 函数
function addClass(obj,className){
	if(obj.className==""){
		obj.className=className;
	}else{
		var arrClassName=obj.className.split(" ");
		var _index=arrIndex(arrClassName,className);
		if(_index==-1){
			obj.className +=" "+className;
		}
	}
}
//循环遍历原来class里面的每一项，与要添加的类做比较
function arrIndex(arr,k){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==k){
			return i;//如果有相同的，返回原数组相同的那一项对应的下标
		}
	};
	return -1;
}
//移除class函数
function removeClass(obj,className){
if(obj.className!==""){
	var arrClassName=obj.className.split(" ");
	var _index=arrIndex(arrClassName,className);
	if(_index!==-1){
		arrClassName.splice(_index,1);//删除了对应的那个找到的class
		obj.className=arrClassName.join(" ");//将数组转回字符串
	}
	
}

}

//做运动的函数

function Move(obj,attr,dir,target,callBack){
				
				dir=  parseInt(getStyle(obj,attr))>target?-dir:dir;
				
				clearInterval(obj.timer);
				obj.timer=setInterval(function(){
					var speed=parseInt(getStyle(obj,attr))+dir; //10(px)
					//&&与运算比||或运算优先级高
					if(speed>=target&&dir>0||speed<=target&&dir<0){
						speed=target;
					}
					
					obj.style[attr]=speed+"px";
					
					if(speed==target){
						clearInterval(obj.timer);
						callBack&&callBack();
						//alert(speed);
					}
					
				},30);
				
			}
//startMove函数
function startMove(obj,json,fnEnd){
	var MAX = 18;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bStop = true;
		for(var name in json){
			var iTarget = json[name];
		if(name == "opacity"){
			var iCur = Math.round(parseFloat(getStyle(obj,name))*100);
		}else{
			var iCur = parseInt(getStyle(obj,name));
		}
		var speed = (iTarget-iCur)/30;
		speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		if(Math.abs(speed) > MAX) speed = speed>0 ? MAX : -MAX;
		if(name == "opacity"){
			obj.style.filter = "alpha(opacity:"+(iCur+speed)+"px";
			obj.style.opacity=(iCur + speed)/100;
		}else{
			obj.style[name]=iCur + speed + "px";
		}
		}
		if(iCur != iTarget){
			bStop = false;
		}
		if (bStop) {
			clearInterval(obj.timer);
			if (fnEnd) //只有传了这个函数才去调用
			{
				fnEnd();
			}
		}
		
	},20)
}
//绑定事件函数的封装
function bind(obj,evname,evfn){
	if(obj.addEventListener){
		obj.addEventListener(evname,evfn,false);
	}else if(obj.attachEvent){
		obj.attachEvent("on"+evname,function(){
			
		});
	}else{
		obg["on"+evname]=evfn;
	}
}
//解除绑定事件的函数
function unbind(obj,evname,evfn){
	if(obj.removeEventListener){
		obj.removeEventListener(obj,evname,evfn,false);
	}else if(obj.detachEvent){
		obj.detachEvent("on"+evname,evfn);
	}else{
		obj["on"+evname]=null;
	}
}
//封装一个设置Cookie函数；
function setCookie(key,value,time){
	var mydate=new Date();
	mydate.setDate(mydate.getDate()+time);
	document.cookie=key+"="+encodeURI(value)+";expires"+mydate.toGMTString();
};
//封装一个得到Cookie的函数
function getCookie(key){
	var str=document.cookie;
	var arr=str.split(";");
	for(var i=0;i<arr.length;i++){
		var newArr=arr[i].split("=")
		if(newArr[0]==key){
			return decodeURI(newArr[1]);
		}
	}
}
//删除一个Cookie
function removeCookie(key){
	setCookie(key,"",-1);
};
