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

log-gateway-a:
	docker compose logs -f gateway-a

log-gateway-b:
	docker compose logs -f gateway-b

