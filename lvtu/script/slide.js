function sliding() {
	
    api.openSlidPane({type: 'left'});
    
}
apiready = function () {	
	var header = document.querySelector('#header');
	$api.fixStatusBar(header);
    //$api.setStorage('uid','58a45e8e6b1017645e8f437d');
       

    api.addEventListener({
	    name: 'closemap'
	}, function(ret, err) {
	    //alert(JSON.stringify(ret.value));
	    if(ret.value.key1=='fromdayzuji' || ret.value.key1=='fromtravelpause'){
	    	//alert();
	    	var amap = api.require('aMap');   
			amap.close(); 
	    }
	});
       
    $api.fixStatusBar($api.dom('.header'));
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err){
        api.closeWidget();
    });      
    api.addEventListener({
        name:'viewappear'
    },function(ret,err){
        //operation
       //alert($api.getStorage('uid'));	      
       
       var travelstatus = $api.getStorage('intravel');   
       	//alert(travelstatus);
		if(travelstatus && travelstatus==1){
			var travelid =  $api.getStorage('travelId');
			var uid = $api.getStorage('uid');
			/*			
		     var amap = api.require('aMap');
		    amap.close();
		    */
			api.openWin({
		        name: 'onlvtu',
		        url: 'onlvtu.html',
		        opaque: true,
		        vScrollBarEnabled: false,
		        pageParam:{uid:uid,travelid:travelid}
		    });
		    return;
		}
		init();
    })
    init(); 
	var travelstatus = $api.getStorage('intravel');   
	//alert(travelstatus);
	
	if(travelstatus && travelstatus==1){
		var travelid =  $api.getStorage('travelId');
		var uid = $api.getStorage('uid');
	   
	    var amap = api.require('aMap');
	    amap.close();
		api.openWin({
	        name: 'onlvtu',
	        url: 'onlvtu.html',
	        opaque: true,
	        vScrollBarEnabled: false,
	        pageParam:{uid:uid,travelid:travelid}
	    });
	    return;
	}
      
};


function init(){
	/*
	var baidumap = api.require('baiduMap');
	baidumap.open({
	    rect: {
	        x: 0,
	        y: 40,
	    },
	    center: {
	        lon: 116.4021310000,
	        lat: 39.9994480000
	    },
	    zoomLevel: 16,
	    showUserLocation: true,
	    fixedOn: api.frameName,
	    fixed: true
	}, function(ret) {
	    if (ret.status) {
	        alert('地图打开成功');
	        setlocation();
	    	initSetLocationbtn();	      
	    	initStartbtn();	
	    }
	});
	*/
	/* amap*/
	var aMap = api.require('aMap');
	aMap.open({
	    rect: {
	        x: 0,
	        y: 40
	    },
	    showUserLocation: true,
	    zoomLevel: 16,
	    center: {
	        lon: 116.4021310000,
	        lat: 39.9994480000
	    },
	    fixedOn: api.frameName,
	    fixed: true
	}, function(ret, err) {
	    if (ret.status) {         	   
	    	setlocation();
	    	initSetLocationbtn();	      
	    	initStartbtn();	
	        //alert(JSON.stringify(ret));
	        
	    } else {
	        alert(JSON.stringify(err));
	    }
	});
	
	/* amap	 */
}

function setlocation(){
	/*
	var baidumap = api.require('baiduMap');
	baidumap.getLocation({
	    accuracy: '100m',
	    autoStop: true,
	    filter: 1
	}, function(ret, err) {
	    if (ret.status) {
	        //alert(JSON.stringify(ret));
	        
		var baidumap = api.require('baiduMap');
		baidumap.setCenter({
	        coords: {
		        lon: ret.lon,
		        lat: ret.lat
	        },
	        animation: false
        });
	    } else {
	        alert(err.code);
	    }
	});
	*/
	/*baiduLocation
	var baiduLocation = api.require('baiduLocation');
	baiduLocation.startLocation({
	    accuracy: '100m',
	    filter: 1,
	    autoStop: true
	}, function(ret, err) {
	    if (ret.status) {
	        alert(JSON.stringify(ret));
	    } else {
	        alert(JSON.stringify(err));
	    }
	});
	*/


	/*aMapLBS
	var aMapLBS = api.require('aMapLBS');
		aMapLBS.configManager({
		    accuracy: 'hundredMeters',
		    filter: 1
		}, function(ret, err) {
		    if (ret.status) {
		        alert('定位管理器初始化成功！');
		        var aMapLBS = api.require('aMapLBS');
		        aMapLBS.singleLocation({
	                timeout: 10
                },function(ret, err) {		        	
				    if (ret.status) {
				        alert(JSON.stringify(ret));
				        var aMap = api.require('aMap');
				        aMap.setCenter({
					    coords: {
					        lon: ret.lon,
					        lat: ret.lat
					    },
					    animation: false
					});
				    }
				});
		    }
		});
	*/
	/*aMap*/
	var aMap = api.require('aMap');
        aMap.getLocation({
        	autoStop:true
        },function(ret, err) {
		    if (ret.status) {
		        //alert(JSON.stringify(ret));	
		        if(ret.lon>0){
					aMap.setCenter({
					    coords: {
					        lon: ret.lon,
					        lat: ret.lat
					    },
					    animation: false
					});
					
		        }
		    } else {
		        alert(JSON.stringify(err));
		    }
		});	        
	/*amap*/
}

function initSetLocationbtn(){
	var button = api.require('UIButton');
	button.open({
	    rect: {
	        x: 10,
	        y: 500,
	        w: 30,
	        h: 30
	    },
	    corner: 5,
	    bg: {
	        normal: 'widget://image/setmaplocation.png',
	        highlight: 'widget://image/setmaplocation.png',
	        active: 'widget://image/setmaplocation.png'
	    },
	    title: {
	        size: 14,
	        highlight: '',
	        active: '',
	        normal: '',
	        highlightColor: '#000000',
	        activeColor: '#000adf',
	        normalColor: '#ff0000',
	        alignment: 'center'
	    },
	    fixedOn: api.frameName,
	    fixed: true,
	    move: true
	}, function(ret, err) {
	    if (ret) {	 
	    	$api.setStorage('setlocationbtn',ret.id);		//存储定位按钮的id
	    	if(ret.eventType=="click")
	    	{
	    		
	    		setlocation();
	    	}
	        //alert(JSON.stringify(ret));
	    } else {
	        //alert(JSON.stringify(err));
	    }
	});
}

function initStartbtn(){
	var button2 = api.require('UIButton');
	button2.open({
	    rect: {
	        x: 110,
	        y: 550,
	        w: 134,
	        h: 46
	    },
	    corner: 5,
	    bg: {
	        normal: 'widget://image/start.png',
	        highlight: 'widget://image/start.png',
	        active: 'widget://image/start.png'
	    },
	    title: {
	        size: 14,
	        highlight: '',
	        active: '',
	        normal: '',
	        highlightColor: '#000000',
	        activeColor: '#000adf',
	        normalColor: '#ff0000',
	        alignment: 'center'
	    },
	    fixedOn: api.frameName,
	    fixed: true,
	    move: true
	}, function(ret, err) {
	    if (ret) {	 
	    	$api.setStorage('setstartbtn',ret.id);		//存储定位按钮的id
	    	if(ret.eventType=="click")
	    	{
	    		showmnstack();
	    	}
	        //alert(JSON.stringify(ret));
	    } else {
	        //alert(JSON.stringify(err));
	    }
	});
}

function showmnstack(){
	var MNStack = api.require('MNStack');
	MNStack.open({
	    startCoords: {
	        x: 110,
	        y:400
	    },
	    styles: {
	        bg: 'rgba(0,0,0,0.7)',
	        itemHeight: 50,
	        titleColor: '#333'
	    },
	    items: [{
	        title: '来一场说走就走的旅行',
	        bgColor: '#fff'
	    },
	    /*{
	        title: '制定一个出游计划先',
	        bgColor: '#fff'
	    },*/
	    {
	        title: '看看大家都在怎么玩',
	        bgColor: '#fff'
	    }]
	}, function(ret, err) {
	    if (ret) {
	        //alert(JSON.stringify(ret));
	        switch(ret.index){
	        	case 0:
	        		startlvtu();
	        		break;
	        	/*case 1:
	        		startplan();
	        		break;*/
	        	case 1:
	        		showyouji();
	        		break;
	        	default:
	        		break;
	        }
	    } else {
	        alert(JSON.stringify(err));
	    }
	});
}

function startlvtu(){		
	var uid = $api.getStorage('uid');
    if(!uid){
		api.openWin({
	        name: 'userLogin',
	        url: 'userLogin.html',
	        opaque: true,
	        vScrollBarEnabled:false
	    });
	    return;
	}

	api.showProgress({
        title: '加载中...',
        modal: false
    });
	//创建一个新的游记
	//var appUid = $api.getStorage('appUid');
	
	var newyoujiUlr = '/user/'+uid+'/youji';
	var bodyParam = {
        yjname: ''
    }
	 ajaxRequest(newyoujiUlr, 'post', JSON.stringify(bodyParam), function (ret, err) {
        if (ret) {
            $api.setStorage('intravel',1);   
            $api.setStorage('travelId',ret.id);  
            /*
             setTimeout(function () {
		     var amap = api.require('aMap');
		    	amap.close();
		    }, 100);
		    */
           //api.closeWin();
            api.openWin({
		        name: 'onlvtu',
		        url: 'onlvtu.html',
		        opaque: true,
		        vScrollBarEnabled: false,
		        pageParam:{uid:uid,travelid:ret.id}
		    });
        } else {
            api.alert({
                msg: err.msg
            });
        }
        api.hideProgress();
    })
	
}

function startplan(){	
	alert(1);
}

function showyouji(){
	alert(2);
}