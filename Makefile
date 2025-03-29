# このファイルは不完全かつ未使用です。

include .env

# Dockerイメージのビルド
build:
	docker build --no-cache -t odoo-downloading:latest .
# Dockerコンテナの作成
create:
	docker create --name odoo-downloading odoo-downloading:latest
# Dockerコンテナの起動
run:
	docker run -d --name odoo-downloading odoo-downloading:latest
# Dockerコンテナの開始
start:
	docker start odoo-downloading
# Dockerコンテナの停止
stop:
	docker stop odoo-downloading
# Dockerコンテナの削除
rm:
	docker rm odoo-downloading
# Dockerイメージの削除
rmi:
	docker rmi odoo-downloading-image
cp-odoo17e:
	cp ./downloads/odoo_17.0+e.latest.tar.gz $(ODOO17E_PATH)
cp-odoo18e:
	cp ./downloads/odoo_18.0+e.latest.tar.gz $(ODOO18E_PATH)