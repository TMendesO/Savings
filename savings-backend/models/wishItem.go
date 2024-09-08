package models

import "gorm.io/gorm"

type WishItem struct {
	gorm.Model
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Priority    string  `json:"priority"`
}
