// internal/models/note.go
package models

import (
	"time"

	"gorm.io/gorm"
)

type Note struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Title     string         `json:"title" gorm:"not null"`
	Content   string         `json:"content" gorm:"type:text"`
	Tags      []Tag          `json:"tags" gorm:"many2many:note_tags;"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

type Tag struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	Name  string `json:"name" gorm:"unique;not null"`
	Color string `json:"color" gorm:"default:'#3B82F6'"`
	Notes []Note `json:"notes,omitempty" gorm:"many2many:note_tags;"`
}

type NoteResponse struct {
	ID        uint      `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Tags      []Tag     `json:"tags"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateNoteRequest struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content"`
	TagIDs  []uint `json:"tag_ids,omitempty"`
}

type UpdateNoteRequest struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	TagIDs  []uint `json:"tag_ids,omitempty"`
}

type CreateTagRequest struct {
	Name  string `json:"name" binding:"required"`
	Color string `json:"color"`
}

type StatsResponse struct {
	TotalNotes    int64 `json:"total_notes"`
	TotalTags     int64 `json:"total_tags"`
	NotesToday    int64 `json:"notes_today"`
	NotesThisWeek int64 `json:"notes_this_week"`
}
