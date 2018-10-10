$(document).ready(function(){
    var target, o_target;
    var isDragging = false;
    var elemClass = "item";
    var empty_space = "empty_space";
    var transition = "transition";
    var dragging = "dragging";
    var noSelect = "noSelect";
    var on_hold = "on_hold";

    function setPosition(target, e){
        var wd = target.innerWidth();
        var ht = target.innerHeight();
        var margin = parseInt(target.css("margin-left").replace("px"));
        var top = e.pageY-(wd/2)-margin;
        var left = e.pageX-(ht/2)-margin;

        target.removeClass(transition)
              .addClass(dragging)
              .css("top", top + "px")
              .css("left", left + "px");
    }

    $.fn.swapWith = function(that, callback){
        var $this = this;
        var $that = $(that);

        var $temp = $("<div>");

        $this.before($temp);
        $that.before($this);
        $temp.after($that).remove();

        if (typeof callback == 'function'){
            callback.call(this);
        }
    }
    
    $(document).mousedown(function(e) {
        $("."+elemClass).removeClass(on_hold);
        o_target = $(e.target);
        if(o_target.attr("class") && o_target.attr("class").indexOf(elemClass)!=-1){
            isDragging = true;
            target = o_target.clone().prependTo(o_target.parent());
            o_target.addClass(empty_space);
            $("html").addClass(noSelect);
            setPosition(target, e);
        }
    })
    .mousemove(function(e) {
        if(isDragging){
            setPosition(target, e);
            if($(e.target).attr("class") && $(e.target).attr("class").indexOf(elemClass)!=-1 && $(e.target).attr("class").indexOf(empty_space)==-1){
                $(e.target).addClass(on_hold);
            } else {
                $("."+elemClass).removeClass(on_hold);
            }
        }
     })
    .mouseup(function(e) {
        if (isDragging) {
            isDragging = false;
            if($(e.target).attr("class") && $(e.target).attr("class").indexOf(elemClass)!=-1 && $(e.target).attr("class").indexOf(empty_space)==-1){
                o_target.swapWith($(e.target));
            }
            $("."+elemClass).removeClass(on_hold);
            $("html").removeClass(noSelect);
            o_target.removeClass(empty_space);
            target.remove();
        }
    });
});