import { useState, useEffect } from 'preact/hooks';

export function Pricing({ pageData = {} }) {
  const [helpCommands, setHelpCommands] = useState(pageData.helpCommands || []);
  const [sortedCommands, setSortedCommands] = useState([[], [], [], []]);

  useEffect(() => {
    // If no data, fetch from GitHub
    if (helpCommands.length === 0) {
      fetch('https://raw.githubusercontent.com/KestronProgramming/Stewbot/refs/heads/main/data/helpPages.json')
        .then(res => res.json())
        .then(data => {
          setHelpCommands(data || []);
          sortCommands(data || []);
        })
        .catch(err => console.error('Failed to fetch commands data:', err));
    } else {
      sortCommands(helpCommands);
    }
  }, []);

  function sortCommands(commands) {
    const sorted = [[], [], [], []];
    let counter = sorted.length - 1;
    const commandsCopy = [...commands];
    
    while (commandsCopy.length > 0) {
      sorted[counter].push(commandsCopy[0].name);
      commandsCopy.splice(0, 1);
      counter--;
      if (counter < 0) {
        counter = sorted.length - 1;
      }
    }
    
    setSortedCommands(sorted);
  }

  return (
    <>
      <h1 class="centered">Pricing</h1>
      <div class="tierWrapper">
        <div class="tier">
          <div class="plan">
            <h1>Free</h1>
            <h3>$0/Month</h3>
          </div>
          <ul id="free">
            {sortedCommands[0].map((cmd, i) => <li key={i}>{cmd}</li>)}
            <li><h2><i>And everything else in the other plans!</i></h2></li>
          </ul>
          <a class="bannerBtn" href="/add">Install Stewbot</a>
        </div>
        <div class="tier">
          <div class="plan">
            <h1>Pro</h1>
            <h3>$0/Month</h3>
          </div>
          <ul id="pro">
            {sortedCommands[1].map((cmd, i) => <li key={i}>{cmd}</li>)}
            <li><h2><i>And everything else in the other plans!</i></h2></li>
          </ul>
          <a class="bannerBtn" href="/add">Install Stewbot</a>
        </div>
        <div class="tier">
          <div class="plan">
            <h1>VIP</h1>
            <h3>$0/Month</h3>
          </div>
          <ul id="vip">
            {sortedCommands[2].map((cmd, i) => <li key={i}>{cmd}</li>)}
            <li><h2><i>And everything else in the other plans!</i></h2></li>
          </ul>
          <a class="bannerBtn" href="/add">Install Stewbot</a>
        </div>
        <div class="tier">
          <div class="plan">
            <h1>Exclusive</h1>
            <h3>$0/Month</h3>
          </div>
          <ul id="exclusive">
            {sortedCommands[3].map((cmd, i) => <li key={i}>{cmd}</li>)}
            <li><h2><i>And everything else in the other plans!</i></h2></li>
          </ul>
          <a class="bannerBtn" href="/add">Install Stewbot</a>
        </div>
      </div>
      <h1 class="centered" id="dontWait"><i>It's all free!</i> What are you waiting for?</h1>
      <div class="buttonWrapper">
        <a href="/add"><input value="Install Stewbot Now →" id="addButton" type="submit" /></a>
      </div>
    </>
  );
}
