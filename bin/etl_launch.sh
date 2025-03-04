#!/usr/bin/env bash

echo 'start'

dt=$(date -u +%Y-%m-%d)
# Пароль от БД
pgpswd=""
# Директория для загрузки файлов csv : /home/kirio/study/bash/etl_files
local_path=""

echo $dt

source "$local_path/bin/launch_stage.sh"
source "$local_path/bin/launch_detail.sh"

echo 'done'
echo "============================================================="
