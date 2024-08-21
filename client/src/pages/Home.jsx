import HomeBg from "../assets/Home.png";
import Logo from "../assets/Milan-logo.png";

function Home() {
  return (
    // <h1>Welcome Home</h1>
    <div
      className="w-full h-full min-h-screen bg-cover bg-center m-0"
      style={{ backgroundImage: `url(${HomeBg})` }}
    ></div>
  );
}

export default Home;
