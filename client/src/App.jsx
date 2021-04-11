import React, {useState} from 'react';
import './App.css';

function App() {
  const [text, setText] = useState(`Many countries signed the Paris climate deal in 2016, and many companies promised that they would care more about the environment.

Big fashion companies said that they would choose better materials and reduce waste and emissions. Recently a report said that these companies were not successful.

A study looked at the fifteen biggest fashion brands and the highest possible score, which they could get, was 100. The most important things were emissions, waste, workers´ rights, water, and materials. Most companies scored around 36 points, and it meant that they did not keep their promise. The biggest problems were waste and workers´ rights.

More than 70% of people prefer buying clothes which do not harm the environment. It means that fashion companies must try harder to keep their promises or they will lose customers.`);
  const [data, setData] = useState({
    easy: `Many countries signed the Paris climate deal in 2016, and many companies promised to change.

Big fashion companies chose better materials and reduced waste and emissions. Recently a report said that these companies did not succeed. A study looked at fifteen big fashion brands and their best scores, which they could get, was 100. Companies scored 30 points for emissions. This meant that they did not keep their promise to reduce waste.

More than 70% of people prefer not buying clothes which hurt the environment. It means that fashion companies must do more to keep their promise or they will lose customers.`,
  hard: `Many countries in Europe have committed to maintaining their obligations under the Paris agreement, and many firms have promised to do more to protect and increase renewable energy sources.

Big fashion companies said that they would choose better materials in an effort to keep profits high and environmental standards intact. Recently a report said that these companies were not successful.

A study looked at the fifteen biggest fashion brands and the maximum score, which they could get, came up with a score of 100. The most important things were austerity measures in carbon reduction, effectively taxes on emissions, waste, workers rights, water, and materials. Most companies scored just 36 points, meaning that they did not keep their word. The biggest challenges have been waste and workers rights.

More than 70% of people prefer keeping clothes that do not damage the environment. It means that fashion companies must keep up their campaign of convincing people that buying clothes which don't harm the environment is a good idea.`});

  return (
    <main>
      <h1>THE COLEX CHRONICLE</h1>
      <hr/>
      <div className="bar">
        <p>No. {getEdition()}</p>
        <p>{getCurrentDate()}</p>
        <p>colex.co</p>
      </div>
      <hr/>
      <h2 className="headline">NOVEL AI TO CHANGE READABILITY</h2>
      <div className="content">
        <div>
          <h3>EASY VERSION</h3>
          <p dangerouslySetInnerHTML={{__html: data.easy.replace(/\n/g, "<p/><p>")}}/>
        </div>
        <div className="textarea-container">
          <h3>YOUR TEXT</h3>
          <textarea onInput={e => {setText(e.target.value);}} value={text}/>
          <button onClick={transform(text, setData)}>TRANSFORM</button>
        </div>
        <div>
          <h3>HARD VERSION</h3>
          <p dangerouslySetInnerHTML={{__html: data.hard.replace(/\n\n/g, "<p/><p>")}}/>
        </div>
      </div>
    </main>
  );
}

const transform = (text, setData) => () => {
  fetch("https://colex-server.oleby0406.repl.co/api", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text
    })
  })
    .then(res => res.json())
    .then(setData)
};

function getEdition() {
  return Math.round(Date.now()/1000/60/60/24);
}

function getCurrentDate() {
  let date = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  date = String(days[date.getDay()]) + ", " + String(monthNames[date.getMonth()]) + " " + String(date.getDate()) + ", " + String(date.getFullYear());
  return date;
}

export default App;