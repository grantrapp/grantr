install:
	@echo "Installing"
	@echo "Backend"
	cd backend && pnpm install
	@echo "Frontend"
	cd frontend && pnpm install
	@echo "Starting Redis"
	docker-compose up -d
	@echo "Done! NGGYU"

web:
	@echo "Starting web"
	cd frontend; pnpm dev

server:
	@echo "Starting server"
	cd backend; pnpm dev