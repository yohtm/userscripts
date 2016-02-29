
// ==UserScript==
// @name       BetterTeamworkPM
// @namespace  http://realisations.net
// @version    0.3
// @description  Make the world a better place
// @match      https://*.teamworkpm.net/*
// @require http://code.jquery.com/jquery-latest.js
// @updateURL https://github.com/yohtm/userscripts/raw/master/BetterTeamworkPM.user.js
// ==/UserScript==

ranGantt = 0
ranTasklists = []

function runGantt(){
    console.log("run")
    imgs = $("img[id^='m_i_']").each(function(){
        mid = $(this).attr("id").split("_")[2]
        $(this).parent().html("<a href='milestones/" + mid + "'>" + $(this).parent().html() + "</a>")
    })
}

function runTasklist(tasklist){
    //console.log(tasklist)
    all_assign_span = tasklist.find("span.n")
    all_assign_span.each(function(){
        ini = $(this).text();
        
        no_acc = makeSortString(ini)
        
        if ((ini.match(/\./g) || []).length == 1 && ini != "Anyone"){
            img = "https://googledrive.com/host/0B8uGlSlmQZ2Zb29JMmFyU2hyLWc/" + no_acc.split(" ")[0] + ".png"
            $(this).html("<img src=" + img + " style='width: 21px; padding-right: 4px; vertical-align: middle;'>" + ini.split(" ")[0])
            $(this).css("line-height", "25px")
        }
    })
    
    all_percent_span = tasklist.find("span.num")
    all_percent_span.each(function(){
        ini = $(this).text();
        if (ini == "90%"){
            $(this).html("<div style='width: 45px; height:18px; background-color: rgb(0, 150, 25); color: white; text-align: center; border-radius: 5px;' >Done</div>")
        }
    })

    $("a.taskBubble").css("min-height", "25px")
    
}

function makeSortString(s) {
  if(!makeSortString.translate_re) makeSortString.translate_re = /[éèë]/g;
  var translate = {
      "é": "e", "ë": "e", "è": "e"
  };
  return ( s.replace(makeSortString.translate_re, function(match) { 
    return translate[match]; 
  }) );
}

$(document).ready(function() {    
    
    $('body').on('DOMNodeInserted', '#chartControls', function () {
        if (!ranGantt){
            ranGantt = 1
            setTimeout(function() { runGantt(); }, 500);
        }
        setTimeout(function() { ran = 0; }, 1500);
    });
 
    $('body').on('DOMNodeInserted', '.taskListContent', function () {
        id = $(this).parent().attr('id')
        tasklist = $(this)
        
        if ($.inArray(id, ranTasklists) == -1){
            ranTasklists.push(id)
            setTimeout(function() { runTasklist(tasklist); }, 200);            
        }
        setTimeout(function() { ranTasklists.splice(ranTasklists.indexOf(id)); }, 1500);
    });
   
});