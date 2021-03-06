/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
/*!
 * VERSION: 1.11.2
 * DATE: 2013-11-20
 * UPDATES AND DOCS AT: http://www.greensock.com
 *
 * @license Copyright (c) 2008-2013, GreenSock. All rights reserved.
 * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */



eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(17(e){"5v 5u";19 t=e.6h||e;1a(!t.5c){19 n,r,i,s,o,u=17(e){19 n,r=e.1s("."),i=t;1b(n=0;r.1c>n;n++)i[r[n]]=i=i[r[n]]||{};18 i},a=u("4F.4A"),f=1e-10,l=[].6G,c=17(){},h=17(){19 e=9h.1x.9i,t=e.1Z([]);18 17(n){18 n 2a 3K||"3T"==1j n&&!!n.28&&e.1Z(n)===t}}(),p={},d=17(n,r,i,s){15.4v=p[n]?p[n].4v:[],p[n]=15,15.5a=1d,15.76=i;19 o=[];15.5F=17(a){1b(19 f,l,c,h,v=r.1c,m=v;--v>-1;)(f=p[r[v]]||1g d(r[v],[])).5a?(o[v]=f.5a,m--):a&&f.4v.28(15);1a(0===m&&i)1b(l=("4F.4A."+n).1s("."),c=l.4G(),h=u(l.1G("."))[c]=15.5a=i.36(i,o),s&&(t[c]=h,"17"==1j 5V&&5V.9j?5V((e.8F?e.8F+"/":"")+n.1s(".").1G("/"),[],17(){18 h}):"9f"!=1j 5E&&5E.8A&&(5E.8A=h)),v=0;15.4v.1c>v;v++)15.4v[v].5F()},15.5F(!0)},v=e.3R=17(e,t,n,r){18 1g d(e,t,n,r)},m=a.7W=17(e,t,n){18 t=t||17(){},v(e,[],17(){18 t},n),t};v.97=t;19 g=[0,0,1,1],y=[],b=m("2j.7v",17(e,t,n,r){15.5B=e,15.6j=n||0,15.6g=r||0,15.5C=t?g.3U(t):g},!0),w=b.7Z={},E=b.7X=17(e,t,n,r){1b(19 i,s,o,u,f=t.1s(","),l=f.1c,c=(n||"5s,5R,5r").1s(",");--l>-1;)1b(s=f[l],i=r?m("2j."+s,1d,!0):a.2j[s]||{},o=c.1c;--o>-1;)u=c[o],w[s+"."+u]=w[u+s]=i[u]=e.2x?e:e[u]||1g e};1b(i=b.1x,i.3m=!1,i.2x=17(e){1a(15.5B)18 15.5C[0]=e,15.5B.36(1d,15.5C);19 t=15.6j,n=15.6g,r=1===t?1-e:2===t?e:.5>e?2*e:2*(1-e);18 1===n?r*=r:2===n?r*=r*r:3===n?r*=r*r*r:4===n&&(r*=r*r*r*r),1===t?1-r:2===t?r:.5>e?r/2:1-r/2},n=["8u","8w","9a","9c","9l,9x"],r=n.1c;--r>-1;)i=n[r]+",9y"+r,E(1g b(1d,1d,1,r),i,"5R",!0),E(1g b(1d,1d,2,r),i,"5s"+(0===r?",96":"")),E(1g b(1d,1d,3,r),i,"5r");w.9s=a.2j.8u.5s,w.9o=a.2j.8w.5r;19 S=m("8m.8q",17(e){15.40={},15.8r=e||15});i=S.1x,i.8M=17(e,t,n,r,i){i=i||0;19 u,a,f=15.40[e],l=0;1b(1d==f&&(15.40[e]=f=[]),a=f.1c;--a>-1;)u=f[a],u.c===t&&u.s===n?f.2W(a,1):0===l&&i>u.2s&&(l=a+1);f.2W(l,0,{c:t,s:n,8o:r,2s:i}),15!==s||o||s.3a()},i.9n=17(e,t){19 n,r=15.40[e];1a(r)1b(n=r.1c;--n>-1;)1a(r[n].c===t)18 r.2W(n,1),2u 0},i.8C=17(e){19 t,n,r,i=15.40[e];1a(i)1b(t=i.1c,n=15.8r;--t>-1;)r=i[t],r.8o?r.c.1Z(r.s||n,{2r:e,2v:n}):r.c.1Z(r.s||n)};19 x=e.9z,T=e.8S,N=8l.95||17(){18(1g 8l).92()},C=N();1b(n=["64","8W","91","o"],r=n.1c;--r>-1&&!x;)x=e[n[r]+"8Z"],T=e[n[r]+"93"]||e[n[r]+"8U"];m("52",17(e,t){19 n,r,i,u,a,f=15,l=N(),h=t!==!1&&x,p=17(e){C=N(),f.3u=(C-l)/8d;19 t,s=f.3u-a;(!n||s>0||e===!0)&&(f.41++,a+=s+(s>=u?.9t:u-s),t=!0),e!==!0&&(i=r(p)),t&&f.8C("5y")};S.1Z(f),f.3u=f.41=0,f.5y=17(){p(!0)},f.4X=17(){1d!=i&&(h&&T?T(i):aa(i),r=c,i=1d,f===s&&(o=!1))},f.3a=17(){1d!==i&&f.4X(),r=0===n?c:h&&x?x:17(e){18 6p(e,0|8d*(a-f.3u)+1)},f===s&&(o=!0),p(2)},f.6f=17(e){18 22.1c?(n=e,u=1/(n||60),a=15.3u+u,f.3a(),2u 0):n},f.8e=17(e){18 22.1c?(f.4X(),h=e,f.6f(n),2u 0):h},f.6f(e),6p(17(){h&&(!i||5>f.41)&&f.8e(!1)},af)}),i=a.52.1x=1g a.8m.8q,i.2M=a.52;19 k=m("5k.72",17(e,t){1a(15.1o=t=t||{},15.1N=15.2l=e||0,15.2J=1C(t.4y)||0,15.1y=1,15.2c=t.1V===!0,15.1z=t.1z,15.2G=t.43===!0,q){o||s.3a();19 n=15.1o.5Q?I:q;n.1P(15,n.1n),15.1o.34&&15.34(!0)}});s=k.8h=1g a.52,i=k.1x,i.2o=i.1I=i.2w=i.1A=!1,i.1K=i.1n=0,i.1O=-1,i.1f=i.3h=i.32=i.1p=i.1U=1d,i.1A=!1;19 L=17(){o&&N()-C>8p&&s.3a(),6p(L,8p)};L(),i.7w=17(e,t){18 22.1c&&15.4e(e,t),15.43(!1).34(!1)},i.6c=17(e,t){18 22.1c&&15.4e(e,t),15.34(!0)},i.aB=17(e,t){18 22.1c&&15.4e(e,t),15.34(!1)},i.4e=17(e,t){18 15.2Z(1C(e),t!==!1)},i.ar=17(e,t){18 15.43(!1).34(!1).2Z(e?-15.2J:0,t!==!1,!0)},i.as=17(e,t){18 22.1c&&15.4e(e||15.26(),t),15.43(!0).34(!1)},i.1B=17(){},i.5i=17(){18 15},i.4O=17(){19 e,t=15.1p,n=15.1i;18!t||!15.1I&&!15.1A&&t.4O()&&(e=t.3y())>=n&&n+15.26()/15.1y>e},i.1M=17(e,t){18 o||s.3a(),15.1I=!e,15.2c=15.4O(),t!==!0&&(e&&!15.1U?15.1p.1P(15,15.1i-15.2J):!e&&15.1U&&15.1p.3C(15,!0)),!1},i.2p=17(){18 15.1M(!1,!1)},i.4c=17(e,t){18 15.2p(e,t),15},i.35=17(e){1b(19 t=e?15:15.1U;t;)t.2o=!0,t=t.1U;18 15},i.5o=17(e){1b(19 t=e.1c,n=e.3U();--t>-1;)"{4t}"===e[t]&&(n[t]=15);18 n},i.aw=17(e,t,n,r){1a("a8"===(e||"").1t(0,2)){19 i=15.1o;1a(1===22.1c)18 i[e];1d==t?3L i[e]:(i[e]=t,i[e+"6o"]=h(n)&&-1!==n.1G("").1k("{4t}")?15.5o(n):n,i[e+"6l"]=r),"5q"===e&&(15.32=t)}18 15},i.4y=17(e){18 22.1c?(15.1p.2F&&15.8f(15.1i+e-15.2J),15.2J=e,15):15.2J},i.2C=17(e){18 22.1c?(15.1N=15.2l=e,15.35(!0),15.1p.2F&&15.1n>0&&15.1n<15.1N&&0!==e&&15.2Z(15.1K*(e/15.1N),!0),15):(15.2o=!1,15.1N)},i.26=17(e){18 15.2o=!1,22.1c?15.2C(e):15.2l},i.3u=17(e,t){18 22.1c?(15.2o&&15.26(),15.2Z(e>15.1N?15.1N:e,t)):15.1n},i.2Z=17(e,t,n){1a(o||s.3a(),!22.1c)18 15.1K;1a(15.1p){1a(0>e&&!n&&(e+=15.26()),15.1p.2F){15.2o&&15.26();19 r=15.2l,i=15.1p;1a(e>r&&!n&&(e=r),15.1i=(15.1A?15.4D:i.1n)-(15.2G?r-e:e)/15.1y,i.2o||15.35(!1),i.1p)1b(;i.1p;)i.1p.1n!==(i.1i+i.1K)/i.1y&&i.2Z(i.1K,!0),i=i.1p}15.1I&&15.1M(!0,!1),(15.1K!==e||0===15.1N)&&15.1B(e,t,!1)}18 15},i.9N=i.9P=17(e,t){18 22.1c?15.2Z(15.2C()*e,t):15.1n/15.2C()},i.8f=17(e){18 22.1c?(e!==15.1i&&(15.1i=e,15.1U&&15.1U.4J&&15.1U.1P(15,e-15.2J)),15):15.1i},i.5N=17(e){1a(!22.1c)18 15.1y;1a(e=e||f,15.1p&&15.1p.2F){19 t=15.4D,n=t||0===t?t:15.1p.2Z();15.1i=n-(n-15.1i)*15.1y/e}18 15.1y=e,15.35(!1)},i.43=17(e){18 22.1c?(e!=15.2G&&(15.2G=e,15.2Z(15.1K,!0)),15):15.2G},i.34=17(e){1a(!22.1c)18 15.1A;1a(e!=15.1A&&15.1p){o||e||s.3a();19 t=15.1p,n=t.3y(),r=n-15.4D;!e&&t.2F&&(15.1i+=r,15.35(!1)),15.4D=e?n:1d,15.1A=e,15.2c=15.4O(),!e&&0!==r&&15.2w&&15.2C()&&15.1B(t.2F?15.1K:(n-15.1i)/15.1y,!0,!0)}18 15.1I&&!e&&15.1M(!0,!1),15};19 A=m("5k.7n",17(e){k.1Z(15,0,e),15.4P=15.2F=!0});i=A.1x=1g k,i.2M=A,i.4c().1I=!1,i.27=i.3h=1d,i.4J=!1,i.1P=i.84=17(e,t){19 n,r;1a(e.1i=1C(t||0)+e.2J,e.1A&&15!==e.1p&&(e.4D=e.1i+(15.3y()-e.1i)/e.1y),e.1U&&e.1U.3C(e,!0),e.1U=e.1p=15,e.1I&&e.1M(!0,!0),n=15.3h,15.4J)1b(r=e.1i;n&&n.1i>r;)n=n.1l;18 n?(e.1f=n.1f,n.1f=e):(e.1f=15.27,15.27=e),e.1f?e.1f.1l=e:15.3h=e,e.1l=n,15.1p&&15.35(!0),15},i.3C=17(e,t){18 e.1U===15&&(t||e.1M(!1,!0),e.1U=1d,e.1l?e.1l.1f=e.1f:15.27===e&&(15.27=e.1f),e.1f?e.1f.1l=e.1l:15.3h===e&&(15.3h=e.1l),15.1p&&15.35(!0)),15},i.1B=17(e,t,n){19 r,i=15.27;1b(15.1K=15.1n=15.1O=e;i;)r=i.1f,(i.2c||e>=i.1i&&!i.1A)&&(i.2G?i.1B((i.2o?i.26():i.2l)-(e-i.1i)*i.1y,t,n):i.1B((e-i.1i)*i.1y,t,n)),i=r},i.3y=17(){18 o||s.3a(),15.1K};19 O=m("5c",17(t,n,r){1a(k.1Z(15,n,r),15.1B=O.1x.1B,1d==t)5W"87 6v a 1d 2v.";15.2v=t="1H"!=1j t?t:O.3w(t)||t;19 i,s,o,u=t.9I||t.1c&&t!==e&&t[0]&&(t[0]===e||t[0].3o&&t[0].1v&&!t.3o),a=15.1o.4L;1a(15.5S=a=1d==a?F[O.8i]:"2t"==1j a?a>>0:F[a],(u||t 2a 3K||t.28&&h(t))&&"2t"!=1j t[0])1b(15.2z=o=l.1Z(t,0),15.3A=[],15.2Y=[],i=0;o.1c>i;i++)s=o[i],s?"1H"!=1j s?s.1c&&s!==e&&s[0]&&(s[0]===e||s[0].3o&&s[0].1v&&!s.3o)?(o.2W(i--,1),15.2z=o=o.3U(l.1Z(s,0))):(15.2Y[i]=R(s,15,!1),1===a&&15.2Y[i].1c>1&&U(s,15,1d,1,15.2Y[i])):(s=o[i--]=O.3w(s),"1H"==1j s&&o.2W(i+1,1)):o.2W(i--,1);1m 15.3A={},15.2Y=R(t,15,!1),1===a&&15.2Y.1c>1&&U(t,15,1d,1,15.2Y);(15.1o.1V||0===n&&0===15.2J&&15.1o.1V!==!1)&&15.1B(-15.2J,!1,!0)},!0),M=17(t){18 t.1c&&t!==e&&t[0]&&(t[0]===e||t[0].3o&&t[0].1v&&!t.3o)},2q=17(e,t){19 n,r={};1b(n 1w e)j[n]||n 1w t&&"x"!==n&&"y"!==n&&"3M"!==n&&"3B"!==n&&"39"!==n&&"3X"!==n||!(!P[n]||P[n]&&P[n].9D)||(r[n]=e[n],3L e[n]);e.4s=r};i=O.1x=1g k,i.2M=O,i.4c().1I=!1,i.3i=0,i.1r=i.2z=i.3f=i.29=1d,i.4I=!1,O.3Z="1.11.2",O.6n=i.2H=1g b(1d,1d,1,1),O.8i="2n",O.8h=s,O.8J=!0,O.3w=e.$||e.9C||17(t){18 e.$?(O.3w=e.$,e.$(t)):e.69?e.69.9G("#"===t.1u(0)?t.1t(1):t):t};19 D=O.4p={7T:h,7U:M},P=O.9R={},H=O.a2={},B=0,j=D.7i={3Q:1,4y:1,4L:1,4i:1,61:1,62:1,5Q:1,4C:1,38:1,5q:1,67:1,6b:1,4B:1,5D:1,63:1,4j:1,7b:1,7o:1,a3:1,a4:1,a6:1,5p:1,a5:1,1V:1,a0:1,9Z:1,1z:1,34:1,43:1,5A:1},F={3r:0,3Y:1,2n:2,9U:3,9T:4,9S:5,"9V":1,"5O":0},I=k.6Y=1g A,q=k.9W=1g A;q.1i=s.3u,I.1i=s.41,q.2c=I.2c=!0,k.86=17(){1a(q.1B((s.3u-q.1i)*q.1y,!1,!1),I.1B((s.41-I.1i)*I.1y,!1,!1),!(s.41%9Y)){19 e,t,n;1b(n 1w H){1b(t=H[n].3x,e=t.1c;--e>-1;)t[e].1I&&t.2W(e,1);0===t.1c&&3L H[n]}1a(n=q.27,(!n||n.1A)&&O.8J&&!I.27&&1===s.40.5y.1c){1b(;n&&n.1A;)n=n.1f;n||s.4X()}}},s.8M("5y",k.86);19 R=17(e,t,n){19 r,i,s=e.7h;1a(H[s||(e.7h=s="t"+B++)]||(H[s]={2v:e,3x:[]}),t&&(r=H[s].3x,r[i=r.1c]=t,n))1b(;--i>-1;)r[i]===t&&r.2W(i,1);18 H[s].3x},U=17(e,t,n,r,i){19 s,o,u,a;1a(1===r||r>=4){1b(a=i.1c,s=0;a>s;s++)1a((u=i[s])!==t)u.1I||u.1M(!1,!1)&&(o=!0);1m 1a(5===r)7p;18 o}19 l,c=t.1i+f,h=[],p=0,d=0===t.1N;1b(s=i.1c;--s>-1;)(u=i[s])===t||u.1I||u.1A||(u.1p!==t.1p?(l=l||z(t,0,d),0===z(u,l,d)&&(h[p++]=u)):c>=u.1i&&u.1i+u.26()/u.1y+f>c&&((d||!u.2w)&&2e-10>=c-u.1i||(h[p++]=u)));1b(s=p;--s>-1;)u=h[s],2===r&&u.2p(n,e)&&(o=!0),(2!==r||!u.1r&&u.2w)&&u.1M(!1,!1)&&(o=!0);18 o},z=17(e,t,n){1b(19 r=e.1p,i=r.1y,s=e.1i;r.1p;){1a(s+=r.1i,i*=r.1y,r.1A)18-23;r=r.1p}18 s/=i,s>t?s-t:n&&s===t||!e.2w&&2*f>s-t?f:(s+=e.26()/e.1y/i)>t+f?0:s-t-f};i.7c=17(){19 e,t,n,r,i=15.1o,s=15.3f,o=15.1N,u=i.1V,a=i.3Q;1a(i.38){1a(15.29&&15.29.1B(-1,!0),i.38.4L=0,i.38.1V=!0,15.29=O.3v(15.2v,0,i.38),u)1a(15.1n>0)15.29=1d;1m 1a(0!==o)18}1m 1a(i.4C&&0!==o)1a(15.29)15.29.1B(-1,!0),15.29=1d;1m{n={};1b(r 1w i)j[r]&&"5A"!==r||(n[r]=i[r]);1a(n.4L=0,n.1z="7G",15.29=O.3v(15.2v,0,n),i.1V){1a(0===15.1n)18}1m 15.29.1B(-1,!0)}1a(15.2H=a?a 2a b?i.5p 2a 3K?a.3t.36(a,i.5p):a:"17"==1j a?1g b(a,i.5p):w[a]||O.6n:O.6n,15.5P=15.2H.6j,15.7f=15.2H.6g,15.1r=1d,15.2z)1b(e=15.2z.1c;--e>-1;)15.4o(15.2z[e],15.3A[e]={},15.2Y[e],s?s[e]:1d)&&(t=!0);1m t=15.4o(15.2v,15.3A,15.2Y,s);1a(t&&O.4U("4Z",15),s&&(15.1r||"17"!=1j 15.2v&&15.1M(!1,!1)),i.4C)1b(n=15.1r;n;)n.s+=n.c,n.c=-n.c,n=n.1f;15.32=i.5q,15.2w=!0},i.4o=17(t,n,r,i){19 s,o,u,a,f,l;1a(1d==t)18!1;15.1o.4s||t.1v&&t!==e&&t.3o&&P.4s&&15.1o.5A!==!1&&2q(15.1o,t);1b(s 1w 15.1o){1a(l=15.1o[s],j[s])l&&(l 2a 3K||l.28&&h(l))&&-1!==l.1G("").1k("{4t}")&&(15.1o[s]=l=15.5o(l,15));1m 1a(P[s]&&(a=1g P[s]).6M(t,15.1o[s],15)){1b(15.1r=f={1f:15.1r,t:a,p:"1X",s:0,c:1,f:!0,n:s,4M:!0,2s:a.5T},o=a.2E.1c;--o>-1;)n[a.2E[o]]=15.1r;(a.5T||a.4Z)&&(u=!0),(a.6q||a.89)&&(15.4I=!0)}1m 15.1r=n[s]=f={1f:15.1r,t:t,p:s,f:"17"==1j t[s],n:s,4M:!1,2s:0},f.s=f.f?t[s.1k("4h")||"17"!=1j t["7g"+s.1t(3)]?s:"7g"+s.1t(3)]():1q(t[s]),f.c="1H"==1j l&&"="===l.1u(1)?3q(l.1u(0)+"1",10)*1C(l.1t(2)):1C(l)-f.s||0;f&&f.1f&&(f.1f.1l=f)}18 i&&15.2p(i,t)?15.4o(t,n,r,i):15.5S>1&&15.1r&&r.1c>1&&U(t,15,n,15.5S,r)?(15.2p(n,t),15.4o(t,n,r,i)):u},i.1B=17(e,t,n){19 r,i,s,o,u=15.1n,a=15.1N;1a(e>=a)15.1K=15.1n=a,15.3i=15.2H.3m?15.2H.2x(1):1,15.2G||(r=!0,i="4i"),0===a&&(o=15.1O,(0===e||0>o||o===f)&&o!==e&&(n=!0,o>f&&(i="4j")),15.1O=o=!t||e?e:f);1m 1a(1e-7>e)15.1K=15.1n=0,15.3i=15.2H.3m?15.2H.2x(0):0,(0!==u||0===a&&15.1O>f)&&(i="4j",r=15.2G),0>e?(15.2c=!1,0===a&&(15.1O>=0&&(n=!0),15.1O=o=!t||e?e:f)):15.2w||(n=!0);1m 1a(15.1K=15.1n=e,15.5P){19 l=e/a,c=15.5P,h=15.7f;(1===c||3===c&&l>=.5)&&(l=1-l),3===c&&(l*=2),1===h?l*=l:2===h?l*=l*l:3===h?l*=l*l*l:4===h&&(l*=l*l*l*l),15.3i=1===c?1-l:2===c?l:.5>e/a?l/2:1-l/2}1m 15.3i=15.2H.2x(e/a);1a(15.1n!==u||n){1a(!15.2w){1a(15.7c(),!15.2w||15.1I)18;15.1n&&!r?15.3i=15.2H.2x(15.1n/a):r&&15.2H.3m&&(15.3i=15.2H.2x(0===15.1n?0:1))}1b(15.2c||!15.1A&&15.1n!==u&&e>=0&&(15.2c=!0),0===u&&(15.29&&(e>=0?15.29.1B(e,t,n):i||(i="a1")),15.1o.4B&&(0!==15.1n||0===a)&&(t||15.1o.4B.36(15.1o.63||15,15.1o.5D||y))),s=15.1r;s;)s.f?s.t[s.p](s.c*15.3i+s.s):s.t[s.p]=s.c*15.3i+s.s,s=s.1f;15.32&&(0>e&&15.29&&15.1i&&15.29.1B(e,t,n),t||n&&0===15.1n&&0===u||15.32.36(15.1o.6b||15,15.1o.67||y)),i&&(15.1I||(0>e&&15.29&&!15.32&&15.1i&&15.29.1B(e,t,n),r&&(15.1p.4P&&15.1M(!1,!1),15.2c=!1),!t&&15.1o[i]&&15.1o[i].36(15.1o[i+"6l"]||15,15.1o[i+"6o"]||y),0===a&&15.1O===f&&o!==f&&(15.1O=0)))}},i.2p=17(e,t){1a("3Y"===e&&(e=1d),1d==e&&(1d==t||t===15.2v))18 15.1M(!1,!1);t="1H"!=1j t?t||15.2z||15.2v:O.3w(t)||t;19 n,r,i,s,o,u,a,f;1a((h(t)||M(t))&&"2t"!=1j t[0])1b(n=t.1c;--n>-1;)15.2p(e,t[n])&&(u=!0);1m{1a(15.2z){1b(n=15.2z.1c;--n>-1;)1a(t===15.2z[n]){o=15.3A[n]||{},15.3f=15.3f||[],r=15.3f[n]=e?15.3f[n]||{}:"3Y";7p}}1m{1a(t!==15.2v)18!1;o=15.3A,r=15.3f=e?15.3f||{}:"3Y"}1a(o){a=e||o,f=e!==r&&"3Y"!==r&&e!==o&&("3T"!=1j e||!e.9Q);1b(i 1w a)(s=o[i])&&(s.4M&&s.t.2p(a)&&(u=!0),s.4M&&0!==s.t.2E.1c||(s.1l?s.1l.1f=s.1f:s===15.1r&&(15.1r=s.1f),s.1f&&(s.1f.1l=s.1l),s.1f=s.1l=1d),3L o[i]),f&&(r[i]=1);!15.1r&&15.2w&&15.1M(!1,!1)}}18 u},i.5i=17(){18 15.4I&&O.4U("6q",15),15.1r=1d,15.3f=1d,15.32=1d,15.29=1d,15.2w=15.2c=15.4I=!1,15.3A=15.2z?{}:[],15},i.1M=17(e,t){1a(o||s.3a(),e&&15.1I){19 n,r=15.2z;1a(r)1b(n=r.1c;--n>-1;)15.2Y[n]=R(r[n],15,!0);1m 15.2Y=R(15.2v,15,!0)}18 k.1x.1M.1Z(15,e,t),15.4I&&15.1r?O.4U(e?"89":"6q",15):!1},O.3v=17(e,t,n){18 1g O(e,t,n)},O.68=17(e,t,n){18 n.4C=!0,n.1V=0!=n.1V,1g O(e,t,n)},O.66=17(e,t,n,r){18 r.38=n,r.1V=0!=r.1V&&0!=n.1V,1g O(e,t,r)},O.6k=17(e,t,n,r,i){18 1g O(t,0,{4y:e,4i:t,61:n,62:r,4j:t,7b:n,7o:r,1V:!1,5Q:i,4L:0})},O.4h=17(e,t){18 1g O(e,0,t)},O.3W=17(e,t){1a(1d==e)18[];e="1H"!=1j e?e:O.3w(e)||e;19 n,r,i,s;1a((h(e)||M(e))&&"2t"!=1j e[0]){1b(n=e.1c,r=[];--n>-1;)r=r.3U(O.3W(e[n],t));1b(n=r.1c;--n>-1;)1b(s=r[n],i=n;--i>-1;)s===r[i]&&r.2W(n,1)}1m 1b(r=R(e).3U(),n=r.1c;--n>-1;)(r[n].1I||t&&!r[n].4O())&&r.2W(n,1);18 r},O.9J=O.9O=17(e,t,n){"3T"==1j t&&(n=t,t=!1);1b(19 r=O.3W(e,t),i=r.1c;--i>-1;)r[i].2p(n,e)};19 W=m("4z.7Q",17(e,t){15.2E=(e||"").1s(","),15.4N=15.2E[0],15.5T=t||0,15.9M=W.1x},!0);1a(i=W.1x,W.3Z="1.10.1",W.3J=2,i.1r=1d,i.9K=17(e,t,n,r,i,s){19 o,u;18 1d!=r&&(o="2t"==1j r||"="!==r.1u(1)?1C(r)-n:3q(r.1u(0)+"1",10)*1C(r.1t(2)))?(15.1r=u={1f:15.1r,t:e,p:t,s:n,c:o,f:"17"==1j e[t],n:i||t,r:s},u.1f&&(u.1f.1l=u),u):2u 0},i.1X=17(e){1b(19 t,n=15.1r,r=1e-6;n;)t=n.c*e+n.s,n.r?t=0|t+(t>0?.5:-.5):r>t&&t>-r&&(t=0),n.f?n.t[n.p](t):n.t[n.p]=t,n=n.1f},i.2p=17(e){19 t,n=15.2E,r=15.1r;1a(1d!=e[15.4N])15.2E=[];1m 1b(t=n.1c;--t>-1;)1d!=e[n[t]]&&n.2W(t,1);1b(;r;)1d!=e[r.n]&&(r.1f&&(r.1f.1l=r.1l),r.1l?(r.1l.1f=r.1f,r.1l=1d):15.1r===r&&(15.1r=r.1f)),r=r.1f;18!1},i.71=17(e,t){1b(19 n=15.1r;n;)(e[15.4N]||1d!=n.n&&e[n.n.1s(15.4N+"2q").1G("")])&&(n.r=t),n=n.1f},O.4U=17(e,t){19 n,r,i,s,o,u=t.1r;1a("4Z"===e){1b(;u;){1b(o=u.1f,r=i;r&&r.2s>u.2s;)r=r.1f;(u.1l=r?r.1l:s)?u.1l.1f=u:i=u,(u.1f=r)?r.1l=u:s=u,u=o}u=t.1r=i}1b(;u;)u.4M&&"17"==1j u.t[e]&&u.t[e]()&&(n=!0),u=u.1f;18 n},W.6P=17(e){1b(19 t=e.1c;--t>-1;)e[t].3J===W.3J&&(P[(1g e[t]).4N]=e[t]);18!0},v.2A=17(e){1a(!(e&&e.7a&&e.78&&e.3J))5W"9L 2A a7.";19 t,n=e.7a,r=e.5H||0,i=e.av,s={78:"6M",4h:"1X",4c:"2p",59:"71",au:"4Z"},o=m("4z."+n.1u(0).5h()+n.1t(1)+"8j",17(){W.1Z(15,n,r),15.2E=i||[]},e.aq===!0),u=o.1x=1g W(n);u.2M=o,o.3J=e.3J;1b(t 1w s)"17"==1j e[t]&&(u[s[t]]=e[t]);18 o.3Z=e.3Z,W.6P([o]),o},n=e.3b){1b(r=0;n.1c>r;r++)n[r]();1b(i 1w p)p[i].76||e.65.6U("ax ay aD aE: 4F.4A."+i)}o=!1}})(1T);(1T.3b||(1T.3b=[])).28(17(){"5v 5u";1T.3R("aC",["5k.72","5k.7n","5c"],17(e,t,n){19 r=17(e){t.1Z(15,e),15.2L={},15.4P=15.1o.4P===!0,15.2F=15.1o.2F===!0,15.4J=!0,15.32=15.1o.5q;19 n,r,i=15.1o;1b(r 1w i)n=i[r],o(n)&&-1!==n.1G("").1k("{4t}")&&(i[r]=15.5o(n));o(i.3x)&&15.1P(i.3x,0,i.aA,i.ap)},i=1e-10,s=n.4p.7U,o=n.4p.7T,u=[],a=17(e){19 t,n={};1b(t 1w e)n[t]=e[t];18 n},f=17(e,t,n,r){e.1p.6c(e.1i),t&&t.36(r||e.1p,n||u)},l=u.6G,c=r.1x=1g t;18 r.3Z="1.11.0",c.2M=r,c.4c().1I=!1,c.3v=17(e,t,r,i){18 t?15.1P(1g n(e,t,r),i):15.4h(e,r,i)},c.68=17(e,t,r,i){18 15.1P(n.68(e,t,r),i)},c.66=17(e,t,r,i,s){18 t?15.1P(n.66(e,t,r,i),s):15.4h(e,i,s)},c.5I=17(e,t,i,o,u,f,c,p){19 d,v=1g r({4i:f,61:c,62:p});1b("1H"==1j e&&(e=n.3w(e)||e),s(e)&&(e=l.1Z(e,0)),o=o||0,d=0;e.1c>d;d++)i.38&&(i.38=a(i.38)),v.3v(e[d],t,a(i),d*o);18 15.1P(v,u)},c.ac=17(e,t,n,r,i,s,o,u){18 n.1V=0!=n.1V,n.4C=!0,15.5I(e,t,n,r,i,s,o,u)},c.a9=17(e,t,n,r,i,s,o,u,a){18 r.38=n,r.1V=0!=r.1V&&0!=n.1V,15.5I(e,t,r,i,s,o,u,a)},c.1Z=17(e,t,r,i){18 15.1P(n.6k(0,e,t,r),i)},c.4h=17(e,t,r){18 r=15.3d(r,0,!0),1d==t.1V&&(t.1V=r===15.1n&&!15.1A),15.1P(1g n(e,0,t),r)},r.ab=17(e,t){e=e||{},1d==e.2F&&(e.2F=!0);19 i,s,o=1g r(e),u=o.1p;1b(1d==t&&(t=!0),u.3C(o,!0),o.1i=0,o.1O=o.1n=o.1K=u.1n,i=u.27;i;)s=i.1f,t&&i 2a n&&i.2v===i.1o.4i||o.1P(i,i.1i-i.2J),i=s;18 u.1P(o,0),o},c.1P=17(i,s,u,a){19 f,l,c,h,p,d;1a("2t"!=1j s&&(s=15.3d(s,0,!0,i)),!(i 2a e)){1a(i 2a 3K||i&&i.28&&o(i)){1b(u=u||"ag",a=a||0,f=s,l=i.1c,c=0;l>c;c++)o(h=i[c])&&(h=1g r({3x:h})),15.1P(h,f),"1H"!=1j h&&"17"!=1j h&&("9A"===u?f=h.1i+h.26()/h.1y:"ah"===u&&(h.1i-=h.4y())),f+=a;18 15.35(!0)}1a("1H"==1j i)18 15.80(i,s);1a("17"!=1j i)5W"87 1P "+i+" am an 1U; 3z al 8a a 6v, 1U, 17, ak 1H.";i=n.6k(0,i)}1a(t.1x.1P.1Z(15,i,s),15.1I&&!15.1A&&15.1N<15.2C())1b(p=15,d=p.3y()>i.1i;p.1I&&p.1p;)p.1p.2F&&d?p.2Z(p.1K,!0):p.1M(!0,!1),p=p.1p;18 15},c.51=17(t){1a(t 2a e)18 15.3C(t,!1);1a(t 2a 3K||t&&t.28&&o(t)){1b(19 n=t.1c;--n>-1;)15.51(t[n]);18 15}18"1H"==1j t?15.7P(t):15.4c(1d,t)},c.3C=17(e,n){t.1x.3C.1Z(15,e,n);19 r=15.3h;18 r?15.1n>r.1i+r.2l/r.1y&&(15.1n=15.2C(),15.1K=15.2l):15.1n=15.1K=0,15},c.aF=17(e,t){18 15.1P(e,15.3d(1d,t,!0,e))},c.84=c.8R=17(e,t,n,r){18 15.1P(e,t||0,n,r)},c.8T=17(e,t,n,r){18 15.1P(e,15.3d(1d,t,!0,e),n,r)},c.80=17(e,t){18 15.2L[e]=15.3d(t),15},c.94=17(e,t,n,r){18 15.1Z(f,["{4t}",t,n,r],15,e)},c.7P=17(e){18 3L 15.2L[e],15},c.8X=17(e){18 1d!=15.2L[e]?15.2L[e]:-1},c.3d=17(t,n,r,i){19 s;1a(i 2a e&&i.1U===15)15.51(i);1m 1a(i&&(i 2a 3K||i.28&&o(i)))1b(s=i.1c;--s>-1;)i[s]2a e&&i[s].1U===15&&15.51(i[s]);1a("1H"==1j n)18 15.3d(n,r&&"2t"==1j t&&1d==15.2L[n]?t-15.2C():0,r);1a(n=n||0,"1H"!=1j t||!5X(t)&&1d==15.2L[t])1d==t&&(t=15.2C());1m{1a(s=t.1k("="),-1===s)18 1d==15.2L[t]?r?15.2L[t]=15.2C()+n:n:15.2L[t]+n;n=3q(t.1u(s-1)+"1",10)*1C(t.1t(s+1)),t=s>1?15.3d(t.1t(0,s-1),0,r):15.2C()}18 1C(t)+n},c.4e=17(e,t){18 15.2Z("2t"==1j e?e:15.3d(e),t!==!1)},c.8V=17(){18 15.34(!0)},c.9r=17(e,t){18 15.7w(e,t)},c.9q=17(e,t){18 15.6c(e,t)},c.1B=17(e,t,n){15.1I&&15.1M(!0,!1);19 r,s,o,a,f,l=15.2o?15.26():15.2l,c=15.1n,h=15.1i,p=15.1y,d=15.1A;1a(e>=l?(15.1K=15.1n=l,15.2G||15.5U()||(s=!0,a="4i",0===15.1N&&(0===e||0>15.1O||15.1O===i)&&15.1O!==e&&15.27&&(f=!0,15.1O>i&&(a="4j"))),15.1O=15.1N||!t||e?e:i,e=l+1e-6):1e-7>e?(15.1K=15.1n=0,(0!==c||0===15.1N&&(15.1O>i||0>e&&15.1O>=0))&&(a="4j",s=15.2G),0>e?(15.2c=!1,0===15.1N&&15.1O>=0&&15.27&&(f=!0),15.1O=e):(15.1O=15.1N||!t||e?e:i,e=0,15.2w||(f=!0))):15.1K=15.1n=15.1O=e,15.1n!==c&&15.27||n||f){1a(15.2w||(15.2w=!0),15.2c||!15.1A&&15.1n!==c&&e>0&&(15.2c=!0),0===c&&15.1o.4B&&0!==15.1n&&(t||15.1o.4B.36(15.1o.63||15,15.1o.5D||u)),15.1n>=c)1b(r=15.27;r&&(o=r.1f,!15.1A||d);)(r.2c||r.1i<=15.1n&&!r.1A&&!r.1I)&&(r.2G?r.1B((r.2o?r.26():r.2l)-(e-r.1i)*r.1y,t,n):r.1B((e-r.1i)*r.1y,t,n)),r=o;1m 1b(r=15.3h;r&&(o=r.1l,!15.1A||d);)(r.2c||c>=r.1i&&!r.1A&&!r.1I)&&(r.2G?r.1B((r.2o?r.26():r.2l)-(e-r.1i)*r.1y,t,n):r.1B((e-r.1i)*r.1y,t,n)),r=o;15.32&&(t||15.32.36(15.1o.6b||15,15.1o.67||u)),a&&(15.1I||(h===15.1i||p!==15.1y)&&(0===15.1n||l>=15.26())&&(s&&(15.1p.4P&&15.1M(!1,!1),15.2c=!1),!t&&15.1o[a]&&15.1o[a].36(15.1o[a+"6l"]||15,15.1o[a+"6o"]||u)))}},c.5U=17(){1b(19 e=15.27;e;){1a(e.1A||e 2a r&&e.5U())18!0;e=e.1f}18!1},c.5g=17(e,t,r,i){i=i||-4Y;1b(19 s=[],o=15.27,u=0;o;)i>o.1i||(o 2a n?t!==!1&&(s[u++]=o):(r!==!1&&(s[u++]=o),e!==!1&&(s=s.3U(o.5g(!0,t,r)),u=s.1c))),o=o.1f;18 s},c.3W=17(e,t){1b(19 r=n.3W(e),i=r.1c,s=[],o=0;--i>-1;)(r[i].1U===15||t&&15.7A(r[i]))&&(s[o++]=r[i]);18 s},c.7A=17(e){1b(19 t=e.1U;t;){1a(t===15)18!0;t=t.1U}18!1},c.7l=17(e,t,n){n=n||0;1b(19 r,i=15.27,s=15.2L;i;)i.1i>=n&&(i.1i+=e),i=i.1f;1a(t)1b(r 1w s)s[r]>=n&&(s[r]+=e);18 15.35(!0)},c.2p=17(e,t){1a(!e&&!t)18 15.1M(!1,!1);1b(19 n=t?15.3W(t):15.5g(!0,!0,!1),r=n.1c,i=!1;--r>-1;)n[r].2p(e,t)&&(i=!0);18 i},c.9b=17(e){19 t=15.5g(!1,!0,!0),n=t.1c;1b(15.1n=15.1K=0;--n>-1;)t[n].1M(!1,!1);18 e!==!1&&(15.2L={}),15.35(!0)},c.5i=17(){1b(19 e=15.27;e;)e.5i(),e=e.1f;18 15},c.1M=17(e,n){1a(e===15.1I)1b(19 r=15.27;r;)r.1M(e,!0),r=r.1f;18 t.1x.1M.1Z(15,e,n)},c.2C=17(e){18 22.1c?(0!==15.2C()&&0!==e&&15.5N(15.1N/e),15):(15.2o&&15.26(),15.1N)},c.26=17(e){1a(!22.1c){1a(15.2o){1b(19 t,n,r=0,i=15.3h,s=9g;i;)t=i.1l,i.2o&&i.26(),i.1i>s&&15.4J&&!i.1A?15.1P(i,i.1i-i.2J):s=i.1i,0>i.1i&&!i.1A&&(r-=i.1i,15.1p.2F&&(15.1i+=i.1i/15.1y),15.7l(-i.1i,!1,-4Y),s=0),n=i.1i+i.2l/i.1y,n>r&&(r=n),i=t;15.1N=15.2l=r,15.2o=!1}18 15.2l}18 0!==15.26()&&0!==e&&15.5N(15.2l/e),15},c.cW=17(){1b(19 t=15.1p;t.1p;)t=t.1p;18 t===e.6Y},c.3y=17(){18 15.1A?15.1K:(15.1p.3y()-15.1i)*15.1y},r},!0)}),1T.3R&&1T.3b.4G()();(1T.3b||(1T.3b=[])).28(17(){"5v 5u";1T.3R("2j.7F",["2j.7v"],17(e){19 t,n,r,i=1T.6h||1T,s=i.4F.4A,o=2*1h.4l,u=1h.4l/2,a=s.7W,f=17(t,n){19 r=a("2j."+t,17(){},!0),i=r.1x=1g e;18 i.2M=r,i.2x=n,r},l=e.7X||17(){},c=17(e,t,n,r){19 i=a("2j."+e,{5R:1g t,5s:1g n,5r:1g r},!0);18 l(i,e),i},h=17(e,t,n){15.t=e,15.v=t,n&&(15.5t=n,n.5x=15,15.c=n.v-t,15.7x=n.t-e)},p=17(t,n){19 r=a("2j."+t,17(e){15.1R=e||0===e?e:1.c7,15.2k=1.ci*15.1R},!0),i=r.1x=1g e;18 i.2M=r,i.2x=n,i.3t=17(e){18 1g r(e)},r},d=c("7F",p("d3",17(e){18(e-=1)*e*((15.1R+1)*e+15.1R)+1}),p("d6",17(e){18 e*e*((15.1R+1)*e-15.1R)}),p("cU",17(e){18 1>(e*=2)?.5*e*e*((15.2k+1)*e-15.2k):.5*((e-=2)*e*((15.2k+1)*e+15.2k)+2)})),v=a("2j.5Z",17(e,t,n){t=t||0===t?t:.7,1d==e?e=.7:e>1&&(e=1),15.7V=1!==e?t:0,15.1R=(1-e)/2,15.2k=e,15.3c=15.1R+15.2k,15.3m=n===!0},!0),m=v.1x=1g e;18 m.2M=v,m.2x=17(e){19 t=e+(.5-e)*15.7V;18 15.1R>e?15.3m?1-(e=1-e/15.1R)*e:t-(e=1-e/15.1R)*e*e*e*t:e>15.3c?15.3m?1-(e=(e-15.3c)/15.1R)*e:t+(e-t)*(e=(e-15.3c)/15.1R)*e*e*e:15.3m?1:t},v.3Q=1g v(.7,.7),m.3t=v.3t=17(e,t,n){18 1g v(e,t,n)},t=a("2j.7S",17(e){e=e||1,15.1R=1/e,15.2k=e+1},!0),m=t.1x=1g e,m.2M=t,m.2x=17(e){18 0>e?e=0:e>=1&&(e=.cH),(15.2k*e>>0)*15.1R},m.3t=t.3t=17(e){18 1g t(e)},n=a("2j.7Y",17(t){t=t||{};1b(19 n,r,i,s,o,u,a=t.cT||"3r",f=[],l=0,c=0|(t.d4||20),p=c,d=t.d1!==!1,v=t.cX===!0,m=t.7J 2a e?t.7J:1d,g="2t"==1j t.7K?.4*t.7K:.4;--p>-1;)n=d?1h.7L():1/c*p,r=m?m.2x(n):n,"3r"===a?i=g:"cC"===a?(s=1-n,i=s*s*g):"1w"===a?i=n*n*g:.5>n?(s=2*n,i=.5*s*s*g):(s=2*(1-n),i=.5*s*s*g),d?r+=1h.7L()*i-.5*i:p%2?r+=.5*i:r-=.5*i,v&&(r>1?r=1:0>r&&(r=0)),f[l++]={x:n,y:r};1b(f.ch(17(e,t){18 e.x-t.x}),u=1g h(1,1,1d),p=c;--p>-1;)o=f[p],u=1g h(o.x,o.y,u);15.1l=1g h(0,0,0!==u.t?u:u.5t)},!0),m=n.1x=1g e,m.2M=n,m.2x=17(e){19 t=15.1l;1a(e>t.t){1b(;t.5t&&e>=t.t;)t=t.5t;t=t.5x}1m 1b(;t.5x&&t.t>=e;)t=t.5x;18 15.1l=t,t.v+(e-t.t)/t.7x*t.c},m.3t=17(e){18 1g n(e)},n.3Q=1g n,c("cm",f("cA",17(e){18 1/2.75>e?7.2I*e*e:2/2.75>e?7.2I*(e-=1.5/2.75)*e+.75:2.5/2.75>e?7.2I*(e-=2.25/2.75)*e+.6i:7.2I*(e-=2.6d/2.75)*e+.6e}),f("cu",17(e){18 1/2.75>(e=1-e)?1-7.2I*e*e:2/2.75>e?1-(7.2I*(e-=1.5/2.75)*e+.75):2.5/2.75>e?1-(7.2I*(e-=2.25/2.75)*e+.6i):1-(7.2I*(e-=2.6d/2.75)*e+.6e)}),f("co",17(e){19 t=.5>e;18 e=t?1-2*e:2*e-1,e=1/2.75>e?7.2I*e*e:2/2.75>e?7.2I*(e-=1.5/2.75)*e+.75:2.5/2.75>e?7.2I*(e-=2.25/2.75)*e+.6i:7.2I*(e-=2.6d/2.75)*e+.6e,t?.5*(1-e):.5*e+.5})),c("cr",f("cs",17(e){18 1h.3l(1-(e-=1)*e)}),f("cp",17(e){18-(1h.3l(1-e*e)-1)}),f("cn",17(e){18 1>(e*=2)?-.5*(1h.3l(1-e*e)-1):.5*(1h.3l(1-(e-=2)*e)+1)})),r=17(t,n,r){19 i=a("2j."+t,17(e,t){15.1R=e||1,15.2k=t||r,15.3c=15.2k/o*(1h.cv(1/15.1R)||0)},!0),s=i.1x=1g e;18 s.2M=i,s.2x=n,s.3t=17(e,t){18 1g i(e,t)},i},c("cB",r("cz",17(e){18 15.1R*1h.3n(2,-10*e)*1h.2h((e-15.3c)*o/15.2k)+1},.3),r("cy",17(e){18-(15.1R*1h.3n(2,10*(e-=1))*1h.2h((e-15.3c)*o/15.2k))},.3),r("cw",17(e){18 1>(e*=2)?-.5*15.1R*1h.3n(2,10*(e-=1))*1h.2h((e-15.3c)*o/15.2k):.5*15.1R*1h.3n(2,-10*(e-=1))*1h.2h((e-15.3c)*o/15.2k)+1},.45)),c("cc",f("ca",17(e){18 1-1h.3n(2,-10*e)}),f("c8",17(e){18 1h.3n(2,10*(e-1))-.cd}),f("ce",17(e){18 1>(e*=2)?.5*1h.3n(2,10*(e-1)):.5*(2-1h.3n(2,-10*(e-1)))})),c("ck",f("cf",17(e){18 1h.2h(e*u)}),f("cJ",17(e){18-1h.2D(e*u)+1}),f("cZ",17(e){18-.5*(1h.2D(1h.4l*e)-1)})),a("2j.cV",{d0:17(t){18 e.7Z[t]}},!0),l(i.5Z,"5Z","3Q,"),l(n,"7Y","3Q,"),l(t,"7S","3Q,"),d},!0)}),1T.3R&&1T.3b.4G()();(1T.3b||(1T.3b=[])).28(17(){"5v 5u";1T.3R("4z.cE",["4z.7Q","5c"],17(e,t){19 n,r,i,s,o=17(){e.1Z(15,"4s"),15.2E.1c=0,15.1X=o.1x.1X},u={},a=o.1x=1g e("4s");a.2M=o,o.3Z="1.11.2",o.3J=2,o.8g=0,a="2d",o.6z={3k:a,7e:a,4x:a,4u:a,3M:a,3B:a,cP:a,6x:a,6w:a,33:a};19 f,l,c,h,p,d,v=/(?:\\d|\\-\\d|\\.\\d|\\-\\.\\d)+/g,m=/(?:\\d|\\-\\d|\\.\\d|\\-\\.\\d|\\+=\\d|\\-=\\d|\\+=.\\d|\\-=\\.\\d)+/g,g=/(?:\\+=|\\-=|\\-|\\b)[\\d\\-\\.]+[a-cN-cO-9]*(?:%|\\b)/3N,y=/[^\\d\\-\\.]/g,b=/(?:\\d|\\-|\\+|=|#|\\.)*/g,w=/1Y *= *([^)]*)/,E=/1Y:([^;]*)/,S=/3E\\(1Y *=.+?\\)/i,x=/^(5e|6m)/,T=/([A-Z])/g,N=/-([a-z])/3N,C=/(^(?:74\\(\\"|74\\())|(?:(\\"\\))$|\\)$)/3N,k=17(e,t){18 t.5h()},L=/(?:5Y|7s|7k)/i,A=/(8z|8O|8N|8L)=[\\d\\-\\.e]+/3N,O=/8x\\:5J\\.5L\\.5M\\(.+?\\)/i,M=/,(?=[^\\)]*(?:\\(|$))/3N,2q=1h.4l/31,D=31/1h.4l,P={},H=69,B=H.6a("77"),j=H.6a("ba"),F=o.4p={bb:u},I=b8.b7,q=17(){19 e,t=I.1k("b3"),n=H.6a("77");18 c=-1!==I.1k("b5")&&-1===I.1k("b6")&&(-1===t||1C(I.1t(t+8,1))>3),p=c&&6>1C(I.1t(I.1k("bc/")+8,1)),h=-1!==I.1k("bd"),/bk ([0-9]{1,}[\\.0-9]{0,})/.bl(I)&&(d=1q(4k.$1)),n.bm="<a 1v=\'3k:bj;1Y:.55;\'>a</a>",e=n.bi("a")[0],e?/^0.55/.2P(e.1v.1Y):!1}(),R=17(e){18 w.2P("1H"==1j e?e:(e.2R?e.2R.2i:e.1v.2i)||"")?1q(4k.$1)/23:1},U=17(e){1T.65&&65.6U(e)},z="",W="",X=17(e,t){t=t||B;19 n,r,i=t.1v;1a(2u 0!==i[e])18 e;1b(e=e.1u(0).5h()+e.1t(1),n=["O","be","64","bf","bg"],r=5;--r>-1&&2u 0===i[n[r]+e];);18 r>=0?(W=3===r?"64":n[r],z="-"+W.6R()+"-",W+e):1d},V=H.6Z?H.6Z.bh:17(){},$=o.c6=17(e,t,n,r,i){19 s;18 q||"1Y"!==t?(!r&&e.1v[t]?s=e.1v[t]:(n=n||V(e,1d))?(e=n.4m(t.1D(T,"-$1").6R()),s=e||n.1c?e:n[t]):e.2R&&(s=e.2R[t]),1d==i||s&&"3r"!==s&&"2n"!==s&&"2n 2n"!==s?s:i):R(e)},J=17(e,t,n,r,i){1a("2d"===r||!r)18 n;1a("2n"===r||!n)18 0;19 s,o=L.2P(t),u=e,a=B.1v,f=0>n;18 f&&(n=-n),"%"===r&&-1!==t.1k("3X")?s=n/23*(o?e.b2:e.b1):(a.37="3X:0 4S 8P;4q:"+$(e,"4q")+";aN-3B:0;","%"!==r&&u.7m?a[o?"aO":"70"]=n+r:(u=e.aP||H.aM,a[o?"3M":"3B"]=n+r),u.7m(B),s=1q(B[o?"4H":"4r"]),u.aL(B),0!==s||i||(s=J(e,t,n,r,!0))),f?-s:s},K=17(e,t,n){1a("8y"!==$(e,"4q",n))18 0;19 r="4u"===t?"5Y":"7r",i=$(e,"6w"+r,n);18 e["aH"+r]-(J(e,t,1q(i),i.1D(b,""))||0)},Q=17(e,t){19 n,r,i={};1a(t=t||V(e,1d))1a(n=t.1c)1b(;--n>-1;)i[t[n].1D(N,k)]=t.4m(t[n]);1m 1b(n 1w t)i[n]=t[n];1m 1a(t=e.2R||e.1v)1b(n 1w t)"1H"==1j n&&2u 0!==i[n]&&(i[n.1D(N,k)]=t[n]);18 q||(i.1Y=R(e)),r=44(e,t,!1),i.1F=r.1F,i.1S=r.1S,i.2f=r.2f,i.2g=r.2g,i.x=r.x,i.y=r.y,3j&&(i.z=r.z,i.1Q=r.1Q,i.21=r.21,i.2N=r.2N),i.7q&&3L i.7q,i},G=17(e,t,n,r,i){19 s,o,u,a={},f=e.1v;1b(o 1w n)"37"!==o&&"1c"!==o&&5X(o)&&(t[o]!==(s=n[o])||i&&i[o])&&-1===o.1k("aI")&&("2t"==1j s||"1H"==1j s)&&(a[o]="2n"!==s||"4u"!==o&&"3k"!==o?""!==s&&"2n"!==s&&"3r"!==s||"1H"!=1j t[o]||""===t[o].1D(y,"")?s:0:K(e,o),2u 0!==f[o]&&(u=1g ct(f,o,f[o],u)));1a(r)1b(o 1w r)"39"!==o&&(a[o]=r[o]);18{4T:a,42:u}},Y={3M:["5Y","7s"],3B:["7r","aK"]},Z=["7C","81","83","82"],3D=17(e,t,n){19 r=1q("3M"===t?e.4H:e.4r),i=Y[t],s=i.1c;1b(n=n||V(e,1d);--s>-1;)r-=1q($(e,"6x"+i[s],n,!0))||0,r-=1q($(e,"3X"+i[s]+"7k",n,!0))||0;18 r},3e=17(e,t){(1d==e||""===e||"2n"===e||"2n 2n"===e)&&(e="0 0");19 n=e.1s(" "),r=-1!==e.1k("4u")?"0%":-1!==e.1k("7e")?"23%":n[0],i=-1!==e.1k("3k")?"0%":-1!==e.1k("4x")?"23%":n[1];18 1d==i?i="0":"7d"===i&&(i="50%"),("7d"===r||5X(1q(r))&&-1===(r+"").1k("="))&&(r="50%"),t&&(t.8K=-1!==r.1k("%"),t.8H=-1!==i.1k("%"),t.aQ="="===r.1u(1),t.aR="="===i.1u(1),t.57=1q(r.1D(y,"")),t.5K=1q(i.1D(y,""))),r+" "+i+(n.1c>2?" "+n[2]:"")},3s=17(e,t){18"1H"==1j e&&"="===e.1u(1)?3q(e.1u(0)+"1",10)*1q(e.1t(2)):1q(e)-1q(t)},2B=17(e,t){18 1d==e?t:"1H"==1j e&&"="===e.1u(1)?3q(e.1u(0)+"1",10)*1C(e.1t(2))+t:1q(e)},3z=17(e,t,n,r){19 i,s,o,u,a=1e-6;18 1d==e?u=t:"2t"==1j e?u=e:(i=6r,s=e.1s("2q"),o=1C(s[0].1D(y,""))*(-1===e.1k("aY")?1:D)-("="===e.1u(1)?0:t),s.1c&&(r&&(r[n]=t+o),-1!==e.1k("aZ")&&(o%=i,o!==o%(i/2)&&(o=0>o?o+i:o-i)),-1!==e.1k("b0")&&0>o?o=(o+4Y*i)%i-(0|o/i)*i:-1!==e.1k("aX")&&o>0&&(o=(o-4Y*i)%i-(0|o/i)*i)),u=t+o),a>u&&u>-a&&(u=0),u},3G={aS:[0,1E,1E],aT:[0,1E,0],aU:[5j,5j,5j],8k:[0,0,0],aV:[2O,0,0],bn:[0,2O,2O],bo:[0,0,1E],bS:[0,0,2O],bT:[1E,1E,1E],bU:[1E,0,1E],bR:[2O,2O,0],bQ:[1E,1E,0],bM:[1E,bN,0],bO:[2O,2O,2O],bP:[2O,0,2O],bV:[0,2O,0],8P:[1E,0,0],c2:[1E,5j,c4],c1:[0,1E,1E],4a:[1E,1E,1E,0]},4W=17(e,t,n){18 e=0>e?e+1:e>1?e-1:e,0|1E*(1>6*e?t+6*(n-t)*e:.5>e?n:2>3*e?t+6*(n-t)*(2/3-e):t)+.5},5d=17(e){19 t,n,r,i,s,o;18 e&&""!==e?"2t"==1j e?[e>>16,1E&e>>8,1E&e]:(","===e.1u(e.1c-1)&&(e=e.1t(0,e.1c-1)),3G[e]?3G[e]:"#"===e.1u(0)?(4===e.1c&&(t=e.1u(1),n=e.1u(2),r=e.1u(3),e="#"+t+t+n+n+r+r),e=3q(e.1t(1),16),[e>>16,1E&e>>8,1E&e]):"6m"===e.1t(0,3)?(e=e.2K(v),i=1C(e[0])%6r/6r,s=1C(e[1])/23,o=1C(e[2])/23,n=.5>=o?o*(s+1):o+s-o*s,t=2*o-n,e.1c>3&&(e[3]=1C(e[3])),e[0]=4W(i+1/3,t,n),e[1]=4W(i,t,n),e[2]=4W(i-1/3,t,n),e):(e=e.2K(v)||3G.4a,e[0]=1C(e[0]),e[1]=1C(e[1]),e[2]=1C(e[2]),e.1c>3&&(e[3]=1C(e[3])),e)):3G.8k},at="(?:\\\\b(?:(?:5e|6N|6m|bZ)\\\\(.+?\\\\))|\\\\B#.+?\\\\b";1b(a 1w 3G)at+="|"+a+"\\\\b";at=4k(at+")","3N");19 6I=17(e,t,n,r){1a(1d==e)18 17(e){18 e};19 i,s=t?(e.2K(at)||[""])[0]:"",o=e.1s(s).1G("").2K(g)||[],u=e.1t(0,e.1k(o[0])),a=")"===e.1u(e.1c-1)?")":"",f=-1!==e.1k(" ")?" ":",",l=o.1c,c=l>0?o[0].1D(v,""):"";18 l?i=t?17(e){19 t,h,p,d;1a("2t"==1j e)e+=c;1m 1a(r&&M.2P(e)){1b(d=e.1D(M,"|").1s("|"),p=0;d.1c>p;p++)d[p]=i(d[p]);18 d.1G(",")}1a(t=(e.2K(at)||[s])[0],h=e.1s(t).1G("").2K(g)||[],p=h.1c,l>p--)1b(;l>++p;)h[p]=n?h[0|(p-1)/2]:o[p];18 u+h.1G(f)+f+t+a+(-1!==e.1k("6D")?" 6D":"")}:17(e){19 t,s,h;1a("2t"==1j e)e+=c;1m 1a(r&&M.2P(e)){1b(s=e.1D(M,"|").1s("|"),h=0;s.1c>h;h++)s[h]=i(s[h]);18 s.1G(",")}1a(t=e.2K(g)||[],h=t.1c,l>h--)1b(;l>++h;)t[h]=n?t[0|(h-1)/2]:o[h];18 u+t.1G(f)+a}:17(e){18 e}},6A=17(e){18 e=e.1s(","),17(t,n,r,i,s,o,u){19 a,f=(n+"").1s(" ");1b(u={},a=0;4>a;a++)u[e[a]]=f[a]=f[a]||f[(a-1)/2>>0];18 i.2S(t,u,s,o)}},ct=(F.bL=17(e){15.2A.1X(e);1b(19 t,n,r,i,s=15.1z,o=s.8t,u=s.42,a=1e-6;u;)t=o[u.v],u.r?t=t>0?0|t+.5:0|t-.5:a>t&&t>-a&&(t=0),u.t[u.p]=t,u=u.1f;1a(s.8c&&(s.8c.1F=o.1F),1===e)1b(u=s.42;u;){1a(n=u.t,n.2r){1a(1===n.2r){1b(i=n.1W+n.s+n.3V,r=1;n.l>r;r++)i+=n["3g"+r]+n["2X"+(r+1)];n.e=i}}1m n.e=n.s+n.1W;u=u.1f}},17(e,t,n,r,i){15.t=e,15.p=t,15.v=n,15.r=i,r&&(r.1l=15,15.1f=r)}),24=(F.bK=17(e,t,n,r,i,s){19 o,u,a,f,l,c=r,h={},p={},d=n.3p,v=P;1b(n.3p=1d,P=t,r=l=n.2S(e,t,r,i),P=v,s&&(n.3p=d,c&&(c.1l=1d,c.1l&&(c.1l.1f=1d)));r&&r!==c;){1a(1>=r.2r&&(u=r.p,p[u]=r.s+r.c,h[u]=r.s,s||(f=1g ct(r,"s",u,f,r.r),r.c=0),1===r.2r))1b(o=r.l;--o>0;)a="3g"+o,u=r.p+"2q"+a,p[u]=r.1z[a],h[u]=r[a],s||(f=1g ct(r,a,u,f,r.5f[a]));r=r.1f}18{8t:h,bw:p,42:f,4f:l}},F.bx=17(e,t,r,i,o,u,a,f,l,c,h){15.t=e,15.p=t,15.s=r,15.c=i,15.n=a||t,e 2a 24||s.28(15.n),15.r=f,15.2r=u||0,l&&(15.2s=l,n=!0),15.b=2u 0===c?r:c,15.e=2u 0===h?r+i:h,o&&(15.1f=o,o.1l=15)}),4f=o.46=17(e,t,n,r,i,s,o,u,a,l){n=n||s||"",o=1g 24(e,t,0,0,o,l?2:1,1d,!1,u,n,r),r+="";19 c,h,p,d,g,y,b,w,E,S,T,N,C=n.1s(", ").1G(",").1s(" "),k=r.1s(", ").1G(",").1s(" "),L=C.1c,A=f!==!1;1b((-1!==r.1k(",")||-1!==n.1k(","))&&(C=C.1G(" ").1D(M,", ").1s(" "),k=k.1G(" ").1D(M,", ").1s(" "),L=C.1c),L!==k.1c&&(C=(s||"").1s(" "),L=C.1c),o.2A=a,o.1X=l,c=0;L>c;c++)1a(d=C[c],g=k[c],w=1q(d),w||0===w)o.3I("",w,3s(g,w),g.1D(m,""),A&&-1!==g.1k("2d"),!0);1m 1a(i&&("#"===d.1u(0)||3G[d]||x.2P(d)))N=","===g.1u(g.1c-1)?"),":")",d=5d(d),g=5d(g),E=d.1c+g.1c>6,E&&!q&&0===g[3]?(o["2X"+o.l]+=o.l?" 4a":"4a",o.e=o.e.1s(k[c]).1G("4a")):(q||(E=!1),o.3I(E?"6N(":"5e(",d[0],g[0]-d[0],",",!0,!0).3I("",d[1],g[1]-d[1],",",!0).3I("",d[2],g[2]-d[2],E?",":N,!0),E&&(d=4>d.1c?1:d[3],o.3I("",d,(4>g.1c?1:g[3])-d,N,!1)));1m 1a(y=d.2K(v)){1a(b=g.2K(m),!b||b.1c!==y.1c)18 o;1b(p=0,h=0;y.1c>h;h++)T=y[h],S=d.1k(T,p),o.3I(d.1t(p,S-p),1C(T),3s(b[h],T),"",A&&"2d"===d.1t(S+T.1c,2),0===h),p=S+T.1c;o["2X"+o.l]+=d.1t(p)}1m o["2X"+o.l]+=o.l?" "+d:d;1a(-1!==r.1k("=")&&o.1z){1b(N=o.1W+o.1z.s,c=1;o.l>c;c++)N+=o["2X"+c]+o.1z["3g"+c];o.e=N+o["2X"+c]}18 o.l||(o.2r=-1,o.1W=o.e),o.3H||o},2m=9;1b(a=24.1x,a.l=a.2s=0;--2m>0;)a["3g"+2m]=0,a["2X"+2m]="";a.1W="",a.1f=a.1l=a.3H=a.1z=a.2A=a.1X=a.5f=1d,a.3I=17(e,t,n,r,i,s){19 o=15,u=o.l;18 o["2X"+u]+=s&&u?" "+e:e||"",n||0===u||o.2A?(o.l++,o.2r=o.1X?2:1,o["2X"+o.l]=r||"",u>0?(o.1z["3g"+u]=t+n,o.5f["3g"+u]=i,o["3g"+u]=t,o.2A||(o.3H=1g 24(o,"3g"+u,t,n,o.3H||o,0,o.n,i,o.2s),o.3H.1W=0),o):(o.1z={s:t+n},o.5f={},o.s=t,o.c=n,o.r=i,o)):(o["2X"+u]+=t+(r||""),o)};19 5G=17(e,t){t=t||{},15.p=t.2T?X(e)||e:e,u[e]=u[15.p]=15,15.2U=t.4R||6I(t.2y,t.4g,t.by,t.47),t.2b&&(15.2S=t.2b),15.8D=t.4g,15.47=t.47,15.4V=t.4V,15.49=t.2y,15.2s=t.5H||0},1L=F.bv=17(e,t,n){"3T"!=1j t&&(t={2b:n});19 r,i,s=e.1s(","),o=t.2y;1b(n=n||[o],r=0;s.1c>r;r++)t.2T=0===r&&t.2T,t.2y=n[r]||o,i=1g 5G(s[r],t)},7H=17(e){1a(!u[e]){19 t=e.1u(0).5h()+e.1t(1)+"8j";1L(e,{2b:17(e,n,r,i,s,o,a){19 f=(1T.6h||1T).4F.4A.4z[t];18 f?(f.bu(),u[r].2S(e,n,r,i,s,o,a)):(U("bp: "+t+" bq br 8a bs."),s)}})}};a=5G.1x,a.46=17(e,t,n,r,i,s){19 o,u,a,f,l,c,h=15.4V;1a(15.47&&(M.2P(n)||M.2P(t)?(u=t.1D(M,"|").1s("|"),a=n.1D(M,"|").1s("|")):h&&(u=[t],a=[n])),a){1b(f=a.1c>u.1c?a.1c:u.1c,o=0;f>o;o++)t=u[o]=u[o]||15.49,n=a[o]=a[o]||15.49,h&&(l=t.1k(h),c=n.1k(h),l!==c&&(n=-1===c?a:u,n[o]+=" "+h));t=u.1G(", "),n=a.1G(", ")}18 4f(e,15.p,t,n,15.8D,15.49,r,15.2s,i,s)},a.2S=17(e,t,n,r,s,o){18 15.46(e.1v,15.2U($(e,15.p,i,!1,15.49)),15.2U(t),s,o)},o.bA=17(e,t,n){1L(e,{2b:17(e,r,i,s,o,u){19 a=1g 24(e,i,0,0,o,2,i,!1,n);18 a.2A=u,a.1X=t(e,r,s.2V,i),a},5H:n})};19 6K="2f,2g,2N,x,y,z,1S,1F,1Q,21,33".1s(","),bt=X("3P"),8B=z+"3P",5m=X("4Q"),3j=1d!==X("33"),44=17(e,t,n,r){1a(e.4b&&n&&!r)18 e.4b;19 i,s,u,a,f,l,c,h,p,d,v,m,g,y=n?e.4b||{30:0}:{30:0},b=0>y.2f,w=2e-5,E=54,S=bH.99,x=S*2q,T=3j?1q($(e,5m,t,!1,"0 0 0").1s(" ")[2])||y.2Q||0:0;1b(bt?i=$(e,8B,t,!0):e.2R&&(i=e.2R.2i.2K(A),i=i&&4===i.1c?[i[0].1t(4),1C(i[2].1t(4)),1C(i[1].1t(4)),i[3].1t(4),y.x||0,y.y||0].1G(","):""),s=(i||"").2K(/(?:\\-|\\b)[\\d\\-\\.e]+\\b/3N)||[],u=s.1c;--u>-1;)a=1C(s[u]),s[u]=(f=a-(a|=0))?(0|f*E+(0>f?-.5:.5))/E+a:a;1a(16===s.1c){19 N=s[8],C=s[9],k=s[10],L=s[12],O=s[13],M=s[14];1a(y.2Q&&(M=-y.2Q,L=N*M-s[12],O=C*M-s[13],M=k*M+y.2Q-s[14]),!n||r||1d==y.1Q){19 P,H,B,j,F,I,q,R=s[0],U=s[1],z=s[2],W=s[3],X=s[4],V=s[5],J=s[6],K=s[7],Q=s[11],G=1h.4w(J,k),Y=-x>G||G>x;y.1Q=G*D,G&&(j=1h.2D(-G),F=1h.2h(-G),P=X*j+N*F,H=V*j+C*F,B=J*j+k*F,N=X*-F+N*j,C=V*-F+C*j,k=J*-F+k*j,Q=K*-F+Q*j,X=P,V=H,J=B),G=1h.4w(N,R),y.21=G*D,G&&(I=-x>G||G>x,j=1h.2D(-G),F=1h.2h(-G),P=R*j-N*F,H=U*j-C*F,B=z*j-k*F,C=U*F+C*j,k=z*F+k*j,Q=W*F+Q*j,R=P,U=H,z=B),G=1h.4w(U,V),y.1F=G*D,G&&(q=-x>G||G>x,j=1h.2D(-G),F=1h.2h(-G),R=R*j+X*F,H=U*j+V*F,V=U*-F+V*j,J=z*-F+J*j,U=H),q&&Y?y.1F=y.1Q=0:q&&I?y.1F=y.21=0:I&&Y&&(y.21=y.1Q=0),y.2f=(0|1h.3l(R*R+U*U)*E+.5)/E,y.2g=(0|1h.3l(V*V+C*C)*E+.5)/E,y.2N=(0|1h.3l(J*J+k*k)*E+.5)/E,y.1S=0,y.33=Q?1/(0>Q?-Q:Q):0,y.x=L,y.y=O,y.z=M}}1m 1a(!(3j&&!r&&s.1c&&y.x===s[4]&&y.y===s[5]&&(y.1Q||y.21)||2u 0!==y.x&&"3r"===$(e,"6s",t))){19 Z=s.1c>=6,3D=Z?s[0]:1,3e=s[1]||0,3s=s[2]||0,2B=Z?s[3]:1;y.x=s[4]||0,y.y=s[5]||0,l=1h.3l(3D*3D+3e*3e),c=1h.3l(2B*2B+3s*3s),h=3D||3e?1h.4w(3e,3D)*D:y.1F||0,p=3s||2B?1h.4w(3s,2B)*D+h:y.1S||0,d=l-1h.56(y.2f||0),v=c-1h.56(y.2g||0),1h.56(p)>90&&bJ>1h.56(p)&&(b?(l*=-1,p+=0>=h?31:-31,h+=0>=h?31:-31):(c*=-1,p+=0>=p?31:-31)),m=(h-y.1F)%31,g=(p-y.1S)%31,(2u 0===y.1S||d>w||-w>d||v>w||-w>v||m>-S&&S>m&&5O|m*E||g>-S&&S>g&&5O|g*E)&&(y.2f=l,y.2g=c,y.1F=h,y.1S=p),3j&&(y.1Q=y.21=y.z=0,y.33=1q(o.8g)||0,y.2N=1)}y.2Q=T;1b(u 1w y)w>y[u]&&y[u]>-w&&(y[u]=0);18 n&&(e.4b=y),y},7O=17(e){19 t,n,r=15.1z,i=-r.1F*2q,s=i+r.1S*2q,o=54,u=(0|1h.2D(i)*r.2f*o)/o,a=(0|1h.2h(i)*r.2f*o)/o,f=(0|1h.2h(s)*-r.2g*o)/o,l=(0|1h.2D(s)*r.2g*o)/o,c=15.t.1v,h=15.t.2R;1a(h){n=a,a=-f,f=-n,t=h.2i,c.2i="";19 p,v,m=15.t.4H,g=15.t.4r,y="8y"!==h.4q,E="8x:5J.5L.5M(8z="+u+", 8O="+a+", 8N="+f+", 8L="+l,S=r.x,x=r.y;1a(1d!=r.57&&(p=(r.8K?.8I*m*r.57:r.57)-m/2,v=(r.8H?.8I*g*r.5K:r.5K)-g/2,S+=p-(p*u+v*a),x+=v-(p*f+v*l)),y?(p=m/2,v=g/2,E+=", 8E="+(p-(p*u+v*a)+S)+", 8G="+(v-(p*f+v*l)+x)+")"):E+=", bF=\'2n bB\')",c.2i=-1!==t.1k("5J.5L.5M(")?t.1D(O,E):E+" "+t,(0===e||1===e)&&1===u&&0===a&&0===f&&1===l&&(y&&-1===E.1k("8E=0, 8G=0")||w.2P(t)&&23!==1q(4k.$1)||-1===t.1k("bD("&&t.1k("bE"))&&c.6Q("2i")),!y){19 T,N,C,k=8>d?1:-1;1b(p=r.5l||0,v=r.58||0,r.5l=1h.59((m-((0>u?-u:u)*m+(0>a?-a:a)*g))/2+S),r.58=1h.59((g-((0>l?-l:l)*g+(0>f?-f:f)*m))/2+x),2m=0;4>2m;2m++)N=Z[2m],T=h[N],n=-1!==T.1k("2d")?1q(T):J(15.t,N,1q(T),T.1D(b,""))||0,C=n!==r[N]?2>2m?-r.5l:-r.58:2>2m?p-r.5l:v-r.58,c[N]=(r[N]=1h.59(n-C*(0===2m||2===2m?1:k)))+"2d"}}},7D=17(){19 e,t,n,r,i,s,o,u,a,f,l,c,p,d,v,m,g,y,b,w,E,S,x,T=15.1z,N=15.t.1v,C=T.1F*2q,k=T.2f,L=T.2g,A=T.2N,O=T.33;1a(h){19 M=1e-4;M>k&&k>-M&&(k=A=2e-5),M>L&&L>-M&&(L=A=2e-5),!O||T.z||T.1Q||T.21||(O=0)}1a(C||T.1S)y=1h.2D(C),b=1h.2h(C),e=y,i=b,T.1S&&(C-=T.1S*2q,y=1h.2D(C),b=1h.2h(C)),t=-b,s=y;1m{1a(!(T.21||T.1Q||1!==A||O))18 N[bt]="bC("+T.x+"2d,"+T.y+"2d,"+T.z+"2d)"+(1!==k||1!==L?" 48("+k+","+L+")":""),2u 0;e=s=1,t=i=0}l=1,n=r=o=u=a=f=c=p=d=0,v=O?-1/O:0,m=T.2Q,g=54,C=T.21*2q,C&&(y=1h.2D(C),b=1h.2h(C),a=l*-b,p=v*-b,n=e*b,o=i*b,l*=y,v*=y,e*=y,i*=y),C=T.1Q*2q,C&&(y=1h.2D(C),b=1h.2h(C),w=t*y+n*b,E=s*y+o*b,S=f*y+l*b,x=d*y+v*b,n=t*-b+n*y,o=s*-b+o*y,l=f*-b+l*y,v=d*-b+v*y,t=w,s=E,f=S,d=x),1!==A&&(n*=A,o*=A,l*=A,v*=A),1!==L&&(t*=L,s*=L,f*=L,d*=L),1!==k&&(e*=k,i*=k,a*=k,p*=k),m&&(c-=m,r=n*c,u=o*c,c=l*c+m),r=(w=(r+=T.x)-(r|=0))?(0|w*g+(0>w?-.5:.5))/g+r:r,u=(w=(u+=T.y)-(u|=0))?(0|w*g+(0>w?-.5:.5))/g+u:u,c=(w=(c+=T.z)-(c|=0))?(0|w*g+(0>w?-.5:.5))/g+c:c,N[bt]="bG("+[(0|e*g)/g,(0|i*g)/g,(0|a*g)/g,(0|p*g)/g,(0|t*g)/g,(0|s*g)/g,(0|f*g)/g,(0|d*g)/g,(0|n*g)/g,(0|o*g)/g,(0|l*g)/g,(0|v*g)/g,r,u,c,O?1+ -c/O:1].1G(",")+")"},7B=17(){19 e,t,n,r,i,s,o,u,a,f=15.1z,l=15.t,c=l.1v;h&&(e=c.3k?"3k":c.4x?"4x":1q($(l,"3k",1d,!1))?"4x":"3k",t=$(l,e,1d,!1),n=1q(t)||0,r=t.1t((n+"").1c)||"2d",f.6y=!f.6y,c[e]=(f.6y?n+.8v:n-.8v)+r),f.1F||f.1S?(i=f.1F*2q,s=i-f.1S*2q,o=54,u=f.2f*o,a=f.2g*o,c[bt]="8b("+(0|1h.2D(i)*u)/o+","+(0|1h.2h(i)*u)/o+","+(0|1h.2h(s)*-a)/o+","+(0|1h.2D(s)*a)/o+","+f.x+","+f.y+")"):c[bt]="8b("+f.2f+",0,0,"+f.2g+","+f.x+","+f.y+")"};1L("3P,48,2f,2g,2N,x,y,z,1F,1Q,21,6u,1S,30,6t,6B,6C,bI,4Q,8s,8n,8Q,4E",{2b:17(e,t,n,r,s,o,u){1a(r.3p)18 s;19 a,f,l,c,h,p,d,v=r.3p=44(e,i,!0,u.8Q),m=e.1v,g=1e-6,y=6K.1c,b=u,w={};1a("1H"==1j b.3P&&bt)l=m.37,m[bt]=b.3P,m.6s="bz",a=44(e,1d,!1),m.37=l;1m 1a("3T"==1j b){1a(a={2f:2B(1d!=b.2f?b.2f:b.48,v.2f),2g:2B(1d!=b.2g?b.2g:b.48,v.2g),2N:2B(1d!=b.2N?b.2N:b.48,v.2N),x:2B(b.x,v.x),y:2B(b.y,v.y),z:2B(b.z,v.z),33:2B(b.8s,v.33)},d=b.8n,1d!=d)1a("3T"==1j d)1b(l 1w d)b[l]=d[l];1m b.1F=d;a.1F=3z("1F"1w b?b.1F:"6t"1w b?b.6t+"6J":"6u"1w b?b.6u:v.1F,v.1F,"1F",w),3j&&(a.1Q=3z("1Q"1w b?b.1Q:"6B"1w b?b.6B+"6J":v.1Q||0,v.1Q,"1Q",w),a.21=3z("21"1w b?b.21:"6C"1w b?b.6C+"6J":v.21||0,v.21,"21",w)),a.1S=1d==b.1S?v.1S:3z(b.1S,v.1S),a.30=1d==b.30?v.30:3z(b.30,v.30),(f=a.30-v.30)&&(a.1S+=f,a.1F+=f)}1b(1d!=b.4E&&(v.4E=b.4E,p=!0),h=v.4E||v.z||v.1Q||v.21||a.z||a.1Q||a.21||a.33,h||1d==b.48||(a.2N=1);--y>-1;)n=6K[y],c=a[n]-v[n],(c>g||-g>c||1d!=P[n])&&(p=!0,s=1g 24(v,n,v[n],c,s),n 1w w&&(s.e=w[n]),s.1W=0,s.2A=o,r.2E.28(s.n));18 c=b.4Q,(c||3j&&h&&v.2Q)&&(bt?(p=!0,n=5m,c=(c||$(e,n,i,!1,"50% 50%"))+"",s=1g 24(m,n,0,0,s,-1,"4Q"),s.b=m[n],s.2A=o,3j?(l=v.2Q,c=c.1s(" "),v.2Q=(c.1c>2&&(0===l||"1J"!==c[2])?1q(c[2]):l)||0,s.1W=s.e=m[n]=c[0]+" "+(c[1]||"50%")+" 1J",s=1g 24(v,"2Q",0,0,s,-1,s.n),s.b=l,s.1W=s.e=v.2Q):s.1W=s.e=m[n]=c):3e(c+"",v)),p&&(r.3S=h||3===15.3S?3:2),s},2T:!0}),1L("bY",{2y:"1J 1J 1J 1J #6V",2T:!0,4g:!0,47:!0,4V:"6D"}),1L("bX",{2y:"1J",2b:17(e,t,n,s,o){t=15.2U(t);19 u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x=["c0","c3","bW","aW"],T=e.1v;1b(v=1q(e.4H),m=1q(e.4r),u=t.1s(" "),a=0;x.1c>a;a++)15.p.1k("3X")&&(x[a]=X(x[a])),c=l=$(e,x[a],i,!1,"1J"),-1!==c.1k(" ")&&(l=c.1s(" "),c=l[0],l=l[1]),h=f=u[a],p=1q(c),y=c.1t((p+"").1c),b="="===h.1u(1),b?(d=3q(h.1u(0)+"1",10),h=h.1t(2),d*=1q(h),g=h.1t((d+"").1c-(0>d?1:0))||""):(d=1q(h),g=h.1t((d+"").1c)),""===g&&(g=r[n]||y),g!==y&&(w=J(e,"6X",p,y),E=J(e,"aJ",p,y),"%"===g?(c=23*(w/v)+"%",l=23*(E/m)+"%"):"4d"===g?(S=J(e,"6X",1,"4d"),c=w/S+"4d",l=E/S+"4d"):(c=w+"2d",l=E+"2d"),b&&(h=1q(c)+d+g,f=1q(l)+d+g)),o=4f(T,x[a],c+" "+l,h+" "+f,!1,"1J",o);18 o},2T:!0,4R:6I("1J 1J 1J 1J",!1,!0)}),1L("b4",{2y:"0 0",2b:17(e,t,n,r,s,o){19 u,a,f,l,c,h,p="b9-4q",v=i||V(e,1d),m=15.2U((v?d?v.4m(p+"-x")+" "+v.4m(p+"-y"):v.4m(p):e.2R.c5+" "+e.2R.cQ)||"0 0"),g=15.2U(t);1a(-1!==m.1k("%")!=(-1!==g.1k("%"))&&(h=$(e,"cS").1D(C,""),h&&"3r"!==h)){1b(u=m.1s(" "),a=g.1s(" "),j.cM("cG",h),f=2;--f>-1;)m=u[f],l=-1!==m.1k("%"),l!==(-1!==a[f].1k("%"))&&(c=0===f?e.4H-j.3M:e.4r-j.3B,u[f]=l?1q(m)/23*c+"2d":23*(1q(m)/c)+"%");m=u.1G(" ")}18 15.46(e.1v,m,g,s,o)},4R:3e}),1L("cI",{2y:"0 0",4R:3e}),1L("33",{2y:"1J",2T:!0}),1L("cK",{2y:"50% 50%",2T:!0}),1L("cY",{2T:!0}),1L("cj",{2T:!0}),1L("cx",{2T:!0}),1L("6w",{2b:6A("83,81,82,7C")}),1L("6x",{2b:6A("cq,cl,cb,cF")}),1L("c9",{2y:"7R(1J,1J,1J,1J)",2b:17(e,t,n,r,s,o){19 u,a,f;18 9>d?(a=e.2R,f=8>d?" ":",",u="7R("+a.aG+f+a.cg+f+a.cD+f+a.d2+")",t=15.2U(t).1s(",").1G(f)):(u=15.2U($(e,15.p,i,!1,15.49)),t=15.2U(t)),15.46(e.1v,u,t,s,o)}}),1L("d5",{2y:"1J 1J 1J #6V",4g:!0,47:!0}),1L("7N,85",{2b:17(e,t,n,r,i){18 i}}),1L("3X",{2y:"1J 4S #6O",2b:17(e,t,n,r,s,o){18 15.46(e.1v,15.2U($(e,"70",i,!1,"1J")+" "+$(e,"cL",i,!1,"4S")+" "+$(e,"cR",i,!1,"#6O")),15.2U(t),s,o)},4g:!0,4R:17(e){19 t=e.1s(" ");18 t[0]+" "+(t[1]||"4S")+" "+(e.2K(at)||["#6O"])[0]}}),1L("9E,6S,6W",{2b:17(e,t,n,r,i){19 s=e.1v,o="6S"1w s?"6S":"6W";18 1g 24(s,o,0,0,i,-1,n,!1,0,s[o],t)}});19 73=17(e){19 t,n=15.t,r=n.2i||$(15.1z,"2i"),i=0|15.s+15.c*e;23===i&&(-1===r.1k("9k(")&&-1===r.1k("9e(")&&-1===r.1k("98(")?(n.6Q("2i"),t=!$(15.1z,"2i")):(n.2i=r.1D(S,""),t=!0)),t||(15.3O&&(n.2i=r=r||"3E(1Y="+i+")"),-1===r.1k("1Y")?0===i&&15.3O||(n.2i=r+" 3E(1Y="+i+")"):n.2i=r.1D(w,"1Y="+i))};1L("1Y,3E,5n",{2y:"1",2b:17(e,t,n,r,s,o){19 u=1q($(e,"1Y",i,!1,"1")),a=e.1v,f="5n"===n;18"1H"==1j t&&"="===t.1u(1)&&(t=("-"===t.1u(0)?-1:1)*1q(t.1t(2))+u),f&&1===u&&"5z"===$(e,"6E",i)&&0!==t&&(u=0),q?s=1g 24(a,"1Y",u,t-u,s):(s=1g 24(a,"1Y",23*u,23*(t-u),s),s.3O=f?1:0,a.7z=1,s.2r=2,s.b="3E(1Y="+s.s+")",s.e="3E(1Y="+(s.s+s.c)+")",s.1z=e,s.2A=o,s.1X=73),f&&(s=1g 24(a,"6E",0,0,s,-1,1d,!1,0,0!==u?"6T":"5z",0===t?"5z":"6T"),s.1W="6T",r.2E.28(s.n),r.2E.28(n)),s}});19 53=17(e,t){t&&(e.88?e.88(t.1D(T,"-$1").6R()):e.6Q(t))},7M=17(e){1a(15.t.4K=15,1===e||0===e){15.t.39=0===e?15.b:15.e;1b(19 t=15.1z,n=15.t.1v;t;)t.v?n[t.p]=t.v:53(n,t.p),t=t.1f;1===e&&15.t.4K===15&&(15.t.4K=1d)}1m 15.t.39!==15.e&&(15.t.39=15.e)};1L("39",{2b:17(e,t,r,s,o,u,a){19 f,l,c,h,p,d=e.39,v=e.1v.37;1a(o=s.6F=1g 24(e,r,0,0,o,2),o.1X=7M,o.2s=-11,n=!0,o.b=d,l=Q(e,i),c=e.4K){1b(h={},p=c.1z;p;)h[p.p]=1,p=p.1f;c.1X(1)}18 e.4K=o,o.e="="!==t.1u(1)?t:d.1D(4k("\\\\s*\\\\b"+t.1t(2)+"\\\\b"),"")+("+"===t.1u(0)?" "+t.1t(2):""),s.2V.1N&&(e.39=o.e,f=G(e,l,Q(e),a,h),e.39=d,o.1z=f.42,e.1v.37=v,o=o.3H=s.2S(e,f.4T,o,u)),o}});19 7I=17(e){1a((1===e||0===e)&&15.1z.1K===15.1z.2l&&"7G"!==15.1z.1z){19 t,n,r,i,s=15.t.1v,o=u.3P.2S;1a("3Y"===15.e)s.37="",i=!0;1m 1b(t=15.e.1s(","),r=t.1c;--r>-1;)n=t[r],u[n]&&(u[n].2S===o?i=!0:n="4Q"===n?5m:u[n].p),53(s,n);i&&(53(s,bt),15.t.4b&&3L 15.t.4b)}};1b(1L("9d",{2b:17(e,t,r,i,s){18 s=1g 24(e,r,0,0,s,2),s.1X=7I,s.e=t,s.2s=-10,s.1z=i.2V,n=!0,s}}),a="9m,9v,9u,9w".1s(","),2m=a.1c;2m--;)7H(a[2m]);a=o.1x,a.1r=1d,a.6M=17(e,t,u){1a(!e.3o)18!1;15.7t=e,15.2V=u,15.7E=t,f=t.7N,n=!1,r=t.6z||o.6z,i=V(e,""),s=15.2E;19 a,h,d,v,m,g,y,b,w,S=e.1v;1a(l&&""===S.3F&&(a=$(e,"3F",i),("2n"===a||""===a)&&(S.3F=0)),"1H"==1j t&&(v=S.37,a=Q(e,i),S.37=v+";"+t,a=G(e,a,Q(e)).4T,!q&&E.2P(t)&&(a.1Y=1q(4k.$1)),t=a,S.37=v),15.1r=h=15.2S(e,t,1d),15.3S){1b(w=3===15.3S,bt?c&&(l=!0,""===S.3F&&(y=$(e,"3F",i),("2n"===y||""===y)&&(S.3F=0)),p&&(S.7y=15.7E.7y||(w?"9p":"5z"))):S.7z=1,d=h;d&&d.1f;)d=d.1f;b=1g 24(e,"3P",0,0,1d,2),15.5w(b,1d,d),b.1X=w&&3j?7D:bt?7B:7O,b.1z=15.3p||44(e,i,!0),s.4G()}1a(n){1b(;h;){1b(g=h.1f,d=v;d&&d.2s>h.2s;)d=d.1f;(h.1l=d?d.1l:m)?h.1l.1f=h:v=h,(h.1f=d)?d.1l=h:m=h,h=g}15.1r=v}18!0},a.2S=17(e,t,n,s){19 o,a,l,c,h,p,d,v,m,g,y=e.1v;1b(o 1w t)p=t[o],a=u[o],a?n=a.2S(e,p,o,15,n,s,t):(h=$(e,o,i)+"",m="1H"==1j p,"4g"===o||"8Y"===o||"aj"===o||-1!==o.1k("ai")||m&&x.2P(p)?(m||(p=5d(p),p=(p.1c>3?"6N(":"5e(")+p.1G(",")+")"),n=4f(y,o,h,p,!0,"4a",n,0,s)):!m||-1===p.1k(" ")&&-1===p.1k(",")?(l=1q(h),d=l||0===l?h.1t((l+"").1c):"",(""===h||"2n"===h)&&("3M"===o||"3B"===o?(l=3D(e,o,i),d="2d"):"4u"===o||"3k"===o?(l=K(e,o,i),d="2d"):(l="1Y"!==o?0:1,d="")),g=m&&"="===p.1u(1),g?(c=3q(p.1u(0)+"1",10),p=p.1t(2),c*=1q(p),v=p.1D(b,"")):(c=1q(p),v=m?p.1t((c+"").1c)||"":""),""===v&&(v=r[o]||d),p=c||0===c?(g?c+l:c)+v:t[o],d!==v&&""!==v&&(c||0===c)&&(l||0===l)&&(l=J(e,o,l,d),"%"===v?(l/=J(e,o,23,"%")/23,l>23&&(l=23),t.85!==!0&&(h=l+"%")):"4d"===v?l/=J(e,o,1,"4d"):(c=J(e,o,c,v),v="2d"),g&&(c||0===c)&&(p=c+l+v)),g&&(c+=l),!l&&0!==l||!c&&0!==c?2u 0!==y[o]&&(p||"ad"!=p+""&&1d!=p)?(n=1g 24(y,o,c||l||0,0,n,-1,o,!1,0,h,p),n.1W="3r"!==p||"6s"!==o&&-1===o.1k("ae")?p:h):U("ao "+o+" 6v az: "+t[o]):(n=1g 24(y,o,l,c-l,n,0,o,f!==!1&&("2d"===v||"3F"===o),0,h,p),n.1W=v)):n=4f(y,o,h,p,!0,1d,n,0,s)),s&&n&&!n.2A&&(n.2A=s);18 n},a.1X=17(e){19 t,n,r,i=15.1r,s=1e-6;1a(1!==e||15.2V.1n!==15.2V.1N&&0!==15.2V.1n)1a(e||15.2V.1n!==15.2V.1N&&0!==15.2V.1n||15.2V.1O===-1e-6)1b(;i;){1a(t=i.c*e+i.s,i.r?t=t>0?0|t+.5:0|t-.5:s>t&&t>-s&&(t=0),i.2r)1a(1===i.2r)1a(r=i.l,2===r)i.t[i.p]=i.1W+t+i.3V+i.3O+i.5b;1m 1a(3===r)i.t[i.p]=i.1W+t+i.3V+i.3O+i.5b+i.6L+i.6H;1m 1a(4===r)i.t[i.p]=i.1W+t+i.3V+i.3O+i.5b+i.6L+i.6H+i.79+i.7u;1m 1a(5===r)i.t[i.p]=i.1W+t+i.3V+i.3O+i.5b+i.6L+i.6H+i.79+i.7u+i.9B+i.9F;1m{1b(n=i.1W+t+i.3V,r=1;i.l>r;r++)n+=i["3g"+r]+i["2X"+(r+1)];i.t[i.p]=n}1m-1===i.2r?i.t[i.p]=i.1W:i.1X&&i.1X(e);1m i.t[i.p]=t+i.1W;i=i.1f}1m 1b(;i;)2!==i.2r?i.t[i.p]=i.b:i.1X(e),i=i.1f;1m 1b(;i;)2!==i.2r?i.t[i.p]=i.e:i.1X(e),i=i.1f},a.9H=17(e){15.3S=e||3===15.3S?3:2,15.3p=15.3p||44(15.7t,i,!0)},a.5w=17(e,t,n,r){18 e&&(t&&(t.1l=e),e.1f&&(e.1f.1l=e.1l),e.1l?e.1l.1f=e.1f:15.1r===e&&(15.1r=e.1f,r=!0),n?n.1f=e:r||1d!==15.1r||(15.1r=e),e.1f=t,e.1l=n),e},a.2p=17(t){19 n,r,i,s=t;1a(t.5n||t.3E){s={};1b(r 1w t)s[r]=t[r];s.1Y=1,s.5n&&(s.6E=1)}18 t.39&&(n=15.6F)&&(i=n.3H,i&&i.1l?15.5w(i.1l,n.1f,i.1l.1l):i===15.1r&&(15.1r=n.1f),n.1f&&15.5w(n.1f,n.1f.1f,i.1l),15.6F=1d),e.1x.2p.1Z(15,s)};19 4n=17(e,t,n){19 r,i,s,o;1a(e.6G)1b(i=e.1c;--i>-1;)4n(e[i],t,n);1m 1b(r=e.7j,i=r.1c;--i>-1;)s=r[i],o=s.2r,s.1v&&(t.28(Q(s)),n&&n.28(s)),1!==o&&9!==o&&11!==o||!s.7j.1c||4n(s,t,n)};18 o.9X=17(e,n,r){19 i,s,o,u=t.3v(e,n,r),a=[u],f=[],l=[],c=[],h=t.4p.7i;1b(e=u.2z||u.2v,4n(e,f,c),u.1B(n,!0),4n(e,l),u.1B(0,!0),u.1M(!0),i=c.1c;--i>-1;)1a(s=G(c[i],f[i],l[i]),s.42){s=s.4T;1b(o 1w r)h[o]&&(s[o]=r[o]);a.28(t.3v(c[i],n,s))}18 a},e.6P([o]),o},!0)}),1T.3R&&1T.3b.4G()()',62,813,'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||this||function|return|var|if|for|length|null||_next|new|Math|_startTime|typeof|indexOf|_prev|else|_time|vars|_timeline|parseFloat|_firstPT|split|substr|charAt|style|in|prototype|_timeScale|data|_paused|render|Number|replace|255|rotation|join|string|_gc|0px|_totalTime|mt|_enabled|_duration|_rawPrevTime|add|rotationX|_p1|skewX|window|timeline|immediateRender|xs0|setRatio|opacity|call||rotationY|arguments|100|ht||totalDuration|_first|push|_startAt|instanceof|parser|_active|px||scaleX|scaleY|sin|filter|easing|_p2|_totalDuration|dt|auto|_dirty|_kill|_|type|pr|number|void|target|_initted|getRatio|defaultValue|_targets|plugin|rt|duration|cos|_overwriteProps|smoothChildTiming|_reversed|_ease|5625|_delay|match|_labels|constructor|scaleZ|128|test|zOrigin|currentStyle|parse|prefix|format|_tween|splice|xs|_siblings|totalTime|skewY|180|_onUpdate|perspective|paused|_uncache|apply|cssText|startAt|className|wake|_gsQueue|_p3|_parseTimeOrLabel|tt|_overwrittenProps|xn|_last|ratio|St|top|sqrt|_calcEnd|pow|nodeType|_transform|parseInt|none|nt|config|time|to|selector|tweens|rawTime|it|_propLookup|height|_remove|et|alpha|zIndex|st|xfirst|appendXtra|API|Array|delete|width|gi|xn1|transform|ease|_gsDefine|_transformType|object|concat|xs1|getTweensOf|border|all|version|_listeners|frame|firstMPT|reversed|xt||parseComplex|multi|scale|dflt|transparent|_gsTransform|kill|em|seek|pt|color|set|onComplete|onReverseComplete|RegExp|PI|getPropertyValue|Mt|_initProps|_internals|position|offsetHeight|css|self|left|sc|atan2|bottom|delay|plugins|greensock|onStart|runBackwards|_pauseTime|force3D|com|pop|offsetWidth|_notifyPluginsOfEnabled|_sortChildren|_gsClassPT|overwrite|pg|_propName|isActive|autoRemoveChildren|transformOrigin|formatter|solid|difs|_onPluginEvent|keyword|ot|sleep|9999999999|_onInitAllProps||remove|Ticker|Lt|1e5||abs|ox|ieOffsetY|round|gsClass|xs2|TweenLite|ut|rgb|rxp|getChildren|toUpperCase|invalidate|192|core|ieOffsetX|Et|autoAlpha|_swapSelfInParams|easeParams|onUpdate|easeInOut|easeIn|next|strict|use|_linkCSSP|prev|tick|hidden|autoCSS|_func|_params|onStartParams|module|check|vt|priority|staggerTo|DXImageTransform|oy|Microsoft|Matrix|timeScale|false|_easeType|useFrames|easeOut|_overwrite|_priority|_hasPausedChild|define|throw|isNaN|Left|SlowMo||onCompleteParams|onCompleteScope|onStartScope|ms|console|fromTo|onUpdateParams|from|document|createElement|onUpdateScope|pause|625|984375|fps|_power|GreenSockGlobals|9375|_type|delayedCall|Scope|hsl|defaultEase|Params|setTimeout|_onDisable|360|display|shortRotation|rotationZ|tween|margin|padding|_ffFix|suffixMap|lt|shortRotationX|shortRotationY|inset|visibility|_classNamePT|slice|xs3|ft|_short|yt|xn2|_onInitTween|rgba|000|activate|removeAttribute|toLowerCase|cssFloat|inherit|log|999|styleFloat|borderLeft|_rootFramesTimeline|defaultView|borderTopWidth|_roundProps|Animation|kt|url||func|div|init|xn3|propName|onReverseCompleteParams|_init|center|right|_easePower|get|_gsTweenID|reservedProps|childNodes|Width|shiftChildren|appendChild|SimpleTimeline|onReverseCompleteScope|break|filters|Top|Right|_target|xs4|Ease|play|gap|WebkitBackfaceVisibility|zoom|_contains|Ct|marginLeft|Nt|_vars|Back|isFromStart|gt|Ot|template|strength|random|At|autoRound|Tt|removeLabel|TweenPlugin|rect|SteppedEase|isArray|isSelector|_p|_class|register|RoughEase|map|addLabel|marginRight|marginBottom|marginTop|insert|strictUnits|_updateRoot|Cannot|removeProperty|_onEnable|not|matrix|autoRotate|1e3|useRAF|startTime|defaultTransformPerspective|ticker|defaultOverwrite|Plugin|black|Date|events|directionalRotation|up|2e3|EventDispatcher|_eventTarget|transformPerspective|proxy|Linear|05|Quad|progid|absolute|M11|exports|wt|dispatchEvent|clrs|Dx|GreenSockAMDPath|Dy|oyp|01|autoSleep|oxp|M22|addEventListener|M21|M12|red|parseTransform|insertMultiple|cancelAnimationFrame|appendMultiple|CancelRequestAnimationFrame|stop|moz|getLabelTime|fill|RequestAnimationFrame||webkit|getTime|CancelAnimationFrame|addPause|now|easeNone|globals|oader||Cubic|clear|Quart|clearProps|radient|undefined|999999999999|Object|toString|amd|atrix|Quint|bezier|removeEventListener|swing|visible|gotoAndStop|gotoAndPlay|linear|004|physicsProps|throwProps|physics2D|Strong|Power|requestAnimationFrame|sequence|xn4|jQuery|_autoCSS|float|xs5|getElementById|_enableTransforms|jquery|killTweensOf|_addTween|illegal|_super|progress|killDelayedCallsTo|totalProgress|_tempKill|_plugins|preexisting|allOnStart|concurrent|true|_rootTimeline|cascadeTo|120|repeatDelay|repeat|_dummyGS|_tweenLookup|onRepeat|onRepeatParams|yoyo|onRepeatScope|definition|on|staggerFromTo|clearTimeout|exportRoot|staggerFrom|NaN|Style|1500|normal|start|Color|stroke|or|is|into|the|invalid|stagger|global|restart|reverse||initAll|overwriteProps|eventCallback|GSAP|encountered|value|align|resume|TimelineLite|missing|dependency|append|clipTop|offset|Origin|borderTop|Bottom|removeChild|body|line|borderLeftWidth|parentNode|oxr|oyr|aqua|lime|silver|maroon|borderBottomLeftRadius|ccw|rad|short|_cw|clientHeight|clientWidth|Android|backgroundPosition|Safari|Chrome|userAgent|navigator|background|img|_specialProps|Version|Firefox|Moz|Ms|Webkit|getComputedStyle|getElementsByTagName|1px|MSIE|exec|innerHTML|teal|blue|Error|js|file|loaded||_cssRegister|_registerComplexSpecialProp|end|CSSPropTween|collapsible|block|registerSpecialProp|expand|translate3d|gradient|Alpha|sizingMethod|matrix3d|179|shortRotationZ|270|_parseToProxy|_setPluginRatio|orange|165|gray|purple|yellow|olive|navy|white|fuchsia|green|borderBottomRightRadius|borderRadius|boxShadow|hsla|borderTopLeftRadius|cyan|pink|borderTopRightRadius|203|backgroundPositionX|getStyle|70158|ExpoIn|clip|ExpoOut|paddingBottom|Expo|001|ExpoInOut|SineOut|clipRight|sort|525|backfaceVisibility|Sine|paddingRight|Bounce|CircInOut|BounceInOut|CircIn|paddingTop|Circ|CircOut||BounceIn|asin|ElasticInOut|userSelect|ElasticIn|ElasticOut|BounceOut|Elastic|out|clipBottom|CSSPlugin|paddingLeft|src|999999999|backgroundSize|SineIn|perspectiveOrigin|borderTopStyle|setAttribute|zA|Z0|fontSize|backgroundPositionY|borderTopColor|backgroundImage|taper|BackInOut|EaseLookup|usesFrames|clamp|transformStyle|SineInOut|find|randomize|clipLeft|BackOut|points|textShadow|BackIn'.split('|'),0,{}))
;
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
;
/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */

jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;i[n]||(i[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,a,i,o){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(o),i},set:function(e){r(o),i=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=i}var i={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){i={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,i,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(o?a in o:e.isFunction(e.fn[a])))?e(t)[a](i):("type"===a&&i!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,i=e.prop(t,r);return i===!0||"boolean"!=typeof i&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,i))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var i;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(i=y.exec(e.trim(t)))&&i[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),i[3]&&r("$(html) HTML text after last tag is ignored"),"#"===i[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(i[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,i,o=this[0];return!o||"events"!==t||1!==arguments.length||(a=e.data(o,t),i=e._data(o,t),a!==n&&a!==i||i===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),i)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,i,o){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),i)for(c=function(e){return!e.type||j.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):i.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(i.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,M=e.fn.die,S="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",C=RegExp("\\b(?:"+S+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,i){e!==document&&C.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,i)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,i=t.guid||e.guid++,o=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=i;a.length>o;)a[o++].guid=i;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),M?M.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||C.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(S.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);
/**
 * BxSlider v4.1 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2012, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 */

(function(e){var t={},n={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){}};e.fn.bxSlider=function(s){if(0==this.length)return this;if(this.length>1)return this.each(function(){e(this).bxSlider(s)}),this;var o={},r=this;t.el=this;var a=e(window).width(),l=e(window).height(),d=function(){o.settings=e.extend({},n,s),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var e=document.createElement("div"),t=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in t)if(void 0!==e.style[t[i]])return o.cssPrefix=t[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),c()},c=function(){if(r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=e('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?215*o.children.length+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),v(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:u()}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.width(p()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:50,display:"block"})),o.controls.el=e('<div class="bx-controls" />'),o.settings.captions&&E(),o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var t="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,t).clone().addClass("bx-clone"),n=o.children.slice(-t).clone().addClass("bx-clone");r.append(i).prepend(n)}o.active.last=o.settings.startSlide==f()-1,o.settings.video&&r.fitVids();var s=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(s=r.children()),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&w(),o.settings.controls&&T(),o.settings.auto&&o.settings.autoControls&&C(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),s.imagesLoaded(g)},g=function(){o.loader.remove(),m(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(h()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,e(window).bind("resize",Y),o.settings.auto&&o.settings.autoStart&&L(),o.settings.ticker&&W(),o.settings.pager&&M(o.settings.startSlide),o.settings.controls&&D(),o.settings.touchEnabled&&!o.settings.ticker&&O()},h=function(){var t=0,n=e();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var s=1==o.settings.moveSlides?o.active.index:o.active.index*x();for(n=o.children.eq(s),i=1;o.settings.maxSlides-1>=i;i++)n=s+i>=o.children.length?n.add(o.children.eq(i-1)):n.add(o.children.eq(s+i))}else n=o.children.eq(o.active.index);else n=o.children;return"vertical"==o.settings.mode?(n.each(function(){t+=e(this).outerHeight()}),o.settings.slideMargin>0&&(t+=o.settings.slideMargin*(o.settings.minSlides-1))):t=Math.max.apply(Math,n.map(function(){return e(this).outerHeight(!1)}).get()),t},u=function(){var e="100%";return o.settings.slideWidth>0&&(e="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),e},p=function(){var e=o.settings.slideWidth,t=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>t&&!o.carousel||"vertical"==o.settings.mode?e=t:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(t>o.maxThreshold||o.minThreshold>t&&(e=(t-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),e},v=function(){var e=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)e=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)e=o.settings.maxSlides;else{var t=o.children.first().width();e=Math.floor(o.viewport.width()/t)}else"vertical"==o.settings.mode&&(e=o.settings.minSlides);return e},f=function(){var e=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)e=o.children.length/x();else for(var t=0,i=0;o.children.length>t;)++e,t=i+v(),i+=o.settings.moveSlides<=v()?o.settings.moveSlides:v();else e=Math.ceil(o.children.length/v());return e},x=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=v()?o.settings.moveSlides:v()},m=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var e=o.children.last(),t=e.position();S(-(t.left-(o.viewport.width()-e.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,t=o.children.eq(i).position();S(-t.top,"reset",0)}}else{var t=o.children.eq(o.active.index*x()).position();o.active.index==f()-1&&(o.active.last=!0),void 0!=t&&("horizontal"==o.settings.mode?S(-t.left,"reset",0):"vertical"==o.settings.mode&&S(-t.top,"reset",0))}},S=function(e,t,i,n){if(o.usingCSS){var s="vertical"==o.settings.mode?"translate3d(0, "+e+"px, 0)":"translate3d("+e+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==t?(r.css(o.animProp,s),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),I()})):"reset"==t?r.css(o.animProp,s):"ticker"==t&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,s),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),S(n.resetValue,"reset",0),H()}))}else{var a={};a[o.animProp]=e,"slide"==t?r.animate(a,i,o.settings.easing,function(){I()}):"reset"==t?r.css(o.animProp,e):"ticker"==t&&r.animate(a,speed,"linear",function(){S(n.resetValue,"reset",0),H()})}},b=function(){for(var t="",i=f(),n=0;i>n;n++){var s="";o.settings.buildPager&&e.isFunction(o.settings.buildPager)?(s=o.settings.buildPager(n),o.pagerEl.addClass("bx-custom-pager")):(s=n+1,o.pagerEl.addClass("bx-default-pager")),t+='<div class="bx-pager-item"><a href="" data-slide-index="'+n+'" class="bx-pager-link">'+s+"</a></div>"}o.pagerEl.html(t)},w=function(){o.settings.pagerCustom?o.pagerEl=e(o.settings.pagerCustom):(o.pagerEl=e('<div class="bx-pager" />'),o.settings.pagerSelector?e(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),b()),o.pagerEl.delegate("a","click",z)},T=function(){o.controls.next=e('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=e('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",A),o.controls.prev.bind("click",P),o.settings.nextSelector&&e(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&e(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=e('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},C=function(){o.controls.start=e('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=e('<div class="bx-controls-auto" />'),o.controls.autoEl.delegate(".bx-start","click",k),o.controls.autoEl.delegate(".bx-stop","click",y),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?e(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),q(o.settings.autoStart?"stop":"start")},E=function(){o.children.each(function(){var t=e(this).find("img:first").attr("title");void 0!=t&&e(this).append('<div class="bx-caption"><span>'+t+"</span></div>")})},A=function(e){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),e.preventDefault()},P=function(e){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),e.preventDefault()},k=function(e){r.startAuto(),e.preventDefault()},y=function(e){r.stopAuto(),e.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto();var i=e(t.currentTarget),n=parseInt(i.attr("data-slide-index"));n!=o.active.index&&r.goToSlide(n),t.preventDefault()},M=function(t){return"short"==o.settings.pagerType?(o.pagerEl.html(t+1+o.settings.pagerShortSeparator+o.children.length),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,n){e(n).find("a").eq(t).addClass("active")}),void 0)},I=function(){if(o.settings.infiniteLoop){var e="";0==o.active.index?e=o.children.eq(0).position():o.active.index==f()-1&&o.carousel?e=o.children.eq((f()-1)*x()).position():o.active.index==o.children.length-1&&(e=o.children.eq(o.children.length-1).position()),"horizontal"==o.settings.mode?S(-e.left,"reset",0):"vertical"==o.settings.mode&&S(-e.top,"reset",0)}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},q=function(e){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[e]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+e+")").addClass("active"))},D=function(){1==f()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==f()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},L=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},W=function(){var t=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();t="horizontal"==o.settings.mode?-i.left:-i.top}S(t,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var t=0;o.children.each(function(){t+="horizontal"==o.settings.mode?e(this).outerWidth(!0):e(this).outerHeight(!0)});var i=o.settings.speed/t,n="horizontal"==o.settings.mode?"left":"top",s=i*(t-Math.abs(parseInt(r.css(n))));H(s)}),H()},H=function(e){speed=e?e:o.settings.speed;var t={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?t=r.find(".bx-clone").first().position():i=o.children.first().position();var n="horizontal"==o.settings.mode?-t.left:-t.top,s="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:s};S(n,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",N)},N=function(e){if(o.working)e.preventDefault();else{o.touch.originalPos=r.position();var t=e.originalEvent;o.touch.start.x=t.changedTouches[0].pageX,o.touch.start.y=t.changedTouches[0].pageY,o.viewport.bind("touchmove",B),o.viewport.bind("touchend",X)}},B=function(e){var t=e.originalEvent,i=Math.abs(t.changedTouches[0].pageX-o.touch.start.x),n=Math.abs(t.changedTouches[0].pageY-o.touch.start.y);if(3*i>n&&o.settings.preventDefaultSwipeX?e.preventDefault():3*n>i&&o.settings.preventDefaultSwipeY&&e.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var s=0;if("horizontal"==o.settings.mode){var r=t.changedTouches[0].pageX-o.touch.start.x;s=o.touch.originalPos.left+r}else{var r=t.changedTouches[0].pageY-o.touch.start.y;s=o.touch.originalPos.top+r}S(s,"reset",0)}},X=function(e){o.viewport.unbind("touchmove",B);var t=e.originalEvent,i=0;if(o.touch.end.x=t.changedTouches[0].pageX,o.touch.end.y=t.changedTouches[0].pageY,"fade"==o.settings.mode){var n=Math.abs(o.touch.start.x-o.touch.end.x);n>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var n=0;"horizontal"==o.settings.mode?(n=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(n=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&n>0||o.active.last&&0>n)?S(i,"reset",200):Math.abs(n)>=o.settings.swipeThreshold?(0>n?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):S(i,"reset",200)}o.viewport.unbind("touchend",X)},Y=function(){var t=e(window).width(),i=e(window).height();(a!=t||l!=i)&&(a=t,l=i,r.redrawSlider())};return r.goToSlide=function(t,i){if(!o.working&&o.active.index!=t)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>t?f()-1:t>=f()?0:t,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=f()-1,o.settings.pager&&M(o.active.index),o.settings.controls&&D(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=h()&&o.viewport.animate({height:h()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",51).fadeIn(o.settings.speed,function(){e(this).css("zIndex",50),I()});else{o.settings.adaptiveHeight&&o.viewport.height()!=h()&&o.viewport.animate({height:h()},o.settings.adaptiveHeightSpeed);var n=0,s={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);s=a.position(),n=o.viewport.width()-a.width()}else{var l=o.children.length-o.settings.minSlides;s=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-x():(f()-1)*x()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);s=a.position()}else if("next"==i&&0==o.active.index)s=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(t>=0){var c=t*x();s=o.children.eq(c).position()}if(s!==void 0){var g="horizontal"==o.settings.mode?-(s.left-n):-s.top;S(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var e=parseInt(o.active.index)+1;r.goToSlide(e,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var e=parseInt(o.active.index)-1;r.goToSlide(e,"prev")}},r.startAuto=function(e){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=e&&q("stop"))},r.stopAuto=function(e){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=e&&q("start"))},r.getCurrentSlide=function(){return o.active.index},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).width(p()),o.viewport.css("height",h()),o.settings.ticker||m(),o.active.last&&(o.active.index=f()-1),o.active.index>=f()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(b(),M(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,e(".bx-clone",this).remove(),o.children.removeAttr("style"),this.removeAttr("style").unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.pagerEl.remove(),e(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),e(window).unbind("resize",Y))},r.reloadSlider=function(e){void 0!=e&&(s=e),r.destroySlider(),d()},d(),this}})(jQuery),function(e,t){var i="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";e.fn.imagesLoaded=function(n){function s(){var t=e(g),i=e(h);a&&(h.length?a.reject(d,t,i):a.resolve(d)),e.isFunction(n)&&n.call(r,d,t,i)}function o(t,n){t.src===i||-1!==e.inArray(t,c)||(c.push(t),n?h.push(t):g.push(t),e.data(t,"imagesLoaded",{isBroken:n,src:t.src}),l&&a.notifyWith(e(t),[n,d,e(g),e(h)]),d.length===c.length&&(setTimeout(s),d.unbind(".imagesLoaded")))}var r=this,a=e.isFunction(e.Deferred)?e.Deferred():0,l=e.isFunction(a.notify),d=r.find("img").add(r.filter("img")),c=[],g=[],h=[];return e.isPlainObject(n)&&e.each(n,function(e,t){"callback"===e?n=t:a&&a[e](t)}),d.length?d.bind("load.imagesLoaded error.imagesLoaded",function(e){o(e.target,"error"===e.type)}).each(function(n,s){var r=s.src,a=e.data(s,"imagesLoaded");a&&a.src===r?o(s,a.isBroken):s.complete&&s.naturalWidth!==t?o(s,0===s.naturalWidth||0===s.naturalHeight):(s.readyState||s.complete)&&(s.src=i,s.src=r)}):s(),a?a.promise(r):r}}(jQuery);
/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */



(function($){function sc_setScroll(a,b,c){return"transition"==c.transition&&"swing"==b&&(b="ease"),{anims:[],duration:a,orgDuration:a,easing:b,startTime:getTime()}}function sc_startScroll(a,b){for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e&&e[0][b.transition](e[1],a.duration,a.easing,e[2])}}function sc_stopScroll(a,b){is_boolean(b)||(b=!0),is_object(a.pre)&&sc_stopScroll(a.pre,b);for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e[0].stop(!0),b&&(e[0].css(e[1]),is_function(e[2])&&e[2]())}is_object(a.post)&&sc_stopScroll(a.post,b)}function sc_afterScroll(a,b,c){switch(b&&b.remove(),c.fx){case"fade":case"crossfade":case"cover-fade":case"uncover-fade":a.css("opacity",1),a.css("filter","")}}function sc_fireCallbacks(a,b,c,d,e){if(b[c]&&b[c].call(a,d),e[c].length)for(var f=0,g=e[c].length;g>f;f++)e[c][f].call(a,d);return[]}function sc_fireQueue(a,b,c){return b.length&&(a.trigger(cf_e(b[0][0],c),b[0][1]),b.shift()),b}function sc_hideHiddenItems(a){a.each(function(){var a=$(this);a.data("_cfs_isHidden",a.is(":hidden")).hide()})}function sc_showHiddenItems(a){a&&a.each(function(){var a=$(this);a.data("_cfs_isHidden")||a.show()})}function sc_clearTimers(a){return a.auto&&clearTimeout(a.auto),a.progress&&clearInterval(a.progress),a}function sc_mapCallbackArguments(a,b,c,d,e,f,g){return{width:g.width,height:g.height,items:{old:a,skipped:b,visible:c},scroll:{items:d,direction:e,duration:f}}}function sc_getDuration(a,b,c,d){var e=a.duration;return"none"==a.fx?0:("auto"==e?e=b.scroll.duration/b.scroll.items*c:10>e&&(e=d/e),1>e?0:("fade"==a.fx&&(e/=2),Math.round(e)))}function nv_showNavi(a,b,c){var d=is_number(a.items.minimum)?a.items.minimum:a.items.visible+1;if("show"==b||"hide"==b)var e=b;else if(d>b){debug(c,"Not enough items ("+b+" total, "+d+" needed): Hiding navigation.");var e="hide"}else var e="show";var f="show"==e?"removeClass":"addClass",g=cf_c("hidden",c);a.auto.button&&a.auto.button[e]()[f](g),a.prev.button&&a.prev.button[e]()[f](g),a.next.button&&a.next.button[e]()[f](g),a.pagination.container&&a.pagination.container[e]()[f](g)}function nv_enableNavi(a,b,c){if(!a.circular&&!a.infinite){var d="removeClass"==b||"addClass"==b?b:!1,e=cf_c("disabled",c);if(a.auto.button&&d&&a.auto.button[d](e),a.prev.button){var f=d||0==b?"addClass":"removeClass";a.prev.button[f](e)}if(a.next.button){var f=d||b==a.items.visible?"addClass":"removeClass";a.next.button[f](e)}}}function go_getObject(a,b){return is_function(b)?b=b.call(a):is_undefined(b)&&(b={}),b}function go_getItemsObject(a,b){return b=go_getObject(a,b),is_number(b)?b={visible:b}:"variable"==b?b={visible:b,width:b,height:b}:is_object(b)||(b={}),b}function go_getScrollObject(a,b){return b=go_getObject(a,b),is_number(b)?b=50>=b?{items:b}:{duration:b}:is_string(b)?b={easing:b}:is_object(b)||(b={}),b}function go_getNaviObject(a,b){if(b=go_getObject(a,b),is_string(b)){var c=cf_getKeyCode(b);b=-1==c?$(b):c}return b}function go_getAutoObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_boolean(b)?b={play:b}:is_number(b)&&(b={timeoutDuration:b}),b.progress&&(is_string(b.progress)||is_jquery(b.progress))&&(b.progress={bar:b.progress}),b}function go_complementAutoObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_boolean(b.play)||(b.play=!0),is_number(b.delay)||(b.delay=0),is_undefined(b.pauseOnEvent)&&(b.pauseOnEvent=!0),is_boolean(b.pauseOnResize)||(b.pauseOnResize=!0),is_number(b.timeoutDuration)||(b.timeoutDuration=10>b.duration?2500:5*b.duration),b.progress&&(is_function(b.progress.bar)&&(b.progress.bar=b.progress.bar.call(a)),is_string(b.progress.bar)&&(b.progress.bar=$(b.progress.bar)),b.progress.bar?(is_function(b.progress.updater)||(b.progress.updater=$.fn.carouFredSel.progressbarUpdater),is_number(b.progress.interval)||(b.progress.interval=50)):b.progress=!1),b}function go_getPrevNextObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_number(b)&&(b={key:b}),b}function go_complementPrevNextObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_string(b.key)&&(b.key=cf_getKeyCode(b.key)),b}function go_getPaginationObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={container:b}:is_boolean(b)&&(b={keys:b}),b}function go_complementPaginationObject(a,b){return is_function(b.container)&&(b.container=b.container.call(a)),is_string(b.container)&&(b.container=$(b.container)),is_number(b.items)||(b.items=!1),is_boolean(b.keys)||(b.keys=!1),is_function(b.anchorBuilder)||is_false(b.anchorBuilder)||(b.anchorBuilder=$.fn.carouFredSel.pageAnchorBuilder),is_number(b.deviation)||(b.deviation=0),b}function go_getSwipeObject(a,b){return is_function(b)&&(b=b.call(a)),is_undefined(b)&&(b={onTouch:!1}),is_true(b)?b={onTouch:b}:is_number(b)&&(b={items:b}),b}function go_complementSwipeObject(a,b){return is_boolean(b.onTouch)||(b.onTouch=!0),is_boolean(b.onMouse)||(b.onMouse=!1),is_object(b.options)||(b.options={}),is_boolean(b.options.triggerOnTouchEnd)||(b.options.triggerOnTouchEnd=!1),b}function go_getMousewheelObject(a,b){return is_function(b)&&(b=b.call(a)),is_true(b)?b={}:is_number(b)?b={items:b}:is_undefined(b)&&(b=!1),b}function go_complementMousewheelObject(a,b){return b}function gn_getItemIndex(a,b,c,d,e){if(is_string(a)&&(a=$(a,e)),is_object(a)&&(a=$(a,e)),is_jquery(a)?(a=e.children().index(a),is_boolean(c)||(c=!1)):is_boolean(c)||(c=!0),is_number(a)||(a=0),is_number(b)||(b=0),c&&(a+=d.first),a+=b,d.total>0){for(;a>=d.total;)a-=d.total;for(;0>a;)a+=d.total}return a}function gn_getVisibleItemsPrev(a,b,c){for(var d=0,e=0,f=c;f>=0;f--){var g=a.eq(f);if(d+=g.is(":visible")?g[b.d.outerWidth](!0):0,d>b.maxDimension)return e;0==f&&(f=a.length),e++}}function gn_getVisibleItemsPrevFilter(a,b,c){return gn_getItemsPrevFilter(a,b.items.filter,b.items.visibleConf.org,c)}function gn_getScrollItemsPrevFilter(a,b,c,d){return gn_getItemsPrevFilter(a,b.items.filter,d,c)}function gn_getItemsPrevFilter(a,b,c,d){for(var e=0,f=0,g=d,h=a.length;g>=0;g--){if(f++,f==h)return f;var i=a.eq(g);if(i.is(b)&&(e++,e==c))return f;0==g&&(g=h)}}function gn_getVisibleOrg(a,b){return b.items.visibleConf.org||a.children().slice(0,b.items.visible).filter(b.items.filter).length}function gn_getVisibleItemsNext(a,b,c){for(var d=0,e=0,f=c,g=a.length-1;g>=f;f++){var h=a.eq(f);if(d+=h.is(":visible")?h[b.d.outerWidth](!0):0,d>b.maxDimension)return e;if(e++,e==g+1)return e;f==g&&(f=-1)}}function gn_getVisibleItemsNextTestCircular(a,b,c,d){var e=gn_getVisibleItemsNext(a,b,c);return b.circular||c+e>d&&(e=d-c),e}function gn_getVisibleItemsNextFilter(a,b,c){return gn_getItemsNextFilter(a,b.items.filter,b.items.visibleConf.org,c,b.circular)}function gn_getScrollItemsNextFilter(a,b,c,d){return gn_getItemsNextFilter(a,b.items.filter,d+1,c,b.circular)-1}function gn_getItemsNextFilter(a,b,c,d){for(var f=0,g=0,h=d,i=a.length-1;i>=h;h++){if(g++,g>=i)return g;var j=a.eq(h);if(j.is(b)&&(f++,f==c))return g;h==i&&(h=-1)}}function gi_getCurrentItems(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsPrev(a,b,c){return a.slice(c,b.items.visibleConf.old+c)}function gi_getNewItemsPrev(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsNext(a,b){return a.slice(0,b.items.visibleConf.old)}function gi_getNewItemsNext(a,b,c){return a.slice(c,b.items.visible+c)}function sz_storeMargin(a,b,c){b.usePadding&&(is_string(c)||(c="_cfs_origCssMargin"),a.each(function(){var a=$(this),d=parseInt(a.css(b.d.marginRight),10);is_number(d)||(d=0),a.data(c,d)}))}function sz_resetMargin(a,b,c){if(b.usePadding){var d=is_boolean(c)?c:!1;is_number(c)||(c=0),sz_storeMargin(a,b,"_cfs_tempCssMargin"),a.each(function(){var a=$(this);a.css(b.d.marginRight,d?a.data("_cfs_tempCssMargin"):c+a.data("_cfs_origCssMargin"))})}}function sz_storeOrigCss(a){a.each(function(){var a=$(this);a.data("_cfs_origCss",a.attr("style")||"")})}function sz_restoreOrigCss(a){a.each(function(){var a=$(this);a.attr("style",a.data("_cfs_origCss")||"")})}function sz_setResponsiveSizes(a,b){var d=(a.items.visible,a.items[a.d.width]),e=a[a.d.height],f=is_percentage(e);b.each(function(){var b=$(this),c=d-ms_getPaddingBorderMargin(b,a,"Width");b[a.d.width](c),f&&b[a.d.height](ms_getPercentage(c,e))})}function sz_setSizes(a,b){var c=a.parent(),d=a.children(),e=gi_getCurrentItems(d,b),f=cf_mapWrapperSizes(ms_getSizes(e,b,!0),b,!1);if(c.css(f),b.usePadding){var g=b.padding,h=g[b.d[1]];b.align&&0>h&&(h=0);var i=e.last();i.css(b.d.marginRight,i.data("_cfs_origCssMargin")+h),a.css(b.d.top,g[b.d[0]]),a.css(b.d.left,g[b.d[3]])}return a.css(b.d.width,f[b.d.width]+2*ms_getTotalSize(d,b,"width")),a.css(b.d.height,ms_getLargestSize(d,b,"height")),f}function ms_getSizes(a,b,c){return[ms_getTotalSize(a,b,"width",c),ms_getLargestSize(a,b,"height",c)]}function ms_getLargestSize(a,b,c,d){return is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d?b[b.d[c]]:is_number(b.items[b.d[c]])?b.items[b.d[c]]:(c=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",ms_getTrueLargestSize(a,b,c))}function ms_getTrueLargestSize(a,b,c){for(var d=0,e=0,f=a.length;f>e;e++){var g=a.eq(e),h=g.is(":visible")?g[b.d[c]](!0):0;h>d&&(d=h)}return d}function ms_getTotalSize(a,b,c,d){if(is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d)return b[b.d[c]];if(is_number(b.items[b.d[c]]))return b.items[b.d[c]]*a.length;for(var e=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",f=0,g=0,h=a.length;h>g;g++){var i=a.eq(g);f+=i.is(":visible")?i[b.d[e]](!0):0}return f}function ms_getParentSize(a,b,c){var d=a.is(":visible");d&&a.hide();var e=a.parent()[b.d[c]]();return d&&a.show(),e}function ms_getMaxDimension(a,b){return is_number(a[a.d.width])?a[a.d.width]:b}function ms_hasVariableSizes(a,b,c){for(var d=!1,e=!1,f=0,g=a.length;g>f;f++){var h=a.eq(f),i=h.is(":visible")?h[b.d[c]](!0):0;d===!1?d=i:d!=i&&(e=!0),0==d&&(e=!0)}return e}function ms_getPaddingBorderMargin(a,b,c){return a[b.d["outer"+c]](!0)-a[b.d[c.toLowerCase()]]()}function ms_getPercentage(a,b){if(is_percentage(b)){if(b=parseInt(b.slice(0,-1),10),!is_number(b))return a;a*=b/100}return a}function cf_e(a,b,c,d,e){return is_boolean(c)||(c=!0),is_boolean(d)||(d=!0),is_boolean(e)||(e=!1),c&&(a=b.events.prefix+a),d&&(a=a+"."+b.events.namespace),d&&e&&(a+=b.serialNumber),a}function cf_c(a,b){return is_string(b.classnames[a])?b.classnames[a]:a}function cf_mapWrapperSizes(a,b,c){is_boolean(c)||(c=!0);var d=b.usePadding&&c?b.padding:[0,0,0,0],e={};return e[b.d.width]=a[0]+d[1]+d[3],e[b.d.height]=a[1]+d[0]+d[2],e}function cf_sortParams(a,b){for(var c=[],d=0,e=a.length;e>d;d++)for(var f=0,g=b.length;g>f;f++)if(b[f].indexOf(typeof a[d])>-1&&is_undefined(c[f])){c[f]=a[d];break}return c}function cf_getPadding(a){if(is_undefined(a))return[0,0,0,0];if(is_number(a))return[a,a,a,a];if(is_string(a)&&(a=a.split("px").join("").split("em").join("").split(" ")),!is_array(a))return[0,0,0,0];for(var b=0;4>b;b++)a[b]=parseInt(a[b],10);switch(a.length){case 0:return[0,0,0,0];case 1:return[a[0],a[0],a[0],a[0]];case 2:return[a[0],a[1],a[0],a[1]];case 3:return[a[0],a[1],a[2],a[1]];default:return[a[0],a[1],a[2],a[3]]}}function cf_getAlignPadding(a,b){var c=is_number(b[b.d.width])?Math.ceil(b[b.d.width]-ms_getTotalSize(a,b,"width")):0;switch(b.align){case"left":return[0,c];case"right":return[c,0];case"center":default:return[Math.ceil(c/2),Math.floor(c/2)]}}function cf_getDimensions(a){for(var b=[["width","innerWidth","outerWidth","height","innerHeight","outerHeight","left","top","marginRight",0,1,2,3],["height","innerHeight","outerHeight","width","innerWidth","outerWidth","top","left","marginBottom",3,2,1,0]],c=b[0].length,d="right"==a.direction||"left"==a.direction?0:1,e={},f=0;c>f;f++)e[b[0][f]]=b[d][f];return e}function cf_getAdjust(a,b,c,d){var e=a;if(is_function(c))e=c.call(d,e);else if(is_string(c)){var f=c.split("+"),g=c.split("-");if(g.length>f.length)var h=!0,i=g[0],j=g[1];else var h=!1,i=f[0],j=f[1];switch(i){case"even":e=1==a%2?a-1:a;break;case"odd":e=0==a%2?a-1:a;break;default:e=a}j=parseInt(j,10),is_number(j)&&(h&&(j=-j),e+=j)}return(!is_number(e)||1>e)&&(e=1),e}function cf_getItemsAdjust(a,b,c,d){return cf_getItemAdjustMinMax(cf_getAdjust(a,b,c,d),b.items.visibleConf)}function cf_getItemAdjustMinMax(a,b){return is_number(b.min)&&b.min>a&&(a=b.min),is_number(b.max)&&a>b.max&&(a=b.max),1>a&&(a=1),a}function cf_getSynchArr(a){is_array(a)||(a=[[a]]),is_array(a[0])||(a=[a]);for(var b=0,c=a.length;c>b;b++)is_string(a[b][0])&&(a[b][0]=$(a[b][0])),is_boolean(a[b][1])||(a[b][1]=!0),is_boolean(a[b][2])||(a[b][2]=!0),is_number(a[b][3])||(a[b][3]=0);return a}function cf_getKeyCode(a){return"right"==a?39:"left"==a?37:"up"==a?38:"down"==a?40:-1}function cf_setCookie(a,b,c){if(a){var d=b.triggerHandler(cf_e("currentPosition",c));$.fn.carouFredSel.cookie.set(a,d)}}function cf_getCookie(a){var b=$.fn.carouFredSel.cookie.get(a);return""==b?0:b}function in_mapCss(a,b){for(var c={},d=0,e=b.length;e>d;d++)c[b[d]]=a.css(b[d]);return c}function in_complementItems(a,b,c,d){return is_object(a.visibleConf)||(a.visibleConf={}),is_object(a.sizesConf)||(a.sizesConf={}),0==a.start&&is_number(d)&&(a.start=d),is_object(a.visible)?(a.visibleConf.min=a.visible.min,a.visibleConf.max=a.visible.max,a.visible=!1):is_string(a.visible)?("variable"==a.visible?a.visibleConf.variable=!0:a.visibleConf.adjust=a.visible,a.visible=!1):is_function(a.visible)&&(a.visibleConf.adjust=a.visible,a.visible=!1),is_string(a.filter)||(a.filter=c.filter(":hidden").length>0?":visible":"*"),a[b.d.width]||(b.responsive?(debug(!0,"Set a "+b.d.width+" for the items!"),a[b.d.width]=ms_getTrueLargestSize(c,b,"outerWidth")):a[b.d.width]=ms_hasVariableSizes(c,b,"outerWidth")?"variable":c[b.d.outerWidth](!0)),a[b.d.height]||(a[b.d.height]=ms_hasVariableSizes(c,b,"outerHeight")?"variable":c[b.d.outerHeight](!0)),a.sizesConf.width=a.width,a.sizesConf.height=a.height,a}function in_complementVisibleItems(a,b){return"variable"==a.items[a.d.width]&&(a.items.visibleConf.variable=!0),a.items.visibleConf.variable||(is_number(a[a.d.width])?a.items.visible=Math.floor(a[a.d.width]/a.items[a.d.width]):(a.items.visible=Math.floor(b/a.items[a.d.width]),a[a.d.width]=a.items.visible*a.items[a.d.width],a.items.visibleConf.adjust||(a.align=!1)),("Infinity"==a.items.visible||1>a.items.visible)&&(debug(!0,'Not a valid number of visible items: Set to "variable".'),a.items.visibleConf.variable=!0)),a}function in_complementPrimarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerWidth")),a}function in_complementSecondarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerHeight")),a||(a=b.items[b.d.height]),a}function in_getAlignPadding(a,b){var c=cf_getAlignPadding(gi_getCurrentItems(b,a),a);return a.padding[a.d[1]]=c[1],a.padding[a.d[3]]=c[0],a}function in_getResponsiveValues(a,b){var d=cf_getItemAdjustMinMax(Math.ceil(a[a.d.width]/a.items[a.d.width]),a.items.visibleConf);d>b.length&&(d=b.length);var e=Math.floor(a[a.d.width]/d);return a.items.visible=d,a.items[a.d.width]=e,a[a.d.width]=d*e,a}function bt_pauseOnHoverConfig(a){if(is_string(a))var b=a.indexOf("immediate")>-1?!0:!1,c=a.indexOf("resume")>-1?!0:!1;else var b=c=!1;return[b,c]}function bt_mousesheelNumber(a){return is_number(a)?a:null}function is_null(a){return null===a}function is_undefined(a){return is_null(a)||a===void 0||""===a||"undefined"===a}function is_array(a){return a instanceof Array}function is_jquery(a){return a instanceof jQuery}function is_object(a){return(a instanceof Object||"object"==typeof a)&&!is_null(a)&&!is_jquery(a)&&!is_array(a)&&!is_function(a)}function is_number(a){return(a instanceof Number||"number"==typeof a)&&!isNaN(a)}function is_string(a){return(a instanceof String||"string"==typeof a)&&!is_undefined(a)&&!is_true(a)&&!is_false(a)}function is_function(a){return a instanceof Function||"function"==typeof a}function is_boolean(a){return a instanceof Boolean||"boolean"==typeof a||is_true(a)||is_false(a)}function is_true(a){return a===!0||"true"===a}function is_false(a){return a===!1||"false"===a}function is_percentage(a){return is_string(a)&&"%"==a.slice(-1)}function getTime(){return(new Date).getTime()}function deprecated(a,b){debug(!0,a+" is DEPRECATED, support for it will be removed. Use "+b+" instead.")}function debug(a,b){if(!is_undefined(window.console)&&!is_undefined(window.console.log)){if(is_object(a)){var c=" ("+a.selector+")";a=a.debug}else var c="";if(!a)return!1;b=is_string(b)?"carouFredSel"+c+": "+b:["carouFredSel"+c+":",b],window.console.log(b)}return!1}$.fn.carouFredSel||($.fn.caroufredsel=$.fn.carouFredSel=function(options,configs){if(0==this.length)return debug(!0,'No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){$(this).carouFredSel(options,configs)});var $cfs=this,$tt0=this[0],starting_position=!1;$cfs.data("_cfs_isCarousel")&&(starting_position=$cfs.triggerHandler("_cfs_triggerEvent","currentPosition"),$cfs.trigger("_cfs_triggerEvent",["destroy",!0]));var FN={};FN._init=function(a,b,c){a=go_getObject($tt0,a),a.items=go_getItemsObject($tt0,a.items),a.scroll=go_getScrollObject($tt0,a.scroll),a.auto=go_getAutoObject($tt0,a.auto),a.prev=go_getPrevNextObject($tt0,a.prev),a.next=go_getPrevNextObject($tt0,a.next),a.pagination=go_getPaginationObject($tt0,a.pagination),a.swipe=go_getSwipeObject($tt0,a.swipe),a.mousewheel=go_getMousewheelObject($tt0,a.mousewheel),b&&(opts_orig=$.extend(!0,{},$.fn.carouFredSel.defaults,a)),opts=$.extend(!0,{},$.fn.carouFredSel.defaults,a),opts.d=cf_getDimensions(opts),crsl.direction="up"==opts.direction||"left"==opts.direction?"next":"prev";var d=$cfs.children(),e=ms_getParentSize($wrp,opts,"width");if(is_true(opts.cookie)&&(opts.cookie="caroufredsel_cookie_"+conf.serialNumber),opts.maxDimension=ms_getMaxDimension(opts,e),opts.items=in_complementItems(opts.items,opts,d,c),opts[opts.d.width]=in_complementPrimarySize(opts[opts.d.width],opts,d),opts[opts.d.height]=in_complementSecondarySize(opts[opts.d.height],opts,d),opts.responsive&&(is_percentage(opts[opts.d.width])||(opts[opts.d.width]="100%")),is_percentage(opts[opts.d.width])&&(crsl.upDateOnWindowResize=!0,crsl.primarySizePercentage=opts[opts.d.width],opts[opts.d.width]=ms_getPercentage(e,crsl.primarySizePercentage),opts.items.visible||(opts.items.visibleConf.variable=!0)),opts.responsive?(opts.usePadding=!1,opts.padding=[0,0,0,0],opts.align=!1,opts.items.visibleConf.variable=!1):(opts.items.visible||(opts=in_complementVisibleItems(opts,e)),opts[opts.d.width]||(!opts.items.visibleConf.variable&&is_number(opts.items[opts.d.width])&&"*"==opts.items.filter?(opts[opts.d.width]=opts.items.visible*opts.items[opts.d.width],opts.align=!1):opts[opts.d.width]="variable"),is_undefined(opts.align)&&(opts.align=is_number(opts[opts.d.width])?"center":!1),opts.items.visibleConf.variable&&(opts.items.visible=gn_getVisibleItemsNext(d,opts,0))),"*"==opts.items.filter||opts.items.visibleConf.variable||(opts.items.visibleConf.org=opts.items.visible,opts.items.visible=gn_getVisibleItemsNextFilter(d,opts,0)),opts.items.visible=cf_getItemsAdjust(opts.items.visible,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts.responsive)opts.items.visibleConf.min||(opts.items.visibleConf.min=opts.items.visible),opts.items.visibleConf.max||(opts.items.visibleConf.max=opts.items.visible),opts=in_getResponsiveValues(opts,d,e);else switch(opts.padding=cf_getPadding(opts.padding),"top"==opts.align?opts.align="left":"bottom"==opts.align&&(opts.align="right"),opts.align){case"center":case"left":case"right":"variable"!=opts[opts.d.width]&&(opts=in_getAlignPadding(opts,d),opts.usePadding=!0);break;default:opts.align=!1,opts.usePadding=0==opts.padding[0]&&0==opts.padding[1]&&0==opts.padding[2]&&0==opts.padding[3]?!1:!0}is_number(opts.scroll.duration)||(opts.scroll.duration=500),is_undefined(opts.scroll.items)&&(opts.scroll.items=opts.responsive||opts.items.visibleConf.variable||"*"!=opts.items.filter?"visible":opts.items.visible),opts.auto=$.extend(!0,{},opts.scroll,opts.auto),opts.prev=$.extend(!0,{},opts.scroll,opts.prev),opts.next=$.extend(!0,{},opts.scroll,opts.next),opts.pagination=$.extend(!0,{},opts.scroll,opts.pagination),opts.auto=go_complementAutoObject($tt0,opts.auto),opts.prev=go_complementPrevNextObject($tt0,opts.prev),opts.next=go_complementPrevNextObject($tt0,opts.next),opts.pagination=go_complementPaginationObject($tt0,opts.pagination),opts.swipe=go_complementSwipeObject($tt0,opts.swipe),opts.mousewheel=go_complementMousewheelObject($tt0,opts.mousewheel),opts.synchronise&&(opts.synchronise=cf_getSynchArr(opts.synchronise)),opts.auto.onPauseStart&&(opts.auto.onTimeoutStart=opts.auto.onPauseStart,deprecated("auto.onPauseStart","auto.onTimeoutStart")),opts.auto.onPausePause&&(opts.auto.onTimeoutPause=opts.auto.onPausePause,deprecated("auto.onPausePause","auto.onTimeoutPause")),opts.auto.onPauseEnd&&(opts.auto.onTimeoutEnd=opts.auto.onPauseEnd,deprecated("auto.onPauseEnd","auto.onTimeoutEnd")),opts.auto.pauseDuration&&(opts.auto.timeoutDuration=opts.auto.pauseDuration,deprecated("auto.pauseDuration","auto.timeoutDuration"))},FN._build=function(){$cfs.data("_cfs_isCarousel",!0);var a=$cfs.children(),b=in_mapCss($cfs,["textAlign","float","position","top","right","bottom","left","zIndex","width","height","marginTop","marginRight","marginBottom","marginLeft"]),c="relative";switch(b.position){case"absolute":case"fixed":c=b.position}"parent"==conf.wrapper?sz_storeOrigCss($wrp):$wrp.css(b),$wrp.css({overflow:"hidden",position:c}),sz_storeOrigCss($cfs),$cfs.data("_cfs_origCssZindex",b.zIndex),$cfs.css({textAlign:"left","float":"none",position:"absolute",top:0,right:"auto",bottom:"auto",left:0,marginTop:0,marginRight:0,marginBottom:0,marginLeft:0}),sz_storeMargin(a,opts),sz_storeOrigCss(a),opts.responsive&&sz_setResponsiveSizes(opts,a)},FN._bind_events=function(){FN._unbind_events(),$cfs.bind(cf_e("stop",conf),function(a,b){return a.stopPropagation(),crsl.isStopped||opts.auto.button&&opts.auto.button.addClass(cf_c("stopped",conf)),crsl.isStopped=!0,opts.auto.play&&(opts.auto.play=!1,$cfs.trigger(cf_e("pause",conf),b)),!0}),$cfs.bind(cf_e("finish",conf),function(a){return a.stopPropagation(),crsl.isScrolling&&sc_stopScroll(scrl),!0}),$cfs.bind(cf_e("pause",conf),function(a,b,c){if(a.stopPropagation(),tmrs=sc_clearTimers(tmrs),b&&crsl.isScrolling){scrl.isStopped=!0;var d=getTime()-scrl.startTime;scrl.duration-=d,scrl.pre&&(scrl.pre.duration-=d),scrl.post&&(scrl.post.duration-=d),sc_stopScroll(scrl,!1)}if(crsl.isPaused||crsl.isScrolling||c&&(tmrs.timePassed+=getTime()-tmrs.startTime),crsl.isPaused||opts.auto.button&&opts.auto.button.addClass(cf_c("paused",conf)),crsl.isPaused=!0,opts.auto.onTimeoutPause){var e=opts.auto.timeoutDuration-tmrs.timePassed,f=100-Math.ceil(100*e/opts.auto.timeoutDuration);opts.auto.onTimeoutPause.call($tt0,f,e)}return!0}),$cfs.bind(cf_e("play",conf),function(a,b,c,d){a.stopPropagation(),tmrs=sc_clearTimers(tmrs);var e=[b,c,d],f=["string","number","boolean"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],"prev"!=b&&"next"!=b&&(b=crsl.direction),is_number(c)||(c=0),is_boolean(d)||(d=!1),d&&(crsl.isStopped=!1,opts.auto.play=!0),!opts.auto.play)return a.stopImmediatePropagation(),debug(conf,"Carousel stopped: Not scrolling.");crsl.isPaused&&opts.auto.button&&(opts.auto.button.removeClass(cf_c("stopped",conf)),opts.auto.button.removeClass(cf_c("paused",conf))),crsl.isPaused=!1,tmrs.startTime=getTime();var h=opts.auto.timeoutDuration+c;return dur2=h-tmrs.timePassed,perc=100-Math.ceil(100*dur2/h),opts.auto.progress&&(tmrs.progress=setInterval(function(){var a=getTime()-tmrs.startTime+tmrs.timePassed,b=Math.ceil(100*a/h);opts.auto.progress.updater.call(opts.auto.progress.bar[0],b)},opts.auto.progress.interval)),tmrs.auto=setTimeout(function(){opts.auto.progress&&opts.auto.progress.updater.call(opts.auto.progress.bar[0],100),opts.auto.onTimeoutEnd&&opts.auto.onTimeoutEnd.call($tt0,perc,dur2),crsl.isScrolling?$cfs.trigger(cf_e("play",conf),b):$cfs.trigger(cf_e(b,conf),opts.auto)},dur2),opts.auto.onTimeoutStart&&opts.auto.onTimeoutStart.call($tt0,perc,dur2),!0}),$cfs.bind(cf_e("resume",conf),function(a){return a.stopPropagation(),scrl.isStopped?(scrl.isStopped=!1,crsl.isPaused=!1,crsl.isScrolling=!0,scrl.startTime=getTime(),sc_startScroll(scrl,conf)):$cfs.trigger(cf_e("play",conf)),!0}),$cfs.bind(cf_e("prev",conf)+" "+cf_e("next",conf),function(a,b,c,d,e){if(a.stopPropagation(),crsl.isStopped||$cfs.is(":hidden"))return a.stopImmediatePropagation(),debug(conf,"Carousel stopped or hidden: Not scrolling.");var f=is_number(opts.items.minimum)?opts.items.minimum:opts.items.visible+1;if(f>itms.total)return a.stopImmediatePropagation(),debug(conf,"Not enough items ("+itms.total+" total, "+f+" needed): Not scrolling.");var g=[b,c,d,e],h=["object","number/string","function","boolean"],i=cf_sortParams(g,h);b=i[0],c=i[1],d=i[2],e=i[3];var j=a.type.slice(conf.events.prefix.length);if(is_object(b)||(b={}),is_function(d)&&(b.onAfter=d),is_boolean(e)&&(b.queue=e),b=$.extend(!0,{},opts[j],b),b.conditions&&!b.conditions.call($tt0,j))return a.stopImmediatePropagation(),debug(conf,'Callback "conditions" returned false.');if(!is_number(c)){if("*"!=opts.items.filter)c="visible";else for(var k=[c,b.items,opts[j].items],i=0,l=k.length;l>i;i++)if(is_number(k[i])||"page"==k[i]||"visible"==k[i]){c=k[i];break}switch(c){case"page":return a.stopImmediatePropagation(),$cfs.triggerHandler(cf_e(j+"Page",conf),[b,d]);case"visible":opts.items.visibleConf.variable||"*"!=opts.items.filter||(c=opts.items.visible)}}if(scrl.isStopped)return $cfs.trigger(cf_e("resume",conf)),$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]]),a.stopImmediatePropagation(),debug(conf,"Carousel resumed scrolling.");if(b.duration>0&&crsl.isScrolling)return b.queue&&("last"==b.queue&&(queu=[]),("first"!=b.queue||0==queu.length)&&$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]])),a.stopImmediatePropagation(),debug(conf,"Carousel currently scrolling.");if(tmrs.timePassed=0,$cfs.trigger(cf_e("slide_"+j,conf),[b,c]),opts.synchronise)for(var m=opts.synchronise,n=[b,c],o=0,l=m.length;l>o;o++){var p=j;m[o][2]||(p="prev"==p?"next":"prev"),m[o][1]||(n[0]=m[o][0].triggerHandler("_cfs_triggerEvent",["configuration",p])),n[1]=c+m[o][3],m[o][0].trigger("_cfs_triggerEvent",["slide_"+p,n])}return!0}),$cfs.bind(cf_e("slide_prev",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&0==itms.first)return opts.infinite&&$cfs.trigger(cf_e("next",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if(opts.items.visibleConf.variable)c=gn_getVisibleItemsPrev(d,opts,itms.total-1);else if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsPrevFilter(d,opts,itms.total-1,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}if(opts.circular||itms.total-c<itms.first&&(c=itms.total-itms.first),opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){var f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0);f>=opts.items.visible+c&&itms.total>c&&(c++,f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0)),opts.items.visible=f}else if("*"!=opts.items.filter){var f=gn_getVisibleItemsNextFilter(d,opts,itms.total-c);opts.items.visible=cf_getItemsAdjust(f,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items backward."),itms.first+=c;itms.first>=itms.total;)itms.first-=itms.total;opts.circular||(0==itms.first&&b.onEnd&&b.onEnd.call($tt0,"prev"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),$cfs.children().slice(itms.total-c,itms.total).prependTo($cfs),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),g=gi_getOldItemsPrev(d,opts,c),h=gi_getNewItemsPrev(d,opts),i=d.eq(c-1),j=g.last(),k=h.last();sz_resetMargin(d,opts);var l=0,m=0;if(opts.align){var n=cf_getAlignPadding(h,opts);l=n[0],m=n[1]}var o=0>l?opts.padding[opts.d[3]]:0,p=!1,q=$();if(c>opts.items.visible&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,i=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(h,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B={},C={},D=sc_getDuration(b,opts,c,t);switch(b.fx){case"cover":case"cover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visible),opts,"width")}p&&(opts.items[opts.d.width]=r),sz_resetMargin(d,opts,!0),m>=0&&sz_resetMargin(j,opts,opts.padding[opts.d[1]]),l>=0&&sz_resetMargin(i,opts,opts.padding[opts.d[3]]),opts.align&&(opts.padding[opts.d[1]]=m,opts.padding[opts.d[3]]=l),B[opts.d.left]=-(t-o),C[opts.d.left]=-(v-o),x[opts.d.left]=u[opts.d.width];var E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){},L=function(){},M=function(){},N=function(){},O=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp)}switch(b.fx){case"crossfade":case"uncover":case"uncover-fade":s.children().slice(0,c).remove(),s.children().slice(opts.items.visibleConf.old).remove();break;case"cover":case"cover-fade":s.children().slice(opts.items.visible).remove(),s.css(C)}if($cfs.css(B),scrl=sc_setScroll(D,b.easing,conf),w[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0,("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(E=function(){$wrp.css(u)},F=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){switch(k.not(i).length&&(y[opts.d.marginRight]=i.data("_cfs_origCssMargin"),0>l?i.css(y):(K=function(){i.css(y)},L=function(){scrl.anims.push([i,y])})),b.fx){case"cover":case"cover-fade":s.children().eq(c-1).css(y)}k.not(j).length&&(z[opts.d.marginRight]=j.data("_cfs_origCssMargin"),G=function(){j.css(z)},H=function(){scrl.anims.push([j,z])}),m>=0&&(A[opts.d.marginRight]=k.data("_cfs_origCssMargin")+opts.padding[opts.d[1]],I=function(){k.css(A)},J=function(){scrl.anims.push([k,A])})}O=function(){$cfs.css(w)};var P=opts.items.visible+c-itms.total;N=function(){if(P>0&&($cfs.children().slice(itms.total).remove(),g=$($cfs.children().slice(itms.total-(opts.items.visible-P)).get().concat($cfs.children().slice(0,P).get()))),sc_showHiddenItems(p),opts.usePadding){var a=$cfs.children().eq(opts.items.visible+c-1);a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var Q=sc_mapCallbackArguments(g,q,h,c,"prev",D,u);switch(M=function(){sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",Q,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",Q,clbk),b.fx){case"none":$cfs.css(w),E(),G(),I(),K(),O(),N(),M();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){E(),G(),I(),K(),O(),N(),scrl=sc_setScroll(D,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},M]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},M]),F(),G(),I(),K(),O(),N();break;case"cover":scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"cover-fade":scrl.anims.push([$cfs,{opacity:0}]),scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"uncover":scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;default:scrl.anims.push([$cfs,w,function(){N(),M()}]),F(),H(),J(),L()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0
}),$cfs.bind(cf_e("slide_next",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&itms.first==opts.items.visible)return opts.infinite&&$cfs.trigger(cf_e("prev",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsNextFilter(d,opts,0,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}var f=0==itms.first?itms.total:itms.first;if(!opts.circular){if(opts.items.visibleConf.variable)var g=gn_getVisibleItemsNext(d,opts,c),e=gn_getVisibleItemsPrev(d,opts,f-1);else var g=opts.items.visible,e=opts.items.visible;c+g>f&&(c=f-e)}if(opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){for(var g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible-c>=g&&itms.total>c;)c++,g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible=g}else if("*"!=opts.items.filter){var g=gn_getVisibleItemsNextFilter(d,opts,c);opts.items.visible=cf_getItemsAdjust(g,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items forward."),itms.first-=c;0>itms.first;)itms.first+=itms.total;opts.circular||(itms.first==opts.items.visible&&b.onEnd&&b.onEnd.call($tt0,"next"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),h=gi_getOldItemsNext(d,opts),i=gi_getNewItemsNext(d,opts,c),j=d.eq(c-1),k=h.last(),l=i.last();sz_resetMargin(d,opts);var m=0,n=0;if(opts.align){var o=cf_getAlignPadding(i,opts);m=o[0],n=o[1]}var p=!1,q=$();if(c>opts.items.visibleConf.old&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,j=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(i,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B=sc_getDuration(b,opts,c,t);switch(b.fx){case"uncover":case"uncover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visibleConf.old),opts,"width")}p&&(opts.items[opts.d.width]=r),opts.align&&0>opts.padding[opts.d[1]]&&(opts.padding[opts.d[1]]=0),sz_resetMargin(d,opts,!0),sz_resetMargin(k,opts,opts.padding[opts.d[1]]),opts.align&&(opts.padding[opts.d[1]]=n,opts.padding[opts.d[3]]=m),A[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0;var C=function(){},D=function(){},E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp),s.children().slice(opts.items.visibleConf.old).remove()}switch(b.fx){case"crossfade":case"cover":case"cover-fade":$cfs.css("zIndex",1),s.css("zIndex",0)}if(scrl=sc_setScroll(B,b.easing,conf),w[opts.d.left]=-t,x[opts.d.left]=-v,0>m&&(w[opts.d.left]+=m),("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(C=function(){$wrp.css(u)},D=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){var L=l.data("_cfs_origCssMargin");n>=0&&(L+=opts.padding[opts.d[1]]),l.css(opts.d.marginRight,L),j.not(k).length&&(z[opts.d.marginRight]=k.data("_cfs_origCssMargin")),E=function(){k.css(z)},F=function(){scrl.anims.push([k,z])};var M=j.data("_cfs_origCssMargin");m>0&&(M+=opts.padding[opts.d[3]]),y[opts.d.marginRight]=M,G=function(){j.css(y)},H=function(){scrl.anims.push([j,y])}}K=function(){$cfs.css(A)};var N=opts.items.visible+c-itms.total;J=function(){N>0&&$cfs.children().slice(itms.total).remove();var a=$cfs.children().slice(0,c).appendTo($cfs).last();if(N>0&&(i=gi_getCurrentItems(d,opts)),sc_showHiddenItems(p),opts.usePadding){if(itms.total<opts.items.visible+c){var b=$cfs.children().eq(opts.items.visible-1);b.css(opts.d.marginRight,b.data("_cfs_origCssMargin")+opts.padding[opts.d[1]])}a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var O=sc_mapCallbackArguments(h,q,i,c,"next",B,u);switch(I=function(){$cfs.css("zIndex",$cfs.data("_cfs_origCssZindex")),sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",O,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",O,clbk),b.fx){case"none":$cfs.css(w),C(),E(),G(),K(),J(),I();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){C(),E(),G(),K(),J(),scrl=sc_setScroll(B,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},I]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},I]),D(),E(),G(),K(),J();break;case"cover":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"cover-fade":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"uncover":scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;default:scrl.anims.push([$cfs,w,function(){K(),J(),I()}]),D(),F(),H()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0}),$cfs.bind(cf_e("slideTo",conf),function(a,b,c,d,e,f,g){a.stopPropagation();var h=[b,c,d,e,f,g],i=["string/number/object","number","boolean","object","string","function"],j=cf_sortParams(h,i);return e=j[3],f=j[4],g=j[5],b=gn_getItemIndex(j[0],j[1],j[2],itms,$cfs),0==b?!1:(is_object(e)||(e=!1),"prev"!=f&&"next"!=f&&(f=opts.circular?itms.total/2>=b?"next":"prev":0==itms.first||itms.first>b?"next":"prev"),"prev"==f&&(b=itms.total-b),$cfs.trigger(cf_e(f,conf),[e,b,g]),!0)}),$cfs.bind(cf_e("prevPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d-1,b,"prev",c])}),$cfs.bind(cf_e("nextPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d+1,b,"next",c])}),$cfs.bind(cf_e("slideToPage",conf),function(a,b,c,d,e){a.stopPropagation(),is_number(b)||(b=$cfs.triggerHandler(cf_e("currentPage",conf)));var f=opts.pagination.items||opts.items.visible,g=Math.ceil(itms.total/f)-1;return 0>b&&(b=g),b>g&&(b=0),$cfs.triggerHandler(cf_e("slideTo",conf),[b*f,0,!0,c,d,e])}),$cfs.bind(cf_e("jumpToStart",conf),function(a,b){if(a.stopPropagation(),b=b?gn_getItemIndex(b,0,!0,itms,$cfs):0,b+=itms.first,0!=b){if(itms.total>0)for(;b>itms.total;)b-=itms.total;$cfs.prepend($cfs.children().slice(b,itms.total))}return!0}),$cfs.bind(cf_e("synchronise",conf),function(a,b){if(a.stopPropagation(),b)b=cf_getSynchArr(b);else{if(!opts.synchronise)return debug(conf,"No carousel to synchronise.");b=opts.synchronise}for(var c=$cfs.triggerHandler(cf_e("currentPosition",conf)),d=!0,e=0,f=b.length;f>e;e++)b[e][0].triggerHandler(cf_e("slideTo",conf),[c,b[e][3],!0])||(d=!1);return d}),$cfs.bind(cf_e("queue",conf),function(a,b,c){return a.stopPropagation(),is_function(b)?b.call($tt0,queu):is_array(b)?queu=b:is_undefined(b)||queu.push([b,c]),queu}),$cfs.bind(cf_e("insertItem",conf),function(a,b,c,d,e){a.stopPropagation();var f=[b,c,d,e],g=["string/object","string/number/object","boolean","number"],h=cf_sortParams(f,g);if(b=h[0],c=h[1],d=h[2],e=h[3],is_object(b)&&!is_jquery(b)?b=$(b):is_string(b)&&(b=$(b)),!is_jquery(b)||0==b.length)return debug(conf,"Not a valid object.");is_undefined(c)&&(c="end"),sz_storeMargin(b,opts),sz_storeOrigCss(b);var i=c,j="before";"end"==c?d?(0==itms.first?(c=itms.total-1,j="after"):(c=itms.first,itms.first+=b.length),0>c&&(c=0)):(c=itms.total-1,j="after"):c=gn_getItemIndex(c,e,d,itms,$cfs);var k=$cfs.children().eq(c);return k.length?k[j](b):(debug(conf,"Correct insert-position not found! Appending item to the end."),$cfs.append(b)),"end"==i||d||itms.first>c&&(itms.first+=b.length),itms.total=$cfs.children().length,itms.first>=itms.total&&(itms.first-=itms.total),$cfs.trigger(cf_e("updateSizes",conf)),$cfs.trigger(cf_e("linkAnchors",conf)),!0}),$cfs.bind(cf_e("removeItem",conf),function(a,b,c,d){a.stopPropagation();var e=[b,c,d],f=["string/number/object","boolean","number"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],b instanceof $&&b.length>1)return i=$(),b.each(function(){var e=$cfs.trigger(cf_e("removeItem",conf),[$(this),c,d]);e&&(i=i.add(e))}),i;if(is_undefined(b)||"end"==b)i=$cfs.children().last();else{b=gn_getItemIndex(b,d,c,itms,$cfs);var i=$cfs.children().eq(b);i.length&&itms.first>b&&(itms.first-=i.length)}return i&&i.length&&(i.detach(),itms.total=$cfs.children().length,$cfs.trigger(cf_e("updateSizes",conf))),i}),$cfs.bind(cf_e("onBefore",conf)+" "+cf_e("onAfter",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length);return is_array(b)&&(clbk[c]=b),is_function(b)&&clbk[c].push(b),clbk[c]}),$cfs.bind(cf_e("currentPosition",conf),function(a,b){if(a.stopPropagation(),0==itms.first)var c=0;else var c=itms.total-itms.first;return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("currentPage",conf),function(a,b){a.stopPropagation();var e,c=opts.pagination.items||opts.items.visible,d=Math.ceil(itms.total/c-1);return e=0==itms.first?0:itms.first<itms.total%c?0:itms.first!=c||opts.circular?Math.round((itms.total-itms.first)/c):d,0>e&&(e=0),e>d&&(e=d),is_function(b)&&b.call($tt0,e),e}),$cfs.bind(cf_e("currentVisible",conf),function(a,b){a.stopPropagation();var c=gi_getCurrentItems($cfs.children(),opts);return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("slice",conf),function(a,b,c,d){if(a.stopPropagation(),0==itms.total)return!1;var e=[b,c,d],f=["number","number","function"],g=cf_sortParams(e,f);if(b=is_number(g[0])?g[0]:0,c=is_number(g[1])?g[1]:itms.total,d=g[2],b+=itms.first,c+=itms.first,items.total>0){for(;b>itms.total;)b-=itms.total;for(;c>itms.total;)c-=itms.total;for(;0>b;)b+=itms.total;for(;0>c;)c+=itms.total}var i,h=$cfs.children();return i=c>b?h.slice(b,c):$(h.slice(b,itms.total).get().concat(h.slice(0,c).get())),is_function(d)&&d.call($tt0,i),i}),$cfs.bind(cf_e("isPaused",conf)+" "+cf_e("isStopped",conf)+" "+cf_e("isScrolling",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length),d=crsl[c];return is_function(b)&&b.call($tt0,d),d}),$cfs.bind(cf_e("configuration",conf),function(e,a,b,c){e.stopPropagation();var reInit=!1;if(is_function(a))a.call($tt0,opts);else if(is_object(a))opts_orig=$.extend(!0,{},opts_orig,a),b!==!1?reInit=!0:opts=$.extend(!0,{},opts,a);else if(!is_undefined(a))if(is_function(b)){var val=eval("opts."+a);is_undefined(val)&&(val=""),b.call($tt0,val)}else{if(is_undefined(b))return eval("opts."+a);"boolean"!=typeof c&&(c=!0),eval("opts_orig."+a+" = b"),c!==!1?reInit=!0:eval("opts."+a+" = b")}if(reInit){sz_resetMargin($cfs.children(),opts),FN._init(opts_orig),FN._bind_buttons();var sz=sz_setSizes($cfs,opts);$cfs.trigger(cf_e("updatePageStatus",conf),[!0,sz])}return opts}),$cfs.bind(cf_e("linkAnchors",conf),function(a,b,c){return a.stopPropagation(),is_undefined(b)?b=$("body"):is_string(b)&&(b=$(b)),is_jquery(b)&&0!=b.length?(is_string(c)||(c="a.caroufredsel"),b.find(c).each(function(){var a=this.hash||"";a.length>0&&-1!=$cfs.children().index($(a))&&$(this).unbind("click").click(function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),a)})}),!0):debug(conf,"Not a valid object.")}),$cfs.bind(cf_e("updatePageStatus",conf),function(a,b){if(a.stopPropagation(),opts.pagination.container){var d=opts.pagination.items||opts.items.visible,e=Math.ceil(itms.total/d);b&&(opts.pagination.anchorBuilder&&(opts.pagination.container.children().remove(),opts.pagination.container.each(function(){for(var a=0;e>a;a++){var b=$cfs.children().eq(gn_getItemIndex(a*d,0,!0,itms,$cfs));$(this).append(opts.pagination.anchorBuilder.call(b[0],a+1))}})),opts.pagination.container.each(function(){$(this).children().unbind(opts.pagination.event).each(function(a){$(this).bind(opts.pagination.event,function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[a*d,-opts.pagination.deviation,!0,opts.pagination])})})}));var f=$cfs.triggerHandler(cf_e("currentPage",conf))+opts.pagination.deviation;return f>=e&&(f=0),0>f&&(f=e-1),opts.pagination.container.each(function(){$(this).children().removeClass(cf_c("selected",conf)).eq(f).addClass(cf_c("selected",conf))}),!0}}),$cfs.bind(cf_e("updateSizes",conf),function(){var b=opts.items.visible,c=$cfs.children(),d=ms_getParentSize($wrp,opts,"width");if(itms.total=c.length,crsl.primarySizePercentage?(opts.maxDimension=d,opts[opts.d.width]=ms_getPercentage(d,crsl.primarySizePercentage)):opts.maxDimension=ms_getMaxDimension(opts,d),opts.responsive?(opts.items.width=opts.items.sizesConf.width,opts.items.height=opts.items.sizesConf.height,opts=in_getResponsiveValues(opts,c,d),b=opts.items.visible,sz_setResponsiveSizes(opts,c)):opts.items.visibleConf.variable?b=gn_getVisibleItemsNext(c,opts,0):"*"!=opts.items.filter&&(b=gn_getVisibleItemsNextFilter(c,opts,0)),!opts.circular&&0!=itms.first&&b>itms.first){if(opts.items.visibleConf.variable)var e=gn_getVisibleItemsPrev(c,opts,itms.first)-itms.first;else if("*"!=opts.items.filter)var e=gn_getVisibleItemsPrevFilter(c,opts,itms.first)-itms.first;else var e=opts.items.visible-itms.first;debug(conf,"Preventing non-circular: sliding "+e+" items backward."),$cfs.trigger(cf_e("prev",conf),e)}opts.items.visible=cf_getItemsAdjust(b,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts=in_getAlignPadding(opts,c);var f=sz_setSizes($cfs,opts);return $cfs.trigger(cf_e("updatePageStatus",conf),[!0,f]),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),f}),$cfs.bind(cf_e("destroy",conf),function(a,b){return a.stopPropagation(),tmrs=sc_clearTimers(tmrs),$cfs.data("_cfs_isCarousel",!1),$cfs.trigger(cf_e("finish",conf)),b&&$cfs.trigger(cf_e("jumpToStart",conf)),sz_restoreOrigCss($cfs.children()),sz_restoreOrigCss($cfs),FN._unbind_events(),FN._unbind_buttons(),"parent"==conf.wrapper?sz_restoreOrigCss($wrp):$wrp.replaceWith($cfs),!0}),$cfs.bind(cf_e("debug",conf),function(){return debug(conf,"Carousel width: "+opts.width),debug(conf,"Carousel height: "+opts.height),debug(conf,"Item widths: "+opts.items.width),debug(conf,"Item heights: "+opts.items.height),debug(conf,"Number of items visible: "+opts.items.visible),opts.auto.play&&debug(conf,"Number of items scrolled automatically: "+opts.auto.items),opts.prev.button&&debug(conf,"Number of items scrolled backward: "+opts.prev.items),opts.next.button&&debug(conf,"Number of items scrolled forward: "+opts.next.items),conf.debug}),$cfs.bind("_cfs_triggerEvent",function(a,b,c){return a.stopPropagation(),$cfs.triggerHandler(cf_e(b,conf),c)})},FN._unbind_events=function(){$cfs.unbind(cf_e("",conf)),$cfs.unbind(cf_e("",conf,!1)),$cfs.unbind("_cfs_triggerEvent")},FN._bind_buttons=function(){if(FN._unbind_buttons(),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),opts.auto.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.auto.pauseOnHover);$wrp.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.auto.button&&opts.auto.button.bind(cf_e(opts.auto.event,conf,!1),function(a){a.preventDefault();var b=!1,c=null;crsl.isPaused?b="play":opts.auto.pauseOnEvent&&(b="pause",c=bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)),b&&$cfs.trigger(cf_e(b,conf),c)}),opts.prev.button&&(opts.prev.button.bind(cf_e(opts.prev.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("prev",conf))}),opts.prev.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.prev.pauseOnHover);opts.prev.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.next.button&&(opts.next.button.bind(cf_e(opts.next.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("next",conf))}),opts.next.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.next.pauseOnHover);opts.next.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.pagination.container&&opts.pagination.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);opts.pagination.container.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if((opts.prev.key||opts.next.key)&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b==opts.next.key&&(a.preventDefault(),$cfs.trigger(cf_e("next",conf))),b==opts.prev.key&&(a.preventDefault(),$cfs.trigger(cf_e("prev",conf)))}),opts.pagination.keys&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b>=49&&58>b&&(b=(b-49)*opts.items.visible,itms.total>=b&&(a.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[b,0,!0,opts.pagination])))}),$.fn.swipe){var b="ontouchstart"in window;if(b&&opts.swipe.onTouch||!b&&opts.swipe.onMouse){var c=$.extend(!0,{},opts.prev,opts.swipe),d=$.extend(!0,{},opts.next,opts.swipe),e=function(){$cfs.trigger(cf_e("prev",conf),[c])},f=function(){$cfs.trigger(cf_e("next",conf),[d])};switch(opts.direction){case"up":case"down":opts.swipe.options.swipeUp=f,opts.swipe.options.swipeDown=e;break;default:opts.swipe.options.swipeLeft=f,opts.swipe.options.swipeRight=e}crsl.swipe&&$cfs.swipe("destroy"),$wrp.swipe(opts.swipe.options),$wrp.css("cursor","move"),crsl.swipe=!0}}if($.fn.mousewheel&&opts.mousewheel){var g=$.extend(!0,{},opts.prev,opts.mousewheel),h=$.extend(!0,{},opts.next,opts.mousewheel);crsl.mousewheel&&$wrp.unbind(cf_e("mousewheel",conf,!1)),$wrp.bind(cf_e("mousewheel",conf,!1),function(a,b){a.preventDefault(),b>0?$cfs.trigger(cf_e("prev",conf),[g]):$cfs.trigger(cf_e("next",conf),[h])}),crsl.mousewheel=!0}if(opts.auto.play&&$cfs.trigger(cf_e("play",conf),opts.auto.delay),crsl.upDateOnWindowResize){var i=function(){$cfs.trigger(cf_e("finish",conf)),opts.auto.pauseOnResize&&!crsl.isPaused&&$cfs.trigger(cf_e("play",conf)),sz_resetMargin($cfs.children(),opts),$cfs.trigger(cf_e("updateSizes",conf))},j=$(window),k=null;if($.debounce&&"debounce"==conf.onWindowResize)k=$.debounce(200,i);else if($.throttle&&"throttle"==conf.onWindowResize)k=$.throttle(300,i);else{var l=0,m=0;k=function(){var a=j.width(),b=j.height();(a!=l||b!=m)&&(i(),l=a,m=b)}}j.bind(cf_e("resize",conf,!1,!0,!0),k)}},FN._unbind_buttons=function(){var b=(cf_e("",conf),cf_e("",conf,!1));ns3=cf_e("",conf,!1,!0,!0),$(document).unbind(ns3),$(window).unbind(ns3),$wrp.unbind(b),opts.auto.button&&opts.auto.button.unbind(b),opts.prev.button&&opts.prev.button.unbind(b),opts.next.button&&opts.next.button.unbind(b),opts.pagination.container&&(opts.pagination.container.unbind(b),opts.pagination.anchorBuilder&&opts.pagination.container.children().remove()),crsl.swipe&&($cfs.swipe("destroy"),$wrp.css("cursor","default"),crsl.swipe=!1),crsl.mousewheel&&(crsl.mousewheel=!1),nv_showNavi(opts,"hide",conf),nv_enableNavi(opts,"removeClass",conf)},is_boolean(configs)&&(configs={debug:configs});var crsl={direction:"next",isPaused:!0,isScrolling:!1,isStopped:!1,mousewheel:!1,swipe:!1},itms={total:$cfs.children().length,first:0},tmrs={auto:null,progress:null,startTime:getTime(),timePassed:0},scrl={isStopped:!1,duration:0,startTime:0,easing:"",anims:[]},clbk={onBefore:[],onAfter:[]},queu=[],conf=$.extend(!0,{},$.fn.carouFredSel.configs,configs),opts={},opts_orig=$.extend(!0,{},options),$wrp="parent"==conf.wrapper?$cfs.parent():$cfs.wrap("<"+conf.wrapper.element+' class="'+conf.wrapper.classname+'" />').parent();if(conf.selector=$cfs.selector,conf.serialNumber=$.fn.carouFredSel.serialNumber++,conf.transition=conf.transition&&$.fn.transition?"transition":"animate",FN._init(opts_orig,!0,starting_position),FN._build(),FN._bind_events(),FN._bind_buttons(),is_array(opts.items.start))var start_arr=opts.items.start;else{var start_arr=[];0!=opts.items.start&&start_arr.push(opts.items.start)}if(opts.cookie&&start_arr.unshift(parseInt(cf_getCookie(opts.cookie),10)),start_arr.length>0)for(var a=0,l=start_arr.length;l>a;a++){var s=start_arr[a];if(0!=s){if(s===!0){if(s=window.location.hash,1>s.length)continue}else"random"===s&&(s=Math.floor(Math.random()*itms.total));if($cfs.triggerHandler(cf_e("slideTo",conf),[s,0,!0,{fx:"none"}]))break}}var siz=sz_setSizes($cfs,opts),itm=gi_getCurrentItems($cfs.children(),opts);return opts.onCreate&&opts.onCreate.call($tt0,{width:siz.width,height:siz.height,items:itm}),$cfs.trigger(cf_e("updatePageStatus",conf),[!0,siz]),$cfs.trigger(cf_e("linkAnchors",conf)),conf.debug&&$cfs.trigger(cf_e("debug",conf)),$cfs},$.fn.carouFredSel.serialNumber=1,$.fn.carouFredSel.defaults={synchronise:!1,infinite:!0,circular:!0,responsive:!1,direction:"left",items:{start:0},scroll:{easing:"swing",duration:500,pauseOnHover:!1,event:"click",queue:!1}},$.fn.carouFredSel.configs={debug:!1,transition:!1,onWindowResize:"throttle",events:{prefix:"",namespace:"cfs"},wrapper:{element:"div",classname:"caroufredsel_wrapper"},classnames:{}},$.fn.carouFredSel.pageAnchorBuilder=function(a){return'<a href="#"><span>'+a+"</span></a>"},$.fn.carouFredSel.progressbarUpdater=function(a){$(this).css("width",a+"%")},$.fn.carouFredSel.cookie={get:function(a){a+="=";for(var b=document.cookie.split(";"),c=0,d=b.length;d>c;c++){for(var e=b[c];" "==e.charAt(0);)e=e.slice(1);if(0==e.indexOf(a))return e.slice(a.length)}return 0},set:function(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),d="; expires="+e.toGMTString()}document.cookie=a+"="+b+d+"; path=/"},remove:function(a){$.fn.carouFredSel.cookie.set(a,"",-1)}},$.extend($.easing,{quadratic:function(a){var b=a*a;return a*(-b*a+4*b-6*a+4)},cubic:function(a){return a*(4*a*a-9*a+6)},elastic:function(a){var b=a*a;return a*(33*b*b-106*b*a+126*b-67*a+15)}}))})(jQuery);
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */

(function ($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}

		return null;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

})(jQuery, document);
/**
 * @preserve jQuery DateTimePicker plugin v2.4.1
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * (c) 2014, Chupurnov Valeriy.
 */
/*global document,window,jQuery,setTimeout,clearTimeout*/

(function ($) {
	'use strict';
	var default_options  = {
		i18n: {
			ar: { // Arabic
				months: [
					"كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
				],
				dayOfWeek: [
					"ن", "ث", "ع", "خ", "ج", "س", "ح"
				]
			},
			ro: { // Romanian
				months: [
					"ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
				],
				dayOfWeek: [
					"l", "ma", "mi", "j", "v", "s", "d"
				]
			},
			id: { // Indonesian
				months: [
					"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
				],
				dayOfWeek: [
					"Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"
				]
			},
			bg: { // Bulgarian
				months: [
					"Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
				],
				dayOfWeek: [
					"Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				]
			},
			fa: { // Persian/Farsi
				months: [
					'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
				],
				dayOfWeek: [
					'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
				]
			},
			ru: { // Russian
				months: [
					'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
				],
				dayOfWeek: [
					"Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				]
			},
			uk: { // Ukrainian
				months: [
					'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
				],
				dayOfWeek: [
					"Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
				]
			},
			en: { // English
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeek: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				]
			},
			el: { // Ελληνικά
				months: [
					"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
				],
				dayOfWeek: [
					"Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
				]
			},
			de: { // German
				months: [
					'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
				],
				dayOfWeek: [
					"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
				]
			},
			nl: { // Dutch
				months: [
					"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
				],
				dayOfWeek: [
					"zo", "ma", "di", "wo", "do", "vr", "za"
				]
			},
			tr: { // Turkish
				months: [
					"Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
				],
				dayOfWeek: [
					"Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
				]
			},
			fr: { //French
				months: [
					"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
				],
				dayOfWeek: [
					"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
				]
			},
			es: { // Spanish
				months: [
					"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
				],
				dayOfWeek: [
					"Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
				]
			},
			th: { // Thai
				months: [
					'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
				],
				dayOfWeek: [
					'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
				]
			},
			pl: { // Polish
				months: [
					"styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
				],
				dayOfWeek: [
					"nd", "pn", "wt", "śr", "cz", "pt", "sb"
				]
			},
			pt: { // Portuguese
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeek: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
				]
			},
			ch: { // Simplified Chinese
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeek: [
					"日", "一", "二", "三", "四", "五", "六"
				]
			},
			se: { // Swedish
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September",  "Oktober", "November", "December"
				],
				dayOfWeek: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				]
			},
			kr: { // Korean
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeek: [
					"일", "월", "화", "수", "목", "금", "토"
				]
			},
			it: { // Italian
				months: [
					"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
				],
				dayOfWeek: [
					"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
				]
			},
			da: { // Dansk
				months: [
					"January", "Februar", "Marts", "April", "Maj", "Juni", "July", "August", "September", "Oktober", "November", "December"
				],
				dayOfWeek: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				]
			},
			no: { // Norwegian
				months: [
					"Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
				],
				dayOfWeek: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				]
			},
			ja: { // Japanese
				months: [
					"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
				],
				dayOfWeek: [
					"日", "月", "火", "水", "木", "金", "土"
				]
			},
			vi: { // Vietnamese
				months: [
					"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
				],
				dayOfWeek: [
					"CN", "T2", "T3", "T4", "T5", "T6", "T7"
				]
			},
			sl: { // Slovenščina
				months: [
					"Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
				],
				dayOfWeek: [
					"Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
				]
			},
			cs: { // Čeština
				months: [
					"Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
				],
				dayOfWeek: [
					"Ne", "Po", "Út", "St", "Čt", "Pá", "So"
				]
			},
			hu: { // Hungarian
				months: [
					"Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
				],
				dayOfWeek: [
					"Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
				]
			},
			az: { //Azerbaijanian (Azeri)
				months: [
					"Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
				],
				dayOfWeek: [
					"B", "Be", "Ça", "Ç", "Ca", "C", "Ş"
				]
			},
			bs: { //Bosanski
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeek: [
					"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
				]
			},
			ca: { //Català
				months: [
					"Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
				],
				dayOfWeek: [
					"Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"
				]
			},
			'en-GB': { //English (British)
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeek: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				]
			},
			et: { //"Eesti"
				months: [
					"Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"
				],
				dayOfWeek: [
					"P", "E", "T", "K", "N", "R", "L"
				]
			},
			eu: { //Euskara
				months: [
					"Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"
				],
				dayOfWeek: [
					"Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."
				]
			},
			fi: { //Finnish (Suomi)
				months: [
					"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
				],
				dayOfWeek: [
					"Su", "Ma", "Ti", "Ke", "To", "Pe", "La"
				]
			},
			gl: { //Galego
				months: [
					"Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"
				],
				dayOfWeek: [
					"Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"
				]
			},
			hr: { //Hrvatski
				months: [
					"Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
				],
				dayOfWeek: [
					"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
				]
			},
			ko: { //Korean (한국어)
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeek: [
					"일", "월", "화", "수", "목", "금", "토"
				]
			},
			lt: { //Lithuanian (lietuvių)
				months: [
					"Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"
				],
				dayOfWeek: [
					"Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"
				]
			},
			lv: { //Latvian (Latviešu)
				months: [
					"Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"
				],
				dayOfWeek: [
					"Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"
				]
			},
			mk: { //Macedonian (Македонски)
				months: [
					"јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"
				],
				dayOfWeek: [
					"нед", "пон", "вто", "сре", "чет", "пет", "саб"
				]
			},
			mn: { //Mongolian (Монгол)
				months: [
					"1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
				],
				dayOfWeek: [
					"Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"
				]
			},
			'pt-BR': { //Português(Brasil)
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeek: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
				]
			},
			sk: { //Slovenčina
				months: [
					"Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"
				],
				dayOfWeek: [
					"Ne", "Po", "Ut", "St", "Št", "Pi", "So"
				]
			},
			sq: { //Albanian (Shqip)
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeek: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				]
			},
			'sr-YU': { //Serbian (Srpski)
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeek: [
					"Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"
				]
			},
			sr: { //Serbian Cyrillic (Српски)
				months: [
					"јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"
				],
				dayOfWeek: [
					"нед", "пон", "уто", "сре", "чет", "пет", "суб"
				]
			},
			sv: { //Svenska
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
				],
				dayOfWeek: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				]
			},
			'zh-TW': { //Traditional Chinese (繁體中文)
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeek: [
					"日", "一", "二", "三", "四", "五", "六"
				]
			},
			zh: { //Simplified Chinese (简体中文)
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeek: [
					"日", "一", "二", "三", "四", "五", "六"
				]
			},
			he: { //Hebrew (עברית)
				months: [
					'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
				],
				dayOfWeek: [
					'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
				]
			},
			hy: { // Armenian
				months: [
					"Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
				],
				dayOfWeek: [
					"Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"
				]
			}
		},
		value: '',
		lang: 'en',

		format:	'Y/m/d H:i',
		formatTime:	'H:i',
		formatDate:	'Y/m/d',

		startDate:	false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
		step: 60,
		monthChangeSpinner: true,

		closeOnDateSelect: false,
		closeOnTimeSelect: false,
		closeOnWithoutClick: true,
		closeOnInputClick: true,

		timepicker: true,
		datepicker: true,
		weeks: false,

		defaultTime: false,	// use formatTime format (ex. '10:00' for formatTime:	'H:i')
		defaultDate: false,	// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

		minDate: false,
		maxDate: false,
		minTime: false,
		maxTime: false,

		allowTimes: [],
		opened: false,
		initTime: true,
		inline: false,
		theme: '',

		onSelectDate: function () {},
		onSelectTime: function () {},
		onChangeMonth: function () {},
		onChangeYear: function () {},
		onChangeDateTime: function () {},
		onShow: function () {},
		onClose: function () {},
		onGenerate: function () {},

		withoutCopyright: true,
		inverseButton: false,
		hours12: false,
		next: 'xdsoft_next',
		prev : 'xdsoft_prev',
		dayOfWeekStart: 0,
		parentID: 'body',
		timeHeightInTimePicker: 25,
		timepickerScrollbar: true,
		todayButton: true,
		prevButton: true,
		nextButton: true,
		defaultSelect: true,

		scrollMonth: true,
		scrollTime: true,
		scrollInput: true,

		lazyInit: false,
		mask: false,
		validateOnBlur: true,
		allowBlank: true,
		yearStart: 1950,
		yearEnd: 2050,
		monthStart: 0,
		monthEnd: 11,
		style: '',
		id: '',
		fixed: false,
		roundTime: 'round', // ceil, floor
		className: '',
		weekends: [],
		disabledDates : [],
		yearOffset: 0,
		beforeShowDay: null,

		enterLikeTab: true,
        showApplyButton: false
	};
	// fix for ie8
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (obj, start) {
			var i, j;
			for (i = (start || 0), j = this.length; i < j; i += 1) {
				if (this[i] === obj) { return i; }
			}
			return -1;
		};
	}
	Date.prototype.countDaysInMonth = function () {
		return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
	};
	$.fn.xdsoftScroller = function (percent) {
		return this.each(function () {
			var timeboxparent = $(this),
				pointerEventToXY = function (e) {
					var out = {x: 0, y: 0},
						touch;
					if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
						touch  = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						out.x = touch.clientX;
						out.y = touch.clientY;
					} else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
						out.x = e.clientX;
						out.y = e.clientY;
					}
					return out;
				},
				move = 0,
				timebox,
				parentHeight,
				height,
				scrollbar,
				scroller,
				maximumOffset = 100,
				start = false,
				startY = 0,
				startTop = 0,
				h1 = 0,
				touchStart = false,
				startTopScroll = 0,
				calcOffset = function () {};
			if (percent === 'hide') {
				timeboxparent.find('.xdsoft_scrollbar').hide();
				return;
			}
			if (!$(this).hasClass('xdsoft_scroller_box')) {
				timebox = timeboxparent.children().eq(0);
				parentHeight = timeboxparent[0].clientHeight;
				height = timebox[0].offsetHeight;
				scrollbar = $('<div class="xdsoft_scrollbar"></div>');
				scroller = $('<div class="xdsoft_scroller"></div>');
				scrollbar.append(scroller);

				timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
				calcOffset = function calcOffset(event) {
					var offset = pointerEventToXY(event).y - startY + startTopScroll;
					if (offset < 0) {
						offset = 0;
					}
					if (offset + scroller[0].offsetHeight > h1) {
						offset = h1 - scroller[0].offsetHeight;
					}
					timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
				};

				scroller
					.on('touchstart.xdsoft_scroller mousedown.xdsoft_scroller', function (event) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
						}

						startY = pointerEventToXY(event).y;
						startTopScroll = parseInt(scroller.css('margin-top'), 10);
						h1 = scrollbar[0].offsetHeight;

						if (event.type === 'mousedown') {
							if (document) {
								$(document.body).addClass('xdsoft_noselect');
							}
							$([document.body, window]).on('mouseup.xdsoft_scroller', function arguments_callee() {
								$([document.body, window]).off('mouseup.xdsoft_scroller', arguments_callee)
									.off('mousemove.xdsoft_scroller', calcOffset)
									.removeClass('xdsoft_noselect');
							});
							$(document.body).on('mousemove.xdsoft_scroller', calcOffset);
						} else {
							touchStart = true;
							event.stopPropagation();
							event.preventDefault();
						}
					})
					.on('touchmove', function (event) {
						if (touchStart) {
							event.preventDefault();
							calcOffset(event);
						}
					})
					.on('touchend touchcancel', function (event) {
						touchStart =  false;
						startTopScroll = 0;
					});

				timeboxparent
					.on('scroll_element.xdsoft_scroller', function (event, percentage) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
						}
						percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

						scroller.css('margin-top', maximumOffset * percentage);

						setTimeout(function () {
							timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
						}, 10);
					})
					.on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
						var percent, sh;
						parentHeight = timeboxparent[0].clientHeight;
						height = timebox[0].offsetHeight;
						percent = parentHeight / height;
						sh = percent * scrollbar[0].offsetHeight;
						if (percent > 1) {
							scroller.hide();
						} else {
							scroller.show();
							scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
							maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
							if (noTriggerScroll !== true) {
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
							}
						}
					});

				timeboxparent.on('mousewheel', function (event) {
					var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

					top = top - (event.deltaY * 20);
					if (top < 0) {
						top = 0;
					}

					timeboxparent.trigger('scroll_element.xdsoft_scroller', [top / (height - parentHeight)]);
					event.stopPropagation();
					return false;
				});

				timeboxparent.on('touchstart', function (event) {
					start = pointerEventToXY(event);
					startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
				});

				timeboxparent.on('touchmove', function (event) {
					if (start) {
						event.preventDefault();
						var coord = pointerEventToXY(event);
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
					}
				});

				timeboxparent.on('touchend touchcancel', function (event) {
					start = false;
					startTop = 0;
				});
			}
			timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
		});
	};

	$.fn.datetimepicker = function (opt) {
		var KEY0 = 48,
			KEY9 = 57,
			_KEY0 = 96,
			_KEY9 = 105,
			CTRLKEY = 17,
			DEL = 46,
			ENTER = 13,
			ESC = 27,
			BACKSPACE = 8,
			ARROWLEFT = 37,
			ARROWUP = 38,
			ARROWRIGHT = 39,
			ARROWDOWN = 40,
			TAB = 9,
			F5 = 116,
			AKEY = 65,
			CKEY = 67,
			VKEY = 86,
			ZKEY = 90,
			YKEY = 89,
			ctrlDown	=	false,
			options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

			lazyInitTimer = 0,
			createDateTimePicker,
			destroyDateTimePicker,

			lazyInit = function (input) {
				input
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft', function initOnActionCallback(event) {
						if (input.is(':disabled') || input.data('xdsoft_datetimepicker')) {
							return;
						}
						clearTimeout(lazyInitTimer);
						lazyInitTimer = setTimeout(function () {

							if (!input.data('xdsoft_datetimepicker')) {
								createDateTimePicker(input);
							}
							input
								.off('open.xdsoft focusin.xdsoft mousedown.xdsoft', initOnActionCallback)
								.trigger('open.xdsoft');
						}, 100);
					});
			};

		createDateTimePicker = function (input) {
			var datetimepicker = $('<div ' + (options.id ? 'id="' + options.id + '"' : '') + ' ' + (options.style ? 'style="' + options.style + '"' : '') + ' class="xdsoft_datetimepicker xdsoft_' + options.theme + ' xdsoft_noselect ' + (options.weeks ? ' xdsoft_showweeks' : '') + options.className + '"></div>'),
				xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
				datepicker = $('<div class="xdsoft_datepicker active"></div>'),
				mounth_picker = $('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
					'<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
					'<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
					'<button type="button" class="xdsoft_next"></button></div>'),
				calendar = $('<div class="xdsoft_calendar"></div>'),
				timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
				timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
				timebox = $('<div class="xdsoft_time_variant"></div>'),
                applyButton = $('<button class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),
				/*scrollbar = $('<div class="xdsoft_scrollbar"></div>'),
				scroller = $('<div class="xdsoft_scroller"></div>'),*/
				monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
				yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
				triggerAfterOpen = false,
				XDSoft_datetime,
				//scroll_element,
				xchangeTimer,
				timerclick,
				current_time_index,
				setPos,
				timer = 0,
				timer1 = 0,
				_xdsoft_datetime;

			mounth_picker
				.find('.xdsoft_month span')
					.after(monthselect);
			mounth_picker
				.find('.xdsoft_year span')
					.after(yearselect);

			mounth_picker
				.find('.xdsoft_month,.xdsoft_year')
					.on('mousedown.xdsoft', function (event) {
					var select = $(this).find('.xdsoft_select').eq(0),
						val = 0,
						top = 0,
						visible = select.is(':visible'),
						items,
						i;

					mounth_picker
						.find('.xdsoft_select')
							.hide();
					if (_xdsoft_datetime.currentTime) {
						val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
					}

					select[visible ? 'hide' : 'show']();
					for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
						if (items.eq(i).data('value') === val) {
							break;
						} else {
							top += items[0].offsetHeight;
						}
					}

					select.xdsoftScroller(top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
					event.stopPropagation();
					return false;
				});

			mounth_picker
				.find('.xdsoft_select')
					.xdsoftScroller()
				.on('mousedown.xdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
				})
				.on('mousedown.xdsoft', '.xdsoft_option', function (event) {

					if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
					}

					var year = _xdsoft_datetime.currentTime.getFullYear();
					if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
						_xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
					}

					$(this).parent().parent().hide();

					datetimepicker.trigger('xchange.xdsoft');
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
				});

			datetimepicker.setOptions = function (_options) {
				options = $.extend(true, {}, options, _options);

				if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
					options.allowTimes = $.extend(true, [], _options.allowTimes);
				}

				if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
					options.weekends = $.extend(true, [], _options.weekends);
				}

				if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
					options.disabledDates = $.extend(true, [], _options.disabledDates);
				}

				if ((options.open || options.opened) && (!options.inline)) {
					input.trigger('open.xdsoft');
				}

				if (options.inline) {
					triggerAfterOpen = true;
					datetimepicker.addClass('xdsoft_inline');
					input.after(datetimepicker).hide();
				}

				if (options.inverseButton) {
					options.next = 'xdsoft_prev';
					options.prev = 'xdsoft_next';
				}

				if (options.datepicker) {
					datepicker.addClass('active');
				} else {
					datepicker.removeClass('active');
				}

				if (options.timepicker) {
					timepicker.addClass('active');
				} else {
					timepicker.removeClass('active');
				}

				if (options.value) {
					if (input && input.val) {
						input.val(options.value);
					}
					_xdsoft_datetime.setCurrentTime(options.value);
				}

				if (isNaN(options.dayOfWeekStart)) {
					options.dayOfWeekStart = 0;
				} else {
					options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
				}

				if (!options.timepickerScrollbar) {
					timeboxparent.xdsoftScroller('hide');
				}

				if (options.minDate && /^-(.*)$/.test(options.minDate)) {
					options.minDate = _xdsoft_datetime.strToDateTime(options.minDate).dateFormat(options.formatDate);
				}

				if (options.maxDate &&  /^\+(.*)$/.test(options.maxDate)) {
					options.maxDate = _xdsoft_datetime.strToDateTime(options.maxDate).dateFormat(options.formatDate);
				}

				applyButton.toggle(options.showApplyButton);

				mounth_picker
					.find('.xdsoft_today_button')
						.css('visibility', !options.todayButton ? 'hidden' : 'visible');

				mounth_picker
					.find('.' + options.prev)
						.css('visibility', !options.prevButton ? 'hidden' : 'visible');

				mounth_picker
					.find('.' + options.next)
						.css('visibility', !options.nextButton ? 'hidden' : 'visible');

				if (options.mask) {
					var e,
						getCaretPos = function (input) {
							try {
								if (document.selection && document.selection.createRange) {
									var range = document.selection.createRange();
									return range.getBookmark().charCodeAt(2) - 2;
								}
								if (input.setSelectionRange) {
									return input.selectionStart;
								}
							} catch (e) {
								return 0;
							}
						},
						setCaretPos = function (node, pos) {
							node = (typeof node === "string" || node instanceof String) ? document.getElementById(node) : node;
							if (!node) {
								return false;
							}
							if (node.createTextRange) {
								var textRange = node.createTextRange();
								textRange.collapse(true);
								textRange.moveEnd('character', pos);
								textRange.moveStart('character', pos);
								textRange.select();
								return true;
							}
							if (node.setSelectionRange) {
								node.setSelectionRange(pos, pos);
								return true;
							}
							return false;
						},
						isValidValue = function (mask, value) {
							var reg = mask
								.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
								.replace(/_/g, '{digit+}')
								.replace(/([0-9]{1})/g, '{digit$1}')
								.replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
								.replace(/\{digit[\+]\}/g, '[0-9_]{1}');
							return (new RegExp(reg)).test(value);
						};
					input.off('keydown.xdsoft');

					if (options.mask === true) {
						options.mask = options.format
							.replace(/Y/g, '9999')
							.replace(/F/g, '9999')
							.replace(/m/g, '19')
							.replace(/d/g, '39')
							.replace(/H/g, '29')
							.replace(/i/g, '59')
							.replace(/s/g, '59');
					}

					if ($.type(options.mask) === 'string') {
						if (!isValidValue(options.mask, input.val())) {
							input.val(options.mask.replace(/[0-9]/g, '_'));
						}

						input.on('keydown.xdsoft', function (event) {
							var val = this.value,
								key = event.which,
								pos,
								digit;

							if (((key >= KEY0 && key <= KEY9) || (key >= _KEY0 && key <= _KEY9)) || (key === BACKSPACE || key === DEL)) {
								pos = getCaretPos(this);
								digit = (key !== BACKSPACE && key !== DEL) ? String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key) : '_';

								if ((key === BACKSPACE || key === DEL) && pos) {
									pos -= 1;
									digit = '_';
								}

								while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
									pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
								}

								val = val.substr(0, pos) + digit + val.substr(pos + 1);
								if ($.trim(val) === '') {
									val = options.mask.replace(/[0-9]/g, '_');
								} else {
									if (pos === options.mask.length) {
										event.preventDefault();
										return false;
									}
								}

								pos += (key === BACKSPACE || key === DEL) ? 0 : 1;
								while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
									pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
								}

								if (isValidValue(options.mask, val)) {
									this.value = val;
									setCaretPos(this, pos);
								} else if ($.trim(val) === '') {
									this.value = options.mask.replace(/[0-9]/g, '_');
								} else {
									input.trigger('error_input.xdsoft');
								}
							} else {
								if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
									return true;
								}
							}

							event.preventDefault();
							return false;
						});
					}
				}
				if (options.validateOnBlur) {
					input
						.off('blur.xdsoft')
						.on('blur.xdsoft', function () {
						  if (options.allowBlank && !$.trim($(this).val()).length) {
							$(this).val(null);
							datetimepicker.data('xdsoft_datetime').empty();
						  } else if (!Date.parseDate($(this).val(), options.format)) {
							var splittedHours   = +([$(this).val()[0], $(this).val()[1]].join('')),
								splittedMinutes = +([$(this).val()[2], $(this).val()[3]].join(''));

							// parse the numbers as 0312 => 03:12
							if(!options.datepicker && options.timepicker && splittedHours >= 0 && splittedHours < 24 && splittedMinutes >= 0 && splittedMinutes < 60) {
							  $(this).val([splittedHours, splittedMinutes].map(function(item) {
								return item > 9 ? item : '0' + item
							  }).join(':'));
							} else {
							  $(this).val((_xdsoft_datetime.now()).dateFormat(options.format));
							}

							datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
						  } else {
							datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
						  }

						  datetimepicker.trigger('changedatetime.xdsoft');
						});
				}
				options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

				datetimepicker
					.trigger('xchange.xdsoft')
					.trigger('afterOpen.xdsoft');
			};

			datetimepicker
				.data('options', options)
				.on('mousedown.xdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
					yearselect.hide();
					monthselect.hide();
					return false;
				});

			//scroll_element = timepicker.find('.xdsoft_time_box');
			timeboxparent.append(timebox);
			timeboxparent.xdsoftScroller();

			datetimepicker.on('afterOpen.xdsoft', function () {
				timeboxparent.xdsoftScroller();
			});

			datetimepicker
				.append(datepicker)
				.append(timepicker);				

			if (options.withoutCopyright !== true) {
				datetimepicker
					.append(xdsoft_copyright);
			}

			datepicker
				.append(mounth_picker)
				.append(calendar)
				.append(applyButton);

			$(options.parentID)
				.append(datetimepicker);

			XDSoft_datetime = function () {
				var _this = this;
				_this.now = function (norecursion) {
					var d = new Date(),
						date,
						time;

					if (!norecursion && options.defaultDate) {
						date = _this.strToDate(options.defaultDate);
						d.setFullYear(date.getFullYear());
						d.setMonth(date.getMonth());
						d.setDate(date.getDate());
					}

					if (options.yearOffset) {
						d.setFullYear(d.getFullYear() + options.yearOffset);
					}

					if (!norecursion && options.defaultTime) {
						time = _this.strtotime(options.defaultTime);
						d.setHours(time.getHours());
						d.setMinutes(time.getMinutes());
					}

					return d;
				};

				_this.isValidDate = function (d) {
					if (Object.prototype.toString.call(d) !== "[object Date]") {
						return false;
					}
					return !isNaN(d.getTime());
				};

				_this.setCurrentTime = function (dTime) {
					_this.currentTime = (typeof dTime === 'string') ? _this.strToDateTime(dTime) : _this.isValidDate(dTime) ? dTime : _this.now();
					datetimepicker.trigger('xchange.xdsoft');
				};

				_this.empty = function () {
					_this.currentTime = null;
				};

				_this.getCurrentTime = function (dTime) {
					return _this.currentTime;
				};

				_this.nextMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() + 1,
						year;
					if (month === 12) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
						month = 0;
					}

					year = _this.currentTime.getFullYear();

					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);

					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.prevMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() - 1;
					if (month === -1) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
						month = 11;
					}
					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.getWeekOfYear = function (datetime) {
					var onejan = new Date(datetime.getFullYear(), 0, 1);
					return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
				};

				_this.strToDateTime = function (sDateTime) {
					var tmpDate = [], timeOffset, currentTime;

					if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
						return sDateTime;
					}

					tmpDate = /^(\+|\-)(.*)$/.exec(sDateTime);
					if (tmpDate) {
						tmpDate[2] = Date.parseDate(tmpDate[2], options.formatDate);
					}
					if (tmpDate  && tmpDate[2]) {
						timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
						currentTime = new Date((_xdsoft_datetime.now()).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
					} else {
						currentTime = sDateTime ? Date.parseDate(sDateTime, options.format) : _this.now();
					}

					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now();
					}

					return currentTime;
				};

				_this.strToDate = function (sDate) {
					if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
						return sDate;
					}

					var currentTime = sDate ? Date.parseDate(sDate, options.formatDate) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.strtotime = function (sTime) {
					if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
						return sTime;
					}
					var currentTime = sTime ? Date.parseDate(sTime, options.formatTime) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.str = function () {
					return _this.currentTime.dateFormat(options.format);
				};
				_this.currentTime = this.now();
			};

			_xdsoft_datetime = new XDSoft_datetime();

			applyButton.on('click', function (e) {//pathbrite
                e.preventDefault();
                datetimepicker.data('changed',true);
                _xdsoft_datetime.setCurrentTime(getCurrentValue());
                input.val(_xdsoft_datetime.str());
                datetimepicker.trigger('close.xdsoft');
            });
			mounth_picker
				.find('.xdsoft_today_button')
				.on('mousedown.xdsoft', function () {
					datetimepicker.data('changed', true);
					_xdsoft_datetime.setCurrentTime(0);
					datetimepicker.trigger('afterOpen.xdsoft');
				}).on('dblclick.xdsoft', function () {
					input.val(_xdsoft_datetime.str());
					datetimepicker.trigger('close.xdsoft');
				});
			mounth_picker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false;

					(function arguments_callee1(v) {
						if ($this.hasClass(options.next)) {
							_xdsoft_datetime.nextMonth();
						} else if ($this.hasClass(options.prev)) {
							_xdsoft_datetime.prevMonth();
						}
						if (options.monthChangeSpinner) {
							if (!stop) {
								timer = setTimeout(arguments_callee1, v || 100);
							}
						}
					}(500));

					$([document.body, window]).on('mouseup.xdsoft', function arguments_callee2() {
						clearTimeout(timer);
						stop = true;
						$([document.body, window]).off('mouseup.xdsoft', arguments_callee2);
					});
				});

			timepicker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false,
						period = 110;
					(function arguments_callee4(v) {
						var pheight = timeboxparent[0].clientHeight,
							height = timebox[0].offsetHeight,
							top = Math.abs(parseInt(timebox.css('marginTop'), 10));
						if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
							timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
						} else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
							timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
						}
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox.css('marginTop'), 10) / (height - pheight))]);
						period = (period > 10) ? 10 : period - 10;
						if (!stop) {
							timer = setTimeout(arguments_callee4, v || period);
						}
					}(500));
					$([document.body, window]).on('mouseup.xdsoft', function arguments_callee5() {
						clearTimeout(timer);
						stop = true;
						$([document.body, window])
							.off('mouseup.xdsoft', arguments_callee5);
					});
				});

			xchangeTimer = 0;
			// base handler - generating a calendar and timepicker
			datetimepicker
				.on('xchange.xdsoft', function (event) {
					clearTimeout(xchangeTimer);
					xchangeTimer = setTimeout(function () {

						if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						}

						var table =	'',
							start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
							i = 0,
							j,
							today = _xdsoft_datetime.now(),
							maxDate = false,
							minDate = false,
							d,
							y,
							m,
							w,
							classes = [],
							customDateSettings,
							newRow = true,
							time = '',
							h = '',
							line_time;

						while (start.getDay() !== options.dayOfWeekStart) {
							start.setDate(start.getDate() - 1);
						}

						table += '<table><thead><tr>';

						if (options.weeks) {
							table += '<th></th>';
						}

						for (j = 0; j < 7; j += 1) {
							table += '<th>' + options.i18n[options.lang].dayOfWeek[(j + options.dayOfWeekStart) % 7] + '</th>';
						}

						table += '</tr></thead>';
						table += '<tbody>';

						if (options.maxDate !== false) {
							maxDate = _xdsoft_datetime.strToDate(options.maxDate);
							maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
						}

						if (options.minDate !== false) {
							minDate = _xdsoft_datetime.strToDate(options.minDate);
							minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
						}

						while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
							classes = [];
							i += 1;

							d = start.getDate();
							y = start.getFullYear();
							m = start.getMonth();
							w = _xdsoft_datetime.getWeekOfYear(start);

							classes.push('xdsoft_date');

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
								customDateSettings = options.beforeShowDay.call(datetimepicker, start);
							} else {
								customDateSettings = null;
							}

							if ((maxDate !== false && start > maxDate) || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
								classes.push('xdsoft_disabled');
							} else if (options.disabledDates.indexOf(start.dateFormat(options.formatDate)) !== -1) {
								classes.push('xdsoft_disabled');
							}

							if (customDateSettings && customDateSettings[1] !== "") {
								classes.push(customDateSettings[1]);
							}

							if (_xdsoft_datetime.currentTime.getMonth() !== m) {
								classes.push('xdsoft_other_month');
							}

							if ((options.defaultSelect || datetimepicker.data('changed')) && _xdsoft_datetime.currentTime.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
								classes.push('xdsoft_current');
							}

							if (today.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
								classes.push('xdsoft_today');
							}

							if (start.getDay() === 0 || start.getDay() === 6 || ~options.weekends.indexOf(start.dateFormat(options.formatDate))) {
								classes.push('xdsoft_weekend');
							}

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
								classes.push(options.beforeShowDay(start));
							}

							if (newRow) {
								table += '<tr>';
								newRow = false;
								if (options.weeks) {
									table += '<th>' + w + '</th>';
								}
							}

							table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '">' +
										'<div>' + d + '</div>' +
									'</td>';

							if (start.getDay() === options.dayOfWeekStartPrev) {
								table += '</tr>';
								newRow = true;
							}

							start.setDate(d + 1);
						}
						table += '</tbody></table>';

						calendar.html(table);

						mounth_picker.find('.xdsoft_label span').eq(0).text(options.i18n[options.lang].months[_xdsoft_datetime.currentTime.getMonth()]);
						mounth_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

						// generate timebox
						time = '';
						h = '';
						m = '';
						line_time = function line_time(h, m) {
							var now = _xdsoft_datetime.now();
							now.setHours(h);
							h = parseInt(now.getHours(), 10);
							now.setMinutes(m);
							m = parseInt(now.getMinutes(), 10);
							var optionDateTime = new Date(_xdsoft_datetime.currentTime);
							optionDateTime.setHours(h);
							optionDateTime.setMinutes(m);
							classes = [];
							if((options.minDateTime !== false && options.minDateTime > optionDateTime) || (options.maxTime !== false && _xdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _xdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
								classes.push('xdsoft_disabled');
							}

							var current_time = new Date(_xdsoft_datetime.currentTime);
							current_time.setHours(parseInt(_xdsoft_datetime.currentTime.getHours(), 10));
							current_time.setMinutes(Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step);

							if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && current_time.getHours() === parseInt(h, 10) && (options.step > 59 || current_time.getMinutes() === parseInt(m, 10))) {
								if (options.defaultSelect || datetimepicker.data('changed')) {
									classes.push('xdsoft_current');
								} else if (options.initTime) {
									classes.push('xdsoft_init_time');
								}
							}
							if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
								classes.push('xdsoft_today');
							}
							time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + now.dateFormat(options.formatTime) + '</div>';
						};

						if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
							for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
								for (j = 0; j < 60; j += options.step) {
									h = (i < 10 ? '0' : '') + i;
									m = (j < 10 ? '0' : '') + j;
									line_time(h, m);
								}
							}
						} else {
							for (i = 0; i < options.allowTimes.length; i += 1) {
								h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
								m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
								line_time(h, m);
							}
						}

						timebox.html(time);

						opt = '';
						i = 0;

						for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
						}
						yearselect.children().eq(0)
												.html(opt);

						for (i = parseInt(options.monthStart), opt = ''; i <= parseInt(options.monthEnd); i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[options.lang].months[i] + '</div>';
						}
						monthselect.children().eq(0).html(opt);
						$(datetimepicker)
							.trigger('generate.xdsoft');
					}, 10);
					event.stopPropagation();
				})
				.on('afterOpen.xdsoft', function () {
					if (options.timepicker) {
						var classType, pheight, height, top;
						if (timebox.find('.xdsoft_current').length) {
							classType = '.xdsoft_current';
						} else if (timebox.find('.xdsoft_init_time').length) {
							classType = '.xdsoft_init_time';
						}
						if (classType) {
							pheight = timeboxparent[0].clientHeight;
							height = timebox[0].offsetHeight;
							top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
							if ((height - pheight) < top) {
								top = height - pheight;
							}
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
						} else {
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
						}
					}
				});

			timerclick = 0;
			calendar
				.on('click.xdsoft', 'td', function (xdevent) {
					xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
					timerclick += 1;
					var $this = $(this),
						currentTime = _xdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						currentTime = _xdsoft_datetime.currentTime;
					}

					if ($this.hasClass('xdsoft_disabled')) {
						return false;
					}

					currentTime.setDate(1);
					currentTime.setFullYear($this.data('year'));
					currentTime.setMonth($this.data('month'));
					currentTime.setDate($this.data('date'));

					datetimepicker.trigger('select.xdsoft', [currentTime]);

					input.val(_xdsoft_datetime.str());
					if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === 0 && !options.timepicker))) && !options.inline) {
						datetimepicker.trigger('close.xdsoft');
					}

					if (options.onSelectDate &&	$.isFunction(options.onSelectDate)) {
						options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
					}

					datetimepicker.data('changed', true);
					datetimepicker.trigger('xchange.xdsoft');
					datetimepicker.trigger('changedatetime.xdsoft');
					setTimeout(function () {
						timerclick = 0;
					}, 200);
				});

			timebox
				.on('click.xdsoft', 'div', function (xdevent) {
					xdevent.stopPropagation();
					var $this = $(this),
						currentTime = _xdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						currentTime = _xdsoft_datetime.currentTime;
					}

					if ($this.hasClass('xdsoft_disabled')) {
						return false;
					}
					currentTime.setHours($this.data('hour'));
					currentTime.setMinutes($this.data('minute'));
					datetimepicker.trigger('select.xdsoft', [currentTime]);

					datetimepicker.data('input').val(_xdsoft_datetime.str());

                    if (options.inline !== true && options.closeOnTimeSelect === true) {
                        datetimepicker.trigger('close.xdsoft');
                    }

					if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
						options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
					}
					datetimepicker.data('changed', true);
					datetimepicker.trigger('xchange.xdsoft');
					datetimepicker.trigger('changedatetime.xdsoft');
				});


			datepicker
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollMonth) {
						return true;
					}
					if (event.deltaY < 0) {
						_xdsoft_datetime.nextMonth();
					} else {
						_xdsoft_datetime.prevMonth();
					}
					return false;
				});

			input
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollInput) {
						return true;
					}
					if (!options.datepicker && options.timepicker) {
						current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
						if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
							current_time_index += event.deltaY;
						}
						if (timebox.children().eq(current_time_index).length) {
							timebox.children().eq(current_time_index).trigger('mousedown');
						}
						return false;
					}
					if (options.datepicker && !options.timepicker) {
						datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
						if (input.val) {
							input.val(_xdsoft_datetime.str());
						}
						datetimepicker.trigger('changedatetime.xdsoft');
						return false;
					}
				});

			datetimepicker
				.on('changedatetime.xdsoft', function (event) {
					if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
						var $input = datetimepicker.data('input');
						options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input, event);
						delete options.value;
						$input.trigger('change');
					}
				})
				.on('generate.xdsoft', function () {
					if (options.onGenerate && $.isFunction(options.onGenerate)) {
						options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					if (triggerAfterOpen) {
						datetimepicker.trigger('afterOpen.xdsoft');
						triggerAfterOpen = false;
					}
				})
				.on('click.xdsoft', function (xdevent) {
					xdevent.stopPropagation();
				});

			current_time_index = 0;

			setPos = function () {
				var offset = datetimepicker.data('input').offset(), top = offset.top + datetimepicker.data('input')[0].offsetHeight - 1, left = offset.left, position = "absolute";
				if (options.fixed) {
					top -= $(window).scrollTop();
					left -= $(window).scrollLeft();
					position = "fixed";
				} else {
					if (top + datetimepicker[0].offsetHeight > $(window).height() + $(window).scrollTop()) {
						top = offset.top - datetimepicker[0].offsetHeight + 1;
					}
					if (top < 0) {
						top = 0;
					}
					if (left + datetimepicker[0].offsetWidth > $(window).width()) {
						left = $(window).width() - datetimepicker[0].offsetWidth;
					}
				}
				datetimepicker.css({
					left: left,
					top: top,
					position: position
				});
			};
			datetimepicker
				.on('open.xdsoft', function (event) {
					var onShow = true;
					if (options.onShow && $.isFunction(options.onShow)) {
						onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onShow !== false) {
						datetimepicker.show();
						setPos();
						$(window)
							.off('resize.xdsoft', setPos)
							.on('resize.xdsoft', setPos);

						if (options.closeOnWithoutClick) {
							$([document.body, window]).on('mousedown.xdsoft', function arguments_callee6() {
								datetimepicker.trigger('close.xdsoft');
								$([document.body, window]).off('mousedown.xdsoft', arguments_callee6);
							});
						}
					}
				})
				.on('close.xdsoft', function (event) {
					var onClose = true;
					mounth_picker
						.find('.xdsoft_month,.xdsoft_year')
							.find('.xdsoft_select')
								.hide();
					if (options.onClose && $.isFunction(options.onClose)) {
						onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onClose !== false && !options.opened && !options.inline) {
						datetimepicker.hide();
					}
					event.stopPropagation();
				})
				.on('toggle.xdsoft', function (event) {
					if (datetimepicker.is(':visible')) {
						datetimepicker.trigger('close.xdsoft');
					} else {
						datetimepicker.trigger('open.xdsoft');
					}
				})
				.data('input', input);

			timer = 0;
			timer1 = 0;

			datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
			datetimepicker.setOptions(options);

			function getCurrentValue() {

				var ct = false, time;

				if (options.startDate) {
					ct = _xdsoft_datetime.strToDate(options.startDate);
				} else {
					ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
					if (ct) {
						ct = _xdsoft_datetime.strToDateTime(ct);
					} else if (options.defaultDate) {
						ct = _xdsoft_datetime.strToDate(options.defaultDate);
						if (options.defaultTime) {
							time = _xdsoft_datetime.strtotime(options.defaultTime);
							ct.setHours(time.getHours());
							ct.setMinutes(time.getMinutes());
						}
					}
				}

				if (ct && _xdsoft_datetime.isValidDate(ct)) {
					datetimepicker.data('changed', true);
				} else {
					ct = '';
				}

				return ct || 0;
			}

			_xdsoft_datetime.setCurrentTime(getCurrentValue());

			input
				.data('xdsoft_datetimepicker', datetimepicker)
				.on('open.xdsoft focusin.xdsoft mousedown.xdsoft', function (event) {
					if (input.is(':disabled') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
						return;
					}
					clearTimeout(timer);
					timer = setTimeout(function () {
						if (input.is(':disabled')) {
							return;
						}

						triggerAfterOpen = true;
						_xdsoft_datetime.setCurrentTime(getCurrentValue());

						datetimepicker.trigger('open.xdsoft');
					}, 100);
				})
				.on('keydown.xdsoft', function (event) {
					var val = this.value, elementSelector,
						key = event.which;
					if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
						elementSelector = $("input:visible,textarea:visible");
						datetimepicker.trigger('close.xdsoft');
						elementSelector.eq(elementSelector.index(this) + 1).focus();
						return false;
					}
					if ([TAB].indexOf(key) !== -1) {
						datetimepicker.trigger('close.xdsoft');
						return true;
					}
				});
		};
		destroyDateTimePicker = function (input) {
			var datetimepicker = input.data('xdsoft_datetimepicker');
			if (datetimepicker) {
				datetimepicker.data('xdsoft_datetime', null);
				datetimepicker.remove();
				input
					.data('xdsoft_datetimepicker', null)
					.off('.xdsoft');
				$(window).off('resize.xdsoft');
				$([window, document.body]).off('mousedown.xdsoft');
				if (input.unmousewheel) {
					input.unmousewheel();
				}
			}
		};
		$(document)
			.off('keydown.xdsoftctrl keyup.xdsoftctrl')
			.on('keydown.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = true;
				}
			})
			.on('keyup.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = false;
				}
			});
		return this.each(function () {
			var datetimepicker = $(this).data('xdsoft_datetimepicker');
			if (datetimepicker) {
				if ($.type(opt) === 'string') {
					switch (opt) {
					case 'show':
						$(this).select().focus();
						datetimepicker.trigger('open.xdsoft');
						break;
					case 'hide':
						datetimepicker.trigger('close.xdsoft');
						break;
					case 'toggle':
						datetimepicker.trigger('toggle.xdsoft');
						break;
					case 'destroy':
						destroyDateTimePicker($(this));
						break;
					case 'reset':
						this.value = this.defaultValue;
						if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(Date.parseDate(this.value, options.format))) {
							datetimepicker.data('changed', false);
						}
						datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
						break;
					case 'validate':
						var $input = datetimepicker.data('input');
						$input.trigger('blur.xdsoft');
						break;
					}
				} else {
					datetimepicker
						.setOptions(opt);
				}
				return 0;
			}
			if ($.type(opt) !== 'string') {
				if (!options.lazyInit || options.open || options.inline) {
					createDateTimePicker($(this));
				} else {
					lazyInit($(this));
				}
			}
		});
	};
	$.fn.datetimepicker.defaults = default_options;
}(jQuery));
(function () {

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

// Parse and Format Library
//http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/
/*
 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, version 2.1.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 */
Date.parseFunctions={count:0};Date.parseRegexes=[];Date.formatFunctions={count:0};Date.prototype.dateFormat=function(b){if(b=="unixtime"){return parseInt(this.getTime()/1000);}if(Date.formatFunctions[b]==null){Date.createNewFormat(b);}var a=Date.formatFunctions[b];return this[a]();};Date.createNewFormat=function(format){var funcName="format"+Date.formatFunctions.count++;Date.formatFunctions[format]=funcName;var codePrefix="Date.prototype."+funcName+" = function() {return ";var code="";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else{if(special){special=false;code+="'"+String.escape(ch)+"' + ";}else{code+=Date.getFormatCode(ch);}}}if(code.length==0){code="\"\"";}else{code=code.substring(0,code.length-3);}eval(codePrefix+code+";}");};Date.getFormatCode=function(a){switch(a){case"d":return"String.leftPad(this.getDate(), 2, '0') + ";case"D":return"Date.dayNames[this.getDay()].substring(0, 3) + ";case"j":return"this.getDate() + ";case"l":return"Date.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"this.getWeekOfYear() + ";case"F":return"Date.monthNames[this.getMonth()] + ";case"m":return"String.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"Date.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"String.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"String.leftPad(this.getHours(), 2, '0') + ";case"i":return"String.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"String.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"this.getGMTOffset() + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+String.escape(a)+"' + ";}};Date.parseDate=function(a,c){if(c=="unixtime"){return new Date(!isNaN(parseInt(a))?parseInt(a)*1000:0);}if(Date.parseFunctions[c]==null){Date.createParser(c);}var b=Date.parseFunctions[c];return Date[b](a);};Date.createParser=function(format){var funcName="parse"+Date.parseFunctions.count++;var regexNum=Date.parseRegexes.length;var currentGroup=1;Date.parseFunctions[format]=funcName;var code="Date."+funcName+" = function(input) {\nvar y = -1, m = -1, d = -1, h = -1, i = -1, s = -1, z = -1;\nvar d = new Date();\ny = d.getFullYear();\nm = d.getMonth();\nd = d.getDate();\nvar results = input.match(Date.parseRegexes["+regexNum+"]);\nif (results && results.length > 0) {";var regex="";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true;}else{if(special){special=false;regex+=String.escape(ch);}else{obj=Date.formatCodeToRegex(ch,currentGroup);currentGroup+=obj.g;regex+=obj.s;if(obj.g&&obj.c){code+=obj.c;}}}}code+="if (y > 0 && z > 0){\nvar doyDate = new Date(y,0);\ndoyDate.setDate(z);\nm = doyDate.getMonth();\nd = doyDate.getDate();\n}";code+="if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0 && s >= 0)\n{return new Date(y, m, d, h, i, s);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0 && i >= 0)\n{return new Date(y, m, d, h, i);}\nelse if (y > 0 && m >= 0 && d > 0 && h >= 0)\n{return new Date(y, m, d, h);}\nelse if (y > 0 && m >= 0 && d > 0)\n{return new Date(y, m, d);}\nelse if (y > 0 && m >= 0)\n{return new Date(y, m);}\nelse if (y > 0)\n{return new Date(y);}\n}return null;}";Date.parseRegexes[regexNum]=new RegExp("^"+regex+"$");eval(code);};Date.formatCodeToRegex=function(b,a){switch(b){case"D":return{g:0,c:null,s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};case"j":case"d":return{g:1,c:"d = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"l":return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"};case"S":return{g:0,c:null,s:"(?:st|nd|rd|th)"};case"w":return{g:0,c:null,s:"\\d"};case"z":return{g:1,c:"z = parseInt(results["+a+"], 10);\n",s:"(\\d{1,3})"};case"W":return{g:0,c:null,s:"(?:\\d{2})"};case"F":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"].substring(0, 3)], 10);\n",s:"("+Date.monthNames.join("|")+")"};case"M":return{g:1,c:"m = parseInt(Date.monthNumbers[results["+a+"]], 10);\n",s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};case"n":case"m":return{g:1,c:"m = parseInt(results["+a+"], 10) - 1;\n",s:"(\\d{1,2})"};case"t":return{g:0,c:null,s:"\\d{1,2}"};case"L":return{g:0,c:null,s:"(?:1|0)"};case"Y":return{g:1,c:"y = parseInt(results["+a+"], 10);\n",s:"(\\d{4})"};case"y":return{g:1,c:"var ty = parseInt(results["+a+"], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"};case"a":return{g:1,c:"if (results["+a+"] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(am|pm)"};case"A":return{g:1,c:"if (results["+a+"] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",s:"(AM|PM)"};case"g":case"G":case"h":case"H":return{g:1,c:"h = parseInt(results["+a+"], 10);\n",s:"(\\d{1,2})"};case"i":return{g:1,c:"i = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"s":return{g:1,c:"s = parseInt(results["+a+"], 10);\n",s:"(\\d{2})"};case"O":return{g:0,c:null,s:"[+-]\\d{4}"};case"T":return{g:0,c:null,s:"[A-Z]{3}"};case"Z":return{g:0,c:null,s:"[+-]\\d{1,5}"};default:return{g:0,c:null,s:String.escape(b)};}};Date.prototype.getTimezone=function(){return this.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3");};Date.prototype.getGMTOffset=function(){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())/60),2,"0")+String.leftPad(Math.abs(this.getTimezoneOffset())%60,2,"0");};Date.prototype.getDayOfYear=function(){var a=0;Date.daysInMonth[1]=this.isLeapYear()?29:28;for(var b=0;b<this.getMonth();++b){a+=Date.daysInMonth[b];}return a+this.getDate();};Date.prototype.getWeekOfYear=function(){var b=this.getDayOfYear()+(4-this.getDay());var a=new Date(this.getFullYear(),0,1);var c=(7-a.getDay()+4);return String.leftPad(Math.ceil((b-c)/7)+1,2,"0");};Date.prototype.isLeapYear=function(){var a=this.getFullYear();return((a&3)==0&&(a%100||(a%400==0&&a)));};Date.prototype.getFirstDayOfMonth=function(){var a=(this.getDay()-(this.getDate()-1))%7;return(a<0)?(a+7):a;};Date.prototype.getLastDayOfMonth=function(){var a=(this.getDay()+(Date.daysInMonth[this.getMonth()]-this.getDate()))%7;return(a<0)?(a+7):a;};Date.prototype.getDaysInMonth=function(){Date.daysInMonth[1]=this.isLeapYear()?29:28;return Date.daysInMonth[this.getMonth()];};Date.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};String.escape=function(a){return a.replace(/('|\\)/g,"\\$1");};String.leftPad=function(d,b,c){var a=new String(d);if(c==null){c=" ";}while(a.length<b){a=c+a;}return a;};Date.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];Date.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];Date.dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Date.y2kYear=50;Date.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};Date.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};
}());
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */

(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */

(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];
        
        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);                        
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });
    
    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);
/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */

(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);

jQuery.Isotope.prototype._getMasonryGutterColumns=function(){var gutter=this.options.masonry&&this.options.masonry.gutterWidth||0;containerWidth=this.element.width();this.masonry.columnWidth=this.options.masonry&&this.options.masonry.columnWidth||this.$filteredAtoms.outerWidth(true)||containerWidth;this.masonry.columnWidth+=gutter;this.masonry.cols=Math.floor((containerWidth+gutter)/this.masonry.columnWidth);this.masonry.cols=Math.max(this.masonry.cols,1)};
jQuery.Isotope.prototype._masonryReset=function(){this.masonry={};this._getMasonryGutterColumns();var i=this.masonry.cols;this.masonry.colYs=[];while(i--)this.masonry.colYs.push(0)};jQuery.Isotope.prototype._masonryResizeChanged=function(){var prevSegments=this.masonry.cols;this._getMasonryGutterColumns();return this.masonry.cols!==prevSegments};
/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */


(function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click", buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical? this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip= this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext= g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}); !this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display", "block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast= this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt, "0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this, c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0}, get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible): null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1): this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)), c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g): this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<= this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."); this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&& !this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)}; this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped= !1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&& this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext), this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev), c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState= a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst, this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!== null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")}, dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments, 1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);
(function(e){e.fn.meanmenu=function(n){var a={meanMenuTarget:jQuery(this),meanMenuContainer:"body",meanMenuClose:"X",meanMenuCloseSize:"18px",meanMenuOpen:"<span /><span /><span />",meanRevealPosition:"right",meanRevealPositionDistance:"0",meanRevealColour:"",meanRevealHoverColour:"",meanScreenWidth:"480",meanNavPush:"",meanShowChildren:!0,meanExpandableChildren:!0,meanExpand:"+",meanContract:"-",meanRemoveAttrs:!1},n=e.extend(a,n);return currentWidth=window.innerWidth||document.documentElement.clientWidth,this.each(function(){function e(){if("center"==s){var e=window.innerWidth||document.documentElement.clientWidth,n=e/2-22+"px";meanRevealPos="left:"+n+";right:auto;",g?jQuery(".meanmenu-reveal").animate({left:n}):jQuery(".meanmenu-reveal").css("left",n)}}function a(){jQuery($navreveal).is(".meanmenu-reveal.meanclose")?$navreveal.html(m):$navreveal.html(o)}function t(){jQuery(".mean-bar,.mean-push").remove(),jQuery(u).removeClass("mean-container"),jQuery(i).show(),menuOn=!1,meanMenuExist=!1}function r(){if(h>=currentWidth){meanMenuExist=!0,jQuery(u).addClass("mean-container"),jQuery(".mean-container").prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+meanStyles+'">Show Navigation</a><nav class="mean-nav" onClick="funtoScroll(this, event);"></nav></div>');var e=jQuery(i).html();jQuery(".mean-nav").html(e),f&&jQuery("nav.mean-nav *").each(function(){jQuery(this).removeAttr("class"),jQuery(this).removeAttr("id")}),jQuery(i).before('<div class="mean-push" />'),jQuery(".mean-push").css("margin-top",d),jQuery(i).hide(),jQuery(".meanmenu-reveal").show(),jQuery(y).html(o),$navreveal=jQuery(y),jQuery(".mean-nav ul").hide(),meanShowChildren?meanExpandableChildren?(jQuery(".mean-nav ul ul").each(function(){jQuery(this).children().length&&jQuery(this,"li:first").parent().append('<a class="mean-expand" href="#" style="font-size: '+l+'">'+j+"</a>")}),jQuery(".mean-expand").on("click",function(e){e.preventDefault(),jQuery(this).hasClass("mean-clicked")?(jQuery(this).text(j),jQuery(this).prev("ul").slideUp(300,function(){})):(jQuery(this).text(Q),jQuery(this).prev("ul").slideDown(300,function(){})),jQuery(this).toggleClass("mean-clicked")})):jQuery(".mean-nav ul ul").show():jQuery(".mean-nav ul ul").hide(),jQuery(".mean-nav ul li").last().addClass("mean-last"),$navreveal.removeClass("meanclose"),jQuery($navreveal).click(function(e){e.preventDefault(),0==menuOn?($navreveal.css("text-align","center"),$navreveal.css("text-indent","0"),$navreveal.css("font-size",l),jQuery(".mean-nav ul:first").slideDown(),menuOn=!0):(jQuery(".mean-nav ul:first").slideUp(),menuOn=!1),$navreveal.toggleClass("meanclose"),a()})}else t()}var i=n.meanMenuTarget,u=n.meanMenuContainer;n.meanReveal;var m=n.meanMenuClose,l=n.meanMenuCloseSize,o=n.meanMenuOpen,s=n.meanRevealPosition,v=n.meanRevealPositionDistance,c=n.meanRevealColour;n.meanRevealHoverColour;var h=n.meanScreenWidth,d=n.meanNavPush,y=".meanmenu-reveal";meanShowChildren=n.meanShowChildren,meanExpandableChildren=n.meanExpandableChildren;var j=n.meanExpand,Q=n.meanContract,f=n.meanRemoveAttrs;if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Blackberry/i)||navigator.userAgent.match(/Windows Phone/i))var g=!0;(navigator.userAgent.match(/MSIE 8/i)||navigator.userAgent.match(/MSIE 7/i))&&jQuery("html").css("overflow-y","scroll"),menuOn=!1,meanMenuExist=!1,"right"==s&&(meanRevealPos="right:"+v+";left:auto;"),"left"==s&&(meanRevealPos="left:"+v+";right:auto;"),e(),meanStyles="background:"+c+";color:"+c+";"+meanRevealPos,g||jQuery(window).resize(function(){currentWidth=window.innerWidth||document.documentElement.clientWidth,currentWidth>h?t():t(),h>=currentWidth?(r(),e()):t()}),window.onorientationchange=function(){e(),currentWidth=window.innerWidth||document.documentElement.clientWidth,currentWidth>=h&&t(),h>=currentWidth&&0==meanMenuExist&&r()},r()})}})(jQuery);
/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 2.2.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */


;(function($, window, document, undefined){

	// our plugin constructor
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$nav = this.$elem.find('a');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	// the plugin prototype
	OnePageNav.prototype = {
		defaults: {
			currentClass: 'current',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollOffset: 0,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},

		init: function() {
			var self = this;
			
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			self.config = $.extend({}, self.defaults, self.options, self.metadata);
			
			//Filter any links out of the nav
			if(self.config.filter !== '') {
				self.$nav = self.$nav.filter(self.config.filter);
			}
			
			//Handle clicks on the nav
			self.$nav.on('click.onePageNav', $.proxy(self.handleClick, self));

			//Get the section positions
			self.getPositions();
			
			//Handle scroll changes
			self.bindInterval();
			
			//Update the positions on resize too
			self.$win.on('resize.onePageNav', $.proxy(self.getPositions, self));

			return this;
		},
		
		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},
		
		bindInterval: function() {
			var self = this;
			var docHeight;
			
			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});
			
			self.t = setInterval(function() {
				docHeight = self.$doc.height();
				
				//If it was scrolled
				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}
				
				//If the document height changes
				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},
		
		getHash: function($link) {
			return $link.attr('href').split('#')[1];
		},
		
		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;
			var $target;
			
			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);

				if($target.length) {
					topPos = $target.offset().top;
					self.sections[linkHref] = Math.round(topPos) - self.config.scrollOffset;
				}
			});
		},
		
		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}
			
			return returnValue;
		},
		
		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);
			
			if(!$parent.hasClass(self.config.currentClass)) {
				//Start callback
				if(self.config.begin) {
					self.config.begin();
				}
				
				//Change the highlighted nav item
				self.adjustNav(self, $parent);
				
				//Removing the auto-adjust on scroll
				self.unbindInterval();
				
				//Scroll to the correct position
				$.scrollTo(newLoc, self.config.scrollSpeed, {
					axis: 'y',
					easing: self.config.easing,
					offset: {
						top: -self.config.scrollOffset
					},
					onAfter: function() {
						//Do we need to change the hash?
						if(self.config.changeHash) {
							window.location.hash = newLoc;
						}
						
						//Add the auto-adjust on scroll back in
						self.bindInterval();
						
						//End callback
						if(self.config.end) {
							self.config.end();
						}
					}
				});
			}

			e.preventDefault();
		},
		
		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;
			
			//If the position is set
			if(position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();
				
				//If it's not already the current section
				if(!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);
					
					//If there is a scrollChange callback
					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},
		
		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init();
		});
	};
	
})( jQuery, window , document );
/* jquery.nicescroll 3.0.0 InuYaksa*2012 MIT http://areaaperta.com/nicescroll */
(function(d){var s=false,w=false,B=5E3,C=2E3,D=function(){var d=document.getElementsByTagName("script"),d=d[d.length-1].src.split("?")[0];return d.split("/").length>0?d.split("/").slice(0,-1).join("/")+"/":""}(),q=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||false,r=window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||
window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||false,x=false,E=function(){if(x)return x;var d=document.createElement("DIV"),c={haspointerlock:"pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document};c.isopera="opera"in window;c.isopera12=c.isopera&&"getUserMedia"in navigator;c.isie="all"in document&&"attachEvent"in d&&!c.isopera;c.isieold=c.isie&&!("msInterpolationMode"in d.style);c.isie7=c.isie&&!c.isieold&&(!("documentMode"in
document)||document.documentMode==7);c.isie8=c.isie&&"documentMode"in document&&document.documentMode==8;c.isie9=c.isie&&"performance"in window&&document.documentMode>=9;c.isie10=c.isie&&"performance"in window&&document.documentMode>=10;c.isie9mobile=/iemobile.9/i.test(navigator.userAgent);if(c.isie9mobile)c.isie9=false;c.isie7mobile=!c.isie9mobile&&c.isie7&&/iemobile/i.test(navigator.userAgent);c.ismozilla="MozAppearance"in d.style;c.iswebkit="WebkitAppearance"in d.style;c.ischrome="chrome"in window;
c.ischrome22=c.ischrome&&c.haspointerlock;c.cantouch="ontouchstart"in document.documentElement;c.hasmstouch=window.navigator.msPointerEnabled||false;c.ismac=/^mac$/i.test(navigator.platform);c.isios=c.cantouch&&/iphone|ipad|ipod/i.test(navigator.platform);c.isios4=c.isios&&!("seal"in Object);c.isandroid=/android/i.test(navigator.userAgent);c.trstyle=false;c.hastransform=false;c.hastranslate3d=false;c.transitionstyle=false;c.hastransition=false;c.transitionend=false;for(var h=["transform","msTransform",
"webkitTransform","MozTransform","OTransform"],i=0;i<h.length;i++)if(typeof d.style[h[i]]!="undefined"){c.trstyle=h[i];break}c.hastransform=c.trstyle!=false;if(c.hastransform)d.style[c.trstyle]="translate3d(1px,2px,3px)",c.hastranslate3d=/translate3d/.test(d.style[c.trstyle]);c.transitionstyle=false;c.prefixstyle="";c.transitionend=false;for(var h="transition,webkitTransition,MozTransition,OTransition,OTransition,msTransition,KhtmlTransition".split(","),b=",-webkit-,-moz-,-o-,-o,-ms-,-khtml-".split(","),
o="transitionend,webkitTransitionEnd,transitionend,otransitionend,oTransitionEnd,msTransitionEnd,KhtmlTransitionEnd".split(","),i=0;i<h.length;i++)if(h[i]in d.style){c.transitionstyle=h[i];c.prefixstyle=b[i];c.transitionend=o[i];break}c.hastransition=c.transitionstyle;a:{h=["-moz-grab","-webkit-grab","grab"];if(c.ischrome&&!c.ischrome22||c.isie)h=[];for(i=0;i<h.length;i++)if(b=h[i],d.style.cursor=b,d.style.cursor==b){h=b;break a}h="url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"}c.cursorgrabvalue=
h;c.hasmousecapture="setCapture"in d;return x=c},F=function(j,c){function h(f,c,g){c=f.css(c);f=parseFloat(c);return isNaN(f)?(f=p[c]||0,g=f==3?g?b.win.outerHeight()-b.win.innerHeight():b.win.outerWidth()-b.win.innerWidth():1,b.isie8&&f&&(f+=1),g?f:0):f}function i(f,c){var g=0,e=0;if("wheelDeltaY"in f)g=Math.floor(f.wheelDeltaX/2),e=Math.floor(f.wheelDeltaY/2);else{var d=f.detail?f.detail*-1:f.wheelDelta/40;d&&(c?g=Math.floor(d*b.opt.mousescrollstep):e=Math.floor(d*b.opt.mousescrollstep))}g&&(b.scrollmom&&
b.scrollmom.stop(),b.lastdeltax+=g,b.synched("mousewheelx",function(){var f=b.lastdeltax;b.lastdeltax=0;b.rail.drag||b.doScrollLeftBy(f)}));e&&(b.scrollmom&&b.scrollmom.stop(),b.lastdeltay+=e,b.synched("mousewheely",function(){var f=b.lastdeltay;b.lastdeltay=0;b.rail.drag||b.doScrollBy(f)}))}var b=this;this.version="3.0.0";this.name="nicescroll";this.me=c;this.opt={doc:d("body"),win:false,zindex:9E3,cursoropacitymin:0,cursoropacitymax:1,cursorcolor:"#424242",cursorwidth:"5px",cursorborder:"1px solid #fff",
cursorborderradius:"5px",scrollspeed:60,mousescrollstep:24,touchbehavior:false,hwacceleration:true,usetransition:true,boxzoom:false,dblclickzoom:true,gesturezoom:true,grabcursorenabled:true,autohidemode:true,background:"",iframeautoresize:true,cursorminheight:32,preservenativescrolling:true,railoffset:false,bouncescroll:true,spacebarenabled:true,railpadding:{top:0,right:0,left:0,bottom:0},disableoutline:true,horizrailenabled:true,railalign:"right",railvalign:"bottom",enabletranslate3d:true,enablemousewheel:true,
enablekeyboard:true,smoothscroll:true,sensitiverail:true};this.opt.snapbackspeed=80;if(j)for(var o in b.opt)typeof j[o]!="undefined"&&(b.opt[o]=j[o]);this.iddoc=(this.doc=b.opt.doc)&&this.doc[0]?this.doc[0].id||"":"";this.ispage=/BODY|HTML/.test(b.opt.win?b.opt.win[0].nodeName:this.doc[0].nodeName);this.haswrapper=b.opt.win!==false;this.win=b.opt.win||(this.ispage?d(window):this.doc);this.docscroll=this.ispage&&!this.haswrapper?d(window):this.win;this.body=d("body");this.iframe=this.isfixed=false;
this.isiframe=this.doc[0].nodeName=="IFRAME"&&this.win[0].nodeName=="IFRAME";this.istextarea=this.win[0].nodeName=="TEXTAREA";this.forcescreen=false;this.canshowonmouseevent=b.opt.autohidemode!="scroll";this.page=this.view=this.onzoomout=this.onzoomin=this.onscrollcancel=this.onscrollend=this.onscrollstart=this.onclick=this.ongesturezoom=this.onkeypress=this.onmousewheel=this.onmousemove=this.onmouseup=this.onmousedown=false;this.scroll={x:0,y:0};this.scrollratio={x:0,y:0};this.cursorheight=20;this.scrollvaluemax=
0;this.observer=this.scrollmom=this.scrollrunning=false;do this.id="ascrail"+C++;while(document.getElementById(this.id));this.hasmousefocus=this.hasfocus=this.zoomactive=this.zoom=this.cursorfreezed=this.cursor=this.rail=false;this.visibility=true;this.hidden=this.locked=false;this.cursoractive=true;this.nativescrollingarea=false;this.events=[];this.saved={};this.delaylist={};this.synclist={};this.lastdeltay=this.lastdeltax=0;var e=this.detected=E();this.ishwscroll=(this.canhwscroll=e.hastransform&&
b.opt.hwacceleration)&&b.haswrapper;this.istouchcapable=false;if(e.cantouch&&e.ischrome&&!e.isios&&!e.isandroid)this.istouchcapable=true,e.cantouch=false;if(e.cantouch&&e.ismozilla&&!e.isios)this.istouchcapable=true,e.cantouch=false;this.delayed=function(f,c,g,e){var d=b.delaylist[f],h=(new Date).getTime();if(!e&&d&&d.tt)return false;d&&d.tt&&clearTimeout(d.tt);if(d&&d.last+g>h&&!d.tt)b.delaylist[f]={last:h+g,tt:setTimeout(function(){b.delaylist[f].tt=0;c.call()},g)};else if(!d||!d.tt)b.delaylist[f]=
{last:h,tt:0},setTimeout(function(){c.call()},0)};this.synched=function(f,c){b.synclist[f]=c;(function(){if(!b.onsync)q(function(){b.onsync=false;for(f in b.synclist){var c=b.synclist[f];c&&c.call(b);b.synclist[f]=false}}),b.onsync=true})();return f};this.unsynched=function(f){b.synclist[f]&&(b.synclist[f]=false)};this.css=function(f,c){for(var g in c)b.saved.css.push([f,g,f.css(g)]),f.css(g,c[g])};this.scrollTop=function(f){return typeof f=="undefined"?b.getScrollTop():b.setScrollTop(f)};this.scrollLeft=
function(f){return typeof f=="undefined"?b.getScrollLeft():b.setScrollLeft(f)};BezierClass=function(b,c,g,e,d,h,i){this.st=b;this.ed=c;this.spd=g;this.p1=e||0;this.p2=d||1;this.p3=h||0;this.p4=i||1;this.ts=(new Date).getTime();this.df=this.ed-this.st};BezierClass.prototype={B2:function(b){return 3*b*b*(1-b)},B3:function(b){return 3*b*(1-b)*(1-b)},B4:function(b){return(1-b)*(1-b)*(1-b)},getNow:function(){var b=1-((new Date).getTime()-this.ts)/this.spd,c=this.B2(b)+this.B3(b)+this.B4(b);return b<0?
this.ed:this.st+Math.round(this.df*c)},update:function(b,c){this.st=this.getNow();this.ed=b;this.spd=c;this.ts=(new Date).getTime();this.df=this.ed-this.st;return this}};if(this.ishwscroll){this.doc.translate={x:0,y:0,tx:"0px",ty:"0px"};e.hastranslate3d&&e.isios&&this.doc.css("-webkit-backface-visibility","hidden");var n=function(){var f=b.doc.css(e.trstyle);return f&&f.substr(0,6)=="matrix"?f.replace(/^.*\((.*)\)$/g,"$1").replace(/px/g,"").split(/, +/):false};this.getScrollTop=function(f){if(!f){if(f=
n())return f.length==16?-f[13]:-f[5];if(b.timerscroll&&b.timerscroll.bz)return b.timerscroll.bz.getNow()}return b.doc.translate.y};this.getScrollLeft=function(f){if(!f){if(f=n())return f.length==16?-f[12]:-f[4];if(b.timerscroll&&b.timerscroll.bh)return b.timerscroll.bh.getNow()}return b.doc.translate.x};this.notifyScrollEvent=document.createEvent?function(b){var c=document.createEvent("UIEvents");c.initUIEvent("scroll",false,true,window,1);b.dispatchEvent(c)}:document.fireEvent?function(b){var c=
document.createEventObject();b.fireEvent("onscroll");c.cancelBubble=true}:function(){};e.hastranslate3d&&b.opt.enabletranslate3d?(this.setScrollTop=function(f,c){b.doc.translate.y=f;b.doc.translate.ty=f*-1+"px";b.doc.css(e.trstyle,"translate3d("+b.doc.translate.tx+","+b.doc.translate.ty+",0px)");c||b.notifyScrollEvent(b.win[0])},this.setScrollLeft=function(f,c){b.doc.translate.x=f;b.doc.translate.tx=f*-1+"px";b.doc.css(e.trstyle,"translate3d("+b.doc.translate.tx+","+b.doc.translate.ty+",0px)");c||
b.notifyScrollEvent(b.win[0])}):(this.setScrollTop=function(f,c){b.doc.translate.y=f;b.doc.translate.ty=f*-1+"px";b.doc.css(e.trstyle,"translate("+b.doc.translate.tx+","+b.doc.translate.ty+")");c||b.notifyScrollEvent(b.win[0])},this.setScrollLeft=function(f,c){b.doc.translate.x=f;b.doc.translate.tx=f*-1+"px";b.doc.css(e.trstyle,"translate("+b.doc.translate.tx+","+b.doc.translate.ty+")");c||b.notifyScrollEvent(b.win[0])})}else this.getScrollTop=function(){return b.docscroll.scrollTop()},this.setScrollTop=
function(f){return b.docscroll.scrollTop(f)},this.getScrollLeft=function(){return b.docscroll.scrollLeft()},this.setScrollLeft=function(f){return b.docscroll.scrollLeft(f)};this.getTarget=function(b){return!b?false:b.target?b.target:b.srcElement?b.srcElement:false};this.hasParent=function(b,c){if(!b)return false;for(var g=b.target||b.srcElement||b||false;g&&g.id!=c;)g=g.parentNode||false;return g!==false};var p={thin:1,medium:3,thick:5};this.updateScrollBar=function(f){if(b.ishwscroll)b.rail.css({height:b.win.innerHeight()}),
b.railh&&b.railh.css({width:b.win.innerWidth()});else{var c=b.isfixed?{top:parseFloat(b.win.css("top")),left:parseFloat(b.win.css("left"))}:b.win.offset(),g=c.top,e=c.left;g+=h(b.win,"border-top-width",true);b.win.outerWidth();b.win.innerWidth();e+=b.rail.align?b.win.outerWidth()-h(b.win,"border-right-width")-b.rail.width:h(b.win,"border-left-width");var d=b.opt.railoffset;d&&(d.top&&(g+=d.top),b.rail.align&&d.left&&(e+=d.left));b.locked||b.rail.css({top:g,left:e,height:f?f.h:b.win.innerHeight()});
b.zoom&&b.zoom.css({top:g+1,left:b.rail.align==1?e-20:e+b.rail.width+4});if(b.railh&&!b.locked)g=c.top,e=c.left,f=b.railh.align?g+h(b.win,"border-top-width",true)+b.win.innerHeight()-b.railh.height:g+h(b.win,"border-top-width",true),e+=h(b.win,"border-left-width"),b.railh.css({top:f,left:e,width:b.railh.width})}};this.doRailClick=function(f,c,g){var e;!(b.rail.drag&&b.rail.drag.pt!=1)&&!b.locked&&!b.rail.drag&&(b.cancelScroll(),b.cancelEvent(f),c?(c=g?b.doScrollLeft:b.doScrollTop,e=g?(f.pageX-b.railh.offset().left-
b.cursorwidth/2)*b.scrollratio.x:(f.pageY-b.rail.offset().top-b.cursorheight/2)*b.scrollratio.y,c(e)):(c=g?b.doScrollLeftBy:b.doScrollBy,e=g?b.scroll.x:b.scroll.y,f=g?f.pageX-b.railh.offset().left:f.pageY-b.rail.offset().top,g=g?b.view.w:b.view.h,e>=f?c(g):c(-g)))};b.hasanimationframe=q;b.hascancelanimationframe=r;b.hasanimationframe?b.hascancelanimationframe||(r=function(){b.cancelAnimationFrame=true}):(q=function(b){return setTimeout(b,16)},r=clearInterval);this.init=function(){b.saved.css=[];if(e.isie7mobile)return true;
e.hasmstouch&&b.css(b.ispage?d("html"):b.win,{"-ms-touch-action":"none"});if(!b.ispage||!e.cantouch&&!e.isieold&&!e.isie9mobile){var f=b.docscroll;b.ispage&&(f=b.haswrapper?b.win:b.doc);e.isie9mobile||b.css(f,{"overflow-y":"hidden"});b.ispage&&e.isie7&&(b.doc[0].nodeName=="BODY"?b.css(d("html"),{"overflow-y":"hidden"}):b.doc[0].nodeName=="HTML"&&b.css(d("body"),{"overflow-y":"hidden"}));e.isios&&!b.ispage&&!b.haswrapper&&b.css(d("body"),{"-webkit-overflow-scrolling":"touch"});var c=d(document.createElement("div"));
c.css({position:"relative",top:0,"float":"right",width:b.opt.cursorwidth,height:"0px","background-color":b.opt.cursorcolor,border:b.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":b.opt.cursorborderradius,"-moz-border-radius":b.opt.cursorborderradius,"border-radius":b.opt.cursorborderradius});c.hborder=parseFloat(c.outerHeight()-c.innerHeight());b.cursor=c;var g=d(document.createElement("div"));g.attr("id",b.id);var h,i,j=["left","right"],y;for(y in j)i=j[y],(h=b.opt.railpadding[i])?
g.css("padding-"+i,h+"px"):b.opt.railpadding[i]=0;g.append(c);g.width=Math.max(parseFloat(b.opt.cursorwidth),c.outerWidth())+b.opt.railpadding.left+b.opt.railpadding.right;g.css({width:g.width+"px",zIndex:b.ispage?b.opt.zindex:b.opt.zindex+2,background:b.opt.background});g.visibility=true;g.scrollable=true;g.align=b.opt.railalign=="left"?0:1;b.rail=g;c=b.rail.drag=false;if(b.opt.boxzoom&&!b.ispage&&!e.isieold&&(c=document.createElement("div"),b.bind(c,"click",b.doZoom),b.zoom=d(c),b.zoom.css({cursor:"pointer",
"z-index":b.opt.zindex,backgroundImage:"url("+D+"zoomico.png)",height:18,width:18,backgroundPosition:"0px 0px"}),b.opt.dblclickzoom&&b.bind(b.win,"dblclick",b.doZoom),e.cantouch&&b.opt.gesturezoom))b.ongesturezoom=function(c){c.scale>1.5&&b.doZoomIn(c);c.scale<0.8&&b.doZoomOut(c);return b.cancelEvent(c)},b.bind(b.win,"gestureend",b.ongesturezoom);b.railh=false;if(b.opt.horizrailenabled){b.css(f,{"overflow-x":"hidden"});c=d(document.createElement("div"));c.css({position:"relative",top:0,height:b.opt.cursorwidth,
width:"0px","background-color":b.opt.cursorcolor,border:b.opt.cursorborder,"background-clip":"padding-box","-webkit-border-radius":b.opt.cursorborderradius,"-moz-border-radius":b.opt.cursorborderradius,"border-radius":b.opt.cursorborderradius});c.wborder=parseFloat(c.outerWidth()-c.innerWidth());b.cursorh=c;var k=d(document.createElement("div"));k.attr("id",b.id+"-hr");k.height=1+Math.max(parseFloat(b.opt.cursorwidth),c.outerHeight());k.css({height:k.height+"px",zIndex:b.ispage?b.opt.zindex:b.opt.zindex+
2,background:b.opt.background});k.append(c);k.visibility=true;k.scrollable=true;k.align=b.opt.railvalign=="top"?0:1;b.railh=k;b.railh.drag=false}b.ispage?(g.css({position:"fixed",top:"0px",height:"100%"}),g.align?g.css({right:"0px"}):g.css({left:"0px"}),b.body.append(g),b.railh&&(k.css({position:"fixed",left:"0px",width:"100%"}),k.align?k.css({bottom:"0px"}):k.css({top:"0px"}),b.body.append(k))):(b.ishwscroll?(b.win.css("position")=="static"&&b.css(b.win,{position:"relative"}),f=b.win[0].nodeName==
"HTML"?b.body:b.win,b.zoom&&(b.zoom.css({position:"absolute",top:1,right:0,"margin-right":g.width+4}),f.append(b.zoom)),g.css({position:"absolute",top:0}),g.align?g.css({right:0}):g.css({left:0}),f.append(g),k&&(k.css({position:"absolute",left:0,bottom:0}),k.align?k.css({bottom:0}):k.css({top:0}),f.append(k))):(b.isfixed=b.win.css("position")=="fixed",f=b.isfixed?"fixed":"absolute",g.css({position:f}),b.zoom&&b.zoom.css({position:f}),b.updateScrollBar(),b.body.append(g),b.zoom&&b.body.append(b.zoom),
b.railh&&(k.css({position:f}),b.body.append(k))),e.isios&&b.css(b.win,{"-webkit-tap-highlight-color":"rgba(0,0,0,0)","-webkit-touch-callout":"none"}),e.isie&&b.opt.disableoutline&&b.win.attr("hideFocus","true"),e.iswebkit&&b.opt.disableoutline&&b.win.css({outline:"none"}));if(b.opt.autohidemode===false)b.autohidedom=false;else if(b.opt.autohidemode===true){if(b.autohidedom=d().add(b.rail),b.railh)b.autohidedom=b.autohidedom.add(b.railh)}else if(b.opt.autohidemode=="scroll"){if(b.autohidedom=d().add(b.rail),
b.railh)b.autohidedom=b.autohidedom.add(b.railh)}else if(b.opt.autohidemode=="cursor"){if(b.autohidedom=d().add(b.cursor),b.railh)b.autohidedom=b.autohidedom.add(b.railh.cursor)}else if(b.opt.autohidemode=="hidden")b.autohidedom=false,b.hide(),b.locked=false;if(e.isie9mobile)b.scrollmom=new z(b),b.onmangotouch=function(){var c=b.getScrollTop(),f=b.getScrollLeft();if(c==b.scrollmom.lastscrolly&&f==b.scrollmom.lastscrollx)return true;var g=c-b.mangotouch.sy,e=f-b.mangotouch.sx;if(Math.round(Math.sqrt(Math.pow(e,
2)+Math.pow(g,2)))!=0){var l=g<0?-1:1,d=e<0?-1:1,h=+new Date;b.mangotouch.lazy&&clearTimeout(b.mangotouch.lazy);if(h-b.mangotouch.tm>80||b.mangotouch.dry!=l||b.mangotouch.drx!=d)b.scrollmom.stop(),b.scrollmom.reset(f,c),b.mangotouch.sy=c,b.mangotouch.ly=c,b.mangotouch.sx=f,b.mangotouch.lx=f,b.mangotouch.dry=l,b.mangotouch.drx=d,b.mangotouch.tm=h;else if(b.scrollmom.stop(),b.scrollmom.update(b.mangotouch.sx-e,b.mangotouch.sy-g),b.mangotouch.tm=h,g=Math.max(Math.abs(b.mangotouch.ly-c),Math.abs(b.mangotouch.lx-
f)),b.mangotouch.ly=c,b.mangotouch.lx=f,g>2)b.mangotouch.lazy=setTimeout(function(){b.mangotouch.lazy=false;b.mangotouch.dry=0;b.mangotouch.drx=0;b.mangotouch.tm=0;b.scrollmom.doMomentum(30)},100)}},g=b.getScrollTop(),k=b.getScrollLeft(),b.mangotouch={sy:g,ly:g,dry:0,sx:k,lx:k,drx:0,lazy:false,tm:0},b.bind(b.docscroll,"scroll",b.onmangotouch);else{if(e.cantouch||b.istouchcapable||b.opt.touchbehavior||e.hasmstouch){b.scrollmom=new z(b);b.ontouchstart=function(c){if(c.pointerType&&c.pointerType!=2)return false;
if(!b.locked){if(e.hasmstouch)for(var f=c.target?c.target:false;f;){var g=d(f).getNiceScroll();if(g.length>0&&g[0].me==b.me)break;if(g.length>0)return false;if(f.nodeName=="DIV"&&f.id==b.id)break;f=f.parentNode?f.parentNode:false}b.cancelScroll();if((f=b.getTarget(c))&&/INPUT/i.test(f.nodeName)&&/range/i.test(f.type))return b.stopPropagation(c);if(b.forcescreen)g=c,c={original:c.original?c.original:c},c.clientX=g.screenX,c.clientY=g.screenY;b.rail.drag={x:c.clientX,y:c.clientY,sx:b.scroll.x,sy:b.scroll.y,
st:b.getScrollTop(),sl:b.getScrollLeft(),pt:2};b.opt.touchbehavior&&b.isiframe&&e.isie&&(g=b.win.position(),b.rail.drag.x+=g.left,b.rail.drag.y+=g.top);b.hasmoving=false;b.lastmouseup=false;b.scrollmom.reset(c.clientX,c.clientY);if(!e.cantouch&&!this.istouchcapable&&!e.hasmstouch){if(!f||!/INPUT|SELECT|TEXTAREA/i.test(f.nodeName))return!b.ispage&&e.hasmousecapture&&f.setCapture(),b.cancelEvent(c);if(/SUBMIT|CANCEL|BUTTON/i.test(d(f).attr("type")))pc={tg:f,click:false},b.preventclick=pc}}};b.ontouchend=
function(c){if(c.pointerType&&c.pointerType!=2)return false;if(b.rail.drag&&b.rail.drag.pt==2&&(b.scrollmom.doMomentum(),b.rail.drag=false,b.hasmoving&&(b.hasmoving=false,b.lastmouseup=true,b.hideCursor(),e.hasmousecapture&&document.releaseCapture(),!e.cantouch)))return b.cancelEvent(c)};var o=b.opt.touchbehavior&&b.isiframe&&!e.hasmousecapture;b.ontouchmove=function(c,f){if(c.pointerType&&c.pointerType!=2)return false;if(b.rail.drag&&b.rail.drag.pt==2){if(e.cantouch&&typeof c.original=="undefined")return true;
b.hasmoving=true;if(b.preventclick&&!b.preventclick.click)b.preventclick.click=b.preventclick.tg.onclick||false,b.preventclick.tg.onclick=b.onpreventclick;if(b.forcescreen){var g=c,c={original:c.original?c.original:c};c.clientX=g.screenX;c.clientY=g.screenY}g=ofy=0;if(o&&!f){var l=b.win.position(),g=-l.left;ofy=-l.top}var d=c.clientY+ofy,h=b.rail.drag.st-(d-b.rail.drag.y);if(b.ishwscroll&&b.opt.bouncescroll)h<0?h=Math.round(h/2):h>b.page.maxh&&(h=b.page.maxh+Math.round((h-b.page.maxh)/2));else if(h<
0&&(d=h=0),h>b.page.maxh)h=b.page.maxh,d=0;var i=c.clientX+g;if(b.railh&&b.railh.scrollable){var m=b.rail.drag.sl-(i-b.rail.drag.x);if(b.ishwscroll&&b.opt.bouncescroll)m<0?m=Math.round(m/2):m>b.page.maxw&&(m=b.page.maxw+Math.round((m-b.page.maxw)/2));else if(m<0&&(i=m=0),m>b.page.maxw)m=b.page.maxw,i=0}b.synched("touchmove",function(){b.rail.drag&&b.rail.drag.pt==2&&(b.prepareTransition&&b.prepareTransition(0),b.rail.scrollable&&b.setScrollTop(h),b.scrollmom.update(i,d),b.railh&&b.railh.scrollable?
(b.setScrollLeft(m),b.showCursor(h,m)):b.showCursor(h),e.isie10&&document.selection.clear())});return b.cancelEvent(c)}}}e.cantouch||b.opt.touchbehavior?(b.onpreventclick=function(c){if(b.preventclick)return b.preventclick.tg.onclick=b.preventclick.click,b.preventclick=false,b.cancelEvent(c)},b.onmousedown=b.ontouchstart,b.onmouseup=b.ontouchend,b.onclick=e.isios?false:function(c){return b.lastmouseup?(b.lastmouseup=false,b.cancelEvent(c)):true},b.onmousemove=b.ontouchmove,e.cursorgrabvalue&&(b.css(b.ispage?
b.doc:b.win,{cursor:e.cursorgrabvalue}),b.css(b.rail,{cursor:e.cursorgrabvalue}))):(b.onmousedown=function(c,f){if(!(b.rail.drag&&b.rail.drag.pt!=1)){if(b.locked)return b.cancelEvent(c);b.cancelScroll();b.rail.drag={x:c.clientX,y:c.clientY,sx:b.scroll.x,sy:b.scroll.y,pt:1,hr:!!f};var g=b.getTarget(c);!b.ispage&&e.hasmousecapture&&g.setCapture();if(b.isiframe&&!e.hasmousecapture)b.saved.csspointerevents=b.doc.css("pointer-events"),b.css(b.doc,{"pointer-events":"none"});return b.cancelEvent(c)}},b.onmouseup=
function(c){if(b.rail.drag&&(e.hasmousecapture&&document.releaseCapture(),b.isiframe&&!e.hasmousecapture&&b.doc.css("pointer-events",b.saved.csspointerevents),b.rail.drag.pt==1))return b.rail.drag=false,b.cancelEvent(c)},b.onmousemove=function(c){if(b.rail.drag){if(b.rail.drag.pt==1){if(e.ischrome&&c.which==0)return b.onmouseup(c);b.cursorfreezed=true;if(b.rail.drag.hr){b.scroll.x=b.rail.drag.sx+(c.clientX-b.rail.drag.x);if(b.scroll.x<0)b.scroll.x=0;var f=b.scrollvaluemaxw;if(b.scroll.x>f)b.scroll.x=
f}else{b.scroll.y=b.rail.drag.sy+(c.clientY-b.rail.drag.y);if(b.scroll.y<0)b.scroll.y=0;f=b.scrollvaluemax;if(b.scroll.y>f)b.scroll.y=f}b.synched("mousemove",function(){b.rail.drag&&b.rail.drag.pt==1&&(b.showCursor(),b.rail.drag.hr?b.doScrollLeft(Math.round(b.scroll.x*b.scrollratio.x)):b.doScrollTop(Math.round(b.scroll.y*b.scrollratio.y)))});return b.cancelEvent(c)}}else b.checkarea=true});(e.cantouch||b.opt.touchbehavior)&&b.bind(b.win,"mousedown",b.onmousedown);e.hasmstouch&&(b.css(b.rail,{"-ms-touch-action":"none"}),
b.css(b.cursor,{"-ms-touch-action":"none"}),b.bind(b.win,"MSPointerDown",b.ontouchstart),b.bind(document,"MSPointerUp",b.ontouchend),b.bind(document,"MSPointerMove",b.ontouchmove),b.bind(b.cursor,"MSGestureHold",function(b){b.preventDefault()}),b.bind(b.cursor,"contextmenu",function(b){b.preventDefault()}));this.istouchcapable&&(b.bind(b.win,"touchstart",b.ontouchstart),b.bind(document,"touchend",b.ontouchend),b.bind(document,"touchmove",b.ontouchmove));b.bind(b.cursor,"mousedown",b.onmousedown);
b.bind(b.cursor,"mouseup",b.onmouseup);b.railh&&(b.bind(b.cursorh,"mousedown",function(c){b.onmousedown(c,true)}),b.bind(b.cursorh,"mouseup",function(c){if(!(b.rail.drag&&b.rail.drag.pt==2))return b.rail.drag=false,b.hasmoving=false,b.hideCursor(),e.hasmousecapture&&document.releaseCapture(),b.cancelEvent(c)}));b.bind(document,"mouseup",b.onmouseup);e.hasmousecapture&&b.bind(b.win,"mouseup",b.onmouseup);b.bind(document,"mousemove",b.onmousemove);b.onclick&&b.bind(document,"click",b.onclick);!e.cantouch&&
!b.opt.touchbehavior&&(b.rail.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=true}),b.rail.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()}),b.opt.sensitiverail&&(b.rail.click(function(c){b.doRailClick(c,false,false)}),b.rail.dblclick(function(c){b.doRailClick(c,true,false)}),b.cursor.click(function(c){b.cancelEvent(c)}),b.cursor.dblclick(function(c){b.cancelEvent(c)})),b.railh&&(b.railh.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=
true}),b.railh.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()})),b.zoom&&(b.zoom.mouseenter(function(){b.canshowonmouseevent&&b.showCursor();b.rail.active=true}),b.zoom.mouseleave(function(){b.rail.active=false;b.rail.drag||b.hideCursor()})));b.opt.enablemousewheel&&(b.isiframe||b.bind(e.isie&&b.ispage?document:b.docscroll,"mousewheel",b.onmousewheel),b.bind(b.rail,"mousewheel",b.onmousewheel),b.railh&&b.bind(b.railh,"mousewheel",b.onmousewheelhr));!b.ispage&&!e.cantouch&&!/HTML|BODY/.test(b.win[0].nodeName)&&
(b.win.attr("tabindex")||b.win.attr({tabindex:B++}),b.win.focus(function(c){s=b.getTarget(c).id||true;b.hasfocus=true;b.canshowonmouseevent&&b.noticeCursor()}),b.win.blur(function(){s=false;b.hasfocus=false}),b.win.mouseenter(function(c){w=b.getTarget(c).id||true;b.hasmousefocus=true;b.canshowonmouseevent&&b.noticeCursor()}),b.win.mouseleave(function(){w=false;b.hasmousefocus=false}))}b.onkeypress=function(c){if(b.locked&&b.page.maxh==0)return true;var c=c?c:window.e,f=b.getTarget(c);if(f&&/INPUT|TEXTAREA|SELECT|OPTION/.test(f.nodeName)&&
(!f.getAttribute("type")&&!f.type||!/submit|button|cancel/i.tp))return true;if(b.hasfocus||b.hasmousefocus&&!s||b.ispage&&!s&&!w){var f=c.keyCode,g=c.ctrlKey||false;if(b.locked&&f!=27)return b.cancelEvent(c);var e=false;switch(f){case 38:case 63233:b.doScrollBy(72);e=true;break;case 40:case 63235:b.doScrollBy(-72);e=true;break;case 37:case 63232:b.railh&&(g?b.doScrollLeft(0):b.doScrollLeftBy(72),e=true);break;case 39:case 63234:b.railh&&(g?b.doScrollLeft(b.page.maxw):b.doScrollLeftBy(-72),e=true);
break;case 33:case 63276:b.doScrollBy(b.view.h);e=true;break;case 34:case 63277:b.doScrollBy(-b.view.h);e=true;break;case 36:case 63273:b.railh&&g?b.doScrollPos(0,0):b.doScrollTo(0);e=true;break;case 35:case 63275:b.railh&&g?b.doScrollPos(b.page.maxw,b.page.maxh):b.doScrollTo(b.page.maxh);e=true;break;case 32:b.opt.spacebarenabled&&(b.doScrollBy(-b.view.h),e=true);break;case 27:b.zoomactive&&(b.doZoom(),e=true)}if(e)return b.cancelEvent(c)}};b.opt.enablekeyboard&&b.bind(document,e.isopera&&!e.isopera12?
"keypress":"keydown",b.onkeypress);b.bind(window,"resize",b.resize);b.bind(window,"orientationchange",b.resize);b.bind(window,"load",b.resize);if(e.ischrome&&!b.ispage&&!b.haswrapper){var n=b.win.attr("style"),g=parseFloat(b.win.css("width"))+1;b.win.css("width",g);b.synched("chromefix",function(){b.win.attr("style",n)})}b.onAttributeChange=function(){b.lazyResize()};if(!b.ispage&&!b.haswrapper)"WebKitMutationObserver"in window?(b.observer=new WebKitMutationObserver(function(c){c.forEach(b.onAttributeChange)}),
b.observer.observe(b.win[0],{attributes:true,subtree:false})):(b.bind(b.win,e.isie&&!e.isie9?"propertychange":"DOMAttrModified",b.onAttributeChange),e.isie9&&b.win[0].attachEvent("onpropertychange",b.onAttributeChange));!b.ispage&&b.opt.boxzoom&&b.bind(window,"resize",b.resizeZoom);b.istextarea&&b.bind(b.win,"mouseup",b.resize);b.resize()}if(this.doc[0].nodeName=="IFRAME"){var A=function(){b.iframexd=false;try{var c="contentDocument"in this?this.contentDocument:this.contentWindow.document}catch(f){b.iframexd=
true,c=false}if(b.iframexd)return"console"in window&&console.log("NiceScroll error: policy restriced iframe"),true;b.forcescreen=true;if(b.isiframe)b.iframe={doc:d(c),html:b.doc.contents().find("html")[0],body:b.doc.contents().find("body")[0]},b.getContentSize=function(){return{w:Math.max(b.iframe.html.scrollWidth,b.iframe.body.scrollWidth),h:Math.max(b.iframe.html.scrollHeight,b.iframe.body.scrollHeight)}},b.docscroll=d(b.iframe.body);if(!e.isios&&b.opt.iframeautoresize&&!b.isiframe){b.win.scrollTop(0);
b.doc.height("");var g=Math.max(c.getElementsByTagName("html")[0].scrollHeight,c.body.scrollHeight);b.doc.height(g)}b.resize();e.isie7&&b.css(d(b.iframe.html),{"overflow-y":"hidden"});b.css(d(b.iframe.body),{"overflow-y":"hidden"});"contentWindow"in this?b.bind(this.contentWindow,"scroll",b.onscroll):b.bind(c,"scroll",b.onscroll);b.opt.enablemousewheel&&b.bind(c,"mousewheel",b.onmousewheel);b.opt.enablekeyboard&&b.bind(c,e.isopera?"keypress":"keydown",b.onkeypress);if(e.cantouch||b.opt.touchbehavior)b.bind(c,
"mousedown",b.onmousedown),b.bind(c,"mousemove",function(c){b.onmousemove(c,true)}),e.cursorgrabvalue&&b.css(d(c.body),{cursor:e.cursorgrabvalue});b.bind(c,"mouseup",b.onmouseup);b.zoom&&(b.opt.dblclickzoom&&b.bind(c,"dblclick",b.doZoom),b.ongesturezoom&&b.bind(c,"gestureend",b.ongesturezoom))};this.doc[0].readyState&&this.doc[0].readyState=="complete"&&setTimeout(function(){A.call(b.doc[0],false)},500);b.bind(this.doc,"load",A)}};this.showCursor=function(c,e){if(b.cursortimeout)clearTimeout(b.cursortimeout),
b.cursortimeout=0;if(b.rail){if(b.autohidedom)b.autohidedom.stop().css({opacity:b.opt.cursoropacitymax}),b.cursoractive=true;if(typeof c!="undefined"&&c!==false)b.scroll.y=Math.round(c*1/b.scrollratio.y);if(typeof e!="undefined")b.scroll.x=Math.round(e*1/b.scrollratio.x);b.cursor.css({height:b.cursorheight,top:b.scroll.y});if(b.cursorh)!b.rail.align&&b.rail.visibility?b.cursorh.css({width:b.cursorwidth,left:b.scroll.x+b.rail.width}):b.cursorh.css({width:b.cursorwidth,left:b.scroll.x}),b.cursoractive=
true;b.zoom&&b.zoom.stop().css({opacity:b.opt.cursoropacitymax})}};this.hideCursor=function(c){if(!b.cursortimeout&&b.rail&&b.autohidedom)b.cursortimeout=setTimeout(function(){if(!b.rail.active||!b.showonmouseevent)b.autohidedom.stop().animate({opacity:b.opt.cursoropacitymin}),b.zoom&&b.zoom.stop().animate({opacity:b.opt.cursoropacitymin}),b.cursoractive=false;b.cursortimeout=0},c||400)};this.noticeCursor=function(c,e,g){b.showCursor(e,g);b.rail.active||b.hideCursor(c)};this.getContentSize=b.ispage?
function(){return{w:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),h:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)}}:b.haswrapper?function(){return{w:b.doc.outerWidth()+parseInt(b.win.css("paddingLeft"))+parseInt(b.win.css("paddingRight")),h:b.doc.outerHeight()+parseInt(b.win.css("paddingTop"))+parseInt(b.win.css("paddingBottom"))}}:function(){return{w:b.docscroll[0].scrollWidth,h:b.docscroll[0].scrollHeight}};this.onResize=function(c,e){if(!b.win)return false;
if(!b.haswrapper&&!b.ispage)if(b.win.css("display")=="none")return b.visibility&&b.hideRail().hideRailHr(),false;else!b.hidden&&!b.visibility&&b.showRail().showRailHr();var g=b.page.maxh,d=b.page.maxw,h=b.view.w;b.view={w:b.ispage?b.win.width():parseInt(b.win[0].clientWidth),h:b.ispage?b.win.height():parseInt(b.win[0].clientHeight)};b.page=e?e:b.getContentSize();b.page.maxh=Math.max(0,b.page.h-b.view.h);b.page.maxw=Math.max(0,b.page.w-b.view.w);if(b.page.maxh==g&&b.page.maxw==d&&b.view.w==h)if(b.ispage)return b;
else{g=b.win.offset();if(b.lastposition&&(d=b.lastposition,d.top==g.top&&d.left==g.left))return b;b.lastposition=g}b.page.maxh==0?(b.hideRail(),b.scrollvaluemax=0,b.scroll.y=0,b.scrollratio.y=0,b.cursorheight=0,b.setScrollTop(0),b.rail.scrollable=false):b.rail.scrollable=true;b.page.maxw==0?(b.hideRailHr(),b.scrollvaluemaxw=0,b.scroll.x=0,b.scrollratio.x=0,b.cursorwidth=0,b.setScrollLeft(0),b.railh.scrollable=false):b.railh.scrollable=true;b.locked=b.page.maxh==0&&b.page.maxw==0;if(b.locked)return b.ispage||
b.updateScrollBar(b.view),false;!b.hidden&&!b.visibility?b.showRail().showRailHr():!b.hidden&&!b.railh.visibility&&b.showRailHr();b.istextarea&&b.win.css("resize")&&b.win.css("resize")!="none"&&(b.view.h-=20);b.ispage||b.updateScrollBar(b.view);b.cursorheight=Math.min(b.view.h,Math.round(b.view.h*(b.view.h/b.page.h)));b.cursorheight=Math.max(b.opt.cursorminheight,b.cursorheight);b.cursorwidth=Math.min(b.view.w,Math.round(b.view.w*(b.view.w/b.page.w)));b.cursorwidth=Math.max(b.opt.cursorminheight,
b.cursorwidth);b.scrollvaluemax=b.view.h-b.cursorheight-b.cursor.hborder;if(b.railh)b.railh.width=b.page.maxh>0?b.view.w-b.rail.width:b.view.w,b.scrollvaluemaxw=b.railh.width-b.cursorwidth-b.cursorh.wborder;b.scrollratio={x:b.page.maxw/b.scrollvaluemaxw,y:b.page.maxh/b.scrollvaluemax};b.getScrollTop()>b.page.maxh?b.doScroll(b.page.maxh):(b.scroll.y=Math.round(b.getScrollTop()*(1/b.scrollratio.y)),b.scroll.x=Math.round(b.getScrollLeft()*(1/b.scrollratio.x)),b.cursoractive&&b.noticeCursor());b.scroll.y&&
b.getScrollTop()==0&&b.doScrollTo(Math.floor(b.scroll.y*b.scrollratio.y));return b};this.resize=function(){b.delayed("resize",b.onResize,30);return b};this.lazyResize=function(){b.delayed("resize",b.resize,250)};this._bind=function(c,e,g,d){b.events.push({e:c,n:e,f:g,b:d});c.addEventListener?c.addEventListener(e,g,d||false):c.attachEvent?c.attachEvent("on"+e,g):c["on"+e]=g};this.bind=function(c,d,g,h){var i="jquery"in c?c[0]:c;i.addEventListener?(e.cantouch&&/mouseup|mousedown|mousemove/.test(d)&&
b._bind(i,d=="mousedown"?"touchstart":d=="mouseup"?"touchend":"touchmove",function(b){if(b.touches){if(b.touches.length<2){var c=b.touches.length?b.touches[0]:b;c.original=b;g.call(this,c)}}else if(b.changedTouches)c=b.changedTouches[0],c.original=b,g.call(this,c)},h||false),b._bind(i,d,g,h||false),d=="mousewheel"&&b._bind(i,"DOMMouseScroll",g,h||false),e.cantouch&&d=="mouseup"&&b._bind(i,"touchcancel",g,h||false)):b._bind(i,d,function(c){if((c=c||window.event||false)&&c.srcElement)c.target=c.srcElement;
return g.call(i,c)===false||h===false?b.cancelEvent(c):true})};this._unbind=function(b,c,g,e){b.removeEventListener?b.removeEventListener(c,g,e):b.detachEvent?b.detachEvent("on"+c,g):b["on"+c]=false};this.unbindAll=function(){for(var c=0;c<b.events.length;c++){var e=b.events[c];b._unbind(e.e,e.n,e.f,e.b)}};this.cancelEvent=function(b){b=b.original?b.original:b?b:window.event||false;if(!b)return false;b.preventDefault&&b.preventDefault();b.stopPropagation&&b.stopPropagation();b.preventManipulation&&
b.preventManipulation();b.cancelBubble=true;b.cancel=true;return b.returnValue=false};this.stopPropagation=function(b){b=b.original?b.original:b?b:window.event||false;if(!b)return false;if(b.stopPropagation)return b.stopPropagation();if(b.cancelBubble)b.cancelBubble=true;return false};this.showRail=function(){if(b.page.maxh!=0&&(b.ispage||b.win.css("display")!="none"))b.visibility=true,b.rail.visibility=true,b.rail.css("display","block");return b};this.showRailHr=function(){if(!b.railh)return b;if(b.page.maxw!=
0&&(b.ispage||b.win.css("display")!="none"))b.railh.visibility=true,b.railh.css("display","block");return b};this.hideRail=function(){b.visibility=false;b.rail.visibility=false;b.rail.css("display","none");return b};this.hideRailHr=function(){if(!b.railh)return b;b.railh.visibility=false;b.railh.css("display","none");return b};this.show=function(){b.hidden=false;b.locked=false;return b.showRail().showRailHr()};this.hide=function(){b.hidden=true;b.locked=true;return b.hideRail().hideRailHr()};this.remove=
function(){b.doZoomOut();b.unbindAll();b.observer!==false&&b.observer.disconnect();b.events=[];if(b.cursor)b.cursor.remove(),b.cursor=null;if(b.cursorh)b.cursorh.remove(),b.cursorh=null;if(b.rail)b.rail.remove(),b.rail=null;if(b.railh)b.railh.remove(),b.railh=null;if(b.zoom)b.zoom.remove(),b.zoom=null;for(var c=0;c<b.saved.css.length;c++){var e=b.saved.css[c];e[0].css(e[1],typeof e[2]=="undefined"?"":e[2])}b.saved=false;b.me.data("__nicescroll","");b.me=null;b.doc=null;b.docscroll=null;b.win=null;
return b};this.scrollstart=function(c){this.onscrollstart=c;return b};this.scrollend=function(c){this.onscrollend=c;return b};this.scrollcancel=function(c){this.onscrollcancel=c;return b};this.zoomin=function(c){this.onzoomin=c;return b};this.zoomout=function(c){this.onzoomout=c;return b};this.isScrollable=function(b){for(b=b.target?b.target:b;b&&b.nodeType==1&&!/BODY|HTML/.test(b.nodeName);){var c=d(b);if(/scroll|auto/.test(c.css("overflowY")||c.css("overflowX")||c.css("overflow")||""))return b.clientHeight!=
b.scrollHeight;b=b.parentNode?b.parentNode:false}return false};this.onmousewheel=function(c){if(b.locked)return true;if(!b.rail.scrollable)return b.railh&&b.railh.scrollable?b.onmousewheelhr(c):true;if(b.opt.preservenativescrolling&&b.checkarea)b.checkarea=false,b.nativescrollingarea=b.isScrollable(c);if(b.nativescrollingarea)return true;if(b.locked)return b.cancelEvent(c);if(b.rail.drag)return b.cancelEvent(c);i(c,false);return b.cancelEvent(c)};this.onmousewheelhr=function(c){if(b.locked||!b.railh.scrollable)return true;
if(b.opt.preservenativescrolling&&b.checkarea)b.checkarea=false,b.nativescrollingarea=b.isScrollable(c);if(b.nativescrollingarea)return true;if(b.locked)return b.cancelEvent(c);if(b.rail.drag)return b.cancelEvent(c);i(c,true);return b.cancelEvent(c)};this.stop=function(){b.cancelScroll();b.scrollmon&&b.scrollmon.stop();b.cursorfreezed=false;b.scroll.y=Math.round(b.getScrollTop()*(1/b.scrollratio.y));b.noticeCursor();return b};this.getTransitionSpeed=function(c){var e=Math.round(b.opt.scrollspeed*
10),c=Math.min(e,Math.round(c/20*b.opt.scrollspeed));return c>20?c:0};b.opt.smoothscroll?b.ishwscroll&&e.hastransition&&b.opt.usetransition?(this.prepareTransition=function(c,d){var g=d?c>20?c:0:b.getTransitionSpeed(c),h=g?e.prefixstyle+"transform "+g+"ms ease-out":"";if(!b.lasttransitionstyle||b.lasttransitionstyle!=h)b.lasttransitionstyle=h,b.doc.css(e.transitionstyle,h);return g},this.doScrollLeft=function(c,e){var g=b.scrollrunning?b.newscrolly:b.getScrollTop();b.doScrollPos(c,g,e)},this.doScrollTop=
function(c,e){var g=b.scrollrunning?b.newscrollx:b.getScrollLeft();b.doScrollPos(g,c,e)},this.doScrollPos=function(c,d,g){var h=b.getScrollTop(),i=b.getScrollLeft();((b.newscrolly-h)*(d-h)<0||(b.newscrollx-i)*(c-i)<0)&&b.cancelScroll();b.newscrolly=d;b.newscrollx=c;b.newscrollspeed=g||false;if(b.timer)return false;b.timer=setTimeout(function(){var g=b.getScrollTop(),h=b.getScrollLeft(),i,j;i=c-h;j=d-g;i=Math.round(Math.sqrt(Math.pow(i,2)+Math.pow(j,2)));i=b.prepareTransition(b.newscrollspeed?b.newscrollspeed:
i);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);if(i>0){!b.scrollrunning&&b.onscrollstart&&b.onscrollstart.call(b,{type:"scrollstart",current:{x:h,y:g},request:{x:c,y:d},end:{x:b.newscrollx,y:b.newscrolly},speed:i});if(e.transitionend){if(!b.scrollendtrapped)b.scrollendtrapped=true,b.bind(b.doc,e.transitionend,b.onScrollEnd,false)}else b.scrollendtrapped&&clearTimeout(b.scrollendtrapped),b.scrollendtrapped=setTimeout(b.onScrollEnd,i);b.timerscroll={bz:new BezierClass(g,b.newscrolly,
i,0,0,0.58,1),bh:new BezierClass(h,b.newscrollx,i,0,0,0.58,1)};if(!b.cursorfreezed)b.timerscroll.tm=setInterval(function(){b.showCursor(b.getScrollTop(),b.getScrollLeft())},60)}b.synched("doScroll-set",function(){b.timer=0;if(b.scrollendtrapped)b.scrollrunning=true;b.setScrollTop(b.newscrolly);b.setScrollLeft(b.newscrollx);if(!b.scrollendtrapped)b.onScrollEnd()})},50)},this.cancelScroll=function(){if(!b.scrollendtrapped)return true;var c=b.getScrollTop(),d=b.getScrollLeft();b.scrollrunning=false;
e.transitionend||clearTimeout(e.transitionend);b.scrollendtrapped=false;b._unbind(b.doc,e.transitionend,b.onScrollEnd);b.prepareTransition(0);b.setScrollTop(c);b.railh&&b.setScrollLeft(d);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);b.timerscroll=false;b.cursorfreezed=false;b.showCursor(c,d);return b},this.onScrollEnd=function(){b.scrollendtrapped&&b._unbind(b.doc,e.transitionend,b.onScrollEnd);b.scrollendtrapped=false;b.prepareTransition(0);b.timerscroll&&b.timerscroll.tm&&clearInterval(b.timerscroll.tm);
b.timerscroll=false;var c=b.getScrollTop(),d=b.getScrollLeft();b.setScrollTop(c);b.railh&&b.setScrollLeft(d);b.noticeCursor(false,c,d);b.cursorfreezed=false;if(c<0)c=0;else if(c>b.page.maxh)c=b.page.maxh;if(d<0)d=0;else if(d>b.page.maxw)d=b.page.maxw;if(c!=b.newscrolly||d!=b.newscrollx)return b.doScrollPos(d,c,b.opt.snapbackspeed);b.onscrollend&&b.scrollrunning&&b.onscrollend.call(b,{type:"scrollend",current:{x:d,y:c},end:{x:b.newscrollx,y:b.newscrolly}});b.scrollrunning=false}):(this.doScrollLeft=
function(c){var e=b.scrollrunning?b.newscrolly:b.getScrollTop();b.doScrollPos(c,e)},this.doScrollTop=function(c){var e=b.scrollrunning?b.newscrollx:b.getScrollLeft();b.doScrollPos(e,c)},this.doScrollPos=function(c,e){function g(){if(b.cancelAnimationFrame)return true;b.scrollrunning=true;if(o=1-o)return b.timer=q(g)||1;var c=0,f=sy=b.getScrollTop();if(b.dst.ay){var f=b.bzscroll?b.dst.py+b.bzscroll.getNow()*b.dst.ay:b.newscrolly,e=f-sy;if(e<0&&f<b.newscrolly||e>0&&f>b.newscrolly)f=b.newscrolly;b.setScrollTop(f);
f==b.newscrolly&&(c=1)}else c=1;var d=sx=b.getScrollLeft();if(b.dst.ax){d=b.bzscroll?b.dst.px+b.bzscroll.getNow()*b.dst.ax:b.newscrollx;e=d-sx;if(e<0&&d<b.newscrollx||e>0&&d>b.newscrollx)d=b.newscrollx;b.setScrollLeft(d);d==b.newscrollx&&(c+=1)}else c+=1;if(c==2){b.timer=0;b.cursorfreezed=false;b.bzscroll=false;b.scrollrunning=false;if(f<0)f=0;else if(f>b.page.maxh)f=b.page.maxh;if(d<0)d=0;else if(d>b.page.maxw)d=b.page.maxw;d!=b.newscrollx||f!=b.newscrolly?b.doScrollPos(d,f):b.onscrollend&&b.onscrollend.call(b,
{type:"scrollend",current:{x:sx,y:sy},end:{x:b.newscrollx,y:b.newscrolly}})}else b.timer=q(g)||1}e=typeof e=="undefined"||e===false?b.getScrollTop(true):e;if(b.timer&&b.newscrolly==e&&b.newscrollx==c)return true;b.timer&&r(b.timer);b.timer=0;var d=b.getScrollTop(),h=b.getScrollLeft();((b.newscrolly-d)*(e-d)<0||(b.newscrollx-h)*(c-h)<0)&&b.cancelScroll();b.newscrolly=e;b.newscrollx=c;if(!b.bouncescroll||!b.rail.visibility)if(b.newscrolly<0)b.newscrolly=0;else if(b.newscrolly>b.page.maxh)b.newscrolly=
b.page.maxh;if(!b.bouncescroll||!b.railh.visibility)if(b.newscrollx<0)b.newscrollx=0;else if(b.newscrollx>b.page.maxw)b.newscrollx=b.page.maxw;b.dst={};b.dst.x=c-h;b.dst.y=e-d;b.dst.px=h;b.dst.py=d;var i=Math.round(Math.sqrt(Math.pow(b.dst.x,2)+Math.pow(b.dst.y,2)));b.dst.ax=b.dst.x/i;b.dst.ay=b.dst.y/i;var j=0,k=i;if(b.dst.x==0)j=d,k=e,b.dst.ay=1,b.dst.py=0;else if(b.dst.y==0)j=h,k=c,b.dst.ax=1,b.dst.px=0;i=b.getTransitionSpeed(i);b.bzscroll=i>0?b.bzscroll?b.bzscroll.update(k,i):new BezierClass(j,
k,i,0,1,0,1):false;if(!b.timer){(d==b.page.maxh&&e>=b.page.maxh||h==b.page.maxw&&c>=b.page.maxw)&&b.checkContentSize();var o=1;b.cancelAnimationFrame=false;b.timer=1;b.onscrollstart&&!b.scrollrunning&&b.onscrollstart.call(b,{type:"scrollstart",current:{x:h,y:d},request:{x:c,y:e},end:{x:b.newscrollx,y:b.newscrolly},speed:i});g();(d==b.page.maxh&&e>=d||h==b.page.maxw&&c>=h)&&b.checkContentSize();b.noticeCursor()}},this.cancelScroll=function(){b.timer&&r(b.timer);b.timer=0;b.bzscroll=false;b.scrollrunning=
false;return b}):(this.doScrollLeft=function(c,e){var g=b.getScrollTop();b.doScrollPos(c,g,e)},this.doScrollTop=function(c,e){var g=b.getScrollLeft();b.doScrollPos(g,c,e)},this.doScrollPos=function(c,e){var g=c>b.page.maxw?b.page.maxw:c;g<0&&(g=0);var d=e>b.page.maxh?b.page.maxh:e;d<0&&(d=0);b.synched("scroll",function(){b.setScrollTop(d);b.setScrollLeft(g)})},this.cancelScroll=function(){});this.doScrollBy=function(c,e){var d=0,d=e?Math.floor((b.scroll.y-c)*b.scrollratio.y):(b.timer?b.newscrolly:
b.getScrollTop(true))-c;if(b.bouncescroll){var h=Math.round(b.view.h/2);d<-h?d=-h:d>b.page.maxh+h&&(d=b.page.maxh+h)}b.cursorfreezed=false;py=b.getScrollTop(true);if(d<0&&py<=0)return b.noticeCursor();else if(d>b.page.maxh&&py>=b.page.maxh)return b.checkContentSize(),b.noticeCursor();b.doScrollTop(d)};this.doScrollLeftBy=function(c,e){var d=0,d=e?Math.floor((b.scroll.x-c)*b.scrollratio.x):(b.timer?b.newscrollx:b.getScrollLeft(true))-c;if(b.bouncescroll){var h=Math.round(b.view.w/2);d<-h?d=-h:d>b.page.maxw+
h&&(d=b.page.maxw+h)}b.cursorfreezed=false;px=b.getScrollLeft(true);if(d<0&&px<=0)return b.noticeCursor();else if(d>b.page.maxw&&px>=b.page.maxw)return b.noticeCursor();b.doScrollLeft(d)};this.doScrollTo=function(c,e){e&&Math.round(c*b.scrollratio.y);b.cursorfreezed=false;b.doScrollTop(c)};this.checkContentSize=function(){var c=b.getContentSize();(c.h!=b.page.h||c.w!=b.page.w)&&b.resize(false,c)};b.onscroll=function(){b.rail.drag||b.cursorfreezed||b.synched("scroll",function(){b.scroll.y=Math.round(b.getScrollTop()*
(1/b.scrollratio.y));if(b.railh)b.scroll.x=Math.round(b.getScrollLeft()*(1/b.scrollratio.x));b.noticeCursor()})};b.bind(b.docscroll,"scroll",b.onscroll);this.doZoomIn=function(c){if(!b.zoomactive){b.zoomactive=true;b.zoomrestore={style:{}};var h="position,top,left,zIndex,backgroundColor,marginTop,marginBottom,marginLeft,marginRight".split(","),g=b.win[0].style,i;for(i in h){var j=h[i];b.zoomrestore.style[j]=typeof g[j]!="undefined"?g[j]:""}b.zoomrestore.style.width=b.win.css("width");b.zoomrestore.style.height=
b.win.css("height");b.zoomrestore.padding={w:b.win.outerWidth()-b.win.width(),h:b.win.outerHeight()-b.win.height()};if(e.isios4)b.zoomrestore.scrollTop=d(window).scrollTop(),d(window).scrollTop(0);b.win.css({position:e.isios4?"absolute":"fixed",top:0,left:0,"z-index":b.opt.zindex+100,margin:"0px"});h=b.win.css("backgroundColor");(h==""||/transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(h))&&b.win.css("backgroundColor","#fff");b.rail.css({"z-index":b.opt.zindex+110});b.zoom.css({"z-index":b.opt.zindex+
112});b.zoom.css("backgroundPosition","0px -18px");b.resizeZoom();b.onzoomin&&b.onzoomin.call(b);return b.cancelEvent(c)}};this.doZoomOut=function(c){if(b.zoomactive)return b.zoomactive=false,b.win.css("margin",""),b.win.css(b.zoomrestore.style),e.isios4&&d(window).scrollTop(b.zoomrestore.scrollTop),b.rail.css({"z-index":b.ispage?b.opt.zindex:b.opt.zindex+2}),b.zoom.css({"z-index":b.opt.zindex}),b.zoomrestore=false,b.zoom.css("backgroundPosition","0px 0px"),b.onResize(),b.onzoomout&&b.onzoomout.call(b),
b.cancelEvent(c)};this.doZoom=function(c){return b.zoomactive?b.doZoomOut(c):b.doZoomIn(c)};this.resizeZoom=function(){if(b.zoomactive){var c=b.getScrollTop();b.win.css({width:d(window).width()-b.zoomrestore.padding.w+"px",height:d(window).height()-b.zoomrestore.padding.h+"px"});b.onResize();b.setScrollTop(Math.min(b.page.maxh,c))}};this.init();d.nicescroll.push(this)},z=function(d){var c=this;this.nc=d;this.steptime=this.lasttime=this.speedy=this.speedx=this.lasty=this.lastx=0;this.snapy=this.snapx=
false;this.demuly=this.demulx=0;this.lastscrolly=this.lastscrollx=-1;this.timer=this.chky=this.chkx=0;this.time=function(){return+new Date};this.reset=function(d,i){c.stop();var b=c.time();c.steptime=0;c.lasttime=b;c.speedx=0;c.speedy=0;c.lastx=d;c.lasty=i;c.lastscrollx=-1;c.lastscrolly=-1};this.update=function(d,i){var b=c.time();c.steptime=b-c.lasttime;c.lasttime=b;var b=i-c.lasty,j=d-c.lastx,e=c.nc.getScrollTop(),n=c.nc.getScrollLeft();e+=b;n+=j;c.snapx=n<0||n>c.nc.page.maxw;c.snapy=e<0||e>c.nc.page.maxh;
c.speedx=j;c.speedy=b;c.lastx=d;c.lasty=i};this.stop=function(){c.nc.unsynched("domomentum2d");c.timer&&clearTimeout(c.timer);c.timer=0;c.lastscrollx=-1;c.lastscrolly=-1};this.doSnapy=function(d,i){var b=false;if(i<0)i=0,b=true;else if(i>c.nc.page.maxh)i=c.nc.page.maxh,b=true;if(d<0)d=0,b=true;else if(d>c.nc.page.maxw)d=c.nc.page.maxw,b=true;b&&c.nc.doScrollPos(d,i,c.nc.opt.snapbackspeed)};this.doMomentum=function(d){var i=c.time(),b=d?i+d:c.lasttime,d=c.nc.getScrollLeft(),j=c.nc.getScrollTop(),e=
c.nc.page.maxh,n=c.nc.page.maxw;c.speedx=n>0?Math.min(60,c.speedx):0;c.speedy=e>0?Math.min(60,c.speedy):0;b=b&&i-b<=50;if(j<0||j>e||d<0||d>n)b=false;d=c.speedx&&b?c.speedx:false;if(c.speedy&&b&&c.speedy||d){var p=Math.max(16,c.steptime);p>50&&(d=p/50,c.speedx*=d,c.speedy*=d,p=50);c.demulxy=0;c.lastscrollx=c.nc.getScrollLeft();c.chkx=c.lastscrollx;c.lastscrolly=c.nc.getScrollTop();c.chky=c.lastscrolly;var f=c.lastscrollx,l=c.lastscrolly,g=function(){var b=c.time()-i>600?0.04:0.02;if(c.speedx&&(f=Math.floor(c.lastscrollx-
c.speedx*(1-c.demulxy)),c.lastscrollx=f,f<0||f>n))b=0.1;if(c.speedy&&(l=Math.floor(c.lastscrolly-c.speedy*(1-c.demulxy)),c.lastscrolly=l,l<0||l>e))b=0.1;c.demulxy=Math.min(1,c.demulxy+b);c.nc.synched("domomentum2d",function(){if(c.speedx)c.nc.getScrollLeft()!=c.chkx&&c.stop(),c.chkx=f,c.nc.setScrollLeft(f);if(c.speedy)c.nc.getScrollTop()!=c.chky&&c.stop(),c.chky=l,c.nc.setScrollTop(l);c.timer||(c.nc.hideCursor(),c.doSnapy(f,l))});c.demulxy<1?c.timer=setTimeout(g,p):(c.stop(),c.nc.hideCursor(),c.doSnapy(f,
l))};g()}else c.doSnapy(c.nc.getScrollLeft(),c.nc.getScrollTop())}},t=d.fn.scrollTop;d.cssHooks.pageYOffset={get:function(j){var c=d.data(j,"__nicescroll")||false;return c&&c.ishwscroll?c.getScrollTop():t.call(j)},set:function(j,c){var h=d.data(j,"__nicescroll")||false;h&&h.ishwscroll?h.setScrollTop(parseInt(c)):t.call(j,c);return this}};d.fn.scrollTop=function(j){if(typeof j=="undefined"){var c=this[0]?d.data(this[0],"__nicescroll")||false:false;return c&&c.ishwscroll?c.getScrollTop():t.call(this)}else return this.each(function(){var c=
d.data(this,"__nicescroll")||false;c&&c.ishwscroll?c.setScrollTop(parseInt(j)):t.call(d(this),j)})};var u=d.fn.scrollLeft;d.cssHooks.pageXOffset={get:function(j){var c=d.data(j,"__nicescroll")||false;return c&&c.ishwscroll?c.getScrollLeft():u.call(j)},set:function(j,c){var h=d.data(j,"__nicescroll")||false;h&&h.ishwscroll?h.setScrollLeft(parseInt(c)):u.call(j,c);return this}};d.fn.scrollLeft=function(j){if(typeof j=="undefined"){var c=this[0]?d.data(this[0],"__nicescroll")||false:false;return c&&
c.ishwscroll?c.getScrollLeft():u.call(this)}else return this.each(function(){var c=d.data(this,"__nicescroll")||false;c&&c.ishwscroll?c.setScrollLeft(parseInt(j)):u.call(d(this),j)})};var v=function(j){var c=this;this.length=0;this.name="nicescrollarray";this.each=function(d){for(var b=0;b<c.length;b++)d.call(c[b]);return c};this.push=function(d){c[c.length]=d;c.length++};this.eq=function(d){return c[d]};if(j)for(a=0;a<j.length;a++){var h=d.data(j[a],"__nicescroll")||false;h&&(this[this.length]=h,
this.length++)}return this};(function(d,c,h){for(var i=0;i<c.length;i++)h(d,c[i])})(v.prototype,"show,hide,onResize,resize,remove,stop,doScrollPos".split(","),function(d,c){d[c]=function(){var d=arguments;return this.each(function(){this[c].apply(this,d)})}});d.fn.getNiceScroll=function(j){return typeof j=="undefined"?new v(this):d.data(this[j],"__nicescroll")||false};d.extend(d.expr[":"],{nicescroll:function(j){return d.data(j,"__nicescroll")?true:false}});d.fn.niceScroll=function(j,c){typeof c==
"undefined"&&typeof j=="object"&&!("jquery"in j)&&(c=j,j=false);var h=new v;typeof c=="undefined"&&(c={});if(j)c.doc=d(j),c.win=d(this);var i=!("doc"in c);if(!i&&!("win"in c))c.win=d(this);this.each(function(){var b=d(this).data("__nicescroll")||false;if(!b)c.doc=i?d(this):c.doc,b=new F(c,d(this)),d(this).data("__nicescroll",b);h.push(b)});return h.length==1?h[0]:h};window.NiceScroll={getjQuery:function(){return d}};if(!d.nicescroll)d.nicescroll=new v})(jQuery);
/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/


(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);
/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.5
------------------------------------------------------------------------- */

(function($) {
	$.prettyPhoto = {version: '3.1.5'};
	
	$.fn.prettyPhoto = function(pp_settings) {
		pp_settings = jQuery.extend({
			hook: 'data-gal', /* the attribute tag to use for prettyPhoto hooks. default: 'rel'. For HTML5, use "data-rel" or similar. */
			animation_speed: 'fast', /* fast/slow/normal */
			ajaxcallback: function() {},
			slideshow: 5000, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			allow_expand: true, /* Allow the user to expand a resized image. true/false */
			default_width: 500,
			default_height: 344,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			horizontal_padding: 20, /* The padding on each side of the picture */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			deeplinking: true, /* Allow prettyPhoto to update the url to enable deeplinking. */
			overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			overlay_gallery_max: 30, /* Maximum number of pictures in the overlay gallery */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			changepicturecallback: function(){}, /* Called everytime an item is shown/changed */
			callback: function(){}, /* Called when prettyPhoto is closed */
			ie6_fallback: true,
			markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<p class="pp_description"></p> \
											<div class="pp_social">{pp_social}</div> \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
			gallery_markup: '<div class="pp_gallery"> \
								<a href="#" class="pp_arrow_previous">Previous</a> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
								<a href="#" class="pp_arrow_next">Next</a> \
							</div>',
			image_markup: '<img id="fullResImage" src="{path}" />',
			flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
			quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
			iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
			inline_markup: '<div class="pp_inline">{content}</div>',
			custom_markup: '',
			social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>' /* html or false to disable */
		}, pp_settings);
		
		// Global variables accessible only by prettyPhoto
		var matchedObjects = this, percentBased = false, pp_dimensions, pp_open,
		
		// prettyPhoto container specific
		pp_contentHeight, pp_contentWidth, pp_containerHeight, pp_containerWidth,
		
		// Window size
		windowHeight = $(window).height(), windowWidth = $(window).width(),

		// Global elements
		pp_slideshow;
		
		doresize = true, scroll_pos = _get_scroll();
	
		// Window/Keyboard events
		$(window).unbind('resize.prettyphoto').bind('resize.prettyphoto',function(){ _center_overlay(); _resize_overlay(); });
		
		if(pp_settings.keyboard_shortcuts) {
			$(document).unbind('keydown.prettyphoto').bind('keydown.prettyphoto',function(e){
				if(typeof $pp_pic_holder != 'undefined'){
					if($pp_pic_holder.is(':visible')){
						switch(e.keyCode){
							case 37:
								$.prettyPhoto.changePage('previous');
								e.preventDefault();
								break;
							case 39:
								$.prettyPhoto.changePage('next');
								e.preventDefault();
								break;
							case 27:
								if(!settings.modal)
								$.prettyPhoto.close();
								e.preventDefault();
								break;
						};
						// return false;
					};
				};
			});
		};
		
		/**
		* Initialize prettyPhoto.
		*/
		$.prettyPhoto.initialize = function() {
			
			settings = pp_settings;
			
			if(settings.theme == 'pp_default') settings.horizontal_padding = 16;
			
			// Find out if the picture is part of a set
			theRel = $(this).attr(settings.hook);
			galleryRegExp = /\[(?:.*)\]/;
			isSet = (galleryRegExp.exec(theRel)) ? true : false;
			
			// Put the SRCs, TITLEs, ALTs into an array.
			pp_images = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return $(n).attr('href'); }) : $.makeArray($(this).attr('href'));
			pp_titles = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).find('img').attr('alt')) ? $(n).find('img').attr('alt') : ""; }) : $.makeArray($(this).find('img').attr('alt'));
			pp_descriptions = (isSet) ? jQuery.map(matchedObjects, function(n, i){ if($(n).attr(settings.hook).indexOf(theRel) != -1) return ($(n).attr('title')) ? $(n).attr('title') : ""; }) : $.makeArray($(this).attr('title'));
			
			if(pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false;
			
			set_position = jQuery.inArray($(this).attr('href'), pp_images); // Define where in the array the clicked item is positionned
			rel_index = (isSet) ? set_position : $("a["+settings.hook+"^='"+theRel+"']").index($(this));
			
			_build_overlay(this); // Build the overlay {this} being the caller
			
			if(settings.allow_resize)
				$(window).bind('scroll.prettyphoto',function(){ _center_overlay(); });
			
			
			$.prettyPhoto.open();
			
			return false;
		}


		/**
		* Opens the prettyPhoto modal box.
		* @param image {String,Array} Full path to the image to be open, can also be an array containing full images paths.
		* @param title {String,Array} The title to be displayed with the picture, can also be an array containing all the titles.
		* @param description {String,Array} The description to be displayed with the picture, can also be an array containing all the descriptions.
		*/
		$.prettyPhoto.open = function(event) {
			if(typeof settings == "undefined"){ // Means it's an API call, need to manually get the settings and set the variables
				settings = pp_settings;
				pp_images = $.makeArray(arguments[0]);
				pp_titles = (arguments[1]) ? $.makeArray(arguments[1]) : $.makeArray("");
				pp_descriptions = (arguments[2]) ? $.makeArray(arguments[2]) : $.makeArray("");
				isSet = (pp_images.length > 1) ? true : false;
				set_position = (arguments[3])? arguments[3]: 0;
				_build_overlay(event.target); // Build the overlay {this} being the caller
			}
			
			if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','hidden'); // Hide the flash

			_checkPosition($(pp_images).size()); // Hide the next/previous links if on first or last images.
		
			$('.pp_loaderIcon').show();
		
			if(settings.deeplinking)
				setHashtag();
		
			// Rebuild Facebook Like Button with updated href
			if(settings.social_tools){
				facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 
				$pp_pic_holder.find('.pp_social').html(facebook_like_link);
			}
			
			// Fade the content in
			if($ppt.is(':hidden')) $ppt.css('opacity',0).show();
			$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);

			// Display the current position
			$pp_pic_holder.find('.currentTextHolder').text((set_position+1) + settings.counter_separator_label + $(pp_images).size());

			// Set the description
			if(typeof pp_descriptions[set_position] != 'undefined' && pp_descriptions[set_position] != ""){
				$pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));
			}else{
				$pp_pic_holder.find('.pp_description').hide();
			}
			
			// Get the dimensions
			movie_width = ( parseFloat(getParam('width',pp_images[set_position])) ) ? getParam('width',pp_images[set_position]) : settings.default_width.toString();
			movie_height = ( parseFloat(getParam('height',pp_images[set_position])) ) ? getParam('height',pp_images[set_position]) : settings.default_height.toString();
			
			// If the size is % based, calculate according to window dimensions
			percentBased=false;
			if(movie_height.indexOf('%') != -1) { movie_height = parseFloat(($(window).height() * parseFloat(movie_height) / 100) - 150); percentBased = true; }
			if(movie_width.indexOf('%') != -1) { movie_width = parseFloat(($(window).width() * parseFloat(movie_width) / 100) - 150); percentBased = true; }
			
			// Fade the holder
			$pp_pic_holder.fadeIn(function(){
				// Set the title
				(settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined") ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html('&nbsp;');
				
				imgPreloader = "";
				skipInjection = false;
				
				// Inject the proper content
				switch(_getFileType(pp_images[set_position])){
					case 'image':
						imgPreloader = new Image();

						// Preload the neighbour images
						nextImage = new Image();
						if(isSet && set_position < $(pp_images).size() -1) nextImage.src = pp_images[set_position + 1];
						prevImage = new Image();
						if(isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];

						$pp_pic_holder.find('#pp_full_res')[0].innerHTML = settings.image_markup.replace(/{path}/g,pp_images[set_position]);

						imgPreloader.onload = function(){
							// Fit item to viewport
							pp_dimensions = _fitToViewport(imgPreloader.width,imgPreloader.height);

							_showContent();
						};

						imgPreloader.onerror = function(){
							alert('Image cannot be loaded. Make sure the path is correct and image exist.');
							$.prettyPhoto.close();
						};
					
						imgPreloader.src = pp_images[set_position];
					break;
				
					case 'youtube':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						
						// Regular youtube link
						movie_id = getParam('v',pp_images[set_position]);
						
						// youtu.be link
						if(movie_id == ""){
							movie_id = pp_images[set_position].split('youtu.be/');
							movie_id = movie_id[1];
							if(movie_id.indexOf('?') > 0)
								movie_id = movie_id.substr(0,movie_id.indexOf('?')); // Strip anything after the ?

							if(movie_id.indexOf('&') > 0)
								movie_id = movie_id.substr(0,movie_id.indexOf('&')); // Strip anything after the &
						}

						movie = 'http://www.youtube.com/embed/'+movie_id;
						(getParam('data-gal',pp_images[set_position])) ? movie+="?rel="+getParam('data-gal',pp_images[set_position]) : movie+="?rel=1";
							
						if(settings.autoplay) movie += "&autoplay=1";
					
						toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);
					break;
				
					case 'vimeo':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						movie_id = pp_images[set_position];
						var regExp = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
						var match = movie_id.match(regExp);
						
						movie = 'http://player.vimeo.com/video/'+ match[3] +'?title=0&amp;byline=0&amp;portrait=0';
						if(settings.autoplay) movie += "&autoplay=1;";
				
						vimeo_width = pp_dimensions['width'] + '/embed/?moog_width='+ pp_dimensions['width'];
				
						toInject = settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,movie);
					break;
				
					case 'quicktime':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
						pp_dimensions['height']+=15; pp_dimensions['contentHeight']+=15; pp_dimensions['containerHeight']+=15; // Add space for the control bar
				
						toInject = settings.quicktime_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);
					break;
				
					case 'flash':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						flash_vars = pp_images[set_position];
						flash_vars = flash_vars.substring(pp_images[set_position].indexOf('flashvars') + 10,pp_images[set_position].length);

						filename = pp_images[set_position];
						filename = filename.substring(0,filename.indexOf('?'));
					
						toInject =  settings.flash_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+'?'+flash_vars);
					break;
				
					case 'iframe':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
				
						frame_url = pp_images[set_position];
						frame_url = frame_url.substr(0,frame_url.indexOf('iframe')-1);

						toInject = settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,frame_url);
					break;
					
					case 'ajax':
						doresize = false; // Make sure the dimensions are not resized.
						pp_dimensions = _fitToViewport(movie_width,movie_height);
						doresize = true; // Reset the dimensions
					
						skipInjection = true;
						$.get(pp_images[set_position],function(responseHTML){
							toInject = settings.inline_markup.replace(/{content}/g,responseHTML);
							$pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
							_showContent();
						});
						
					break;
					
					case 'custom':
						pp_dimensions = _fitToViewport(movie_width,movie_height); // Fit item to viewport
					
						toInject = settings.custom_markup;
					break;
				
					case 'inline':
						// to get the item height clone it, apply default width, wrap it in the prettyPhoto containers , then delete
						myClone = $(pp_images[set_position]).clone().append('<br clear="all" />').css({'width':settings.default_width}).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();
						doresize = false; // Make sure the dimensions are not resized.
						pp_dimensions = _fitToViewport($(myClone).width(),$(myClone).height());
						doresize = true; // Reset the dimensions
						$(myClone).remove();
						toInject = settings.inline_markup.replace(/{content}/g,$(pp_images[set_position]).html());
					break;
				};

				if(!imgPreloader && !skipInjection){
					$pp_pic_holder.find('#pp_full_res')[0].innerHTML = toInject;
				
					// Show content
					_showContent();
				};
			});

			return false;
		};

	
		/**
		* Change page in the prettyPhoto modal box
		* @param direction {String} Direction of the paging, previous or next.
		*/
		$.prettyPhoto.changePage = function(direction){
			currentGalleryPage = 0;
			
			if(direction == 'previous') {
				set_position--;
				if (set_position < 0) set_position = $(pp_images).size()-1;
			}else if(direction == 'next'){
				set_position++;
				if(set_position > $(pp_images).size()-1) set_position = 0;
			}else{
				set_position=direction;
			};
			
			rel_index = set_position;

			if(!doresize) doresize = true; // Allow the resizing of the images
			if(settings.allow_expand) {
				$('.pp_contract').removeClass('pp_contract').addClass('pp_expand');
			}

			_hideContent(function(){ $.prettyPhoto.open(); });
		};


		/**
		* Change gallery page in the prettyPhoto modal box
		* @param direction {String} Direction of the paging, previous or next.
		*/
		$.prettyPhoto.changeGalleryPage = function(direction){
			if(direction=='next'){
				currentGalleryPage ++;

				if(currentGalleryPage > totalPage) currentGalleryPage = 0;
			}else if(direction=='previous'){
				currentGalleryPage --;

				if(currentGalleryPage < 0) currentGalleryPage = totalPage;
			}else{
				currentGalleryPage = direction;
			};
			
			slide_speed = (direction == 'next' || direction == 'previous') ? settings.animation_speed : 0;

			slide_to = currentGalleryPage * (itemsPerPage * itemWidth);

			$pp_gallery.find('ul').animate({left:-slide_to},slide_speed);
		};


		/**
		* Start the slideshow...
		*/
		$.prettyPhoto.startSlideshow = function(){
			if(typeof pp_slideshow == 'undefined'){
				$pp_pic_holder.find('.pp_play').unbind('click').removeClass('pp_play').addClass('pp_pause').click(function(){
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				pp_slideshow = setInterval($.prettyPhoto.startSlideshow,settings.slideshow);
			}else{
				$.prettyPhoto.changePage('next');	
			};
		}


		/**
		* Stop the slideshow...
		*/
		$.prettyPhoto.stopSlideshow = function(){
			$pp_pic_holder.find('.pp_pause').unbind('click').removeClass('pp_pause').addClass('pp_play').click(function(){
				$.prettyPhoto.startSlideshow();
				return false;
			});
			clearInterval(pp_slideshow);
			pp_slideshow=undefined;
		}


		/**
		* Closes prettyPhoto.
		*/
		$.prettyPhoto.close = function(){
			if($pp_overlay.is(":animated")) return;
			
			$.prettyPhoto.stopSlideshow();
			
			$pp_pic_holder.stop().find('object,embed').css('visibility','hidden');
			
			$('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animation_speed,function(){ $(this).remove(); });
			
			$pp_overlay.fadeOut(settings.animation_speed, function(){
				
				if(settings.hideflash) $('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','visible'); // Show the flash
				
				$(this).remove(); // No more need for the prettyPhoto markup
				
				$(window).unbind('scroll.prettyphoto');
				
				clearHashtag();
				
				settings.callback();
				
				doresize = true;
				
				pp_open = false;
				
				delete settings;
			});
		};
	
		/**
		* Set the proper sizes on the containers and animate the content in.
		*/
		function _showContent(){
			$('.pp_loaderIcon').hide();

			// Calculate the opened top position of the pic holder
			projectedTop = scroll_pos['scrollTop'] + ((windowHeight/2) - (pp_dimensions['containerHeight']/2));
			if(projectedTop < 0) projectedTop = 0;

			$ppt.fadeTo(settings.animation_speed,1);

			// Resize the content holder
			$pp_pic_holder.find('.pp_content')
				.animate({
					height:pp_dimensions['contentHeight'],
					width:pp_dimensions['contentWidth']
				},settings.animation_speed);
			
			// Resize picture the holder
			$pp_pic_holder.animate({
				'top': projectedTop,
				'left': ((windowWidth/2) - (pp_dimensions['containerWidth']/2) < 0) ? 0 : (windowWidth/2) - (pp_dimensions['containerWidth']/2),
				width:pp_dimensions['containerWidth']
			},settings.animation_speed,function(){
				$pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(pp_dimensions['height']).width(pp_dimensions['width']);

				$pp_pic_holder.find('.pp_fade').fadeIn(settings.animation_speed); // Fade the new content

				// Show the nav
				if(isSet && _getFileType(pp_images[set_position])=="image") { $pp_pic_holder.find('.pp_hoverContainer').show(); }else{ $pp_pic_holder.find('.pp_hoverContainer').hide(); }
			
				if(settings.allow_expand) {
					if(pp_dimensions['resized']){ // Fade the resizing link if the image is resized
						$('a.pp_expand,a.pp_contract').show();
					}else{
						$('a.pp_expand').hide();
					}
				}
				
				if(settings.autoplay_slideshow && !pp_slideshow && !pp_open) $.prettyPhoto.startSlideshow();
				
				settings.changepicturecallback(); // Callback!
				
				pp_open = true;
			});
			
			_insert_gallery();
			pp_settings.ajaxcallback();
		};
		
		/**
		* Hide the content...DUH!
		*/
		function _hideContent(callback){
			// Fade out the current picture
			$pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility','hidden');
			$pp_pic_holder.find('.pp_fade').fadeOut(settings.animation_speed,function(){
				$('.pp_loaderIcon').show();
				
				callback();
			});
		};
	
		/**
		* Check the item position in the gallery array, hide or show the navigation links
		* @param setCount {integer} The total number of items in the set
		*/
		function _checkPosition(setCount){
			(setCount > 1) ? $('.pp_nav').show() : $('.pp_nav').hide(); // Hide the bottom nav if it's not a set.
		};
	
		/**
		* Resize the item dimensions if it's bigger than the viewport
		* @param width {integer} Width of the item to be opened
		* @param height {integer} Height of the item to be opened
		* @return An array containin the "fitted" dimensions
		*/
		function _fitToViewport(width,height){
			resized = false;

			_getDimensions(width,height);
			
			// Define them in case there's no resize needed
			imageWidth = width, imageHeight = height;

			if( ((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)) && doresize && settings.allow_resize && !percentBased) {
				resized = true, fitting = false;
			
				while (!fitting){
					if((pp_containerWidth > windowWidth)){
						imageWidth = (windowWidth - 200);
						imageHeight = (height/width) * imageWidth;
					}else if((pp_containerHeight > windowHeight)){
						imageHeight = (windowHeight - 200);
						imageWidth = (width/height) * imageHeight;
					}else{
						fitting = true;
					};

					pp_containerHeight = imageHeight, pp_containerWidth = imageWidth;
				};
			

				
				if((pp_containerWidth > windowWidth) || (pp_containerHeight > windowHeight)){
					_fitToViewport(pp_containerWidth,pp_containerHeight)
				};
				
				_getDimensions(imageWidth,imageHeight);
			};
			
			return {
				width:Math.floor(imageWidth),
				height:Math.floor(imageHeight),
				containerHeight:Math.floor(pp_containerHeight),
				containerWidth:Math.floor(pp_containerWidth) + (settings.horizontal_padding * 2),
				contentHeight:Math.floor(pp_contentHeight),
				contentWidth:Math.floor(pp_contentWidth),
				resized:resized
			};
		};
		
		/**
		* Get the containers dimensions according to the item size
		* @param width {integer} Width of the item to be opened
		* @param height {integer} Height of the item to be opened
		*/
		function _getDimensions(width,height){
			width = parseFloat(width);
			height = parseFloat(height);
			
			// Get the details height, to do so, I need to clone it since it's invisible
			$pp_details = $pp_pic_holder.find('.pp_details');
			$pp_details.width(width);
			detailsHeight = parseFloat($pp_details.css('marginTop')) + parseFloat($pp_details.css('marginBottom'));
			
			$pp_details = $pp_details.clone().addClass(settings.theme).width(width).appendTo($('body')).css({
				'position':'absolute',
				'top':-10000
			});
			detailsHeight += $pp_details.height();
			detailsHeight = (detailsHeight <= 34) ? 36 : detailsHeight; // Min-height for the details
			$pp_details.remove();
			
			// Get the titles height, to do so, I need to clone it since it's invisible
			$pp_title = $pp_pic_holder.find('.ppt');
			$pp_title.width(width);
			titleHeight = parseFloat($pp_title.css('marginTop')) + parseFloat($pp_title.css('marginBottom'));
			$pp_title = $pp_title.clone().appendTo($('body')).css({
				'position':'absolute',
				'top':-10000
			});
			titleHeight += $pp_title.height();
			$pp_title.remove();
			
			// Get the container size, to resize the holder to the right dimensions
			pp_contentHeight = height + detailsHeight;
			pp_contentWidth = width;
			pp_containerHeight = pp_contentHeight + titleHeight + $pp_pic_holder.find('.pp_top').height() + $pp_pic_holder.find('.pp_bottom').height();
			pp_containerWidth = width;
		}
	
		function _getFileType(itemSrc){
			if (itemSrc.match(/youtube\.com\/watch/i) || itemSrc.match(/youtu\.be/i)) {
				return 'youtube';
			}else if (itemSrc.match(/vimeo\.com/i)) {
				return 'vimeo';
			}else if(itemSrc.match(/\b.mov\b/i)){ 
				return 'quicktime';
			}else if(itemSrc.match(/\b.swf\b/i)){
				return 'flash';
			}else if(itemSrc.match(/\biframe=true\b/i)){
				return 'iframe';
			}else if(itemSrc.match(/\bajax=true\b/i)){
				return 'ajax';
			}else if(itemSrc.match(/\bcustom=true\b/i)){
				return 'custom';
			}else if(itemSrc.substr(0,1) == '#'){
				return 'inline';
			}else{
				return 'image';
			};
		};
	
		function _center_overlay(){
			if(doresize && typeof $pp_pic_holder != 'undefined') {
				scroll_pos = _get_scroll();
				contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();

				projectedTop = (windowHeight/2) + scroll_pos['scrollTop'] - (contentHeight/2);
				if(projectedTop < 0) projectedTop = 0;
				
				if(contentHeight > windowHeight)
					return;

				$pp_pic_holder.css({
					'top': projectedTop,
					'left': (windowWidth/2) + scroll_pos['scrollLeft'] - (contentwidth/2)
				});
			};
		};
	
		function _get_scroll(){
			if (self.pageYOffset) {
				return {scrollTop:self.pageYOffset,scrollLeft:self.pageXOffset};
			} else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
				return {scrollTop:document.documentElement.scrollTop,scrollLeft:document.documentElement.scrollLeft};
			} else if (document.body) {// all other Explorers
				return {scrollTop:document.body.scrollTop,scrollLeft:document.body.scrollLeft};
			};
		};
	
		function _resize_overlay() {
			windowHeight = $(window).height(), windowWidth = $(window).width();
			
			if(typeof $pp_overlay != "undefined") $pp_overlay.height($(document).height()).width(windowWidth);
		};
	
		function _insert_gallery(){
			if(isSet && settings.overlay_gallery && _getFileType(pp_images[set_position])=="image") {
				itemWidth = 52+5; // 52 beign the thumb width, 5 being the right margin.
				navWidth = (settings.theme == "facebook" || settings.theme == "pp_default") ? 50 : 30; // Define the arrow width depending on the theme
				
				itemsPerPage = Math.floor((pp_dimensions['containerWidth'] - 100 - navWidth) / itemWidth);
				itemsPerPage = (itemsPerPage < pp_images.length) ? itemsPerPage : pp_images.length;
				totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;

				// Hide the nav in the case there's no need for links
				if(totalPage == 0){
					navWidth = 0; // No nav means no width!
					$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide();
				}else{
					$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show();
				};

				galleryWidth = itemsPerPage * itemWidth;
				fullGalleryWidth = pp_images.length * itemWidth;
				
				// Set the proper width to the gallery items
				$pp_gallery
					.css('margin-left',-((galleryWidth/2) + (navWidth/2)))
					.find('div:first').width(galleryWidth+5)
					.find('ul').width(fullGalleryWidth)
					.find('li.selected').removeClass('selected');
				
				goToPage = (Math.floor(set_position/itemsPerPage) < totalPage) ? Math.floor(set_position/itemsPerPage) : totalPage;

				$.prettyPhoto.changeGalleryPage(goToPage);
				
				$pp_gallery_li.filter(':eq('+set_position+')').addClass('selected');
			}else{
				$pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');
				// $pp_gallery.hide();
			}
		}
	
		function _build_overlay(caller){
			// Inject Social Tool markup into General markup
			if(settings.social_tools)
				facebook_like_link = settings.social_tools.replace('{location_href}', encodeURIComponent(location.href)); 

			settings.markup = settings.markup.replace('{pp_social}',''); 
			
			$('body').append(settings.markup); // Inject the markup
			
			$pp_pic_holder = $('.pp_pic_holder') , $ppt = $('.ppt'), $pp_overlay = $('div.pp_overlay'); // Set my global selectors
			
			// Inject the inline gallery!
			if(isSet && settings.overlay_gallery) {
				currentGalleryPage = 0;
				toInject = "";
				for (var i=0; i < pp_images.length; i++) {
					if(!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)){
						classname = 'default';
						img_src = '';
					}else{
						classname = '';
						img_src = pp_images[i];
					}
					toInject += "<li class='"+classname+"'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
				};
				
				toInject = settings.gallery_markup.replace(/{gallery}/g,toInject);
				
				$pp_pic_holder.find('#pp_full_res').after(toInject);
				
				$pp_gallery = $('.pp_pic_holder .pp_gallery'), $pp_gallery_li = $pp_gallery.find('li'); // Set the gallery selectors
				
				$pp_gallery.find('.pp_arrow_next').click(function(){
					$.prettyPhoto.changeGalleryPage('next');
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				
				$pp_gallery.find('.pp_arrow_previous').click(function(){
					$.prettyPhoto.changeGalleryPage('previous');
					$.prettyPhoto.stopSlideshow();
					return false;
				});
				
				$pp_pic_holder.find('.pp_content').hover(
					function(){
						$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();
					},
					function(){
						$pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();
					});

				itemWidth = 52+5; // 52 beign the thumb width, 5 being the right margin.
				$pp_gallery_li.each(function(i){
					$(this)
						.find('a')
						.click(function(){
							$.prettyPhoto.changePage(i);
							$.prettyPhoto.stopSlideshow();
							return false;
						});
				});
			};
			
			
			// Inject the play/pause if it's a slideshow
			if(settings.slideshow){
				$pp_pic_holder.find('.pp_nav').prepend('<a href="#" class="pp_play">Play</a>')
				$pp_pic_holder.find('.pp_nav .pp_play').click(function(){
					$.prettyPhoto.startSlideshow();
					return false;
				});
			}
			
			$pp_pic_holder.attr('class','pp_pic_holder ' + settings.theme); // Set the proper theme
			
			$pp_overlay
				.css({
					'opacity':0,
					'height':$(document).height(),
					'width':$(window).width()
					})
				.bind('click',function(){
					if(!settings.modal) $.prettyPhoto.close();
				});

			$('a.pp_close').bind('click',function(){ $.prettyPhoto.close(); return false; });


			if(settings.allow_expand) {
				$('a.pp_expand').bind('click',function(e){
					// Expand the image
					if($(this).hasClass('pp_expand')){
						$(this).removeClass('pp_expand').addClass('pp_contract');
						doresize = false;
					}else{
						$(this).removeClass('pp_contract').addClass('pp_expand');
						doresize = true;
					};
				
					_hideContent(function(){ $.prettyPhoto.open(); });
			
					return false;
				});
			}
		
			$pp_pic_holder.find('.pp_previous, .pp_nav .pp_arrow_previous').bind('click',function(){
				$.prettyPhoto.changePage('previous');
				$.prettyPhoto.stopSlideshow();
				return false;
			});
		
			$pp_pic_holder.find('.pp_next, .pp_nav .pp_arrow_next').bind('click',function(){
				$.prettyPhoto.changePage('next');
				$.prettyPhoto.stopSlideshow();
				return false;
			});
			
			_center_overlay(); // Center it
		};

		if(!pp_alreadyInitialized && getHashtag()){
			pp_alreadyInitialized = true;
			
			// Grab the rel index to trigger the click on the correct element
			hashIndex = getHashtag();
			hashRel = hashIndex;
			hashIndex = hashIndex.substring(hashIndex.indexOf('/')+1,hashIndex.length-1);
			hashRel = hashRel.substring(0,hashRel.indexOf('/'));

			// Little timeout to make sure all the prettyPhoto initialize scripts has been run.
			// Useful in the event the page contain several init scripts.
			setTimeout(function(){ $("a["+pp_settings.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger('click'); },50);
		}
		
		return this.unbind('click.prettyphoto').bind('click.prettyphoto',$.prettyPhoto.initialize); // Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
	};
	
	function getHashtag(){
		var url = location.href;
		hashtag = (url.indexOf('#prettyPhoto') !== -1) ? decodeURI(url.substring(url.indexOf('#prettyPhoto')+1,url.length)) : false;

		return hashtag;
	};
	
	function setHashtag(){
		if(typeof theRel == 'undefined') return; // theRel is set on normal calls, it's impossible to deeplink using the API
		location.hash = theRel + '/'+rel_index+'/';
	};
	
	function clearHashtag(){
		if ( location.href.indexOf('#prettyPhoto') !== -1 ) location.hash = "prettyPhoto";
	}
	
	function getParam(name,url){
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( url );
	  return ( results == null ) ? "" : results[1];
	}
	
})(jQuery);

var pp_alreadyInitialized = false; // Used for the deep linking to make sure not to call the same function several times.
;
/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3
 */

;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(!e)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
/*! jquery-smartresize http://github.com/louisremi/jquery-smartresize | http://louisremi.mit-license.org/ */

(function (a) {
    var b = a.event,
        c;
    b.special
        .smartresize = {
        setup: function () {
            a(this).bind("resize", b.special
                .smartresize
                .handler)
        },
        teardown: function () {
            a(this).unbind("resize", b.special
                .smartresize
                .handler)
        },
        handler: function (a, b) {
            var d = this,
                e = arguments;
            a.type = "smartresize";
            c && clearTimeout(c);
            c = setTimeout(function () {
                jQuery.event
                    .handle
                    .apply(d, e)
            }, "execAsap" === b ? 0 : 100)
        }
    };
    a.fn
        .smartresize = function (a) {
        return a ? this.bind("smartresize", a) : this
            .trigger("smartresize", ["execAsap"])
    }
})(jQuery);
// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: ''
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0; i < sticked.length; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css('position', '')
              .css('top', '');
            s.stickyElement.parent().removeClass(s.className);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop != newTop) {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop);

            if (typeof s.getWidthFrom !== 'undefined') {
              s.stickyElement.css('width', $(s.getWidthFrom).width());
            }

            s.stickyElement.parent().addClass(s.className);
            s.currentTop = newTop;
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();
    },
    methods = {
      init: function(options) {
        var o = $.extend(defaults, options);
        return this.each(function() {
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapper = $('<div></div>')
            .attr('id', stickyId + '-sticky-wrapper')
            .addClass(o.wrapperClassName);
          stickyElement.wrapAll(wrapper);

          if (o.center) {
            stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") == "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          var stickyWrapper = stickyElement.parent();
          stickyWrapper.css('height', stickyElement.outerHeight());
          sticked.push({
            topSpacing: o.topSpacing,
            bottomSpacing: o.bottomSpacing,
            stickyElement: stickyElement,
            currentTop: null,
            stickyWrapper: stickyWrapper,
            className: o.className,
            getWidthFrom: o.getWidthFrom
          });
        });
      },
      update: scroller
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
})(jQuery);
/*
 
 jQuery Tools 1.2.5 Tabs- The basics of UI design.

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/tabs/

 Since: November 2008
 Date:    Wed Sep 22 06:02:10 2010 +0000 
*/

(function(c){function p(d,b,a){var e=this,l=d.add(this),h=d.find(a.tabs),i=b.jquery?b:d.children(b),j;h.length||(h=d.children());i.length||(i=d.parent().find(b));i.length||(i=c(b));c.extend(this,{click:function(f,g){var k=h.eq(f);if(typeof f=="string"&&f.replace("#","")){k=h.filter("[href*="+f.replace("#","")+"]");f=Math.max(h.index(k),0)}if(a.rotate){var n=h.length-1;if(f<0)return e.click(n,g);if(f>n)return e.click(0,g)}if(!k.length){if(j>=0)return e;f=a.initialIndex;k=h.eq(f)}if(f===j)return e;
g=g||c.Event();g.type="onBeforeClick";l.trigger(g,[f]);if(!g.isDefaultPrevented()){o[a.effect].call(e,f,function(){g.type="onClick";l.trigger(g,[f])});j=f;h.removeClass(a.current);k.addClass(a.current);return e}},getConf:function(){return a},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return e.click(j+1)},prev:function(){return e.click(j-1)},destroy:function(){h.unbind(a.event).removeClass(a.current);
i.find("a[href^=#]").unbind("click.T");return e}});c.each("onBeforeClick,onClick".split(","),function(f,g){c.isFunction(a[g])&&c(e).bind(g,a[g]);e[g]=function(k){k&&c(e).bind(g,k);return e}});if(a.history&&c.fn.history){c.tools.history.init(h);a.event="history"}h.each(function(f){c(this).bind(a.event,function(g){e.click(f,g);return g.preventDefault()})});i.find("a[href^=#]").bind("click.T",function(f){e.click(c(this).attr("href"),f)});if(location.hash&&a.tabs=="a"&&d.find("[href="+location.hash+"]").length)e.click(location.hash);
else if(a.initialIndex===0||a.initialIndex>0)e.click(a.initialIndex)}c.tools=c.tools||{version:"1.2.5"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(d,b){o[d]=b}};var o={"default":function(d,b){this.getPanes().hide().eq(d).show();b.call()},fade:function(d,b){var a=this.getConf(),e=a.fadeOutSpeed,l=this.getPanes();e?l.fadeOut(e):l.hide();l.eq(d).fadeIn(a.fadeInSpeed,b)},slide:function(d,
b){this.getPanes().slideUp(200);this.getPanes().eq(d).slideDown(400,b)},ajax:function(d,b){this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"),b)}},m;c.tools.tabs.addEffect("horizontal",function(d,b){m||(m=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(d).animate({width:m},function(){c(this).show();b.call()})});c.fn.tabs=function(d,b){var a=this.data("tabs");if(a){a.destroy();this.removeData("tabs")}if(c.isFunction(b))b=
{onBeforeClick:b};b=c.extend({},c.tools.tabs.conf,b);this.each(function(){a=new p(c(this),d,b);c(this).data("tabs",a)});return b.api?a:this}})(jQuery);


/*
 
 jQuery Tools 1.2.5 Slideshow - Extend it.

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/tabs/slideshow.html

 Since: September 2009
 Date:    Wed Sep 22 06:02:10 2010 +0000 
*/
(function(c){var a;a=c.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:false,autopause:true,interval:3000,clickable:true,api:false}};function b(k,i){var o=this,f=k.add(this),j=k.data("tabs"),e,d=true;function h(q){var p=c(q);return p.length<2?p:k.parent().find(q)}var n=h(i.next).click(function(){j.next()});var l=h(i.prev).click(function(){j.prev()});c.extend(o,{getTabs:function(){return j},getConf:function(){return i},play:function(){if(e){return o}var p=c.Event("onBeforePlay");f.trigger(p);if(p.isDefaultPrevented()){return o}m();d=false;f.trigger("onPlay");return o},pause:function(){if(!e){return o}var p=c.Event("onBeforePause");f.trigger(p);if(p.isDefaultPrevented()){return o}e=clearTimeout(e);f.trigger("onPause");return o},stop:function(){o.pause();d=true}});function m(){e=setTimeout(j.next,i.interval);j.onClick(function(p){if(p.originalEvent==null){e=clearTimeout(e);e=setTimeout(j.next,i.interval)}})}c.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(q,p){if(c.isFunction(i[p])){c(o).bind(p,i[p])}o[p]=function(r){return c(o).bind(p,r)}});if(i.autopause){j.getTabs().add(n).add(l).add(j.getPanes()).hover(o.pause,function(){if(!d){o.play()}})}if(i.autoplay){o.play()}if(i.clickable){j.getPanes().click(function(){j.next()})}if(!j.getConf().rotate){var g=i.disabledClass;if(!j.getIndex()){l.addClass(g)}j.onBeforeClick(function(q,p){l.toggleClass(g,!p);n.toggleClass(g,p==j.getTabs().length-1)})}}c.fn.slideshow=function(d){var e=this.data("slideshow");if(e){return e}d=c.extend({},a.conf,d);this.each(function(){e=new b(c(this),d);c(this).data("slideshow",e)});return d.api?e:this}})(jQuery);

 /*
 * TipTip
 * Copyright 2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/tiptip-jquery-plugin
 *
 * Version 1.3   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will create a custom tooltip to replace the default
 * browser tooltip. It is extremely lightweight and very smart in
 * that it detects the edges of the browser window and will make sure
 * the tooltip stays within the current window size. As a result the
 * tooltip will adjust itself to be displayed above, below, to the left 
 * or to the right depending on what is necessary to stay within the
 * browser window. It is completely customizable as well via CSS.
 *
 * This TipTip jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){$.fn.tipTip=function(options){var defaults={activation:"hover",keepAlive:false,maxWidth:"200px",edgeOffset:3,defaultPosition:"bottom",delay:400,fadeIn:200,fadeOut:200,attribute:"title",content:false,enter:function(){},exit:function(){}};var opts=$.extend(defaults,options);if($("#tiptip_holder").length<=0){var tiptip_holder=$('<div id="tiptip_holder" style="max-width:'+opts.maxWidth+';"></div>');var tiptip_content=$('<div id="tiptip_content"></div>');var tiptip_arrow=$('<div id="tiptip_arrow"></div>');$("body").append(tiptip_holder.html(tiptip_content).prepend(tiptip_arrow.html('<div id="tiptip_arrow_inner"></div>')))}else{var tiptip_holder=$("#tiptip_holder");var tiptip_content=$("#tiptip_content");var tiptip_arrow=$("#tiptip_arrow")}return this.each(function(){var org_elem=$(this);if(opts.content){var org_title=opts.content}else{var org_title=org_elem.attr(opts.attribute)}if(org_title!=""){if(!opts.content){org_elem.removeAttr(opts.attribute)}var timeout=false;if(opts.activation=="hover"){org_elem.hover(function(){active_tiptip()},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}else if(opts.activation=="focus"){org_elem.focus(function(){active_tiptip()}).blur(function(){deactive_tiptip()})}else if(opts.activation=="click"){org_elem.click(function(){active_tiptip();return false}).hover(function(){},function(){if(!opts.keepAlive){deactive_tiptip()}});if(opts.keepAlive){tiptip_holder.hover(function(){},function(){deactive_tiptip()})}}function active_tiptip(){opts.enter.call(this);tiptip_content.html(org_title);tiptip_holder.hide().removeAttr("class").css("margin","0");tiptip_arrow.removeAttr("style");var top=parseInt(org_elem.offset()['top']);var left=parseInt(org_elem.offset()['left']);var org_width=parseInt(org_elem.outerWidth());var org_height=parseInt(org_elem.outerHeight());var tip_w=tiptip_holder.outerWidth();var tip_h=tiptip_holder.outerHeight();var w_compare=Math.round((org_width-tip_w)/2);var h_compare=Math.round((org_height-tip_h)/2);var marg_left=Math.round(left+w_compare);var marg_top=Math.round(top+org_height+opts.edgeOffset);var t_class="";var arrow_top="";var arrow_left=Math.round(tip_w-12)/2;if(opts.defaultPosition=="bottom"){t_class="_bottom"}else if(opts.defaultPosition=="top"){t_class="_top"}else if(opts.defaultPosition=="left"){t_class="_left"}else if(opts.defaultPosition=="right"){t_class="_right"}var right_compare=(w_compare+left)<parseInt($(window).scrollLeft());var left_compare=(tip_w+left)>parseInt($(window).width());if((right_compare&&w_compare<0)||(t_class=="_right"&&!left_compare)||(t_class=="_left"&&left<(tip_w+opts.edgeOffset+5))){t_class="_right";arrow_top=Math.round(tip_h-13)/2;arrow_left=-12;marg_left=Math.round(left+org_width+opts.edgeOffset);marg_top=Math.round(top+h_compare)}else if((left_compare&&w_compare<0)||(t_class=="_left"&&!right_compare)){t_class="_left";arrow_top=Math.round(tip_h-13)/2;arrow_left=Math.round(tip_w);marg_left=Math.round(left-(tip_w+opts.edgeOffset+5));marg_top=Math.round(top+h_compare)}var top_compare=(top+org_height+opts.edgeOffset+tip_h+8)>parseInt($(window).height()+$(window).scrollTop());var bottom_compare=((top+org_height)-(opts.edgeOffset+tip_h+8))<0;if(top_compare||(t_class=="_bottom"&&top_compare)||(t_class=="_top"&&!bottom_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_top"}else{t_class=t_class+"_top"}arrow_top=tip_h;marg_top=Math.round(top-(tip_h+5+opts.edgeOffset))}else if(bottom_compare|(t_class=="_top"&&bottom_compare)||(t_class=="_bottom"&&!top_compare)){if(t_class=="_top"||t_class=="_bottom"){t_class="_bottom"}else{t_class=t_class+"_bottom"}arrow_top=-12;marg_top=Math.round(top+org_height+opts.edgeOffset)}if(t_class=="_right_top"||t_class=="_left_top"){marg_top=marg_top+5}else if(t_class=="_right_bottom"||t_class=="_left_bottom"){marg_top=marg_top-5}if(t_class=="_left_top"||t_class=="_left_bottom"){marg_left=marg_left+5}tiptip_arrow.css({"margin-left":arrow_left+"px","margin-top":arrow_top+"px"});tiptip_holder.css({"margin-left":marg_left+"px","margin-top":marg_top+"px"}).attr("class","tip"+t_class);if(timeout){clearTimeout(timeout)}timeout=setTimeout(function(){tiptip_holder.stop(true,true).fadeIn(opts.fadeIn)},opts.delay)}function deactive_tiptip(){opts.exit.call(this);if(timeout){clearTimeout(timeout)}tiptip_holder.fadeOut(opts.fadeOut)}}})}})(jQuery);
/* UItoTop jQuery Plugin 1.2 | Matt Varone | http://www.mattvarone.com/web-design/uitotop-jquery-plugin */

(function($){$.fn.UItoTop=function(options){var defaults={text:'To Top',min:200,inDelay:600,outDelay:400,containerID:'toTop',containerHoverID:'toTopHover',scrollSpeed:1200,easingType:'linear'},settings=$.extend(defaults,options),containerIDhash='#'+settings.containerID,containerHoverIDHash='#'+settings.containerHoverID;$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');$(containerIDhash).hide().on('click.UItoTop',function(){$('html, body').animate({scrollTop:0},settings.scrollSpeed,settings.easingType);$('#'+settings.containerHoverID,this).stop().animate({'opacity':0},settings.inDelay,settings.easingType);return false;}).prepend('<span id="'+settings.containerHoverID+'"></span>').hover(function(){$(containerHoverIDHash,this).stop().animate({'opacity':1},600,'linear');},function(){$(containerHoverIDHash,this).stop().animate({'opacity':0},700,'linear');});$(window).scroll(function(){var sd=$(window).scrollTop();if(typeof document.body.style.maxHeight==="undefined"){$(containerIDhash).css({'position':'absolute','top':sd+$(window).height()-50});}
if(sd>settings.min)
$(containerIDhash).fadeIn(settings.inDelay);else
$(containerIDhash).fadeOut(settings.Outdelay);});};})(jQuery);
/*! jQuery Validation Plugin - v1.11.1 - 3/22/2013\n* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */
(function(t){t.extend(t.fn,{validate:function(e){if(!this.length)return e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."),void 0;var i=t.data(this[0],"validator");return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){i.settings.submitHandler&&(i.submitButton=e.target),t(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),void 0!==t(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0)}),this.submit(function(e){function s(){var s;return i.settings.submitHandler?(i.submitButton&&(s=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&s.remove(),!1):!0}return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,s()):i.form()?i.pendingRequest?(i.formSubmitted=!0,!1):s():(i.focusInvalid(),!1)})),i)},valid:function(){if(t(this[0]).is("form"))return this.validate().form();var e=!0,i=t(this[0].form).validate();return this.each(function(){e=e&&i.element(this)}),e},removeAttrs:function(e){var i={},s=this;return t.each(e.split(/\s/),function(t,e){i[e]=s.attr(e),s.removeAttr(e)}),i},rules:function(e,i){var s=this[0];if(e){var r=t.data(s.form,"validator").settings,n=r.rules,a=t.validator.staticRules(s);switch(e){case"add":t.extend(a,t.validator.normalizeRule(i)),delete a.messages,n[s.name]=a,i.messages&&(r.messages[s.name]=t.extend(r.messages[s.name],i.messages));break;case"remove":if(!i)return delete n[s.name],a;var u={};return t.each(i.split(/\s/),function(t,e){u[e]=a[e],delete a[e]}),u}}var o=t.validator.normalizeRules(t.extend({},t.validator.classRules(s),t.validator.attributeRules(s),t.validator.dataRules(s),t.validator.staticRules(s)),s);if(o.required){var l=o.required;delete o.required,o=t.extend({required:l},o)}return o}}),t.extend(t.expr[":"],{blank:function(e){return!t.trim(""+t(e).val())},filled:function(e){return!!t.trim(""+t(e).val())},unchecked:function(e){return!t(e).prop("checked")}}),t.validator=function(e,i){this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init()},t.validator.format=function(e,i){return 1===arguments.length?function(){var i=t.makeArray(arguments);return i.unshift(e),t.validator.format.apply(this,i)}:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){e=e.replace(RegExp("\\{"+t+"\\}","g"),function(){return i})}),e)},t.extend(t.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:t([]),errorLabelContainer:t([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(t){this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(t)).hide())},onfocusout:function(t){this.checkable(t)||!(t.name in this.submitted)&&this.optional(t)||this.element(t)},onkeyup:function(t,e){(9!==e.which||""!==this.elementValue(t))&&(t.name in this.submitted||t===this.lastElement)&&this.element(t)},onclick:function(t){t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode)},highlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(s):t(e).addClass(i).removeClass(s)},unhighlight:function(e,i,s){"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(s):t(e).removeClass(i).addClass(s)}},setDefaults:function(e){t.extend(t.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:t.validator.format("Please enter no more than {0} characters."),minlength:t.validator.format("Please enter at least {0} characters."),rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),range:t.validator.format("Please enter a value between {0} and {1}."),max:t.validator.format("Please enter a value less than or equal to {0}."),min:t.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function e(e){var i=t.data(this[0].form,"validator"),s="on"+e.type.replace(/^validate/,"");i.settings[s]&&i.settings[s].call(i,this[0],e)}this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var i=this.groups={};t.each(this.settings.groups,function(e,s){"string"==typeof s&&(s=s.split(/\s/)),t.each(s,function(t,s){i[s]=e})});var s=this.settings.rules;t.each(s,function(e,i){s[e]=t.validator.normalizeRule(i)}),t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",e).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",e),this.settings.invalidHandler&&t(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);return this.valid()},element:function(e){e=this.validationTargetFor(this.clean(e)),this.lastElement=e,this.prepareElement(e),this.currentElements=t(e);var i=this.check(e)!==!1;return i?delete this.invalid[e.name]:this.invalid[e.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),i},showErrors:function(e){if(e){t.extend(this.errorMap,e),this.errorList=[];for(var i in e)this.errorList.push({message:e[i],element:this.findByName(i)[0]});this.successList=t.grep(this.successList,function(t){return!(t.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){t.fn.resetForm&&t(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(t){var e=0;for(var i in t)e++;return e},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}},findLastActive:function(){var e=this.lastActive;return e&&1===t.grep(this.errorList,function(t){return t.element.name===e.name}).length&&e},elements:function(){var e=this,i={};return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in i||!e.objectLength(t(this).rules())?!1:(i[this.name]=!0,!0)})},clean:function(e){return t(e)[0]},errors:function(){var e=this.settings.errorClass.replace(" ",".");return t(this.settings.errorElement+"."+e,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([]),this.currentElements=t([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(t){this.reset(),this.toHide=this.errorsFor(t)},elementValue:function(e){var i=t(e).attr("type"),s=t(e).val();return"radio"===i||"checkbox"===i?t("input[name='"+t(e).attr("name")+"']:checked").val():"string"==typeof s?s.replace(/\r/g,""):s},check:function(e){e=this.validationTargetFor(this.clean(e));var i,s=t(e).rules(),r=!1,n=this.elementValue(e);for(var a in s){var u={method:a,parameters:s[a]};try{if(i=t.validator.methods[a].call(this,n,e,u.parameters),"dependency-mismatch"===i){r=!0;continue}if(r=!1,"pending"===i)return this.toHide=this.toHide.not(this.errorsFor(e)),void 0;if(!i)return this.formatAndAdd(e,u),!1}catch(o){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+u.method+"' method.",o),o}}return r?void 0:(this.objectLength(s)&&this.successList.push(e),!0)},customDataMessage:function(e,i){return t(e).data("msg-"+i.toLowerCase())||e.attributes&&t(e).attr("data-msg-"+i.toLowerCase())},customMessage:function(t,e){var i=this.settings.messages[t];return i&&(i.constructor===String?i:i[e])},findDefined:function(){for(var t=0;arguments.length>t;t++)if(void 0!==arguments[t])return arguments[t];return void 0},defaultMessage:function(e,i){return this.findDefined(this.customMessage(e.name,i),this.customDataMessage(e,i),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i],"<strong>Warning: No message defined for "+e.name+"</strong>")},formatAndAdd:function(e,i){var s=this.defaultMessage(e,i.method),r=/\$?\{(\d+)\}/g;"function"==typeof s?s=s.call(this,i.parameters,e):r.test(s)&&(s=t.validator.format(s.replace(r,"{$1}"),i.parameters)),this.errorList.push({message:s,element:e}),this.errorMap[e.name]=s,this.submitted[e.name]=s},addWrapper:function(t){return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t},defaultShowErrors:function(){var t,e;for(t=0;this.errorList[t];t++){var i=this.errorList[t];this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),this.showLabel(i.element,i.message)}if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return t(this.errorList).map(function(){return this.element})},showLabel:function(e,i){var s=this.errorsFor(e);s.length?(s.removeClass(this.settings.validClass).addClass(this.settings.errorClass),s.html(i)):(s=t("<"+this.settings.errorElement+">").attr("for",this.idOrName(e)).addClass(this.settings.errorClass).html(i||""),this.settings.wrapper&&(s=s.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(s).length||(this.settings.errorPlacement?this.settings.errorPlacement(s,t(e)):s.insertAfter(e))),!i&&this.settings.success&&(s.text(""),"string"==typeof this.settings.success?s.addClass(this.settings.success):this.settings.success(s,e)),this.toShow=this.toShow.add(s)},errorsFor:function(e){var i=this.idOrName(e);return this.errors().filter(function(){return t(this).attr("for")===i})},idOrName:function(t){return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name)},validationTargetFor:function(t){return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),t},checkable:function(t){return/radio|checkbox/i.test(t.type)},findByName:function(e){return t(this.currentForm).find("[name='"+e+"']")},getLength:function(e,i){switch(i.nodeName.toLowerCase()){case"select":return t("option:selected",i).length;case"input":if(this.checkable(i))return this.findByName(i.name).filter(":checked").length}return e.length},depend:function(t,e){return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0},dependTypes:{"boolean":function(t){return t},string:function(e,i){return!!t(e,i.form).length},"function":function(t,e){return t(e)}},optional:function(e){var i=this.elementValue(e);return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch"},startRequest:function(t){this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0)},stopRequest:function(e,i){this.pendingRequest--,0>this.pendingRequest&&(this.pendingRequest=0),delete this.pending[e.name],i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(e){return t.data(e,"previousValue")||t.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,i){e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e)},classRules:function(e){var i={},s=t(e).attr("class");return s&&t.each(s.split(" "),function(){this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this])}),i},attributeRules:function(e){var i={},s=t(e),r=s[0].getAttribute("type");for(var n in t.validator.methods){var a;"required"===n?(a=s.get(0).getAttribute(n),""===a&&(a=!0),a=!!a):a=s.attr(n),/min|max/.test(n)&&(null===r||/number|range|text/.test(r))&&(a=Number(a)),a?i[n]=a:r===n&&"range"!==r&&(i[n]=!0)}return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,i},dataRules:function(e){var i,s,r={},n=t(e);for(i in t.validator.methods)s=n.data("rule-"+i.toLowerCase()),void 0!==s&&(r[i]=s);return r},staticRules:function(e){var i={},s=t.data(e.form,"validator");return s.settings.rules&&(i=t.validator.normalizeRule(s.settings.rules[e.name])||{}),i},normalizeRules:function(e,i){return t.each(e,function(s,r){if(r===!1)return delete e[s],void 0;if(r.param||r.depends){var n=!0;switch(typeof r.depends){case"string":n=!!t(r.depends,i.form).length;break;case"function":n=r.depends.call(i,i)}n?e[s]=void 0!==r.param?r.param:!0:delete e[s]}}),t.each(e,function(s,r){e[s]=t.isFunction(r)?r(i):r}),t.each(["minlength","maxlength"],function(){e[this]&&(e[this]=Number(e[this]))}),t.each(["rangelength","range"],function(){var i;e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].split(/[\s,]+/),e[this]=[Number(i[0]),Number(i[1])]))}),t.validator.autoCreateRanges&&(e.min&&e.max&&(e.range=[e.min,e.max],delete e.min,delete e.max),e.minlength&&e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],delete e.minlength,delete e.maxlength)),e},normalizeRule:function(e){if("string"==typeof e){var i={};t.each(e.split(/\s/),function(){i[this]=!0}),e=i}return e},addMethod:function(e,i,s){t.validator.methods[e]=i,t.validator.messages[e]=void 0!==s?s:t.validator.messages[e],3>i.length&&t.validator.addClassRules(e,t.validator.normalizeRule(e))},methods:{required:function(e,i,s){if(!this.depend(s,i))return"dependency-mismatch";if("select"===i.nodeName.toLowerCase()){var r=t(i).val();return r&&r.length>0}return this.checkable(i)?this.getLength(e,i)>0:t.trim(e).length>0},email:function(t,e){return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)},url:function(t,e){return this.optional(e)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)},date:function(t,e){return this.optional(e)||!/Invalid|NaN/.test(""+new Date(t))},dateISO:function(t,e){return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)},number:function(t,e){return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)},digits:function(t,e){return this.optional(e)||/^\d+$/.test(t)},creditcard:function(t,e){if(this.optional(e))return"dependency-mismatch";if(/[^0-9 \-]+/.test(t))return!1;var i=0,s=0,r=!1;t=t.replace(/\D/g,"");for(var n=t.length-1;n>=0;n--){var a=t.charAt(n);s=parseInt(a,10),r&&(s*=2)>9&&(s-=9),i+=s,r=!r}return 0===i%10},minlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s},maxlength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||s>=r},rangelength:function(e,i,s){var r=t.isArray(e)?e.length:this.getLength(t.trim(e),i);return this.optional(i)||r>=s[0]&&s[1]>=r},min:function(t,e,i){return this.optional(e)||t>=i},max:function(t,e,i){return this.optional(e)||i>=t},range:function(t,e,i){return this.optional(e)||t>=i[0]&&i[1]>=t},equalTo:function(e,i,s){var r=t(s);return this.settings.onfocusout&&r.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){t(i).valid()}),e===r.val()},remote:function(e,i,s){if(this.optional(i))return"dependency-mismatch";var r=this.previousValue(i);if(this.settings.messages[i.name]||(this.settings.messages[i.name]={}),r.originalMessage=this.settings.messages[i.name].remote,this.settings.messages[i.name].remote=r.message,s="string"==typeof s&&{url:s}||s,r.old===e)return r.valid;r.old=e;var n=this;this.startRequest(i);var a={};return a[i.name]=e,t.ajax(t.extend(!0,{url:s,mode:"abort",port:"validate"+i.name,dataType:"json",data:a,success:function(s){n.settings.messages[i.name].remote=r.originalMessage;var a=s===!0||"true"===s;if(a){var u=n.formSubmitted;n.prepareElement(i),n.formSubmitted=u,n.successList.push(i),delete n.invalid[i.name],n.showErrors()}else{var o={},l=s||n.defaultMessage(i,"remote");o[i.name]=r.message=t.isFunction(l)?l(e):l,n.invalid[i.name]=!0,n.showErrors(o)}r.valid=a,n.stopRequest(i,a)}},s)),"pending"}}}),t.format=t.validator.format})(jQuery),function(t){var e={};if(t.ajaxPrefilter)t.ajaxPrefilter(function(t,i,s){var r=t.port;"abort"===t.mode&&(e[r]&&e[r].abort(),e[r]=s)});else{var i=t.ajax;t.ajax=function(s){var r=("mode"in s?s:t.ajaxSettings).mode,n=("port"in s?s:t.ajaxSettings).port;return"abort"===r?(e[n]&&e[n].abort(),e[n]=i.apply(this,arguments),e[n]):i.apply(this,arguments)}}}(jQuery),function(t){t.extend(t.fn,{validateDelegate:function(e,i,s){return this.bind(i,function(i){var r=t(i.target);return r.is(e)?s.apply(r,arguments):void 0})}})}(jQuery);
/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */

(function($) {
    
    $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };
    
    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };
    
    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };
    
    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };
    
    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {threshold : 0});
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {threshold : 0});
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {threshold : 0});
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {threshold : 0});
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {threshold : 0});
        }
    });

    
})(jQuery);

/*
	* LayerSlider
	*
	* (c) 2011-2014 George Krupa, John Gera & Kreatura Media
	*
	* Plugin web:			http://kreaturamedia.com/
	* licenses:				http://codecanyon.net/licenses/
*/




eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('18 ad(e,t,n){16 r;6(1W e=="5T"){r=3A("#"+e)}19 6(1W e=="ai"){r=e}16 i,s;2p(t){1l"8N":i="bV 3A 99";s=\'96 98 4K bT ca b6 44 4O c5 c3 an c4 c2 2X 21 3A 9l c1 dG 23 2A 2e 64 4O de. <1Y>4P dd 4e 4O 5g dc db 2e 21 dj di 2X 2A 4Q da 21 "d3 bN d2 2e 3U" d1 d0 21 d4 & d5 d8 3K.</1Y>\';1j;1l"ae":i="5V 3A 99";s="96 98 4K d7 d6 ch an 5V 2s ("+n+\') 2X 21 3A 9l. 2A dk at dl 2s 1.7.0 44 dA. 4P b5 3A 2e 1.10.x 44 dz. dy: 4P do 2I dE 21 3A dD b6 4e 5g 4Q do 2I b5 2e 2.x 2s 2X 3A dx 4i 3m 2I bP b3 dw dq 4K dp 7 & 8. <a 2i="6P://dn.dm.5N/dv/4/69-23-du/#ap-13&ar-60">cZ cY cw cu cy cC 3A by cr cl.</a>\';1j}r.1r("12-3Z");r.3S(\'<p 1t="12-ck">!</p>\');r.3S(\'<p 1t="12-3Z-ci">2A: \'+i+"</p>");r.3S(\'<p 1t="12-3Z-8J">\'+s+"</p>")}(18(e){e.fn.2V=18(n){16 r="1.7.0";16 i=e.fn.8N;16 s=e(14);16 o=18(e,t){16 n=e.1E(".");16 r=t.1E(".");23(16 i=0;i<n.1k;++i){6(r.1k==i){1T 1g}6(1b(n[i])==1b(r[i])){cm}19 6(1b(n[i])>1b(r[i])){1T 1g}19{1T 1c}}6(n.1k!=r.1k){1T 1c}1T 1c};6(!o("1.8.0",i)){s.1r("12-aW")}6(!o(r,i)){ad(s,"ae",i)}19{6((1W n).3H("ai|2W")){1T 14.1O(18(e){1I t(14,n)})}19{6(n=="11"){16 u=e(14).11("2A").g;6(u){1T u}}19{1T 14.1O(18(t){16 r=e(14).11("2A");6(r){6(!r.g.36&&!r.g.48){6(1W n=="3V"){6(n>0&&n<r.g.2y+1&&n!=r.g.27){r.4C(n)}}19{2p(n){1l"1S":r.o.7v(r.g);r.1S("6j");1j;1l"1X":r.o.7l(r.g);r.1X("6j");1j;1l"22":6(!r.g.2w){r.o.b2(r.g);r.g.2t=1c;r.22()}1j}}}6(n=="4X"){r.d.64()}6((r.g.2w||!r.g.2w&&r.g.2t)&&n=="1x"){r.o.ax(r.g);r.g.2t=1g;r.g.1L.17(\'2b[1h*="66.53"], 2b[1h*="62.52"]\').1O(18(){2v(e(14).11("6C"))});r.1x()}6(n=="cn"){r.af()}}})}}}};16 t=18(u,a){16 f=14;f.$el=e(u).1r("12-2n");f.$el.11("2A",f);f.31=18(){f.o=e.4D({},t.9K,a);f.g=e.4D({},t.7q);f.1y=e.4D({},t.9Q);f.4Z=e.4D({},t.9H);f.g.co=e(u).30("12-aW")?1g:1c;6(f.g.2o){f.o.47=1g}6(f.o.2u==="cE"){f.o.2u=1c}6(f.o.2u==="av"){f.o.2u=1g}6(1W aY!=="2W"){f.t=e.4D({},aY)}6(1W aO!=="2W"){f.ct=e.4D({},aO)}6(!f.g.aN){f.g.aN=1c;f.4X();6(e("4u").17(\'aE[91*="5g"]\').1k){f.g.8v=e("4u").17(\'aE[91*="5g"]\').1f("91").1E("5g")[1]}6(e("4u").17(\'94[1h*="69"]\').1k){6(e("4u").17(\'94[1h*="69"]\').1f("1h").1i("?")!=-1){f.g.8x=e("4u").17(\'94[1h*="69"]\').1f("1h").1E("?")[1].1E("=")[1]}}f.d.aT("2A bq");f.d.aU(\'<a 2i="#">1S</a> | <a 2i="#">1X</a> | <a 2i="#">22</a> | <a 2i="#">1x</a> | <a 2i="#">cS 1x</a>\');f.d.3R.17("a").1O(18(){e(14).2k(18(t){t.3t();e(u).2V(e(14).8J())})});f.d.aT("2A 2s cR");f.d.aU("bN 2s: <1Y>"+f.g.2s+"</1Y>");6(f.g.8x){f.d.aL("cX 2s: <1Y>"+f.g.8x+"</1Y>")}6(f.g.8v){f.d.aL("5g 2s: <1Y>"+f.g.8v+"</1Y>")}f.d.aL("3A 2s: <1Y>"+e().8N+"</1Y>");6(e(u).1f("4N")){f.d.aT("2A 2n");f.d.aU("#"+e(u).1f("4N"))}6(!f.o.2r||f.o.2r==""||!f.o.3z||f.o.3z==""){f.d.aT("cW cV 2r. cP: cO 2r 4Q / 44 3z.");f.59()}19{f.d.aT("cI 2e 31 b3 2r: "+f.o.2r,1c);e(u).1r("12-"+f.o.2r);16 n=f.o.3z+f.o.2r+"/2r.1a";8w=e("bC");6(!e("bC").1k){8w=e("3U")}6(e(\'7c[2i="\'+n+\'"]\').1k){f.d.aU(\'cH "\'+f.o.2r+\'" 3m cG 2S.\');r=e(\'7c[2i="\'+n+\'"]\');6(!f.g.2S){f.g.2S=1c;f.g.a9=2g(18(){f.59()},7u)}}19{6(6c.bR){6c.bR(n);16 r=e(\'7c[2i="\'+n+\'"]\')}19{16 r=e(\'<7c 55="cF" 2i="\'+n+\'" 4y="8J/1a" />\').1w(8w)}}r.31(18(){6(!f.g.2S){f.d.aU("bl.31(); 8U");f.g.2S=1c;f.g.a8=2g(18(){f.59()},7u)}});e(2q).31(18(){6(!f.g.2S){f.d.aU("$(2q).31(); 8U");f.g.2S=1c;f.g.aa=2g(18(){f.59()},7u)}});f.g.ab=2g(18(){6(!f.g.2S){f.d.aT("cJ cK: cM bl.31(); 44 $(2q).31(); cL 8U");f.g.2S=1c;f.59()}},1P)}}};f.59=18(){6(!e("4u").1f("4N")){e("4u").1f("4N","12-7q")}19 6(!e("3U").1f("4N")){e("3U").1f("4N","12-7q")}f.g.1A=18(){1T e(u).1d()};f.g.1H=18(){1T e(u).1e()};e(u).17(".12-4G").2x("12-4G").1r("12-1p");e(u).17(\'.12-1p > *[1t*="12-s"]\').1O(18(){16 t=e(14).1f("1t").1E("12-s")[1].1E(" ")[0];e(14).2x("12-s"+t).1r("12-l"+t)});6(f.o.b8){f.o.33=f.o.b8}6(f.o.cN===1g){f.o.4B=1g}6(e(u).17(".12-1p").1k==1){f.o.7g=1g;f.o.8M=1g;f.o.7e=1g;f.o.7h=1g;f.o.4j=0;f.o.7m=1g;f.o.2u=1c;f.o.33=1;f.o.3e="av"}6(f.o.1d){f.g.8y=f.g.2E=""+f.o.1d}19{f.g.8y=f.g.2E=e(u)[0].1N.1d}6(f.o.1e){f.g.4m=""+f.o.1e}19{f.g.4m=e(u)[0].1N.1e}6(f.g.2E.1i("%")==-1&&f.g.2E.1i("1J")==-1){f.g.2E+="1J"}6(f.g.4m.1i("%")==-1&&f.g.4m.1i("1J")==-1){f.g.4m+="1J"}6(f.o.9L&&f.g.2E.1i("1J")!=-1&&f.g.4m.1i("1J")!=-1){f.g.4a=1c}19{f.g.4a=1g}e(u).17(\'*[1t*="12-l"], *[1t*="12-bg"]\').1O(18(){6(!e(14).24().30("12-1p")){e(14).cU(e(14).24())}});e(u).17(".12-1p").1O(18(){e(14).3h(\':2I([1t*="12-"])\').1O(18(){e(14).7a()});16 t=e("<1n>").1r("12-cT");6(e(14).17(".12-bg").1k){t.cQ(e(14).17(".12-bg").eq("0"))}19{t.6q(e(14))}});e(u).17(\'.12-1p, *[1t*="12-l"]\').1O(18(){6(e(14).11("12")||e(14).1f("55")||e(14).1f("1N")){6(e(14).11("12")){16 t=e(14).11("12").20().1E(";")}19 6(e(14).1f("55")&&e(14).1f("55").1i(":")!=-1&&e(14).1f("55").1i(";")!=-1){16 t=e(14).1f("55").20().1E(";")}19{16 t=e(14).1f("1N").20().1E(";")}23(x=0;x<t.1k;x++){3G=t[x].1E(":");6(3G[0].1i("4A")!=-1){3G[1]=f.ak(3G[1])}16 n="";6(3G[2]){n=":"+e.5A(3G[2])}6(3G[0]!=" "&&3G[0]!=""){e(14).11(e.5A(3G[0]),e.5A(3G[1])+n)}}}16 r=e(14);r.11("4h",r[0].1N.1m);r.11("4k",r[0].1N.1q);6(e(14).3m("a")&&e(14).3h().1k>0){r=e(14).3h()}16 i=r.1d();16 s=r.1e();6(r[0].1N.1d&&r[0].1N.1d.1i("%")!=-1){i=r[0].1N.1d}6(r[0].1N.1e&&r[0].1N.1e.1i("%")!=-1){s=r[0].1N.1e}r.11("2Z",i);r.11("2Y",s);r.11("7F",r.1a("28-1m"));r.11("7z",r.1a("28-1F"));r.11("8R",r.1a("28-1q"));r.11("8Q",r.1a("28-1o"));16 o=1W 3i(r.1a("2Q"))=="3V"?1C.cD(3i(r.1a("2Q"))*1D)/1D:1;e(14).11("7d",o);6(r.1a("3v-1m-1d").1i("1J")==-1){r.11("6H",r[0].1N.9d)}19{r.11("6H",r.1a("3v-1m-1d"))}6(r.1a("3v-1F-1d").1i("1J")==-1){r.11("6K",r[0].1N.97)}19{r.11("6K",r.1a("3v-1F-1d"))}6(r.1a("3v-1q-1d").1i("1J")==-1){r.11("6J",r[0].1N.9g)}19{r.11("6J",r.1a("3v-1q-1d"))}6(r.1a("3v-1o-1d").1i("1J")==-1){r.11("6I",r[0].1N.9V)}19{r.11("6I",r.1a("3v-1o-1d"))}r.11("9u",r.1a("9h-9j"));r.11("9n",r.1a("9k-1e"))});6(6c.4M.aV){23(16 t=0;t<e(u).17(".12-1p").1k;t++){6(e(u).17(".12-1p").eq(t).11("cp")==6c.4M.aV.1E("#")[1]){f.o.33=t+1}}}e(u).17(\'*[1t*="12-7K-"]\').1O(18(){16 t=e(14).1f("1t").1E(" ");23(16 n=0;n<t.1k;n++){6(t[n].1i("12-7K-")!=-1){16 r=1b(t[n].1E("12-7K-")[1]);e(14).1a({cq:"cj"}).2k(18(t){t.3t();e(u).2V(r)})}}});f.g.2y=e(u).17(".12-1p").1k;6(f.o.7k&&f.g.2y>2){f.o.33=="2h";f.o.92=1g}19{f.o.7k=1g}6(f.o.33=="2h"){f.o.33=1C.26(1C.2h()*f.g.2y+1)}f.o.5h=f.o.5h<f.g.2y+1?f.o.5h:1;f.o.5h=f.o.5h<1?1:f.o.5h;f.g.4r=1;6(f.o.4B){f.g.4r=0}16 n=6c.4M.2i.1i("cs:")===-1?"":"6P:";e(u).17(\'2b[1h*="66.53"], 2b[1h*="53.be"]\').1O(18(){e(14).24().1r("12-2M-4G");6(e(14).24(\'[1t*="12-l"]\')){16 t=e(14);16 r=n;e.bA(r+"//cA.8j.5N/cB/bH/cz/"+e(14).1f("1h").1E("89/")[1].1E("?")[0]+"?v=2&5J=bS&bQ=?",18(e){t.11("6Q",1b(e["ar"]["cv$ap"]["cx$2l"]["dt"])*1P)});16 i=e("<1n>").1r("12-67").1w(e(14).24());6(f.o.47){e("<1Z>").1w(i).1r("12-2F").1f("5J","6O 2M").11("1h",r+"//1Z.8j.5N/bx/"+e(14).1f("1h").1E("89/")[1].1E("?")[0]+"/"+f.o.87)}19{e("<1Z>").1w(i).1r("12-2F").1f("5J","6O 2M").1f("1h",r+"//1Z.8j.5N/bx/"+e(14).1f("1h").1E("89/")[1].1E("?")[0]+"/"+f.o.87)}e("<1n>").1w(i).1r("12-bM");e(14).24().1a({1d:e(14).1d(),1e:e(14).1e()}).2k(18(){f.g.36=1c;6(f.g.38){6(f.o.2u!=1g){f.g.38=1g}f.g.2t=1c}19{f.g.2t=f.g.2w}6(f.o.2u!=1g){f.1x()}f.g.5b=1c;r=e(14).17("2b").11("3X").1i("6P")===-1?n:"";e(14).17("2b").1f("1h",r+e(14).17("2b").11("3X"));e(14).17(".12-67").1M(f.g.v.d).3J(f.g.v.fo,18(){6(f.o.2u=="1U"&&f.g.2t==1c){16 e=2g(18(){f.22()},t.11("6Q")-f.g.v.d);t.11("6C",e)}f.g.36=1g;6(f.g.2T==1c){f.3s(f.g.1L,18(){f.g.2T=1g})}})});16 s="&";6(e(14).1f("1h").1i("?")==-1){s="?"}16 o="&ba=b4&ds=1";6(e(14).1f("1h").1i("4f")==-1){e(14).11("3X",e(14).1f("1h")+s+"4f=1"+o)}19{e(14).11("3X",e(14).1f("1h").2j("4f=0","4f=1")+o)}e(14).11("2Z",e(14).1f("1d"));e(14).11("2Y",e(14).1f("1e"));e(14).1f("1h","")}});e(u).17(\'2b[1h*="62.52"]\').1O(18(){e(14).24().1r("12-2M-4G");6(e(14).24(\'[1t*="12-l"]\')){16 t=e(14);16 r=n;16 i=e("<1n>").1r("12-67").1w(e(14).24());e.bA(r+"//52.5N/bH/dr/2M/"+e(14).1f("1h").1E("2M/")[1].1E("?")[0]+".bS?bQ=?",18(n){6(f.o.47){e("<1Z>").1w(i).1r("12-2F").1f("5J","6O 2M").11("1h",n[0]["bJ"])}19{e("<1Z>").1w(i).1r("12-2F").1f("5J","6O 2M").1f("1h",n[0]["bJ"])}t.11("6Q",1b(n[0]["2l"])*1P);e("<1n>").1w(i).1r("12-bM")});e(14).24().1a({1d:e(14).1d(),1e:e(14).1e()}).2k(18(){f.g.36=1c;6(f.g.38){6(f.o.2u!=1g){f.g.38=1g}f.g.2t=1c}19{f.g.2t=f.g.2w}6(f.o.2u!=1g){f.1x()}f.g.5b=1c;r=e(14).17("2b").11("3X").1i("6P")===-1?n:"";e(14).17("2b").1f("1h",r+e(14).17("2b").11("3X"));e(14).17(".12-67").1M(f.g.v.d).3J(f.g.v.fo,18(){6(f.o.2u=="1U"&&f.g.2t==1c){16 e=2g(18(){f.22()},t.11("6Q")-f.g.v.d);t.11("6C",e)}f.g.36=1g;6(f.g.2T==1c){f.3s(f.g.1L,18(){f.g.2T=1g})}})});16 s="&";6(e(14).1f("1h").1i("?")==-1){s="?"}16 o="&ba=b4";6(e(14).1f("1h").1i("4f")==-1){e(14).11("3X",e(14).1f("1h")+s+"4f=1"+o)}19{e(14).11("3X",e(14).1f("1h").2j("4f=0","4f=1")+o)}e(14).11("2Z",e(14).1f("1d"));e(14).11("2Y",e(14).1f("1e"));e(14).1f("1h","")}});e(u).17("2M, 6X").1O(18(){16 t=1W e(14).1f("1d")!=="2W"?e(14).1f("1d"):"dF";16 n=1W e(14).1f("1e")!=="2W"?e(14).1f("1e"):""+e(14).1e();6(t.1i("%")===-1){t=1b(t)}6(n.1i("%")===-1){n=1b(n)}6(t==="1D%"&&(n===0||n==="0"||n==="1D%")){e(14).1f("1e","1D%");n="1U"}e(14).24().1r("12-2M-4G").1a({1d:t,1e:n}).11({2Z:t,2Y:n});16 r=e(14);e(14).5E("1d").5E("1e").1a({1d:"1D%",1e:"1D%"}).2k(18(){6(1W r.1f("bq")==="2W"){14.dC=0;14.dB()}f.g.36=1c;6(f.g.38){6(f.o.2u!==1g){f.g.38=1g}f.g.2t=1c}19{f.g.2t=f.g.2w}6(f.o.2u!==1g){f.1x()}f.g.5b=1c;e(14).4e("d9",18(){6(f.o.2u==="1U"&&f.g.2t===1c){f.22()}});f.g.36=1g;6(f.g.2T===1c){f.3s(f.g.1L,18(){f.g.2T=1g})}})});6(f.o.4B){f.o.33=f.o.33-1===0?f.g.2y:f.o.33-1}f.g.27=f.o.33;f.g.1L=e(u).17(".12-1p:eq("+(f.g.27-1)+")");e(u).17(".12-1p").dh(\'<1n 1t="12-2c"></1n>\');6(f.o.9W){f.g.3u=e("<1n>").1r("12-dg-5Q").1w(e(u).17(".12-2c"))}6(f.o.a6&&!f.g.2o){f.g.3f=e("<1n>").1r("12-df-5Q").1w(e(u).17(".12-2c"));f.g.3f.3S(e(\'<1n 1t="12-ct-1m"><1n 1t="12-ct-3F"><1n 1t="12-ct-9N"><1n 1t="12-ct-a5"></1n></1n></1n></1n><1n 1t="12-ct-1F"><1n 1t="12-ct-3F"><1n 1t="12-ct-9N"><1n 1t="12-ct-a5"></1n></1n></1n></1n><1n 1t="12-ct-cc"></1n>\'))}f.g.3E=e("<1n>").1a({aD:-1,1K:"1Q"}).1r("12-9T-2n").1w(e(u));e("<1n>").1r("12-9T-c7").1w(f.g.3E);6(e(u).1a("3x")=="c8"){e(u).1a("3x","aq")}6(f.o.7p){e(u).17(".12-2c").1a({bX:"63("+f.o.7p+")"})}19{e(u).17(".12-2c").1a({bY:f.o.8q})}6(f.o.8q=="8p"&&f.o.7p==1g){e(u).17(".12-2c").1a({3l:"1Q 8p !bZ"})}e(u).17(".12-1p 1Z").1O(18(){e(14).5E("1d").5E("1e");6(f.o.43===1c&&f.o.47===1c){6(1W e(14).11("1h")!=="5T"){e(14).11("1h",e(14).1f("1h"));16 t=f.o.3z+"../1a/c0.c6";e(14).1f("1h",t)}}19{6(1W e(14).11("1h")==="5T"){e(14).1f("1h",e(14).11("1h"));e(14).5E("11-1h")}}});e(u).17(".12-1p").4e("cd",18(t){f.g.bG=t.8X-e(14).24().5m().1m;f.g.bF=t.bE-e(14).24().5m().1q});e(u).17(".12-1p").4e("aj",18(t){16 n=e(14).24().5m().1m+f.g.bG;16 r=e(14).24().5m().1q+f.g.bF;16 i=t.8X-n;16 s=t.bE-r;e(14).17("> *:2I(.12-bg)").1O(18(){6(1W e(14).11("4V")!=="2W"&&1b(e(14).11("4V"))!==0){e(14).1a({3p:-i/1D*1b(e(14).11("4V")),3O:-s/1D*1b(e(14).11("4V"))})}})});e(u).17(".12-1p").4e("ce",18(){e(14).17("> *:2I(.12-bg)").1O(18(){6(1W e(14).11("4V")!=="2W"&&1b(e(14).11("4V"))!==0){3a.2e(14,.4,{1a:{3p:0,3O:0}})}})});6(f.o.8M){e(\'<a 1t="12-1s-1S" 2i="#" />\').2k(18(t){t.3t();e(u).2V("1S")}).1w(e(u));e(\'<a 1t="12-1s-1X" 2i="#" />\').2k(18(t){t.3t();e(u).2V("1X")}).1w(e(u));6(f.o.9F){e(u).17(".12-1s-1S, .12-1s-1X").1a({1K:"1Q"});e(u).1R(18(){6(!f.g.8r){6(f.g.2o){e(u).17(".12-1s-1S, .12-1s-1X").1a("1K","2m")}19{e(u).17(".12-1s-1S, .12-1s-1X").1x(1c,1c).2J(2z)}}},18(){6(f.g.2o){e(u).17(".12-1s-1S, .12-1s-1X").1a("1K","1Q")}19{e(u).17(".12-1s-1S, .12-1s-1X").1x(1c,1c).3J(2z)}})}}6(f.o.7e||f.o.7h){16 r=e(\'<1n 1t="12-1o-1s-2R" />\').1w(e(u));f.g.3n=r;6(f.o.3e=="4R"){r.1r("12-aJ-5i")}6(f.o.7h&&f.o.3e!="4R"){e(\'<5G 1t="12-1o-4T" />\').1w(e(u).17(".12-1o-1s-2R"));6(f.o.3e=="1R"){16 i=e(\'<1n 1t="12-1G-1R"><1n 1t="12-1G-1R-2c"><1n 1t="12-1G-1R-bg"></1n><1n 1t="12-1G-1R-1Z"><1Z></1n><5G></5G></1n></1n>\').1w(e(u).17(".12-1o-4T"))}23(x=1;x<f.g.2y+1;x++){16 s=e(\'<a 2i="#" />\').1w(e(u).17(".12-1o-4T")).2k(18(t){t.3t();e(u).2V(e(14).5D()+1)});6(f.o.3e=="1R"){e(u).17(".12-1G-1R, .12-1G-1R-1Z").1a({1d:f.o.7V,1e:f.o.65});16 o=e(u).17(".12-1G-1R");16 a=o.17("1Z").1a({1e:f.o.65});16 l=e(u).17(".12-1G-1R-2c").1a({29:"2O",1K:"2m"});s.1R(18(){16 t=e(u).17(".12-1p").eq(e(14).5D());16 n;6(f.o.43===1c&&f.o.47===1c){6(t.17(".12-4l").1k){n=t.17(".12-4l").11("1h")}19 6(t.17(".12-2F").1k){n=t.17(".12-2F").11("1h")}19 6(t.17(".12-bg").1k){n=t.17(".12-bg").11("1h")}19{n=f.o.3z+f.o.2r+"/6D.4H"}}19{6(t.17(".12-4l").1k){n=t.17(".12-4l").1f("1h")}19 6(t.17(".12-2F").1k){n=t.17(".12-2F").1f("1h")}19 6(t.17(".12-bg").1k){n=t.17(".12-bg").1f("1h")}19{n=f.o.3z+f.o.2r+"/6D.4H"}}e(u).17(".12-1G-1R-1Z").1a({1m:1b(o.1a("28-1m")),1q:1b(o.1a("28-1q"))});a.31(18(){6(e(14).1d()==0){a.1a({3x:"aq",3j:"0 1U",1m:"1U"})}19{a.1a({3x:"cf",3p:-e(14).1d()/2,1m:"50%"})}}).1f("1h",n);o.1a({1K:"2m"}).1x().4s({1m:e(14).3x().1m+(e(14).1d()-o.3D())/2},8i);l.1a({1K:"1Q",29:"34"}).1x().2J(8i)},18(){l.1x().3J(8i,18(){o.1a({29:"2O",1K:"2m"})})})}}6(f.o.3e=="1R"){i.1w(e(u).17(".12-1o-4T"))}e(u).17(".12-1o-4T a:eq("+(f.o.33-1)+")").1r("12-1s-1V")}6(f.o.7e){16 c=e(\'<a 1t="12-1s-22" 2i="#" />\').2k(18(t){t.3t();e(u).2V("22")}).6q(e(u).17(".12-1o-1s-2R"));16 h=e(\'<a 1t="12-1s-1x" 2i="#" />\').2k(18(t){t.3t();e(u).2V("1x")}).1w(e(u).17(".12-1o-1s-2R"))}19 6(f.o.3e!="4R"){e(\'<5G 1t="12-1s-aw 12-1s-cb" />\').6q(e(u).17(".12-1o-1s-2R"));e(\'<5G 1t="12-1s-aw 12-1s-bW" />\').1w(e(u).17(".12-1o-1s-2R"))}6(f.o.7j&&f.o.3e!="4R"){r.1a({1K:"1Q"});e(u).1R(18(){6(!f.g.8r){6(f.g.2o){r.1a("1K","2m")}19{r.1x(1c,1c).2J(2z)}}},18(){6(f.g.2o){r.1a("1K","1Q")}19{r.1x(1c,1c).3J(2z)}})}}6(f.o.3e=="4R"){f.g.42=e(\'<1n 1t="12-1G-2R"></1n>\').1w(e(u));16 i=e(\'<1n 1t="12-1G"><1n 1t="12-1G-2c"><1n 1t="12-1G-1p-2n"><1n 1t="12-1G-1p"></1n></1n></1n></1n>\').1w(f.g.42);f.g.5i=e(u).17(".12-1G-1p-2n");6(!("6s"3M 2q)){f.g.5i.1R(18(){e(14).1r("12-1G-1p-1R")},18(){e(14).2x("12-1G-1p-1R");f.7y()}).aj(18(t){16 n=1b(t.8X-e(14).5m().1m)/e(14).1d()*(e(14).1d()-e(14).17(".12-1G-1p").1d());e(14).17(".12-1G-1p").1x().1a({3p:n})})}19{f.g.5i.1r("12-c9")}e(u).17(".12-1p").1O(18(){16 t=e(14).5D()+1;16 n;6(f.o.43===1c&&f.o.47===1c){6(e(14).17(".12-4l").1k){n=e(14).17(".12-4l").11("1h")}19 6(e(14).17(".12-2F").1k){n=e(14).17(".12-2F").11("1h")}19 6(e(14).17(".12-bg").1k){n=e(14).17(".12-bg").11("1h")}19{n=f.o.3z+f.o.2r+"/6D.4H"}}19{6(e(14).17(".12-4l").1k){n=e(14).17(".12-4l").1f("1h")}19 6(e(14).17(".12-2F").1k){n=e(14).17(".12-2F").1f("1h")}19 6(e(14).17(".12-bg").1k){n=e(14).17(".12-bg").1f("1h")}19{n=f.o.3z+f.o.2r+"/6D.4H"}}16 r=e(\'<a 2i="#" 1t="12-4g-\'+t+\'"><1Z 1h="\'+n+\'"></a>\');r.1w(e(u).17(".12-1G-1p"));6(!("6s"3M 2q)){r.1R(18(){e(14).3h().1x().6t(2z,f.o.7U/1D)},18(){6(!e(14).3h().30("12-4g-1V")){e(14).3h().1x().6t(2z,f.o.81/1D)}})}r.2k(18(n){n.3t();e(u).2V(t)})});6(c&&h){16 p=f.g.3n=e(\'<1n 1t="12-1o-1s-2R 12-cg-5i"></1n>\').1w(e(u));c.8c().2k(18(t){t.3t();e(u).2V("22")}).1w(p);h.8c().2k(18(t){t.3t();e(u).2V("1x")}).1w(p)}6(f.o.7j){f.g.42.1a("1K","1Q");6(p){f.g.3n=p.1a("1K")=="2m"?p:e(u).17(".12-aJ-5i");f.g.3n.1a("1K","1Q")}e(u).1R(18(){e(u).1r("12-1R");6(!f.g.8r){6(f.g.2o){f.g.42.1a("1K","2m");6(f.g.3n){f.g.3n.1a("1K","2m")}}19{f.g.42.1x(1c,1c).2J(2z);6(f.g.3n){f.g.3n.1x(1c,1c).2J(2z)}}}},18(){e(u).2x("12-1R");6(f.g.2o){f.g.42.1a("1K","1Q");6(f.g.3n){f.g.3n.1a("1K","1Q")}}19{f.g.42.1x(1c,1c).3J(2z);6(f.g.3n){f.g.3n.1x(1c,1c).3J(2z)}}})}}f.g.40=e(\'<1n 1t="12-40"></1n>\').1w(e(u));6(f.g.40.1a("1K")=="2m"&&!f.g.40.17("1Z").1k){f.g.6G=18(){f.g.40.1a({1K:"1Q",29:"34"}).2J(41,18(){f.g.6G=1g})};f.g.51=e("<1Z>").1f("1h",f.o.3z+f.o.2r+"/40.4H").1w(f.g.40);f.g.9B=1W 1b(e(u).1a("28-1o"))=="3V"?1b(e(u).1a("28-1o")):0}f.8t();6(f.o.9y&&e(u).17(".12-1p").1k>1){e("3U").6F("bU",18(e){6(!f.g.36&&!f.g.48){6(e.bm==37){f.o.7v(f.g);f.1S("6j")}19 6(e.bm==39){f.o.7l(f.g);f.1X("6j")}}})}6("6s"3M 2q&&e(u).17(".12-1p").1k>1&&f.o.9G){e(u).17(".12-2c").6F("ec",18(e){16 t=e.5a?e.5a:e.bf.5a;6(t.1k==1){f.g.6E=f.g.5z=t[0].bK}});e(u).17(".12-2c").6F("eD",18(e){16 t=e.5a?e.5a:e.bf.5a;6(t.1k==1){f.g.5z=t[0].bK}6(1C.49(f.g.6E-f.g.5z)>45){e.3t()}});e(u).17(".12-2c").6F("eV",18(t){6(1C.49(f.g.6E-f.g.5z)>45){6(f.g.6E-f.g.5z>0){f.o.7l(f.g);e(u).2V("1X")}19{f.o.7v(f.g);e(u).2V("1S")}}})}6(f.o.9M==1c&&e(u).17(".12-1p").1k>1){e(u).17(".12-2c").1R(18(){f.o.au(f.g);6(f.g.2w){f.g.38=1c;f.1x();6(f.g.3u){f.g.3u.1x()}6(f.g.3f){6(f.g.2P){f.g.2P.68()}}f.g.46=(1I 57).4U()}},18(){6(f.g.38==1c){f.22();f.g.38=1g}})}f.8z();6(f.o.1u){f.g.1u=e("<1Z>").1r("12-eU").1w(e(u)).1f("1N",f.o.bo).1a({29:"2O",1K:"eT"}).31(18(){16 t=0;6(!f.g.1u){t=1P}2g(18(){f.g.1u.11("2Z",f.g.1u.1d());f.g.1u.11("2Y",f.g.1u.1e());6(f.g.1u.1a("1m")!="1U"){f.g.1u.11("4h",f.g.1u[0].1N.1m)}6(f.g.1u.1a("1F")!="1U"){f.g.1u.11("6e",f.g.1u[0].1N.1F)}6(f.g.1u.1a("1q")!="1U"){f.g.1u.11("4k",f.g.1u[0].1N.1q)}6(f.g.1u.1a("1o")!="1U"){f.g.1u.11("6d",f.g.1u[0].1N.1o)}6(f.o.7Z!=1g){e("<a>").1w(e(u)).1f("2i",f.o.7Z).1f("eR",f.o.bp).1a({eS:"1Q",eW:"1Q"}).3S(f.g.1u)}f.g.1u.1a({1K:"1Q",29:"34"});f.8Z()},t)}).1f("1h",f.o.1u)}e(2q).2T(18(){f.g.2T=1c;6(!f.g.36){f.3s(f.g.1L,18(){6(f.g.2D){f.g.2D.5C()}f.g.2T=1g});6(f.g.1u){f.8Z()}}});f.g.9a=1c;6(f.o.4B==1c){6(f.o.7g){f.g.2w=1c;e(u).17(".12-1s-22").1r("12-1s-22-1V")}19{e(u).17(".12-1s-1x").1r("12-1s-1x-1V")}f.1X()}19{f.43(f.g.1L,18(){f.g.1L.2J(1P,18(){f.g.48=1g;e(14).1r("12-1V");6(f.o.86){e(14).1M(e(14).11("5d")+25).f1(18(){e(14).17(".12-2F, 2M, 6X").2k();e(14).8D()})}f.g.1L.17(\' > *[1t*="12-l"]\').1O(18(){6(e(14).11("5v")>0){16 t=e(14);t.11("6W",2g(18(){f.8H(t)},t.11("5v")))}})});f.7R(f.g.27);6(f.o.7g){f.g.48=1g;f.22()}19{e(u).17(".12-1s-1x").1r("12-1s-1x-1V")}})}f.o.bz(e(u))};f.22=18(){6(f.g.2w){6(f.g.2f=="1S"&&f.o.92){f.1S()}19{f.1X()}}19{f.g.2w=1c;6(!f.g.36&&!f.g.48){f.5Q()}}e(u).17(".12-1s-22").1r("12-1s-22-1V");e(u).17(".12-1s-1x").2x("12-1s-1x-1V")};f.5Q=18(){6(e(u).17(".12-1V").11("12")){16 t=f.4Z.7i}19{16 t=f.o.7i}16 n=e(u).17(".12-1V").11("5H")?1b(e(u).17(".12-1V").11("5H")):t;6(!f.o.4B&&!e(u).17(".12-1V").11("5H")){16 r=e(u).17(".12-1p:eq("+(f.o.33-1)+")").11("5H");n=r?r:t}2v(f.g.4o);6(f.g.46){6(!f.g.4d){f.g.4d=(1I 57).4U()}6(f.g.4d>f.g.46){f.g.46=(1I 57).4U()}6(!f.g.3I){f.g.3I=n}f.g.3I-=f.g.46-f.g.4d;f.g.46=1g;f.g.4d=(1I 57).4U()}19{f.g.3I=n;f.g.4d=(1I 57).4U()}f.g.3I=1b(f.g.3I);f.g.4o=2g(18(){f.g.4d=f.g.46=f.g.3I=1g;f.22()},f.g.3I);6(f.g.3u){f.g.3u.4s({1d:f.g.1A()},f.g.3I,"8b",18(){e(14).1a({1d:0})})}6(f.g.3f){16 i=f.g.3f.17(".12-ct-1F .12-ct-3F");16 s=f.g.3f.17(".12-ct-1m .12-ct-3F");6(f.g.3f.1a("1K")=="1Q"){i.1a({3F:0});s.1a({3F:0});f.g.3f.2J(b1)}6(!f.g.2P){f.g.2P=1I bD;f.g.2P.aZ(3a.6R(i[0],n/b0,{3g:0},{3T:7B.7A,3g:6N,f0:18(){f.g.2P=1g}}));f.g.2P.aZ(3a.6R(s[0],n/b0,{3g:0},{3T:7B.7A,3g:6N}))}19{f.g.2P.eZ()}}};f.1x=18(){f.g.46=(1I 57).4U();6(f.g.3u){f.g.3u.1x()}6(f.g.3f){6(f.g.2P){f.g.2P.68()}}6(!f.g.38&&!f.g.2t){e(u).17(".12-1s-1x").1r("12-1s-1x-1V");e(u).17(".12-1s-22").2x("12-1s-22-1V")}2v(f.g.4o);f.g.2w=1g};f.af=18(){2v(f.g.4o);f.g.2w=1g;2v(f.g.a9);2v(f.g.a8);2v(f.g.aa);2v(f.g.ab);2v(f.g.aB);6(f.g.3u){f.g.3u.1x()}6(f.g.3f){6(f.g.2P){f.g.2P.68()}}e(u).17("*").1x(1c,1g).8D();e(u).17(".12-1p >").1O(18(){6(e(14).11("3N")){e(14).11("3N").68()}});6(!f.g.38&&!f.g.2t){e(u).17(".12-1s-1x").1r("12-1s-1x-1V");e(u).17(".12-1s-22").2x("12-1s-22-1V")}};f.eY=18(){e(u).17("*").1x();2v(f.g.4o);f.4C(f.g.27,f.g.2f)};f.ak=18(t){6(e.5A(t.20())=="aR"||e.5A(t.20())=="8b"){1T t.20()}19{1T t.2j("7E","aS").2j("7J","ay").2j("7H","az").2j("eQ","eP").2j("eH","eG").2j("eF","eE").2j("eJ","eO").2j("eN","eM").2j("eK","eL").2j("f3","fp").2j("fm","fl").2j("5P","fj").2j("fk","fq")}};f.1S=18(e){6(f.g.27<2){f.g.4r+=1}6(f.g.4r>f.o.4j&&f.o.4j>0&&!e){f.g.4r=0;f.1x();6(f.o.7m==1g){f.o.4j=0}}19{16 t=f.g.27<2?f.g.2y:f.g.27-1;f.g.2f="1S";f.4C(t,f.g.2f)}};f.1X=18(e){6(!f.o.7k){6(!(f.g.27<f.g.2y)){f.g.4r+=1}6(f.g.4r>f.o.4j&&f.o.4j>0&&!e){f.g.4r=0;f.1x();6(f.o.7m==1g){f.o.4j=0}}19{16 t=f.g.27<f.g.2y?f.g.27+1:1;f.g.2f="1X";f.4C(t,f.g.2f)}}19 6(!e){16 t=f.g.27;16 n=18(){t=1C.26(1C.2h()*f.g.2y)+1;6(t==f.g.27){n()}19{f.g.2f="1X";f.4C(t,f.g.2f)}};n()}19 6(e){16 t=f.g.27<f.g.2y?f.g.27+1:1;f.g.2f="1X";f.4C(t,f.g.2f)}};f.4C=18(t,n){f.g.4d=f.g.46=f.g.3I=1g;6(f.g.3u){f.g.3u.1x().1M(2z).4s({1d:0},fr)}6(f.g.3f){f.g.3f.3J(41);6(f.g.2P){f.g.2P.5W().2l(.35)}}6(f.g.5b==1c){f.g.5b=1g;f.g.2w=f.g.2t;f.g.1L.17(\'2b[1h*="66.53"], 2b[1h*="62.52"]\').1O(18(){e(14).24().17(".12-67").2J(f.g.v.fi,18(){e(14).24().17("2b").1f("1h","")})});f.g.1L.17("2M, 6X").1O(18(){14.68()})}e(u).17(\'2b[1h*="66.53"], 2b[1h*="62.52"]\').1O(18(){2v(e(14).11("6C"))});2v(f.g.4o);f.g.61=t;f.g.1v=e(u).17(".12-1p:eq("+(f.g.61-1)+")");6(!n){6(f.g.27<f.g.61){f.g.2f="1X"}19{f.g.2f="1S"}}16 r=0;6(e(u).17(\'2b[1h*="66.53"], 2b[1h*="62.52"]\').1k>0){r=f.g.v.fi}f.43(f.g.1v,18(){f.4s()})};f.43=18(t,n){f.g.48=1c;6(f.g.9a){e(u).1a({29:"34"})}6(f.o.43){16 r=[];16 i=0;6(t.1a("3l-2K")!="1Q"&&t.1a("3l-2K").1i("63")!=-1&&!t.30("12-3w")&&!t.30("12-2I-3w")){16 s=t.1a("3l-2K");s=s.3H(/63\\((.*)\\)/)[1].2j(/"/9U,"");r[r.1k]=[s,t]}t.17("1Z:2I(.12-3w, .12-2I-3w)").1O(18(){6(f.o.47===1c){e(14).1f("1h",e(14).11("1h"))}r[r.1k]=[e(14).1f("1h"),e(14)]});t.17("*").1O(18(){6(e(14).1a("3l-2K")!="1Q"&&e(14).1a("3l-2K").1i("63")!=-1&&!e(14).30("12-3w")&&!e(14).30("12-2I-3w")){16 t=e(14).1a("3l-2K");t=t.3H(/63\\((.*)\\)/)[1].2j(/"/9U,"");r[r.1k]=[t,e(14)]}});6(r.1k==0){e(".12-1G-2R, .12-1s-1X, .12-1s-1S, .12-1o-1s-2R").1a({29:"34"});f.3s(t,n)}19{6(f.g.2o){f.g.3E.1a("1K","2m")}19{f.g.3E.1M(9A).2J(2z)}23(x=0;x<r.1k;x++){e("<1Z>").11("el",r[x]).31(18(){e(14).11("el")[1].1r("12-3w");6(++i==r.1k){f.g.3E.1x(1c,1c).1a({1K:"1Q"});e(".12-1G-2R, .12-1s-1X, .12-1s-1S, .12-1o-1s-2R").1a({29:"34"});6(3W.3Y.1i("fv/7")!==-1||f.g.2o){2g(18(){f.3s(t,n)},50)}19{f.3s(t,n)}}}).3Z(18(){16 t=e(14).11("el")[0].9D(e(14).11("el")[0].9O("/")+1,e(14).11("el")[0].1k);6(2q.4w){4w.ft(\'2A 3Z:\\r\\n\\r\\6x 6L 4K 21 6M 2X 21 2K 44 3l 2K "\'+t+\'" 3m 71 2e a 70 4M 4Q 4i 6Z be 2S. 4P 6Y 21 72 2X 4t 4O 73 76 3M 21 75.\')}19{9P(\'2A 3Z:\\r\\n\\r\\6x 6L 4K 21 6M 2X 21 2K 44 3l 2K "\'+t+\'" 3m 71 2e a 70 4M 4Q 4i 6Z be 2S. 4P 6Y 21 72 2X 4t 4O 73 76 3M 21 75.\')}e(14).1r("12-2I-3w");i++}).1f("1h",r[x][0])}}}19{e(".12-1G-2R, .12-1s-1X, .12-1s-1S, .12-1o-1s-2R").1a({29:"34"});f.3s(t,n)}};f.3s=18(t,n){t.1a({29:"2O",1K:"2m"});6(f.g.6G){f.g.6G()}f.8z();6(f.o.3e=="4R"){f.9J()}t.3h().1O(18(){16 t=e(14);16 n=t.11("4h")?t.11("4h"):"0";16 r=t.11("4k")?t.11("4k"):"0";6(t.3m("a")&&t.3h().1k>0){t.1a({1K:"2m"});t=t.3h()}16 i="1U";16 s="1U";6(t.11("2Z")){6(1W t.11("2Z")=="3V"){i=1b(t.11("2Z"))*f.g.1z}19 6(t.11("2Z").1i("%")!=-1){i=t.11("2Z")}}6(t.11("2Y")){6(1W t.11("2Y")=="3V"){s=1b(t.11("2Y"))*f.g.1z}19 6(t.11("2Y").1i("%")!=-1){s=t.11("2Y")}}16 o=t.11("7F")?1b(t.11("7F"))*f.g.1z:0;16 a=t.11("7z")?1b(t.11("7z"))*f.g.1z:0;16 l=t.11("8R")?1b(t.11("8R"))*f.g.1z:0;16 c=t.11("8Q")?1b(t.11("8Q"))*f.g.1z:0;16 h=t.11("6H")?1b(t.11("6H"))*f.g.1z:0;16 p=t.11("6K")?1b(t.11("6K"))*f.g.1z:0;16 d=t.11("6J")?1b(t.11("6J"))*f.g.1z:0;16 v=t.11("6I")?1b(t.11("6I"))*f.g.1z:0;16 m=t.11("9u");16 g=t.11("9n");6(f.g.4a||f.o.4E>0){6(t.3m("1Z")&&!t.30("12-bg")&&t.1f("1h")){t.1a({1d:"1U",1e:"1U"});6((i==0||i=="1U")&&1W s=="3V"&&s!=0){i=s/t.1e()*t.1d()}6((s==0||s=="1U")&&1W i=="3V"&&i!=0){s=i/t.1d()*t.1e()}6(i=="1U"){i=t.1d()*f.g.1z}6(s=="1U"){s=t.1e()*f.g.1z}t.1a({1d:i,1e:s})}6(!t.3m("1Z")){t.1a({1d:i,1e:s,"9h-9j":1b(m)*f.g.1z+"1J","9k-1e":1b(g)*f.g.1z+"1J"})}6(t.3m("1n")&&t.17("2b").11("3X")){16 y=t.17("2b");y.1f("1d",1b(y.11("2Z"))*f.g.1z).1f("1e",1b(y.11("2Y"))*f.g.1z);t.1a({1d:1b(y.11("2Z"))*f.g.1z,1e:1b(y.11("2Y"))*f.g.1z})}t.1a({28:l+"1J "+a+"1J "+c+"1J "+o+"1J ",9d:h+"1J",97:p+"1J",9g:d+"1J",9V:v+"1J"})}6(!t.30("12-bg")){16 b=t;6(t.24().3m("a")){t=t.24()}16 w=0;6(f.o.7f){w=f.o.7f>0?(f.g.1A()-f.o.7f)/2:0}19 6(f.o.8E){w=f.o.8E>0?(f.g.1A()-f.o.8E)/2:0}w=w<0?0:w;6(n.1i("%")!=-1){t.1a({1m:f.g.1A()/1D*1b(n)-b.1d()/2-o-h})}19 6(w>0||f.g.4a||f.o.4E>0){t.1a({1m:w+1b(n)*f.g.1z})}6(r.1i("%")!=-1){t.1a({1q:f.g.1H()/1D*1b(r)-b.1e()/2-l-d})}19 6(f.g.4a||f.o.4E>0){t.1a({1q:1b(r)*f.g.1z})}}19{16 E=e(u).17(".12-2c");t.1a({1d:"1U",1e:"1U"});i=t.1d();s=t.1e();16 S=f.g.1z;6(f.g.2E.1i("%")!=-1){6(f.g.1A()>i){S=f.g.1A()/i;6(f.g.1H()>s*S){S=f.g.1H()/s}}19 6(f.g.1H()>s){S=f.g.1H()/s;6(f.g.1A()>i*S){S=f.g.1A()/i}}}t.1a({1d:i*S,1e:s*S,3p:E.1d()/2-i*S/2,3O:E.1e()/2-s*S/2})}});t.1a({1K:"1Q",29:"34"});f.8t();n();e(14).8D()};f.8t=18(){6(f.g.51){16 e=18(){6(f.g.51.1e()>0){6(f.g.9B>0){f.g.40.1a({1e:f.g.51.1e()/2})}19{f.g.40.1a({1e:f.g.51.1e(),3O:-f.g.51.1e()/2})}}19{2g(18(){e()},50)}};e()}};f.8z=18(){6(f.o.4E>0){6(e(2q).1d()<f.o.4E){f.g.4a=1c;f.g.2E=f.o.4E+"1J"}19{f.g.4a=1g;f.g.2E=f.g.8y;f.g.1z=1}}6(f.g.4a){16 t=e(u).24();e(u).1a({1d:t.1d()-1b(e(u).1a("28-1m"))-1b(e(u).1a("28-1F"))});f.g.1z=e(u).1d()/1b(f.g.2E);e(u).1a({1e:f.g.1z*1b(f.g.4m)})}19{f.g.1z=1;e(u).1a({1d:f.g.2E,1e:f.g.4m})}6(e(u).6a(".12-6f-6g-2n").1k){e(u).6a(".12-6f-6g-9z").1a({1e:e(u).3y(1c)});e(u).6a(".12-6f-6g-2n").1a({1e:e(u).3y(1c)});e(u).6a(".12-6f-6g-9z").1a({1d:e(2q).1d(),1m:-e(u).6a(".12-6f-6g-2n").5m().1m});6(f.g.2E.1i("%")!=-1){16 n=1b(f.g.2E);16 r=e("3U").1d()/1D*n-(e(u).3D()-e(u).1d());e(u).1d(r)}}e(u).17(".12-2c, .12-1y-2n").1a({1d:f.g.1A(),1e:f.g.1H()});6(f.g.1L&&f.g.1v){f.g.1L.1a({1d:f.g.1A(),1e:f.g.1H()});f.g.1v.1a({1d:f.g.1A(),1e:f.g.1H()})}19{e(u).17(".12-1p").1a({1d:f.g.1A(),1e:f.g.1H()})}};f.8Z=18(){f.g.1u.1a({1d:f.g.1u.11("2Z")*f.g.1z,1e:f.g.1u.11("2Y")*f.g.1z});6(f.g.2o){f.g.1u.1a("1K","2m")}19{f.g.1u.2J(2z)}16 t=6B=6A=6u="1U";6(f.g.1u.11("4h")&&f.g.1u.11("4h").1i("%")!=-1){t=f.g.1A()/1D*1b(f.g.1u.11("4h"))-f.g.1u.1d()/2+1b(e(u).1a("28-1m"))}19{t=1b(f.g.1u.11("4h"))*f.g.1z}6(f.g.1u.11("6e")&&f.g.1u.11("6e").1i("%")!=-1){6B=f.g.1A()/1D*1b(f.g.1u.11("6e"))-f.g.1u.1d()/2+1b(e(u).1a("28-1F"))}19{6B=1b(f.g.1u.11("6e"))*f.g.1z}6(f.g.1u.11("4k")&&f.g.1u.11("4k").1i("%")!=-1){6A=f.g.1H()/1D*1b(f.g.1u.11("4k"))-f.g.1u.1e()/2+1b(e(u).1a("28-1q"))}19{6A=1b(f.g.1u.11("4k"))*f.g.1z}6(f.g.1u.11("6d")&&f.g.1u.11("6d").1i("%")!=-1){6u=f.g.1H()/1D*1b(f.g.1u.11("6d"))-f.g.1u.1e()/2+1b(e(u).1a("28-1o"))}19{6u=1b(f.g.1u.11("6d"))*f.g.1z}f.g.1u.1a({1m:t,1F:6B,1q:6A,1o:6u})};f.9J=18(){f.7N("4e");16 t=f.g.2E.1i("%")==-1?1b(f.g.2E):f.g.1A();e(u).17(".12-1G-1p a").1a({1d:1b(f.o.7V*f.g.1z),1e:1b(f.o.65*f.g.1z)});e(u).17(".12-1G-1p a:4n").1a({3j:0});e(u).17(".12-1G-1p").1a({1e:1b(f.o.65*f.g.1z)});16 n=e(u).17(".12-1G");16 r=f.o.7o.1i("%")==-1?1b(f.o.7o):1b(t/1D*1b(f.o.7o));n.1a({1d:r*1C.26(f.g.1z*1D)/1D});6(n.1d()>e(u).17(".12-1G-1p").1d()){n.1a({1d:e(u).17(".12-1G-1p").1d()})}f.7N("9I")};f.7R=18(t){16 n=t?t:f.g.61;e(u).17(".12-1G-1p a:2I(.12-4g-"+n+")").3h().1O(18(){e(14).2x("12-4g-1V").1x().6t(88,f.o.81/1D)});e(u).17(".12-1G-1p a.12-4g-"+n).3h().1r("12-4g-1V").1x().6t(88,f.o.7U/1D)};f.7y=18(){6(!e(u).17(".12-1G-1p-2n").30("12-1G-1p-1R")){16 t=e(u).17(".12-4g-1V").1k?e(u).17(".12-4g-1V").24():1g;6(t){16 n=t.3x().1m+t.1d()/2;16 r=e(u).17(".12-1G-1p-2n").1d()/2-n;r=r<e(u).17(".12-1G-1p-2n").1d()-e(u).17(".12-1G-1p").1d()?e(u).17(".12-1G-1p-2n").1d()-e(u).17(".12-1G-1p").1d():r;r=r>0?0:r;e(u).17(".12-1G-1p").4s({3p:r},fs)}}};f.7N=18(t){6(f.o.7j&&!e(u).30("12-1R")){2p(t){1l"4e":f.g.42.1a({29:"2O",1K:"2m"});1j;1l"9I":f.g.42.1a({29:"34",1K:"1Q"});1j}}};f.4s=18(){6(e(u).17(".12-1p").1k>1){f.g.36=1c}f.g.48=1g;2v(f.g.4o);2v(f.g.fh);f.g.9C=f.g.1L;f.o.ac(f.g);6(f.o.3e=="4R"){f.7R();6(!("6s"3M 2q)){f.7y()}}f.g.1v.1r("12-9e");16 t=7D=6w=8n=6z=8a=6y=8k=6r=fg=6v=f8="1U";16 a=8e=f.g.1A();16 l=8d=f.g.1H();16 c=f.g.2f=="1S"?f.g.1L:f.g.1v;16 h=c.11("3C")?c.11("3C"):f.o.8s;16 p=f.g.7W[f.g.2f][h];6(p=="1m"||p=="1F"){a=6w=8e=6y=0;6v=0}6(p=="1q"||p=="1o"){l=t=8d=6z=0;6r=0}2p(p){1l"1m":7D=6z=0;6r=-f.g.1A();1j;1l"1F":t=8a=0;6r=f.g.1A();1j;1l"1q":8n=6y=0;6v=-f.g.1H();1j;1l"1o":6w=8k=0;6v=f.g.1H();1j}f.g.1L.1a({1m:t,1F:7D,1q:6w,1o:8n});f.g.1v.1a({1d:8e,1e:8d,1m:6z,1F:8a,1q:6y,1o:8k});16 d=f.g.1L.11("5w")?1b(f.g.1L.11("5w")):f.o.7t;16 v=f.g.1L.11("4L")?1b(f.g.1L.11("4L")):f.o.4S;16 m=f.g.1L.11("4J")?f.g.1L.11("4J"):f.o.4F;16 g=f.g.1v.11("5d")?1b(f.g.1v.11("5d")):f.o.5r;16 y=f.g.1v.11("5t")?1b(f.g.1v.11("5t")):f.o.5y;16 b=f.g.1v.11("5K")?f.g.1v.11("5K"):f.o.5F;16 w=18(){f.g.1L.1M(d+v/15).4s({1d:a,1e:l},v,m,18(){E()})};16 E=18(){f.g.9C.17(\' > *[1t*="12-l"]\').1O(18(){6(e(14).11("3N")){e(14).11("3N").85()}e(14).1a({f7:"1Q"})});f.o.7Q(f.g);f.g.1L=f.g.1v;f.g.27=f.g.61;6(f.o.43&&f.o.47){16 t=f.g.27==f.g.2y?1:f.g.27+1;e(u).17(".12-1p").eq(t-1).17("1Z:2I(.12-3w)").1O(18(){e(14).31(18(){e(14).1r("12-3w")}).3Z(18(){16 t=e(14).11("1h").9D(e(14).11("1h").9O("/")+1,e(14).11("1h").1k);6(2q.4w){4w(\'2A 3Z:\\r\\n\\r\\6x 6L 4K 21 6M 2X 21 2K 44 3l 2K "\'+t+\'" 3m 71 2e a 70 4M 4Q 4i 6Z be 2S. 4P 6Y 21 72 2X 4t 4O 73 76 3M 21 75.\')}19{9P(\'2A 3Z:\\r\\n\\r\\6x 6L 4K 21 6M 2X 21 2K 44 3l 2K "\'+t+\'" 3m 71 2e a 70 4M 4Q 4i 6Z be 2S. 4P 6Y 21 72 2X 4t 4O 73 76 3M 21 75.\')}e(14).1r("12-2I-3w")}).1f("1h",e(14).11("1h"))})}e(u).17(".12-1p").2x("12-1V");e(u).17(".12-1p:eq("+(f.g.27-1)+")").1r("12-1V").2x("12-9e");e(u).17(".12-1o-4T a").2x("12-1s-1V");e(u).17(".12-1o-4T a:eq("+(f.g.27-1)+")").1r("12-1s-1V");6(f.g.2w){f.5Q()}f.g.36=1g;6(f.g.2T==1c){f.3s(f.g.1L,18(){f.g.2T=1g})}};16 S=18(t){f.g.1L.17(\' > *[1t*="12-l"]\').1O(18(){6(!e(14).11("2B")){f.5O(e(14))}e(14).2x("12-8F");16 r=e(14).11("3C")?e(14).11("3C"):p;16 i,s;2p(r){1l"1m":i=-f.g.1A();s=0;1j;1l"1F":i=f.g.1A();s=0;1j;1l"1q":s=-f.g.1H();i=0;1j;1l"1o":s=f.g.1H();i=0;1j;1l"3B":s=0;i=0;1j}6(e(14).11("2B")==="1I"){16 o="1I"}19{16 o=e(14).11("6b")?e(14).11("6b"):1g}2p(o){1l"1m":i=f.g.1A();s=0;1j;1l"1F":i=-f.g.1A();s=0;1j;1l"1q":s=f.g.1H();i=0;1j;1l"1o":s=-f.g.1H();i=0;1j;1l"3B":s=0;i=0;1j;1l"1I":6(e(14).11("3c")){6(e(14).11("3c")==="1m"){i=f.g.1A()}19 6(e(14).11("3c")==="1F"){i=-f.g.1A()}19{i=-1b(e(14).11("3c"))}}19{i=-f.1y.8l}6(e(14).11("3r")){6(e(14).11("3r")==="1q"){s=f.g.1H()}19 6(e(14).11("3r")==="1o"){s=-f.g.1H()}19{s=-1b(e(14).11("3r"))}}19{s=-f.1y.7C}1j}16 u=58=5o=4c=5p=5q=3k=3q="1Q";u=e(14).11("5U")?e(14).11("5U"):f.1y.7x;58=e(14).11("6p")?e(14).11("6p"):f.1y.7G;5o=e(14).11("6i")?e(14).11("6i"):f.1y.7P;4c=e(14).11("5M")?e(14).11("5M"):f.1y.7O;5p=e(14).11("6n")?e(14).11("6n"):f.1y.8T;5q=e(14).11("6o")?e(14).11("6o"):f.1y.8W;6(4c===1){3k=e(14).11("6m")?e(14).11("6m"):f.1y.8P;3q=e(14).11("6l")?e(14).11("6l"):f.1y.8O}19{3k=3q=4c}16 a=e(14).11("78")?e(14).11("78").1E(" "):f.1y.8V;23(16 l=0;l<a.1k;l++){6(a[l].1i("%")===-1&&a[l].1i("1m")!==-1&&a[l].1i("1F")!==-1&&a[l].1i("1q")!==-1&&a[l].1i("1o")!==-1){a[l]=""+1b(a[l])*f.g.1z+"1J"}}16 c=a.8Y(" ");16 h=e(14).11("6k")?e(14).11("6k"):f.1y.8S;16 d=1b(e(14).1a("1m"));16 v=1b(e(14).1a("1q"));16 m=1b(e(14).1f("1t").1E("12-l")[1]);16 g=e(14).3D()>e(14).3y()?e(14).3D():e(14).3y();16 y=1b(u)===0?e(14).3D():g;16 b=1b(u)===0?e(14).3y():g;6(m===-1&&o!=="1I"||e(14).11("3c")==="1m"||e(14).11("3c")==="1F"){6(i<0){i=-(f.g.1A()-d+(3k/2-.5)*y+1D)}19 6(i>0){i=d+(3k/2+.5)*y+1D}}19{i=i*f.g.1z}6(m===-1&&o!=="1I"||e(14).11("3r")==="1q"||e(14).11("3r")==="1o"){6(s<0){s=-(f.g.1H()-v+(3q/2-.5)*b+1D)}19 6(s>0){s=v+(3q/2+.5)*b+1D}}19{s=s*f.g.1z}6(m===-1||o==="1I"){16 w=1}19{16 E=f.g.1L.11("7w")?1b(f.g.1L.11("7w")):f.o.8L;16 w=m*E}6(e(14).11("2B")==="1I"){16 S=f.1y.7t;16 x=f.1y.4S;16 T=f.1y.4F}19{16 S=f.o.7t;16 x=f.o.4S;16 T=f.o.4F}16 N=e(14).11("5w")?1b(e(14).11("5w")):S;16 C=e(14).11("4L")?1b(e(14).11("4L")):x;16 k=e(14).11("4J")?e(14).11("4J"):T;6(t){N=0;C=t}6(e(14).11("6W")){2v(e(14).11("6W"))}16 L={29:"2O"};16 A=e(14);16 O={3g:u,4x:58,4z:5o,7s:5p,7r:5q,5k:3k,5j:3q,x:-i*w,y:-s*w,1M:N/1P,3T:n(k),8B:18(){A.1a(L)}};6(o=="3B"||!o&&r==="3B"||e(14).11("bO")!=="1g"&&e(14).11("2B")==="1I"){O["2Q"]=0;L["2Q"]=e(14).11("7d")}6(e(14).11("3N")){e(14).11("3N").85()}3a.8K(e(14)[0],{8C:c,8G:h});e(14).11("3N",3a.2e(e(14)[0],C/1P,O))})};16 x=18(){f.g.1v.1M(d+g).4s({1d:f.g.1A(),1e:f.g.1H()},y,b)};16 T=18(){6(f.g.3o){d=0}6(1W f.o.9w==="18"){f.o.9w(f.g,d+g)}f.g.1v.17(\' > *[1t*="12-l"]\').1O(18(){6(!e(14).11("2B")){f.5O(e(14))}6(e(14).11("2B")==="1I"){16 t="1I"}19{16 t=e(14).11("3C")?e(14).11("3C"):p}16 r,i;2p(t){1l"1m":r=-f.g.1A();i=0;1j;1l"1F":r=f.g.1A();i=0;1j;1l"1q":i=-f.g.1H();r=0;1j;1l"1o":i=f.g.1H();r=0;1j;1l"3B":i=0;r=0;1j;1l"1I":6(e(14).11("5e")){6(e(14).11("5e")==="1m"){r=-f.g.1A()}19 6(e(14).11("5e")==="1F"){r=f.g.1A()}19{r=1b(e(14).11("5e"))}}19{r=f.1y.9R}6(e(14).11("5f")){6(e(14).11("5f")==="1q"){i=-f.g.1H()}19 6(e(14).11("5f")==="1o"){i=f.g.1H()}19{i=1b(e(14).11("5f"))}}19{i=f.1y.9S}1j}16 s=83=82=74=84=7L=5n=5c="1Q";s=e(14).11("8I")?e(14).11("8I"):f.1y.9X;83=e(14).11("9r")?e(14).11("9r"):f.1y.9Y;82=e(14).11("9q")?e(14).11("9q"):f.1y.a4;74=e(14).11("8A")?e(14).11("8A"):f.1y.9x;84=e(14).11("9p")?e(14).11("9p"):f.1y.9Z;7L=e(14).11("9f")?e(14).11("9f"):f.1y.a0;6(74===1){5n=e(14).11("9t")?e(14).11("9t"):f.1y.a3;5c=e(14).11("9v")?e(14).11("9v"):f.1y.a2}19{5n=5c=74}16 o=e(14).11("9o")?e(14).11("9o").1E(" "):f.1y.a1;23(16 u=0;u<o.1k;u++){6(o[u].1i("%")===-1&&o[u].1i("1m")!==-1&&o[u].1i("1F")!==-1&&o[u].1i("1q")!==-1&&o[u].1i("1o")!==-1){o[u]=""+1b(o[u])*f.g.1z+"1J"}}16 a=o.8Y(" ");16 l=e(14).11("9i")?e(14).11("9i"):f.1y.9E;16 c=1b(e(14).1a("1m"));16 h=1b(e(14).1a("1q"));16 d=1b(e(14).1f("1t").1E("12-l")[1]);6(e(14)[0].1N.1d.1i("%")!==-1){e(14).1a({1d:f.g.1A()/1D*1b(e(14)[0].1N.1d)})}16 v=e(14).3D()>e(14).3y()?e(14).3D():e(14).3y();16 m=1b(s)===0?e(14).3D():v;16 g=1b(s)===0?e(14).3y():v;6(d===-1&&t!=="1I"||e(14).11("5e")==="1m"||e(14).11("5e")==="1F"){6(r<0){r=-(c+(5n/2+.5)*m+1D)}19 6(r>0){r=f.g.1A()-c+(5n/2-.5)*m+1D}}19{r=r*f.g.1z}6(d===-1&&t!=="1I"||e(14).11("5f")==="1q"||e(14).11("5f")==="1o"){6(i<0){i=-(h+(5c/2+.5)*g+1D)}19 6(i>0){i=f.g.1H()-h+(5c/2-.5)*g+1D}}19{i=i*f.g.1z}6(d===-1||t==="1I"){16 y=1}19{16 b=f.g.1v.11("9s")?1b(f.g.1v.11("9s")):f.o.ao;16 y=d*b}6(e(14).11("2B")==="1I"){16 w=f.1y.5r;16 E=f.1y.5y;16 S=f.1y.5F}19{16 w=f.o.5r;16 E=f.o.5y;16 S=f.o.5F}16 x=e(14).11("5d")?1b(e(14).11("5d")):w;16 T=e(14).11("5t")?1b(e(14).11("5t")):E;16 N=e(14).11("5K")?e(14).11("5K"):S;16 C=e(14);16 k=18(){6(C.30("12-2M-4G")){C.1r("12-8F")}6(f.o.86==1c){C.17(".12-2F, 2M, 6X").2k()}6(C.11("5v")>0){C.11("6W",2g(18(){f.8H(C)},C.11("5v")))}};e(14).1a({3p:0,3O:0});16 L={5k:5n,5j:5c,7s:84,7r:7L,3g:s,4x:83,4z:82,29:"34",x:r*y,y:i*y};16 A={3g:0,4x:0,4z:0,7s:0,7r:0,5k:1,5j:1,3T:n(N),1M:x/1P,x:0,y:0,8B:18(){k()}};6(t.1i("3B")!=-1||e(14).11("f4")!=="1g"&&e(14).11("2B")==="1I"){L["2Q"]=0;A["2Q"]=e(14).11("7d")}6(e(14).11("3N")){e(14).11("3N").85()}3a.8K(e(14)[0],{8G:l,8C:a});e(14).11("3N",3a.6R(e(14)[0],T/1P,L,A))})};16 N=18(){6(i(e(u))&&(f.g.1v.11("4W")||f.g.1v.11("5u"))){6(f.g.1v.11("4W")&&f.g.1v.11("5u")){16 t=1C.26(1C.2h()*2);16 n=[["3d",f.g.1v.11("4W")],["bj",f.g.1v.11("5u")]];k(n[t][0],n[t][1])}19 6(f.g.1v.11("4W")){k("3d",f.g.1v.11("4W"))}19{k("bj",f.g.1v.11("5u"))}}19{6(f.g.1v.11("5B")&&f.g.1v.11("5s")){16 t=1C.26(1C.2h()*2);16 n=[["2d",f.g.1v.11("5B")],["bn",f.g.1v.11("5s")]];k(n[t][0],n[t][1])}19 6(f.g.1v.11("5B")){k("2d",f.g.1v.11("5B"))}19 6(f.g.1v.11("5s")){k("bn",f.g.1v.11("5s"))}19{k("2d","1")}}};16 C=18(){6(i(e(u))&&5x.1i("3d")!=-1){k("3d",5x.1E(":")[1])}19{6(5x.1i("3d")!=-1){k("2d","4t")}19{k("2d",5x.1E(":")[1])}}};16 k=18(e,t){16 n=e.1i("f5")==-1?f.t:f.ct;16 r="3d",i,s;6(e.1i("2d")!=-1){r="2d"}6(t.1i("4n")!=-1){s=n["t"+r].1k-1;i="4n"}19 6(t.1i("4t")!=-1){s=1C.26(1C.2h()*o(n["t"+r]));i="2h bs 4t"}19{16 u=t.1E(",");16 a=u.1k;s=1b(u[1C.26(1C.2h()*a)])-1;i="2h bs f9"}L(r,n["t"+r][s])};16 L=18(t,i){16 o=e(u).17(".12-2c");16 a=f.g.1L.17(\'*[1t*="12-l"]\').1k>0?1P:0;16 l=i.6T.20().1i("fa")==-1?1g:1c;16 c=i.6T.20().1i("ff")==-1?1g:1c;16 h=1W i.4p;16 p=1W i.4b;2p(h){1l"3V":h=i.4p;1j;1l"5T":h=1C.26(1C.2h()*(1b(i.4p.1E(",")[1])-1b(i.4p.1E(",")[0])+1))+1b(i.4p.1E(",")[0]);1j;b7:h=1C.26(1C.2h()*(i.4p[1]-i.4p[0]+1))+i.4p[0];1j}2p(p){1l"3V":p=i.4b;1j;1l"5T":p=1C.26(1C.2h()*(1b(i.4b.1E(",")[1])-1b(i.4b.1E(",")[0])+1))+1b(i.4b.1E(",")[0]);1j;b7:p=1C.26(1C.2h()*(i.4b[1]-i.4b[0]+1))+i.4b[0];1j}6(f.g.9m()==1c&&f.o.bu==1c||f.g.2o&&f.o.bv==1c){6(h>=15){h=7}19 6(h>=5){h=4}19 6(h>=4){h=3}19 6(h>2){h=2}6(p>=15){p=7}19 6(p>=5){p=4}19 6(p>=4){p=3}19 6(p>2){p=2}6(p>2&&h>2){p=2;6(h>4){h=4}}}16 d=e(u).17(".12-2c").1d()/h;16 v=e(u).17(".12-2c").1e()/p;6(!f.g.2D){f.g.2D=e("<1n>").1r("12-1y-2n").1r("12-4q-2O").1a({1d:o.1d(),1e:o.1e()}).6q(o)}19{f.g.2D.1x(1c,1c).5C().1a({1K:"2m",1d:o.1d(),1e:o.1e()})}16 m=o.1d()-1C.26(d)*h;16 g=o.1e()-1C.26(v)*p;16 y=[];y.bc=18(){16 e=14.1k,t,n,r;6(e==0)1T 1g;bt(--e){t=1C.26(1C.2h()*(e+1));n=14[e];r=14[t];14[e]=r;14[t]=n}1T 14};23(16 b=0;b<h*p;b++){y.7Y(b)}2p(i.3Q.fd){1l"5W":y.5W();1j;1l"bd-7X":y=s(p,h,"7X");1j;1l"bd-5W":y=s(p,h,"5W");1j;1l"2h":y.bc();1j}16 w=f.g.1L.17(".12-bg");16 x=f.g.1v.17(".12-bg");6(w.1k==0&&x.1k==0){t="2d";i=e.4D(1c,{},f.t["fb"][0]);i.1B.2l=1;i.3Q.1M=0}6(t=="3d"){f.g.3o=(h*p-1)*i.3Q.1M;16 N=0;6(i.2H&&i.2H.2l){N+=i.2H.2l}6(i.2a&&i.2a.2l){N+=i.2a.2l}6(i.2C&&i.2C.2l){N+=i.2C.2l}f.g.3o+=N;16 C=0;6(i.2H&&i.2H.1M){C+=i.2H.1M}6(i.2a&&i.2a.1M){C+=i.2a.1M}6(i.2C&&i.2C.1M){C+=i.2C.1M}f.g.3o+=C}19{f.g.3o=(h*p-1)*i.3Q.1M+i.1B.2l;f.g.54=e("<1n>").1r("12-fc").1w(f.g.2D);f.g.8f=e("<1n>").1r("12-f2").1w(f.g.2D)}16 k=f.g.2f;23(16 L=0;L<h*p;L++){16 A=L%h==0?m:0;16 O=L>(p-1)*h-1?g:0;16 M=e("<1n>").1r("12-1y-3Q").1a({1d:1C.26(d)+A,1e:1C.26(v)+O}).1w(f.g.2D);16 56,D;6(t=="3d"){M.1r("12-3d-2n");16 P=1C.26(d)+A;16 H=1C.26(v)+O;16 B;6(i.2a.5Z=="bB"){6(1C.49(i.2a.1B.3b)>90&&i.3Q.a7!="bL"){B=1C.26(P/7)+A}19{B=P}}19{6(1C.49(i.2a.1B.2U)>90&&i.3Q.a7!="bL"){B=1C.26(H/7)+O}19{B=H}}16 j=P/2;16 F=H/2;16 I=B/2;16 q=18(t,n,r,i,s,o,u,a,f){e("<1n>").1r(t).1a({1d:r,1e:i,3P:"5X("+s+"1J, "+o+"1J, "+u+"1J) 2U("+a+"3L) 3b("+f+"3L) 5R(5L) 4v(1, 1, 1)","-o-3P":"5X("+s+"1J, "+o+"1J, "+u+"1J) 2U("+a+"3L) 3b("+f+"3L) 5R(5L) 4v(1, 1, 1)","-bi-3P":"5X("+s+"1J, "+o+"1J, "+u+"1J) 2U("+a+"3L) 3b("+f+"3L) 5R(5L) 4v(1, 1, 1)","-bh-3P":"5X("+s+"1J, "+o+"1J, "+u+"1J) 2U("+a+"3L) 3b("+f+"3L) 5R(5L) 4v(1, 1, 1)","-5S-3P":"5X("+s+"1J, "+o+"1J, "+u+"1J) 2U("+a+"3L) 3b("+f+"3L) 5R(5L) 4v(1, 1, 1)"}).1w(n)};q("12-3d-3K",M,0,0,0,0,-I,0,0);16 R=0;16 U=0;16 z=0;6(i.2a.5Z=="dW"&&1C.49(i.2a.1B.2U)>90){q("12-3d-5P",M.17(".12-3d-3K"),P,H,-j,-F,-I,6N,0)}19{q("12-3d-5P",M.17(".12-3d-3K"),P,H,-j,-F,-I,0,6N)}q("12-3d-1o",M.17(".12-3d-3K"),P,B,-j,F-I,0,-90,0);q("12-3d-1q",M.17(".12-3d-3K"),P,B,-j,-F-I,0,90,0);q("12-3d-bw",M.17(".12-3d-3K"),P,H,-j,-F,I,0,0);q("12-3d-1m",M.17(".12-3d-3K"),B,H,-j-I,-F,0,0,-90);q("12-3d-1F",M.17(".12-3d-3K"),B,H,j-I,-F,0,0,90);56=M.17(".12-3d-bw");6(i.2a.5Z=="bB"){6(1C.49(i.2a.1B.3b)>90){D=M.17(".12-3d-5P")}19{D=M.17(".12-3d-1m, .12-3d-1F")}}19{6(1C.49(i.2a.1B.2U)>90){D=M.17(".12-3d-5P")}19{D=M.17(".12-3d-1q, .12-3d-1o")}}16 W=y[L]*i.3Q.1M;16 X=f.g.2D.17(".12-3d-2n:eq("+L+") .12-3d-3K");16 V=1I bD;6(i.2H&&i.2H.1B){i.2H.1B.1M=i.2H.1B.1M?(i.2H.1B.1M+W)/1P:W/1P;V.2e(X[0],i.2H.2l/1P,r(i.2H.1B,i.2H.4A))}19{i.2a.1B.1M=i.2a.1B.1M?(i.2a.1B.1M+W)/1P:W/1P}V.2e(X[0],i.2a.2l/1P,r(i.2a.1B,i.2a.4A));6(i.2C){6(!i.2C.1B){i.2C.1B={}}V.2e(X[0],i.2C.2l/1P,r(i.2C.1B,i.2C.4A,"2C"))}}19{16 J=32=2N=2G="1U";16 K=6U=1;6(i.1B.5Z=="2h"){16 Q=["1q","1o","1F","1m"];16 G=Q[1C.26(1C.2h()*Q.1k)]}19{16 G=i.1B.5Z}6(i.6T.20().1i("ag")!=-1&&L%2==0){6(k=="1S"){k="1X"}19{k="1S"}}6(k=="1S"){2p(G){1l"1q":G="1o";1j;1l"1o":G="1q";1j;1l"1m":G="1F";1j;1l"1F":G="1m";1j;1l"8m":G="7S";1j;1l"8h":G="8g";1j;1l"8g":G="8h";1j;1l"7S":G="8m";1j}}2p(G){1l"1q":J=2N=-M.1e();32=2G=0;1j;1l"1o":J=2N=M.1e();32=2G=0;1j;1l"1m":J=2N=0;32=2G=-M.1d();1j;1l"1F":J=2N=0;32=2G=M.1d();1j;1l"8m":J=M.1e();2N=0;32=M.1d();2G=0;1j;1l"8h":J=M.1e();2N=0;32=-M.1d();2G=0;1j;1l"8g":J=-M.1e();2N=0;32=M.1d();2G=0;1j;1l"7S":J=-M.1e();2N=0;32=-M.1d();2G=0;1j}f.g.4Y=i.1B.5I?i.1B.5I:1;6(l==1c&&f.g.4Y!=1){J=J/2;2N=2N/2;32=32/2;2G=2G/2}2p(i.1B.4y){1l"3B":J=2N=32=2G=0;K=0;6U=1;1j;1l"dH":K=0;6U=1;6(f.g.4Y==1){2N=2G=0}1j}6((i.1B.3F||i.1B.2U||i.1B.3b||f.g.4Y!=1)&&!f.g.2o&&i.1B.4y!="1p"){M.1a({4q:"34"})}19{M.1a({4q:"2O"})}6(l==1c){f.g.54.1a({4q:"34"})}19{f.g.54.1a({4q:"2O"})}6(c==1c||i.1B.4y=="1p"||l==1c){16 Y=M.1w(f.g.54);16 Z=M.8c().1w(f.g.8f);56=e("<1n>").1r("12-dN").1w(Y)}19{16 Z=M.1w(f.g.8f)}D=e("<1n>").1r("12-dT").1w(Z).1a({1q:-J,1m:-32,dP:"2m",2Q:K});16 et=y[L]*i.3Q.1M;16 5l=i.1B.3F?i.1B.3F:0;16 6S=i.1B.2U?i.1B.2U:0;16 6V=i.1B.3b?i.1B.3b:0;6(k=="1S"){5l=-5l;6S=-6S;6V=-6V}3a.6R(D[0],i.1B.2l/1P,{3g:5l,4x:6S,4z:6V,5I:f.g.4Y},{1M:et/1P,1q:0,1m:0,2Q:6U,3g:0,4x:0,4z:0,5I:1,3T:n(i.1B.4A)});6(c==1c&&(x.1k<1||x.1k>0&&(x.1f("1h").20().1i("4H")!=-1||x.1d()<f.g.1A()||x.1e()<f.g.1H()))){3a.2e(56[0],i.1B.2l/1P,{1M:et/1P,2Q:0,3T:n(i.1B.4A)})}6((i.1B.4y=="1p"||l==1c)&&i.6T.20().1i("ag")==-1){16 4i=0;6(5l!=0){4i=-5l}3a.2e(56[0],i.1B.2l/1P,{1M:et/1P,1q:2N,1m:2G,3g:4i,5I:f.g.4Y,2Q:K,3T:n(i.1B.4A)})}}6(w.1k){6(t=="3d"||t=="2d"&&(c==1c||i.1B.4y=="1p"||l==1c)){56.3S(e("<1Z>").1f("1h",w.1f("1h")).1a({1d:w[0].1N.1d,1e:w[0].1N.1e,3p:3i(w.1a("3j-1m"))-3i(M.3x().1m),3O:3i(w.1a("3j-1q"))-3i(M.3x().1q)}))}19 6(f.g.54.3h().1k==0){f.g.54.3S(e("<1Z>").1f("1h",w.1f("1h")).1a({1d:w[0].1N.1d,1e:w[0].1N.1e,3p:3i(w.1a("3j-1m")),3O:3i(w.1a("3j-1q"))}))}}6(x.1k){D.3S(e("<1Z>").1f("1h",x.1f("1h")).1a({1d:x[0].1N.1d,1e:x[0].1N.1e,3p:3i(x.1a("3j-1m"))-3i(M.3x().1m),3O:3i(x.1a("3j-1q"))-3i(M.3x().1q)}))}}16 4Z=f.g.1L;16 2L=f.g.1v;2g(18(){4Z.17(".12-bg").1a({29:"2O"})},50);2L.17(".12-bg").1a({29:"2O"});f.g.2D.2x("12-4q-2O");S(a);2g(18(){4Z.1a({1d:0})},a);16 95=1b(2L.11("77"))?1b(2L.11("77")):0;16 at=f.g.3o+95>0?f.g.3o+95:0;2g(18(){6(f.g.2T==1c){f.g.2D.5C();4Z.2x("12-1V");f.3s(2L,18(){f.g.2T=1g})}T();6(2L.17(".12-bg").1k<1||2L.17(".12-bg").1k>0&&2L.17(".12-bg").1f("1h").20().1i("4H")!=-1){f.g.2D.1M(b1).3J(2z,18(){e(14).5C().64()})}2L.1a({1d:f.g.1A(),1e:f.g.1H()})},at);6(f.g.3o<2z){f.g.3o=1P}2g(18(){f.g.2D.1r("12-4q-2O");2L.1r("12-1V");6(2L.17(".12-bg").1k){2L.17(".12-bg").1a({1K:"1Q",29:"34"});6(f.g.2o){2L.17(".12-bg").1a("1K","2m");2g(18(){E()},41)}19{2L.17(".12-bg").2J(41,18(){E()})}}19{E()}},f.g.3o)};16 A=(f.g.1v.11("4W")||f.g.1v.11("5B"))&&f.t||(f.g.1v.11("5u")||f.g.1v.11("5s"))&&f.ct?"1I":"5V";6(!f.g.1v.11("2B")){f.5O(f.g.1v)}6(f.g.1v.11("2B")==="1I"){A="1I"}6(f.o.8u){A="aA"}6(f.o.4B&&!f.g.aI){6(f.g.2y==1){16 d=0;f.o.7Q(f.g)}19{16 O=1b(f.g.1v.11("77"))?1b(f.g.1v.11("77")):0;16 M=A=="1I"?0:v;f.g.aB=2g(18(){E()},M+1C.49(O))}f.g.3o=1c;T();f.g.1v.1a({1d:f.g.1A(),1e:f.g.1H()});6(!f.g.2o){f.g.1v.17(".12-bg").1a({1K:"1Q"}).2J(41)}f.g.aI=1c;f.g.48=1g}19{2p(A){1l"5V":f.g.3o=1g;6(f.g.2D){f.g.2D.5C()}w();S();x();T();1j;1l"1I":6(1W 5x!="2W"){C()}19{N()}1j;1l"aA":L(f.o.8u.4y,f.o.8u.ev);1j}}};f.5O=18(e){16 t=e.11("12")||!e.11("12")&&!e.11("5H")&&!e.11("3C")&&!e.11("6b")&&!e.11("5d")&&!e.11("5w")&&!e.11("5t")&&!e.11("4L")&&!e.11("5v")&&!e.11("5K")&&!e.11("4J")&&!e.11("8A")&&!e.11("5M")&&!e.11("8I")&&!e.11("5U")?"1I":"5V";e.11("2B",t)};f.8H=18(e){6(!e.11("2B")){f.5O(e)}e.2x("12-8F");16 t=f.g.1L;6(f.g.2f!="1S"&&f.g.1v){t=f.g.1v}16 r=t.11("3C")?t.11("3C"):f.o.8s;16 i=f.g.7W[f.g.2f][r];16 s=e.11("3C")?e.11("3C"):i;16 o,u;2p(s){1l"1m":o=-f.g.1A();u=0;1j;1l"1F":o=f.g.1A();u=0;1j;1l"1q":u=-f.g.1H();o=0;1j;1l"1o":u=f.g.1H();o=0;1j;1l"3B":u=0;o=0;1j}6(e.11("2B")==="1I"){16 a="1I"}19{16 a=e.11("6b")?e.11("6b"):1g}2p(a){1l"1m":o=f.g.1A();u=0;1j;1l"1F":o=-f.g.1A();u=0;1j;1l"1q":u=f.g.1H();o=0;1j;1l"1o":u=-f.g.1H();o=0;1j;1l"3B":u=0;o=0;1j;1l"1I":6(e.11("3c")){6(e.11("3c")==="1m"){o=f.g.1A()}19 6(e.11("3c")==="1F"){o=-f.g.1A()}19{o=-1b(e.11("3c"))}}19{o=-f.1y.8l}6(e.11("3r")){6(e.11("3r")==="1q"){u=f.g.1H()}19 6(e.11("3r")==="1o"){u=-f.g.1H()}19{u=-1b(e.11("3r"))}}19{u=-f.1y.7C}1j}16 l=58=5o=4c=5p=5q=3k=3q="1Q";l=e.11("5U")?e.11("5U"):f.1y.7x;58=e.11("6p")?e.11("6p"):f.1y.7G;5o=e.11("6i")?e.11("6i"):f.1y.7P;4c=e.11("5M")?e.11("5M"):f.1y.7O;5p=e.11("6n")?e.11("6n"):f.1y.8T;5q=e.11("6o")?e.11("6o"):f.1y.8W;6(4c===1){3k=e.11("6m")?e.11("6m"):f.1y.8P;3q=e.11("6l")?e.11("6l"):f.1y.8O}19{3k=3q=4c}16 c=e.11("78")?e.11("78").1E(" "):f.1y.8V;23(16 h=0;h<c.1k;h++){6(c[h].1i("%")===-1&&c[h].1i("1m")!==-1&&c[h].1i("1F")!==-1&&c[h].1i("1q")!==-1&&c[h].1i("1o")!==-1){c[h]=""+1b(c[h])*f.g.1z+"1J"}}16 p=c.8Y(" ");16 d=e.11("6k")?e.11("6k"):f.1y.8S;16 v=1b(e.1a("1m"));16 m=1b(e.1a("1q"));16 g=1b(e.1f("1t").1E("12-l")[1]);16 y=e.3D()>e.3y()?e.3D():e.3y();16 b=1b(l)===0?e.3D():y;16 w=1b(l)===0?e.3y():y;6(g===-1&&a!=="1I"||e.11("3c")==="1m"||e.11("3c")==="1F"){6(o<0){o=-(f.g.1A()-v+(3k/2-.5)*b+1D)}19 6(o>0){o=v+(3k/2+.5)*b+1D}}19{o=o*f.g.1z}6(g===-1&&a!=="1I"||e.11("3r")==="1q"||e.11("3r")==="1o"){6(u<0){u=-(f.g.1H()-m+(3q/2-.5)*w+1D)}19 6(u>0){u=m+(3q/2+.5)*w+1D}}19{u=u*f.g.1z}6(g===-1||a==="1I"){16 E=1}19{16 S=f.g.1L.11("7w")?1b(f.g.1L.11("7w")):f.o.8L;16 E=g*S}6(e.11("2B")==="1I"){16 x=f.1y.4S;16 T=f.1y.4F}19{16 x=f.o.4S;16 T=f.o.4F}16 N=e.11("4L")?1b(e.11("4L")):x;16 C=e.11("4J")?e.11("4J"):T;16 k={29:"2O"};16 L={3g:l,4x:58,4z:5o,7s:5p,7r:5q,5k:3k,5j:3q,x:-o*E,y:-u*E,3T:n(C),8B:18(){e.1a(k)}};6(a=="3B"||!a&&s=="3B"||e.11("bO")!=="1g"&&e.11("2B")==="1I"){L["2Q"]=0;k["2Q"]=e.11("7d")}3a.8K(e[0],{8G:d,8C:p});3a.2e(e[0],N/1P,L)};f.4X=18(){f.d={3R:e("<1n>"),aT:18(t){e("<bI>"+t+"</bI>").1w(f.d.3R)},am:18(){e("<4I>").1w(f.d.3R)},aU:18(t){e("<4I><3E>"+t+"</3E></4I>").1w(f.d.3R)},aL:18(t){e("<3E>"+t+"</3E>").1w(f.d.3R.17("4I:4n"))},93:18(t){e("<4I>").1w(f.d.3R.17("4I:4n 3E:4n"))},aF:18(e){f.d.3R.17("4I:4n 3E:4n").1R(18(){e.1a({3v:"ej ei eg",3O:1b(e.1a("3j-1q"))-2,3p:1b(e.1a("3j-1m"))-2})},18(){e.1a({3v:"9b",3O:1b(e.1a("3j-1q"))+2,3p:1b(e.1a("3j-1m"))+2})})},64:18(){6(!e("3U").17(".12-4X-4w").1k){6(!f.d.aC){f.d.aT("eh eB");f.d.am();23(16 t 3M f.o){f.d.aL(t+": <1Y>"+f.o[t]+"</1Y>")}f.d.aT("2A ee");f.d.aU("en 2X ex ez: <1Y>"+e(u).17(".12-1p").1k+"</1Y>");e(u).17(\'.12-2c .12-1p, .12-2c *[1t*="12-l"]\').1O(18(){6(e(14).30("12-1p")){f.d.aU("<1Y>aK "+(e(14).5D()+1)+"</1Y>");f.d.93();f.d.aL("<1Y>aK "+(e(14).5D()+1)+" aG:</1Y><br><br>")}19{f.d.aU("&7b;&7b;&7b;&7b;ep ( "+e(14).aM("aH")+" )");f.d.aF(e(14));f.d.93();f.d.aL("<1Y>"+e(14).aM("aH")+" 4G aG:</1Y><br><br>");f.d.aL("es / 1t: <1Y>"+e(14).1f("1t")+"</1Y>")}e.1O(e(14).11(),18(e,t){f.d.aL(e+": <1Y>"+t+"</1Y>")})});f.d.aC=1c}16 n=e("<1n>").1r("12-4X-4w").1a({3x:"dI",aD:"dL",1q:"6h",1F:"6h",1d:"dU",28:"dV",3l:"e3","3v-e4":"6h",1e:e(2q).1e()-60,2Q:0,aX:7u}).1w(e("3U")).1a({aX:0,2Q:.9}).2k(18(t){6(t.aQ&&t.aP){e(14).7a()}});16 r=e("<1n>").1a({1d:"1D%",1e:"1D%",4q:"1U"}).1w(n);16 i=e("<1n>").1a({1d:"1D%"}).1w(r).3S(f.d.3R)}},e5:18(){e("3U").17(".12-4X-4w").7a()}};e(u).2k(18(e){6(e.aQ&&e.aP){f.d.64()}})};f.31()};16 n=18(e){16 t;6(e.20().1i("aR")!==-1||e.20().1i("8b")!==-1){t=7B.7A}19 6(e.20().1i("7E")!==-1){16 n=e.20().1E("7E")[1];t=2q[n.7I(0).8o()+n.7M(1)].aS}19 6(e.20().1i("7H")!==-1){16 n=e.20().1E("7H")[1];t=2q[n.7I(0).8o()+n.7M(1)].az}19 6(e.20().1i("7J")!==-1){16 n=e.20().1E("7J")[1];t=2q[n.7I(0).8o()+n.7M(1)].ay}1T t};16 r=18(e,t,r,i){6(1W t==="2W"){16 t="e1"}16 s={};6(e.3F!==i){s.3g=e.3F}6(e.3b!==i){s.4z=e.3b}6(e.2U!==i){s.4x=e.2U}6(r==="2C"){s.5k=s.5j=s.ah=1}19 6(e.4v!==i){s.5k=s.5j=s.ah=e.4v}6(e.1M){s.1M=r==="2C"?e.1M/1P:e.1M}s.3T=n(t);1T s};16 i=18(t){16 n=e("<1n>"),r=1g,i=1g,s=["dX","e0","eC","fw","dM"];3P=["eI","eX","e2","er","eo"];23(16 o=s.1k-1;o>=0;o--){r=r?r:n[0].1N[s[o]]!=2W}23(16 o=3P.1k-1;o>=0;o--){n.1a("3P-1N","al-3d");i=i?i:n[0].1N[3P[o]]=="al-3d"}6(r&&n[0].1N[s[4]]!=2W){n.1f("4N","12-ef").1w(t);r=n[0].ek===3&&n[0].ea===9;n.7a()}1T r&&i};16 s=18(e,t,n){16 r=[];6(n=="7X"){23(16 i=0;i<e;i++){23(16 s=0;s<t;s++){r.7Y(i+s*e)}}}19{23(16 i=e-1;i>-1;i--){23(16 s=t-1;s>-1;s--){r.7Y(i+s*e)}}}1T r};16 o=18(e){16 t=0;23(16 n 3M e){6(e.e9(n)){++t}}1T t};16 u=18(){bb=18(e){e=e.20();16 t=/(b9)[ \\/]([\\w.]+)/.5Y(e)||/(5S)[ \\/]([\\w.]+)/.5Y(e)||/(eb)(?:.*2s|)[ \\/]([\\w.]+)/.5Y(e)||/(9c) ([\\w.]+)/.5Y(e)||e.1i("bP")<0&&/(ed)(?:.*? em:([\\w.]+)|)/.5Y(e)||[];1T{7T:t[1]||"",2s:t[2]||"0"}};16 e=bb(3W.3Y),t={};6(e.7T){t[e.7T]=1c;t.2s=e.2s}6(t.b9){t.5S=1c}19 6(t.5S){t.ey=1c}1T t};eA=18(e,t){16 n=["5S","ew","bh","bi","o",""];16 r=0,i,s;bt(r<n.1k&&!e[i]){i=t;6(n[r]==""){i=i.bk(0,1).20()+i.bk(1)}i=n[r]+i;s=1W e[i];6(s!="2W"){n=[n[r]];1T s=="18"?e[i]():e[i]}r++}};t.7q={2s:"5.1.0",9m:18(){6(3W.3Y.3H(/eu/i)||3W.3Y.3H(/e8/i)||3W.3Y.3H(/e7/i)||3W.3Y.3H(/dQ/i)||3W.3Y.3H(/dR/i)||3W.3Y.3H(/dS/i)||3W.3Y.3H(/dO dJ/i)){1T 1c}19{1T 1g}},dK:18(e){6(e.1a("28-1o")=="1U"||e.1a("28-1o")=="1Q"||e.1a("28-1o")==0||e.1a("28-1o")=="9b"){1T 1c}19{1T 1g}},2o:u().9c&&u().2s<9?1c:1g,38:1g,5b:1g,2w:1g,36:1g,2y:79,2f:"1X",4o:79,1A:79,1H:79,7W:{1S:{1m:"1F",1F:"1m",1q:"1o",1o:"1q"},1X:{1m:"1m",1F:"1F",1q:"1q",1o:"1o"}},v:{d:41,fo:88,fi:41}};t.9Q={9R:80,9S:0,5y:1P,5r:0,5F:"7n",2J:1c,9X:0,9Y:0,a4:0,9x:1,a3:1,a2:1,9Z:0,a0:0,a1:["50%","50%","0"],9E:41,8l:-80,7C:0,4S:9A,e6:0,4F:"7n",3J:1c,7x:0,7G:0,7P:0,7O:1,8P:1,8O:1,8T:0,8W:0,8V:["50%","50%","0"],8S:41};t.9H={7i:as};t.9K={9L:1c,4E:0,7f:0,7g:1c,9M:1c,33:1,4B:1c,4j:0,7m:1c,92:1g,7k:1g,2r:"dY",3z:"/69/dZ/",8q:"8p",7p:1g,8M:1c,7e:1c,7h:1c,9y:1c,9G:1c,9F:1c,7j:1g,9W:1g,a6:1c,3e:"1R",7o:"60%",7V:1D,65:60,7U:35,81:1D,86:1c,2u:"1U",87:"fe.f6",43:1c,47:1c,1u:1g,bo:"1m: -6h; 1q: -6h;",7Z:1g,bp:"fu",bu:1c,bv:1c,bz:18(e){},b2:18(e){},ax:18(e){},au:18(e){},ac:18(e){},7Q:18(e){},7v:18(e){},7l:18(e){},7i:as,8s:"1F",ao:.45,8L:.45,5y:1P,4S:1P,5F:"7n",4F:"7n",5r:0,7t:0}})(3A)',62,963,'||||||if|||||||||||||||||||||||||||||||||||||||||||||||||||||||||data|ls||this||var|find|function|else|css|parseInt|true|width|height|attr|false|src|indexOf|break|length|case|left|div|bottom|slide|top|addClass|nav|class|yourLogo|nextLayer|appendTo|stop|lt|ratio|sliderWidth|transition|Math|100|split|right|thumbnail|sliderHeight|new|px|display|curLayer|delay|style|each|1e3|none|hover|prev|return|auto|active|typeof|next|strong|img|toLowerCase|the|start|for|parent||floor|curLayerIndex|padding|visibility|animation|iframe|inner||to|prevNext|setTimeout|random|href|replace|click|duration|block|container|ie78|switch|window|skin|version|originalAutoSlideshow|autoPauseSlideshow|clearTimeout|autoSlideshow|removeClass|layersNum|300|LayerSlider|transitiontype|after|ltContainer|sliderOriginalWidth|videopreview|L2|before|not|fadeIn|image|ot|video|T2|hidden|cttl|opacity|wrapper|loaded|resize|rotateX|layerSlider|undefined|of|originalHeight|originalWidth|hasClass|load|L1|firstSlide|visible||isAnimating||paused||TweenLite|rotateY|offsetxout||thumbnailNavigation|circleTimer|rotation|children|parseFloat|margin|curSubScaleX|background|is|bottomWrapper|totalDuration|marginLeft|curSubScaleY|offsetyout|makeResponsive|preventDefault|barTimer|border|preloaded|position|outerHeight|skinsPath|jQuery|fade|slidedirection|outerWidth|li|rotate|param|match|curSlideTime|fadeOut|box|deg|in|tr|marginTop|transform|tile|history|append|ease|body|number|navigator|videoSrc|userAgent|error|shadow|500|thumbsWrapper|imgPreload|or||pausedSlideTime|lazyLoad|isLoading|abs|responsiveMode|rows|curSubScale|startSlideTime|on|autoplay|thumb|originalLeft|it|loops|originalTop|tn|sliderOriginalHeight|last|slideTimer|cols|overflow|nextLoop|animate|all|html|scale3d|console|rotationX|type|rotationY|easing|animateFirstSlide|change|extend|responsiveUnder|easingOut|layer|png|ul|easingout|like|durationout|location|id|your|Please|and|always|durationOut|slidebuttons|getTime|parallaxlevel|transition3d|debug|scale2D|st||shadowImg|vimeo|youtu|curTiles|rel|_|Date|curSubRotateX|init|touches|pausedByVideo|nextSubScaleY|delayin|offsetxin|offsetyin|WordPress|fisrtSlide|thumbnails|scaleY|scaleX|tt|offset|nextSubScaleX|curSubRotateY|curSubSkewX|curSubSkewY|delayIn|customtransition2d|durationin|customtransition3d|showuntil|delayout|LSCustomTransition|durationIn|touchEndX|trim|transition2d|empty|index|removeAttr|easingIn|span|slidedelay|scale|alt|easingin|0deg|scaleout|com|transitionType|back|timer|rotateZ|webkit|string|rotateout|old|reverse|translate3d|exec|direction||nextLayerIndex|player|url|show|tnHeight|www|vpcontainer|pause|layerslider|closest|slideoutdirection|document|originalBottom|originalRight|wp|fullwidth|10px|rotateyout|clicked|perspectiveout|scaleyout|scalexout|skewxout|skewyout|rotatexout|prependTo|layerMarginLeft|ontouchstart|fadeTo|oB|layerMarginTop|curLayerTop|nIt|nextLayerTop|nextLayerLeft|oT|oR|videoTimer|nothumb|touchStartX|bind|showShadow|originalBorderLeft|originalBorderBottom|originalBorderTop|originalBorderRight|seems|URL|180|Play|http|videoDuration|fromTo|nt|name|O2|rt|showUntilTimer|audio|check|cannot|wrong|pointing|URLs|images|nextSubScale|slider|used|timeshift|transformoriginout|null|remove|nbsp|link|originalOpacity|navStartStop|layersContainer|autoStart|navButtons|slideDelay|hoverBottomNav|randomSlideshow|cbNext|forceLoopNum|easeInOutQuint|tnContainerWidth|globalBGImage|global|skewY|skewX|delayOut|150|cbPrev|parallaxout|rotateOut|scrollThumb|originalPaddingRight|easeNone|Linear|offsetYOut|curLayerRight|easeinout|originalPaddingLeft|rotateXOut|easeout|charAt|easein|linkto|nextSubSkewY|slice|bottomNavSizeHelper|scaleOut|rotateYOut|cbAnimStop|changeThumb|bottomright|browser|tnActiveOpacity|tnWidth|slideDirections|forward|push|yourLogoLink||tnInactiveOpacity|nextSubRotateY|nextSubRotateX|nextSubSkewX|kill|autoPlayVideos|youtubePreview|750|embed|nextLayerRight|linear|clone|nextLayerHeight|nextLayerWidth|nextTiles|bottomleft|topright|250|youtube|nextLayerBottom|offsetXOut|topleft|curLayerBottom|toUpperCase|transparent|globalBGColor|forceHideControls|slideDirection|resizeShadow|slideTransition|wpVersion|cssContainer|lswpVersion|sliderOriginalWidthRU|resizeSlider|scalein|onComplete|transformOrigin|dequeue|sublayerContainer|videohack|transformPerspective|sublayerShowUntil|rotatein|text|set|parallaxOut|navPrevNext|jquery|scaleYOut|scaleXOut|originalPaddingBottom|originalPaddingTop|perspectiveOut|skewXOut|fired|transformOriginOut|skewYOut|pageX|join|resizeYourLogo||content|twoWaySlideshow|aUU|script|ut|It|borderRightWidth|looks|issue|showSlider|0px|msie|borderLeftWidth|animating|skewyin|borderTopWidth|font|perspectivein|size|line|library|isMobile|originalLineHeight|transformoriginin|skewxin|rotateyin|rotatexin|parallaxin|scalexin|originalFontSize|scaleyin|cbTimeLineStart|scaleIn|keybNav|helper|400|shadowBtmMod|stopLayer|substring|perspectiveIn|hoverPrevNext|touchNav|slideTransitions|off|resizeThumb|options|responsive|pauseOnHover|hider|lastIndexOf|alert|layerTransitions|offsetXIn|offsetYIn|loading|gi|borderBottomWidth|showBarTimer|rotateIn|rotateXIn|skewXIn|skewYIn|transformOriginIn|scaleYIn|scaleXIn|rotateYIn|half|showCircleTimer|depth|t2|t1|t3|t4|cbAnimStart|lsShowNotice|oldjquery|forcestop|mirror|scaleZ|object|mousemove|ieEasing|preserve|aeU||parallaxIn|group|relative|entry|4e3||cbPause|disabled|sides|cbStop|easeIn|easeOut|forced|t5|putData|zIndex|meta||properties|tagName|firstSlideAnimated|above|SLIDE||prop|initialized|layerSliderCustomTransitions|altKey|shiftKey|swing|easeInOut|||hash|norotate|marginRight|layerSliderTransitions|add|2e3|350|cbStart|with|opaque|update|plugin|default|firstLayer|chrome|wmode|uaMatch|randomize|col||originalEvent||moz|ms|custom3d|substr|curSkin|which|custom2d|yourLogoStyle|yourLogoTarget|controls||from|while|optimizeForMobile|optimizeForIE78|front|vi||cbInit|getJSON|horizontal|head|TimelineLite|pageY|parallaxStartY|parallaxStartX|api|h1|thumbnail_large|clientX|large|playvideo|JS|fadeout|compatible|callback|createStyleSheet|json|that|keydown|multiple|sideright|backgroundImage|backgroundColor|important|blank|causing|copy|loads|extra|theme|gif|indicator|static|touchscroll|another|sideleft|center|mouseenter|mouseleave|absolute|below|using|title|pointer|exclam|here|continue|forceStop|enableCSS3|deeplink|cursor|clicking|file||more|media|read|yt|about|videos|gdata|feeds|updating|round|enabled|stylesheet|already|Skin|Trying|Fallback|mode|were|Neither|animateFirstLayer|mistyped|Possibilities|insertAfter|information|force|gpuhack|insertBefore|without|Loading|WP|can|You|within|option|includes|Put|Troubleshooting|Advanced|are|you|Settings|ended|enable|area|admin|navigate|sliders|circle|bar|wrapAll|page|main|requires|least|kreaturamedia|support||IE|browsers|v2|html5|seconds|wordpress|faq|older|because|Important|higher|newer|play|currentTime|Updater|use|640|problems|mixed|fixed|Phone|isHideOn3D|10000000000|WebkitPerspective|curtile|Windows|dispay|iPad|iPod|BlackBerry|nexttile|300px|20px|vertical|perspective|v5|skins|OPerspective|easeInOutQuart|msTransformStyle|black|radius|hide|showUntil|iPhone|webOS|hasOwnProperty|offsetLeft|opera|touchstart|mozilla|Content|test3d|red|Init|solid|2px|offsetHeight||rv|Number|WebkitTransformStyle|Layer||MozTransformStyle|distance||Android|obj|khtml|slides|safari|found|lsPrefixes|code|msPerspective|touchmove|Cubic|cubic|Quart|quart|transformStyle|quint|expo|Expo|Sine|sine|Quint|Quad|quad|target|textDecoration|bock|yourlogo|touchend|outline|OTransformStyle|restart|resume|onReverseComplete|queue|nexttiles|circ|fadein|custom|jpg|filter|layerMarginBottom|specified|carousel|t2d|curtiles|sequence|maxresdefault|crossfad|layerMarginRight|changeTimer||Back|bounce|Elastic|elastic|||Circ|Bounce|450|600|log|_self|Trident|MozPerspective'.split('|'),0,{}))
;

/*
	* 2D & 3D Transitions for LayerSlider
	*
	* (c) 2011-2013 George Krupa, John Gera & Kreatura Media
	*
	* Plugin web:			http://kreaturamedia.com/
	* Licenses: 			http://codecanyon.net/licenses/
*/




eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('20 1Z={27:[{j:"13 N E",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"1e",a:G,h:"r"}},{j:"13 N r",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"1e",a:G,h:"E"}},{j:"13 N L",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"1e",a:G,h:"J"}},{j:"13 N J",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"1e",a:G,h:"L"}},{j:"26",d:1,g:1,f:{e:0,i:"o"},c:{n:"14",b:"1e",a:G,h:"r"}},{j:"Z R o",d:[2,4],g:[4,7],f:{e:1k,i:"o"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"Z R D",d:[2,4],g:[4,7],f:{e:1k,i:"D"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"Z R 1j-o",d:[2,4],g:[4,7],f:{e:1k,i:"1j-o"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"Z R 1j-D",d:[2,4],g:[4,7],f:{e:1k,i:"1j-D"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"Z R (k)",d:[2,4],g:[4,7],f:{e:1k,i:"k"},c:{n:"14",b:"z",a:G,h:"r"}},{j:"1y 1H N E",d:1,g:1s,f:{e:25,i:"D"},c:{n:"14",b:"1X",a:V,h:"r"}},{j:"1y 1H N r",d:1,g:1s,f:{e:25,i:"o"},c:{n:"14",b:"w",a:V,h:"r"}},{j:"1y 1H N L",d:1s,g:1,f:{e:25,i:"1j-D"},c:{n:"14",b:"w",a:V,h:"r"}},{j:"1y 1H N J",d:1s,g:1,f:{e:25,i:"1j-o"},c:{n:"14",b:"w",a:V,h:"r"}},{j:"1y Y N E",d:1,g:25,f:{e:1k,i:"D"},c:{n:"W",b:"w",a:1g,h:"r"}},{j:"1y Y N r",d:1,g:25,f:{e:1k,i:"o"},c:{n:"W",b:"w",a:1g,h:"E"}},{j:"1y 1W N L",d:25,g:1,f:{e:1k,i:"1j-D"},c:{n:"W",b:"w",a:1g,h:"J"}},{j:"1y Y N J",d:25,g:1,f:{e:1k,i:"1j-o"},c:{n:"W",b:"w",a:1g,h:"L"}},{j:"13 R m E (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"E"}},{j:"13 R m r (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"r"}},{j:"13 R m L (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"L"}},{j:"13 R m J (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"J"}},{j:"13 k R m k 1S",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"W",b:"z",a:1m,h:"k"}},{j:"13 d m E (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 d m E (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 d m E (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 d m r (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"13 d m r (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"13 d m r (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"13 d N J m L (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 d N J m L (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 d N L m J (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 d N L m J (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 P m L (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 P m L (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 P m L (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"W",b:"w",a:p,h:"L"}},{j:"13 P m J (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 P m J (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 P m J (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"W",b:"w",a:p,h:"J"}},{j:"13 P N r m E (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 P N r m E (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"W",b:"w",a:p,h:"E"}},{j:"13 P N E m r (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"13 P N E m r (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"W",b:"w",a:p,h:"r"}},{j:"Z v Y R m E (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"E"}},{j:"Z v Y R m r (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"r"}},{j:"Z v Y R m L (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"L"}},{j:"Z v Y R m J (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"J"}},{j:"Z v Y k R m k 1S",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"k"}},{j:"Z v Y R N J-r (o)",d:[2,4],g:[4,7],f:{e:1f,i:"o"},c:{n:"Q",b:"z",a:1m,h:"1V"}},{j:"Z v Y R N L-E (D)",d:[2,4],g:[4,7],f:{e:1f,i:"D"},c:{n:"Q",b:"z",a:1m,h:"21"}},{j:"Z v Y R N J-E (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"1T"}},{j:"Z v Y R N L-r (k)",d:[2,4],g:[4,7],f:{e:1f,i:"k"},c:{n:"Q",b:"z",a:1m,h:"1U"}},{j:"Z v Y d m E (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y d m E (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y d m E (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y d m r (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"Z v Y d m r (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"Z v Y d m r (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"Z v Y d N J m L (o)",d:[7,11],g:1,f:{e:1d,i:"o"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y d N J m L (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y d N L m J (D)",d:[7,11],g:1,f:{e:1d,i:"D"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y d N L m J (k)",d:[7,11],g:1,f:{e:1d,i:"k"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y P m L (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y P m L (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y P m L (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"Q",b:"w",a:p,h:"L"}},{j:"Z v Y P m J (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y P m J (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y P m J (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"Q",b:"w",a:p,h:"J"}},{j:"Z v Y P N r m E (o)",d:1,g:[12,16],f:{e:q,i:"o"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y P N r m E (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"Q",b:"w",a:p,h:"E"}},{j:"Z v Y P N E m r (D)",d:1,g:[12,16],f:{e:q,i:"D"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"Z v Y P N E m r (k)",d:1,g:[12,16],f:{e:q,i:"k"},c:{n:"Q",b:"w",a:p,h:"r"}},{j:"1u",d:1,g:1,f:{e:0,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5}},{j:"1u d",d:4,g:1,f:{e:1f,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5}},{j:"1u g",d:1,g:4,f:{e:1f,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5}},{j:"1u R A",d:3,g:4,f:{e:1s,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5,y:x}},{j:"1u R F",d:3,g:4,f:{e:1s,i:"o"},c:{n:"Q",b:"1e",a:V,h:"J",1h:.5,u:-x}},{j:"1u-1I R A",d:3,g:4,f:{e:15,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5,y:x}},{j:"1u-1I R F",d:3,g:4,f:{e:15,i:"o"},c:{n:"Q",b:"1e",a:V,h:"J",1h:.5,u:-x}},{j:"1u 1I d",d:4,g:1,f:{e:1f,i:"o"},c:{n:"Q",b:"1e",a:V,h:"E",1h:.5}},{j:"1u 1I g",d:1,g:4,f:{e:1f,i:"o"},c:{n:"Q",b:"1e",a:V,h:"r",1h:.5}},{j:"1c f N r",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"z",a:V,h:"E",y:x}},{j:"1c f N E",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"z",a:V,h:"r",y:-x}},{j:"1c f N J",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"z",a:V,h:"L",u:-x}},{j:"1c f N L",d:1,g:1,f:{e:0,i:"o"},c:{n:"W",b:"z",a:V,h:"J",u:x}},{j:"1c R N r",d:[3,4],g:[3,4],f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",y:x}},{j:"1c R N E",d:[3,4],g:[3,4],f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",y:-x}},{j:"1c R N J",d:[3,4],g:[3,4],f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",u:-x}},{j:"1c R N L",d:[3,4],g:[3,4],f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",u:x}},{j:"1c d N J",d:[6,12],g:1,f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",u:x}},{j:"1c d N L",d:[6,12],g:1,f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",u:-x}},{j:"1c g N r",d:1,g:[6,12],f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",y:-x}},{j:"1c g N E",d:1,g:[6,12],f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",y:x}},{j:"1v d N r",d:[3,10],g:1,f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",y:x}},{j:"1v d N E",d:[3,10],g:1,f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",y:-x}},{j:"1v g N J",d:1,g:[3,10],f:{e:19,i:"o"},c:{n:"14",b:"z",a:V,h:"r",u:-x}},{j:"1v g N L",d:1,g:[3,10],f:{e:19,i:"D"},c:{n:"14",b:"z",a:V,h:"r",u:x}},{j:"1v v 1z f N r",d:1,g:1,f:{e:q,i:"o"},c:{n:"Q",b:"z",a:V,h:"E",1h:.1,1r:-x,y:x}},{j:"1v v 1z f N E",d:1,g:1,f:{e:q,i:"o"},c:{n:"Q",b:"z",a:V,h:"r",1h:.1,1r:x,y:-x}},{j:"1v v 1z R N r",d:[3,4],g:[3,4],f:{e:19,i:"o"},c:{n:"Q",b:"z",a:V,h:"E",1r:-1w}},{j:"1v v 1z R N E",d:[3,4],g:[3,4],f:{e:19,i:"o"},c:{n:"Q",b:"z",a:V,h:"r",1r:-1w}},{j:"1v v 1z R N k",d:[3,4],g:[3,4],f:{e:19,i:"k"},c:{n:"Q",b:"z",a:V,h:"k",1r:-1w}},{j:"B f 1O",d:1,g:1,f:{e:0,i:"o"},c:{n:"14",b:"z",a:1a,h:"r",1h:.8}},{j:"B f N 1L",d:1,g:1,f:{e:0,i:"o"},c:{n:"14",b:"w",a:1a,h:"r",1h:1.2}},{j:"B R k",d:[3,4],g:[3,4],f:{e:1s,i:"k"},c:{n:"14",b:"z",a:V,h:"r",1h:.1}},{j:"B R N 1L k",d:[3,4],g:[3,4],f:{e:1s,i:"k"},c:{n:"14",b:"z",a:V,h:"r",1h:2}},{j:"B 1O v 1z R k",d:[3,4],g:[3,4],f:{e:1s,i:"k"},c:{n:"14",b:"z",a:V,h:"r",1h:.1,1r:x}},{j:"B v 1z R N 1L k",d:[3,4],g:[3,4],f:{e:1s,i:"k"},c:{n:"14",b:"z",a:V,h:"r",1h:2,1r:-x}},{j:"1D-Y R 24",d:3,g:4,f:{e:15,i:"o"},c:{n:"W",b:"w",a:1Y,h:"1T"}},{j:"1D-Y d A",d:6,g:1,f:{e:0,i:"o"},c:{n:"Q",b:"z",a:V,h:"r"}},{j:"1D-Y d F",d:6,g:1,f:{e:0,i:"o"},c:{n:"Q",b:"z",a:V,h:"J"}},{j:"1D-Y g A",d:1,g:8,f:{e:0,i:"o"},c:{n:"Q",b:"z",a:V,h:"r"}},{j:"1D-Y g F",d:1,g:8,f:{e:0,i:"o"},c:{n:"Q",b:"z",a:V,h:"J"}}],23:[{j:"1b f m E (l&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{y:1E},b:"1F",a:G,h:"A"},C:{c:{y:l},b:"z",a:G,h:"A"}},{j:"1b f m r (l&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{y:-1E},b:"1F",a:G,h:"A"},C:{c:{y:-l},b:"z",a:G,h:"A"}},{j:"1b f m L (l&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{u:-1E},b:"1F",a:1x,h:"F"},C:{c:{u:-l},b:"z",a:1x,h:"F"}},{j:"1b f m J (l&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{u:1E},b:"1F",a:1x,h:"F"},C:{c:{u:l},b:"z",a:1x,h:"F"}},{j:"1b R m E (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"o"},s:{c:{y:l},b:"w",a:G,h:"A"}},{j:"1b R m r (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"D"},s:{c:{y:-l},b:"w",a:G,h:"A"}},{j:"1b R m L (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-o"},s:{c:{u:-l},b:"w",a:G,h:"F"}},{j:"1b R m J (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-D"},s:{c:{u:l},b:"w",a:G,h:"F"}},{j:"1B S R k (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},s:{c:{y:l},b:"w",a:1G,h:"A"}},{j:"1C S R k (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},s:{c:{u:l},b:"w",a:1G,h:"F"}},{j:"B v S R m E (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"o"},M:{c:{I:.1A},a:1l,b:"18"},s:{c:{y:l},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v S R m r (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"D"},M:{c:{I:.1A},a:1l,b:"18"},s:{c:{y:-l},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v S R m L (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-o"},M:{c:{I:.1A},a:1l,b:"18"},s:{c:{u:-l},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v S R m J (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-D"},M:{c:{I:.1A},a:1l,b:"18"},s:{c:{u:l},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v A S R k (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},M:{c:{I:.1A,u:1k},a:1l,b:"18"},s:{c:{y:l,u:-1k},b:"H",a:1G,h:"A"},C:{c:{u:0},a:1g,b:"H"}},{j:"B v F S R k (l&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},M:{c:{I:.1A,y:-15},a:1l,b:"18"},s:{c:{u:l,y:15},b:"H",a:1G,h:"F"},C:{c:{y:0},a:1g,b:"H"}},{j:"1b d m E (l&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1b d m r (l&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{y:-l},b:"w",a:1a,h:"A"}},{j:"1b d m L (l&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{u:-l},b:"w",a:G,h:"F"}},{j:"1b d m J (l&#t;)",d:[5,9],g:1,f:{e:q,i:"D"},s:{c:{u:l},b:"w",a:G,h:"F"}},{j:"1B S d k (l&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1C S d k (l&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},s:{c:{u:-l},b:"w",a:1a,h:"F"}},{j:"1C S d k (1J&#t;)",d:[3,7],g:1,f:{e:1Q,i:"k"},s:{c:{u:-1J},b:"w",a:1R,h:"F"}},{j:"B v S d m E (l&#t;)",d:[5,9],g:1,f:{e:19,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:1p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v S d m r (l&#t;)",d:[5,9],g:1,f:{e:19,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:-l},b:"H",a:1p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v S d m L (l&#t;)",d:[5,9],g:1,f:{e:19,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"w",a:p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v S d m J (l&#t;)",d:[5,9],g:1,f:{e:19,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:l},b:"w",a:p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v A S d k (l&#t;)",d:[5,9],g:1,f:{e:19,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:1p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v F S d k (l&#t;)",d:[5,9],g:1,f:{e:19,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"1b P m E (l&#t;)",d:1,g:[5,9],f:{e:q,i:"o"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1b P m r (l&#t;)",d:1,g:[5,9],f:{e:q,i:"o"},s:{c:{y:-l},b:"w",a:1a,h:"A"}},{j:"1b P m L (l&#t;)",d:1,g:[5,9],f:{e:q,i:"o"},s:{c:{u:-l},b:"w",a:G,h:"F"}},{j:"1b P m J (l&#t;)",d:1,g:[5,9],f:{e:q,i:"D"},s:{c:{u:l},b:"w",a:G,h:"F"}},{j:"1B S P k (l&#t;)",d:1,g:[5,9],f:{e:q,i:"k"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1C S P k (l&#t;)",d:1,g:[5,9],f:{e:q,i:"k"},s:{c:{u:-l},b:"w",a:1a,h:"F"}},{j:"1B S P k (1J&#t;)",d:1,g:[4,9],f:{e:1Q,i:"k"},s:{c:{y:1J},b:"w",a:1R,h:"A"}},{j:"B v S P m E (l&#t;)",d:1,g:[7,11],f:{e:19,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"w",a:p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v S P m r (l&#t;)",d:1,g:[7,11],f:{e:19,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:-l},b:"w",a:p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v S P m L (l&#t;)",d:1,g:[7,11],f:{e:19,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:1p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v S P m J (l&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:l},b:"H",a:1p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v A S P k (l&#t;)",d:1,g:[7,11],f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:p,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v F S P k (l&#t;)",d:1,g:[7,11],f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:1p,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"1N 1P 1M v S m E (l&#t;)",d:1,g:[7,11],f:{e:q,i:"o"},M:{c:{I:.O,u:-1k},a:p,b:"z"},s:{c:{u:-1k,y:l},b:"w",a:G,h:"A"},C:{c:{u:0,e:X},b:"z",a:p}},{j:"1N 1P 1M v S m r (l&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},M:{c:{I:.O,u:-1k},a:p,b:"z"},s:{c:{u:1k,y:-l},b:"w",a:G,h:"A"},C:{c:{u:0,e:X},b:"z",a:p}},{j:"1c 1t m E (x&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{y:x},b:"w",a:1a,h:"A"}},{j:"1c 1t m r (x&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{y:-x},b:"w",a:1a,h:"A"}},{j:"1c 1t m L (x&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{u:-x},b:"w",a:1a,h:"F"}},{j:"1c 1t m J (x&#t;)",d:1,g:1,f:{e:q,i:"o"},s:{c:{u:x},b:"w",a:1a,h:"F"}},{j:"B v 17 1t m E (x&#t;)",d:1,g:1,f:{e:q,i:"k"},s:{c:{I:.8,1r:7,u:10,y:1w},b:"1e",a:1x,h:"A"},C:{c:{1r:0,u:0,y:x},a:1x,b:"1e"}},{j:"B v 17 1t m r (x&#t;)",d:1,g:1,f:{e:q,i:"k"},s:{c:{I:.8,1r:-7,u:10,y:-1w},b:"1e",a:1x,h:"A"},C:{c:{1r:0,u:0,y:-x},a:1x,b:"1e"}},{j:"B v 17 1n m E (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"o"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{y:x},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v 17 1n m r (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"D"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{y:-x},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v 17 1n m L (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-o"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v 17 1n m J (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"1j-D"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{u:x},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v A 17 1n k (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},M:{c:{I:.1i,u:-15},a:1o,b:"18"},s:{c:{y:q,u:15},b:"H",a:1o,h:"A"},C:{c:{y:x,u:0},a:1o,b:"H"}},{j:"B v F 17 1n k (x&#t;)",d:[2,4],g:[4,7],f:{e:q,i:"k"},M:{c:{I:.1i,y:15},a:1o,b:"18"},s:{c:{u:q,y:-15},b:"H",a:1o,h:"F"},C:{c:{u:x,y:0},a:1o,b:"H"}},{j:"1c d m E (x&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{y:x},b:"w",a:1a,h:"A"}},{j:"1c d m r (x&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},s:{c:{y:-x},b:"w",a:1a,h:"A"}},{j:"1B 17 d k (x&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},s:{c:{y:x},b:"w",a:1a,h:"A"}},{j:"B v 17 d m E (x&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:22,u:0},b:"H",a:G,h:"A"},C:{c:{e:X,y:x},b:"K",a:p}},{j:"B v 17 d m r (x&#t;)",d:[5,9],g:1,f:{e:q,i:"D"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:-x,u:0},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 d m L (x&#t;)",d:[5,9],g:1,f:{e:q,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 d m J (x&#t;)",d:[5,9],g:1,f:{e:q,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v A 17 d k (x&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:x,u:0},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v F 17 d k (x&#t;)",d:[5,9],g:1,f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v A 17 1K d m E (x&#t;)",d:[7,11],g:1,f:{e:q,i:"o"},s:{c:{I:.O,u:5,y:1w},b:"18",a:G,h:"A"},C:{c:{u:0,y:x},b:"18",a:G}},{j:"B v A 17 1K d m r (x&#t;)",d:[7,11],g:1,f:{e:q,i:"D"},s:{c:{I:.O,u:5,y:-1w},b:"18",a:G,h:"A"},C:{c:{u:0,y:-x},b:"18",a:G}},{j:"1c P m L (x&#t;)",d:1,g:[5,9],f:{e:q,i:"o"},s:{c:{u:-x},b:"w",a:G,h:"F"}},{j:"1c P m J (x&#t;)",d:1,g:[5,9],f:{e:q,i:"D"},s:{c:{u:x},b:"w",a:G,h:"F"}},{j:"1C 17 P k (x&#t;)",d:1,g:[5,9],f:{e:q,i:"k"},s:{c:{u:-x},b:"w",a:G,h:"F"}},{j:"B v 17 P m L (x&#t;)",d:1,g:[7,11],f:{e:q,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 P m J (x&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 P m E (x&#t;)",d:1,g:[7,11],f:{e:q,i:"o"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:x},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v 17 P m r (x&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:-x},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v A 17 P k (x&#t;)",d:1,g:[7,11],f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:x},b:"H",a:G,h:"A"},C:{c:{e:X},b:"K",a:p}},{j:"B v F 17 P k (x&#t;)",d:1,g:[7,11],f:{e:q,i:"k"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-x},b:"H",a:G,h:"F"},C:{c:{e:X},b:"K",a:p}},{j:"B v F 17 1K P m E (x&#t;)",d:1,g:[7,11],f:{e:q,i:"o"},s:{c:{I:.O,u:1w,y:-5},b:"18",a:G,h:"F"},C:{c:{u:x,y:0},b:"18",a:G}},{j:"B v F 17 1K P m r (x&#t;)",d:1,g:[7,11],f:{e:q,i:"D"},s:{c:{I:.O,u:-1w,y:-5},b:"18",a:G,h:"F"},C:{c:{u:-x,y:0},b:"18",a:G}},{j:"1b 1t m E (l&#t;, T U)",d:1,g:1,f:{e:q,i:"o",U:"T"},s:{c:{y:l},b:"w",a:1a,h:"A"}},{j:"1b 1t m r (l&#t;, T U)",d:1,g:1,f:{e:q,i:"o",U:"T"},s:{c:{y:-l},b:"w",a:1a,h:"A"}},{j:"1b 1t m L (l&#t;, T U)",d:1,g:1,f:{e:q,i:"o",U:"T"},s:{c:{u:-l},b:"w",a:1a,h:"F"}},{j:"1b 1t m J (l&#t;, T U)",d:1,g:1,f:{e:q,i:"o",U:"T"},s:{c:{u:l},b:"w",a:1a,h:"F"}},{j:"B v S 1n m E (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"o",U:"T"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{y:l},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v S 1n m r (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"D",U:"T"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{y:-l},b:"H",a:G,h:"A"},C:{a:1g,b:"H"}},{j:"B v S 1n m L (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"1j-o",U:"T"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{u:-l},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v S 1n m J (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"1j-D",U:"T"},M:{c:{I:.O},a:1l,b:"18"},s:{c:{u:l},b:"H",a:G,h:"F"},C:{a:1g,b:"H"}},{j:"B v A S 1n k (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"k",U:"T"},M:{c:{I:.1i},a:1o,b:"18"},s:{c:{y:l},b:"H",a:1o,h:"A"},C:{a:1o,b:"H"}},{j:"B v F S 1n k (l&#t;, T U)",d:[2,4],g:[4,7],f:{e:q,i:"k",U:"T"},M:{c:{I:.1i},a:1o,b:"18"},s:{c:{u:l},b:"H",a:1o,h:"F"},C:{a:1o,b:"H"}},{j:"B v S d m E (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"o",U:"T"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:l,u:-3},b:"w",a:1p,h:"A"},C:{c:{e:X,u:0},b:"z",a:1q}},{j:"B v S d m r (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"D",U:"T"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:-l,u:-3},b:"w",a:1p,h:"A"},C:{c:{e:X,u:0},b:"z",a:1q}},{j:"B v S d m L (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"o",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:G,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S d m J (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"D",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:l},b:"H",a:G,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v A S d k (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"k",U:"T"},M:{c:{I:.O,u:3},a:p,b:"K"},s:{c:{y:l,u:-3},b:"w",a:1p,h:"A"},C:{c:{e:X,u:0},b:"z",a:1q}},{j:"B v F S d k (l&#t;, T U)",d:[5,9],g:1,f:{e:1i,i:"k",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"H",a:G,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S P m L (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"o",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"w",a:1p,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S P m J (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"D",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:l},b:"w",a:1p,h:"F"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S P m E (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"o",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:G,h:"A"},C:{c:{e:X},b:"z",a:1q}},{j:"B v S P m r (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"D",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:-l},b:"H",a:G,h:"A"},C:{c:{e:X},b:"z",a:1q}},{j:"B v A S P k (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"k",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{y:l},b:"H",a:G,h:"A"},C:{c:{e:X},b:"z",a:1q}},{j:"B v F S P k (l&#t;, T U)",d:1,g:[7,11],f:{e:1i,i:"k",U:"T"},M:{c:{I:.O},a:p,b:"K"},s:{c:{u:-l},b:"w",a:1p,h:"F"},C:{c:{e:X},b:"z",a:1q}}]}',62,132,'||||||||||duration|easing|transition|rows|delay|tile|cols|direction|sequence|name|random|180|to|type|forward|600|75|left|animation|176|rotateX|and|easeInOutQuart|90|rotateY|easeOutQuart|horizontal|Scaling|after|reverse|right|vertical|1e3|easeInOutBack|scale3d|top|easeOutBack|bottom|before|from|85|columns|mixed|tiles|spinning|large|depth|750|slide|200|sliding|Fading||||Sliding|fade|||turning|easeInOutQuint|55|1500|Spinning|Turning|100|easeInOutQuad|50|350|scale|65|col|30|450|500|cuboids|700|1200|400|rotate|35|cuboid|Carousel|Flying|45|800|Smooth|rotating|95|Horizontal|Vertical|Mirror|91|easeInQuart|1300|fading|mirror|540|drunk|out|scaling|Drunk|in|colums|150|2e3|directions|topright|bottomleft|topleft|sliging|linear|850|layerSliderTransitions|var|bottomright|87|t3d|diagonal||Crossfading|t2d'.split('|')))
;
jQuery(document).ready(function($){
	var cSpeed=10;
	var cWidth=128;
	var cHeight=128;
	var cTotalFrames=20;
	var cFrameWidth=128;
//	var cImageSrc='images/sprites.gif';

	var cImageTimeout=false;
	var cIndex=0;
	var cXpos=0;
	var cPreloaderTimeout=false;
	var SECONDS_BETWEEN_FRAMES=0;

	function startAnimation(){

	//	document.getElementById('loaderImage').style.backgroundImage='url('+cImageSrc+')';
		document.getElementById('loaderImage').style.width=cWidth+'px';
		document.getElementById('loaderImage').style.height=cHeight+'px';

		//FPS = Math.round(100/(maxSpeed+2-speed));
		FPS = Math.round(100/cSpeed);
		SECONDS_BETWEEN_FRAMES = 1 / FPS;

		cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);

	}

	function continueAnimation(){

		cXpos += cFrameWidth;
		//increase the index so we know which frame of our animation we are currently on
		cIndex += 1;

		//if our cIndex is higher than our total number of frames, we're at the end and should restart
		if (cIndex >= cTotalFrames) {
			cXpos =0;
			cIndex=0;
		}

		if(document.getElementById('loaderImage'))
			document.getElementById('loaderImage').style.backgroundPosition=(-cXpos)+'px 0';

		cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES*1000);
	}

	function stopAnimation(){//stops animation
		clearTimeout(cPreloaderTimeout);
		cPreloaderTimeout=false;
	}

	function imageLoader(s, fun)//Pre-loads the sprites image
	{
		clearTimeout(cImageTimeout);
		cImageTimeout=0;
		genImage = new Image();
		genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
		genImage.onerror=new Function('alert(\'Could not load the image\')');
		genImage.src=s;
	}

	//The following code starts the animation
	//new imageLoader(cImageSrc, 'startAnimation()');

});
/*!
 * Masonry PACKAGED v3.1.5
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */


!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c(a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(this),function(a){function b(a){"function"==typeof a&&(b.isReady?a():f.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==e.readyState;if(!b.isReady&&!c){b.isReady=!0;for(var d=0,g=f.length;g>d;d++){var h=f[d];h()}}}function d(d){return d.bind(e,"DOMContentLoaded",c),d.bind(e,"readystatechange",c),d.bind(a,"load",c),b}var e=a.document,f=[];b.isReady=!1,"function"==typeof define&&define.amd?(b.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],d)):a.docReady=d(a.eventie)}(this),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:this.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function d(a){function d(a){if("string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var d=f(a);if("none"===d.display)return c();var e={};e.width=a.offsetWidth,e.height=a.offsetHeight;for(var k=e.isBorderBox=!(!j||!d[j]||"border-box"!==d[j]),l=0,m=g.length;m>l;l++){var n=g[l],o=d[n];o=h(a,o);var p=parseFloat(o);e[n]=isNaN(p)?0:p}var q=e.paddingLeft+e.paddingRight,r=e.paddingTop+e.paddingBottom,s=e.marginLeft+e.marginRight,t=e.marginTop+e.marginBottom,u=e.borderLeftWidth+e.borderRightWidth,v=e.borderTopWidth+e.borderBottomWidth,w=k&&i,x=b(d.width);x!==!1&&(e.width=x+(w?0:q+u));var y=b(d.height);return y!==!1&&(e.height=y+(w?0:r+v)),e.innerWidth=e.width-(q+u),e.innerHeight=e.height-(r+v),e.outerWidth=e.width+s,e.outerHeight=e.height+t,e}}function h(a,b){if(e||-1===b.indexOf("%"))return b;var c=a.style,d=c.left,f=a.runtimeStyle,g=f&&f.left;return g&&(f.left=a.currentStyle.left),c.left=b,b=c.pixelLeft,c.left=d,g&&(f.left=g),b}var i,j=a("boxSizing");return function(){if(j){var a=document.createElement("div");a.style.width="200px",a.style.padding="1px 2px 3px 4px",a.style.borderStyle="solid",a.style.borderWidth="1px 2px 3px 4px",a.style[j]="border-box";var c=document.body||document.documentElement;c.appendChild(a);var d=f(a);i=200===b(d.width),c.removeChild(a)}}(),d}var e=a.getComputedStyle,f=e?function(a){return e(a,null)}:function(a){return a.currentStyle},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],d):"object"==typeof exports?module.exports=d(require("get-style-property")):a.getSize=d(a.getStyleProperty)}(window),function(a,b){function c(a,b){return a[h](b)}function d(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function e(a,b){d(a);for(var c=a.parentNode.querySelectorAll(b),e=0,f=c.length;f>e;e++)if(c[e]===a)return!0;return!1}function f(a,b){return d(a),c(a,b)}var g,h=function(){if(b.matchesSelector)return"matchesSelector";for(var a=["webkit","moz","ms","o"],c=0,d=a.length;d>c;c++){var e=a[c],f=e+"MatchesSelector";if(b[f])return f}}();if(h){var i=document.createElement("div"),j=c(i,"div");g=j?c:f}else g=e;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return g}):window.matchesSelector=g}(this,Element.prototype),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){for(var b in a)return!1;return b=null,!0}function d(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function e(a,e,f){function h(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}var i=f("transition"),j=f("transform"),k=i&&j,l=!!f("perspective"),m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[i],n=["transform","transition","transitionDuration","transitionProperty"],o=function(){for(var a={},b=0,c=n.length;c>b;b++){var d=n[b],e=f(d);e&&e!==d&&(a[d]=e)}return a}();b(h.prototype,a.prototype),h.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},h.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},h.prototype.getSize=function(){this.size=e(this.element)},h.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=o[c]||c;b[d]=a[c]}},h.prototype.getPosition=function(){var a=g(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=parseInt(a[c?"left":"right"],10),f=parseInt(a[d?"top":"bottom"],10);e=isNaN(e)?0:e,f=isNaN(f)?0:f;var h=this.layout.size;e-=c?h.paddingLeft:h.paddingRight,f-=d?h.paddingTop:h.paddingBottom,this.position.x=e,this.position.y=f},h.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={};b.isOriginLeft?(c.left=this.position.x+a.paddingLeft+"px",c.right=""):(c.right=this.position.x+a.paddingRight+"px",c.left=""),b.isOriginTop?(c.top=this.position.y+a.paddingTop+"px",c.bottom=""):(c.bottom=this.position.y+a.paddingBottom+"px",c.top=""),this.css(c),this.emitEvent("layout",[this])};var p=l?function(a,b){return"translate3d("+a+"px, "+b+"px, 0)"}:function(a,b){return"translate("+a+"px, "+b+"px)"};h.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={},k=this.layout.options;h=k.isOriginLeft?h:-h,i=k.isOriginTop?i:-i,j.transform=p(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},h.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},h.prototype.moveTo=k?h.prototype._transitionTo:h.prototype.goTo,h.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},h.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},h.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var q=j&&d(j)+",opacity";h.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:q,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(m,this,!1))},h.prototype.transition=h.prototype[i?"_transition":"_nonTransition"],h.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},h.prototype.onotransitionend=function(a){this.ontransitionend(a)};var r={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};h.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,d=r[a.propertyName]||a.propertyName;if(delete b.ingProperties[d],c(b.ingProperties)&&this.disableTransition(),d in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[d]),d in b.onEnd){var e=b.onEnd[d];e.call(this),delete b.onEnd[d]}this.emitEvent("transitionEnd",[this])}},h.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(m,this,!1),this.isTransitioning=!1},h.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var s={transitionProperty:"",transitionDuration:""};return h.prototype.removeTransitionStyles=function(){this.css(s)},h.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},h.prototype.remove=function(){if(!i||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.on("transitionEnd",function(){return a.removeElem(),!0}),this.hide()},h.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options;this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0})},h.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options;this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},h.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},h}var f=a.getComputedStyle,g=f?function(a){return f(a,null)}:function(a){return a.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],e):(a.Outlayer={},a.Outlayer.Item=e(a.EventEmitter,a.getSize,a.getStyleProperty))}(window),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){return"[object Array]"===l.call(a)}function d(a){var b=[];if(c(a))b=a;else if(a&&"number"==typeof a.length)for(var d=0,e=a.length;e>d;d++)b.push(a[d]);else b.push(a);return b}function e(a,b){var c=n(b,a);-1!==c&&b.splice(c,1)}function f(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()}function g(c,g,l,n,o,p){function q(a,c){if("string"==typeof a&&(a=h.querySelector(a)),!a||!m(a))return void(i&&i.error("Bad "+this.constructor.namespace+" element: "+a));this.element=a,this.options=b({},this.constructor.defaults),this.option(c);var d=++r;this.element.outlayerGUID=d,s[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var r=0,s={};return q.namespace="outlayer",q.Item=p,q.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},b(q.prototype,l.prototype),q.prototype.option=function(a){b(this.options,a)},q.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),b(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},q.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},q.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},q.prototype._filterFindItemElements=function(a){a=d(a);for(var b=this.options.itemSelector,c=[],e=0,f=a.length;f>e;e++){var g=a[e];if(m(g))if(b){o(g,b)&&c.push(g);for(var h=g.querySelectorAll(b),i=0,j=h.length;j>i;i++)c.push(h[i])}else c.push(g)}return c},q.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},q.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},q.prototype._init=q.prototype.layout,q.prototype._resetLayout=function(){this.getSize()},q.prototype.getSize=function(){this.size=n(this.element)},q.prototype._getMeasurement=function(a,b){var c,d=this.options[a];d?("string"==typeof d?c=this.element.querySelector(d):m(d)&&(c=d),this[a]=c?n(c)[b]:d):this[a]=0},q.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},q.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},q.prototype._layoutItems=function(a,b){function c(){d.emitEvent("layoutComplete",[d,a])}var d=this;if(!a||!a.length)return void c();this._itemsOn(a,"layout",c);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f],i=this._getItemLayoutPosition(h);i.item=h,i.isInstant=b||h.isLayoutInstant,e.push(i)}this._processLayoutQueue(e)},q.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},q.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},q.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},q.prototype._postLayout=function(){this.resizeContainer()},q.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},q.prototype._getContainerSize=k,q.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},q.prototype._itemsOn=function(a,b,c){function d(){return e++,e===f&&c.call(g),!0}for(var e=0,f=a.length,g=this,h=0,i=a.length;i>h;h++){var j=a[h];j.on(b,d)}},q.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},q.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},q.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},q.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e(d,this.stamps),this.unignore(d)}},q.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=d(a)):void 0},q.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},q.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},q.prototype._manageStamp=k,q.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,d=n(a),e={left:b.left-c.left-d.marginLeft,top:b.top-c.top-d.marginTop,right:c.right-b.right-d.marginRight,bottom:c.bottom-b.bottom-d.marginBottom};return e},q.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},q.prototype.bindResize=function(){this.isResizeBound||(c.bind(a,"resize",this),this.isResizeBound=!0)},q.prototype.unbindResize=function(){this.isResizeBound&&c.unbind(a,"resize",this),this.isResizeBound=!1},q.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},q.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},q.prototype.needsResizeLayout=function(){var a=n(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},q.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},q.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},q.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},q.prototype.reveal=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.reveal()}},q.prototype.hide=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.hide()}},q.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},q.prototype.getItems=function(a){if(a&&a.length){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f=this.getItem(e);f&&b.push(f)}return b}},q.prototype.remove=function(a){a=d(a);var b=this.getItems(a);if(b&&b.length){this._itemsOn(b,"remove",function(){this.emitEvent("removeComplete",[this,b])});for(var c=0,f=b.length;f>c;c++){var g=b[c];g.remove(),e(g,this.items)}}},q.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize(),delete this.element.outlayerGUID,j&&j.removeData(this.element,this.constructor.namespace)},q.data=function(a){var b=a&&a.outlayerGUID;return b&&s[b]},q.create=function(a,c){function d(){q.apply(this,arguments)}return Object.create?d.prototype=Object.create(q.prototype):b(d.prototype,q.prototype),d.prototype.constructor=d,d.defaults=b({},q.defaults),b(d.defaults,c),d.prototype.settings={},d.namespace=a,d.data=q.data,d.Item=function(){p.apply(this,arguments)},d.Item.prototype=new p,g(function(){for(var b=f(a),c=h.querySelectorAll(".js-"+b),e="data-"+b+"-options",g=0,k=c.length;k>g;g++){var l,m=c[g],n=m.getAttribute(e);try{l=n&&JSON.parse(n)}catch(o){i&&i.error("Error parsing "+e+" on "+m.nodeName.toLowerCase()+(m.id?"#"+m.id:"")+": "+o);continue}var p=new d(m,l);j&&j.data(m,a,p)}}),j&&j.bridget&&j.bridget(a,d),d},q.Item=p,q}var h=a.document,i=a.console,j=a.jQuery,k=function(){},l=Object.prototype.toString,m="object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1===a.nodeType&&"string"==typeof a.nodeName},n=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],g):a.Outlayer=g(a.eventie,a.docReady,a.EventEmitter,a.getSize,a.matchesSelector,a.Outlayer.Item)}(window),function(a){function b(a,b){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}var c=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++){var e=a[c];if(e===b)return c}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],b):a.Masonry=b(a.Outlayer,a.getSize)}(window);
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-shiv-cssclasses-teststyles-prefixes-load
 */

;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
var cSpeed=9;
var cWidth=128;
var cHeight=128;
var cTotalFrames=20;
var cFrameWidth=128;
//var cImageSrc='sprites.png';

var cImageTimeout=false;
var cIndex=0;
var cXpos=0;
var cPreloaderTimeout=false;
var SECONDS_BETWEEN_FRAMES=0;

function startAnimation(){
	
	//document.getElementById('loader-image').style.backgroundImage='url('+cImageSrc+')';
	document.getElementById('loader-image').style.width=cWidth+'px';
	document.getElementById('loader-image').style.height=cHeight+'px';
	
	//FPS = Math.round(100/(maxSpeed+2-speed));
	FPS = Math.round(100/cSpeed);
	SECONDS_BETWEEN_FRAMES = 1 / FPS;
	
	cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);
	
}

function continueAnimation(){
	
	cXpos += cFrameWidth;
	//increase the index so we know which frame of our animation we are currently on
	cIndex += 1;
	 
	//if our cIndex is higher than our total number of frames, we're at the end and should restart
	if (cIndex >= cTotalFrames) {
		cXpos =0;
		cIndex=0;
	}
	
	if(document.getElementById('loader-image'))
		document.getElementById('loader-image').style.backgroundPosition=(-cXpos)+'px 0';
	
	cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES*1000);
}

function stopAnimation(){//stops animation
	clearTimeout(cPreloaderTimeout);
	cPreloaderTimeout=false;
}

function imageLoader(s, fun)//Pre-loads the sprites image
{
	clearTimeout(cImageTimeout);
	cImageTimeout=0;
	genImage = new Image();
	genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
	//genImage.onerror=new Function('alert(\'Could not load the image\')');
	genImage.src=s;
}

//The following code starts the animation
//new imageLoader(cImageSrc, 'startAnimation()');
/*! responsive-nav.js v1.0.20
 * https://github.com/viljamis/responsive-nav.js
 * http://responsive-nav.com
 *
 * Copyright (c) 2013 @viljamis
 * Available under the MIT license
 */

/* jshint strict:false, forin:false, noarg:true, noempty:true, eqeqeq:true,
boss:true, bitwise:true, browser:true, devel:true, indent:2 */
/* exported responsiveNav */


var responsiveNav = (function (window, document) {

  var computed = !!window.getComputedStyle;

  // getComputedStyle polyfill
  if (!window.getComputedStyle) {
    window.getComputedStyle = function(el) {
      this.el = el;
      this.getPropertyValue = function(prop) {
        var re = /(\-([a-z]){1})/g;
        if (prop === "float") {
          prop = "styleFloat";
        }
        if (re.test(prop)) {
          prop = prop.replace(re, function () {
            return arguments[2].toUpperCase();
          });
        }
        return el.currentStyle[prop] ? el.currentStyle[prop] : null;
      };
      return this;
    };
  }

  var nav,
    opts,
    navToggle,
    styleElement = document.createElement("style"),
    hasAnimFinished,
    navOpen,

    // fn arg can be an object or a function, thanks to handleEvent
    // read more at: http://www.thecssninja.com/javascript/handleevent
    addEvent = function (el, evt, fn, bubble) {
      if ("addEventListener" in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
          el.addEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.addEventListener(evt, function (e) {
              // Bind fn as this and set first arg as event object
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("attachEvent" in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn === "object" && fn.handleEvent) {
          el.attachEvent("on" + evt, function () {
            // Bind fn as this
            fn.handleEvent.call(fn);
          });
        } else {
          el.attachEvent("on" + evt, fn);
        }
      }
    },

    removeEvent = function (el, evt, fn, bubble) {
      if ("removeEventListener" in el) {
        try {
          el.removeEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.removeEventListener(evt, function (e) {
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("detachEvent" in el) {
        if (typeof fn === "object" && fn.handleEvent) {
          el.detachEvent("on" + evt, function () {
            fn.handleEvent.call(fn);
          });
        } else {
          el.detachEvent("on" + evt, fn);
        }
      }
    },

    getChildren = function (e) {
      if (e.children.length < 1) {
        throw new Error("The Nav container has no containing elements");
      }
      // Store all children in array
      var children = [];
      // Loop through children and store in array if child != TextNode
      for (var i = 0; i < e.children.length; i++) {
        if (e.children[i].nodeType === 1) {
          children.push(e.children[i]);
        }
      }
      return children;
    },

    setAttributes = function (el, attrs) {
      for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },

    addClass = function (el, cls) {
      el.className += " " + cls;
      el.className = el.className.replace(/(^\s*)|(\s*$)/g,"");
    },

    removeClass = function (el, cls) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
    },

    ResponsiveNav = function (el, options) {
      var i;

      // Default options
      this.options = {
        animate: true,        // Boolean: Use CSS3 transitions, true or false
        transition: 350,      // Integer: Speed of the transition, in milliseconds
        label: "Menu",        // String: Label for the navigation toggle
        insert: "after",      // String: Insert the toggle before or after the navigation
        customToggle: "",     // Selector: Specify the ID of a custom toggle
        openPos: "relative",  // String: Position of the opened nav, relative or static
        jsClass: "js",        // String: 'JS enabled' class which is added to <html> el
        init: function(){},   // Function: Init callback
        open: function(){},   // Function: Open callback
        close: function(){}   // Function: Close callback
      };

      // User defined options
      for (i in options) {
        this.options[i] = options[i];
      }

      // Adds "js" class for <html>
      addClass(document.documentElement, this.options.jsClass);

      // Wrapper
      this.wrapperEl = el.replace("#", "");
      if (document.getElementById(this.wrapperEl)) {
        this.wrapper = document.getElementById(this.wrapperEl);
      } else {
        // If el doesn't exists, stop here.
        throw new Error("The nav element you are trying to select doesn't exist");
      }

      // Inner wrapper
      this.wrapper.inner = getChildren(this.wrapper);

      // For minification
      opts = this.options;
      nav = this.wrapper;

      // Init
      this._init(this);
    };

  ResponsiveNav.prototype = {
    // Public methods
    destroy: function () {
      this._removeStyles();
      removeClass(nav, "closed");
      removeClass(nav, "opened");
      nav.removeAttribute("style");
      nav.removeAttribute("aria-hidden");
      nav = null;
      _instance = null;

      removeEvent(window, "resize", this, false);
      removeEvent(document.body, "touchmove", this, false);
      removeEvent(navToggle, "touchstart", this, false);
      removeEvent(navToggle, "touchend", this, false);
      removeEvent(navToggle, "keyup", this, false);
      removeEvent(navToggle, "click", this, false);
      removeEvent(navToggle, "mouseup", this, false);

      if (!opts.customToggle) {
        navToggle.parentNode.removeChild(navToggle);
      } else {
        navToggle.removeAttribute("aria-hidden");
      }
    },

    toggle: function () {
      if (hasAnimFinished === true) {
        if (!navOpen) {
          removeClass(nav, "closed");
          addClass(nav, "opened");
          nav.style.position = opts.openPos;
          setAttributes(nav, {"aria-hidden": "false"});

          navOpen = true;
          opts.open();
        } else {
          removeClass(nav, "opened");
          addClass(nav, "closed");
          setAttributes(nav, {"aria-hidden": "true"});

          if (opts.animate) {
            hasAnimFinished = false;
            setTimeout(function () {
              nav.style.position = "absolute";
              hasAnimFinished = true;
            }, opts.transition + 10);
          } else {
            nav.style.position = "absolute";
          }

          navOpen = false;
          opts.close();
        }
      }
    },

    handleEvent: function (e) {
      var evt = e || window.event;

      switch (evt.type) {
      case "touchstart":
        this._onTouchStart(evt);
        break;
      case "touchmove":
        this._onTouchMove(evt);
        break;
      case "touchend":
      case "mouseup":
        this._onTouchEnd(evt);
        break;
      case "click":
        this._preventDefault(evt);
        break;
      case "keyup":
        this._onKeyUp(evt);
        break;
      case "resize":
        this._resize(evt);
        break;
      }
    },

    // Private methods
    _init: function () {
      addClass(nav, "closed");
      hasAnimFinished = true;
      navOpen = false;

      this._createToggle();
      this._transitions();
      this._resize();

      addEvent(window, "resize", this, false);
      addEvent(document.body, "touchmove", this, false);
      addEvent(navToggle, "touchstart", this, false);
      addEvent(navToggle, "touchend", this, false);
      addEvent(navToggle, "mouseup", this, false);
      addEvent(navToggle, "keyup", this, false);
      addEvent(navToggle, "click", this, false);

      // Init callback
      opts.init();
    },

    _createStyles: function () {
      if (!styleElement.parentNode) {
        document.getElementsByTagName("head")[0].appendChild(styleElement);
      }
    },

    _removeStyles: function () {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    },

    _createToggle: function () {
      if (!opts.customToggle) {
        var toggle = document.createElement("a");
        toggle.innerHTML = opts.label;
        setAttributes(toggle, {
          "href": "#",
          "id": "nav-toggle"
        });

        if (opts.insert === "after") {
          nav.parentNode.insertBefore(toggle, nav.nextSibling);
        } else {
          nav.parentNode.insertBefore(toggle, nav);
        }

        navToggle = document.getElementById("nav-toggle");
      } else {
        var toggleEl = opts.customToggle.replace("#", "");

        if (document.getElementById(toggleEl)) {
          navToggle = document.getElementById(toggleEl);
        } else {
          throw new Error("The custom nav toggle you are trying to select doesn't exist");
        }
      }
    },

    _preventDefault: function(e) {
      if (e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        e.returnValue = false;
      }
    },

    _onTouchStart: function (e) {
      e.stopPropagation();
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.touchHasMoved = false;
      removeEvent(navToggle, "mouseup", this, false);
    },

    _onTouchMove: function (e) {
      if (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
      Math.abs(e.touches[0].clientY - this.startY) > 10) {
        this.touchHasMoved = true;
      }
    },

    _onTouchEnd: function (e) {
      this._preventDefault(e);
      if (!this.touchHasMoved) {
        if (e.type === "touchend") {
          this.toggle(e);
          // Prevent click on the underlying menu on Android 2.3
          var that = this;
          nav.addEventListener("click", that._preventDefault, true);
          setTimeout(function () {
            nav.removeEventListener("click", that._preventDefault, true);
          }, opts.transition + 100);
          return;
        } else {
          var evt = e || window.event;
          // If it isn't a right click
          if (!(evt.which === 3 || evt.button === 2)) {
            this.toggle(e);
          }
        }
      }
    },

    _onKeyUp: function (e) {
      var evt = e || window.event;
      if (evt.keyCode === 13) {
        this.toggle(e);
      }
    },

    _transitions: function () {
      if (opts.animate) {
        var objStyle = nav.style,
          transition = "max-height " + opts.transition + "ms";

        objStyle.WebkitTransition = transition;
        objStyle.MozTransition = transition;
        objStyle.OTransition = transition;
        objStyle.transition = transition;
      }
    },

    _calcHeight: function () {
      var savedHeight = 0;
      for (var i = 0; i < nav.inner.length; i++) {
        savedHeight += nav.inner[i].offsetHeight;
      }

      var innerStyles = "#" + this.wrapperEl + ".opened{max-height:" + savedHeight + "px}";

      // Hide from old IE
      if (computed) {
        styleElement.innerHTML = innerStyles;
        innerStyles = "";
      }
    },

    _resize: function () {
      if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {
        setAttributes(navToggle, {"aria-hidden": "false"});

        // If the navigation is hidden
        if (nav.className.match(/(^|\s)closed(\s|$)/)) {
          setAttributes(nav, {"aria-hidden": "true"});
          nav.style.position = "absolute";
        }

        this._createStyles();
        this._calcHeight();
      } else {
        setAttributes(navToggle, {"aria-hidden": "true"});
        setAttributes(nav, {"aria-hidden": "false"});
        nav.style.position = opts.openPos;
        this._removeStyles();
      }
    }

  };

  var _instance;
  function rn (el, options) {
    if (!_instance) {
      _instance = new ResponsiveNav(el, options);
    }
    return _instance;
  }

  return rn;
})(window, document);
/*!
 * Retina.js v1.3.0
 *
 * Copyright 2014 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */


(function() {
    var root = (typeof exports === 'undefined' ? window : exports);
    var config = {
        // An option to choose a suffix for 2x images
        retinaImageSuffix : '@2x',

        // Ensure Content-Type is an image before trying to load @2x image
        // https://github.com/imulus/retinajs/pull/45)
        check_mime_type: true,

        // Resize high-resolution images to original image's pixel dimensions
        // https://github.com/imulus/retinajs/issues/8
        force_original_dimensions: true
    };

    function Retina() {}

    root.Retina = Retina;

    Retina.configure = function(options) {
        if (options === null) {
            options = {};
        }

        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                config[prop] = options[prop];
            }
        }
    };

    Retina.init = function(context) {
        if (context === null) {
            context = root;
        }

        var existing_onload = context.onload || function(){};

        context.onload = function() {
            var images = document.getElementsByTagName('img'), retinaImages = [], i, image;
            for (i = 0; i < images.length; i += 1) {
                image = images[i];
                if (!!!image.getAttributeNode('data-no-retina')) {
                    retinaImages.push(new RetinaImage(image));
                }
            }
            existing_onload();
        };
    };

    Retina.isRetina = function(){
        var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

        if (root.devicePixelRatio > 1) {
            return true;
        }

        if (root.matchMedia && root.matchMedia(mediaQuery).matches) {
            return true;
        }

        return false;
    };


    var regexMatch = /\.\w+$/;
    function suffixReplace (match) {
        return config.retinaImageSuffix + match;
    }

    function RetinaImagePath(path, at_2x_path) {
        this.path = path || '';
        if (typeof at_2x_path !== 'undefined' && at_2x_path !== null) {
            this.at_2x_path = at_2x_path;
            this.perform_check = false;
        } else {
            if (undefined !== document.createElement) {
                var locationObject = document.createElement('a');
                locationObject.href = this.path;
                locationObject.pathname = locationObject.pathname.replace(regexMatch, suffixReplace);
                this.at_2x_path = locationObject.href;
            } else {
                var parts = this.path.split('?');
                parts[0] = parts[0].replace(regexMatch, suffixReplace);
                this.at_2x_path = parts.join('?');
            }
            this.perform_check = true;
        }
    }

    root.RetinaImagePath = RetinaImagePath;

    RetinaImagePath.confirmed_paths = [];

    RetinaImagePath.prototype.is_external = function() {
        return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) );
    };

    RetinaImagePath.prototype.check_2x_variant = function(callback) {
        var http, that = this;
        if (this.is_external()) {
            return callback(false);
        } else if (!this.perform_check && typeof this.at_2x_path !== 'undefined' && this.at_2x_path !== null) {
            return callback(true);
        } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
            return callback(true);
        } else {
            http = new XMLHttpRequest();
            http.open('HEAD', this.at_2x_path);
            http.onreadystatechange = function() {
                if (http.readyState !== 4) {
                    return callback(false);
                }

                if (http.status >= 200 && http.status <= 399) {
                    if (config.check_mime_type) {
                        var type = http.getResponseHeader('Content-Type');
                        if (type === null || !type.match(/^image/i)) {
                            return callback(false);
                        }
                    }

                    RetinaImagePath.confirmed_paths.push(that.at_2x_path);
                    return callback(true);
                } else {
                    return callback(false);
                }
            };
            http.send();
        }
    };


    function RetinaImage(el) {
        this.el = el;
        this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
        var that = this;
        this.path.check_2x_variant(function(hasVariant) {
            if (hasVariant) {
                that.swap();
            }
        });
    }

    root.RetinaImage = RetinaImage;

    RetinaImage.prototype.swap = function(path) {
        if (typeof path === 'undefined') {
            path = this.path.at_2x_path;
        }

        var that = this;
        function load() {
            if (! that.el.complete) {
                setTimeout(load, 5);
            } else {
                if (config.force_original_dimensions) {
                    that.el.setAttribute('width', that.el.offsetWidth);
                    that.el.setAttribute('height', that.el.offsetHeight);
                }

                that.el.setAttribute('src', path);
            }
        }
        load();
    };


    if (Retina.isRetina()) {
        Retina.init(root);
    }
})();
jQuery.noConflict();
jQuery(document).ready(function($){

	"use strict";

	/*Pace.on("done", function(){
		$(".loader-wrapper").fadeOut(500);
		$(".pace").remove();
	});*/

	/* Sticky Header */
	$("#header-wrapper").sticky({ topSpacing: 0 });

	/* One page navigation */
	$('.header-mean-wrapper #main-menu').onePageNav({
		currentClass : 'current_page_item',
		filter		 : ':not(.external)',
		scrollSpeed  : 750,
		scrollOffset : 80
	});

	/* Mean Menu for Mobile */
	$('.header-mean-wrapper #main-menu').meanmenu({
		meanMenuContainer :  $('#menu-container'),
		meanRevealPosition:  'right',
		meanScreenWidth   :  767
	});

	var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i)) ? true : false;
	var $px, currentWidth;


	/*Menu */
	megaMenu();
	function megaMenu() {
		var screenWidth = $(document).width(),
		containerWidth = $(".header .container").width(),
		containerMinuScreen = (screenWidth - containerWidth)/2;
		if( containerWidth == screenWidth ){

			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){

				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();

				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > screenWidth ){
					var SwMinuOffset = screenWidth - ParentLeftPosition;
					var marginFromLeft = MegaMenuChildContainerWidth - SwMinuOffset;
					var marginFromLeftActual = (marginFromLeft) + 25;
					var marginLeftFromScreen = "-"+marginFromLeftActual+"px";
					$(this).css('left',marginLeftFromScreen);
				}

			});
		} else {

			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){
				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();

				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > containerWidth ){
					var marginFromLeft = ( ParentLeftPosition + MegaMenuChildContainerWidth ) - screenWidth;
					var marginLeftFromContainer = containerMinuScreen + marginFromLeft + 20;

					if( MegaMenuChildContainerWidth > containerWidth ){
						var MegaMinuContainer	= ( (MegaMenuChildContainerWidth - containerWidth)/2 ) + 10;
						var marginLeftFromContainerVal = marginLeftFromContainer - MegaMinuContainer;
						marginLeftFromContainerVal = "-"+marginLeftFromContainerVal+"px";
						$(this).css('left',marginLeftFromContainerVal);
					} else {
						marginLeftFromContainer = "-"+marginLeftFromContainer+"px";
						$(this).css('left',marginLeftFromContainer);
					}
				}

			});
		}
	}

	//Menu Hover Start
	function menuHover() {
		$("li.menu-item-depth-0,li.menu-item-simple-parent ul li" ).hover(function(){
			//mouseover
			if( $(this).find(".megamenu-child-container").length  ){
				$(this).find(".megamenu-child-container").stop().fadeIn('fast');
			} else {
				$(this).find("> ul.sub-menu").stop().fadeIn('fast');
			}

		},function(){
			//mouseout
			if( $(this).find(".megamenu-child-container").length ){
				$(this).find(".megamenu-child-container").stop(true, true).hide();
			} else {
				$(this).find('> ul.sub-menu').stop(true, true).hide();
			}
		});

	}

	//Mobile Menu
	$("#dt-menu-toggle").click(function( event ){
		event.preventDefault();
		var $menu;
		$menu = $("nav#main-menu").find("ul.menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
	});

	$(".dt-menu-expand").click(function(event){
		if( $(this).hasClass("dt-mean-clicked") ){
			$(this).text("+");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideUp(400);
			} else {
				$(this).prev('.megamenu-child-container').find('ul:first').slideUp(600);
			}
		} else {
			$(this).text("-");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideDown(400);
			} else{
				$(this).prev('.megamenu-child-container').find('ul:first').slideDown(2000);
			}
		}

		$(this).toggleClass("dt-mean-clicked");
		return false;
	});

	//Mobile Menu End

	//Smart Resize Start
	$(window).smartresize(function(){
		megaMenu();
		/* Blog Template Isotope */
		if( $(".apply-isotope").length ){
			$(".apply-isotope").each(function(){
				$(this).isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: 25} });
			});
		}

		if( !isMobile ){
			currentWidth = window.innerWidth || document.documentElement.clientWidth;
			if( currentWidth > 767 ){
				menuHover();
			}
		}
	});

	/* Goto Top */
	$().UItoTop({ easingType: 'easeOutQuart' });

	/* Parallax Section */
	$('.parallax').each(function(){
		$(this).bind('inview', function (event, visible) {
			if(visible == true) {
				$(this).parallax("50%", 0.3);
			} else {
				$(this).css('background-position','');
			}
		});
	});

	/* PrettyPhoto For Portfolio */
	if($(".portfolio").length) {
		$(".portfolio a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: false,social_tools: false,deeplinking:false});
	}


	//Window Load Start
	$(window).load(function(){
		/* Template Isotope */
		if( $(".apply-isotope").length ){
			$(".apply-isotope").each(function(){
				$(this).isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: 25} });
			});
		}
		//Portfolio isotope
		var $container = $('.portfolio-container');
		if( $container.length) {

			var $width = $container.hasClass("no-space") ? 0 : 20;

			$(window).smartresize(function(){
				$container.css({overflow:'hidden'}).isotope({itemSelector : '.column',masonry: { gutterWidth: $width } });
			});

			$container.isotope({
			  filter: '*',
			  masonry: { gutterWidth: $width },
			  animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
		}

		if($("div.sorting-container").length){
			$("div.sorting-container a").click(function(){
				var $width = $container.hasClass("no-space") ? 0 : 20;
				$("div.sorting-container a").removeClass("active-sort");
				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");
				$container.isotope({
					filter: selector,
					masonry: { gutterWidth: $width },
					animationOptions: { duration:750, easing: 'linear',  queue: false }
				});
			return false;
			});
		}
		//Portfolio isotope End
	});	//Window Load End

	//Donutchart
  	jQuery(".dt-sc-donutchart").each(function(){
		var $this = jQuery(this);
	 	var $bgColor =  ( $this.data("bgcolor") !== undefined ) ? $this.data("bgcolor") : "#f5f5f5";
	 	var $fgColor =  ( $this.data("fgcolor") !== undefined ) ? $this.data("fgcolor") : "#000000";
	 	var $size = ( $this.data("size") !== undefined ) ? $this.data("size") : "120";

	 	$this.donutchart({'size': $size, 'fgColor': $fgColor, 'bgColor': $bgColor , 'donutwidth' : 10 });
	 	$this.donutchart('animate');
	});//Donutchart Shortcode Ends

	/* Progress Bar */
	 animateSkillBars();
	 animateSection();
	 $(window).scroll(function(){
		animateSkillBars();
		animateSection();
	 });

	 function animateSection(){
		 var applyViewPort = ( jQuery("html").hasClass('csstransforms') ) ? ":in-viewport" : "";
		 jQuery('.animate'+applyViewPort).each(function(){
			var $this = jQuery(this),
				$animation = ( $this.data("animation") !== undefined ) ? $this.data("animation") : "slideUp";
			var	$delay = ( $this.data("delay") !== undefined ) ? $this.data("delay") : 300;

			if( !$this.hasClass($animation) ){
				setTimeout(function() { $this.addClass($animation);	},$delay);
			}
		 });
	 }

	 function animateSkillBars(){
		 var applyViewPort = ( jQuery("html").hasClass('csstransforms') ) ? ":in-viewport" : "";
		 jQuery('.dt-sc-progress'+applyViewPort).each(function(){
			 var progressBar = jQuery(this),
				 progressValue = progressBar.find('.dt-sc-bar').attr('data-value');

				 if (!progressBar.hasClass('animated')) {
						progressBar.addClass('animated');
						progressBar.find('.dt-sc-bar').animate({width: progressValue + "%"},600,function(){ progressBar.find('.dt-sc-bar-text').fadeIn(400); });
				 }
		 });
	}/* Progress Bar End */

	//Window Load Start
	$(window).load(function(){
		//*Testimonial Carousel*/
		if( jQuery('.dt-sc-testimonial-carousel').length ) {
			jQuery('.dt-sc-testimonial-carousel').each(function(){
				var column = jQuery(this).data('column');
				if(column != '') column = column; else column = 1;
				jQuery(this).carouFredSel({
					responsive:true,
					auto:true,
					width:'100%',
					prev:'.testimonial-prev',
					next:'.testimonial-next',
					pagination:jQuery(this).parents(".dt-sc-testimonial-wrapper.type2").find(".pager"),
					scroll:1,
					items:{visible: {min: column}, height: 'variable'}
				});
			});
		}/*Testimonial Carousel End*/

		//*Testimonial Carousel*/
		if( jQuery('.dt-sc-partner-carousel').length ) {
			jQuery('.dt-sc-partner-carousel').each(function(){
				jQuery(this).carouFredSel({
					responsive:true,
					auto:true,
					width:'100%',
					height: 'variable',
					prev: 'prev',
					next: 'next',
					scroll:1,
					items:{visible: {min: 1, max: 4}, height: 'variable'}
				});
			});
		} //*Testimonial Carousel End*/

		// Team Carousel
		if( jQuery('.dt-sc-team-carousel').length) {
			jQuery('.dt-sc-team-carousel').each(function(){
				  var pagger = jQuery(this).parents(".dt-sc-team-carousel-wrapper").find("div.carousel-arrows"),
					  next = pagger.find("a.next"),
					  prev = pagger.find("a.prev");

				jQuery(this).carouFredSel({
					  responsive:true,
					  auto:false,
					  width:'100%',
					  height: 'variable',
					  scroll:1,
					  items:{
						height: 'variable',
						visible: {min: 1,max: 3}
					  },
					  pagination:jQuery(this).parents(".dt-sc-team-carousel-wrapper.type2").find(".pager"),
					  prev:prev,
					  next:next
				});

			});
		}

		//*Product Carousel*/
		if(jQuery('.feature-product-carousel').length) {
			jQuery('.feature-product-carousel').carouFredSel({
				responsive: true,
				auto: false,
				width: '100%',
				height: 'variable',
				prev: '.prev',
				next: '.next',
				scroll: 1,
				items: {
				width: $(this).find('.column').width(),
				height: 'variable',
				visible: {
				  min: 1,
				  max: 4 }
				}
			});
		} /*Product Carousel End*/

		//*Events Carousel*/
		if(jQuery('.events-carousel').length) {
			jQuery('.events-carousel').carouFredSel({
				responsive: true,
				auto: false,
				width: '100%',
				height: 'variable',
				prev: '.event-prev',
				next: '.event-next',
				scroll: 1,
				items: {
				width: $(this).find('.column').width(),
				height: 'variable',
				visible: {
				  min: 1,
				  max: 4 }
				}
			});
		} /*Events Carousel End*/

		//*Events Carousel*/
		if(jQuery('.portfolio-carousel').length) {
			jQuery('.portfolio-carousel').carouFredSel({
				responsive: true,
				auto: false,
				width: '100%',
				height: 'variable',
				prev: '.portfolio-prev',
				next: '.portfolio-next',
				scroll: 1,
				items: {
				width: $(this).find('.column.no-space').width(),
				height: 'variable',
				visible: {
				  min: 1,
				  max: 3 }
				}
			});
		} /*Events Carousel End*/

		//Reviews Carousel...
		if($(".reviews-carousel-wrapper").length) {
		  $('.reviews-carousel-wrapper').carouFredSel({
			responsive: true,
			width: '100%',
			scroll: {
				fx: "crossfade"
			},
			auto: {
				pauseDuration: 5000,
			},
			items: {
				height: 'variable',
				visible: {
					min: 1,
					max: 1
				}
			}
		  });
		}



		//SLIDING BANNER...
		if(jQuery('.slider-wrapper').length) {
			jQuery('.slider-wrapper').each(function(){
				var $this = jQuery(this).find('.main-slider');
				$this.carouFredSel({
					responsive: true,
					auto: false,
					width: '100%',
					height: 'auto',
					scroll: {
						fx: "crossfade",
						duration: 800
					},
					items: { width: $this.find("div.column").width(),  visible: { min: 1, max: 1 } },
					pagination: {
						container: ".slide-controls",
						anchorBuilder: false
					}
				});
			});
		}
	});


	//Google Map
	if( $('#map').length ) {
		$("#map").gMap({
			controls: false,
			scrollwheel: false,
			markers: [{
					  address : 'No: 58 A, East Madison St, Baltimore, MD, USA',
					  html: 'No: 58 A, East Madison St, Baltimore, MD, USA',
					  icon: {
							image: "js/images/mapicon.png",
							iconsize: [45, 41],
						}
					}],
			zoom: 16
		});
	}

	//Accordion & Toggle
	$('.dt-sc-toggle').toggle(function(){ $(this).addClass('active'); },function(){ $(this).removeClass('active'); });
	$('.dt-sc-toggle').click(function(){ $(this).next('.dt-sc-toggle-content').slideToggle(); });

	$('.dt-sc-toggle-frame-set').each(function(){
		var $this = $(this),
		    $toggle = $this.find('.dt-sc-toggle-accordion');

			$toggle.click(function(){
				if( $(this).next().is(':hidden') ) {
					$this.find('.dt-sc-toggle-accordion').removeClass('active').next().slideUp();
					$(this).toggleClass('active').next().slideDown();
				}
				return false;
			});

			//Activate First Item always
			$this.find('.dt-sc-toggle-accordion:first').addClass("active");
			$this.find('.dt-sc-toggle-accordion:first').next().slideDown();
  	});//Accordion & Toggle

	// Tabs Shortcodes
	if ($("ul.dt-sc-tabs").length > 0) {
		$("ul.dt-sc-tabs").tabs("> .dt-sc-tabs-content")
	}
	if ($("ul.dt-sc-tabs-frame").length > 0) {
		$("ul.dt-sc-tabs-frame").tabs("> .dt-sc-tabs-frame-content")
	}
	if ($(".dt-sc-tabs-vertical-frame").length > 0) {
		$(".dt-sc-tabs-vertical-frame").tabs("> .dt-sc-tabs-vertical-frame-content");
		$(".dt-sc-tabs-vertical-frame").each(function() {
			$(this).find("li:first").addClass("first").addClass("current");
			$(this).find("li:last").addClass("last")
		});
		$(".dt-sc-tabs-vertical-frame li").click(function() {
			$(this).parent().children().removeClass("current");
			$(this).addClass("current")
		})
	} /*Tabs Shortcodes Ends*/

	//Recent gallery slider
	if( $(".recent-gallery").find("li").length > 1 ) {
		$(".recent-gallery").bxSlider({ auto:false, useCSS:false, pagerCustom: '#bx-pager', autoHover:true, adaptiveHeight:true });
	} /*Recent gallery slider

	/*Tooltip*/
	 if(jQuery(".dt-sc-tooltip-bottom").length){
		jQuery(".dt-sc-tooltip-bottom").each(function(){ jQuery(this).tipTip({maxWidth: "auto"}); });
	 }

	 if(jQuery(".dt-sc-tooltip-top").length){
		jQuery(".dt-sc-tooltip-top").each(function(){ jQuery(this).tipTip({maxWidth: "auto",defaultPosition: "top"}); });
	 }

	 if(jQuery(".dt-sc-tooltip-left").length){
		jQuery(".dt-sc-tooltip-left").each(function(){ jQuery(this).tipTip({maxWidth: "auto",defaultPosition: "left"}); });
	 }

	 if(jQuery(".dt-sc-tooltip-right").length){
		jQuery(".dt-sc-tooltip-right").each(function(){ jQuery(this).tipTip({maxWidth: "auto",defaultPosition: "right"}); });
	 }/*Tooltip End*/

	 // animate css + jquery inview configuration
	 $(".animate").each(function () {
		$(this).bind('inview', function (event, visible) {
			var $delay = "";
			var $this = $(this),
				$animation = ($this.data("animation") !== undefined) ? $this.data("animation") : "slideUp";
			$delay = ($this.data("delay") !== undefined) ? $this.data("delay") : 300;

			if (visible === true) {
				   setTimeout(function () { $this.addClass($animation); }, $delay);
		   } else {
				   setTimeout(function() { $this.removeClass('animate'); } );
		   }
		});
	});

	if($().validate) {

		//AJAX CONTACT FORM...
		$('form[name="frmcontact"]').submit(function () {
			var This = $(this);
			if($(This).valid()) {
				var action = $(This).attr('action');
				var data_value = unescape($(This).serialize());
				$.ajax({
					 type: "POST",
					 url:action,
					 data: data_value,
					 error: function (xhr, status, error) {
						 confirm('The page save failed.');
					   },
					  success: function (response) {
						$('#ajax_contact_msg').html(response);
						$('#ajax_contact_msg').slideDown('slow');
					 }
				});
			}
			return false;
		});

		$('form[name="frmcontact"]').validate({
			rules: {
				txtname: { required: true },
				txtemail: { required: true, email: true },
				txtmessage: { required: true }
			},
			errorPlacement: function(error, element) { }
		});

		$('form[name="frmRegister"]').validate({
			rules: {
				f_user: { required: true },
				email: { required: true, email: true },
				pwd: { required: true },
				c_pwd: { required: true }
			},
			errorPlacement: function(error, element) { }
		});

		$('form[name="frmLogin"]').validate({
			rules: {
				user: { required: true },
				pwd: { required: true },
			},
			errorPlacement: function(error, element) { }
		});

		//AJAX SUBSCRIBE FORM...
		$('form[name="frmNewsletter"]').submit(function () {
			var This = $(this);
			if($(This).valid()) {
				var action = $(This).attr('action');
				var data_value = unescape($(This).serialize());
				$.ajax({
					 type: "POST",
					 url:action,
					 data: data_value,
					 error: function (xhr, status, error) {
						 confirm('The page save failed.');
					   },
					  success: function (response) {
						$('#ajax_newsletter_msg').html(response);
						$('#ajax_newsletter_msg').slideDown('slow');
						if (response.match('success') != null) $(This).slideUp('slow');
					 }
				});
			}
			return false;
		});

		$('form[name="frmNewsletter"]').validate({
			rules: {
				email: { required: true, email: true }
			},
			errorPlacement: function(error, element) { }
		});

		if($('form[name="frmNewsletterContent"]').length) {
			$('form[name="frmNewsletterContent"]').submit(function () {
				var This = $(this);
				if($(This).valid()) {
					var action = $(This).attr('action');
					var data_value = unescape($(This).serialize());
					$.ajax({
						 type: "POST",
						 url:action,
						 data: data_value,
						 error: function (xhr, status, error) {
							 confirm('The page save failed.');
						   },
						  success: function (response) {
							$('#ajax_newsletter_msg_content').html(response);
							$('#ajax_newsletter_msg_content').slideDown('slow');
							if (response.match('success') != null) $(This).slideUp('slow');
						 }
					});
				}
				return false;
			});

			$('form[name="frmNewsletterContent"]').validate({
				rules: {
					email: { required: true, email: true }
				},
				errorPlacement: function(error, element) { }
			});
		}

	}

	var j = 1;
	$('.blog-load-more').click(function(e){

		if(j == 3) {
			$('.blog-load-more').text('No more posts to load!').css({"cursor":"default"});
		} else {

			$.ajax({
				type: "POST",
				url: "contents/blog-content-"+j+".html",
				dataType: "html",
				cache: false,
				msg : '',
				beforeSend: function(){
					$('.blog-load-more').html('Loading...');
				},
				success: function(msg){
					$('.blog-items').append(msg);
					$('.blog-items').isotope( 'reloadItems' ).isotope();
				},
				complete: function(){
					if(j == 2) {
						$('.blog-load-more').text('No more posts to load!').css({"cursor":"default"});
					} else {
						$('.blog-load-more').text('Load More').css({"cursor":"pointer"});
					}
					j++;
				}
			});

		}
		e.preventDefault();

	});

	var j = 1;
	$('.portfolio-load-more').click(function(e){

		var column = 'four';
		if($('.portfolio-container').find('.portfolio').hasClass('dt-sc-one-fourth')) column = 'four';
		else if($('.portfolio-container').find('.portfolio').hasClass('dt-sc-one-third')) column = 'three';
		else if($('.portfolio-container').find('.portfolio').hasClass('dt-sc-one-half')) column = 'two';
		else if($('.portfolio-container').find('.portfolio').hasClass('dt-sc-one-column')) column = 'one';

		if(j == 3) {
			$('.portfolio-load-more').text('No more posts to load!').css({"cursor":"default"});
		} else {

			$.ajax({
				type: "POST",
				url: "contents/portfolio-content-"+column+"-"+j+".html",
				dataType: "html",
				cache: false,
				msg : '',
				beforeSend: function(){
					$('.portfolio-load-more').html('Loading...');
				},
				success: function(msg){
					$('.portfolio-container').append(msg);
					$('.portfolio-container').isotope( 'reloadItems' ).isotope();
				},
				complete: function(){
					if(j == 2) {
						$('.portfolio-load-more').text('No more posts to load!').css({"cursor":"default"});
					} else {
						$('.portfolio-load-more').text('Load More').css({"cursor":"pointer"});
					}
					j++;
				}
			});

		}
		e.preventDefault();

	});

	$('.plus').click(function(e){
		e.preventDefault();
		var currentVal = parseInt($(this).parents('.quantity').find('input[name="quantity"]').val());
		if (!isNaN(currentVal)) {
			$(this).parents('.quantity').find('input[name="quantity"]').val(currentVal + 1);
		} else {
			$(this).parents('.quantity').find('input[name="quantity"]').val(0);
		}
	});

	$(".minus").click(function(e) {
		e.preventDefault();
		var currentVal = parseInt($(this).parents('.quantity').find('input[name="quantity"]').val());
		if (!isNaN(currentVal) && currentVal > 0) {
			$(this).parents('.quantity').find('input[name="quantity"]').val(currentVal - 1);
		} else {
			$(this).parents('.quantity').find('input[name="quantity"]').val(0);
		}
	});

	if($( "#priceslider" ).length) {
		$( "#priceslider" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 75, 300 ],
			slide: function( event, ui ) {
				$( "#priceslider-from" ).html( "$" + ui.values[ 0 ] + ".00" );
				$( "#priceslider-to" ).html( "$" + ui.values[ 1 ] + ".00" );
			}
		});
	}

	if($(".show-box").length) {
		$(".show-box").click( function() {
			if($(this).parent().find('.search-form-box').hasClass('hidden'))
				$(this).parent().find('.search-form-box').removeClass('hidden');
			else
				$(this).parent().find('.search-form-box').addClass('hidden');
		});
	}

	$(document).click(function(ev){

		var myID = ev.target.id,
			myClass = ev.target.className;

		if((myClass !='fa fa-search' ) && (myClass !='show-box' ) && myID !='search-box'){
			$( '.search-form-box' ).addClass('hidden');
		}

	});

	//ANIMATE NUMBER...
	$('.dt-sc-num-count').each(function(){
	  $(this).one('inview', function (event, visible) {
		  if(visible === true) {
			  var val = $(this).attr('data-value');
			  $(this).animateNumber({ number: val	}, 2000);
		  }
	  });
	});

	/* Reservation Popup */
	$("a[data-gal^='prettyPhoto[reservation]']").prettyPhoto({
		overlay_gallery: false,
		social_tools: false,
		deeplinking: false,
		default_width: 800,
	});

	//BMI Form Validation...
	$('form[name="frmbmi"]').validate({
		rules: {
			txtfeet: { required: true },
			txtinches: { required: true },
			txtlbs: { required: true }
		},
		errorPlacement: function(error, element) { }
	});

	//BMI Calculation...
	$('form[name="frmbmi"]').submit(function(){
		var This = $(this);
		if($(This).valid()) {
			var fet = $('input[name="txtfeet"]').val();
			var inc = $('input[name="txtinches"]').val();
			var tinc = ( parseInt(fet) * 12 ) + parseInt(inc);

			var lbs = $('input[name="txtlbs"]').val();

			var bmi = ( parseFloat(lbs) / (tinc * tinc) ) * 703;

			$('input[name="txtbmi"]').val(parseFloat(bmi).toFixed(1));
		}
		return false;
	});

	//BMI View...
	if($("a.fancyInline").length) {
		$("a.fancyInline").fancybox({
			scrolling: 'no',
			width: 'auto',
			height: 'auto'
		});
	}

});

	//MeanMenu Custom Scroll...
	function funtoScroll(x, e) {
		"use strict";
		var str = new String(e.target);
		var pos = str.indexOf('#');
		var t = str.substr(pos);

		var eleclass = jQuery(e.target).prop("class");

		if(eleclass == "external") {
			window.location.href = e.target;
		} else {
			jQuery.scrollTo(t, 750, { offset: { top: -53 }});
		}

		jQuery(x).parent('.mean-bar').next('.mean-push').remove();
		jQuery(x).parent('.mean-bar').remove();

		jQuery('nav#main-menu').meanmenu({
			meanMenuContainer :  jQuery('#menu-container'),
			meanRevealPosition:  'right',
			meanScreenWidth   :  767
		});

		e.preventDefault();
	}(jQuery);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//


;
