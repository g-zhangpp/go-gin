package models

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func NewGormDB() {
	dns := `root:root123@tcp(192.168.21.33:3306)/go_admin?charset=utf8mb4&parseTime=True&loc=Local`
	db, err := gorm.Open(mysql.Open(dns), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		panic(err)
	}
	DB = db
}
