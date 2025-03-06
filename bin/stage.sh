#!/usr/bin/env bash

# 1. Начало процесса
    step_num=1
# вызов процесса начала заполнения таблицы etl_run и придание переменной etl_run_id значение id    
    RESULT=$(echo "SELECT detail.start_etl_run_f($etl_id, $step_num)" | PGPASSWORD=$pgpswd psql -d $db)
    array=($RESULT)
    etl_run=${array[2]:0:100}
    echo "etl_run_id:  "$etl_run
# вызов процесса окончания заполнения таблицы etl_run
    PGPASSWORD=$pgpswd psql -d mydb -c "call detail.finish_etl_run($etl_run)"
# 2. Очистка слоя stage перед загрузкой туда новых данных
    step_num=2
# вызов процесса начала заполнения таблицы etl_run и придание переменной etl_run_id значение id
    RESULT=$(echo "SELECT detail.start_etl_run_f($etl_id, $step_num)" | PGPASSWORD=$pgpswd psql -d $db)
    array=($RESULT)
    etl_run=${array[2]:0:100}    
    PGPASSWORD=$pgpswd psql -d mydb -c "TRUNCATE $table_name;" 
    echo "etl_run_id:  "$etl_run
# проверка выполнения очистки
    RESULT=$(echo "select count(*) from $table_name" | PGPASSWORD=$pgpswd psql -d $db)
    array=($RESULT)
    str_cnt=${array[2]:0:100}
    echo $str_cnt
    if [ $str_cnt == 0 ]
        then
# вызов процесса окончания заполнения таблицы etl_run
        PGPASSWORD=$pgpswd psql -d mydb -c "call detail.finish_etl_run($etl_run)"
        echo "--Слой stage очищен и готов к загрузке новых данных--"
# 3. Загрузка данных из csv файла в слой stage
        step_num=3
# вызов процесса начала заполнения таблицы etl_run и придание переменной etl_run_id значение id
        RESULT=$(echo "SELECT detail.start_etl_run_f($etl_id, $step_num)" | PGPASSWORD=$pgpswd psql -d $db)
        array=($RESULT)
        etl_run=${array[2]} 
        echo "etl_run_id:  "$etl_run           
        PGPASSWORD=$pgpswd psql -d mydb -c "\COPY $table_name($fields) FROM '$local_path/etl_sql_functions_postgresql/etl_files/$csv' WITH (FORMAT CSV, HEADER);" 
# проверка выполнения копирования
        RESULT=$(echo "select count(*) from $table_name" | PGPASSWORD=$pgpswd psql -d $db)
        array=($RESULT)
        str_cnt=${array[2]}
        RESULT=$(wc -l $local_path"/etl_sql_functions_postgresql/etl_files/$csv")
        array=($RESULT)
        str_cnt_csv=${array[0]}
        let "str_cnt_csv = $str_cnt_csv-1"
        if [ $str_cnt == $str_cnt_csv ]
            then
# вызов процесса окончания заполнения таблицы etl_run
            PGPASSWORD=$pgpswd psql -d mydb -c "call detail.finish_etl_run($etl_run)"
            echo "--Данные скопирваны в stage--"
            echo "--Скопировано $str_cnt строк"
            else
            echo "При копировании возникла ошибка"
        fi

        else
        echo "Не удалось очистить слой stage"
    fi
echo '=========================================================='
