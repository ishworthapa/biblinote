import React from 'react'
import { Link } from 'react-router-dom'

let getTitle = (note) => {

    let title = note.note_text.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}


let getContent = (note) => {
    let title = getTitle(note)
    let content = note.note_text.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')

    if (content.length > 45) {
        return content.slice(0, 45) + '...'
    } else {
        return content
    }
}

let getContentAll = (note) => {
    let content = note.note_text.replaceAll('\n', ' ')

    return content

}

const ListItem = ({ note }) => {
    return (
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item" >
                <h3>{getContentAll(note)}</h3>
            </div>

        </Link>
    )
}

export default ListItem
