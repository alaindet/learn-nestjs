docker exec some-mariadb sh -c 'exec mysqldump --all-databases -uroot -p"$MARIADB_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql
