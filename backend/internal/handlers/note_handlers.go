// internal/handlers/note_handlers.go
package handlers

import (
	"net/http"
	"strconv"

	"noteApp-backend/internal/models"
	"noteApp-backend/internal/services"

	"github.com/gin-gonic/gin"
)

type NoteHandler struct {
	noteService *services.NoteService
}

func NewNoteHandler(noteService *services.NoteService) *NoteHandler {
	return &NoteHandler{noteService: noteService}
}

// @Summary Get all notes
// @Description Get all notes with their tags
// @Tags notes
// @Accept json
// @Produce json
// @Success 200 {array} models.NoteResponse
// @Router /api/notes [get]
func (h *NoteHandler) GetNotes(c *gin.Context) {
	search := c.Query("search")

	var notes []models.NoteResponse
	var err error

	if search != "" {
		notes, err = h.noteService.SearchNotes(search)
	} else {
		notes, err = h.noteService.GetAllNotes()
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch notes",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    notes,
	})
}

// @Summary Get note by ID
// @Description Get a single note by its ID
// @Tags notes
// @Accept json
// @Produce json
// @Param id path int true "Note ID"
// @Success 200 {object} models.NoteResponse
// @Router /api/notes/{id} [get]
func (h *NoteHandler) GetNote(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid note ID",
		})
		return
	}

	note, err := h.noteService.GetNoteByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Note not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    note,
	})
}

// @Summary Create new note
// @Description Create a new note
// @Tags notes
// @Accept json
// @Produce json
// @Param note body models.CreateNoteRequest true "Create note"
// @Success 201 {object} models.NoteResponse
// @Router /api/notes [post]
func (h *NoteHandler) CreateNote(c *gin.Context) {
	var req models.CreateNoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request data",
			"message": err.Error(),
		})
		return
	}

	note, err := h.noteService.CreateNote(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create note",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"data":    note,
	})
}

// @Summary Update note
// @Description Update an existing note
// @Tags notes
// @Accept json
// @Produce json
// @Param id path int true "Note ID"
// @Param note body models.UpdateNoteRequest true "Update note"
// @Success 200 {object} models.NoteResponse
// @Router /api/notes/{id} [put]
func (h *NoteHandler) UpdateNote(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid note ID",
		})
		return
	}

	var req models.UpdateNoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid request data",
			"message": err.Error(),
		})
		return
	}

	note, err := h.noteService.UpdateNote(uint(id), &req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to update note",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    note,
	})
}

// @Summary Delete note
// @Description Delete a note by ID
// @Tags notes
// @Accept json
// @Produce json
// @Param id path int true "Note ID"
// @Success 200 {string} string "Note deleted successfully"
// @Router /api/notes/{id} [delete]
func (h *NoteHandler) DeleteNote(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid note ID",
		})
		return
	}

	err = h.noteService.DeleteNote(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to delete note",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Note deleted successfully",
	})
}

// Tag Handlers
func (h *NoteHandler) GetTags(c *gin.Context) {
	tags, err := h.noteService.GetAllTags()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch tags",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    tags,
	})
}

func (h *NoteHandler) CreateTag(c *gin.Context) {
	var req models.CreateTagRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data",
		})
		return
	}

	tag, err := h.noteService.CreateTag(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create tag",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"data":    tag,
	})
}

func (h *NoteHandler) DeleteTag(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid tag ID",
		})
		return
	}

	err = h.noteService.DeleteTag(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete tag",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Tag deleted successfully",
	})
}

// Stats Handler
func (h *NoteHandler) GetStats(c *gin.Context) {
	stats, err := h.noteService.GetStats()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to fetch stats",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    stats,
	})
}
