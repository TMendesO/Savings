package models

import "gorm.io/gorm"

type Transaction struct {
	gorm.Model
	Amount      float64 `json:"amount"`
	Description string  `json:"description"`
	Date        string  `json:"date"`
	Type        string  `json:"type"`
	Status      string  `json:"status"`
}

func CalculateMonthlyLimits(income float64) (float64, float64, float64) {
	essentialsLimit := income * 0.50
	goalsLimit := income * 0.30
	wishesLimit := income * 0.20
	return essentialsLimit, goalsLimit, wishesLimit
}

func CalculateAccumulatedValues(transactions []Transaction) (float64, float64) {
	var totalGoals, totalWishes float64
	for _, transaction := range transactions {
		if transaction.Type == "in" {
			totalGoals += transaction.Amount
		} else if transaction.Type == "out" {
			totalWishes += transaction.Amount
		}
	}
	return totalGoals, totalWishes
}
