import os
import os.path
import sys
import requests
from flask import Flask, render_template, jsonify, request, url_for, send_from_directory
import psycopg2
import psycopg2.extras
import json
from operator import itemgetter
from datetime import date, timedelta


app     = Flask(__name__)

js_init = { 
    "code":     400,                            
    "total":    0,
    "message":  'unknown error',
    "data":    [] 
} 



@app.route('/sql_func')
def page():
    return render_template ( 'sql_func.html' ) 


@app.route('/etl_list')
def page_etl():
    return render_template ( 'etl_list.html' )   

@app.route('/etl_dict')
def page_etl_dict():
    return render_template ( 'etl_dict.html' )    

#############################################################################
#Страница SQL functions

@app.route('/table',   methods=['GET'])
def table():
    js = js_init        
    stmt = '''
          select d.name db_type
            , f.id 
            , t.name function_type
            , f.name as function_name
            , f.description
            , f.arguments
            , f.examples
            , f.returns
            , f.detailed_description
            from detail.function f
            join detail.db_type d on f.db_type_id = d.db_id
            join detail.func_type t on f.func_type_id = t.type_id
            where f.deleted_flg is null
    '''	
    print (stmt)
    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        rows    = gp_curs.fetchall()
        #print (rows)
        gp_conn.close()   
        data = [dict(row) for row in rows]       
        #print (data)
        js['code']     = 200    
        js['total']    = len(data)
        js['message']  = 'ok'
        js['data']     = data            
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js) 

# Получение целой строки из таблицы (кортеж)

@app.route('/evt_one',   methods=['GET'])
def evt_one():
    js = js_init        
    id = str(request.args.get('id'))
    print(id)
    		
    stmt = f""" 
         select d.name db_type
                , f.id 
                , t.name function_type
                , f.name as function_name
                , f.description
                , f.arguments
                , f.examples
                , f.returns
                , f.detailed_description
                , (select case 
                            when f2.db_type_id = 2 then 'postgresql'
                            when f2.db_type_id = 1 then 'mysql'	  
                            end) as analog_db_type
                , f2.name as analog_function
                , f2.arguments analog_fun_args
                , f2.examples analog_fun_examples                                               
                from detail.function f
                join detail.db_type d on f.db_type_id = d.db_id
                join detail.func_type t on f.func_type_id = t.type_id
                left join detail.function_match m on f.id = (case 
                                                            when d.name = 'mysql' then m.mysql_func_id
                                                            when d.name = 'postgresql' then m.postgresql_func_id  	  
                                                            end)
                left join detail.function f2 on f2.id = (case 
                                                        when f.db_type_id = 1 then m.postgresql_func_id 
                                                        when f.db_type_id = 2 then m.mysql_func_id 	  
                                                        end)                                          
                where f.deleted_flg is null and f.id = {id} 
      """
    print (stmt)

    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        rows    = gp_curs.fetchall()
        print (rows)
        gp_conn.close()   
        
        data = [dict(row) for row in rows]       
        #print (data)
        js['code']     = 200    
        js['total']    = len(data)
        js['message']  = 'ok'
        js['data']     = data            
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)  

# Удаление записи (изменение сведений)

@app.route('/del',   methods=['DELETE'])
def evt_del():
    js = js_init        
    id = str(request.args.get('id'))		
    stmt = f""" update detail."function"
	     set effective_to_dttm = current_timestamp, 
		      processed_dttm = current_timestamp,
		      deleted_flg = true 
              where id = {id};
          insert into detail.etl_run (
             etl_id
            , started_dttm
            , finished_dttm
            , status	
            , step_num)
        values(
             21
            , current_timestamp
            , current_timestamp
            , 'finished'
            , 1); """
	
    print (stmt)
    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        gp_conn.commit()        
        gp_conn.close()   
        
        js['code']     = 200    
        js['total']    = 1
        js['message']  = 'ok'
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)

# Добавление записи

@app.route('/ins',   methods=['POST'])
def ins():
    js = request.get_json()	
    print (js)
    db_type    = js['db_type']
    function_type    = js['function_type']
    function_name  = js['function_name']   
    description  = js['description']
    arguments    = js['arguments']
    examples  = js['examples']
    returns  = js['returns']               
    detailed_description  = js['detailed_description']
    analog_function = js['analog_function']
    analog_db_type = js['analog_db_type']
    analog_fun_args = js['analog_fun_args']
    analog_fun_examples = js['analog_fun_examples']
    print (db_type, id, function_name, arguments, description, detailed_description, returns, analog_function)
	
    stmt = f"""
        insert into detail."function" ("name"
						  , description
						  , arguments
						  , "returns"
						  , detailed_description
						  , func_type_id
						  , db_type_id
						  , examples
						  , src_cd 
						  , processed_dttm
						  , effective_from_dttm
						  , effective_to_dttm) 
        values (
 		    '{function_name}'
            , '{description}'
            , '{arguments}'
            , '{"returns"}'
            , '{detailed_description}'
            , (select type_id from detail.func_type
               where name = '{function_type}')
            , case 
  	             when '{db_type}' = 'mysql' then 1
  	             when '{db_type}' = 'postgresql' then 2  	  
               end
            , '{examples}'
            , 'Kirill'
            , current_timestamp
            , current_timestamp
            , '2100.01.01'::timestamp              
        );
         insert into detail.etl_run (
             etl_id
            , started_dttm
            , finished_dttm
            , status	
            , step_num)
        values(
             21
            , current_timestamp
            , current_timestamp
            , 'finished'
            , 1);
    """
    if analog_db_type:
        print('yes')
        stmt_2 = f"""           
            insert into detail.function(
                                "name"
                            , description
                            , arguments
                            , "returns"
                            , detailed_description
                            , func_type_id
                            , db_type_id
                            , examples
                            , src_cd 
                            , processed_dttm
                            , effective_from_dttm
                            , effective_to_dttm) 
            values (
                '{analog_function}'
                , '{description}'
                , '{analog_fun_args}'
                , '{"returns"}'
                , '{detailed_description}'
                , (select type_id from detail.func_type
                where name = '{function_type}')
                , case 
                    when '{analog_db_type}' = 'mysql' then 1
                    when '{analog_db_type}' = 'postgresql' then 2  	  
                end
                , '{analog_fun_examples}'
                , 'Kirill'
                , current_timestamp
                , current_timestamp
                , '2100.01.01'::timestamp              
            );
    """
    else:
        stmt_2 = f""" SELECT 1 WHERE 1=0 """
    print (stmt)
    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        gp_curs.execute(stmt_2)
        gp_conn.commit()        
        gp_conn.close()   
        
        js['code']     = 200    
        js['total']    = 1
        js['message']  = 'ok'
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)

# Обновление записи
        
@app.route('/upd',   methods=['PATCH'])
def upd():
#    js = js_init
    js = request.get_json()
    db_type    = js['db_type']
    id = js['id']
    print('id === ', id)
    function_type    = js['function_type']
    function_name  = js['function_name']   
    description  = js['description']
    arguments    = js['arguments']
    examples  = js['examples']
    returns  = js['returns']               
    detailed_description  = js['detailed_description']		

    print (js)
    stmt = f"""
        update  detail."function"
            set processed_dttm = current_timestamp
	            , effective_to_dttm = current_timestamp
		        , deleted_flg = true  
            where  id = '{id}';
        insert into detail."function" ("name"
						  , description
						  , arguments
						  , "returns"
						  , detailed_description
						  , func_type_id
						  , db_type_id
						  , examples
						  , src_cd 
						  , processed_dttm
						  , effective_from_dttm
						  , effective_to_dttm) 
        values (
 		    '{function_name}'
            , '{description}'
            , '{arguments}'
            , '{"returns"}'
            , '{detailed_description}'
            , (select type_id from detail.func_type
               where name = '{function_type}')
            , case 
  	             when '{db_type}' = 'mysql' then 1
  	             when '{db_type}' = 'postgresql' then 2  	  
               end
            , '{examples}'
            , 'Kirill'
            , current_timestamp
            , current_timestamp
            , '2100.01.01'::timestamp              
        );
         insert into detail.etl_run (
             etl_id
            , started_dttm
            , finished_dttm
            , status	
            , step_num)
        values(
             21
            , current_timestamp
            , current_timestamp
            , 'finished'
            , 1);      
    """
    
    print (stmt)
    try:
        gp_conn = conn_psy()		# 'GP', 'MVP_MAIN', config_file                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        gp_conn.commit()        
        gp_conn.close()   
        
        js['code']     = 200    
        js['total']    = 1
        js['message']  = 'ok'
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)
                
#############################################################################
#Страница Список ETL процессов


@app.route('/table_etl_run',   methods=['GET'])
def table_etl_run():
    js = js_init        
    stmt = '''select r.id as id
                , e.name as name
                , started_dttm
                , finished_dttm
                , status
              from detail.etl_run r join detail.etl e on r.etl_id=e.id'''	
    print (stmt)
    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        rows    = gp_curs.fetchall()
        print (rows)
        gp_conn.close()   
        
        data = [dict(row) for row in rows]       
        #print (data)
        js['code']     = 200    
        js['total']    = len(data)
        js['message']  = 'ok'
        js['data']     = data            
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js) 


#Страница Справочника ETL процессов

@app.route('/table_etl',   methods=['GET'])
def table_etl():
    js = js_init        
    stmt = '''select id
                , name
                , description
              from detail.etl'''	
    print (stmt)
    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        rows    = gp_curs.fetchall()
        print (rows)
        gp_conn.close()   
        
        data = [dict(row) for row in rows]       
        #print (data)
        js['code']     = 200    
        js['total']    = len(data)
        js['message']  = 'ok'
        js['data']     = data            
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)        

@app.route('/evt_one_etl',   methods=['GET'])
def evt_one_etl():
    js = js_init        
    id = str(request.args.get('id'))
    print(id)
    		
    stmt = f""" 
         select id 
            , name
            , description                                         
            from detail.etl
            where id = {id} 
      """
    print (stmt)

    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        rows    = gp_curs.fetchall()
        print (rows)
        gp_conn.close()   
        
        data = [dict(row) for row in rows]       
        js['code']     = 200    
        js['total']    = len(data)
        js['message']  = 'ok'
        js['data']     = data 
        print (js)           
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)       
             

@app.route('/del_etl',   methods=['DELETE'])
def del_etl():
    js = js_init        
    id = str(request.args.get('id'))		
    stmt = f""" delete from detail.etl where id = {id} """
	
    print (stmt)
    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        gp_conn.commit()        
        gp_conn.close()   
        
        js['code']     = 200    
        js['total']    = 1
        js['message']  = 'ok'
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)

@app.route('/ins_etl',   methods=['POST'])
def ins_etl():
    #js = js_init
    js = request.get_json()	
    print (js)
    name  = js['name']   
    description  = js['description']
    print (name, description)
	
    stmt = f"""
        insert into detail.etl (id
                          , "name"
						  , description) 
        values (
            (select max(id)+1 from detail.etl)
 		    , '{name}'
            , '{description}'
            );
    """    

    print (stmt)
    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        gp_conn.commit()        
        gp_conn.close()   
        
        js['code']     = 200    
        js['total']    = 1
        js['message']  = 'ok'
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)   
        

@app.route('/upd_etl',   methods=['PATCH'])
def upd_etl():
    js = request.get_json()
    id = js['id']
    print(id)
    name  = js['name']   
    description  = js['description']		

    print (js)
    stmt = f"""
        update  detail.etl
        set  name  = '{name}',
             description  = '{description}'
         where  id = {id};      
    """
   
    print (stmt)
    try:
        gp_conn = conn_psy()		# 'GP', 'MVP_MAIN', config_file                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        gp_conn.commit()        
        gp_conn.close()   
        
        js['code']     = 200    
        js['total']    = 1
        js['message']  = 'ok'
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)              


@app.route('/etl',   methods=['GET'])
def etl():
    js = js_init        
    stmt = '''
           
           '''	
    print (stmt)
    try:
        gp_conn = conn_psy()                      
        gp_curs = gp_conn.cursor ( cursor_factory = psycopg2.extras.RealDictCursor )                            
        gp_curs.execute(stmt)
        gp_conn.commit()        
        gp_conn.close()   
        
        js['code']     = 200    
        js['total']    = 1
        js['message']  = 'ok'
        return js
    except Exception as e: 
        print ('ошибочка вышла!', str(e))
        js['message']  = str(e)
        print (js)
        return jsonify(js)     
 
#подключение к бд 

def conn_psy():
    try:
        print('try to connect')
        conn = psycopg2.connect("host='localhost' dbname='mydb' user='kirio' password='1566' port=5432")
    except Exception as ex:
        print ("I am unable to connect to the database")                
        print (ex)
    return conn			


if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5050)
