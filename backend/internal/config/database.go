// internal/config/database.go
package config

import (
	"log"

	"noteApp-backend/internal/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("notes.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		panic("Failed to connect to database!")
	}

	// Auto Migrate
	err = database.AutoMigrate(
		&models.Note{},
		&models.Tag{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	DB = database
	log.Println("Database connected successfully")
}

// Alternative untuk PostgreSQL
func ConnectPostgres() {
	// dsn := "host=localhost user=username password=password dbname=noteapp port=5432 sslmode=disable"
	// db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
}
