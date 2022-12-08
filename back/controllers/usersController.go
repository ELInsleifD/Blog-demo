package controllers

import (
	"appback/config"
	"appback/models"

	"github.com/gin-gonic/gin"
)

func UsersCreate(c *gin.Context) {

	var body struct {
		Name     string
		Password string
		Email    string
	}

	c.BindJSON(&body)

	user := models.User{Name: body.Name, Password: body.Password, Email: body.Email}

	result := config.DB.Create(&user)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{"user": user})
}

func UsersGet(c *gin.Context) {
	var users []models.User
	config.DB.Find(&users)

	c.JSON(200, gin.H{"users": users})
}

func UsersGetById(c *gin.Context) {
	id := c.Param("id")

	var user models.User
	config.DB.First(&user, id)

	c.JSON(200, gin.H{"user": user})
}

func UserUpdate(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Name     string
		Password string
		Email    string
	}

	c.BindJSON(&body)

	var user models.User
	config.DB.First(&user, id)

	config.DB.Model(&user).Updates(models.User{
		Name:     body.Name,
		Password: body.Password,
		Email:    body.Email,
	})

	c.JSON(200, gin.H{"user": user})
}

func UserDelete(c *gin.Context) {
	id := c.Param("id")

	config.DB.Delete(&models.User{}, id)

	c.Status(200)
}

func UserCheck(c *gin.Context) {

	var body struct {
		Email    string
		Password string
	}
	c.BindJSON(&body)

	var user models.User
	config.DB.First(&user, body.Email)

	result := config.DB.First(&user, "email = ?", body.Email)
	if result.Error != nil {
		c.JSON(400, gin.H{"status": "fail", "message": "Invalid email or Password"})
		return
	}

	if err := verify(user.Password, body.Password); err == false {
		c.JSON(400, gin.H{"status": "fail", "message": "Invalid email or Password"})
		return
	}

	c.JSON(200, gin.H{"userid": user.ID})

}
func verify(pas1, pas2 string) bool {
	err := pas1 == pas2
	return err
}
