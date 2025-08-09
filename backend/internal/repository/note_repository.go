// internal/repository/note_repository.go
package repository

import (
	"noteApp-backend/internal/models"
	"time"

	"gorm.io/gorm"
)

type NoteRepository struct {
	db *gorm.DB
}

func NewNoteRepository(db *gorm.DB) *NoteRepository {
	return &NoteRepository{db: db}
}

func (r *NoteRepository) GetAllNotes() ([]models.Note, error) {
	var notes []models.Note
	err := r.db.Preload("Tags").Find(&notes).Error
	return notes, err
}

func (r *NoteRepository) GetNoteByID(id uint) (*models.Note, error) {
	var note models.Note
	err := r.db.Preload("Tags").First(&note, id).Error
	if err != nil {
		return nil, err
	}
	return &note, nil
}

func (r *NoteRepository) CreateNote(note *models.Note) error {
	return r.db.Create(note).Error
}

func (r *NoteRepository) UpdateNote(note *models.Note) error {
	return r.db.Session(&gorm.Session{FullSaveAssociations: true}).Save(note).Error
}

func (r *NoteRepository) DeleteNote(id uint) error {
	return r.db.Delete(&models.Note{}, id).Error
}

func (r *NoteRepository) SearchNotes(query string) ([]models.Note, error) {
	var notes []models.Note
	err := r.db.Preload("Tags").Where("title LIKE ? OR content LIKE ?", "%"+query+"%", "%"+query+"%").Find(&notes).Error
	return notes, err
}

// Tag Repository Methods
func (r *NoteRepository) GetAllTags() ([]models.Tag, error) {
	var tags []models.Tag
	err := r.db.Find(&tags).Error
	return tags, err
}

func (r *NoteRepository) CreateTag(tag *models.Tag) error {
	return r.db.Create(tag).Error
}

func (r *NoteRepository) DeleteTag(id uint) error {
	return r.db.Delete(&models.Tag{}, id).Error
}

func (r *NoteRepository) GetNotesByTag(tagID uint) ([]models.Note, error) {
	var notes []models.Note
	err := r.db.Preload("Tags").
		Joins("JOIN note_tags ON notes.id = note_tags.note_id").
		Where("note_tags.tag_id = ?", tagID).
		Find(&notes).Error
	return notes, err
}

// Stats Methods
func (r *NoteRepository) GetStats() (*models.StatsResponse, error) {
	var stats models.StatsResponse

	// Total notes
	r.db.Model(&models.Note{}).Count(&stats.TotalNotes)

	// Total tags
	r.db.Model(&models.Tag{}).Count(&stats.TotalTags)

	// Notes today
	today := time.Now().Format("2006-01-02")
	r.db.Model(&models.Note{}).Where("DATE(created_at) = ?", today).Count(&stats.NotesToday)

	// Notes this week
	weekAgo := time.Now().AddDate(0, 0, -7)
	r.db.Model(&models.Note{}).Where("created_at >= ?", weekAgo).Count(&stats.NotesThisWeek)

	return &stats, nil
}
