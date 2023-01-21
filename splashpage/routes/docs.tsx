import { PageProps } from '$fresh/server.ts';
import Header from '../islands/Header.tsx';
import Footer from '../islands/Footer.tsx';

export default function AboutPage() {
  return (
    <>
      <head>
        <title>Branch - Documentation</title>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira:wght@100&display=swap"> */}
      </head>
      <main>
        <Header></Header>
        <div className="bg-off-white h-full flex fixed z-[-10]">
          <div id="sidebar" className="bg-light-tan min-w-[300px]">
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
                <h3 className="m-4 mr-40 font-medium">
                  Branch is an extension for VSCode which allows developers to
                  view and test their backend routes within Express or Oak
                  frameworks.
                </h3>
                <br />
                <p className="ml-4">
                  Branch functions best when conventional syntax standards and
                  best practices are used. This includes:
                </p>
                <br />
                <ul className="list-square">
                  <li className="ml-10">
                    Saving all server files inside a server directory
                  </li>
                  <li className="ml-10">
                    Saving port number in a port variable. Alternatively, you
                    can use port 3000 or 8080 directly
                  </li>
                  <li className="ml-10">
                    Using traditional routes (GET, POST, PUT, DELETE)
                  </li>
                </ul>
              </div>
              <div className="m-4">
                <h2 className="text-2xl text-green" id="installation">
                  Installation
                </h2>
                <p className="m-4">
                  To use Branch, you will first need to ensure that{' '}
                  <a
                    href="https://docs.rs/crate/ripgrep/0.2.7"
                    className="font-medium text-blue"
                  >
                    RipGrep
                  </a>{' '}
                  (a command line search tool) is installed on your machine.
                </p>
                <p className="m-4 ml-10">
                  To check to see what version of RipGrep is installed on your
                  machine, enter the following in your terminal.
                </p>
                <p className="m-4 ml-16 font-comp bg-green-100 p-2 w-[300px]">
                  $ rg --version
                </p>
                <p className="m-4 ml-10">
                  We recommend that you use version 13.0.0 or newer.
                </p>
                <br />
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
                  className="ml-20 font-bold text-link text-3xl"
                  href="https://docs.rs/crate/ripgrep/0.2.7"
                >
                  - RipGrep Docs -
                </a>
                <p className="m-4 ml-10 mr-40">
                  Once you have ripGrep installed on your machine, it is time to
                  install the Branch extension into VSCode. Click the install
                  link on the top right of this page to navigate to the
                  VisualStudio Marketplace. Now just click install and follow
                  the prompts.
                </p>
              </div>
              <div className="m-4" id="instructions">
                <h2 className="text-2xl text-green" id="instructions">
                  Instructions
                </h2>
                <br />
                <div id="layoutExplinationBox" className="w-full flex">
                  <div id="letteredExplination" className=" m-4 mr-5">
                    <h3>The Branch view consists of four primary sections:</h3>
                    <br />
                    <ul id="shortList" className="ml-40">
                      <li>
                        <span className="font-bold text-xl">A</span>
                        <span className="font-bold"> - Route Tree </span>
                      </li>
                      <li>
                        <span className="font-bold text-xl">B</span>
                        <span className="font-bold"> - Query Fields </span>
                      </li>
                      <li>
                        <span className="font-bold text-xl">C</span>
                        <span className="font-bold">
                          {' '}
                          - Request Body Field{' '}
                        </span>
                      </li>
                      <li>
                        <span className="font-bold text-xl">D</span>
                        <span className="font-bold"> - Response Object </span>
                      </li>
                    </ul>
                    <ul className="m-4">
                      <li className="mt-[120px]">
                        <span className="font-bold text-xl">A</span>
                        <span className="font-bold"> - Route Tree: </span>This
                        is the interactive visual representation of your routes.
                        Each route that can be expanded upon will be indicated
                        by a{' '}
                        <span className="text-blue font-bold">blue circle</span>
                        . Simply click on that circle to see the route expanded.
                        When selecting an endpoint (GET, POST, etc...), Branch
                        will begin filling out the appropriate query fields
                        below.
                      </li>
                      <br />
                      <li>
                        <span className="font-bold text-xl">B</span>
                        <span className="font-bold">- Query Fields: </span> Here
                        you can determine the query parameters that you need.
                        The URL section will begin to auto-populate when you
                        click on an endpoint in the Route Tree above.
                        Additionally, the appropriate button and input field for
                        your query type will highlight.
                        <ul id="queries" className="m-4">
                          <li>
                            {' '}
                            <span className="font-bold underline">
                              GET:
                            </span>{' '}
                            After clicking the GET circle above you will see the
                            GET button highlight, and the URL field
                            auto-populate with partial data.{' '}
                            <span className="italics">
                              {' '}
                              NOTE: If a parameter is not required for your
                              request, it will bypass the query field altogether
                              and display results in the Response Object.{' '}
                            </span>
                            <br /> <br /> To complete the query, replace the
                            placeholder text with your desired target parameter.
                            Then click the highlighted GET button. Your results
                            will populate in the Response Object.
                          </li>{' '}
                          <br />
                          <li>
                            {' '}
                            <span className="font-bold underline">
                              DELETE:
                            </span>{' '}
                            After clicking the DELETE circle above you will see
                            the DELETE button highlight, and the URL field
                            autopopulate with partial data. <br /> <br /> To
                            complete the query, replace the placeholder text
                            with the target parameter you wish to delete. Then
                            click the highlighted DELETE button. <br />
                            <span className="text-red font-bold">
                              <span className="font-black">CAUTION: </span>
                              Deleting from your database is permanant. Be sure
                              you really wish to do this before clicking DELETE.
                            </span>
                          </li>{' '}
                          <br />
                          <li>
                            {' '}
                            <span className="font-bold underline">
                              POST:
                            </span>{' '}
                            After clicking the POST circle above you will see
                            the POST button highlight. However, the URL field
                            will NOT populate as it is not necessary for this
                            type of request. <br /> <br /> Using the Key & Value
                            fields, enter the appropriate data per your schema.
                            As you enter each pair and click Add To Body, it
                            will populate in the Request Body Field to the
                            right. When you have entered all the necessary
                            parameters, click the POST button to complete your
                            query.
                          </li>{' '}
                          <br />
                          <li>
                            {' '}
                            <span className="font-bold underline">
                              PUT:
                            </span>{' '}
                            After clicking the PUT circle above you will see the
                            PUT button highlight, and the URL field autopopulate
                            with partial data. <br /> <br /> To complete the
                            query, replace the placeholder text with the target
                            parameter you wish to modify. Now individually enter
                            any key/value pairs necessary to the fields below.{' '}
                            <br /> <br /> As you enter each pair and click Add
                            To Body, it will populate in the Request Body Field
                            to the right. When you have entered all the
                            necessary parameters, click the PUT button to
                            complete your query.
                          </li>{' '}
                          <br />
                        </ul>
                      </li>
                      <br />
                      <li>
                        <span className="font-bold text-xl">C</span>
                        <span className="font-bold">
                          - Request Body Field:{' '}
                        </span>
                        Here, you will see the request body when you are
                        generating a POST or PUT request. <br />
                        <br />
                        If you enter incorrect data, click the X button to clear
                        the field and restart building your query.
                        <br />
                        <br />
                        IMPORTANT: This section will remain empty when building
                        GET or DELETE queries.
                      </li>
                      <br />
                      <li>
                        <span className="font-bold text-xl">D</span>
                        <span className="font-bold"> - Response Object: </span>
                        This is where the results of your query will be
                        displayed.
                      </li>
                    </ul>
                  </div>
                  <div id="instructionImages">
                    <div id="sampleAppLayout" className="">
                      <img
                        src="https://imgur.com/UYUZl3Q.png"
                        alt="Example App Layout"
                        className="rounded-lg border-4 border-black mt-7 w-[80%]"
                      />
                    </div>
                    <div id="sampleAppLayout" className="">
                      <img
                        src="https://imgur.com/UYUZl3Q.png"
                        alt="Example App Layout"
                        className="rounded-lg border-4 border-black mt-7 w-[80%]"
                      />
                    </div>
                    <div id="getExplination">
                      <img
                        src="https://imgur.com/7hqoJ7q.jpg"
                        alt="Sample GET Query"
                        className="rounded-lg border-4 border-black mt-[78px] w-[80%]"
                      />
                    </div>
                    <div id="deleteExplination">
                      <img
                        src="https://imgur.com/7hqoJ7q.jpg"
                        alt="Sample DELETE Query"
                        className="rounded-lg border-4 border-black mt-[115px] w-[80%]"
                      />
                    </div>
                    <div id="postExplination">
                      <img
                        src="https://imgur.com/7hqoJ7q.jpg"
                        alt="Sample POST Query"
                        className="rounded-lg border-4 border-black mt-[160px] w-[80%]"
                      />
                    </div>
                    <div id="putExplination">
                      <img
                        src="https://imgur.com/7hqoJ7q.jpg"
                        alt="Sample PUT Query"
                        className="rounded-lg border-4 border-black mt-[160px] w-[80%]"
                      />
                    </div>
                    <div id="requestBodyField">
                      <img
                        src="https://imgur.com/UYUZl3Q.png"
                        alt="Request Body Field"
                        className="rounded-lg border-4 border-black mt-[270px] w-[80%]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-4">
                <h2 className="text-2xl text-green" id="chocoCake">
                  Chocolate Cake Recipe
                </h2>
                <h3>
                  Because every website is better if it has a chocolate cake
                  recipe!
                </h3>{' '}
                <br />
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
              <br /> <br />
              <div id="buffer" className="flex w-full pb-[100px]"></div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
