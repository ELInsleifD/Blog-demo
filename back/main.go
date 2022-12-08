package main

import (
	"appback/config"
	"appback/controllers"

	"github.com/gin-gonic/gin"
)

func main() {

	config.ConnectToDb()

	router := gin.Default()

	router.POST("/users/create", controllers.UsersCreate)
	router.GET("/users", controllers.UsersGet)
	router.POST("/articles/create", controllers.ArticlesCreate)
	router.GET("/articles", controllers.ArticlesGet)
	router.GET("/users/:id", controllers.UsersGetById)
	router.PUT("/users/:id", controllers.UserUpdate)
	router.DELETE("/users/:id", controllers.UserDelete)
	router.GET("/articles/:id", controllers.ArticlesGetById)
	router.PUT("/articles/:id", controllers.ArticleUpdate)
	router.DELETE("/articles/:id", controllers.ArticleDelete)
	router.POST("/users/login/", controllers.UserCheck)

	router.Run()
}
