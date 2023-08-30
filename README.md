# run DataBase Server (Docker)
```sh
sudo docker run --name bread -e MYSQL_ROOT_PASSWORD=admin -p 3306:3306 mysql:latest # && sudo docker rm -f bread
```
