

$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return (d<10?('0'+d):d) + '.' + (m<10?('0'+m):m) + '.' + y;
	};

$.fn.datebox.defaults.parser = function(s){
		if (!s) return new Date();
		var ss = s.split('.');
		var d = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var y = parseInt(ss[2],10);

		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return new Date();
		}
	};

String.prototype.initCap = function () {
   return this.toLowerCase().replace(/(?:^|\b)[a-z]/g, function (m) {
      return m.toUpperCase();
   });
};

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}



var gl_grid = [
	
    {
         'name':     'score'
        ,'config':   {
		     'title':	    'Score таблицы для моделей'
            ,'rownumbers':   true
            ,'fitColumns':   true
            ,'singleSelect': true
    	    ,'method': 	    'get'
    	    ,'url':         ''
    	    ,'enableFilter': true
		    ,'columns':[
	  		    {field:'server_db_name',title:'Сервер',         width:'220'},
      		    {field:'name',          title:'Наименование',   width:'260'},
      		    {field:'table_name',    title:'Таблица',        width:'260'}
		    ]
        }
    }	
	
   ,{
         'name':     'etl'
        ,'config':   {
		     'title':	    'ETL запросы для моделей'
            ,'rownumbers':   true
            ,'fitColumns':   true
            ,'singleSelect': true
    	    ,'method': 	    'get'
    	    ,'url':         ''
    	    ,'enableFilter': true
		    ,'columns':[
	  		    {field:'server_db_name',title:'Сервер',         width:'220'},
	   		    {field:'code',          title:'Код',            width:'140'},
      		    {field:'name',          title:'Наименование',   width:'260'},
      		    {field:'table_name',    title:'Таблица',        width:'260'},
      		    {field:'id_column',     title:'ID column',      width:'120'},
      		    {field:'report_column', title:'Report column',  width:'120'},
      		    {field:'chunks',        title:'Порций',         width:'70', align:'right'}
//       		    {field:'query',         title:'Запрос',         width:'330'},
//       		    {field:'conn_string',   title:'Подключение',    width:'330'}
		    ]
        }
    }
   ,{
         'name':         'etl_job'
        ,'config':       {
             'title':        'Журнал запросов : '
    	    ,'method': 	    'get'
            ,'rownumbers':   true
            ,'fitColumns':   true
            ,'singleSelect': true
            ,'url':          '/api/etls_jobs'
            ,'columns':[
                {field:'bdate',         title:'Начало',     width:200},
                {field:'edate',         title:'Окончание',  width:200},
                {field:'server_db_name',title:'Сервер',     width:100},
                {field:'etl_name',      title:'Etl',        width:200},
                {field:'message',       title:'Сообщение',  width:300}
            ]
        }
    }
    ,{
         'name':            'query_result'
        ,'config':           {
             'title':       'Результат запроса : '
            ,'url':         'datagrid_data.json'
    	    ,'method': 	    'get'
            ,'rownumbers':   true
            ,'fitColumns':   true
            ,'singleSelect': true
            ,'columns':[
                {field:'id',      title:'id',   width:100}
            ]
        }
    }
   ,{
         'name':        'job'
        ,'config':      {
		     'title':	    'Задачи'
    	    ,'method': 	    'get'
    	    ,'url':         ''
    	    ,'enableFilter': true
		    ,'columns':     [
      	    	{field:'name',            title:'Задача',         width:'260', sortable:true},
	   	    	{field:'etl_name',        title:'ETL',            width:'240', sortable:true},
	   	    	{field:'server_app_name', title:'Сервер',         width:'280', sortable:true},				
	   	    	{field:'thread',          title:'Потоков',        width: '80', sortable:true},
       	    	{field:'description',     title:'Описание',       width:'330', sortable:true},
 //      	    	{field:'bdate',           title:'Начать',         width:'180', align: 'center', sortable:true},
      	    	{field:'status_name',     title:'Статус',         width:'140', sortable:true},
       	    	{field:'cr_date',         title:'Создано',        width:'180', align: 'center', sortable:true},
       	    	{field:'author_name',     title:'Автор',          width:'140', sortable:true}
		    ]
		}
	}
	,{
	     'name':        'job_model'
	    ,'config':      {
		     'title':	    'Модели для задачи'
		    ,'url': 		''
    	    ,'method': 	    'get'
		    ,'columns':      [
      		    {field:'zmodel_name',            title:'Модель', width:'270'},
      		    {field:'zmodel_status_run_name', title:'Статус', width:'200'}
//       		    {field:'description',   title:'Описание',       width:'330'}
		    ]
	    }
	}
	,{
	     'name':        'job_run'
	    ,'config':      {
		     'title':	    'Запуски задачи'
		    ,'url': 		''
    	    ,'method': 	    'get'
		    ,'columns':      [
      		    {field:'author_name',  title:'Пользователь', width:'150'},	
      		    {field:'command', title:'Режим', 		width:'100'},					
      		    {field:'pdate',   title:'Дата план', 	width:'150'},
      		    {field:'bdate',   title:'Дата факт', 	width:'150'},
      		    {field:'edate',   title:'Дата оконч', 	width:'150'},
      		    {field:'status',  title:'Статус', 		width:'200'}				
		    ]
	    }
	}	

	,{
	     'name':        'job_server'
	    ,'config':      {
		     'title':	    'Серверы для задачи'
    	    ,'method': 	    'get'
    	    ,'url':         ''
		    ,'columns':     [
      		    {field:'server_app_name',   title:'Сервер',     width:'180'},
      		    {field:'server_app_ip',     title:'ip_address', width:'180'}     // , hidden: true
		    ]
		}
	}

	,{
	     'name':        'job_model_srvr_thrd_ok'
	    ,'config':      {
		     'title':	    'События серверов'
    	    ,'method': 	    'get'
    	    ,'url':         ''
    	    ,'enableFilter': true
    	    ,'rownumbers':   true
    	    ,'pagination':   true
		    ,'columns':     [
      		    {field:'job_server_name',   title:'Сервер',             width:'175'},
      		    {field:'job_model_name',    title:'Модель',             width:'260'},
      		    {field:'operation',         title:'Операция',           width:'200'},
      		    {field:'thread',            title:'Поток',              width: '75', align:'right' },
      		    {field:'chunk',             title:'Порция',             width: '75', align:'right' },
      		    {field:'brow',              title:'Стр нач',            width: '75', align:'right' },
      		    {field:'erow',              title:'Стр оконч',          width: '75', align:'right' },
      		    {field:'bdate',             title:'Дата начало',        width:'175', align:'center'},
      		    {field:'edate',             title:'Дата окончание',     width:'175', align:'center'},
      		    {field:'error_code',        title:'Ошибки',             width: '70', align:'right' },
      		    {field:'message',           title:'Сообщение',          width:'400'}
		    ]
		}
	}
    ,{
         'name':    'etl_query_field'
	    ,'config':  {
		     'title':	'Список полей для ETL запроса'
            ,'method': 	'get'
            ,'url':     ''
		    ,'columns':[
    	        {field:'name',			title:'Поле',		width:'140'},
    	        {field:'type',		    title:'Тип',		width:'140'},
//    	        {field:'type_code',		title:'Тип',		width:'80' },
//    	        {field:'length',		title:'Длина',		width:'60' },
    	        {field:'description',	title:'Описание',	width:'250'},
    	        {field:'ordr',	        title:'пп',	        width:'25' }
		    ]
		}
	}
	,{
         'name':     'zmodel'
        ,'config':   {
		     'title':	    'Модели'
		    ,'url': 		''
    	    ,'method': 	    'get'
    	    ,'enableFilter': true
		    ,'columns':[
	   		    {field:'code',              title:'Модель',         width:'200'},
//      		    {field:'name',              title:'Модель',         width:'200'},
      		    {field:'url',               title:'Url',            width:'580'},
	   		    {field:'etl_name',          title:'ETL',            width:'250'},
	   		    {field:'score_name',        title:'Score',          width:'250'},	
      		    {field:'status_name',       title:'Статус',         width:'140'},	
	   		    {field:'developer_name',    title:'Разработчик',    width:'180'},				
	   		    {field:'department_name',   title:'Заказчик',       width:'240'},
	   		    {field:'date_developed',    title:'Разработано',    width:'120', align: 'center'},
	   		    {field:'date_plan',         title:'Плановая дата',  width:'120', align: 'center'},
      		    {field:'spark_ready',       title:'Spark',          width: '60'},
       		    {field:'description',       title:'Описание',       width:'330'}
		    ]
        }
	}
	,{
	     'name':     'server_app'
        ,'config':    {
		     'title':	'Сервер приложений'
		    ,'url': 	'/api/servers_app/'
    	    ,'method': 	'get'
    	    ,'enableFilter': true
		    ,'columns':[
      		    {field:'ip_address',    title:'IP_Address',     width:'130'},
       		    {field:'cpu',       	title:'CPU',        	width:'140'},
       		    {field:'ram',   		title:'RAM',          	width:'100', align: 'right'},
      		    {field:'hdd',   		title:'HDD',         	width:'120', align: 'right'},
      		    {field:'bdate',			title:'Дата запуска',  	width:'180', align: 'center'},
      		    {field:'status_name', 	title:'Состояние',      width:'110' },
	   		    {field:'processes',     title:'Процессы',       width:'100', align: 'right'},
	   		    {field:'errors',        title:'Ошибки',         width:'100', align: 'right'}
		    ]
	    }
	}
];

function create_popup_menu ()  {
  	var gl_menu = [
  		{	"name" : "role",
  			"items": [
  						{ "text":"Добавить", 		"name":"add"	},
  						{ "text":"Редактировать", 	"name":"edit" 	},
  						{ "text":"Удалить", 		"name":"delete" },
  						{ "text":"-", 				"name":""		},
  						{ "text":"Обновить", 		"name":"refresh"}
  			]
  		},
  		{	"name" : "etl",
  			"items": [
  						{ "text":"Добавить", 		"name":"add" 	},
  						{ "text":"Редактировать", 	"name":"edit" 	},
  						{ "text":"Удалить", 		"name":"delete" },
  						{ "text":"-", 				"name":""		},
  						{ "text":"Обновить", 		"name":"refresh"}
  			]
  		},
  		{	"name" : "score",
  			"items": [
  						{ "text":"Добавить", 		"name":"add" 	},
  						{ "text":"Редактировать", 	"name":"edit" 	},
  						{ "text":"Удалить", 		"name":"delete" },
  						{ "text":"-", 				"name":""		},
  						{ "text":"Обновить", 		"name":"refresh"}
  			]
  		},		
  		{	"name" : "zmodel",
  			"items": [
  						{ "text":"Добавить", 		"name":"add" 	},
  						{ "text":"Редактировать", 	"name":"edit" 	},
  						{ "text":"Удалить", 		"name":"delete" },
  						{ "text":"-", 				"name":""		},
  						{ "text":"Обновить", 		"name":"refresh"}
  			]
  		},
  		{	"name" : "job",
  			"items": [
  						{ "text":"Добавить", 		        "name":"add" 	    },
  						{ "text":"Редактировать", 	        "name":"edit" 	    },
  						{ "text":"Удалить", 		        "name":"delete"     },
  						{ "text":"-", 				        "name":""		    },
  						{ "text":"Обновить", 		        "name":"refresh"    },
  						{ "text":"-", 				        "name":""		    },
//  						{ "text":"Развернуть", 		        "name":"package_run"},
   						{ "text":"Запустить исполнение",    "name":"run"        },
  						{ "text":"Остановить исполнение", 	"name":"stop"       }
  			]
  		},

  		{	"name" : "job_run",
  			"items": [
			
  						{ "text":"Добавить", 		"name":"add" 	},
  						{ "text":"Редактировать", 	"name":"edit" 	},
  						{ "text":"-", 				"name":""		},
  						{ "text":"Обновить", 		"name":"refresh"},
  						{ "text":"-", 				"name":""		},				
  						{ "text":"Тест",	 		"name":"test" 	},					
  			]
  		},		
		
  		{	"name" : "job_model",
  			"items": [
  						{ "text":"Добавить", 		"name":"add" 	},
  						{ "text":"Редактировать", 	"name":"edit" 	},
  						{ "text":"Удалить", 		"name":"delete" },
  						{ "text":"-", 				"name":""		},
  						{ "text":"Обновить", 		"name":"refresh"}
  			]
  		},
  		{	"name" : "job_server",
  			"items": [
  						{ "text":"Добавить", 		"name":"add" 	},
  						{ "text":"Редактировать", 	"name":"edit" 	},
  						{ "text":"Удалить", 		"name":"delete" },
  						{ "text":"-", 				"name":""		},
  						{ "text":"Обновить", 		"name":"refresh"}
  			]
  		},
  		{	"name" : "server_app",
  			"items": [
  						{ "text":"Добавить", 		"name":"add" 	},
  						{ "text":"Редактировать", 	"name":"edit" 	},
  						{ "text":"Удалить", 		"name":"delete" },
  						{ "text":"-", 				"name":""		},
  						{ "text":"Обновить", 		"name":"refresh"}
  			]
  		},
  		{	"name" : "etl_query_field",
  			"items": [
  						{ "text":"Добавить поля", 	"name":"fill_fields"},
  						{ "text":"-", 				"name":""		    },
  						{ "text":"Обновить", 		"name":"refresh"    }
  			]
  		},
  		{	"name" : "etl_job",
  			"items": [
  						{ "text":"Выполнить запрос", 	"name":"new" 	    },
  						{ "text":"Получить ответку",    "name":"response" 	},
  						{ "text":"Просмотр ответа",     "name":"view" 	    },
  						{ "text":"Очистить", 		    "name":"clear"      }
  			]
  		},


  		{	"name" : "job_model_srvr_thrd_ok",
  			"items": [
  						{ "text":"Обновить", 		    "name":"refresh"    }
  			]
  		},
  	];

	for (var i=0;i<gl_menu.length;i++) {
		var mm = 'mm_' + gl_menu[i].name;
		// прописываем обработчик для каждого меню, назывванием которого формируется как 'menu' + Menu.name + Handler, например,
		// название обработчика для меню "etl" будет называться "menuEtlHandler"
		$('<div id="' + mm + '" data-options="onClick:menu' + gl_menu[i].name.initCap() + 'Handler" hidden="true"> </div>').appendTo('body').menu();

		var m_items = gl_menu[i].items;
		mm = '#' + mm;
		for (var j=0;j<m_items.length;j++) {
			if (m_items[j].text == '-')  {
				$(mm).menu('appendItem', {separator:true});
			}
			else {
				$(mm).menu('appendItem', {
     				text: 	m_items[j].text,
     				name:	m_items[j].name
				});
			}
		}
	}
}


function menu_handler ( class_id, item )  {

    var grid        = '#gr' + class_id;
    var eform       = class_id + '_ef';
    var selectedRow;
    var rowIndex;

    // проверяем наличие грида
	if ($(grid).length == 0)  {
	    alert('Не задан grid !');
	    return;
    }

	// для обновления грида или добавления записи достаточно просто его наличия (грида)
	if (item.name == 'refresh')  {
        $(grid).datagrid('reload');
        return;
    }

	if (item.name == 'add')  {
console.log('menu_handler : add');
       	// получаем описание формы редактирования
		config 		= get_grid_config ( class_id );

		// создание и открытие формы редактирования
		ef = '#ef' + class_id;
    	if ($(ef).length > 0)   {
    		$(ef).window('open');
    	}
    	else 	{
        	$( "body" ).append( '<div class="body" id="ef' + class_id + '" style="padding: 20px;">' + config.eform.html + '</div>' );
        	$(ef).window({
        		title: 	config.eform.title,
        		width: 	config.eform.width,
        		height: config.eform.height,
        		modal: 	config.eform.modal,
        		resizable: false
        	});
			after_form_create ( class_id );
		}
		//init_form_data (class_id);
console.log('menu_handler : add, clear_data');
		ef_clear_data (eform);
		clear_form (class_id);
        return;
	}

    // для операций редактирования и удаления необходимо, чтобы была выбрана еще и запись в гриде
	selectedRow = $(grid).datagrid("getSelected");
	if (selectedRow === null)  {
        alert('Не выбрана запись !');
        return;
	}

    rowIndex    = $(grid).datagrid("getRowIndex", selectedRow);

	if (item.name == 'delete')  {   // удаление записи
        $.messager.confirm('Confirm','Удаляем, Вы уверены?',function(r){
            if (r)  {
                var csrftoken  = readCookie('csrftoken');
                var url_delete = 'api/' + class_id + 's/delete/' + selectedRow.id + '/';
		        jQuery.ajax({
		            type:           'DELETE',
		            url:             url_delete,
		            headers:        {"X-CSRFToken":csrftoken},
		            success:        function(result, status, XHR) {
			            $(grid).datagrid('deleteRow', rowIndex);
		            },
		            error: function(jqXHR, textStatus, errorThrown) {
			            alert('Error: ' + textStatus + ' ' + errorThrown);
		            }
		        });
            }
        });
    }

	if (item.name == 'edit')  {
console.log('menu_handler : edit');
       	// получаем описание формы редактирования
		config 		= get_grid_config ( class_id );

		// создание и открытие формы редактирования
		ef = '#ef' + class_id;
    	if ($(ef).length > 0)   {
    		$(ef).window('open');
    	}
    	else 	{
        	$( "body" ).append( '<div class="body" id="ef' + class_id + '" style="padding: 20px;">' + config.eform.html + '</div>' );
        	$(ef).window({
        		title: 	config.eform.title,
        		width: 	config.eform.width,
        		height: config.eform.height,
        		modal: 	config.eform.modal,
        		resizable: false
        	});
			after_form_create ( class_id );
		}
		//init_form_data (class_id);
console.log('menu_handler : edit, clear_data');
		ef_clear_data (eform);
		clear_form (class_id);

        if (item.name == 'edit')  {
		    // запись полученных данных в поля формы редактирования
            function onGetRoleAjaxSuccess (data) {
        	    form_populate(class_id+'_ef', data[0])
        	    refresh_form (class_id);
            }

		    // запрос на чтение данных для формы редактирования
		    let url = '/api/' + class_id + 's/?id=' + selectedRow.id;
console.log('menu_handler : edit, url : ', url );
            $.get(
        	    url,
        	    onGetRoleAjaxSuccess
            );
        }
    }

}


function getType(target){
	var plugins = $.parser.plugins;
	for(var i=plugins.length-1; i>=0; i--){
		if ($(target).data(plugins[i])){
			return plugins[i];
		}
	}
	return null;
}

function ef_get_data ( form_id ) {
console.log ('ef_get_data ', form_id);
	var obj = {};
    var elements = document.getElementById(form_id).elements;
	for( var i = 0; i < elements.length; ++i ) {
		var element = elements[i];
		var name    = element.id.substr ( form_id.length + 1 );
		var value   = element.value;
		if( name ) {
//console.log( element, getType(element), $(element) );
//console.log( element );
//console.log( $(element) );
//console.log( $(element).checkbox('options') );
//console.log( $(element).checkbox('options').checked );
//console.log( '!!!!!!!!!!! ', name, ' = ', obj[ name ], ' : ', $(element).checkbox('options').checked );
            if      (getType(element) == 'checkbox')     { obj[ name ] = $(element).checkbox('options').checked }
            else if (getType(element) == 'datebox' )     {
                if  ( $(element).datebox('getValue').trim().length == 0)
                    {  obj[ name ] = null  }
                else
                    {  obj[ name ] = $(element).datebox('getValue')  }
            }
            else
                { obj[ name ] = value; }
		}
	}

	obj [ "author" ] = curr_user_id;  // 2;
console.log(obj);
	return obj;
}

function ef_clear_data ( form_id ) {
console.log ('ef_clear_data ', form_id);
    var elements = document.getElementById(form_id).elements;
//console.log (elements);
	for( var i = 0; i < elements.length; ++i ) {
		var element = elements[i];
		var name    = element.id.substr ( form_id.length + 1 );
		var value   = element.value;
		if( name ) {
//console.log( element );
//console.log( $(element) );
//console.log( $(element).checkbox('options') );
//console.log( $(element).checkbox('options').checked );
            if (getType(element) == 'checkbox')     {   $(element).checkbox({checked:false});   }
            if (getType(element) == 'datebox')      {   $(element).datebox('setValue', '');     }
            else
            {   element.value = ''; }
        }
	}
	return true;
}


function form_populate(form_id, data) {
console.log('form_populate, form_id : ', form_id);
console.log('form_populate, data : ', data);
    $.each(data, function(key, value) {
console.log('form_populate, key, value : ', key, ' , ', value );
        var ctrl_name = '#' + form_id + '_' + key;
        var ctrl = $(ctrl_name);
console.log('form_populate, ctrl : ', ctrl);
        if      (getType(ctrl_name) == 'checkbox')        {  ctrl.checkbox({checked:value});    }
        else if (getType(ctrl_name) == 'datebox' )        {  ctrl.datebox('setValue', value);	}
        else
        {  ctrl.val(value); }
    });
}


function ef_save_button ( class_id )  {

console.log('ef_save_button, class_id : ', class_id);
	
	var form_id = class_id + '_ef';
	var data = ef_get_data ( form_id );

console.log('ef_save_button : ', data);
console.log('ef_save_button.id : ', data.id);
	
	if (class_id == 'job')  {
 		if (data.etl_name    == '')           { alert('Не выбран ETL !');                               return; }
		if (data.etl         == '')           { alert('Не выбран ETL !');                               return; }	
		if (data.status_name == '')           { alert('Не выбран Статус !');                            return; }
		if (data.status      == '')           { alert('Не выбран Статус !');                            return; }	
		if (data.code        == '')           { alert('Не задано значение \'Задача код !\'');           return; }	
		if (data.name        == '')           { alert('Не задано значение \'Задача наименование !\'');  return; }
		if (data.thread      == '')           { alert('Не задано значение \'Количество потоков !\'');   return; }		
//		if (data.bdate       == null)         { alert('Не задано значение \'Дата запуска !\'');         return; }
		if (data.description == '')           { alert('Не задано значение \'Описание !\'');             return; }	
	}
	
	if (class_id == 'zmodel')  {
 		if (data.code     == '')              { alert('Не задан Модель код !');                         return; }
 		if (data.name     == '')              { alert('Не задан Модель наименование !');                return; }			
 		if (data.url      == '')              { alert('Не задан Url !');                                return; }	
 		if (data.etl_name == '')              { alert('Не выбран Etl !');                               return; }	
 		if (data.etl      == '')              { alert('Не выбран Etl !');                               return; }			
 		if (data.department_name == '')       { alert('Не выбран Заказчик !');                          return; }	
 		if (data.department      == '')       { alert('Не выбран Заказчик !');                          return; }	
 		if (data.developer_name  == '')       { alert('Не выбран Разработчик !');                       return; }	
 		if (data.developer       == '')       { alert('Не выбран Разработчик !');                       return; }
 		if (data.status_name     == '')       { alert('Не выбран Статус !');                            return; }	
 		if (data.status          == '')       { alert('Не выбран Статус !');                            return; }		
		if (data.date_developed  == null)     { alert('Не задано значение \'Разработано !\'');          return; }
		if (data.date_plan       == null)     { alert('Не задано значение \'Плановая дата !\'');        return; }
		if (data.description     == '')       { alert('Не задано значение \'Описание !\'');             return; }		
	}	

	
    var csrftoken   = readCookie('csrftoken');
    var grid        = '#gr' + class_id;
	var window      = '#ef' + class_id;

    if (data.id == '')  {  // добавить новую запись
          var url_add     = 'api/' + class_id + 's/create/';
          add_data = data;
          delete  add_data.id;
          var dataJson    = JSON.stringify(add_data);
		  jQuery.ajax({
			  type:           'POST',
			  headers:        {"X-CSRFToken":csrftoken},
			  contentType:    'application/json',
			  dataType:       'json',
			  url:            url_add,
			  data:           dataJson,
			  success:        function(result, status, XHR) {
			      fill_grid_row ( result.id, class_id, grid, 'append' );
				  $(window).window('close');
			  },
			  error: function(jqXHR, textStatus, errorThrown) {
				  alert('Error: ' + textStatus + ' ' + errorThrown + '\n' + jqXHR.responseText );
		      }
		  });
     }
     else  {  // редактировать существующую запись
		  var curr_id = data.id;
console.log('curr_id ', curr_id );
          var url_upd = 'api/' + class_id + 's/update/' + curr_id + '/';
          var upd_class = 'update_' + class_id;

          var upd_data = {};
          upd_data [upd_class] = data;
          dataJson = JSON.stringify(upd_data);
console.log(dataJson);
		  jQuery.ajax({
			  type:           'PUT',
			  headers:        {"X-CSRFToken":csrftoken},
			  contentType:    'application/json',
			  dataType:       'json',
			  url:             url_upd,
			  data:            dataJson,
			  success:        function(result, status, XHR) {
			     fill_grid_row ( curr_id, class_id, grid, 'edit' );
	             $(window).window ( 'close' );
			  },
			  error: function(jqXHR, textStatus, errorThrown) {
				  alert('Error: ' + textStatus + ' ' + errorThrown + '\n' + jqXHR.responseText );
		      }
		  });
     }
}

function fill_grid_row ( id, class_id, grid, command )  {
    // запрос на чтение данных для заданной строки класса
    let url = '/api/' + class_id + 's/?id=' + id;
    $.get(
   	    url,
   	    function (data) {
            var selectedrow = $(grid).datagrid("getSelected");
            var rowIndex    = $(grid).datagrid("getRowIndex", selectedrow);
            if (command == 'append')  {
                $(grid).datagrid ( 'insertRow', {
	                index: rowIndex+1,	// index start with 0
	                row: data[0]
                });
                $(grid).datagrid('selectRow', rowIndex+1);
            }
            if (command == 'edit')  {
                $(grid).datagrid ( 'updateRow', {
                    index: rowIndex,
                    row:data[0]
                });
            }
   	    }
    );
}


function form_dict ( class_id, form_field, dic_class_id, dic_class_descr )  {
//console.log('fmServerApp_status_get_dic : started');
	var dic_window = 'dic_'   + class_id + '_' + dic_class_id;
	var dic_grid   = 'grdic_' + class_id + '_' + dic_class_id;
//console.log('fmServerApp_status_get_dic : before open ' + dic_window);
    if ($('#'+dic_window).length > 0)   {
        $('#'+dic_grid ).datagrid('loadData', []);
        $('#'+dic_grid ).datagrid('reload');

        $('#'+dic_window).window('open');
        return;
    }

//console.log('fmServerApp_status_get_dic : before create');
    var s = '';
    s = s + '<div id="' + dic_window + '">';
    s = s + '    <div title="Справочник ' + dic_class_descr + '" closable="true" style="padding:10px;height:100%;">';
    s = s + '        <table id="' + dic_grid + '"></table>';
    s = s + '    </div>';
    s = s + '</div>	';

    $( "body" ).append ( s );

//console.log('fmServerApp_status_get_dic : after create');
    $('#'+dic_grid).datagrid({
        url:            '/api/' + dic_class_id + 's/?format=json',          // http://127.0.0.1:5000
        method:         'get',
        singleSelect:   true,
        collapsible:    true,
        rownumbers:   	true,
   		fit: 			true,
        columns:[[
            { field:'code',title:'Код',          width:180 },
            { field:'name',title:'Наименование', width:360 }
        ]],
	    onDblClickRow: function (index, row)  {
		    $('#' + form_field  ).val (row.id );
		    if ($('#' + form_field + '_code').length > 0)   { $('#' + form_field + '_code').val (row.code ); }
		    if ($('#' + form_field + '_name').length > 0)   { $('#' + form_field + '_name').val (row.name ); }

		    $('#'+dic_window).window('close');
	    }
    });

    $('#'+dic_window).window({
		title: '&nbsp;&nbsp;&nbsp; Справочник ' + dic_class_descr,
		width:  800,
		height: 450,
		modal:  true
    });

//console.log('fmServerApp_status_get_dic : after open');
}

function check_menu_enabled ( grid )  {
    // при добавлении etl, пока запись не будет сохранена (и ей не присвоен идентификатор), все дочерние таблицы пустые и недоступны
    if ( grid == 'grquery_field' )
    {    if ( $('#etl_ef_id').val() == '' )
        {    return false;  }
    }

    if ( grid == 'gretl_job' )
    {    if ( $('#etl_ef_id').val() == '' )
        {    return false;  }
    }

    return true;
}
