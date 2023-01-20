//================================
// Homepage for VS|Branch
//================================

//================================
// Imports
//================================
import { Head } from '$fresh/runtime.ts';
import Header from '../islands/Header.tsx';
import Footer from '../islands/Footer.tsx';

//================================
// Homepage HTML & Tailwind CSS
//================================

export default function Home() {
  return (
    <>
      <Head>
        <title>VS|Branch - Homepage</title>
      </Head>
      <main>
        <Header></Header>
        <div id="body" className="w-full h-full bg-off-white pt-[100px] ">
          <div className="h-1/2 flex">
            <div className="w-[50%]">
              <p className="my-20 mx-10 text-justify text-lg">
                FINALLY! A backend visualization solution for the Deno runtime
                environment based within VS|Code has arrived. No more exporting
                your files to another website. No more flipping between screens.
                Now you can see it all and do it all from one easy, familiar
                location!
              </p>
            </div>
            <div className="w-[50%]">
              <img
                className="max-w-[75%] mx-auto mt-10 rounded-xl"
                src="https://yaobinouyang.gallerycdn.vsassets.io/extensions/yaobinouyang/codeatlas/1.3.34/1635120555850/273052/1/main.png"
                alt="Placeholer Image"
              />
            </div>
          </div>
          <div className="h-1/2 flex">
            <div className="w-[50%]">
              <img
                className="max-w-[75%] mx-auto mt-10 rounded-xl"
                src="https://miro.medium.com/max/960/0*9gdFGVW4YGBCHYD7.jpg"
                alt="Placeholder"
              />
            </div>
            <div className="w-[50%]">
              <p className="my-20 mx-10 text-justify text-lg">
                MORE WORDS! Very important words. Words that will get us all
                hired by top end companies. Words so good it'll make Ryan cry
                the next time he reviews our progress. Words that will land our
                entire team into codesmith lore. Words so powerful that James
                will teach a hard-parts lecture on that alone.
              </p>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
