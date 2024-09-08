package models

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=postgres password=senha123 dbname=savings port=5432 sslmode=disable"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database!", err)
	}

	database.AutoMigrate(&Transaction{}, &CalendarEvent{}, &CreditCardExpense{}, &FinancialGoal{}, &SpendingLimit{}, &WishItem{})

	DB = database
}
