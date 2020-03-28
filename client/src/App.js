// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Import resources
import logo from './logo.svg';
import './App.css';

// Initialize caccl
const { api } = initCACCL();

const courseId = 72784;
const assignmentId = 349087;

class App extends Component {
  /**
   * Initialize App component
   */
  constructor(props) {
    super(props);

    // Set up state
    this.state = {
      message: 'Scan your ID to attend.',
      barcodeText: '',
    };
  }

  /**
   * Called when the component mounted, pulls state and user profile from server
   */
  async componentDidMount() {
    // Add key listener
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // Enter was pressed! Process the swipe/scan
        this.processSwipe();
      } else {
        // Append the typed character
        const newBarcodeText = this.state.barcodeText + event.key;

        // Save to state
        this.setState({
          barcodeText: newBarcodeText,
        });
      }
    });
  }

  async processSwipe() {
    const studentId = this.state.barcodeText;

    this.setState({
      message: 'just a moment...',
    });

    // Update their grade
    await api.course.assignment.updateGrade({
      courseId,
      assignmentId,
      studentId,
      points: 1,
    });

    // Show the welcome message
    this.setState({
      message: 'Welcome!',
      barcodeText: '',
    });

    // Reset after 1s
    setTimeout(() => {
      this.setState({
        message: 'Scan your ID to attend.',
      });
    }, 1000);
  }

  /**
   * Render the App
   */
  render() {
    // Deconstruct the state
    const { message } = this.state;

    // Render the component
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            SwipeIn
          </h1>
          <h3>
            {message}
          </h3>
        </header>
      </div>
    );
  }
}

export default App;
