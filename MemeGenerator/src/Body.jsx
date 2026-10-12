import { useState, useEffect } from "react";
export default function Body() {
  const [topText, setTopText] = useState("One does not simply");
  const [bottomText, setBottomText] = useState("Walk into Mordor");
  const [image, setImage] = useState("http://i.imgflip.com/1bij.jpg");
  const [meme, setMeme] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        setMeme(data.data.memes);
        setImage(data.data.memes[0].url);
      });
  }, []);

  function getNewMeme() {
    setImage(meme[Math.floor(Math.random() * meme.length)].url);
  }

  return (
    <main>
      <div className="form">
        <label>
          <h2>Top Text</h2>
          <input
            type="text"
            placeholder="Ex. One does not simply"
            name="topText"
            onChange={(event) => setTopText(event.target.value)}
            value={topText}
          />
        </label>

        <label>
          <h2>Bottom Text</h2>
          <input
            type="text"
            placeholder="Ex. Walk into Mordor"
            name="bottomText"
            onChange={(event) => setBottomText(event.target.value)}
            value={bottomText}
          />
        </label>
        <button onClick={getNewMeme}>Get a new meme image</button>
      </div>
      <div className="meme">
        <img src={image} alt="Meme" />
        <span className="top">{topText}</span>
        <span className="bottom">{bottomText}</span>
      </div>
    </main>
  );
}
