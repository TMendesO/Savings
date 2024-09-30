package controllers

import (
	"net/http"
	"savings-backend/models"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan interface{})
var mutex = &sync.Mutex{}

var wsUpgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func WebSocketHandler(c *gin.Context) {
	ws, err := wsUpgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to set WebSocket upgrade"})
		return
	}
	defer ws.Close()

	mutex.Lock()
	clients[ws] = true
	mutex.Unlock()

	for {
		var msg interface{}
		err := ws.ReadJSON(&msg)
		if err != nil {
			mutex.Lock()
			delete(clients, ws)
			mutex.Unlock()
			break
		}
	}
}

func CreateTransaction(c *gin.Context) {
	var transaction models.Transaction

	if err := c.ShouldBindJSON(&transaction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	models.DB.Create(&transaction)
	broadcast <- gin.H{"action": "create", "transaction": transaction}
	c.JSON(http.StatusOK, transaction)
}

func GetTransactions(c *gin.Context) {
	var transactions []models.Transaction
	models.DB.Find(&transactions)

	// Cálculo dos limites e valores acumulados
	income := 1000.0 // Substitua pelo valor real da renda líquida
	essentialsLimit, goalsLimit, wishesLimit := models.CalculateMonthlyLimits(income)
	totalGoals, totalWishes := models.CalculateAccumulatedValues(transactions)

	c.JSON(http.StatusOK, gin.H{
		"transactions": transactions,
		"limits": gin.H{
			"essentials": essentialsLimit,
			"goals":      goalsLimit,
			"wishes":     wishesLimit,
		},
		"accumulated": gin.H{
			"totalGoals":  totalGoals,
			"totalWishes": totalWishes,
		},
	})
}

func DeleteTransaction(c *gin.Context) {
	var transaction models.Transaction
	id := c.Param("id")

	if err := models.DB.Where("id = ?", id).First(&transaction).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "transaction not found"})
		return
	}

	if err := models.DB.Delete(&transaction).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	broadcast <- gin.H{"action": "delete", "transaction": transaction}
	c.JSON(http.StatusOK, gin.H{"message": "transaction deleted successfully"})
}
