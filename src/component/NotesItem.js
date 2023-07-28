import React from "react";
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';


const NotesItem = (props) => {
   
    const context = useContext(NoteContext)
    const { detelenote } = context;
    const { note , updatenote } = props;

    
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title"> {note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i onClick={()=>{detelenote(note._id) }} className="fa-solid fa-trash mx-2"></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
                </div>
            </div>
        </div>
    );
};

export default NotesItem;
