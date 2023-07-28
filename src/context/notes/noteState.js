import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  // get all notes 
  const getnotes = async () => {
    //to do api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

    });
    const json = await response.json();
    // console.log(json);
    setnotes(json)
  };

  //add a note
  const addnote = async (title, description, tag) => {
    //to do api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },

      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();


    setnotes(notes.concat(note));
  };

  //delete note
  const detelenote = async (id) => {

    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
  
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  // update note
  const editnote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method:"PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit
    for (let index = 0; index < newNotes.length; index++) {
      const ele = newNotes[index];
      if (ele._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes)
  };



  return (
    <NoteContext.Provider
      value={{ notes, addnote, detelenote, editnote, getnotes }}
    >
      {props.children};
    </NoteContext.Provider>
  );
};

export default NoteState;
