# etl_sql_functions_postgresql
===================================================================

ETL процесс справочника SQL-функций в Postgres

Структура проекта
-------------------------------------------------------------------
bin/
    |source.sh                            - 
    |etl_launch.sh                        - запуск etl-процесса
    |launch_detail.sh                     - исполняемый файл начала загрузки данных в слой detail
    |detail.sh                            - исполняемый файл загрузки данных в слой detail
    |launch_stage.sh                      - исполняемый файл начала загрузки данных в слой stage
    |stage.sh                             - исполняемый файл загрузки данных в слой stage
    
sql/
    |check_date_detail.sql                - скрипт проверки наличия изменений в слое detail по дате
    |check_date_stage_alena.sql           - скрипт проверки актуальности etl в слое stage по дате для источника alena
    |check_date_stage_kirill.sql          - скрипт проверки актуальности etl в слое stage по дате для источника kirill
    |check_date_stage_slava.sql           - скрипт проверки актуальности etl в слое stage по дате для источника slava

config/
    |

etl/
    |

log/
    |

db_create/                               - создание базы данных
    |create_files/                       - файлы csv для заполнения таблиц бд слоя stage
    |  | Functions_SQL_Slava.csv         - файл csv для заполнения таблицы sql_functions_slava
    |  | S2T.csv                         - файл csv для заполнения таблицы s2t
    |  | SQL_functions.csv               - файл csv для заполнения таблицы sql_functions
    |  | SQL note ALENA.csv              - файл csv для заполнения таблицы sql_functions_alena
    |sql/
    |  | create_db.txt                   - скрипт для создания всех таблиц слоев stage и detail
    |  | create_procedures.txt           - скрипт для создания всех процедур и функций
    |S2T.xlsx                            - s2t
    |Структура данных.docs               - структура данных

etl_files/                               - папка приема новой порции данных для etl-процесса
    |Functions_SQL_Slava(Для ИЗ).csv     - файл от источника Slava
    |SQL_note(для ИЗ).csv                - файл от источника Kirill
    |SQL note ALENA(для ИЗ).csv          - файл от источника Alena

prev_etl_files/
    |


Инструкция:
--------------------------------------------------------------------
1. Развертывание базы данных.
    - выполнить скрипт db_create/sql/create_db.sql





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
