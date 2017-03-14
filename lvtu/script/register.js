var inputWrap = $api.domAll('.input-wrap');
var i = 0, len = inputWrap.length;
for (i; i < len; i++) {
    var txt = $api.dom(inputWrap[i], '.txt');
    var del = $api.dom(inputWrap[i], '.del');
    (function (txt, del) {
        $api.addEvt(txt, 'focus', function () {
            if (txt.value) {
                $api.addCls(del, 'show');
            }
            $api.addCls(txt, 'light');
        });
        $api.addEvt(txt, 'blur', function () {
            $api.removeCls(del, 'show');
            $api.removeCls(txt, 'light');
        });
    })(txt, del);

}

function delWord(el) {
    var input = $api.prev(el, '.txt');
    input.value = '';
}

function sendCode(){
	//var sendcodeUrl = '/user/sendvercode';
	
    var uname = $api.byId('userName').value;		//手机号码
    var bodyParam = {
        mobile:uname
    }       
    
	var smsVerify = api.require('smsVerify');

	 smsVerify.sms({
	    phone: uname,
	    country:"86"
	},function(ret, err){
	    if(ret.status){
	        if( ret.smart == true ){    // 安卓版特有功能 智能验证
	            api.alert({msg: '智能验证成功：开发者可以在这里直接执行手机号验证成功之后的相关操作'});
	        }else{
	            api.alert({msg: '短信发送成功'});
	        }
	    }else{
	        //api.alert({msg: err.code+' '+err.msg});
	    }
	});
    
    /*
    ajaxRequest(sendcodeUrl, 'post', JSON.stringify(bodyParam), function (ret, err) {
        if (ret) {
            api.alert({
                msg: ret
            }, function () {
                
            });

        } else {
            api.alert({
                msg: err.msg
            });
        }
        api.hideProgress();
    })
	*/
}
function ensure() {
    api.showProgress({
        title: '注册中...',
        modal: false
    });
    var uname = $api.byId('userName').value;		//手机号码
    var pwd = $api.byId('userPwd').value;
    /*
    var pwd2 = $api.byId('userPwd2').value;
    if (pwd !== pwd2) {
        api.alert({
            msg: '两次密码不一致'
        }, function (ret, err) {
            //coding...
        });
        return;
    }
    */
   var code = $api.byId('code').value;
   var smsVerify = api.require('smsVerify');
	smsVerify.verify({
	    phone:uname,
	    country:"86",
	    code:code
	},function(ret, err){
	    if(ret.status){
	        //api.alert({msg: '验证成功'});
	        /*
    		 * 首先插入appUser表
    		 */
    		var tmpbodyParam = {
		        nickname: '',
		        gender:''					        
		    }
    		ajaxRequest('/appUser', 'post', JSON.stringify(tmpbodyParam), function (ret, err) {
	    		if (ret) {
	    			var appuid = ret.id;
			        var registerUrl = '/user/';
				    var bodyParam = {
				        username: uname,
				        password: pwd,
				        mobile:uname,
				        userinfo:appuid
				    }
				    ajaxRequest(registerUrl, 'post', JSON.stringify(bodyParam), function (ret, err) {
				        if (ret) {
				        	//api.alert({msg:ret});
				        	api.alert({
				                msg: '注册成功！'
				            }, function () {
				                api.closeWin();
				            });		        	
				        } else {
				            api.alert({
				                msg: err.msg
				            });
				        }
				        api.hideProgress();
				    })
	    				
	    		}else{
	    		}
    		});
    		
	    }else{
	    	api.alert({msg: '请确认手机验证码！'});
	        //api.alert({msg: err.code+' '+err.msg});
	    }
	});
    
}
apiready = function () {
    var header = $api.byId('header');
    $api.fixIos7Bar(header);
    
    
	var smsVerify = api.require('smsVerify');

	smsVerify.register(function(ret, err){
	    if(ret.status){
	        //api.alert({msg: '注册成功'});
	    }else{
	        api.alert({msg: err.code+' 注册失败'});
	    }
	});
    
};