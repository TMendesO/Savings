package controllers

import (
	"net/http"
	"savings-backend/models"

	"github.com/gin-gonic/gin"
)

func CreateWishItem(c *gin.Context) {
	var item models.WishItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&item)
	c.JSON(http.StatusOK, item)
}

func GetWishItems(c *gin.Context) {
	var items []models.WishItem
	models.DB.Find(&items)
	c.JSON(http.StatusOK, items)
}
