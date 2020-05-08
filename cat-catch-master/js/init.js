if(typeof localStorage['Ext']==='undefined' || localStorage['Ext'] == ''){
    var Ext = new Array(
        {"ext":"flv","size":1},
        {"ext":"hlv","size":1},
        {"ext":"f4v","size":1},
        {"ext":"mp4","size":1},
        {"ext":"mp3","size":1},
        {"ext":"wma","size":1},
        {"ext":"wav","size":1},
        {"ext":"m4a","size":1},
        {"ext":"letv","size":1},
        {"ext":"ts","size":2},
        {"ext":"webm","size":1},
        {"ext":"ogg","size":1},
        {"ext":"ogv","size":1},
        {"ext":"acc","size":1},
        {"ext":"mov","size":1},
        {"ext":"mkv","size":1},
        {"ext":"m3u8","size":0}
    );
    localStorage['Ext'] = JSON.stringify(Ext);
}

if(typeof localStorage['Type']==='undefined'){
    var Type = new Array(
        {"Type":"video/*"},
        {"Type":"audio/*"}
    );
    localStorage['Type'] = JSON.stringify(Type);
}

if(typeof localStorage['repeat']==='undefined'){
    localStorage['repeat'] = false;
}

if(typeof localStorage['repeatReg']==='undefined'){
    localStorage['repeatReg'] = "\\?[\\S]+";
}

if(typeof localStorage['Debug']==='undefined'){
    localStorage['Debug'] = false;
}

if(typeof localStorage['TitleName']==='undefined'){
    localStorage['TitleName'] = false;
}