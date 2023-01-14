import { PageProps } from '$fresh/server.ts';
import Header from '../islands/Header.tsx';
import Footer from '../islands/Footer.tsx';

export default function AboutPage() {
  return (
    <>
      <head>
        <title>VS|Branch - Documentation</title>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:wght@100&display=swap"> */}
      </head>
      <main>
        <Header></Header>
        <div className="bg-off-white h-full flex fixed z-[-10]">
          <div id="sidebar" className="bg-light-tan w-[700px]">
            <div id="sidebarSpacer" className="m-[70px]"></div>
            <div id="somethingFancy" className="">
              <img
                className="scale-90 mb-10"
                src="https://www.seekpng.com/png/full/5-51414_tree-branch-png-images-pictures-tree-branch-vector.png"
                alt="fancyBranch"
              />
            </div>
            <div id="docsList" className="ml-10 text-xl font-bold">
              <h3 className="mb-4">Index:</h3>
              <a className="ml-4 text-link" href="#overview">
                Overview
              </a>
              <br />
              <a className="ml-4 text-link" href="#installation">
                Installation
              </a>
              <br />
              <a className="ml-4 text-link" href="#instructions">
                Instructions
              </a>
              <br />
              <a className="ml-4 text-link" href="#chocoCake">
                Chocolate Cake Recipe
              </a>
            </div>
            <div id="somethingFancy" className="">
              <img
                className="scale-90 mt-10 -scale-y-100"
                src="https://www.seekpng.com/png/full/5-51414_tree-branch-png-images-pictures-tree-branch-vector.png"
                alt="fancyBranch"
              />
            </div>
          </div>

          <div id="body" className="h-full">
            <div id="spacer" className="w-full p-[50px]"></div>
            <div id="scrollOption" className="h-full overflow-scroll">
              <div id="documentationHeader" className="flex justify-center ">
                <img
                  className="max-w-[90px] max-h-[50px] self-center mt-[20px]"
                  src="https://imgur.com/GPVCQtg.png"
                  alt="branch squiggle"
                />
                <h1 className="pt-[10px] text-4xl text-center text-green  ml-5 mr-5">
                  Documentation
                </h1>
                <img
                  className="max-w-[90px] max-h-[50px] self-center mt-[20px]"
                  src="https://imgur.com/akpWdCN.png"
                  alt="branch squiggle"
                />
              </div>
              <div className="m-4">
                <h2 className="text-2xl text-green" id="overview">
                  Overview
                </h2>
                <p className="m-4">
                  VS|Branch is an extension for VSCode which allows developers
                  to view and test their backend routes within express and/or
                  oak.
                </p>
                <br />
                <p className="ml-4">
                  VS|Branch functions best when conventional syntax standards
                  and best practices are used. This includes:
                </p>
                <br />
                <ul className="list-square">
                  <li className="ml-10">
                    Saving all server files inside a server directory.
                  </li>
                  <li className="ml-10">
                    Saving port number in a port variable. Alternative, you can
                    use port 3000 or 8080 directly.
                  </li>
                  <li className="ml-10">
                    Using traditional routes (get, post, put, patch, delete)
                  </li>
                </ul>
              </div>
              <div className="m-4">
                <h2 className="text-2xl text-green" id="installation">
                  Installation
                </h2>
                <p className="m-4">
                  To use VS|Branch, you will first need to install ripGrep on
                  your machine.
                </p>
                <p className="m-4 ml-10">
                  For MacOS X Homebrew users, install ripgrep by entering the
                  following into your terminal:
                </p>
                <p className="m-4 ml-16 font-comp bg-green-100 p-2 w-[300px]">
                  $ brew install ripgrep
                </p>
                <p className="m-4 ml-10">
                  For Arch Linux users, install ripgrep by entering the
                  following into your terminal:
                </p>
                <p className="m-4 ml-16 font-comp bg-green-100 p-2 w-[300px]">
                  $ pacman -S ripgrep
                </p>
                <p className="m-4 ml-10">
                  For all other users, install ripgrep by navigating to the link
                  below and following the associated instructions.
                </p>
                <a
                  className="ml-20 font-bold text-link underline text-xl"
                  href="https://docs.rs/crate/ripgrep/0.2.7"
                >
                  Ripgrep Docs
                </a>
                <p className="m-4">
                  Once you have ripGrep installed on your machine, it is time to
                  install VS|Branch. Click the install link on the top right of
                  this page.
                </p>
              </div>
              <div className="m-4">
                <h2 className="text-2xl text-green" id="instructions">
                  Instructions
                </h2>
                <p className="m-4">TBD</p>
              </div>
              <div className="m-4">
                <h2 className="text-2xl text-green" id="chocoCake">
                  Chocolate Cake Recipe
                </h2>
                <p className="m-4">
                  <p>2/3 cup butter - softened</p>
                  <p>1-2/3 cups sugar</p>
                  <p>3 large eggs - room temperature</p>
                  <p>2 cups all-purpose flour</p>
                  <p>2/3 cup baking cocoa</p>
                  <p>1-1/4 teaspoons baking soda</p>
                  <p>1 teaspoon salt</p>
                  <p>1-1/3 cups 2% milk</p>
                  <p>Confectioners' sugar or favorite frosting</p>
                  <br />
                  <p className="w-2/3">
                    In a bowl, cream butter and sugar until light and fluffy,
                    5-7 minutes. Add eggs, 1 at a time, beating well after each
                    addition. In a seperate bowl, combine flour, cocoa, baking
                    soda and salt. Add dry mixture to creamed mixture
                    alternately with milk, beating until smooth after each
                    addition. Pour batter into a greased and floured 13x9-in.
                    baking pan.
                  </p>
                  <br />
                  <p className="w-2/3">
                    Bake at 350° for 35-40 minutes, or until a toothpick
                    inserted in center comes out clean. Cool completely on a
                    wire rack. When cake is cool, dust with confectioners' sugar
                    or top with your favorite frosting.
                  </p>
                  <br />
                  <p>Nutrition Facts</p>
                  <p className="font-light text-xs">
                    1 piece: 257 calories, 10g fat (6g saturated fat), 67mg
                    cholesterol, 368mg sodium, 38g carbohydrate (23g sugars, 1g
                    fiber), 4g protein.
                  </p>
                </p>
              </div>
              <div className="flex w-full pb-[100px]"></div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
