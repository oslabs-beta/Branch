import { PageProps } from '$fresh/server.ts';
import Header from '../islands/Header.tsx';
import Footer from '../islands/Footer.tsx';

export default function AboutPage() {
  return (
    <>
      <head>
        <title>VS|Branch - Documentation</title>
      </head>
      <main>
        <Header></Header>
        <div className="bg-off-white h-full">
          <div className="m-[10px] mx-auto"></div>
          <div className="flex justify-center">
            <img
              className="max-w-[90px] max-h-[50px] self-center scale-x-[-1] mt-[70px]"
              src="http://www.clker.com/cliparts/s/A/l/x/m/b/brown-branch-fancy-hi.png"
              alt="branch squiggle"
            />
            <h1 className="pt-[100px] text-4xl text-center pb-[50px] text-green  ml-5 mr-5">
              Documentation
            </h1>
            <img
              className="max-w-[90px] max-h-[50px] self-center mt-[70px]"
              src="http://www.clker.com/cliparts/s/A/l/x/m/b/brown-branch-fancy-hi.png"
              alt="branch squiggle"
            />
          </div>
          <div className="m-4">
            <h2 className="text-2xl text-green">Overview</h2>
            <p className="m-4">
              VS|Branch is an extension for VSCode which allows developers to
              view and test their backend routes within a Deno runtime
              environment.
            </p>
          </div>
          <div className="m-4">
            <h2 className="text-2xl text-green">Installation</h2>
            <p className="m-4">
              To install VS|Branch click the link on the top right of the page.
            </p>
          </div>
          <div className="m-4">
            <h2 className="text-2xl text-green">Controlls</h2>
            <p className="m-4">TBD</p>
          </div>
          <div className="m-4">
            <h2 className="text-2xl text-green">Chocolate Cake Recipe</h2>
            <p className="m-4">
              <p>2/3 cup butter - softened</p>
              <p>1-2/3 cups sugar</p>
              <p>3 large eggs - room temperature</p>
              <p>2 cups all-purpose flour</p>
              <p>2/3 cup baking cocoa</p>
              <p>1-1/4 teaspoons baking soda</p>
              <p>1 teaspoon salt</p>
              <p>1-1/3 cups 2% milk</p>
              <p>Confectioners' sugar or favorite frosting</p>
              <br />
              <p className="w-2/3">
                In a bowl, cream butter and sugar until light and fluffy, 5-7
                minutes. Add eggs, 1 at a time, beating well after each
                addition. In a seperate bowl, combine flour, cocoa, baking soda
                and salt. Add dry mixture to creamed mixture alternately with
                milk, beating until smooth after each addition. Pour batter into
                a greased and floured 13x9-in. baking pan.
              </p>
              <br />
              <p className="w-2/3">
                Bake at 350° for 35-40 minutes, or until a toothpick inserted in
                center comes out clean. Cool completely on a wire rack. When
                cake is cool, dust with confectioners' sugar or top with your
                favorite frosting.
              </p>
              <br />
              <p>Nutrition Facts</p>
              <p className="font-light text-xs">
                1 piece: 257 calories, 10g fat (6g saturated fat), 67mg
                cholesterol, 368mg sodium, 38g carbohydrate (23g sugars, 1g
                fiber), 4g protein.
              </p>
            </p>
          </div>
          <div className="flex w-full pb-[100px]"></div>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
