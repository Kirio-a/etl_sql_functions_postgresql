select date_part('day', loaded_dttm) = date_part('day', now()) 
from stage.sql_functions 
limit 1;
