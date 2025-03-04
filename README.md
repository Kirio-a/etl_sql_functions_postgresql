# etl_sql_functions_postgresql
===================================================================

ETL процесс справочника SQL-функций в Postgres

Структура проекта
-------------------------------------------------------------------
bin/
  |source.sh
  
sql/
  |my...
  |fulling...

config/
  |
  
etl/
  |
  
log/



    - Описание каждого файла
    - История
    - Как пользоватся
    - Примеры исползования
    - Как добавить новую ETL




Сделать!!!
--------------------------------------------------------------------
2. организовать etl, распихать по папкам, например для таблицы my_table1
./my_etl_app/
  + config/
  | + target1.conf
  | + source1.conf
  | + sql/
  | | + my_table1.insert.sql
  | | + my_table1.select.sql
  | | + my_table1.stat.sql
  | + bin/
  | | + source1.receiver.sh 
  | | + tartget1.sender.sh 
  | | + tartget1.sender.sh 
  | | + etl_my_table1.sh 
  | | + logger.sh
  | + log/
  | | + process.log

4. Добавить запись каждого шага в файл лога, с датой
    * записью в лог занимается файл logger.sh
    * на вход принимает 3 параметра
        - название таблицы
        - тип сообщения
        - текст сообщения
Пример записи
2023-01-27 19:46:57,789 - my_table1 - WARNING - This is a warning message
2023-01-27 19:46:57,789 - my_table1 - ERROR - An error occurred with the following message: 

5. Добавить интерфейс обращения к источнику и получателю
    - файл source1.reciver.sh - это обращение к источнику
        на вход принимает только команду sql
        вовзращает весь результат
        потом этот результат можно перенаправить куда угодно, оператором >
    - файл target1.reciver.sh - это обращение к получателю
        на вход принимает только команду sql
        вовзращает весь результат
        потом этот результат можно перенаправить куда угодно, оператором >
    - файл target1.sender.sh - это обращение к получателю
        на вход принимает команду sql, такую как insert
        и так-же на вход принимает поток stdin
        вовзращает стандартный код 0 - все хорошо, любой другой код - ошибка, 1 - ошибк
        в поток stderror пишет сообщение об ошибке, если код возврата был 1
6. Добавить файл readme.md
    * в формате MarkDown с разделами
    - Структура
    - Описание каждого файла
    - История
    - Как пользоватся
    - Примеры исползования
    - Как добавить новую ETL
    
Название проекта
========================

Раздел, название главы или секции
------------------------

### Заголовок 3го уровня

* Маркированный список 1
* Маркированный список 2
* Маркированный список 3
