const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { findById, findByIdAndUpdate } = require("../models/User");

//ROUTE 1 = get all the notes

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal error occured");
  }
});

//ROURE 2   adding the new note using the post /addnote - login required

router.post("/addnote", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const note = new Note({
      // user: req.user.Id , title, description, tag
      title,
      description,
      tag,
      user: req.user.id,
    });

    const saveNote = await note.save();
    res.json(saveNote);
  } catch (error) {
    res.status(500).send("internal error occured");
    console.log(error.message);
  }
});

//ROUTE NP 3 -> update the note login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // creating the ne note

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.titagtle = tag;
    }

    // find the note to be updated no update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Aloud");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    res.status(500).send("internal error occured");
  }
});

//  ROUTE NO 4 deleteing the notes
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {

    // find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //allow the deletion

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Aloud");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted" });
  } catch (error) {
    res.status(500).send("internal error occured");
  }
});

module.exports = router;
