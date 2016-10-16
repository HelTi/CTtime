/**
 * Created by Administrator on 2016/10/14 0014.
 */

;(function($){
    var timecount=function(ele, opt){
        this.defaults={
            times:2*60*100,
            elh:'',
            elms:'',
            elhm:'',
            elrun:'',
            elstop:''
        };
        this.interval=null;
        this.options= $.extend({},this.defaults,opt);
    }
    timecount.prototype={
        counttime:function(){
            this.defaults.times=--this.defaults.times<0?0:this.defaults.times;
            var innert=this.defaults.times;
            var h=Math.floor(innert/6000%60).toString();

            var ms=Math.floor(innert/100%60).toString();
            if(ms.length<=1){
                ms="0"+ms;
            }
            var hm=Math.floor(innert%100).toString();
            if(hm.length<=1){
                hm="0"+hm;
            }
            if (innert==0){
                clearInterval(this.interval);
            }
            /*            $(".a").html(ms);
             $('.b').html(hm);
             $(".h").html(h);*/
            $(this.options.elh).html(h);
            $(this.options.elms).html(ms);
            $(this.options.elhm).html(hm);
        },
        /*运行接口*/
        run:function(){
            var _this=this;
            this.interval=setInterval(function(){
                _this.counttime();
            },10);
            return this.interval;
            /*  setInterval('run',10);*/
        },
        stop:function(){
            var that=this;
            clearInterval(that.interval);
            /* $(that.defaults.elstop).on('click',function(){
             clearInterval(that.interval);
             })*/
        },
        init:function(){
            var _that=this;
            $(_that.options.elstop).click(function(){
                _that.stop();
                _that.interval=null;
            });
            $(_that.options.elrun).click(function(){
                if(_that.interval){
                    _that.stop(_that.interval);
                }
                _that.interval=_that.run();
            });
            /*return _this.init();*/
        }
    }
   /*jquery插件*/
    $.fn.ctime=function(opt){
        var nctime=new timecount(this,opt);
        nctime.init();
        console.log(this);
        return this;
    }
})(jQuery);
