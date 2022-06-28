const drumSounds = [
  {
    id: 'Hi-Hat Closed',
    key: 'q',
    src: './resources/Hi-Hat-Closed-Hit-B1.mp3'
  },
  {
    id: 'Hi-Hat Open',
    key: 'w',
    src: './resources/Hi-Hat-Open-Hit-A1.mp3'
  },
  {
    id: 'Splash',
    key: 'e',
    src: './resources/Splash-Cymbal-Hit-Short.mp3'
  },
  {
    id: 'Medium Tom',
    key: 'a',
    src: './resources/Medium-Tom-Drum-Hit-Level-5A.mp3'
  },
  {
    id: 'Small Tom',
    key: 's',
    src: './resources/Small-Tom-Drum-Hit-Level-5A.mp3'
  },
  {
    id: 'Snare Drum',
    key: 'd',
    src: './resources/Snare-Drum-Hit-Level-4a.mp3'
  },
  {
    id: "Sticks",
    key: 'z',
    src: './resources/Drum-Sticks-Hit-A.mp3'
  },
  {
    id: 'Bass Drum',
    key: 'x',
    src: './resources/Bass-Drum-Hit-Level-6c.mp3'
  },
  {
    id: 'Floor Tom',
    key: 'c',
    src: './resources/Floor-Tom-Drum-Hit-Level-5A.mp3'
  }
];

class Soundboard extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='container'>
        <div id='display'>
          {this.props.playing}
        </div>
      </div>
    );
  }
}

class Misc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container d-flex align-items-center justify-content-center'>
        <div id='display'>
          {this.props.playing}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: 'Welcome'
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  playSound(key) {
    const keyElem = document.getElementById(key.toUpperCase());
    this.setState((state) => ({
      playing: `${keyElem.dataset.id}`,
    }))
    keyElem.currentTime = 0;
    keyElem.play();
  }

  handleKeyPress(event) {
    //key length 1 avoids bugs with function keys as control, home, etc.
    if (event.key.length == 1 && event.key.match(/[qweasdzxc]/i)) {
      const btn = document.querySelector(`[data-key=${event.key}]`)
      btn.classList.add('flipAnim');
      btn.addEventListener('animationend', () => {
        btn.classList.remove('flipAnim');
      })
      /*setTimeout(function() {
        btn.classList.remove('flipAnim');
      }, 500);*/
      this.playSound(event.key)
    }
  }

  handleClick(event) {
    const btn = document.querySelector(`[data-key=${event.target.dataset.key}]`)
    btn.classList.add('flipAnim');
    btn.addEventListener('animationend', () => {
      btn.classList.remove('flipAnim');
    })
    this.playSound(event.target.dataset.key)
  }

  render() {
    const buttons = drumSounds.map((elem) =>
      <button className='m-1 drum-pad' id={elem.id}
        data-key={elem.key} onClick={this.handleClick}>{elem.key.toUpperCase()}
        <audio className='clip' id={elem.key.toUpperCase()}
          src={elem.src} data-id={elem.id}>
        </audio>
      </button>)
    return (
      <div className="container d-flex justify-content-center" id="drum-machine">
        <div className="row align-items-center justify-content-center" id="drum-machine-row">
          <div className="col" id="btn-container">
            <div className="row flex-nowrap justify-content-center">
              <div className="col">
                {buttons[0]}
              </div>
              <div className="col">
                {buttons[1]}
              </div>
              <div className="col">
                {buttons[2]}
              </div>
            </div>
            <div className="row flex-nowrap justify-content-center">
              <div className="col">
                {buttons[3]}
              </div>
              <div className="col">
                {buttons[4]}
              </div>
              <div className="col">
                {buttons[5]}
              </div>
            </div>
            <div className="row flex-nowrap justify-content-center">
              <div className="col">
                {buttons[6]}
              </div>
              <div className="col">
                {buttons[7]}
              </div>
              <div className="col">
                {buttons[8]}
              </div>
            </div>
          </div>
          <div className="col" id="misc-container">
            <Misc playing={this.state.playing} />
          </div>
        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));