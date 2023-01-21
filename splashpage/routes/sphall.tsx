import { PageProps } from '$fresh/server.ts';
import Header from '../islands/Header.tsx';
import Footer from '../islands/Footer.tsx';

export default function AboutPage() {
  return (
    <>
      <head>
        <title>VS|Branch - Hall</title>
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
                src="https://imgur.com/Zy1xRqP.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Zach Hall <br />
                  <a
                    id="myGithubLink"
                    href="https://github.com/z-r-hall"
                    className="underline text-blue-700"
                  >
                    Github
                  </a>
                  <br />
                  <a
                    id="myLinkedInProfile"
                    href="https://www.linkedin.com/in/z-r-hall/"
                    className="underline text-blue-700"
                  >
                    LinkedIn
                  </a>
                  <br />
                  Software Engineer
                </p>
                <br />
              </div>
              <div id="special fact" className="text-center">
                I love spending time backpacking through the woods or lazily
                kayaking down the river.
              </div>
            </div>
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                id="Gatsby"
                src="https://imgur.com/pzkbra4.png"
                alt="CatFace"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Paper Towel Pete! <br />
                  <br />
                  Lover (mostly)
                </p>
                <br />
              </div>
              <div id="secret pets" className="text-center">
                I love going in and out, attacking Sophie for no reason, and
                sleeping.
              </div>
            </div>{' '}
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                id="Grimm"
                src="https://imgur.com/rybiruT.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Sophie Belle <br />
                  <br />
                  The Curious One
                </p>
                <br />
              </div>
              <div id="secret pets" className="text-center">
                I am a lover of cold weather, barking into the darkness, and
                making sure Pete doesn't eat my food.
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
