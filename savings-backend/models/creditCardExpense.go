package models

import "gorm.io/gorm"

type CreditCardExpense struct {
	gorm.Model
	Bank       string  `json:"bank"`
	Limit      float64 `json:"limit"`
	Expiration string  `json:"expiration"`
	Value      float64 `json:"value"`
	Balance    float64 `json:"balance"`
}
