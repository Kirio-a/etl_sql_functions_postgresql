#!/usr/bin/env bash

flag=0
step_num=1

echo "1. Проверка слоя stage на наличие новых данных"
echo "-----------------------------------------------------"
db_settings='| PGPASSWORD=$pgpswd psql -d mydb'
# 1.1. Проверка источника Slava
etl_id=20
# проверка по дате изменений в stage
RESULT=$(echo "select date_part('day', loaded_dttm) = date_part('day', now()) from stage.sql_functions_slava limit 1;" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
today=${array[2]}
# провверка по метке "finished" предыдущего процесса
RESULT=$(echo "SELECT detail.check_etl_finish(19, 3)" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
stage_finished=${array[2]}
# Проверка по метке "finished" теущего процесса (чтобы не гоняло по кругу)
RESULT=$(echo "SELECT detail.check_etl_finish($etl_id, $step_num)" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
detail_finished_slava=${array[2]} 

if [[ $today == 't' && $stage_finished == 't' && $detail_finished_slava != 't' ]]
    then 
    echo "-- Есть новые данныев в источнике Slava --"    
    src=function_slava
    src_cd=Slava
    echo "-----------------------------------------------------"
    echo "2. Загрузка данных из stage в detail"
    source "$local_path/etl_sql_functions_postgresql/bin/detail.sh"
    flag=1
fi

# 1.2. Проверка источника Alena
etl_id=18
# проверка по дате изменений в stage
RESULT=$(echo "select date_part('day', loaded_dttm) = date_part('day', now()) from stage.sql_functions_alena limit 1;" | PGPASSWORD=$pgpswd psql -d mydb)
array=($RESULT)
today=${array[2]}
# провверка по метке "finished" предыдущего процесса
RESULT=$(echo "SELECT detail.check_etl_finish(17, 3)" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
stage_finished=${array[2]}
# Проверка по метке "finished" теущего процесса (чтобы не гоняло по кругу)
RESULT=$(echo "SELECT detail.check_etl_finish($etl_id, $step_num)" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
detail_finished_alena=${array[2]}  

if [[ $today == 't' && $stage_finished == 't' && $detail_finished_alena != 't' ]]
    then 
    echo "-- Есть новые данныев в источнике Alena --"    
    src=function_alena
    src_cd=Alena
    echo "-----------------------------------------------------"
    echo "2. Загрузка данных из stage в detail"
    source "$local_path/etl_sql_functions_postgresql/bin/detail.sh"
    flag=1
fi

# 1.3. Проверка источника Kirill
etl_id=16
# проверка по дате изменений в stage
RESULT=$(echo "select date_part('day', loaded_dttm) = date_part('day', now()) from stage.sql_functions limit 1;" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
today=${array[2]}
# провверка по метке "finished" предыдущего процесса
RESULT=$(echo "SELECT detail.check_etl_finish(15, 3)" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
stage_finished=${array[2]}
# Проверка по метке "finished" теущего процесса (чтобы не гоняло по кругу)
RESULT=$(echo "SELECT detail.check_etl_finish($etl_id, $step_num)" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
detail_finished_kirill=${array[2]} 

if [[ $today == 't' && $stage_finished == 't' && $detail_finished_kirill != 't' ]]
    then 
    echo "-- Есть новые данныев в источнике Kirill --"    
    src=sql_functions
    src_cd=Kirill
    echo "-----------------------------------------------------"
    echo "2. Загрузка данных из stage в detail"
    source "$local_path/etl_sql_functions_postgresql/bin/detail.sh"
    flag=1
fi

if [[ $flag == 0 ]]
    then
    echo "Нет новых данных"
fi





