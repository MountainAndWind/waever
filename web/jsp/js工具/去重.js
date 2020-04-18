function quchong(str) {
    var newStr = "";
    for(var i = 0,len=str.length;i<len;i++) {
        if(newStr.indexOf(str[i]) == -1){
            newStr += str[i]
        }
    }
    return newStr
}