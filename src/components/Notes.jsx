import React, { useState, useEffect } from 'react';
import icon from '../assets/icon.png'

export const Notes = () => {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);

    // Load notes from local storage on component mount
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes'));
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);

    // Save notes to local storage whenever notes array changes
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (note.trim() !== '') {
            setNotes([...notes, note]);
            setNote('');
        }
    }

    const deleteNote = (indexToDelete) => {
        const updatedNotes = notes.filter((note, index) => index !== indexToDelete);
        setNotes(updatedNotes);
    }

    return (
        <div className='container'>
            <div className="input-section">
                <textarea 
                    type="text" 
                    className='inputBox' 
                    placeholder='Enter Your Notes' 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                />
                <button className='add_btn' onClick={addNote}>Add Note</button>
            </div>
            <div className="notes-section">
                {notes.map((note, index) => (
                    <div key={index} className="note-item">
                        {note}
                        <img 
                            src={icon}
                            alt="delete" 
                            className="delete-icon" 
                            onClick={() => deleteNote(index)} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
