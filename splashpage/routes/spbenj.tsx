//================================
// Easter Egg Page - Chase Benjamin
//================================

//================================
// Imports
//================================
import { PageProps } from '$fresh/server.ts';
import Header from '../islands/Header.tsx';
import Footer from '../islands/Footer.tsx';

//================================
// Easter Egg HTML & Tailwind CSS
//================================

export default function AboutPage() {
  return (
    <>
      <head>
        <title>Branch - Benjamin</title>
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
              Congratulations!
            </h1>

            <img
              className="max-w-[90px] max-h-[50px] self-center mt-[70px]"
              src="http://www.clker.com/cliparts/s/A/l/x/m/b/brown-branch-fancy-hi.png"
              alt="branch squiggle"
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl">
              You found a secret branch of our website!
            </h2>
            <p>
              Here, you will learn something special about one of our
              delvelopers:
            </p>
          </div>
          <div className="flex w-full justify-center">
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                id="myFace"
                src="https://imgur.com/Od6cI5p.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Chase Benjamin <br />
                  <a
                    id="myGithubLink"
                    href="https://github.com/chasebenj"
                    className="underline text-blue-700"
                  >
                    Github
                  </a>
                  <br />
                  <a
                    id="myLinkedInProfile"
                    href="www.linkedin.com/in/jason-goldman-3039986"
                    className="underline text-blue-700"
                  >
                    LinkedIn
                  </a>
                  <br />
                  Developer
                </p>
                <br />
              </div>
              <div id="special fact" className="text-center">
                FACT: I am a D3 master and a resource guru!
              </div>
            </div>
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                id="Gatsby"
                src="https://imgur.com/LgHFxQ7.png"
                alt="CatFace"
                className="max-w-[200px] rounded-md
              "
              />
              <div id="teamText" className="text-center">
                <p>
                  Gatsby 'Catvid' Goldman <br />
                  <br />
                  Snuggler
                </p>
                <br />
              </div>
              <div id="secret pets" className="text-center">
                Adopted during the pandemic. Loves belly rubs. Snores loudly.
              </div>
            </div>{' '}
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                id="Grimm"
                src="https://imgur.com/m9WNtWs.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Grimm 'Catio' Goldman <br />
                  <br />
                  Mischief Maker
                </p>
                <br />
              </div>
              <div id="secret pets" className="text-center">
                Loves to play fetch! Must sit in every lap. Constantly moving.
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
