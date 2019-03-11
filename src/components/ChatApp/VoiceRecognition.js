import { Component } from 'react';
import PropTypes from 'prop-types';

let counter = 0;

const speechDefaults = {
  continuous: true,
  interimResults: true,
  lang: 'en-US',
};

class VoiceRecognition extends Component {
  static propTypes = {
    onStart: PropTypes.func,
    onEnd: PropTypes.func,
    onResult: PropTypes.func,
    continuous: PropTypes.bool,
    lang: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition;

    if (SpeechRecognition != null) {
      this.recognition = this.createRecognition(SpeechRecognition);
    } else {
      console.warn(
        'The current browser does not support the SpeechRecognition API.',
      );
    }
  }

  createRecognition = SpeechRecognition => {
    const options = Object.assign({}, speechDefaults, this.props);

    let recognition = new SpeechRecognition();

    recognition.continuous = options.continuous;
    recognition.interimResults = options.interimResults;
    recognition.lang = options.lang;

    return recognition;
  };

  bindResult = event => {
    let interimTranscript = '';
    let finalTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        counter++;
        interimTranscript += event.results[i][0].transcript;
      }
    }
    if (counter === 0) {
      interimTranscript = undefined;
    }
    this.props.onResult({ interimTranscript, finalTranscript });
  };

  start = () => {
    this.recognition.start();
  };

  onspeechend = () => {
    this.recognition.stop();
  };

  abort = () => {
    this.recognition.abort();
  };

  componentDidMount() {
    const { onStart, onEnd } = this.props;
    const events = [
      { name: 'start', action: onStart },
      { name: 'end', action: onEnd },
      { name: 'result', action: this.bindResult },
    ];
    events.forEach(event => {
      this.recognition.addEventListener(event.name, event.action);
    });
    this.start();
  }

  componentWillUnmount() {
    this.abort();
  }

  render() {
    return null;
  }
}

export default VoiceRecognition;
