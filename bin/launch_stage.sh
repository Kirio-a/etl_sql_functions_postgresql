#!/usr/bin/env bash

#У каждого ресурса свой etl_id
#У каждого ресурса свое название исходного файла загрузки
csv_slava="Functions_SQL_Slava (Для ИЗ).csv"
csv_alena="SQL note ALENA (для ИЗ).csv" 
csv_kirill="SQL note (для ИЗ).csv"


echo 'Процесс проверки и загрузки данных в слой stage запущен'
echo '-------------------------------------------------------'

# 1. Проверка наличия новой порции данных
if [ -e $local_path/etl_files/* ]
    then
    echo "!! Найден файл  !!"
    echo '------------------'
else
   echo "Файлов для загрузки нет!"
fi

# 2. Загрузка данных из csv в stage

# 2.1. Источник Alena
if [ -f $local_path"/etl_files/SQL note ALENA (для ИЗ).csv" ]
    then
    echo "Файл от Алёны"
    echo '------------------'
    echo "Начало процесса загрузки новых данных вstage"
    etl_id=17
    csv=$csv_alena
    table_name="stage.sql_functions_alena"
    fields='function_type, function_mysql, description, "returns", argument_func_mysql, detailed_description, replacing, examples_mysql'
    source "$local_path/bin/stage.sh"
# очистка дериктории(перенос отработанного файла) 
    mv $local_path/etl_files/"SQL note ALENA (для ИЗ).csv"  $local_path/prev_etl_files/"SQL note ALENA (для ИЗ)_$dt.csv"

fi

# 2.2. Источник Slava
if [ -f $local_path"/etl_files/Functions_SQL_Slava (Для ИЗ).csv" ]
    then
    echo "Файл от Славы"
    echo '------------------'
    echo "Начало процесса загрузки новых данных вstage"
    etl_id=19
    csv=$csv_slava
    table_name="stage.sql_functions_slava"
    fields="function_sql, description, detail_description"
    source "$local_path/bin/stage.sh"
# очистка дериктории(перенос отработанного файла) 
    mv $local_path/etl_files/"Functions_SQL_Slava (Для ИЗ).csv"  $local_path/prev_etl_files/"Functions_SQL_Slava (Для ИЗ)_$dt.csv"
fi

# 2.3. Источник Kirill
if [ -f $local_path"/etl_files/SQL note (для ИЗ).csv" ]
    then
    echo "Файл от Кирилла"
    echo '------------------'
    echo "Начало процесса загрузки новых данных вstage"
    etl_id=15
    csv=$csv_kirill
    table_name="stage.sql_functions"
    fields='function_type, description, function_mysql, argument_func_mysql, function_postgresql, argument_func_postgresql, "returns", detailed_description, examples_mysql, examples_postgresql, replacing'
    source "$local_path/bin/stage.sh"
# очистка дериктории(перенос отработанного файла) 
    mv $local_path/etl_files/"SQL note (для ИЗ).csv"  $local_path/prev_etl_files/"SQL note (для ИЗ)_$dt.csv"
fi

echo '=========================================================='
