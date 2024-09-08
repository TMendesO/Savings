package controllers

import (
	"fmt"
	"net/http"
	"savings-backend/models"

	"github.com/gin-gonic/gin"
)

var transaction models.Transaction

func CreateTransaction(c *gin.Context) {

	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&transaction)
	c.JSON(http.StatusOK, transaction)
}

func GetTransactions(c *gin.Context) {
	fmt.Println("hello word")
	var transactions []models.Transaction
	models.DB.Find(&transactions)
	c.JSON(http.StatusOK, transactions)
}
