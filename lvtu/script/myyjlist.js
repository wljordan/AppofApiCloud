

function backToWin(){	
    setTimeout(function () {    
       api.closeWin();      
    }, 100);
}

function openuseryj(travelid){
	
     var uid = $api.getStorage('uid');
	api.openWin({
	        name: 'useryj',
	        url: 'useryj.html',
	        opaque: true,
	        vScrollBarEnabled:false,
	        pageParam:{uid:uid,travelid:travelid}
	    });
}

/*
 * 获得游记天数和记录数
 */
/*
function getdaynum(travelid,callback){
	var daynum=0; 	
	var recnum=0;
	 var getdaynumUrl = '/youji?filter=';
    var getdaynum_urlParam = {
    	where:{
    		id:travelid
    		},
    	include:['zjofyouji','record']
    };
    ajaxRequest(getdaynumUrl + JSON.stringify(getdaynum_urlParam), 'GET', '', function (ret, err) { 
	 	//alert(JSON.stringify(ret));
        if (ret && ret[0]!=null &&  ret[0].zjofyouji!=null &&  ret[0].zjofyouji[0]!=null) {  
        		
        	  daynum=ret[0].zjofyouji.length;
        	  recnum = ret[0].record.length;
        	  callback&&callback(daynum,recnum);
        }
        else{
        	alert(JSON.stringify(err));
        }
        api.hideProgress();  
    });    
}
*/

function init(){
	api.showProgress({
        title: '加载中...',
        modal: false
    });
	var strr='';
    /*
     * 第一期获得全部的point,二期开始分天显示点
     */    
     var uid = $api.getStorage('uid');
	var zjUlr = '/user?filter=';
	var zjUlr_Param = {
      	 where:{
    		id:uid
    		},
    	include: ['youji'],
    	includefilter:{
    		youji:{
    			order:'updatedAt DESC'
    		}
    	}
			       
	    //	['record',{record:['img']}]
    }
    
	 ajaxRequest(zjUlr+JSON.stringify(zjUlr_Param), 'GET', '', function (ret, err) {
        if (ret) {
        	
        	var t = ret[0].youji;
        	for(var id in t){        	
	            strr+='<div class="youji-box" onclick="openuseryj('+"'"+t[id].id+"'"+');">';		
	            strr+='<div class="youji-top clearfix" tapmode="tap-active" onclick="" data-id="120333" data-type="">';		
	           
	            var yjname='';
	            if(t[id].yjname!=null && t[id].yjname!=''){
	            	yjname=t[id].yjname;
	            }
	            else{
	            	yjname='游记还未起名';
	            }	           
	            strr+='<span class="user-name pull-left">'+yjname+'</span></div>';		
	            strr+='<div class="youji-content-text" tapmode="tap-active" onclick="" data-id="90000099">';		
	           	var newdate = new Date(t[id].updatedAt);
	           	var tmpMonth =newdate.getMonth()+1;
   				 var newday = newdate.getFullYear()+'-'+tmpMonth+'-'+newdate.getDate();
	            strr+='<p class="text">创建于：'+newday+'</p></div></div>';		
	          		
        		
            }	
            $api.byId('yj').innerHTML = strr;
           
        } else {
            api.alert({
                msg: err.msg
            });
        }
        api.hideProgress();
    })
}

apiready = function () {
 	var uid= api.pageParam.uid;
    $api.setStorage('uid',uid);  
    
    init();

    api.addEventListener({
        name: 'scrolltobottom'
    }, function (ret, err) {
    	init();
    });
	

};