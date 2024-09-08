package controllers

import (
	"net/http"
	"savings-backend/models"

	"github.com/gin-gonic/gin"
)

func CreateCreditCardExpense(c *gin.Context) {
	var expense models.CreditCardExpense
	if err := c.ShouldBindJSON(&expense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&expense)
	c.JSON(http.StatusOK, expense)
}

func GetCreditCardExpenses(c *gin.Context) {
	var expenses []models.CreditCardExpense
	if err := models.DB.Where("deleted_at IS NULL").Find(&expenses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, expenses)
}
