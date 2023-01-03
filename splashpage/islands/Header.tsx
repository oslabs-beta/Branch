export default function Header() {
  return (
    <>
      <header className=" fixed top-0 bg-light-green w-[100%] h-17">
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
            <p className="text-green mt-2">VS|Branch</p>
          </div>
          <div className="w-1/4 flex justify-end">
            <div className="my-auto">
              <a href="/about" className="grow">
                About Us
              </a>
            </div>
            <div className="self-end my-auto ml-5 mr-3">
              <a className="" href="https://github.com/oslabs-beta/VS-Branch">
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
