package controllers

import (
	"appback/config"
	"appback/models"

	"github.com/gin-gonic/gin"
)

func ArticlesCreate(c *gin.Context) {
	var body struct {
		Title   string
		Content string
		UserID  int
	}

	c.BindJSON(&body)

	article := models.Article{Title: body.Title, Content: body.Content, UserID: body.UserID}

	result := config.DB.Create(&article)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{"article": article})
}

func ArticlesGet(c *gin.Context) {
	var articles []models.Article
	config.DB.Raw("SELECT * FROM articles ORDER BY created_at DESC").Scan(&articles)
	c.JSON(200, gin.H{"articles": articles})
}

func ArticlesGetById(c *gin.Context) {
	id := c.Param("id")

	var article models.Article
	config.DB.First(&article, id)

	c.JSON(200, gin.H{"article": article})
}

func ArticleUpdate(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Title   string
		Content string
	}

	c.BindJSON(&body)

	var article models.Article
	config.DB.First(&article, id)

	config.DB.Model(&article).Updates(models.Article{
		Title:   body.Title,
		Content: body.Content,
	})

	c.JSON(200, gin.H{"article": article})
}

func ArticleDelete(c *gin.Context) {
	id := c.Param("id")

	config.DB.Unscoped().Delete(&models.Article{}, id)

	c.Status(200)
}
