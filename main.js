// ==UserScript==
// @name         BILIBILI屏蔽UP
// @namespace    https://github.com/wwuddan123/bilibili_hide_up
// @version      0.1
// @description  try to take over the world!
// @author       wwuddan123
// @match        https://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //******************** 用户配置 开始 ********************************
    // 要屏蔽的UP主(以下仅为示例)
    const upNames = ["衣戈猜想","绵羊料理","老师好我叫何同学","硬核的半佛仙人"]
    // 要屏蔽的标题关键字
    const titleKeys = ["直播","破防"]
    // 屏蔽时是否仍在原位置显示“已屏蔽”字样，可切换true,false查看效果
    const showLog = true
    //******************** 用户配置 结束 ********************************

    var exec = function(){
        const upClassMap = {
            "bili-video-card":"bili-video-card__info--author",
            "video-card":"up-name__text",
            "rank-item":"up-name",
            "bili-live-card":"bili-live-card__info--uname",
        }
        const titleClassMap = {
            "bili-video-card":"bili-video-card__info--tit",
            "video-card":"video-name",
            "rank-item":"title",
            "bili-live-card":"bili-live-card__info--text",
        }
        hide(upNames,upClassMap, "UP")
        hide(titleKeys,titleClassMap, "标题")
    }
    function hide(keywords, classMap, reason){
        for(var itemClass in classMap){
            try{
                var videoCardList = document.getElementsByClassName(itemClass)
                for(var i=0,len=videoCardList.length;i<len;i++){
                    var item = videoCardList[i]
                    try{
                        var targetText = item.getElementsByClassName(classMap[itemClass])[0].innerText.trim()
                        var hidedKeyword = containsKeyword(keywords,targetText);
                        if(targetText && hidedKeyword){
                            if(showLog){
                                item.innerHTML = '屏蔽'+reason+'“'+hidedKeyword +'” By Tampermonkey'
                            }else{
                                item.style.display = "none"
                            }
                        }
                    }catch(e){
                    }
                }
            }catch(e){
            }
        }
    }

    function containsKeyword(keywords, text){
        for(var index in keywords){
            if(text.indexOf(keywords[index]) > -1){
                return keywords[index];
            }
        }
        return false;
    }

    window.setInterval(exec, 1000)

})();