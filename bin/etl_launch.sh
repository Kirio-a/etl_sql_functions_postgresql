#!/usr/bin/env bash

echo 'start'

dt=$(date -u +%Y-%m-%d)
# Название БД
db=""
# Пароль от БД
pgpswd=""
# Директория для загрузки файлов csv : /home/kirio/study/bash/etl_files
local_path=""

echo $dt

source "$local_path/etl_sql_functions_postgresql/bin/launch_stage.sh"
source "$local_path/etl_sql_functions_postgresql/bin/launch_detail.sh"

echo 'done'
echo "============================================================="
