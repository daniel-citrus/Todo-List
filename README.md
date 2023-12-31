<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/daniel-citrus/Task-List">
    <img src="src/style/media/todologo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Todo List</h3>
  <p align="center">
    <a href="https://listofthingstodo.netlify.app/">Live Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Todo List][product-screenshot1]

![Todo List][product-screenshot2]

Create projects and tasks. Each project contain their own tasks. Each task will hold a Title, Due Date, Priority Level, Description, and Completion Status.

This application is mobile and computer responsive. For mobile resolutions, the application utilizes a navigation burger to toggle the navigation list. For larger non-mobile resolutions, the content is displayed in a 2 column layout.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
[![HTML5][html5-shield]][html5-url]
[![Sass][sass-shield]][sass-url]
[![Javascript][javascript-shield]][javascript-url]
[![Webpack][webpack-shield]][webpack-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To setup this project locally you must have Node Package Manager ([npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)) installed.

### Prerequisites

* npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/daniel-citrus/Todo-List.git
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

* [x] TaskList
  * [x] Stores all tasks
  * [x] Add task item (Parameters: Title, Description, Due Date, Priority)
  * [x] Edit task with new inputs
  * [x] Remove a task using id
  * [x] Save tasks to localStorage
  * [x] Load tasks from localStorage
* [x] Projects
  * [x] Track projects and their tasks
  * [x] Edit Project
  * [x] Create project & Insert new project
  * [x] Delete a project
  * [x] Add task item to a specific project
  * [x] Delete task item from a specific project
  * [x] Get project by ID
  * [x] Get project name by ID
  * [x] Get tasks that belong to a project
  * [x] Save projects to localStorage
  * [x] Load projects from localStorage
* [x] DOM Features
  * [x] Project
    * [x] Create project
    * [x] Rename project
    * [x] Delete Project
  * [x] Task 
    * [x] Create task
    * [x] Complete task
    * [x] Edit task
    * [x] Delete task


See the [open issues](https://github.com/daniel-citrus/Todo-List/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

[![LinkedIn][linkedin-shield]][linkedin-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/calvo-daniel
[product-screenshot]: readmefiles/sim%20white_animated.svg
[html5-shield]: https://img.shields.io/badge/HTML5-%23222222?style=for-the-badge&logo=html5&logoColor=%23E34F26
[html5-url]: https://html.spec.whatwg.org/
[sass-shield]: https://img.shields.io/badge/SASS-%23CC6699?style=for-the-badge&logo=sass&logoColor=white
[sass-url]: https://sass-lang.com/
[webpack-shield]: https://img.shields.io/badge/Webpack-%238DD6F9?style=for-the-badge&logo=webpack&logoColor=white
[webpack-url]: https://webpack.js.org/
[javascript-shield]: https://img.shields.io/badge/Javascript-%232e302c?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[product-screenshot1]: /src/style/media/sc.png
[product-screenshot2]: /src/style/media/taskdetails.png
