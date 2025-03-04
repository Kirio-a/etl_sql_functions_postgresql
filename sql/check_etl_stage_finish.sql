 select status = 'finished' from detail.etl_run
 where id = (
 select max(id) from detail.etl_run
 where etl_id = 19 and step_num = 3
 group by etl_id, step_num);
