#!/usr/bin/env bash

# Начало записи в etl_run
    RESULT=$(echo "SELECT detail.start_etl_run_f($etl_id, $step_num)" | PGPASSWORD=$pgpswd psql -d $db)
    array=($RESULT)
    etl_run_id=${array[2]:0:100}
    echo "-- Etl_run id: "$etl_run_id
# Загрузка из stage в detail
    PGPASSWORD=$pgpswd psql -d mydb -c "call detail.insert_$src()"
    PGPASSWORD=$pgpswd psql -d mydb -c "call detail.delete_$src()"
    PGPASSWORD=$pgpswd psql -d mydb -c "call detail.update_$src()"

# проверка выполнения загрузки по наличию сегоднешней даты в поле processed_dttm (не гарантирует выполнения всех операций)
RESULT=$(echo "select count(id) from detail.function
where date_part('day', processed_dttm) = date_part('day', now()) and src_cd = '$src_cd';" | PGPASSWORD=$pgpswd psql -d $db)
array=($RESULT)
check_today=${array[2]:0:100}
echo "-- Изменено строк: "$check_today
if [[ $check_today > 0 ]]
    then 
    
# Конец записи в etl_run
    PGPASSWORD=$pgpswd psql -d mydb -c "call detail.finish_etl_run($etl_run_id)"
# Заполнение таблицы dq
    PGPASSWORD=$pgpswd psql -d mydb -c "call detail.filling_dq($etl_run_id)"

    echo "Загрузка завершена"
    else
    echo "Данные не были загружены в stage"
fi

echo 'done'
echo "============================================================="



