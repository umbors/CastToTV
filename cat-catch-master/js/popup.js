var BG = chrome.extension.getBackgroundPage();
var tabid;
chrome.windows.getCurrent(function(wnd){
    chrome.tabs.getSelected(wnd.id, function(tab){
        tabid = tab.id;
        var id="tabid"+tab.id;
        ShowMedia(BG.mediaurls[id]);
    });
});

//html5播放器允许格式
function isPlay(ext){
    var arr = ['ogg','ogv','mp4','webm','mp3','wav','flv','m4a'];
    if(arr.indexOf(ext) > -1){
        return true;
    }
    return false;
}

//监听数据
chrome.runtime.onMessage.addListener(function(data){
    if(data.tabid == tabid){
        $('#tempntc').hide();
        AddMedia(data);
    }
});

function ShowMedia(data){
    if(data==undefined || data.length==0){
        $('#tempntc').fadeIn(500);
        return;
    }
    for(var i = 0; i < data.length; i++){
        AddMedia(data[i]);
    }
}

function AddMedia(data){
    //文件名是否为空
    if(data.name == undefined || data.name == ''){
        data.name = data.title;
    }
    
    //网页标题做文件名
    if(localStorage['TitleName'] == "true"){
        if( data.ext ){
            DownName = data.title + '.' + data.ext;
        }else{
            DownName = data.title;
        }
        
    }else{
        DownName = data.name;
    }
    
    //截取文件名长度
    fullname = data.name;
    if(fullname.length >= 12){
        fullname = fullname.replace(/\.[^.\/]+$/, "");
        name = fullname.substr(0,3) + '···' +fullname.substr(-5)+ '.' + data.ext;
    }else{
        name = fullname;
    }
    
    if( data.type == 'application/octet-stream' ){
        data.size = '[stream]';
    }
    var html = '<div class="panel"><div class="panel-heading">';  
    html += '<img src="img/cast.png" class="ico" id="cast">';
    html += '<img src="img/copy.png" class="ico" id="copy">';
    /*if(data.ext == 'm3u8'){
		html += '<img src="img/parsing.png" class="ico" id="m3u8">';
	} 
    if( isPlay(data.ext) ){
        html += '<img src="img/play.png" class="ico" id="play">';
    }*/
    html += '<span class="name">'+name+'</span>';
    html += '<input type="checkbox" class="DownCheck" checked="true"/>'; 
    html += '<span class="size">'+data.size+'</span>';  
    html += '</div><div class="url"><a href="'+data.url+'" target="_blank" cast="'+DownName+'">'+data.url+'</a></div>';
    html += '</div>';
    $('#medialist').append(html);

    //显示完整地址
    //$('#medialist .panel-heading').off().on('click',function(){
    //    id = $(this).next();
    //    $(id).toggle();
    //    return true;
    //});
    
    //复制
    $('#medialist #copy').off().on('click',function(){
        var url = $(this).parents().find('.url a').attr('href');
        var text = $('<input id="copy_tmp" value="'+url+'" />');
        $('body').append(text);
        text.select();
        document.execCommand('Copy');
        $('#copy_tmp').remove();
        $('#tempntc').html('已复制到剪贴板').fadeIn(500).delay(500).fadeOut(500);
        return false;
    });
    
    //投屏
    $('#medialist #cast').off().on('click',function(){
        var url = $(this).parents().find('.url a').attr('href');
        BG.send(url);
    });
    
    //播放
    $('#medialist #play').off().on('click',function(){
        var url = $(this).parents().find('.url a').attr('href');
        $('#player').appendTo(  $(this).parent().parent() );
        $('video').attr('src',url);
        $('#player').show();
       
       //播放关闭按钮
        $('#CloseBtn').bind("click", function(){
            $('video').removeAttr('src');
            $("#player").hide();
            $('#player').appendTo('body');
            return false;
        });
        return false;
    });
	
	//解析m3u8
    $('#medialist #m3u8').off().on('click',function(){ 
		var url = $(this).parents().find('.url a').attr('href');
		chrome.tabs.create({ url: '/m3u8.html?m3u8_url='+url });
		return false;
    });
    
    //复制选中文件
    $('#AllCopy').off().on('click',function(){
        var text = $('<textarea id="copy_tmp"></textarea>');
        var url = '';
        $('#medialist input').each(function(){
           if( $(this).prop('checked') ){
               url += $(this).parents().find('.url a').attr('href') + "\n";
           }
        });
        $(text).val(url);
        $('body').append(text);
        text.select();
        document.execCommand('Copy');
        $('#copy_tmp').remove();
        $('#tempntc').html('已复制到剪贴板').fadeIn(500).delay(500).fadeOut(500);
        return false;
    });
    
    //全选
    $('#AllSelect').off().on('click',function(){
        $('#medialist input').each(function(){
           $(this).attr("checked",'true');
        });
        return false;
    });
    
    //反选
    $('#ReSelect').off().on('click',function(){
        $('#medialist input').each(function(){
           if( $(this).prop('checked') ){
               $(this).attr('checked',false);
           }else{
               $(this).attr('checked',true);
           }
        });
        return false;
    });
}