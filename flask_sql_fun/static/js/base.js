
    KEY_COMMA = 110;
    KEY_ENTER = 13;
    
    rptTimerId = 0;
    
var net_options = {
  layout: { improvedLayout: false },
  physics:{ enabled:        true,
      barnesHut: {
      gravitationalConstant: -2000,
      centralGravity: 0.3,
      springLength: 95,
      springConstant: 0.04,
      damping: 0.09,
      avoidOverlap: 0
    },
    forceAtlas2Based: {
      gravitationalConstant: -50,
      centralGravity: 0.01,
      springConstant: 0.08,
      springLength: 100,
      damping: 0.4,
      avoidOverlap: 0
    },
    repulsion: {
      centralGravity: 0.2,
      springLength: 200,
      springConstant: 0.05,
      nodeDistance: 100,
      damping: 0.09
    },
    hierarchicalRepulsion: {
      centralGravity: 0.0,
      springLength: 100,
      springConstant: 0.01,
      nodeDistance: 120,
      damping: 0.09
    },
    maxVelocity: 50,
    minVelocity: 0.1,
    solver: 'barnesHut',
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 100,
      onlyDynamicEdges: false,	  
	  fit :    true
    },
    timestep: 0.5,
    adaptiveTimestep: true	
  }
}


    function ajax_msg_unbind ()  {
        $(document).unbind('ajaxStart');
        $(document).unbind('ajaxStop');         
    }    
    function ajax_msg_bind   ()  {    
        $(document).ajaxStart(function(){
            $('#message_box').window('open');            
        }).ajaxStop(function(){              
            $('#message_box').window('close');            
        });        
    }    
    function destroy_message ()  {    
	$('#message_box').window('close');
    }        
    function show_message ( message )  {
        $('#message_box').window('open');
    }
    function init_message_box ()  {
        var html = '<div id = "message_box"> </div>';
        $("#north-layout").append(html);        
        
        $('#message_box').window({
            width:          180,
            height:          70,
            modal:          true,
            title:         '',
            border:         false,
            win_position:  'center',                
            collapsible:    false,
            closable:       false,
            minimizable:    false,
            maximizable:    false,
            closed:         true
        });                    
	var win_content = '<table style="width: 100%; height: 100%;"><tr><td align=center><div id="loading"> <p><img src="/themes/gray/images/loading.gif" /> Ждите </p> </div>	</td></tr></table>';        
        $('#message_box').html ( win_content );        
    }

    function setHeight( p_add ) {
        var c = $('#main-layout');
//        c.css({'height':$(window).height()- parseInt($('body').css('padding-top'))- parseInt($('body').css('padding-bottom'))  } );
//        c.css({'height':$(window).height()});
    }		

    function win_resize ( p_window ) {	
        if ((p_window.indexOf('sf') > -1) || (p_window.indexOf('di') > -1))  {
            var win_    = o[p_window].win_index;		
            var height_ = $('#'+win_).window('options').height;
            var width_  = $('#'+win_).window('options').width;		
            $('#' + o[p_window].grid ).datagrid({
                width:  $('#'+win_).window('options').width  - 20  //18,
            });	
            var height_ = 0;
            if ( $('#' + o[p_window].grid + '_toolbar').length > 0 )   {
                height_ = $('#' + win_).window('options').height - $('#' + o[p_window].grid + '_toolbar').height() /** (0.2)*/ - 10;  // 8                  
                $('#' + o[p_window].grid ).datagrid({
                    height: height_ 
                });		                
            }
            else  {
                height_ = $('#'+win_).window('options').height - 40;
                
                $('#' + o[p_window].grid ).datagrid({
                    height: height_
                });		                                
            }
        }
    }

    function f000_btns_disable ( isDisabled )   {
	$('.l-btn'            ).linkbutton({ disabled: isDisabled });	
	$('.easyui-linkbutton').linkbutton({ disabled: isDisabled });	
	$('.easyui-menu'      ).menu      ({ disabled: isDisabled });				
    }

    function datetostr ( p_date )  {
        l_date  = p_date.getDate();	
        l_month = p_date.getMonth() + 1;
        l_year  = p_date.getFullYear(); 
        l_fdate = l_date + '.' + l_month + '.' + l_year; 		
        return l_fdate;
    }   

    function getLastDayOfMonth(year, month) {
        var date = new Date(year, month + 1, 0);
        return date.getDate();
    }

    function sysdate ()  {
        var today = new Date();        
        var dd   = today.getDate();
        var mm   = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) { dd='0'+dd; } 
        if(mm<10) { mm='0'+mm; } 

        return dd+'.'+mm+'.'+yyyy;                
    }

    function getMonday ()  {
        var mThisMonday = new Date().startOfWeek(1);        
        var dd   = mThisMonday.getDate();
        var mm   = mThisMonday.getMonth()+1; //January is 0!
        var yyyy = mThisMonday.getFullYear();
        if(dd<10) { dd='0'+dd; } 
        if(mm<10) { mm='0'+mm; } 

        return dd+'.'+mm+'.'+yyyy;                
    }

    function getNextMonday ()  {
        var mThisMonday = new Date().startOfWeek(1);            
        var v01_month = mThisMonday.getMonth()+1;        
        
        var dd   = mThisMonday.getDate();
        var mm   = mThisMonday.getMonth()+1; //January is 0!
        var yyyy = mThisMonday.getFullYear();
        if(dd<10) { dd='0'+dd; } 
        if(mm<10) { mm='0'+mm; }         
        
            mThisMonday.setDate(mThisMonday.getDate()+7);       
        var v02_month = mThisMonday.getMonth()+1;        
        
        if (v01_month === v02_month)    
            return dd+'.'+mm+'.'+yyyy;
        else 
            return getLastDayOfMonth(yyyy, mm)+'.'+mm+'.'+yyyy;            
    }

    function getNextMonday_n ()  {
        var mThisMonday = new Date().startOfWeek(1);            
            mThisMonday.setDate(mThisMonday.getDate()+7);             
        
        var dd   = mThisMonday.getDate();
        var mm   = mThisMonday.getMonth()+1; //January is 0!
        var yyyy = mThisMonday.getFullYear();
        if(dd<10) { dd='0'+dd; } 
        if(mm<10) { mm='0'+mm; }                 
        
        return dd+'.'+mm+'.'+yyyy;
    }


    function win_create ( p_params ) {  
		can_resize = 0;		 
        var params = { id:            undefined,
                       oid:           undefined,
                       root_id:       undefined,                       
                       form:          undefined,
					   form_type:     undefined,
                       grid:          undefined,                       
                       url:           undefined,
                       title:         undefined,                       
                       width:         undefined,
                       height:        undefined,                       
                       left:          undefined,
                       top:           undefined,
                       modal:         false,
        	       	   win_position: 'cascade',
                       iconCls:       undefined,
                       set_focus:     undefined,
                       win_index:     undefined,
                       func:          undefined,
                       set_field:     undefined,
                       set_value:     undefined,
                       params:        undefined,
                       sel_query:     undefined,
                       collapsible:   true,
                       closable:      true,
                       minimizable:   false,
                       maximizable:   true,
                       border:        true
                     };
        $.extend ( params, p_params );
  		o['win_ind'] = parseInt(o['win_ind']) + parseInt('1');			        
        params.win_index = 'win' + o['win_ind'];
        if (params.form !== undefined)
        {    
//            if ((params.form.substring(0,2)) == 'sf')          
			if (params.form_type == 'sf')			
                { params.win_position = 'cascade'; 
                  params.modal        =  false;
                }
            else 
                { params.win_position = 'center' 
                  params.modal        =  true;                              
                }                            
        }    
        if (params.win_position == 'cascade')  {
            // вносим открываемую форму в список открытых форм (для фиксации занятых позиций каскада - left & top)
            o["max_left"] = o["max_left"] + 32;
            o["max_top"]  = o["max_top"]  + 32;  
            params.left   = o["max_left"]; 
            params.top    = o["max_top"];        
            
            var i = 0;
            while (i < 20) {
                if (o['win_pos'][i].used_form == '')
                {    
                    o['win_pos'][i].winid     = params.win_index;
                    o['win_pos'][i].used_form = params.form;
                    params.left = o['win_pos'][i].left; 
                    params.top  = o['win_pos'][i].top;        
                    break;
                }    
				i++;
            }	                        
        }        
		
		var html = '<div id ="' + params.win_index + '">  </div>';    // якорь для окна                
		$("#site").append(html);	
		
        if (params.width  == undefined)   { params.width  = 800 }  
        if (params.height == undefined)   { params.height = 600 }        

        if (params.left == undefined)   
            params.left = 0;

        var $window = $(window);
        var wWidth  = $window.width();
        var wHeight = $window.height();        
        if (params.width > wWidth-params.left)
            { params.width = wWidth-params.left-20; }
        // create form (design)    
        if (typeof o[params.form].source == 'undefined')    {      
            // load form design from file
            $.ajax({
                url:     params.url
                ,type:   'get'
                ,success: function (data)  {                  
                    o[params.form].source = data;    
                    data = data.replace('[oid]', params.oid);       				
					o['tmp'].source = data; 
                    
                    window_create(params);
                }                
                ,error:   function (data)  {  alert( "Network AJAX Error " + data ); }
            });  
        }
        else     {                        
            // load form design from form_array
            data = o[params.form].source;               
            data = data.replace('[oid]', params.oid);
			o['tmp'].source = data;
            
            window_create(params);
        }
        
        if (params.form_type !== undefined)    {            
            if (params.form_type == 'sf')
                win_create_button ( tbSelMenuBtn, o['win_ind'], params.title );         
        }		
		
		
        $.extend(p_params, params);         
    }


    function window_create(params)   {
		
		$('#'+params.win_index).window({
			content:  	 o['tmp'].source,
            oid:         params.oid,
            title:       params.title,  
            width:       params.width,
            height:      params.height,  
            left:        params.left,                    
            top:         params.top,
            modal:       params.modal,				
            iconCls:     params.iconCls,
            closable:    params.closable,
            collapsible: params.collapsible,
            minimizable: params.minimizable,
            maximizable: params.maximizable,
            border:      params.border,            
            onClose: function() { 
               	var link_button = '#' + 'bt' + this.id;    $(link_button).closest('tr').remove();  // $(link_button).remove(); 
               	var window      = '#' +        this.id;    $(window).remove();  
				$('#win_mmenu').panel('resize',{ height: $('#navigator').height()+32 });										
            
                var i = 0;
                while (i < 20) {
                    if (o['win_pos'][i].winid == params.win_index)
                        {    
                            o['win_pos'][i].used_form = '';
                            o['win_pos'][i].winid     = 0;
                            params.left = o['win_pos'][i].left; 
                            params.top  = o['win_pos'][i].top;        
                            break;
                        }
                    i++;
                }                        
                setHeight(20);                                               
            } ,
            onMaximize: function() {
                win_resize( params.form );
            },
            onRestore: function() {
                win_resize( params.form );
            },
            onResize: function(width, height) {
                if (can_resize == 1)   {                                    
                    win_resize( params.form );
                }
            }                    
		});	
		o["win_top"] = params.win_index;		
        
        if (params.win_position == 'center')  {
            $('#'+params.win_index).window('center');  
        }    
                
        if (params.set_focus !== undefined)   {                    
            $('#'+params.set_focus).next().find('input').focus();
        }    
		
    }

    // перемещаем выбранное окно на верхний слой
    function win_to_top (win_button) {
	var sel_win = win_button.substr(2);               
	var maxZ=0;
	$('.panel').each(function(){
            if ($(this).css('zIndex') !== 'auto') {
                if($(this).css('zIndex') > maxZ)  { maxZ = $(this).css('zIndex'); }
            }
	})
	document.getElementById(sel_win).parentNode.style.zIndex = parseInt(1) + parseInt(maxZ);   
    }    
    
    // создание кнопки для окна	    
    function win_create_button ( p_btList, p_win_index, p_win_name ) {    
        var s = '<tr><td align="center"><a id="btwin' + p_win_index + '" href ="#" ></a></td></tr>';                
        $(p_btList).append(s);      
        $('#btwin' + p_win_index).linkbutton({
            height: 35,
            width: 230,
            text : p_win_name
        });        
        $('#btwin' + p_win_index).bind('click', function() { win_to_top( 'btwin' + p_win_index ) } );
        setHeight(20);        
    }
    
    // доп свойства для datagrid
    $.extend($.fn.datagrid.defaults,{ 
        classid:        0, 
        editformid:     0, 
        editformtitle: 'xxxxxxxx', 
        editformheight: 0, 
        editformwidth:  0 
    });	    
    
    
    // метод "clear" для меню
    $.extend($.fn.menu.methods,{
	clear: function(jq){
		return jq.each(function(){
			var m = $(this);
			m.children('div.menu-item,div.menu-sep').each(function(){
				m.menu('removeItem',this);
			});
		});
	}
    });		
 
 
    $.extend($.fn.datagrid.methods, {
        add: function(jq, rowIndex){
            return jq.each(function(){
console.log('$.extend($.fn.datagrid.methods, {');								
                var p_grid = $(this);
				var opts = p_grid.datagrid('options');     
                var p_classid   = opts.classid;
                var p_classname = opts.classname; 
                var p_width     = opts.editform.width;
                var p_height    = opts.editform.height;	
                var ins_params;
                var pars = "&params_in={}";                                
console.log('opts.ins_params',opts.ins_params);				
                if (opts.ins_params != undefined)
                {    
					pars = '&params_in=' + JSON.stringify(opts.ins_params);
/*                    ins_params  = opts.ins_params;
console.log('ins_params',ins_params);									
                    $.each ( ins_params, function(index, value) {
                        pars = pars + '&' + value.param + '=' + value.value;
                    });	                
*/					
                }                				
                var url_ = 'qu_exec.php?command=' + p_classname + '_ins' + pars;
console.log(url_);                				
                if (p_width  === undefined)   { p_width  = 800; }
                if (p_height === undefined)   { p_height = 600; }           
                f000_btns_disable ( true );				                        
console.log('01');                				
                $.ajax({
                    url:  url_,
                    type: 'get',
                    success: function (data)  {	
						data = JSON.parse(data);					
                        if (data.result='ok')  { 						
                            id = data.newid; 
                            p_grid.datagrid('edit', id);   
                            f000_btns_disable ( false );				
                        }
                    },
                    error:   function (data)  {	
                        f000_btns_disable ( false );				                        
                        alert( "Network AJAX Error  " + data ); 
                    }
                });                  
console.log('02');                								
            });
		},      
		edit: function(jq, rowIndex){
			return jq.each(function(){
			var opts = $(this).datagrid('options');   
        	if (rowIndex>0)   {  
                var p_oid    = rowIndex;
                f000_btns_disable ( true );						        
                var form     = opts.editform.id;
                var p_width  = opts.editform.width;
                var p_height = opts.editform.height;					
                var p_title  = opts.editform.title;
                var p_func   = undefined;
                if ( p_width  === undefined)   { p_width  = 800; }
                if ( p_height === undefined)   { p_height = 600; }   
                if (typeof o[form] == 'undefined')	{                     
                    o[form] =
                    {	
                        width:      p_width,
                        height:     p_height,
                        title:     '&nbsp;&nbsp;' + p_title,
                        form :      form,
                        func:       p_func,
                        f_onclose:  opts.editform.f_onclose, 
                        url:       'get_.php?commandid=fm&formid=' + form							
                    };
                }
                o[form].oid = p_oid;
                win_create ( o[form] );										
                f000_btns_disable ( false );                
            }									
			else   {  $.messager.alert('Сообщение','Не выбрана запись!');  }
            });
		},
		'delete': function(jq, rowIndex){
            return jq.each(function(){
console.log('try to delete');											
                var opts = $(this).datagrid('options');           
                var p_classid   = opts.classid;
                var p_classname = opts.classname;              
                var p_fload     = opts.f_load;
                var row  = $(this).datagrid('getSelected');
console.log(row);				
                f000_btns_disable ( true );				                
                if (row.id)  {                    
                    $.messager.confirm('Подтверждение', 'Удаляем запись, Вы уверены ?', function(r) {		
console.log(r);																			
                        if (r) {
							var p_pars = new Object();
								p_pars.id = row.id;
							var url_ = 'qu_exec.php?command=' + p_classname + '_del&params_in=' + JSON.stringify(p_pars);
console.log(url_);							
                            $.ajax({
								url: 	url_,
                                type:   'get',
                                success: function (data)  { 
console.log(data);	
									data = JSON.parse(data);					
									if (data.result='ok')  { 						
//										$.messager.alert('Сообщение','Успешно удалено !','info');		
										// обновление сетки
										if (p_fload !== undefined)
										{ o[p_fload](); }
										f000_btns_disable(false);				
									}							 
                                },
                                error:   function (data) { $
                                    .messager.alert('Сообщение','Ошибочка вышла !' + data,'info'); 
                                    f000_btns_disable ( false );					        
                                }								
                            }); 			                    
						}
                    });	                                        
                }		
                else {
                    $.messager.alert('Сообщение','Ошибочка вышла ! Не выбрана запись !');
                    f000_btns_disable ( false );					        
                }									
            });    
        },
		httpGetData: function(jq, p_params){
			return jq.each(function(){
				var p_grid   = $(this);
				var id       = p_params.id;
				var url      = p_params.url;                
				var f_ttl    = p_params.f_ttl; 
				var f_exec   = p_params.f_exec;
				var position = p_params.position;
				p_grid.datagrid('loadData', {"total":0,"rows":[]});                
				$.ajax({
					url:  url,
					type: 'get',
					success: function (data)  {	
						f000_btns_disable(false);
						data = JSON.parse(data);	
						p_grid.datagrid ({ data: data });                       
						
						if (position == 'first')
							p_grid.datagrid ('selectRow', 0); 
						if (position == 'last')  {
							var rows = p_grid.datagrid('getRows');           							
							p_grid.datagrid ('selectRow', rows.length-1);
						}								
                        
						if (id !== 'undefined')	{
							p_grid.datagrid ('selectRecord', id);                            
							if (f_exec !== undefined)	  { o[f_exec](); }
							if (f_ttl  !== undefined)  	  { o[f_ttl] (); }                            
						}
					},
					error:   function (data)  {	alert( data ); }
				});                                
			});    
        }   
    });    
 
    function httpCheckRpt ( p_requestid )  {      
        var url_ = 'get.jsp?commandid=check_rpt&requestid=' + p_requestid + '&';        
        $.ajax({
            url:     url_,
            type:   'get',
            success: function (data) { 
                data = data.trim();
                res  = data.indexOf("ok"); 
                if (res > -1) {                     
                    clearTimeout(rptTimerId);
                    setTimeout(function() {  
//console.log('try to check file');                        
//                        destroy_message ();
//                        ajax_msg_bind ();                                                
                        httpCheckFile ( p_requestid );                        
                    }, 
                    2500);                }
            },
            error: function (data) { console.log('httpCheckRpt : ajax error ' + data); }
        });                        
    }
 
    function httpCheckFile ( p_requestid )  {       
        var url_ = 'get.jsp?commandid=check_file&requestid=' + p_requestid + '&';                                
        $.ajax({
            url:     url_,
            type:   'get',
            success: function (data) { 
                data = data.trim();
                res = data.indexOf("ok"); 
                if (res > -1) {
                    destroy_message ();
                    ajax_msg_bind ();                                                                    
console.log('httpCheckFile done');                        
                    var location = '/get.jsp?commandid=df&requestid=' + id;	
                    window.location = location;
                    if (p_func)  { o[p_func](); }                                                                           
                }   
                else {
//                    alert ('файл видимо слишком большой, по готовности он будет выслан вам на почту.');                                    
                    httpSetFileQueue ( p_requestid );
                }
            },
            error:   function (data) { alert( w2utils.lang("Network AJAX Error") + ' ' + data ); }
        });                                
    }
 
    function httpSetFileQueue ( p_requestid )  {       
        var url_ = 'get.jsp?commandid=set_mail_queue&requestid=' + p_requestid + '&';                                
        $.ajax({
            url:     url_,
            type:   'get',
            success: function (data) { 
                data = data.trim();
                res = data.indexOf("ok"); 
                if (res > -1) {
                    destroy_message ();
                    ajax_msg_bind ();                                                                    
                    
                    alert ('файл видимо слишком большой, по готовности он будет выслан вам на почту.');                                                        
                }   
                else {
                    destroy_message ();
                    ajax_msg_bind ();                                                                    
                    
                    alert ('ошибка при постановке файла в очередь на почту.');                                    
                }
            },
            error:   function (data) { alert( w2utils.lang("Network AJAX Error") + ' ' + data ); }
        });                                
        
    }
 
    function httpGetRpt ( p_url, p_func )  {       
        // wait please
        ajax_msg_unbind ();
        show_message ( 'Ждите' );

	$.ajax({
            url:     p_url,
            type:   'get',
            success: function (data) { 
                data = data.trim();
            	res = data.indexOf("ok"); 
                if (res > -1) {
                    id = data.substr(2).trim();
                    if (id > 0) {                          
                        // начать повторы с интервалом 2 сек
                        rptTimerId = setInterval(function() {                            
                            httpCheckRpt ( id );
                        }, 
                        1000);                                
                    }
		}
            },
            error:   function (data) { alert( w2utils.lang("Network AJAX Error") + ' ' + data ); }
	});	
    }    
 
    function httpPrepRpt ( p_url, p_func )  {       
        // wait please
        ajax_msg_unbind ();
        show_message ( 'Ждите' );

	$.ajax({
            url:     p_url,
            type:   'get',
            success: function (data) { 
                data = data.trim();
            	res = data.indexOf("ok"); 
                if (res > -1) {
                    if (p_func !== undefined)   { o[p_func](); }			                    
//                    id = data.substr(2).trim();
                    destroy_message ();
                    ajax_msg_bind ();                       
		}
            },
            error:   function (data) { alert( w2utils.lang("Network AJAX Error") + ' ' + data ); }
	});	
    }    
    
    function row_delete ( p_class, p_grid )   {
	f000_btns_disable ( true );				                
	$.messager.confirm('Подтверждение', 'Удаляем запись, Вы уверены ?', function(r) {
            if (r) {
		var row = $('#'+p_grid).datagrid('getSelected');					
		if (row.id)  {
                    $.ajax({
			url:    'get.jsp?commandid=exec&method=b_'+p_class+'.web_del&id=' + row.id,
			type:   'get',
			success: function (data)  { 
                            if (data.indexOf("ok") > -1) 
                            { 																					
								// $.messager.alert('Сообщение','Успешно удалено !','info');		
								// обновление сетки
								$('#'+p_grid).datagrid('load');											
                            }	
                            f000_btns_disable ( false );					        
			},
                            error:   function (data) { $
                                .messager.alert('Сообщение','Ошибочка вышла !' + data,'info'); 
                                f000_btns_disable ( false );					        
                            }								
			}); 			
		}		
		else {
                    $.messager.alert('Сообщение','Ошибочка вышла ! Не выбран платёж !');
                    f000_btns_disable ( false );					        
		}									
            }
	});		
    }     
    function row_edit ( p_id, p_editForm, p_title, p_width, p_height, p_func )   {
	f000_btns_disable ( true );						        
	var form = p_editForm.substring(0,5);
        if (p_width  === 'undefined')   { p_width  = 800; }
        if (p_height === 'undefined')   { p_height = 600; }   
        if (typeof o[form] == 'undefined')	{                             
            o[form] =
            {	
                width:      p_width,
                height:     p_height,
                title:     '&nbsp;&nbsp;' + p_title,
                form :      form,		
                url:       'get_.php?commandid=fm&formid=' + p_editForm									
            };
        }    
        o[form].oid       = p_id;       
        o[form].f_onclose = p_func;
	win_create ( o[form] );										
	f000_btns_disable ( false );					        
    }	    
    function row_add ( p_class, p_editForm, p_title, p_width, p_height, p_func )   {        
	f000_btns_disable ( true );				        
    	var url_ = 'get.jsp?commandid=exec&method=b_' + p_class + '.web_ins';
	var id   = 0;
        if (p_width  === undefined)   { p_width  = 800; }
        if (p_height === undefined)   { p_height = 600; }           
	$.ajax({
            url:  url_,
            type: 'get',
            success: function (data)  {	
		if (data.indexOf('ok') > -1)  { 
                    id = data.replace('ok', '').trim();
                    row_edit ( id, p_editForm, p_title, p_width, p_height, p_func );
                    f000_btns_disable ( false );				
		}
            },
            error:   function (data)  {	
                    alert( "Network AJAX Error  " + data ); 
                    f000_btns_disable ( false );				
            }
	}); 
    }
    function popup_menu ( p_event, p_menu, p_row )  {		        
//console.log('popup_menu ');
//console.log('p_event ', p_event);                                
	p_event.preventDefault();				
	cmenu = $('<div/>').appendTo('body');								
        var l_params;
        var l_index;
	cmenu.menu({
            onClick: function(item) { 
                l_index = item.text + '_params';
//console.log ( 'p_event ',    p_event    );                                
//console.log ( 'item.name ',  item.name  );
//console.log ( 'l_index ',    l_index    );                
//console.log ( 'o[l_index] ', o[l_index ]);                
//console.log ( 'row ', p_row);                
                o[item.name](o[l_index],p_row); 
            }
	});							

	$.each( p_menu, function( key, value ) {
            if (value.text.trim() == '-')
                cmenu.menu('appendItem', { separator: true });  
            else  {                 

                if (p_menu[key].params !== 'undefined')  
                    l_params = p_menu[key].params;
                else
                    l_params = 'undefined';                
    
                l_index = value.text + '_params';
                o[l_index] = l_params;

                cmenu.menu('appendItem', { text: value.text, name: value.name });   
            }    
	});												
	cmenu.menu('show', {
            left: p_event.pageX,
            top:  p_event.pageY
	});			
    }
    
   
    function form_menu ( p_button, p_menu )  {            
	cmenu = $('<div/>').appendTo('body');						
	cmenu.menu ({ 
	    onClick: function(item) { o[item.name](); } 
	});	
	$.each( p_menu, function( key, value ) {
            if (value.text.trim() === '-')
                cmenu.menu('appendItem', { separator: true });  
            else     
                cmenu.menu('appendItem', { text: value.text, name: value.name });	
	});					
	$('#'+p_button).menubutton({
	    iconCls: 'icon-edit',
	    menu: cmenu			
	});    
    }   
    
    
    function exec ( p_url, p_func )   {
	f000_btns_disable(true);
	$.ajax({
            url:   p_url,
            type: 'get',
            success: function (data)  {	
                if (data.indexOf('ok') > -1)  { 
                    if (p_func !== undefined)
                    { o[p_func]();  }
                    f000_btns_disable ( false );				
		}
            },
            error:   function (data)  {	
                f000_btns_disable ( false );				                        
		alert( "Network AJAX Error  " + data ); 
            }
	});				                
    }

    
    function exec_pars ( p_url, p_func, p_pars )   {
	f000_btns_disable(true);
	$.ajax({
            url:   p_url,
            type: 'get',
            success: function (data)  {	         
                if (data.indexOf('ok') > -1)  { 
//console.log('exec_pars : p_url ' + p_url + ' p_func ' + p_func + ' data ' + data.trim() + ' p_pars ' + p_pars );
                    if (p_func !== undefined)
                        { o[p_func]( data, p_pars );  }
                    f000_btns_disable ( false );				
		}
            },
            error:   function (data)  {	
                f000_btns_disable ( false );				                        
		alert( "Network AJAX Error  " + data ); 
            }
	});				                
    }

    function init_easyui ()  {
        // easyui numberbox comma_to_dot
        $('body').on('keydown', '.easyui-numberbox+span input.textbox-text', function(e) {
            var value = $(this).val();
            if (e.keyCode == KEY_COMMA)  {	
                value = value + '.'; 
                $(this).val(value);		
            }	            
        });
    }
    
    function form_event ( p_form, p_event)  {
//console.log(module_menu);		
//console.log('оно : ' + p_form);
	$.each(module_menu, function(key, value){
//console.log(key + ": " + module_menu[key].id + ", " + module_menu[key].params + " " + module_menu[key].id.substring(0,6)); 
            if (p_form == module_menu[key].id.substring(0,6))  {
//console.log(key + ": " + module_menu[key].id + ", " + module_menu[key].params);									
		var params = module_menu[key].params;
//console.log('params : ' + params + ', length : ' + params.length);									
//console.log ( (params !== undefined) )
//console.log ( ( params.length > 0) )									
		if ((params !== undefined) && ( params.length > 0))  {
                    params = params.replace(/'/g, '"');
                    params = JSON.parse(params);										
//console.log ( p_event )											
//console.log ( params[p_event] )																					
                    if (params[p_event]!==undefined)  {
//console.log ( ( params[p_event].length > 0) )											
                        if (params[p_event].length>0)  {
                            o[params[p_event]]();										
//console.log(params);
//console.log(params[p_event]);
			}
                    }
		}
		else { console.log('нет такого !!!'); }																		
		return false;
            }
	});                
    }
    
    function decrypt ( p_data )   {
	$.each ( p_data, function(index, value) {
            if (value.encrd === '1')   {
                if (o["key"] !== '')   {
                    var decrypted = CryptoJS.AES.decrypt( value.name, o["key"]).toString(CryptoJS.enc.Utf8 );
                    decrypted = decodeURIComponent(decrypted);						
                    p_data[index].name = decrypted;																
                    if (value.children !== undefined)  {
                    	l_data = value.children;						
			decrypt ( l_data );
                    }	
		}
		else {  data[index].name = '';  }
            }	
	});			
    }
    
    function encode_ ( str )   {
        var res = '';
        s = str.toLowerCase();
        for (var i = 0; i < s.length; i++) {  
            ss = s.substring(i,i+1);
            if      (ss == 'а')  { res = res + '01'; }
            else if (ss == 'б')  { res = res + '02'; }
            else if (ss == 'в')  { res = res + '03'; }	  		 
            else if (ss == 'г')  { res = res + '04'; }	  
            else if (ss == 'д')  { res = res + '05'; }	  
            else if (ss == 'е')  { res = res + '06'; }	  
            else if (ss == 'ё')  { res = res + '07'; }	  
            else if (ss == 'ж')  { res = res + '08'; }	  
            else if (ss == 'з')  { res = res + '09'; }	  
            else if (ss == 'и')  { res = res + '10'; }	  
            else if (ss == 'й')  { res = res + '11'; }	  
            else if (ss == 'к')  { res = res + '12'; }	  
            else if (ss == 'л')  { res = res + '13'; }	  
            else if (ss == 'м')  { res = res + '14'; }	  
            else if (ss == 'н')  { res = res + '15'; }	  
            else if (ss == 'о')  { res = res + '16'; }	  
            else if (ss == 'п')  { res = res + '17'; }	  
            else if (ss == 'р')  { res = res + '18'; }	  
            else if (ss == 'с')  { res = res + '19'; }	  
            else if (ss == 'т')  { res = res + '20'; }	  
            else if (ss == 'у')  { res = res + '21'; }	  
            else if (ss == 'ф')  { res = res + '22'; }	  		 
            else if (ss == 'х')  { res = res + '23'; }	  
            else if (ss == 'ц')  { res = res + '24'; }	  
            else if (ss == 'ч')  { res = res + '25'; }	  
            else if (ss == 'ш')  { res = res + '26'; }	  
            else if (ss == 'щ')  { res = res + '27'; }	  
            else if (ss == 'ь')  { res = res + '28'; }	  
            else if (ss == 'ъ')  { res = res + '29'; }	  
            else if (ss == 'э')  { res = res + '30'; }	  		 
            else if (ss == 'ю')  { res = res + '31'; }	  
            else if (ss == 'я')  { res = res + '32'; }	  		 		 
            else if (ss == ' ')  { res = res + '33'; }
            
            else if (ss == '0')  { res = res + '90'; }                        
            else if (ss == '1')  { res = res + '91'; }
            else if (ss == '2')  { res = res + '92'; }
            else if (ss == '3')  { res = res + '93'; }
            else if (ss == '4')  { res = res + '94'; }
            else if (ss == '5')  { res = res + '95'; }
            else if (ss == '6')  { res = res + '96'; }
            else if (ss == '7')  { res = res + '97'; }
            else if (ss == '8')  { res = res + '98'; }
            else if (ss == '9')  { res = res + '99'; }
            
            else                 { res = res + '0' + ss; }
        }  
	return '00' + res;
    }    
    
    
    function gridColumnsList ( e, grid )  {
	e.preventDefault();
        if (!cmenu)  {  
            createColumnMenu();	 
        }
        cmenu.menu ('show', { left:e.pageX,top:e.pageY } );			   																					
					//JAVASCRIPT FUNCTION
        var cmenu;
        function createColumnMenu()  {   
            cmenu = $('<div id="col_menu"/>').appendTo('body');
            cmenu.menu({
                onClick: function(item){
                    if (item.iconCls == 'icon-check_16')  {
                        grid.datagrid('hideColumn', item.name);
                        cmenu.menu('setIcon', { target: item.target, iconCls: 'icon-ver_ocultar_16'   });
                    } else {
                        grid.datagrid('showColumn', item.name);								
                        cmenu.menu('setIcon', {   target: item.target, iconCls: 'icon-check_16'   });
                    }
                }
            });
	  
            var fields = grid.datagrid('getColumnFields');					
            // Arranco de 1 para evitar que me proponga para ocultar la columna que muestra los nodos
            for(var i=0; i<fields.length; i++){
                var field = fields[i];
                var col = grid.datagrid('getColumnOption', field);						
                if (col.hidden) 	cmenu.menu('appendItem', { text: col.title, name: field, iconCls: 'icon-ver_ocultar_16' });		 
                else 				cmenu.menu('appendItem', { text: col.title, name: field, iconCls: 'icon-check_16' });		 		
            }
        }   			
    }
    
    
    function getFormAccessRights ( p_form )  {		
        var func = 'f'+ p_form +'_ar';
	if (o[func] == undefined) {			
            var url_ = 	'get.jsp?' +
			'commandid=select_table_clear' + 
			'&method=zForm._get_ar' +
			'&form_id=' + p_form;												
            $.ajax({
                url:     url_
		,type:   'get'
		,success: function (data)  {                  
                    data = data.trim();					
                    if (data.length > 0)  {
			$.ajax({
                            url:     'get.jsp?commandid=fm&formid=ar' + data
                            ,type:   'get'
                            ,success: function (data)  {          
				$("#site").append(data);        
				o[func]();									
                            }                
                            ,error:   function (data)  {  
				alert( "Network AJAX Error " + data ); 
                            }
			}); 										
                    }									
		}                
		,error:   function (data)  {  alert( "Network AJAX Error " + data ); }
            }); 							
	}
	else o[func]();
    }
    
    
    function mmenu ( event )   {        
//alert(event);        
//console.log(event);
//console.log(event.which);
    }
	
	function empty_val ( p_value )  {
		if (p_value.trim().length == 0)	
			return '.';
		else
			return p_value;
	}
	
	function zero_val ( p_value )  {
		if (p_value.trim().length == 0)	
			return '0';
		else
			return p_value;
	}	
	
	function is_null ( p_value )  {
		if (p_value.trim().length == 0)	
			return 'null';
		else
			return p_value;
	}		
	
	String.prototype.replaceAll = function (find, replace) {
		var str = this;
		return str.replace(new RegExp(find, 'g'), replace);
	};	
	
	// date format js to postgresql	
	function df2pg ( dd ) {		
		var date_fmtd = dd.substr(6,4) + '-' + dd.substr(3,2) + '-' + dd.substr(0,2);	
		if  (date_fmtd == '--')
			{date_fmtd = 'null';}
		return date_fmtd;
	}		
	function dfjs2pg ( dd ) {		
		var date_fmtd = dd.getFullYear() + '-' +  dd.getMonth()+1 + '-' + dd.getDate();		
		if  (date_fmtd == '--')
			{date_fmtd = 'null';}
		return date_fmtd;
	}			
	function dtf2pg ( dd ) {		
		var date_fmtd = dd.substr(6,4) + '-' + dd.substr(3,2) + '-' + dd.substr(0,2) + ' ' + dd.substr(11,5);	
		if  (date_fmtd == '--')
			{date_fmtd = 'null';}
		return date_fmtd;
	}			
	function today2pg () {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(dd<10) { dd = '0'+dd } 
		if(mm<10) { mm = '0'+mm } 
		today = yyyy + '-' + mm + '-' + dd;					
		
		return today;
	}	
	function setTabTitle(selector,index,newTitle)
	{
		var tab = $(selector).tabs('getTab', index);
		$(selector).tabs('update', {
			tab: tab,
			options: {
				title: newTitle
			}
		});
	}

	
	$.extend($.fn.treegrid.methods, {	
		'delete': function(jq, rowIndex){
            return jq.each(function(){
				var tg = $(this);
				var opts = tg.treegrid('options');    // $(this).treegrid('options');      
                var p_classid   = opts.classid;
                var p_classname = opts.classname;              
//                var p_fload     = opts.f_load;
                var row  = tg.treegrid('getSelected');   //  $(this).treegrid('getSelected');
                f000_btns_disable ( true );				                
                if (row.id)  {                    
                    $.messager.confirm('Подтверждение', 'Удаляем запись, Вы уверены ?', function(r) {		
                        if (r) {
							var p_pars = new Object();
								p_pars.id = row.id;
							var url_ = 'qu_exec.php?command=' + p_classname + '_del&params_in=' + JSON.stringify(p_pars);
							$.ajax({
								url:     url_,   
								type:   'get',
								success: function (data)  { 
									data = JSON.parse(data);																										
									if (data.result = 'ok') 
									{ 						
//										$.messager.alert('Сообщение','Успешно удалено !','info');		
										// обновление сетки								
										tg.treegrid('remove',row.id);										
									}	
									f000_btns_disable ( false );					        
								},
								error:   function (data) { $
									.messager.alert('Сообщение','Ошибочка вышла !' + data,'info'); 
									f000_btns_disable ( false );					        
								}								
							}); 		

						}
                    });	                                        
                }		
                else {
                    $.messager.alert('Сообщение','Ошибочка вышла ! Не выбрана запись !');
                    f000_btns_disable ( false );					        
                }									
            });  
        },	
	
        add: function(jq, rowIndex){
            return jq.each(function(){
                var tg = $(this);
				var opts = tg.treegrid('options');     
                var p_classid     = opts.classid;
                var p_classname   = opts.classname; 
				var p_procdb_add  = opts.procdb_add;
				var p_func_add    = opts.func_add;
				var node = tg.treegrid('getSelected');	
				if (node.id !== undefined)   {					
					var p_pars = new Object();
						p_pars.pid = node.id;
						var url_ = '';
					if	(p_procdb_add == undefined)
						{ url_ = 'qu_exec.php?command=' + p_classname + '_add_child&params_in=' + JSON.stringify(p_pars); }
					else
						{ url_ = 'qu_exec.php?command=' + p_procdb_add  + '&params_in=' + JSON.stringify(p_pars); }						
					$.ajax({
						url:   url_,
						type: 'get',
						success: function (data)  {	
							data = JSON.parse(data);					
							if (data.result = 'ok')  {
								console.log(data);								
								console.log('add ok !');
								var l_newid = data.newid;
								var l_name  = data.name; 
								var data = '[{ "id":"' + l_newid + '","name":"' + l_name + '"}]';						
								data = JSON.parse(data);						
								if (p_func_add == undefined) 
									{ tg.treegrid('append', { parent: node.id, data }); }
								else {
									if ( p_func_add = 'f15009_tasktree_add_alloc' )
										{ o.f15009_tasktree_add_alloc ( tg, data ); }
//									if ( p_func_add = 'f15009_tasktree_add_unalloc' )
//										{ o.f15009_tasktree_add_unalloc ( tg, data ); }
								
								}
							}	
							else {	
								console.log('save : ошибочка вышла ! ' + data.error_code);
								alert('ошибка при записи формы : ' + data.error_code);						
							}												
						},
						error:   function (data)  {	alert( 'ошибочка вышла ! ' + data.trim() ); }
					}); 						
				}
            });
		}
/*
		edit: function(jq, rowIndex){
			return jq.each(function(){
			var opts = $(this).treegrid('options');   
        	if (rowIndex>0)   {  
                var p_oid    = rowIndex;
                f000_btns_disable ( true );						        
                var form     = opts.editform.id;
                var p_width  = opts.editform.width;
                var p_height = opts.editform.height;					
                var p_title  = opts.editform.title;
                var p_func   = undefined;
                if ( p_width  === undefined)   { p_width  = 800; }
                if ( p_height === undefined)   { p_height = 600; }   
                if (typeof o[form] == 'undefined')	{                     
                    o[form] =
                    {	
                        width:      p_width,
                        height:     p_height,
                        title:     '&nbsp;&nbsp;' + p_title,
                        form :      form,
                        func:       p_func,
                        f_onclose:  opts.editform.f_onclose, 
                        url:       'get_.php?commandid=fm&formid=' + form							
                    };
                }
                o[form].oid = p_oid;
                win_create ( o[form] );										
                f000_btns_disable ( false );                
            }									
			else   {  $.messager.alert('Сообщение','Не выбрана запись!');  }
            });
		}		

			var p_encrd = 0;			
			var url_;					
			if (p_params !== 'undefined')  {
				if (p_params.encrd !== 'undefined') 
					p_encrd = p_params.encrd;
			}			

			var node = $('#{sform_id}_tasktree').treegrid('getSelected');	
			if (node.id !== undefined)   {
				var p_pars = '{"pid":"' + node.id + '"}';
				if (p_encrd == '0') 
                    url_ = 'qu_exec.php?command=liActivity_add_child&params_in=' + p_pars;										
			
				$.ajax({
					url:   url_,
					type: 'get',
					success: function (data)  {	
						data = JSON.parse(data);					
						if (data.result = 'ok')  {
							console.log('add ok !');
							var l_taskid = data.newid;
							var data = '[{ "id":"' + l_taskid + '","name":"новая задача"}]';						
							data = JSON.parse(data);						
							$('#{sform_id}_tasktree').treegrid('append', {	parent: node.id, data });							
						}	
						else {	
							console.log('save : ошибочка вышла ! ' + data.error_code);
							alert('ошибка при записи формы : ' + data.error_code);						
						}					
					
						if   (data.indexOf('ok') > -1)   
						{	
							var l_taskid = data.replace('ok', '').trim();
							var data = '[{ "id":"' + l_taskid + '"}]';						
							data = JSON.parse(data);						
							$('#{sform_id}_tasktree').treegrid('append', {	parent: node.id, data });
						
							f000_btns_disable ( true );						        
							var form = '15010';
							o[form] =
							{	
								width:      800,
								height:     420,
								title:     '&nbsp;&nbsp;' + 'Новая задача',
								form :      form,		
								oid:        l_taskid,
//							set_focus: '027_name',
//							func:      'f002_tasktree_load',
								url:       'get_.php?commandid=fm&formid=15010'
							};
							win_create ( o[form] );										
							f000_btns_disable ( false );						
						}	
						else 
							alert( 'ошибочка вышла ! ' + data.trim() ) ;
							
					},
					error:   function (data)  {	alert( 'ошибочка вышла ! ' + data.trim() ); }
				}); 						
			}


		httpGetData: function(jq, p_params){
			return jq.each(function(){
				var p_grid   = $(this);
				var id       = p_params.id;
				var url      = p_params.url;                
				var f_ttl    = p_params.f_ttl; 
				var f_exec   = p_params.f_exec;
				var position = p_params.position;
				p_grid.datagrid('loadData', {"total":0,"rows":[]});                
				$.ajax({
					url:  url,
					type: 'get',
					success: function (data)  {	
						f000_btns_disable(false);
						data = JSON.parse(data);	
						p_grid.datagrid ({ data: data });                       
						
						if (position == 'first')
							p_grid.datagrid ('selectRow', 0); 
						if (position == 'last')  {
							var rows = p_grid.datagrid('getRows');           							
							p_grid.datagrid ('selectRow', rows.length-1);
						}								
                        
						if (id !== 'undefined')	{
							p_grid.datagrid ('selectRecord', id);                            
							if (f_exec !== undefined)	  { o[f_exec](); }
							if (f_ttl  !== undefined)  	  { o[f_ttl] (); }                            
						}
					},
					error:   function (data)  {	alert( data ); }
				});                                
			});    
        } 
*/		
    });    
 	