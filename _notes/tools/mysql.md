---
title: MySQL/MariaDB
---

Access monitor:

```shell
mysql -u [username] -p
```

Show all databases:

```sql
show databases;
```

Create new database:

```sql
create database [database];
```

Create new user:

```sql
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON db.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

Create a table:

```sql
CREATE TABLE admin
(
id INT(10) unsigned NOT NULL,
password VARCHAR(120) NOT NULL,
registerTime DATETIME,
PRIMARY KEY (id)
);
```

Insert a record:

```sql
INSERT INTO book (name, publishTime) VALUES ('黑客与画家', NOW());
```

Adding a column:

```sql
ALTER TABLE book ADD COLUMN author VARCHAR(120);
```

Update records:

```sql
UPDATE book SET author = 'Paul Graham' WHERE name = '黑客与画家';
```

Thanks:

[My simply MySQL Command Line Cheatsheet](https://gist.github.com/hofmannsven/9164408)
