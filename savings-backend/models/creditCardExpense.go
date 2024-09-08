package models

import "gorm.io/gorm"

type CreditCardExpense struct {
	gorm.Model
	Amount      float64 `json:"amount"`
	Description string  `json:"description"`
	Date        string  `json:"date"`
	Status      string  `json:"status"`
}
