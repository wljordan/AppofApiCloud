apiready = function () {
	
	//$api.setStorage('uid','58a45e8e6b1017645e8f437d');   

    api.setStatusBarStyle({
        style: 'dark',
        color: '#000'
    });
    $api.fixStatusBar($api.dom('nav'));   
    
    setUserInfo();
    api.addEventListener({
            name:'viewappear'
        },function(ret,err){
            //operation
            //alert($api.getStorage('uid'));           
           setUserInfo();
        })   
    
};

/*
 * 设置fixed用户头像和信息
 */
function setUserInfo(){
	 var uid = $api.getStorage('uid');     
	 
    //alert(uid);
	if(!uid || uid=='undefined'){
		 $api.byId('userinfo').innerHTML="点击登录";
	}
	else{		
		var getUserInfoUrl = '/user?filter=';
	    var userinfo_urlParam = {
	    	where:{
	    		id:uid
	    		},
	    	include:['userinfoPointer']
	    };
	    ajaxRequest(getUserInfoUrl + JSON.stringify(userinfo_urlParam), 'GET', '', function (ret, err) {   
	        if (ret) {  
	            api.hideProgress();
	             $api.byId('userinfo').innerHTML=ret[0].userinfo.nickname;
	        	//getUserLvyou('myyouji');              
	            //getFavData('activity', localStorage.getItem('actFavArr'));
	        } else {
	            api.toast({msg: err.msg, location: 'middle'})
	            api.hideProgress();
	        }
	
	    })
	}
}

function userinfo(){
	var uid = $api.getStorage('uid');     
    //alert(uid);
	if(!uid || uid=='undefined'){
		 api.openWin({
		        name: 'userLogin',
		        url: 'userLogin.html',
		        opaque: true,
		        vScrollBarEnabled:false
		    });
		    return;
	}
	else{		
		api.openWin({
	        name: 'user',
	        url: 'user.html',
	        opaque: true,
	        vScrollBarEnabled:false
	    });
	    return;
	}
}


function showzuji(){
	
	 var uid = $api.getStorage('uid'); 
	if(!uid || uid=='undefined'){
		 api.openWin({
		        name: 'userLogin',
		        url: 'userLogin.html',
		        opaque: true,
		        vScrollBarEnabled:false
		    });
		    return;
	}
	else{
		api.openWin({
	        name: 'userzuji',
	        url: 'userzuji.html',
	        opaque: true,
	        vScrollBarEnabled:false,
	        pageParam:{uid:uid}
	    });
    }
}

function showyouji(){
	
	 var uid = $api.getStorage('uid'); 
	if(!uid || uid=='undefined'){
		 api.openWin({
		        name: 'userLogin',
		        url: 'userLogin.html',
		        opaque: true,
		        vScrollBarEnabled:false
		    });
		    return;
	}
	else{
		api.openWin({
	        name: 'myyjlist',
	        url: 'myyjlist.html',
	        opaque: true,
	        vScrollBarEnabled:false,
	        pageParam:{uid:uid}
	    });
    }
}

function showabout(){
	
	 var uid = $api.getStorage('uid'); 
	
	api.openWin({
        name: 'aboutus_window',
        url: 'aboutus_window.html',
        opaque: true,
        vScrollBarEnabled:false,
        pageParam:{uid:uid}
    });
}