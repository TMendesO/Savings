package main

import (
	"log"
	"net/http"
	"savings-backend/models"
	"savings-backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Configurar CORS para permitir requisições do frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	models.ConnectDatabase()

	routes.SetupRoutes(r)

	log.Fatal(http.ListenAndServe(":8080", r))
}
