package controllers

import (
	"net/http"
	"savings-backend/models"

	"github.com/gin-gonic/gin"
)

func CreateFinancialGoal(c *gin.Context) {
	var goal models.FinancialGoal
	if err := c.ShouldBindJSON(&goal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&goal)
	c.JSON(http.StatusOK, goal)
}

func GetFinancialGoals(c *gin.Context) {
	var goals []models.FinancialGoal
	models.DB.Find(&goals)
	c.JSON(http.StatusOK, goals)
}
