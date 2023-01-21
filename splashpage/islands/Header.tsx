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
      <header className=" fixed top-0 bg-light-green w-[100%] h-17">
        <div className="flex flex-row max-w-[100%]">
          <div className="w-1/8">
            <a href="/">
              <img
                className="max-w-[70px]"
                src="https://imgur.com/sZRTCcz.png"
                alt="logoHolder"
              ></img>
            </a>
          </div>
          <div className="w-1/2 text-left text-5xl">
            <p className="text-green mt-2 ml-[10px]">Branch</p>
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="my-auto">
              <a href="/docs" className="grow mr-10 font-bold">
                Docs
              </a>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=OSLabs.VSCode"
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
