import Router from 'preact-router';
import { useEffect } from 'preact/hooks';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { Home } from './pages/Home.jsx';
import { Features } from './pages/Features.jsx';
import { Commands } from './pages/Commands.jsx';
import { Pricing } from './pages/Pricing.jsx';
import { Add } from './pages/Add.jsx';
import { Source } from './pages/Source.jsx';
import { Donate } from './pages/Donate.jsx';
import { TOS } from './pages/TOS.jsx';
import { Privacy } from './pages/Privacy.jsx';
import { ContextMenu } from './pages/ContextMenu.jsx';
import { AddItRedirect } from './pages/AddItRedirect.jsx';
import { NotFound } from './pages/NotFound.jsx';

// Page metadata
const pageMeta = {
  '/': { title: 'Stewbot', desc: 'Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.' },
  '/features': { title: 'Features - Stewbot', desc: 'List of features for Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.' },
  '/commands': { title: 'Commands - Stewbot', desc: 'The full command list for Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.' },
  '/pricing': { title: 'Pricing - Stewbot', desc: 'List of the free pricing options for Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.' },
  '/add': { title: 'Add to Server - Stewbot', desc: 'Add Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe, to your server.' },
  '/source': { title: 'Source Code - Stewbot', desc: 'Source Code for Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.' },
  '/donate': { title: 'Donate - Stewbot', desc: 'Donate to Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.' },
  '/tos': { title: 'Terms of Service - Stewbot', desc: 'Terms of Service for Stewbot' },
  '/privacy': { title: 'Privacy Policy - Stewbot', desc: 'Privacy Policy for Stewbot' },
  '/contextMenu': { title: 'How to use the Context Menu - Stewbot', desc: 'To open the context menu on mobile, hold down on a message until a menu appears. On desktop, right click on a message.' }
};

function updateMeta(url) {
  // Skip during SSR (no document available)
  if (typeof document === 'undefined') return;
  
  const meta = pageMeta[url] || { title: '404 - Stewbot', desc: 'Page not found' };
  document.title = meta.title;
  
  // Update or create meta tags
  let descMeta = document.querySelector('meta[property="og:description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('property', 'og:description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', meta.desc);
  
  let titleMeta = document.querySelector('meta[property="og:title"]');
  if (!titleMeta) {
    titleMeta = document.createElement('meta');
    titleMeta.setAttribute('property', 'og:title');
    document.head.appendChild(titleMeta);
  }
  titleMeta.setAttribute('content', meta.title);
}

function handleRouteChange(e) {
  updateMeta(e.url);
}

export function App({ url, pageData = {} }) {
  const curDomain = typeof window !== 'undefined' ? window.location.href : (pageData.curDomain || '');
  
  useEffect(() => {
    // Set initial meta tags
    if (typeof window !== 'undefined') {
      updateMeta(window.location.pathname);
      
      // Ensure viewport meta
      if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        document.head.appendChild(viewport);
      }
      
      // Ensure theme color
      if (!document.querySelector('meta[name="theme-color"]')) {
        const theme = document.createElement('meta');
        theme.setAttribute('name', 'theme-color');
        theme.setAttribute('content', '#006400');
        document.head.appendChild(theme);
      }
      
      // Ensure OG image
      if (!document.querySelector('meta[property="og:image"]')) {
        const ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        ogImage.setAttribute('content', 'https://stewbot.kestron.com/stewbot.jpg');
        document.head.appendChild(ogImage);
      }
      
      // Ensure OG URL
      if (!document.querySelector('meta[property="og:url"]')) {
        const ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        ogUrl.setAttribute('content', 'https://stewbot.kestron.com');
        document.head.appendChild(ogUrl);
      }
    }
  }, []);
  
  return (
    <>
      {curDomain.includes('kestron.software') && (
        <div id="moving" style="width:100%;margin:0.5rem;background-color:rgb(255,255,0);color:#000;text-align:center;height:3rem;font-size:2rem;">
          This website is moving! Find us at <a href={curDomain.replace(/kestron\.software/g, 'kestron.com')}>kestron.com</a>!
        </div>
      )}
      <Header />
      <Router url={url} onChange={handleRouteChange}>
        <Home path="/" />
        <Features path="/features" />
        <Commands path="/commands" pageData={pageData} />
        <Pricing path="/pricing" pageData={pageData} />
        <Add path="/add" />
        <AddItRedirect path="/addIt" />
        <Source path="/source" pageData={pageData} />
        <Donate path="/donate" />
        <TOS path="/tos" />
        <Privacy path="/privacy" />
        <ContextMenu path="/contextMenu" />
        <NotFound default />
      </Router>
      <Footer />
    </>
  );
}
