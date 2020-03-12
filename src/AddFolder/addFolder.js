import React from 'react'

export default class AddFolder extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
      folderName: {value: ''},
  }
}

  handleSubmit = (e) => {
    e.preventDefault();

    const name = this.state.folderName.value;
    
    fetch('http://localhost:9090/folders', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      name: name,
  }).then((response) => response.json())
    .then((responseJson) => {
      return this.setState(this.folderName = responseJson)
    }),
})
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New folder name:
        </label>
    <input type="input" className="nameInput" onChange={
      (e) => this.setState({
        folderName: {
          value: e.target.value
        }
      })
      }>

      </input>
      <button type="submit" className="submitName">Submit Name</button>
      </form>
    )
  }
}

