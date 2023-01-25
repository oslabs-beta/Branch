//================================
// Header Island - included on all webpages
//================================

//================================
// Imports
//================================

// NO IMPORTS NECESSARY

//================================
// Header Island HTML & Tailwind CSS
//================================

export default function Header() {
  return (
    <>
      <header className=" fixed top-0 bg-light-green w-[100%] h-17 z-10">
        <div className="flex flex-row max-w-[100%]">
          <div className="w-[1500px] flex">
            <a href="/">
              <img
                className="max-w-[60px] ml-5 mt-2"
                src="https://imgur.com/h7zmDfS.png"
                alt="logoHolder"
              ></img>
            </a>
            <img
              className="h-[40px] ml-1 my-3"
              src="https://imgur.com/aFx2uY8.png"
              alt="logoHolder"
            ></img>
          </div>
          <div className="w-1/2 text-left text-5xl">
            <p className="text-green mt-2 ml-[40px]"></p>
          </div>
          <div className="w-[800px] flex justify-end">
            <div className="my-auto">
              <a href="/docs" className="grow mr-10 font-bold">
                Docs
              </a>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=Branch.branch"
                className="grow mr-10 font-bold"
              >
                Install
              </a>
              <a href="/about" className="grow font-bold mr-5">
                About Us
              </a>
            </div>
            <div className="self-end my-auto ml-5 mr-10">
              <a className="" href="https://github.com/oslabs-beta/Branch">
                <img
                  className="max-w-[30px]"
                  src="https://imgur.com/Eq4BPYR.png"
                  alt="Github"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
