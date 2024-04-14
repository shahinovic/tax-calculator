# Fyle Web Development Internship Challenge

## Introduction

This project is a web-based tax calculator designed as part of the Fyle Web Development Internship Challenge. It utilizes an object-oriented programming (OOP) approach to calculate taxes based on user input for income, deductions, and age group.

## Installation

1. Clone the repository: `git clone https://github.com/shahinovic/tax-calculator.git`
2. Navigate to the project directory: `cd tax-calculator`
3. Open `index.html` in your web browser.

## Usage

1. Enter your annual income, extra income, deduction amount, and select your age group.
2. Click on the "Calculate" button to see the calculated tax.
3. The result will be displayed in a modal window.

## Screenshots

![User Interface](/images/user_interface.png)
_Screenshot to see visual elements and layout of the tax calculator web application_

![Tablet screenshot](/images/tap.png)
_Screenshot to see how tax calculator looks in tablet_

![Phone screenshot](/images/phone.png)
_Screenshot to see how tax calculator looks in phone_

![Error Handling](/images/error.png)
_Screenshot to see how the tax calculator handles errors and displays error messages when incorrect values are entered or required fields are left blank_

![Displaying Result](/images/result.png)
_Screenshot to see how the tax calculator displays the calculated tax_

## Object-Oriented Approach

This project follows an object-oriented programming (OOP) paradigm to achieve its functionality. It encapsulates data and behavior related to tax calculation within a class-based structure.

- **App Class**: The main application class encapsulates methods for handling user input, performing calculations, and displaying results.
- **Error Handling**: Error handling is implemented using class methods to validate user input and display error messages.
- **Modularity**: The code is organized into classes and methods, promoting modularity and reusability.

## References & Requirements

- The tax calculation follows the provided formula.
- Users can't enter incorrect values like characters in number fields. Error icons are displayed if there are input errors.
- The age dropdown field has three values: <40, ≥ 40 & < 60, and ≥ 60.
- Error icons are not visible in the form by default.
- Bootstrap is used for styling and interactivity.

## File Structure

.
├── css
│ ├── bootstrap.min.css
│ └── style.css
├── images
│ ├── alert.png
│ └── question.png
├── js
│ ├── bootstrap.bundle.min.js
│ └── script.js
├── index.html
└── README.md

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
