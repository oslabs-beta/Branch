import { Head } from '$fresh/runtime.ts';
import Counter from '../islands/Counter.tsx';

export default function Home() {
  return (
    <>
      <Head>
        <title>VS|Branch</title>
      </Head>
      <main className="grid-cols-1">
        <header className=" bg-light-green max-w-[100%] h-1/2">
          <div className="flex flex-row max-w-[100%]">
            <div className="w-1/4">
              <a href="/">
                <img
                  className="max-w-[70px]"
                  src="https://imgur.com/sZRTCcz.png"
                  alt="logoHolder"
                ></img>
              </a>
            </div>
            <div className="w-1/2 text-center text-5xl">
              <p className="">VS|Branch</p>
            </div>
            <div className="w-1/4 flex justify-end">
              <div>
                <a href="/about" className="grow">
                  About Us
                </a>
              </div>
              <div className="self-end">
                <a className="" href="https://github.com/oslabs-beta/VS-Branch">
                  <img
                    className="max-w-[40px]"
                    src="https://imgur.com/Eq4BPYR.png"
                    alt="Github"
                  />
                </a>
              </div>
            </div>
          </div>
        </header>
        <div className="min-h-[25%]">
          <p>Part 1: Something braggy about how cool our extension is.</p>
          <p>An image or gif showing that our shit is awesome</p>
        </div>
        <div className="min-h-[25%]">
          <p>
            Part 2: If we have the time... this will be the interactive dem0
          </p>
        </div>

        <footer className="flex justify-around bg-green text-tan fixed bottom-0 w-full">
          <p>VS|Branch 2023</p>
        </footer>
      </main>
    </>
  );
}
