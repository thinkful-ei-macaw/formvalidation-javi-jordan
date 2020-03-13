import React from 'react'
import ApiContext from '../ApiContext'

export default class AddNote extends React.Component {

    state = {
      NoteName: ''
  }


  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.noteName;
    

    fetch('http://localhost:9090/notes', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value, 
        folderId: e.target.FolderId.value,
        content: e.target.noteContent.value,
        modified: new Date().toISOString()
      })
    })
  .then(response => response.json())
  .then((responseJson) => {
    this.context.addNote(responseJson)
    this.props.history.push('/');
  })
  .catch(error => {
    console.log(error)
    alert('Adding note did not work')
  })
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New note name:
        </label>
    <input required type="input" className="nameInput" name="noteName">
        </input>
      <select name={'FolderId'}>{this.context.folders.map(folders => {
        return <option value={folders.id}>{folders.name}</option>})}</select>
      <textarea name={'noteContent'}></textarea>
      <button type="submit" className="submitName">Submit Name</button>
      </form>
    )
  }
}

