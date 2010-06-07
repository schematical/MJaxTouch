var MJaxTouch = {
    arrControls:new Array(),
    MJaxSettings:{
        BackSelector:'.MJaxTouchBackBtn',
        FormSelector:'.MJaxTouchForm',
        FormEventSelector:'#event',
        FormEventTypeSelector:'#event_type',
        FormControlIdSelector:'#control_id',
        FormStateSelector:'#MJaxTouchPage__FormState',
        FormActiveScreenSelector:'#active_screen'
    },
    MJaxEvents:{
        FormSubmit:'form_submit',
        PageChange:'page_change',
        LoadScreen:'load_screen',
        ControlEvent:'control_event'
        
    },
    Init:function(){
        $("body").unbind('submit').unbind('touchstart').unbind('click');//.submit(MJaxTouch.FormSubmit);
        $(MJaxTouch.MJaxSettings.FormSelector).live('submit', MJaxTouch.FormSubmit);
        $(MJaxTouch.MJaxSettings.BackSelector).tap(MJaxTouch.GoBack);
    },
    FormEvent:function(strValue){
        if(strValue == undefined){
            return $(MJaxTouch.MJaxSettings.FormEventSelector).attr('value');
        }else{
            $(MJaxTouch.MJaxSettings.FormEventSelector).attr('value', strValue);
            return true;
        }
    },
    FormEventType:function(strValue){
         var jEventType = $(MJaxTouch.MJaxSettings.FormEventTypeSelector);
         if(jEventType.length == 0){
            var nodeEventType = document.createElement('input');
            jEventType = $(nodeEventType);
            jEventType.attr('id', MJaxTouch.MJaxSettings.FormEventTypeSelector.replace("#", ''));
            jEventType.attr('name', MJaxTouch.MJaxSettings.FormEventTypeSelector.replace("#", ''));
            jEventType.attr('type', 'hidden');
            jEventType.attr('value', null);
            $("#" + MJaxTouch.FormActiveScreen()).append(jEventType);
            
         }
        if(strValue == undefined){
            return jEventType.attr('value');
        }else{
            jEventType.attr('value', strValue);
            return true;
        }
    },
    FormControlId:function(strValue){
        if(strValue == undefined){
            return $(MJaxTouch.MJaxSettings.FormControlIdSelector).attr('value');
        }else{
            
            $(MJaxTouch.MJaxSettings.FormControlIdSelector).attr('value', strValue);
            return true;
        }
    },
    FormState:function(strValue){
        if(strValue == undefined){
            return $(MJaxTouch.MJaxSettings.FormStateSelector).attr('value');
        }else{
            $(MJaxTouch.MJaxSettings.FormStateSelector).attr('value', strValue);
            return true;
        }
    },
    FormActiveScreen:function(strValue){
        if(strValue == undefined){
            return $(MJaxTouch.MJaxSettings.FormActiveScreenSelector).attr('value');
        }else{
            //document.location.hash = strValue;
            $(MJaxTouch.MJaxSettings.FormActiveScreenSelector).attr('value', strValue);
            return true;
        }
    },
    LoadScreen:function(strScreen){
        var strActiveScreen = this.FormActiveScreen();
        if(strScreen != undefined){ 
            this.FormActiveScreen(strScreen);
        }
        this.FormEvent(MJaxTouch.MJaxEvents.LoadScreen);
        var evt = jQuery.Event("submit");
        evt.preventDefault();
        $("#" + strActiveScreen).trigger(evt);
        return false;
    },
    TriggerControlEvent:function(objEvent, strSelector, strEventType){
        var strActiveScreen = this.FormActiveScreen();
        var jTarget = $(objEvent.target);
        this.FormEvent(MJaxTouch.MJaxEvents.ControlEvent);
        this.FormControlId(jTarget.attr('id'));
        this.FormEventType(strEventType);
        
        if(objEvent.type == 'keypress'){
            objData.keyCode = objEvent.keyCode;
        }
        var evt = jQuery.Event("submit");
        evt.preventDefault();
        $("#" + strActiveScreen).trigger(evt);
        objEvent.stopPropagation();
        //return false;
    },
    SetActivePage:function(strPage){
        
    },
    FormSubmit:function(e, callback){
        var jForm = (typeof(e)==='string') ? $(e) : $(e.target);
        var strData = jForm.serialize();
      
        
        //strData += '&' + MJaxTouch.GetFormStateString();
        
        if (jForm.length && jForm.is(MJaxTouch.MJaxSettings.FormSelector) && jForm.attr('action')) {
            var settings =  {
                data: strData,
                method: jForm.attr('method') || "POST",
                animation: null,
                callback: callback,
                $referrer: null
            };
            $.ajax({
                url: jForm.attr('action'),
                data: settings.data,
                type: settings.method,
                success: MJaxTouch.FormSubmitSuccess,
                error: function (data) {
                    if (settings.$referrer) settings.$referrer.unselect();
                    if (settings.callback) {
                        settings.callback(false);
                    }
                }
            });
        }
        e.stopPropagation();
        return true;

    },
    FormSubmitSuccess:function(data, textStatus) {
        $(MJaxTouch.MJaxSettings.FormStateSelector).remove();
        $(MJaxTouch.MJaxSettings.FormActiveScreenSelector).remove();
        var jFormState = $(data).children(MJaxTouch.MJaxSettings.FormStateSelector);
        var strFormState = jFormState.attr('value');
        jFormState.remove();
        var jActiveScreen = $(data).children(MJaxTouch.MJaxSettings.FormActiveScreenSelector);
        var strActiveScreen =  jActiveScreen.attr('value');
        jFormState.remove();


        //Remove other controls
        $(MJaxTouch.MJaxSettings.FormControlIdSelector).remove();
        $(MJaxTouch.MJaxSettings.FormEventSelector).remove();
        $(MJaxTouch.MJaxSettings.FormEventTypeSelector).remove();
        
        MJaxTouch.FormState(strFormState);
        MJaxTouch.FormActiveScreen(strActiveScreen);
        MJaxTouch.FormEvent(null);
        MJaxTouch.FormControlId(null);
        jFormState.empty();
        jActiveScreen.empty();
        var firstPage = MJaxTouch.InsertPages(data);
        if (firstPage){
            
        }
         
       
    },
    GoBack:function(objEvent){
        MJaxTouch.LoadScreen(-1);
        objEvent.stopPropagation();
    },
    GetFormStateString:function(){
        var strReturn = '';
        strReturn += 'control_id=' + MJaxTouch.FormControlId();
        strReturn += '&event=' + MJaxTouch.FormEvent();
        strReturn += '&eventType=' + MJaxTouch.FormEventType();
        strReturn += '&MJaxTouchPage__FormState=' + MJaxTouch.FormState();
        strReturn += '&active_screen=' + MJaxTouch.FormActiveScreen();
        return strReturn;
    },
    InsertPages:function(nodes) {
        var targetPage = null;
        var animation = null;
        $(nodes).each(function(index, node){
            var jNode = $(this);
            animation = jNode.attr('transition');
            $("#" + jNode.attr('id')).remove();
            jNode.appendTo($('body'));
            if (jNode.hasClass('current') || !targetPage ) {
                targetPage = jNode;
            }
            
        });
        var strGoBack =  targetPage.attr('goBack');
        var fromPage = $('#'+strGoBack);
        if ((strGoBack != 'false')&& (fromPage.length > 0)) {
            jQT.animatePages(fromPage, targetPage, animation, true);
            return targetPage;
        }else{
            jQT.goTo(targetPage, animation);
            return targetPage;
            
        }
    },
    RegisterControl:function(strControlId){
        this.arrControls[this.arrControls.length] = strControlId;
    },
    ClearRegisteredControls:function(){
        this.arrControls = new Array();
    }

    
}