package models

import "gorm.io/gorm"

type WishItem struct {
	gorm.Model
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Priority    int     `json:"priority"`
}

func AllocateWishes(wishes []WishItem, total float64) map[int]float64 {
	allocation := make(map[int]float64)
	totalPriority := 0

	for _, wish := range wishes {
		totalPriority += wish.Priority
	}

	for _, wish := range wishes {
		allocation[int(wish.ID)] = (float64(wish.Priority) / float64(totalPriority)) * total
	}
	return allocation
}
