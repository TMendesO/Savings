package controllers

import (
	"net/http"
	"savings-backend/models"

	"github.com/gin-gonic/gin"
)

func CreateCalendarEvent(c *gin.Context) {
	var event models.CalendarEvent
	if err := c.ShouldBindJSON(&event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&event)
	c.JSON(http.StatusOK, event)
}

func GetCalendarEvents(c *gin.Context) {
	var events []models.CalendarEvent
	models.DB.Find(&events)
	c.JSON(http.StatusOK, events)
}
