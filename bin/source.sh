#!/usr/bin/env bash 
# Обращение к источнику mydb

sql_text="$1"
verbose="$2"
dd=$(dirname $0)
source "$dd/../config/.....sh"

if [ "$verbose" = "-v" ]; then
	>&2 echo "Выполнение script на сервере $..._host"
fi


