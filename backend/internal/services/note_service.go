// internal/services/note_service.go
package services

import (
	"errors"
	"noteApp-backend/internal/models"
	"noteApp-backend/internal/repository"
)

type NoteService struct {
	noteRepo *repository.NoteRepository
}

func NewNoteService(noteRepo *repository.NoteRepository) *NoteService {
	return &NoteService{noteRepo: noteRepo}
}

func (s *NoteService) GetAllNotes() ([]models.NoteResponse, error) {
	notes, err := s.noteRepo.GetAllNotes()
	if err != nil {
		return nil, err
	}

	var response []models.NoteResponse
	for _, note := range notes {
		response = append(response, models.NoteResponse{
			ID:        note.ID,
			Title:     note.Title,
			Content:   note.Content,
			Tags:      note.Tags,
			CreatedAt: note.CreatedAt,
			UpdatedAt: note.UpdatedAt,
		})
	}

	return response, nil
}

func (s *NoteService) GetNoteByID(id uint) (*models.NoteResponse, error) {
	note, err := s.noteRepo.GetNoteByID(id)
	if err != nil {
		return nil, err
	}

	response := &models.NoteResponse{
		ID:        note.ID,
		Title:     note.Title,
		Content:   note.Content,
		Tags:      note.Tags,
		CreatedAt: note.CreatedAt,
		UpdatedAt: note.UpdatedAt,
	}

	return response, nil
}

func (s *NoteService) CreateNote(req *models.CreateNoteRequest) (*models.NoteResponse, error) {
	if req.Title == "" {
		return nil, errors.New("title is required")
	}

	note := &models.Note{
		Title:   req.Title,
		Content: req.Content,
	}

	// Handle tags if provided
	if len(req.TagIDs) > 0 {
		var tags []models.Tag
		for _, tagID := range req.TagIDs {
			tags = append(tags, models.Tag{ID: tagID})
		}
		note.Tags = tags
	}

	err := s.noteRepo.CreateNote(note)
	if err != nil {
		return nil, err
	}

	// Fetch the created note with tags
	createdNote, err := s.noteRepo.GetNoteByID(note.ID)
	if err != nil {
		return nil, err
	}

	response := &models.NoteResponse{
		ID:        createdNote.ID,
		Title:     createdNote.Title,
		Content:   createdNote.Content,
		Tags:      createdNote.Tags,
		CreatedAt: createdNote.CreatedAt,
		UpdatedAt: createdNote.UpdatedAt,
	}

	return response, nil
}

func (s *NoteService) UpdateNote(id uint, req *models.UpdateNoteRequest) (*models.NoteResponse, error) {
	note, err := s.noteRepo.GetNoteByID(id)
	if err != nil {
		return nil, err
	}

	// Update fields
	if req.Title != "" {
		note.Title = req.Title
	}
	note.Content = req.Content

	// Update tags if provided
	if req.TagIDs != nil {
		var tags []models.Tag
		for _, tagID := range req.TagIDs {
			tags = append(tags, models.Tag{ID: tagID})
		}
		note.Tags = tags
	}

	err = s.noteRepo.UpdateNote(note)
	if err != nil {
		return nil, err
	}

	response := &models.NoteResponse{
		ID:        note.ID,
		Title:     note.Title,
		Content:   note.Content,
		Tags:      note.Tags,
		CreatedAt: note.CreatedAt,
		UpdatedAt: note.UpdatedAt,
	}

	return response, nil
}

func (s *NoteService) DeleteNote(id uint) error {
	_, err := s.noteRepo.GetNoteByID(id)
	if err != nil {
		return err
	}

	return s.noteRepo.DeleteNote(id)
}

func (s *NoteService) SearchNotes(query string) ([]models.NoteResponse, error) {
	notes, err := s.noteRepo.SearchNotes(query)
	if err != nil {
		return nil, err
	}

	var response []models.NoteResponse
	for _, note := range notes {
		response = append(response, models.NoteResponse{
			ID:        note.ID,
			Title:     note.Title,
			Content:   note.Content,
			Tags:      note.Tags,
			CreatedAt: note.CreatedAt,
			UpdatedAt: note.UpdatedAt,
		})
	}

	return response, nil
}

// Tag Services
func (s *NoteService) GetAllTags() ([]models.Tag, error) {
	return s.noteRepo.GetAllTags()
}

func (s *NoteService) CreateTag(req *models.CreateTagRequest) (*models.Tag, error) {
	if req.Name == "" {
		return nil, errors.New("tag name is required")
	}

	tag := &models.Tag{
		Name:  req.Name,
		Color: req.Color,
	}

	if tag.Color == "" {
		tag.Color = "#3B82F6" // Default blue color
	}

	err := s.noteRepo.CreateTag(tag)
	if err != nil {
		return nil, err
	}

	return tag, nil
}

func (s *NoteService) DeleteTag(id uint) error {
	return s.noteRepo.DeleteTag(id)
}

func (s *NoteService) GetStats() (*models.StatsResponse, error) {
	return s.noteRepo.GetStats()
}
