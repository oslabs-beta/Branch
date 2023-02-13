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
        <title>Branch - Homepage</title>
        <link rel="shortcut icon" href="https://imgur.com/SJ36zku.png" />
      </Head>
      <main>
        <Header></Header>
        <div
          id="body"
          className="w-full h-full overflow-scroll bg-off-white pt-[100px] "
        >
          <div id="welcomeToBranch" className="h-1/2 flex mb-10">
            <div className="w-[50%]">
              <h1 className="my-10 mx-10 text-justify text-3xl flex">
                Welcome to
                <img
                  className="h-[30px] mt-[2px] ml-[2px]"
                  src="https://imgur.com/aFx2uY8.png"
                  alt="branch"
                />{' '}
                !
              </h1>
              <h2 className="my-10 mx-10 text-justify text-xl">
                Branch is a unique & convenient backend route visualization tool
                built directly into VS Code! With Branch, you can:
              </h2>
              <ul className="ml-20 list-square">
                <li>
                  View your app's routes without leaving your editing
                  environment
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
            </div>
            <div className="w-[50%]">
              <img
                className="max-w-[75%] mx-auto mt-10 "
                src="https://imgur.com/znZpn2Z.png"
                alt="Sample VSCode view with branch"
              />
            </div>
          </div>
          <div
            id="supportedEnvironments"
            className="h-[400px] flex bg-off-white2"
          >
            <div className="w-[50%] ">
              <img
                className="w-[200px] position: relative top-[40px] left-[60px] z-0"
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Deno.svg"
                alt="Deno Logo"
              />
              <img
                className="w-[200px] position: relative top-[0px] left-[350px] z-0"
                src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
                alt="Node.js Logo"
              />
              <img
                className="w-[150px] position: relative top-[-230px] left-[250px] z-0"
                src="https://imgur.com/DE6JfVw.png"
                alt="Check Mark for Deno"
              />
              <img
                className="w-[150px] position: relative top-[-300px] left-[560px] z-0"
                src="https://imgur.com/DE6JfVw.png"
                alt="Check Mark for Node"
              />
            </div>
            <div className="w-[50%] mb-10">
              <h1 className="my-10 mx-10 text-justify text-3xl">
                Supported Environments:
              </h1>
              <h2 className="my-10 mx-10 text-justify text-xl">
                Branch is designed to support apps developed within either a
                Node.js or Deno/Oak runtime environment.
              </h2>
              <p className="my-10 mx-16 text-justify text-lg">
                Whether you prefer the traditional approach of developing in
                Node.js or the more modern approach of Deno, Branch has you
                covered! Our data scraper is designed to work with you.
              </p>
            </div>
          </div>
          <div id="welcomeToBranch" className="h-1/2 flex mb-10">
            <div className="w-[50%]">
              <h1 className="my-10 mx-10 text-justify text-3xl">
                How does Branch work?
              </h1>
              <h2 className="my-10 mx-10 text-justify text-xl">
                We stand on the shoulders of giants!
              </h2>
              <p className="ml-14 mb-[100px]">
                Branch works by utilizing the powerful capabilities of RipGrep
                to scrape through your app’s files looking for traditional route
                indicators. Our robust algorithm then uses regular expressions
                to consolidate your routes into a single nested object. This
                object is then passed through D3’s visualization tool and into
                our custom GUI for your coding enjoyment.
              </p>
            </div>
            <div className="w-[50%] h-[100px]">
              <img
                className="w-[75px] position: relative top-[80px] left-[30px] z-0"
                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
                alt="VSCode Logo"
              />
              <img
                className="w-[75px] position: relative top-[5px] left-[120px] z-0"
                src="https://imgur.com/Q9Fzuwk.png"
                alt="Plus sign"
              />
              <img
                className="w-[100px] position: relative top-[-68px] left-[210px] z-0 mt-4"
                src="https://imgur.com/UmgImh1.png"
                alt="Ripgrep Logo"
              />
              <img
                className="w-[75px] position: relative top-[-140px] left-[315px] z-0"
                src="https://imgur.com/Q9Fzuwk.png"
                alt="Plus sign"
              />
              <img
                className="w-[75px] position: relative top-[-215px] left-[400px] z-0"
                src="https://github.com/d3/d3-logo/blob/master/d3.png?raw=true"
                alt="D3 logo"
              />
              <img
                className="w-[75px] position: relative top-[-290px] left-[490px] z-0"
                src="https://imgur.com/wjMSqZw.png"
                alt="Equals Sign"
              />
              <img
                className="w-[175px] position: relative top-[-270px] left-[220px] z-0"
                src="https://imgur.com/XVDamPl.png"
                alt="Branch Logo"
              />
            </div>
          </div>
          <div id="supportedEnvironments" className="h-1/2 flex bg-off-white2">
            <div className="w-[50%] ">
              <img
                className="scale-x-[-1] w-[325px] my-10 ml-[200px]"
                src="https://miro.medium.com/max/1000/1*aFtggN7wbeBIKCN5i3kTdw.webp"
                alt="Growth Mindset"
              />
            </div>
            <div className="w-[50%] mb-10">
              <h1 className="my-10 mx-10 text-justify text-3xl">
                Grow with us:
              </h1>
              <h2 className="my-10 mx-10 text-justify text-xl">
                Branch is proud to be part of a vibrant open source community.
              </h2>
              <p className="mx-14">
                As you use Branch, please be sure to share your concerns,
                issues, bugs, and ideas. We are excited to grow alongside your
                needs as a developer.
              </p>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
