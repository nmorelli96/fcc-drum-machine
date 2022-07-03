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

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer className="d-flex flex-nowrap align-content-center justify-content-center">
        Based on the &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.freecodecamp.org/learn/front-end-development-libraries/"
        >
          FCC course
        </a>
        &nbsp; by &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nmorelli96/"
        >
          nmorelli96 &nbsp;
        </a>
        <div onClick={this.props.showInfoModal}>
          <i id="info-icon" class="fa-solid fa-circle-question"></i>
        </div>
        <div id="info" style={this.props.infoStatus ? { display: "block" } : { display: "none" }}>
          Drum sounds by &nbsp;
          <a href="https://www.fesliyanstudios.com/royalty-free-sound-effects-download/drums-273"
            target="_blank" rel="noopener noreferrer">
            Fesliyan Studios <br />
          </a>
          Background by &nbsp;
          <a href="https://unsplash.com/@matthijssm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            target="_blank" rel="noopener noreferrer">
            Matthijs Smit
          </a>
          &nbsp; - &nbsp;
          <a href="https://unsplash.com/es/s/fotos/drum-set?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
        </div>
      </footer>
    );
  }
}

class Misc extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='container d-flex flex-column align-items-center justify-content-center'>
        <div className='mb-3' id='display'>
          {this.props.playing}
        </div>
        <div className='d-flex flex-nowrap'>
          <input id="volume" type="range" min="0" max="1" step="0.05" onChange={this.props.setVolume} value={this.props.volumeLvl} >
          </input>
          <div id='volumeDisplay'>{(this.props.volumeLvl * 100).toFixed(0)}</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: "Welcome",
      volSlider: "1",
      showInfo: false
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.showInfoModal = this.showInfoModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

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
    keyElem.volume = this.state.volSlider;
    keyElem.play();
  }

  handleKeyPress(event) {
    //key length 1 avoids bugs with function keys as control, home, etc.
    if (event.key.length == 1 && event.key.match(/[qweasdzxc]/i)) {
      const btn = document.querySelector(`[data-key=${event.key}]`)
      this.playSound(event.key)
      btn.classList.add('flipAnim');
      btn.addEventListener('animationend', () => {
        btn.classList.remove('flipAnim');
      })
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

  setVolume() {
    const vol = document.getElementById('volume');
    this.setState((state) => ({
      volSlider: `${vol.value}`
    }))
  }

  showInfoModal() {
    const info = document.getElementById("info");
    const infoIcon = document.getElementById("info-icon");
    if (this.state.showInfo === false) {
      this.setState((state) => ({
        showInfo: true
      }));
      infoIcon.classList.toggle("info-active");
    } else {
      this.setState((state) => ({
        showInfo: false
      }));
      infoIcon.classList.toggle("info-active");
    }
  }

  closeModal() {
    this.setState((state) => ({
      showInfo: false
    }));
    const infoIcon = document.getElementById("info-icon");
    infoIcon.classList.toggle("info-active")
  }

  render() {
    const buttons = drumSounds.map((elem) =>
      <button className='m-1 drum-pad' id={elem.id}
        data-key={elem.key} onClick={this.handleClick}>{elem.key.toUpperCase()}
        <audio className='clip' id={elem.key.toUpperCase()}
          src={elem.src} data-id={elem.id}>
        </audio>
      </button>)

    //Close info modal if click anywhere  
    if (this.state.showInfo == true) {
      setTimeout(() => {
        document.addEventListener("click", this.closeModal);
      }, 50);
    }
    else if (this.state.showInfo == false) {
      document.removeEventListener("click", this.closeModal);
    }

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
            <Misc playing={this.state.playing} setVolume={this.setVolume} volumeLvl={this.state.volSlider} />

          </div>
        </div>
        <Footer infoStatus={this.state.showInfo} showInfoModal={this.showInfoModal} />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));