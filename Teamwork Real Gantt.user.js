
// ==UserScript==
// @name       Teamwork Real Gantt
// @namespace  http://realisations.net
// @version    0.22
// @description  Make the world a better place
// @match      https://realisationsnet.teamworkpm.net/*
// @require http://code.jquery.com/jquery-latest.js
// @updateURL https://github.com/yohtm/userscripts/raw/master/Teamwork%20Real%20Gantt.user.js
// ==/UserScript==

ran = 0

function run(){
    console.log("run")
    imgs = $("img[id^='m_i_']").each(function(){
        mid = $(this).attr("id").split("_")[2]
        $(this).parent().html("<a href='milestones/" + mid + "'>" + $(this).parent().html() + "</a>")
    })
}

$(document).ready(function() {    
    
    $('body').on('DOMNodeInserted', '#chartControls', function () {
        if (!ran){
            ran = 1
            setTimeout(function() { run(); }, 500);
        }
        setTimeout(function() { ran = 0; }, 1500);
    });
 
});