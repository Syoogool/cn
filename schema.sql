drop table if exists entries;
-- 创建数据库模式：表中每行包含一个id(主键),title,text(非空)
create table entries(
id integer primary key autoincrement,
title string not null,
text string not null,
);
