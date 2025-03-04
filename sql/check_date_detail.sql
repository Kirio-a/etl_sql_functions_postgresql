select count(id) 
from detail.function
where date_part('day', processed_dttm) = date_part('day', now()) and src_cd = '$src_cd';
