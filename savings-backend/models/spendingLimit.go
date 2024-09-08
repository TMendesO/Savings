package models

import "gorm.io/gorm"

type SpendingLimit struct {
	gorm.Model
	Category string  `json:"category"`
	Amount   float64 `json:"amount"`
	Period   string  `json:"period"`
}
