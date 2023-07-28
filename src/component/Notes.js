import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NotesItem from './NotesItem';
import Addnote from './Addnote';
import { useNavigate } from "react-router-dom"


const Notes = (props) => {
    const navigate = useNavigate()
    const context = useContext(NoteContext)
    const { notes, getnotes, editnote } = context;
    useEffect(() => {
        //  getnotes()
         if(localStorage.getItem('token')){
             getnotes()

         }
         else{
             navigate("/login")
         }
    }, [getnotes, navigate])
    const ref = useRef(null)
    const refclose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })




    const updatenote = (currnote) => {
        ref.current.click()
        setNote({ id: currnote._id, etitle: currnote.title, edescription: currnote.description, etag: currnote.tag })
       
       
        // props.showAlert("updated successfully" , "success")

    }

    const handleClick = (e) => {

        editnote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click()

        // addnote(note.title, note.description, note.tag)
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onChange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>your notes</h1>

            <div className='row container'>
                {notes.length === 0 && "no notes to display"}
                {notes.map((note) => {
                    return <NotesItem key={note._id} updatenote={updatenote} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes
