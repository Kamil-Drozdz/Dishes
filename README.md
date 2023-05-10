<h4>
    <a href="https://dishes-project.vercel.app//">View Demo</a>
  <span> · </span>
    <a href="https://github.com/Kamil-Drozdz/Dishes/issues">Report Bug</a>
  <span> · </span>
  </h4>
</div>

<br />



<!-- About the Project -->
## :star2: About the recruitment project
Dish Form is a web application built with React +Vite  that allows users to add various types of dishes to a database. The application uses Formik for form handling, Yup for data validation, and axios for API request handling.

Features
Add dishes, such as pizza, soup, and sandwich, with specified parameters
Validate user input data
Send data to the database using API requests
Installation
To install the application, follow these steps:

Usage
To add a new dish:

Fill in the "Dish name" field with the dish name.

Fill in the "Preparation time" field with the preparation time of the dish (format hh:mm:ss).

Select the dish type from the dropdown in the "Dish type" field.

Fill in the additional fields for the selected dish type:

For pizza: enter the number of slices (1-8) and the diameter (20-80 cm).
For soup: select the spiciness scale value (1-10).
For sandwich: enter the number of bread slices (1-8).
Click the "Submit" button to submit the form. A success message will appear if the dish is added successfully, and an error message will appear in case of an error.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Kamil-Drozdz/Dishes.git
```

Go to the project directory

```bash
  cd Dishes
```

Install dependencies

```bash
  npm install
```
Make sure you have a .env file with the VITE_BASE_URL value, which was sent to my email. This file is required for the proper functioning of the app in the local environment.
Start the server

```bash
  npm run dev
```

<!-- Screenshots -->
### :camera: Screenshots
![image](https://github.com/Kamil-Drozdz/Dishes/assets/108432936/c571abd0-8839-48d7-96e1-93e92ce49b00)
![image](https://github.com/Kamil-Drozdz/Dishes/assets/108432936/42e64680-3ac8-4d27-9bf5-3bbb7d8d03d8)
