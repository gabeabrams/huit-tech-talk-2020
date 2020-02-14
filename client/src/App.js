// Import caccl
import initCACCL from 'caccl/client/cached';

// Import React
import React, { Component } from 'react';

// Import resources
import './App.css';

// Initialize caccl
const { api } = initCACCL();

// Constants
const courseId = 72784;
const assignmentId = 348567;

class App extends Component {
  /**
   * Initialize App component
   */
  constructor(props) {
    super(props);

    // Set up state
    this.state = {
      // Message to show to the user
      message: 'Scan your ID to attend.',
      // Current text typed by barcode scanner
      barcodeText: '',
    };
  }

  componentDidMount() {
    // Add key listener to the document
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        // Enter was pressed! Process the swipe
        this.processSwipe();
      } else {
        // Append the typed character
        const { barcodeText } = this.state;
        const newBarcodeText = `${barcodeText}${event.key}`;

        // Save to state
        this.setState({
          barcodeText: newBarcodeText,
        });
      }
    });
  }

  async processSwipe() {
    // Get student ID from barcode
    const studentId = this.state.barcodeText;

    // Display loading text, reset barcode text
    this.setState({
      message: 'just a moment...',
      barcodeText: '',
    });

    // Update their grade in Canvas
    await api.course.assignment.updateGrade({
      courseId,
      assignmentId,
      studentId,
      points: 1,
    });

    // Welcome the student
    this.setState({
      message: 'Welcome!',
    });

    // Reset the message after 1s
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
    const { message } = this.state;

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
