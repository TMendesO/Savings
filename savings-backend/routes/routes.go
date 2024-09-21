package routes

import (
	"savings-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	router.POST("/transactions", controllers.CreateTransaction)
	router.GET("/transactions", controllers.GetTransactions)
	router.DELETE("/transactions/:id", controllers.DeleteTransaction)
	router.POST("/calendar", controllers.CreateCalendarEvent)
	router.GET("/calendar", controllers.GetCalendarEvents)
	router.POST("/financial-goals", controllers.CreateFinancialGoal)
	router.GET("/financial-goals", controllers.GetFinancialGoals)
	router.POST("/credit-card", controllers.CreateCreditCardExpense)
	router.GET("/credit-card", controllers.GetCreditCardExpenses)
	router.POST("/spending-limit", controllers.CreateSpendingLimit)
	router.GET("/spending-limit", controllers.GetSpendingLimits)
	router.POST("/wish-list", controllers.CreateWishItem)
	router.GET("/wish-list", controllers.GetWishItems)
}
