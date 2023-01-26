<!-- Branch README -->
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=Branch.branch">
    <img src="vs-branch/images/branch-logo-square.png" alt="Logo" height="120">
  </a>

  <h3 align="center">Branch</h3>

  <p align="center">
    View adn test your backend routes right from your code editor!
    <br />
    <br />
    <br />
    <a href="https://github.com/oslabs-beta/Branch/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/Branch/issues">Request Feature</a>
    ·
    <a href="https://marketplace.visualstudio.com/items?itemName=Branch.branch">Install</a>
  </p>
    <!-- BADGES -->
  <p align="center">
    <!-- Last Updated  -->
    <img alt="Visual Studio Marketplace Last Updated" src="https://img.shields.io/visual-studio-marketplace/last-updated/Branch.branch?style=for-the-badge">
    <!-- VSCode Installs -->
    <a href="https://marketplace.visualstudio.com/items?itemName=Branch.branch">
	<img alt="Visual Studio Marketplace Installs" src="https://img.shields.io/visual-studio-marketplace/i/Branch.branch?logo=visualstudiocode&style=for-the-badge">
  </a>
	<br />
    <!-- STARS -->
    <a href="https://github.com/oslabs-beta/Branch/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/oslabs-beta/Branch?label=Stars&logo=github&style=for-the-badge"></a>
    <!-- FORKS -->
    <!-- <a href="https://github.com/oslabs-beta/Branch/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/oslabs-beta/Branch?label=Forks&logo=github&style=for-the-badge"></a> -->
    <!-- GITHUB RELEASE VERSION -->
    <a href="https://github.com/oslabs-beta/Branch/releases"><img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/oslabs-beta/Branch?include_prereleases&style=for-the-badge"></a> 
    <!-- LICENSE -->
    <!-- <a href="https://github.com/oslabs-beta/sapling/blob/master/LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/oslabs-beta/sapling"></a> -->
    <!-- CONTRIBUTIONS -->
    <!-- <a href="https://github.com/oslabs-beta/sapling/blob/master/README.md"><img alt="Contributions" src="https://img.shields.io/badge/contributors-welcome-brightgreen"></a> -->
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-branch">About Branch</a>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#docs">Docs</a></li>
    <li><a href="#the-team">The Team</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About Branch

Branch is a unique & convenient backend route visualization tool built directly into VS Code! With Branch, you can:
<ul>
  <li>
    View your app's routes without leaving your editing
    environemnt
  </li>
  <li>
    Dynamically adjust which portion of the route you wish to view
  </li>
  <li>
    Create, edit, and execute http requests to your server
    directly from the extension
  </li>
  <li>View returning data in an easy to read format</li>
</ul>

Branch functions best when conventional syntax standards and best practices are used. This includes:
<br />
<ul>
  <li >
    Saving all server files inside a server directory
  </li>
  <li>
    Saving port number in a port variable. Alternatively, you
    can use port 3000 or 8080 directly
  </li>
  <li>
    Using traditional routes (GET, POST, PUT, DELETE)
  </li>
</ul>

## Installation

<p> To use Branch, you will first need to ensure that
  <a href="https://github.com/BurntSushi/ripgrep#installation">
    RipGrep</a>
  (a command line search tool) is installed on your machine. To check to see what version of RipGrep is installed on your
  machine, enter the following in your terminal.
</p>


```
$ rg --version
```
</p>
<p>
  We recommend that you use version 13.0.0 or newer.
</p>
<br />
<p>
  For MacOS X Homebrew users, install ripgrep by entering the
  following into your terminal:
</p>

```
$ brew install ripgrep
```
<p>
  For Debian & Ubuntu users, install ripgrep by entering the
  following into your terminal:
</p>

```
$ curl -LO https://github.com/BurntSushi/ripgrep/releases/download/13.0.0/ripgrep_13.0.0_amd64.deb
$ sudo dpkg -i ripgrep_13.0.0_amd64.deb
```

  For all other users, install ripgrep by navigating to the <a href="https://github.com/BurntSushi/ripgrep#installation">RipGrep repo</a> and finding your configuration.
<p>
  Once you have ripGrep installed on your machine, it is time to
  install the Branch extension into VSCode. Click <a href="https://marketplace.visualstudio.com/items?itemName=Branch.branch">here</a> or at the top of this page to navigate to the VisualStudio Marketplace. From there, click install and follow the prompts.
</p>

## Our Extension

### Accessing the Extension

To access the extension, open the app you wish to test as
you normally would in VSCode. Now open the Command Palette
by pressing control (command on a mac) F1 and selecting `Branch: Start`

### Using the Branch View

The Branch view consists of four primary sections:
<ol>
  <li>
    
**Route Tree** : This
is the interactive visual representation of your routes.
Each route that can be expanded upon will be indicated
by a blue circle. Simply click on that circle to see the route expanded. When selecting an endpoint (GET, POST, etc...), Branch
will begin filling out the appropriate query fields
below.
  </li>
  <li>

**Query Fields**: Here
you can determine the query parameters that you need.
The URL section will begin to auto-populate when you
click on an endpoint in the Route Tree above.
Additionally, the appropriate button and input field for
your query type will highlight. For more detailed information on query types, see our <a href="">detailed docs</a>.
  </li>
  <li>

**Request Body Field**: Here, you will see the request body when you are generating a POST or PUT request.
If you enter incorrect data, click the X button to clear
the field and restart building your query.
  </li>
  <li>

**Response Object**: This is where the results of your query will be
displayed.
  </li>
</ol>

## The Team

-  Foster Sullivan | <a href="">LinkedIn</a> | <a href="">GitHub</a>  
-  Chase Benjamin | <a href="">LinkedIn</a> | <a href="">GitHub</a> 
-  Zach Hall | <a href="">LinkedIn</a> | <a href="">GitHub</a> 
-  Jason Goldman| <a href="">LinkedIn</a> | <a href="">GitHub</a> 

## Acknowledgements

This section is a WIP, check back with us later!