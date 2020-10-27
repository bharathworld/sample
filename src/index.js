import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var data = require('./data.json');

const { Component } = React;
var finaldata = [];
const items = [
  {
    id: 1,
    title: "Floor 1",
    childs: [
      {
        id: 11,
        title: 'Room 1'
      },
      {
        id: 12,
        title: 'Room 2'
      }
      ],
  },
  {
    id: 2,
    title: "Floor 2",
    childs: [
      {
        id: 21,
        title: 'Room 1'
      },
      {
        id: 22,
        title: 'Room 2'
      },
      {
        id: 23,
        title: 'Room 3'
      }
    ],
  },
  {
    id: 3,
    title: "Floor 3",
    childs: [
      {
        id: 31,
        title: 'Room 1'
      }],
  },
];

function togleDropdown() {
  this.setState({
    isOpened: !this.state.isOpened,
  });
}

class SampleTable extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let displaydata  = this.props.displaydata;

    return(
      <div className="container table-container">
        <div className="row">
          <div>
            <table>
               <tbody>
                <tr>
                  <th>Temperature</th>
                  <th>Humidity</th>
                </tr>
                <tr>
                  <td>{displaydata[0]?.temperature}</td>
                  <td>{displaydata[0]?.humidity}</td>
                </tr>
               </tbody>
             </table>
          </div>
        </div>
      </div>
    )
  }
}

class TreeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: true
    }
  }
  
  render() {
    const { title, childs } = this.props.data;
    let handleToUpdate  =   this.props.handleToUpdate;

    return (
      <li className="dropdown">
        <header onClick={ togleDropdown.bind(this) }>
          <span>{ title }</span>
        </header>
        <ul className={ "dropdown-togle" + (this.state.isOpened? "active": "") }>
          { 
          childs.map((item, index) => 
            <li onClick= {()=> handleToUpdate(item.id)}  key={item.id}>{ item.title }</li>            
          )
          }
        </ul>
      </li>
    );
  }
}

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.data,
      isOpened: true,
      displaydata:{}
    }
  }
  
  render() {

    function handleToUpdate(selectedItem){
      let finaldata = data.data.filter((val) => val.key == selectedItem);
      this.setState({
        displaydata: {...finaldata}
      });
    }

    return (
      <section>
        <div className="tree">
          <header onClick={ togleDropdown.bind(this) }>
            <span>Building</span>
          </header>
          <ul className={ "dropdown-togle " + (this.state.isOpened? "active" : "") }>
            { this.state.items.map((item) =>
              <TreeItem data={ item } key={item.id} handleToUpdate = {handleToUpdate.bind(this)}/>
            )}
          </ul>
        </div>
        <SampleTable displaydata={this.state.displaydata}/>
      </section>
    );
  }
}


ReactDOM.render(
  <Tree data={ items }/>,
  document.getElementById('root')
);

