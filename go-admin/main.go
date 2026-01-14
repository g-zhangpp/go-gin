package main

import "go-admin/router"
import "go-admin/models"

func main() {
	// 初始化数据库
	models.NewGormDB()

	r := router.App()
	r.Run()
}
