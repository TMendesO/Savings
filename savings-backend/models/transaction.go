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
