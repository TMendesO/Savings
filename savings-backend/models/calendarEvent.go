package models

import "gorm.io/gorm"

type CalendarEvent struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
}
