import React, { useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Addnote = () => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const context = useContext(NoteContext)
    const { notes, addnote } = context;
    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} />
            </div>

            <button type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
        </form>
    )
}

export default Addnote
