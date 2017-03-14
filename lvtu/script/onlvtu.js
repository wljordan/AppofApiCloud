/*
 * 设置zuji和yjzuji
 */
/*
function setZuji(callback){
	var zid='';
 	api.showProgress({
        title: '加载中...',
        modal: false
    });
    var curday = new Date();
    var tmpMonth =curday.getMonth()+1;
    var newday = curday.getFullYear()+'-'+tmpMonth+'-'+curday.getDate();
	 var getzujiUrl = '/zuji?filter=';
    var zuji_urlParam = {
    	where:{
    		day:newday
    		}
    };
    ajaxRequest(getzujiUrl + JSON.stringify(zuji_urlParam), 'GET', '', function (ret, err) {  
        if (ret && ret[0]!=null && ret[0].id!=null) {     
        	  zid=ret[0].id;     	  
        	 callback&&callback(zid);
        }
        else{
        	 var setzujiUlr = '/zuji';
			var bodyParam = {
		        day:newday,
		    }
		   
			 ajaxRequest(setzujiUlr, 'post', JSON.stringify(bodyParam),function (ret, err) {			 	
		        if (ret&& ret.id!=null) {	        
		            zid=ret.id;         			    	  
        	 		callback&&callback(zid);
		        } else {
		            api.alert({
		                msg: err.msg
		            });
		        }
		        api.hideProgress();
		    })
        	//alert(JSON.stringify(err));
        }
        api.hideProgress();  
    });    
}

function setZujiofYouji(travelid,callback){
	var zidofyj='';
 	api.showProgress({
        title: '加载中...',
        modal: false
    });
    var curday = new Date();
    var tmpMonth =curday.getMonth()+1;
    var newday = curday.getFullYear()+'-'+tmpMonth+'-'+curday.getDate();
	 var getzujiofyoujiUrl = '/youji?filter=';
	 
    var zjofyj_urlParam = {
    	where:{
    		id:travelid
    		},
    	include: ['zjofyouji'],
    	includefilter:{
    		zjofyouji:{
    			where:{
    				day:newday
    			}
    		}
    	}
    };
    ajaxRequest(getzujiofyoujiUrl + JSON.stringify(zjofyj_urlParam), 'GET', '', function (ret, err) {   
        alert(JSON.stringify(ret));
        if (ret && ret[0].zjofyouji!=null&&ret[0].zjofyouji.id!=null) {     
        	  zidofyj=ret[0].zjofyouji.id;        	 	      			    	  
	 		callback&&callback(zidofyj);
        }
        else{
        	var setzujiUlr = '/youji/'+travelid+'/zjofyouji';
			var bodyParam = {
		        day:newday,
		    }		   
			 ajaxRequest(setzujiUlr, 'post', JSON.stringify(bodyParam),function (ret, err) {			 	
		        if (ret&& ret.id!=null) {	        
		            zid=ret.id;         			    	  
        	 		callback&&callback(zid);
		        } else {
		            api.alert({
		                msg: err.msg
		            });
		        }
		        api.hideProgress();
		    })
        	//alert(JSON.stringify(err));
        }
        api.hideProgress();
        //return zid;
    });    
}
*/
function backToSlide(){	
    setTimeout(function () {    
       api.closeWin();      
    }, 100);
}


apiready = function () {


	api.addEventListener({
        name:'viewappear'
    },function(ret,err){
    	
       var travelstatus = $api.getStorage('intravel');   
       //alert(travelstatus);
		if(travelstatus && travelstatus==0){
			backToSlide();
			//api.closeWin({name:'onlvtu'});
		    return;
		}
	
    })   
    
	var travelstatus = $api.getStorage('intravel');   
	if(travelstatus && travelstatus==0){
		api.closeWin();
	    return;
	}

    $api.fixStatusBar($api.dom('.header'));
    
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err){    	
    	
    	api.closeWin();
        //api.closeWidget();
    });  
	 
    
    var uid= api.pageParam.uid;
    var travelid=api.pageParam.travelid;
	$api.setStorage('uid',api.pageParam.uid);       
	$api.setStorage('travelid',api.pageParam.travelid);   
	var pausestatus = $api.getStorage('travelpause');	
	//alert(pausestatus);
	if(pausestatus && pausestatus==1){		
		api.openWin({
	        name: 'travel-pause',
	        url: 'travel-pause.html',
	        opaque: true,
	        vScrollBarEnabled: false,
	        pageParam:{uid:uid,travelid:travelid}
	    });
	}
	
	
	/*
	 * 开始旅游时，一定要先建一个
	 */
	/*
	var zujiid =$api.getStorage('zujiid');	    
	var zujiidofyouji =$api.getStorage('zujiidofyouji');
	if(zujiid!=null || zujiid!='' || zujiidofyouji!=null || zujiidofyouji!=''){
		setZuji(function(zid){	
			//var zidofyj = setZujiofYouji(travelid);
			if(zujiid!='' && zujiid!=null){
				var zidofyj='';
				
				setZujiofYouji(travelid,function(zidofyj){
					if(zidofyj!='' && zidofyj!=null){						
						$api.setStorage('zujiid',zujiid);       
						$api.setStorage('zujiidofyouji',zidofyj);   
					}			
				});	
				
		    }
		});
	}
	*/
    
};

function pauseYouji(){
	$api.setStorage('travelpause',1);   
	var uid =  $api.getStorage('uid');	
	var travelid =  $api.getStorage('travelid');	
	api.openWin({
        name: 'travel-pause',
        url: 'travel-pause.html',
        opaque: true,
        vScrollBarEnabled: false,
        pageParam:{uid:uid,travelid:travelid}
    });
}


function addNote(){
	var uid =  $api.getStorage('uid');	
	var travelid =  $api.getStorage('travelid');	
	
    //var zujiid =$api.getStorage('zujiid');	    
	//var zujiidofyouji =$api.getStorage('zujiidofyouji');
	
	
	api.openWin({
	        name: 'travel-addnote',
	        url: 'travel-addnote.html',
	        opaque: true,
	        vScrollBarEnabled: false,
	        pageParam:{uid:uid,travelid:travelid}
	    });
}

function addPhoto(){
	var uid =  $api.getStorage('uid');	
	var travelid =  $api.getStorage('travelid');	
	//var zujiid =$api.getStorage('zujiid');	    
	//var zujiidofyouji =$api.getStorage('zujiidofyouji');
	
	
	api.openWin({
        name: 'travel-addphoto',
        url: 'travel-addphoto.html',
        opaque: true,
        vScrollBarEnabled: false,
        pageParam:{uid:uid,travelid:travelid}
    });
}


function endYouji(){	
	var uid =  $api.getStorage('uid');	
	var travelid = $api.getStorage('travelid');	
	api.openWin({
        name: 'travel-end',
        url: 'travel-end.html',
        opaque: true,
        vScrollBarEnabled: false,
        pageParam:{uid:uid,travelid:travelid}
    });
}