import { useState, useEffect } from 'preact/hooks';

export function Source({ pageData = {} }) {
  const [stewbotSource, setStewbotSource] = useState(pageData.stewbotSource || '');
  const [hljsReady, setHljsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.hljs) {
      setHljsReady(true);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.1/build/styles/atom-one-dark.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.1/build/highlight.min.js';
    script.async = true;
    script.onload = () => setHljsReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (stewbotSource) return;

    fetch('https://raw.githubusercontent.com/Stewared/Stewbot/main/index.js')
      .then(res => res.text())
      .then(data => {
        if (!data) throw Error("No code");
        setStewbotSource(data);
      })
      .catch(err => console.error('Failed to fetch source code:', err));
  }, []);

  useEffect(() => {
    if (!hljsReady || !stewbotSource) return;
    window.hljs.highlightAll();
  }, [hljsReady, stewbotSource]);  

  function roll() {
    if (typeof document !== 'undefined') {
      document.body.innerHTML = `<video width="100%" autoplay><source src="/roll.mp4" type="video/mp4"></video>${document.body.innerHTML}`;
    }
  }

  return (
    <>
      <h1 class="centered">Source Code</h1>
      <div class="content featureCard">
        <img src="https://avatars.githubusercontent.com/u/9919?s=400&v=4" style="background-color:#161b22; padding: 1rem;" alt="GitHub" />
        <div class="descriptionWrapper">
          <div>
            <h2>Open Source & Transparent</h2>
            <p>Stewbot's code is fully open source. We believe in transparency and want you to know exactly what the bot is doing.</p>
          </div>
        </div>
      </div>
      <div class="content">
        <h2 style="color: var(--secondardy-text);">GitHub Repository</h2>
        <p>There is a GitHub Repository available containing all of the following as well as additional essential files and instructions for creating <strong>env.json</strong> to run locally.</p>
        <div class="buttonWrapper" style="min-height: 4rem;">
          <a href="https://github.com/KestronProgramming/Stewbot" target="_blank" class="primaryActionBtn">View Stewbot Repository →</a>
        </div>
        <p><sub><em>Were you looking for this website's source code? It can be found <a href="https://github.com/KestronProgramming/Stewbot-Website">here</a>.</em></sub></p>
      </div>
      <div class="content">
        <input type="button" class="secondaryBtn" value="View env.json" onClick={roll} style="margin-bottom: 1rem; width: 100%" /><br />
        <h2 style="color: var(--secondardy-text);">Stewbot <strong>index.js</strong></h2>
        <pre style="overflow-x: auto; border-radius: 5px;">
          <code class="language-js">{stewbotSource}</code>
        </pre>
      </div>
    </>
  );
}
