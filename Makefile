off-clean:
	docker compose down -v
	
build:
	docker compose build

run: 
	docker compose up -d


run-logs:
	docker compose up

off:
	docker compose down

log-payment-db:
	docker compose logs -f payment-mysql

log-transaction-service:
	docker compose logs -f transaction-service

migrations: 
	docker compose exec transaction-service node ace migration:run

tests:
	docker exec -it transaction-service  node ace test

mocks: 
	docker run -p 3001:3001 -p 3002:3002 matheusprotzen/gateways-mock