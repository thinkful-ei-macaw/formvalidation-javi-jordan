import React from 'react'
import ApiContext from '../ApiContext'

export default class AddFolder extends React.Component {

    state = {
      folderName: ''

  }


  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const name = this.state.folderName;
    
    fetch('http://localhost:9090/folders', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,   
      })
    })
  .then(response => response.json())
  .then((responseJson) => {
      this.context.addFolder(responseJson)
      this.props.history.push('/');
    })
  .catch(error => {
    alert('Adding folder did not work')
  })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New folder name:
        </label>
    <input required type="input" className="nameInput" onChange={
      (e) => this.setState({
        folderName: e.target.value
        
      })
      }>

      </input>
      <button type="submit" className="submitName">Submit Name</button>
      </form>
    )
  }
}

