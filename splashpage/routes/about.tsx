//================================
// About Page - Information about the team (includes 4 easteregg links)
//================================

//================================
// Imports
//================================
import { PageProps } from '$fresh/server.ts';
import Header from '../islands/Header.tsx';
import Footer from '../islands/Footer.tsx';

//================================
// About Page HTML & Tailwind CSS
//================================

export default function AboutPage() {
  return (
    <>
      <head>
        <title>VS|Branch - About Us</title>
      </head>
      <main>
        <Header></Header>
        <div className="bg-off-white h-screen">
          <div className="flex justify-center">
            <img
              className="max-w-[90px] max-h-[50px] self-center scale-x-[-1] mt-[70px]"
              src="http://www.clker.com/cliparts/s/A/l/x/m/b/brown-branch-fancy-hi.png"
              alt="branch squiggle"
            />
            <h1 className="pt-[100px] text-4xl text-center pb-[50px] text-green  ml-5 mr-5">
              About Us
            </h1>
            <img
              className="max-w-[90px] max-h-[50px] self-center mt-[70px]"
              src="http://www.clker.com/cliparts/s/A/l/x/m/b/brown-branch-fancy-hi.png"
              alt="branch squiggle"
            />
          </div>
          <div className="flex w-full">
            <div className="w-1/4 h-[380px] bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                src="https://i.imgur.com/1XXAny6.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Foster Sullivan <br />
                  <a
                    href="https://github.com/SirGoatsalot"
                    className="underline text-blue-700"
                  >
                    Github
                  </a>
                  <br />
                  <a
                    href="https://github.com/SirGoatsalot"
                    className="underline text-blue-700"
                  >
                    LinkedIn
                  </a>
                  <br />
                  Developer
                </p>
              </div>
              <div id="secret">
                <a href="/spsull" className="text-white">
                  Easter Egg
                </a>
              </div>
            </div>
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                src="https://imgur.com/Od6cI5p.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Chase Benjamin <br />
                  <a
                    href="https://github.com/Chasebenj"
                    className="underline text-blue-700"
                  >
                    Github
                  </a>
                  <br />
                  <a
                    href="https://github.com/SirGoatsalot"
                    className="underline text-blue-700"
                  >
                    LinkedIn
                  </a>
                  <br />
                  Developer
                </p>
              </div>
              <div id="secret">
                <a href="/spbenj" className="text-white">
                  Easter Egg
                </a>
              </div>
            </div>
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                src="https://imgur.com/Zy1xRqP.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Zach Hall <br />
                  <a
                    href="https://github.com/z-r-hall"
                    className="underline text-blue-700"
                  >
                    Github
                  </a>
                  <br />
                  <a
                    href="https://www.linkedin.com/in/z-r-hall/"
                    className="underline text-blue-700"
                  >
                    LinkedIn
                  </a>
                  <br />
                  Developer
                </p>
              </div>
              <div id="secret">
                <a href="/sphall" className="text-white">
                  Easter Egg
                </a>
              </div>
            </div>
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                src="https://i.imgur.com/1XXAny6.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Jason Goldman <br />
                  <a
                    href="https://github.com/Trablink"
                    className="underline text-blue-700"
                  >
                    Github
                  </a>
                  <br />
                  <a
                    href="www.linkedin.com/in/jason-goldman-3039986"
                    className="underline text-blue-700"
                  >
                    LinkedIn
                  </a>
                  <br />
                  Developer
                </p>
              </div>
              <div id="secret">
                <a href="/spgold" className="text-white">
                  Easter Egg
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
