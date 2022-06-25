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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyId = this.handleKeyId.bind(this);
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
    document.getElementById(key).currentTime = 0;
    document.getElementById(key).play();
  }

  handleKeyId(key) {
    this.setState((state) => ({
      message: `You pressed the ${key} key! `,
    }))
  }

  handleKeyPress(event) {
    if (event.key.match(/[qweasdzxc]/)) {
      this.handleKeyId(event.key)
      this.playSound(event.key)
    }
  }

  handleClick(event) {
    this.playSound(event.target.dataset.key)
  }

  render() {
    const buttons = drumSounds.map((elem) => 
    <button data-key={elem.key} onClick={this.handleClick}>{elem.key.toUpperCase()}</button>)
    const audioElems = drumSounds.map((elem) => 
    <audio id={elem.key} src={elem.src}></audio>)
    return (
      <div>
        <h1>{this.state.message}</h1>
        {buttons}
        {audioElems}
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));