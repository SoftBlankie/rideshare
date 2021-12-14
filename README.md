<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/SoftBlankie/rideshare">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">rideshare</h3>

  <p align="center">
    Rideshare app to meet your transportation needs from your local community
    <br />
    <a href="https://github.com/SoftBlankie/rideshare"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/SoftBlankie/rideshare">View Demo</a>
    ·
    <a href="https://github.com/SoftBlankie/rideshare/issues">Report Bug</a>
    ·
    <a href="https://github.com/SoftBlankie/rideshare/issues">Request Feature</a>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

SacHacks' hackathon rideshare app to meet your transportation needs from your local community.

Check out our [DevPost](https://devpost.com/software/trippoint)

### Inspiration

TripPoint is inspired by the UC Davis' Rideshare Facebook community, aiming to provide a different approach towards a demographic population for both passengers and drivers. Unlike most ride-sharing services, passenger fares will be reduced as ride-sharing is cheap due to the fact that passengers meet up at a designated place at the driver's disgression. Additionally, drivers will no longer have to waste gas and pickup passengers at different places like Uber Pool.

Most importantly, this app was inspired by a sense of community. Living in college, I found myself struggling with transportation whether they may be from my financial reasons or lack of connections. I found myself homesick and frustrated by my lack of transportation. I wasn't alone. The UC Davis' Rideshare Facebook community presents itself as a cheaper alternative while helping its community for both passenger and driver. Hence, a dedicated platform, TripPoint presents itself as an amalgam of what we want. Transportation for simply us.

### What it does

TripPoint allows drivers to post their trips while passengers search for rides that match their needs.

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [React.js](https://reactjs.org/)
* [Firebase](https://firebase.google.com/)
* [Firebase Auth](https://firebase.google.com/docs/auth)
* [Firestore](https://firebase.google.com/docs/firestore)
* [Google Cloud API](https://cloud.google.com/apis)
* [Google Maps API](https://developers.google.com/maps)
* [Google Directions API](https://developers.google.com/maps/documentation/directions/overview)
* [Google Geocoder API](https://developers.google.com/maps/documentation/geocoding/overview)
* [Ant Design](https://ant.design/)
* [Figma](https://www.figma.com/)
* [Netlify](https://www.netlify.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/SoftBlankie/rideshare.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run server
   ```sh
   node start
   ```
4. Run client
   ```sh
   yarn start
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



### Usage

#### For Passengers

1. Click Find Ride
2. Enter desired pickup location, drop off location, and date.
3. The matching algorithm will find rideshares posted by drivers on that date which are within 20 miles of your pickup location and drop off location.
4. The map will display all matching rideshares on the map with markers and the path that they take.
5. Click on the markers in order to display the trip's information such as driver's information, pickup location, drop off locations, price, and etc.
6. Click join if you would like to join the trip.
7. The driver's contact information will be stored under the contacts tab, and the trip will be stored in the trips tab.

For Drivers

1. Click Post Ride
2. Enter the pickup location, drop off location, date, price, passenger limit, and notes.
3. Your rideshare offer will be posted and any passenger whose search criteria matches yours will be able to join.
4. Once a passenger joins, they will be listed under your contacts and in your trips tab.


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [] Create mobile app
- [] Create user authentication
- [] Migrate from Firebase to dedicated server
- [] Clean up minor bugs
- [] Implement in-app messaging!
- [] Clean up the contacts and trips tab
- [] Dedicated desktop layout
- [] Distribution to local university communities

See the [open issues](https://github.com/SoftBlankie/rideshare/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

SoftBlankie - [@](https://twitter.com/) - dericktphan@gmail.com

Project Link: [https://github.com/SoftBlankie/rideshare](https://github.com/SoftBlankie/rideshare)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [SacHacks](https://sachacks.io/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/SoftBlankie/rideshare.svg?style=for-the-badge
[contributors-url]: https://github.com/SoftBlankie/rideshare/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/SoftBlankie/rideshare.svg?style=for-the-badge
[forks-url]: https://github.com/SoftBlankie/rideshare/network/members
[stars-shield]: https://img.shields.io/github/stars/SoftBlankie/rideshare.svg?style=for-the-badge
[stars-url]: https://github.com/SoftBlankie/rideshare/stargazers
[issues-shield]: https://img.shields.io/github/issues/SoftBlankie/rideshare.svg?style=for-the-badge
[issues-url]: https://github.com/SoftBlankie/rideshare/issues
[license-shield]: https://img.shields.io/github/license/SoftBlankie/rideshare.svg?style=for-the-badge
[license-url]: https://github.com/SoftBlankie/rideshare/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/derick-phan-7b6b0116b
[product-screenshot]: images/screenshot.png
