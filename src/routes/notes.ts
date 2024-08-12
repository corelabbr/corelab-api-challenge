import express from "express";
import Note from "../models/Note";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

router.get("/:text", async (req, res) => {
  try {
    const searchText = req.params.text;

    const regex = new RegExp(searchText, "i");

    const notes = await Note.find({
      $or: [{ text: regex }, { title: regex }],
    });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    text: req.body.text,
    isFavorite: req.body.isFavorite,
    color: req.body.color,
  });

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (req.body.title != undefined) {
      note.title = req.body.title;
    }
    if (req.body.text != undefined) {
      note.text = req.body.text;
    }
    if (req.body.isFavorite != undefined) {
      note.isFavorite = req.body.isFavorite;
    }
    if (req.body.color != undefined) {
      note.color = req.body.color;
    }

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

export default router;
