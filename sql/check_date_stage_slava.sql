select date_part('day', loaded_dttm) = date_part('day', now()) 
from stage.sql_functions_slava 
limit 1;
