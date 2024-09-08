package models

import "gorm.io/gorm"

type FinancialGoal struct {
	gorm.Model
	Title      string  `json:"title"`
	Amount     float64 `json:"amount"`
	TargetDate string  `json:"target_date"`
}
