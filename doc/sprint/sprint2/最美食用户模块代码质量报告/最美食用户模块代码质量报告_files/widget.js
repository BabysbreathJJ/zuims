var debug=!1,_log=function(){debug&&window.console&&console.log.apply(console,arguments)},rpc;window.widget=window.widget||{},window.widget.rpc=window.widget.rpc||{};var easyXDMReadyCallbacks=[];window.widget.rpc.ready=function(e){easyXDMReadyCallbacks.push(e)},window.widget.rpc.publish=function(e,t){console.warn("Squatch event bus 'publish' has not been initialized or not available for this mode; note that this feature is not available in HOSTED mode.")};var easyXDMReady=function(e){if(e){window.widget.rpc.publish=function(e,t){e?rpc.publish(e,t):console.error("Attempting to publish invalid event name: "+e)},window.widget.rpc.ready=function(e){e()};for(var t=0;t<easyXDMReadyCallbacks.length;t++)easyXDMReadyCallbacks[t]();easyXDMReadyCallbacks.splice(0,easyXDMReadyCallbacks.length)}else easyXDMReadyCallbacks.length>0&&(console.warn("Squatch event bus 'ready' has not been initialized; note that this feature is not available in HOSTED mode."),easyXDMReadyCallbacks.splice(0,easyXDMReadyCallbacks.length))};squatch.analytics.apikey&&squatch.mode.widgetMode!=squatch.mode.DEMO_MODE&&squatch.mode.widgetMode!=squatch.mode.DEMO_EMBED_MODE?(window.analytics=window.analytics||[],analytics.load=function(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d2dq2ahtl5zl1z.cloudfront.net/analytics.js/v1/"+e+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);var r=function(e){return function(){analytics.push([e].concat(Array.prototype.slice.call(arguments,0)))}},i=["identify","track","trackLink","trackForm","trackClick","trackSubmit","pageview","ab","alias","ready"];for(var s=0;s<i.length;s++)analytics[i[s]]=r(i[s])}):window.analytics={load:function(e){_log("Load")},identify:function(e,t){_log("Identify")},track:function(e){_log("track")}},analytics.load(squatch.analytics.apikey),analytics.identify(squatch.analytics.user.ident,squatch.analytics.user.traits);var height,width,resizeToContent=squatch.embed&&squatch.embed.resizeToContent?squatch.embed.resizeToContent:!1;try{rpc=new easyXDM.Rpc({onReady:function(){document.documentElement?(height=document.documentElement.scrollHeight,width=document.documentElement.scrollWidth):(height=document.body.scrollHeight,width=document.body.scrollWidth),_log("height: "+height+", width: "+width);var e=squatch.user.rewardAggregates;rpc.init(height,width,squatch.user.code,e,resizeToContent),easyXDMReady(!0)}},{remote:{init:{},resize:{},publish:{},close:{}},local:{openedWidget:function(e,t,n){analytics.track(squatch.analytics.events.OPENED_WIDGET),e==squatch.mode.POPUP_MODE&&(_log("opened squatch popup"),analytics.track(squatch.analytics.events.OPENED_POPUP)),squatch.mode.widgetMode!=squatch.mode.DEMO_MODE&&squatch.mode.widgetMode!=squatch.mode.DEMO_EMBED_MODE&&jsRoutes.saasquatch.controllers.widget.SquatchWidgetController.recordWidgetEvent(squatch.analytics.attributes.tenant,n,t,squatch.analytics.events.OPENED_WIDGET).ajax({success:function(e){_log("Event Recorded")},failure:function(e){console.error(e)}})},closedWidget:function(){_log("closed squatch popup"),analytics.track(squatch.analytics.events.CLOSED_POPUP)}}}),setInterval(function(){var e=resizeToContent&&document.body?Math.max(document.documentElement.scrollHeight,document.body.scrollHeight):document.documentElement.scrollHeight,t=document.body?Math.max(document.documentElement.scrollWidth,document.body.scrollWidth):document.documentElement.scrollWidth;if(height!=e||width!=t)_log("height ("+height+") and width ("+width+") change to ("+e+") and ("+t+")"),height=e,width=t,rpc.resize(height,width)},500)}catch(e){easyXDMReady(!1),window.console&&console.warn("error in setting up easyxdm")}window.version=function(){_log("widget.js version 3")};var mailTo=function(e){try{var t=window.open(e,"Mailer")}catch(n){console.warn("There was an error opening a mail composer.",n)}setTimeout(function(){try{(t.location.href===e||t.location.href.substr(0,6)==="about:")&&t.close()}catch(n){console.warn("There was an error opening a mail composer.",n)}},500)};$(function(){$("img.customprofileimg").each(function(){var e=$(this).data("profile-src");e!=window.squatch.user.fallbackImg&&($(this).on("error",function(){$(event.target).attr("src",window.squatch.user.fallbackImg)}),$(this).attr("src",e))}),$(".emailShare").attr("href",squatch.user.email.share.mailToLink),$(".remind").attr("href",squatch.user.email.reminder.mailToLink),$("body").on("touchstart click",".emailShare, .remind",function(e){if(e.type=="touchstart")window.location=$(e.target).attr("href");else{var t=$(this).data("address");if(!$(e.target).is('a[href^="mailto"]')){typeof t!="undefined"&&$(e.target).attr("href",$(e.target).attr("href")+"&to="+t);return}var n=typeof t!="undefined"?$(e.target).attr("href").replace("mailto:","mailto:"+t):$(e.target).attr("href");mailTo(n),e.preventDefault()}}),$("body").on("touchstart click",".emailShare",function(e){_log("clicked email share"),analytics.track(squatch.analytics.events.EMAIL_SHARE,{type:squatch.user.email.type})}),$("body").on("touchend",".fbShare",function(e){e.preventDefault()}),$("body").on("touchstart click",".fbShare",function(e){e.type!="touchstart"&&e.preventDefault();var t=squatch.user.facebook.shareImage==""||squatch.user.facebook.shareImage===null?"":"&picture="+squatch.user.facebook.shareImage,n=620,r=400,i;e.type=="touchstart"?i="https://www.facebook.com/dialog/feed?app_id="+squatch.user.facebook.appId+"&link="+squatch.user.facebook.link+"&name="+squatch.user.facebook.title+"&description="+squatch.user.facebook.summary+t+"&redirect_uri="+squatch.user.facebook.redirectUrl:i="https://www.facebook.com/dialog/feed?app_id="+squatch.user.facebook.appId+"&link="+squatch.user.facebook.link+"&name="+squatch.user.facebook.title+"&description="+squatch.user.facebook.summary+t+"&redirect_uri="+squatch.user.facebook.redirectUrl+"&display=popup";var s="status=0"+(e.type=="touchstart"?"":",width="+n+",height="+r);window.open(i,"fb",s),_log("clicked facebook share"),analytics.track(squatch.analytics.events.FACEBOOK_SHARE)}),$("body").on("touchend",".twShare",function(e){e.preventDefault()}),$("body").on("touchstart click",".twShare",function(e){e.type!="touchstart"&&e.preventDefault();var t=575,n=400,r="https://twitter.com/intent/tweet?source=webclient&text="+squatch.user.twitter.message,i="status=1,width="+t+",height="+n;window.open(r,"twitter",i),_log("clicked twitter share"),analytics.track(squatch.analytics.events.TWITTER_SHARE)}),$("body").on("touchstart click",".close",function(e){rpc.close()}),$("body").on("touchstart click",".learn",function(e){_log("clicked learn more"),analytics.track(squatch.analytics.events.LEARN_MORE)}),$("body").on("touchstart click",".back",function(e){_log("clicked faq back button"),analytics.track(squatch.analytics.events.FAQ_BACK)}),$("body").on("touchstart click",".copy",function(e){_log("clicked copy link"),analytics.track(squatch.analytics.events.COPY_LINK)}),$("body").on("touchstart click",".remind",function(e){_log("clicked remind friend"),analytics.track(squatch.analytics.events.REMIND_FRIEND)})});