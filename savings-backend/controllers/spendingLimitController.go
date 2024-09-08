package controllers

import (
	"net/http"
	"savings-backend/models"

	"github.com/gin-gonic/gin"
)

func CreateSpendingLimit(c *gin.Context) {
	var limit models.SpendingLimit
	if err := c.ShouldBindJSON(&limit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&limit)
	c.JSON(http.StatusOK, limit)
}

func GetSpendingLimits(c *gin.Context) {
	var limits []models.SpendingLimit
	models.DB.Find(&limits)
	c.JSON(http.StatusOK, limits)
}
