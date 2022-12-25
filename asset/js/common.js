import netsSettings from "@/static/config.js";

export default {
	istest(){
		console.log("this is test")
	},
	makeInterface2:function(pStr){
		var tmpToken=this.readCookie("user","token");
		pStr=pStr.substr(4,pStr.length-4);
		var tmpStr=netsSettings.interfaceurl+pStr;
		return this.makeInterface(tmpStr,tmpToken);
	},
	makeInterface:function(pStr,pToken){
		var tmpStr=pStr+"&token="+pToken+"&r="+Math.random();
		return tmpStr;
	},
	//-- #验证 pValue 是否在数组 pAR 里 --
	In_array:function(pValue,pAR){
		var Coun0=0;
		while(pAR.length>Coun0){
			if(pValue==pAR[Coun0]){
				return 1;
			}
			Coun0++;
		}

		return 0;
	},
	//-- #数组合并为字符串 --
	Implode:function(pAr){
		var Coun0;
		var tmpStr="";
		Coun0=0;
		while(pAr.length>Coun0){
			if(Coun0>0){
				tmpStr+=",";
			}
			tmpStr+=pAr[Coun0];
		}
		return tmpStr;
	},
	//-- #Get client width/height / 当前浏览器宽/高 --
	getFixClientWidth:function(){
		//-- ### --
		var tmpINT_Common_Clientwidth=0;
		
		tmpINT_Common_Clientwidth=parseInt(document.documentElement.clientWidth);
		if(tmpINT_Common_Clientwidth<parseInt(document.body.scrollWidth)){
			tmpINT_Common_Clientwidth=parseInt(document.body.scrollWidth);
		}

		return tmpINT_Common_Clientwidth;
	},
	getFixClientHeight:function(){
		//-- ### --
		var tmpINT_Common_Clientheight=0;
		
		tmpINT_Common_Clientheight=parseInt(document.documentElement.clientHeight);
		if(tmpINT_Common_Clientheight<parseInt(document.body.scrollHeight)){
			tmpINT_Common_Clientheight=parseInt(document.body.scrollHeight);
		}
	
	
		return tmpINT_Common_Clientheight;
	},
	getClientWidth:function(){
		//-- ### --
		var tmpINT_Common_Clientwidth=0;

		tmpINT_Common_Clientwidth=parseInt(document.documentElement.clientWidth);

		return tmpINT_Common_Clientwidth;
	},
	getClientHeight:function(){
		//-- ### --
		var tmpINT_Common_Clientheight=0;

		tmpINT_Common_Clientheight=parseInt(document.documentElement.clientHeight);

		return tmpINT_Common_Clientheight;
	},
	//-- #当前页面可见区域宽/高 --
	getFixViewWidth:function(){
		//-- ### --
		var tmpINT_Common_Viewwidth=0;

		tmpINT_Common_Viewwidth=parseInt(document.documentElement.clientWidth);

/*
window.screen.availWidth 返回当前屏幕宽度(空白空间) 
window.screen.availHeight 返回当前屏幕高度(空白空间) 
window.screen.width 返回当前屏幕宽度(分辨率值) 
window.screen.height 返回当前屏幕高度(分辨率值) 
*/

		return tmpINT_Common_Viewwidth;
	},
	getFixViewHeight:function(){
		//-- ### --
		var tmpINT_Common_Viewheight=0;
		
		tmpINT_Common_Viewheight=parseInt(document.documentElement.clientHeight);
	
		return tmpINT_Common_Viewheight;
	},
	getScreenWidth:function(){
		//-- ### --
		var tmpINT=document.body.clientWidth;
	
		return tmpINT;
	},
	getScreenHeight:function(){
		//-- ### --
		var tmpINT=document.body.clientHeight;
	
		return tmpINT;
	},
	getFixScrollTop:function(){
		//-- ### --
		var tmpINT_Common_Scrolltop=0;
		
		/*
		var tmpINT_Common_Scrolltop=parseInt(document.documentElement.scrollTop);
		if(tmpNavigator.appCode=="Chrome" || tmpNavigator.appCode=="Safari" || navigator_initial()=="Firefox"){
			tmpINT_Common_Scrolltop=parseInt(document.body.scrollTop);
		}
		*/
		tmpINT_Common_Scrolltop=parseInt(document.documentElement.scrollTop);
		
		return tmpINT_Common_Scrolltop;
	},
	getFixScrollLeft:function(){
		//-- ### --
		var tmpINT_Common_Scrollleft=0;
		
		/*
		var tmpINT_Common_Scrollleft=parseInt(document.documentElement.scrollLeft);
		if(tmpNavigator.appCode=="Chrome" || tmpNavigator.appCode=="Safari" || navigator_initial()=="Firefox"){
			tmpINT_Common_Scrollleft=parseInt(document.body.scrollLeft);
		}
		*/
		tmpINT_Common_Scrollleft=parseInt(document.documentElement.scrollLeft);
		
		return tmpINT_Common_Scrollleft;
	},
	getSizeConsole:function(){

console.log(
"屏幕分辨率为："+screen.width+"*"+screen.height+"\r\n"+
"屏幕可用大小："+screen.availWidth+"*"+screen.availHeight+"\r\n"+
"网页可见区域宽："+document.body.clientWidth+"\r\n"+
"网页可见区域高："+document.body.clientHeight+"\r\n"+
"网页可见区域宽(包括边线的宽)："+document.body.offsetWidth +"\r\n"+
"网页可见区域高(包括边线的宽)："+document.body.offsetHeight +"\r\n"+
"网页正文全文宽："+document.body.scrollWidth+"\r\n"+
"网页正文全文高："+document.body.scrollHeight+"\r\n"+
"网页被卷去的高："+document.body.scrollTop+"\r\n"+
"网页被卷去的左："+document.body.scrollLeft+"\r\n"+
"网页正文部分上："+window.screenTop+"\r\n"+
"网页正文部分左："+window.screenLeft+"\r\n"+
"屏幕分辨率的高："+window.screen.height+"\r\n"+
"屏幕分辨率的宽："+window.screen.width+"\r\n"+
"屏幕可用工作区高度："+window.screen.availHeight+"\r\n"+
"屏幕可用工作区宽度："+window.screen.availWidth
);

		return 0;
	},
	readCookie:function(pSection,pName) {
		var tmpVALUE="";
		tmpVALUE=window.localStorage.getItem(pSection+"_"+pName);
		if(tmpVALUE==null){
			tmpVALUE="";
		}
		return tmpVALUE;
	},
	writeCookie:function(pSection,pName,pValue) {
		window.localStorage.setItem(pSection+"_"+pName,pValue);
		return 0;
	},
	deleteCookie:function(pSection,pName) {
		window.localStorage.removeItem(pSection+"_"+pName);
		return 0;
	},

	formatDate_AR:function(pDatetime){
		var tmpAR0=pDatetime.split(" ");
		var tmpAR1=new Array(1970,1,1);
		var tmpAR2=new Array(0,0,0);
		var tmpAR_SAVE;
		
		if(tmpAR0.length>=2){
			tmpAR1=tmpAR0[0].split("-");
			if(tmpAR1.length<3){
				tmpAR1=new Array(1970,1,1);
			}
			tmpAR2=tmpAR0[1].split(":");
			if(tmpAR2.length<3){
				tmpAR2=new Array(0,0,0);
			}

		}else{
			tmpAR1=tmpAR0[0].split("-");
			if(tmpAR1.length<3){
				tmpAR1=new Array(1970,1,1);
			}
			tmpAR2=new Array(0,0,0);
		}
		
		tmpAR_SAVE=new Array(
			parseInt(tmpAR1[0])+"",
			parseInt(tmpAR1[1])+"",
			parseInt(tmpAR1[2])+"",
			parseInt(tmpAR2[0])+"",
			parseInt(tmpAR2[1])+"",
			parseInt(tmpAR2[2])+""
			);
		
		if(tmpAR_SAVE[1].length<=1){
			tmpAR_SAVE[1]="0"+tmpAR_SAVE[1];
		}
		if(tmpAR_SAVE[2].length<=1){
			tmpAR_SAVE[2]="0"+tmpAR_SAVE[2];
		}
		if(tmpAR_SAVE[3].length<=1){
			tmpAR_SAVE[3]="0"+tmpAR_SAVE[3];
		}
		if(tmpAR_SAVE[4].length<=1){
			tmpAR_SAVE[4]="0"+tmpAR_SAVE[4];
		}
		if(tmpAR_SAVE[5].length<=1){
			tmpAR_SAVE[5]="0"+tmpAR_SAVE[5];
		}

		return tmpAR_SAVE;
	},
	Time_TimeToInt:function(pSTR,pType){

		//-- ### --
		var tmpAR0=this.formatDate_AR(pSTR);
		tmpAR0[1]--;
		var tmpDate=new Date(parseInt(tmpAR0[0]),parseInt(tmpAR0[1]),parseInt(tmpAR0[2]),parseInt(tmpAR0[3]),parseInt(tmpAR0[4]),parseInt(tmpAR0[5]));
		var tmpINT=tmpDate.valueOf();
		if(pType==1){
			tmpINT=Date.parse(tmpDate);
		}

		return tmpINT;
	},
	Time_IntToTime:function(pINT,pType){
		//-- ### --
		var tmpDate=new Date(pINT);

		var tmpYear=tmpDate.getFullYear();
		var tmpINT=tmpDate.getMonth()+1;
		var tmpMonth=tmpINT;
		var tmpDay=tmpDate.getDate();
		var tmpWeek=tmpDate.getDay();
		var tmpHour=tmpDate.getHours();
		var tmpMinute=tmpDate.getMinutes();
		var tmpSecond=tmpDate.getSeconds();
		var tmpMillisecond=tmpDate.getMilliseconds(); 
		
		var tmpSTR=tmpYear+"-"+tmpMonth+"-"+tmpDay+" "+tmpHour+":"+tmpMinute+":"+tmpSecond;
		if(pType==1){
			tmpSTR=tmpYear+"-"+tmpMonth+"-"+tmpDay+" "+tmpHour+":"+tmpMinute+":"+tmpSecond+":"+tmpMillisecond;
		}else if(pType==2){
			tmpSTR=tmpYear+"-"+tmpMonth+"-"+tmpDay;
		}else if(pType==3){
			tmpSTR=tmpMonth+"-"+tmpDay;
		}else if(pType==4){
			tmpSTR=tmpMonth+"月"+tmpDay+"日/周"+tmpWeek;
		}else if(pType==5){
			tmpSTR=tmpMonth+"月"+tmpDay+"日";
		}else if(pType==6){
			tmpSTR="周"+tmpWeek;

		}else if(pType==20){
			tmpSTR=tmpYear;
		}else if(pType==21){
			tmpSTR=tmpMonth;

		}
		return tmpSTR;
	},
	Date_getformat:function(pDate,pDateDefault,pType){
		
		var tmpDate=new Date();
		var tmpINT;
		var tmpSTR_date;
		
		//如果没有 pData 则使用当前时间，如果 pSTR_date 为空字符串，则把 pData 转成STRING 赋值给 pSTR_date
		if(pDateDefault!=null && pDateDefault!=""){
			tmpDate=pDateDefault;
		}
		if(pDate!=null && pDate!=""){
			tmpDate=pDate;
		}
		tmpINT=tmpDate.getMonth()+1;
		tmpSTR_date=tmpDate.getFullYear()+"-"+tmpINT+"-"+tmpDate.getDate()+" "+tmpDate.getHours()+":"+tmpDate.getMinutes()+":"+tmpDate.getSeconds();

		var tmpAR_Date=this.formatDate_AR(tmpSTR_date);
		tmpINT=tmpAR_Date[1]-1;
		tmpDate=new Date(tmpAR_Date[0],tmpINT,tmpAR_Date[2],tmpAR_Date[3],tmpAR_Date[4],tmpAR_Date[5]);

		//补0
		if(tmpAR_Date[1].length<=1){
			tmpAR_Date[1]="0"+tmpAR_Date[1];
		}
		if(tmpAR_Date[2].length<=1){
			tmpAR_Date[2]="0"+tmpAR_Date[2];
		}
		if(tmpAR_Date[3].length<=1){
			tmpAR_Date[3]="0"+tmpAR_Date[3];
		}
		if(tmpAR_Date[4].length<=1){
			tmpAR_Date[4]="0"+tmpAR_Date[4];
		}
		if(tmpAR_Date[5].length<=1){
			tmpAR_Date[5]="0"+tmpAR_Date[5];
		}

		//
		if(pType==0){
			tmpSTR_date=tmpAR_Date[0]+"-"+tmpAR_Date[1]+"-"+tmpAR_Date[2];
		}else if(pType==1){
			tmpSTR_date=tmpAR_Date[3]+"-"+tmpAR_Date[4]+"-"+tmpAR_Date[5];
		}else if(pType==2){
			tmpSTR_date=tmpAR_Date[1]+"-"+tmpAR_Date[2];
		}else if(pType==3){
			tmpSTR_date=tmpAR_Date[3]+"-"+tmpAR_Date[4]+"-"+tmpAR_Date[5];
			$tmpSTR=$tmpYear;
		}else if(pType==4){
			tmpSTR_date=tmpAR_Date[0]+"-"+tmpAR_Date[1];
		}else if(pType==5) {
			tmpSTR_date=tmpAR_Date[0]+"-"+tmpAR_Date[1]+"-"+tmpAR_Date[2]+" "+tmpAR_Date[3];
		}else if(pType==6) {
			tmpSTR_date=tmpAR_Date[0]+"-"+tmpAR_Date[1]+"-"+tmpAR_Date[2]+" "+tmpAR_Date[3]+":"+tmpAR_Date[4];
		}else if(pType==7) {
			tmpSTR_date=tmpAR_Date[0]+"_"+tmpAR_Date[1]+"_"+tmpAR_Date[2];
		}else if(pType==8) {
			tmpSTR_date=tmpAR_Date[0]+"_"+tmpAR_Date[1]+"_"+tmpAR_Date[2]+"_"+tmpAR_Date[3];
		}else if(pType==9) {
			tmpSTR_date=tmpAR_Date[0]+"_"+tmpAR_Date[1]+"_"+tmpAR_Date[2]+"_"+tmpAR_Date[3]+"_"+tmpAR_Date[4];

		}else if(pType==50) {
			tmpSTR_date=tmpAR_Date[0]+"-"+tmpAR_Date[1]+"-"+tmpAR_Date[2]+" "+tmpAR_Date[3]+":"+tmpAR_Date[4]+":"+tmpAR_Date[5];
		}else if(pType==51) {
			tmpSTR_date=tmpAR_Date[0]+""+tmpAR_Date[1]+""+tmpAR_Date[2]+""+tmpAR_Date[3]+""+tmpAR_Date[4]+""+tmpAR_Date[5];

		}else if(pType==10) {
			tmpSTR_Month=tmpAR_Date[1];
			if(tmpSTR_Month.length<2){ tmpSTR_Month="0"+tmpSTR_Month; }
			tmpSTR_Day=tmpAR_Date[2];
			if(tmpSTR_Day.length<2){ tmpSTR_Day="0"+tmpSTR_Day; }
			tmpSTR_date=tmpAR_Date[0]+"-"+tmpSTR_Month+"-"+tmpSTR_Day;
		}else if(pType==11) {
			tmpSTR_Month=tmpAR_Date[1];
			if(tmpSTR_Month.length<2){ tmpSTR_Month="0"+tmpSTR_Month; }
			tmpSTR_Day=tmpAR_Date[2];
			if(tmpSTR_Day.length<2){ tmpSTR_Day="0"+tmpSTR_Day; }
			tmpSTR_Hour=tmpAR_Date[3];
			if(tmpSTR_Hour.length<2){ tmpSTR_Day="0"+tmpSTR_Hour; }
			tmpSTR_Minute=tmpAR_Date[4];
			if(tmpSTR_Minute.length<2){ tmpSTR_Day="0"+tmpSTR_Minute; }
			tmpSTR_Second=tmpAR_Date[5];
			if(tmpSTR_Second.length<2){ tmpSTR_Day="0"+tmpSTR_Second; }
			tmpSTR_date=tmpAR_Date[0]+tmpSTR_Month+tmpSTR_Day+tmpSTR_Hour+tmpSTR_Minute+tmpSTR_Second;

		}else if(pType==20){
			tmpSTR="一";
			if(tmpDate.getDay()==1){ tmpSTR="一"; }
			else if(tmpDate.getDay()==2){ tmpSTR="二"; }
			else if(tmpDate.getDay()==3){ tmpSTR="三"; }
			else if(tmpDate.getDay()==4){ tmpSTR="四"; }
			else if(tmpDate.getDay()==5){ tmpSTR="五"; }
			else if(tmpDate.getDay()==6){ tmpSTR="六"; }
			else if(tmpDate.getDay()==0){ tmpSTR="天"; }
			tmpSTR_date=tmpAR_Date[0]+"年"+tmpAR_Date[1]+"月"+tmpAR_Date[2]+"日 星期"+tmpSTR;
			
		}else if(pType==21){
			tmpSTR="一";
			if(tmpDate.getDay()==1){ tmpSTR="一"; }
			else if(tmpDate.getDay()==2){ tmpSTR="二"; }
			else if(tmpDate.getDay()==3){ tmpSTR="三"; }
			else if(tmpDate.getDay()==4){ tmpSTR="四"; }
			else if(tmpDate.getDay()==5){ tmpSTR="五"; }
			else if(tmpDate.getDay()==6){ tmpSTR="六"; }
			else if(tmpDate.getDay()==0){ tmpSTR="天"; }
			tmpSTR_date="周"+tmpSTR;
			
		}else {
			tmpSTR_date=tmpAR_Date[0]+"-"+tmpAR_Date[1]+"-"+tmpAR_Date[2]+" "+tmpAR_Date[3]+":"+tmpAR_Date[4]+":"+tmpAR_Date[5];
		}



/*

var myDate = new Date();
myDate.getYear();        //获取当前年份(2位)
myDate.getFullYear();    //获取完整的年份(4位,1970-????)
myDate.getMonth();       //获取当前月份(0-11,0代表1月)
myDate.getDate();        //获取当前日(1-31)
myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours();       //获取当前小时数(0-23)
myDate.getMinutes();     //获取当前分钟数(0-59)
myDate.getSeconds();     //获取当前秒数(0-59)
myDate.getMilliseconds();    //获取当前毫秒数(0-999)
myDate.toLocaleDateString();     //获取当前日期
var mytime=myDate.toLocaleTimeString();     //获取当前时间
myDate.toLocaleString( );        //获取日期与时间

日期时间脚本库方法列表

Date.prototype.isLeapYear 判断闰年
Date.prototype.Format 日期格式化
Date.prototype.DateAdd 日期计算
Date.prototype.DateDiff 比较日期差
Date.prototype.toString 日期转字符串
Date.prototype.toArray 日期分割为数组
Date.prototype.DatePart 取日期的部分信息
Date.prototype.MaxDayOfDate 取日期所在月的最大天数
Date.prototype.WeekNumOfYear 判断日期所在年的第几周
StringToDate 字符串转日期型
IsValidDate 验证日期有效性
CheckDateTime 完整日期时间检查
daysBetween 日期天数差

*/




	
	
	
		return tmpSTR_date;
	}









}








