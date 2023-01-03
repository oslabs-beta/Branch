import { PageProps } from '$fresh/server.ts';
import Header from '../islands/Header.tsx';
import Footer from '../islands/Footer.tsx';

export default function AboutPage() {
  return (
    <>
      <head>
        <title>VS|Branch - About Us</title>
      </head>
      <main>
        <Header></Header>
        <div className="bg-off-white h-screen">
          <h1 className="pt-[100px] text-4xl text-center pb-[50px]">
            About Us
          </h1>
          <div className="flex w-full">
            <div className="w-1/4 bg-white m-3 p-3 rounded-xl grid justify-items-center shadow-md">
              <img
                src="https://i.imgur.com/1XXAny6.png"
                alt="Team Face"
                className="max-w-[200px]"
              />
              <div id="teamText" className="text-center">
                <p>
                  Jason Goldman <br />
                  <a href="https://github.com/Trablink">Github</a>
                  <br />
                  Developer
                </p>
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
                  <a href="https://github.com/Trablink">Github</a>
                  <br />
                  Developer
                </p>
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
                  <a href="https://github.com/Trablink">Github</a>
                  <br />
                  Developer
                </p>
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
                  <a href="https://github.com/Trablink">Github</a>
                  <br />
                  Developer
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
