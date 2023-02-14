import React, { Component } from 'react';
import './App.css';
import { Parallax } from 'react-parallax';
import bgimg1 from './bgimg1.png'
import { table } from 'console';
import { METHODS } from 'http';

interface State{
  buildings: Building[] 
  tulajdonosInput: string;
  alapteruletInput: number;
  epiteseveInput: number;
}

interface Building{
  id: number;
  tulajdonos: string;
  alapterulet: number;
  epiteseve: number;
}

interface BuildingListResponse{
  buildings: Building[];
}

class App extends Component<{}, State>{

  constructor(props: {}){
    super(props);

    this.state = {
      tulajdonosInput: '',
      alapteruletInput: 0,
      epiteseveInput: 0,
      buildings: [],
    }
  }
  
  async loadBuildings() {
    let response = await fetch('http://localhost:3000/building');
    let data = await response.json() as Building[];
    this.setState({
      buildings: data
    })
  }

  async handleDelete(id: number){
    let response = await fetch('http://localhost:3000/building/' + id, {method: 'DELETE'});
    await this.loadBuildings();
  }
  

  componentDidMount() {
    this.loadBuildings();
  }

  handleUpload = async () => {


    const adat = {
      tulajdonos: this.state.tulajdonosInput,
      alapterulet: this.state.alapteruletInput,
      epiteseve: this.state.epiteseveInput,
    }

    let response = await fetch('http://localhost:3000/building', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    this.setState({ 
      tulajdonosInput: '',
      alapteruletInput: 0,
      epiteseveInput: 0,
    })

    await this.loadBuildings();
  };

  render() {
    return (
      <div>
        <section id='section1'>
            <div className="grid centered beautiful-background">
              <div>
                <p>Épület tulajdonosa: </p>
              </div>
              <div>
                <input type="text" placeholder='Tulajdonos' name='tulajdonos' onChange={e => this.setState({ tulajdonosInput: e.currentTarget.value})} />
              </div>

              <div>
                <p>Épület alapterülete: </p>
              </div>
              <div>
                <input type="text" placeholder='Alapterület (m²)' name='alapterulet' onChange={e => this.setState({ alapteruletInput: parseInt(e.currentTarget.value)})}/>
              </div>

              <div>
                <p>Építési év: </p>
              </div>
              <div>
                <input type="text" placeholder='Építési év' name='epiteseve' onChange={e => this.setState({ epiteseveInput: parseInt(e.currentTarget.value)})} />
              </div>
              <div>
                <button onClick={this.handleUpload}>Felvesz</button>
              </div>
            </div>
            
        </section>
        <Parallax className='parallax' strength={500} bgImage={bgimg1} bgImageStyle={{}}>
          <div className='list beautiful-background'>

          <table>
            <thead>
              <tr>
                <th>Tulajdonos neve</th>
                <th>Épület alapterülete (m²)</th>
                <th>Építési év</th>
                <th>Törlés</th>
              </tr>
            </thead>
            <tbody>
            {
      this.state.buildings.map(building =>
          <tr>
            <td>{building.tulajdonos}</td>
            <td>{building.alapterulet} m²</td>
            <td>{building.epiteseve}</td>
            <td><button onClick={() => this.handleDelete(building.id)}>Törlés</button></td>
          </tr>
        )
      }
            </tbody>
          </table>


          </div>
        </Parallax>
      </div>
    )
  }
}

export default App;