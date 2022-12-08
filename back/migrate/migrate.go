package main

import (
	"appback/config"
	"appback/models"
)

func main() {
	config.ConnectToDb()

	config.DB.AutoMigrate(&models.User{}, &models.Article{})

}
