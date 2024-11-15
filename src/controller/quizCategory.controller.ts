import { Request, Response } from "express";
import {
  calculateUserScore,
  updateQuizCategory,
} from "../services/quizCategory.service";
import { generateQuestionsByType, getAllQuizCategoriesService, saveQuizScore } from "../services/quizCategory.service";


export const createQuizScore = async (req: Request, res: Response) => {
  const { score, name } = req.body;

  try {
    const newScore = await saveQuizScore(score, name);
    res.status(201).json(newScore);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Error saving score." });
    }
  }
};


export const getQuizQuestions = async (req: Request, res: Response) => {
  const { type, type_id } = req.params;
  
  const numericId = parseInt(type_id);
    if (isNaN(numericId)) {
        res.status(400).json({ error: 'The ID provided is not a valid number.' });
        return;
    }
  try {

    await generateQuestionsByType(type, numericId);
    res.json({ mesage: "quiz questions and answers created and saved" });
  } catch (error:unknown) {
    if (error instanceof Error) {
      if (error.message === 'Category not found') {
          res.status(404).json({ error: error.message });
      } else if (error.message === 'Module not found') {
          res.status(404).json({ error: error.message });
      } else if (error.message === 'Invalid type. Must be "category" or "module".') {
          res.status(400).json({ error: error.message });
      } else {
          res.status(500).json({ error: error.message });
      }
  } else {
      res.status(500).json({ error: 'There was an error generating the quiz.' });
  }
  }
};

export const getAllQuizCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllQuizCategoriesService();
    res.status(200).json(categories);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ error: 'Error getting quiz categories.' });
    }
  }
};

export const finishQuiz = async (req: Request, res: Response) => {
  const { userAnswers} = req.body;
  const { type, type_id } = req.params;
  const { user_id } = req;
  const numericId = parseInt(type_id);

  if(!user_id || isNaN(user_id)){
    res.status(400).json({ error: 'The user ID is invalid.' });
        return;
  }
  
    if (isNaN(numericId)) {
        res.status(400).json({ error: 'The ID provided is not a valid number.' });
        return;
    }
  if(!type_id || !userAnswers || !type || userAnswers.length === 0  ) {
      res.status(400).json ({ error: 'There is not enough data to complete the quiz.' });
  }

  try {
    const score = await calculateUserScore(type, numericId, userAnswers, user_id);
    

    res.json({ message: "Quiz finished", score });
  } catch (error) {
    console.error("Error calculating score:", error);
    res.status(500).json({ error: "There was an error calculating the score." });
  }
};

// Controlador para actualizar una categoría de quiz
export const updateQuizScore = async (req: Request, res: Response) => {
  const { quiz_id } = req.params; // Obtener quiz_id de los parámetros
  const { name, score } = req.body;

  try {
    const updatedCategory = await updateQuizCategory(Number(quiz_id), name, score);
    res.status(200).json(updatedCategory);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Error updating quiz category." });
    }
  }
};
