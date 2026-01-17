import { render } from 'preact-render-to-string';
import { App } from './App.jsx';

export function renderApp(url, pageData = {}) {
  return render(<App url={url} pageData={pageData} />);
}

export function getHeadTags(url) {
  const baseUrl = 'https://stewbot.kestron.com';
  const imageUrl = `${baseUrl}/stewbot.jpg`;
  
  const pages = {
    '/': {
      title: 'Stewbot',
      description: 'Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.',
    },
    '/features': {
      title: 'Features - Stewbot',
      description: 'List of features for Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.',
    },
    '/commands': {
      title: 'Commands - Stewbot',
      description: 'The full command list for Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.',
    },
    '/pricing': {
      title: 'Pricing - Stewbot',
      description: 'List of the free pricing options for Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.',
    },
    '/add': {
      title: 'Add to Server - Stewbot',
      description: 'Add Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe, to your server.',
    },
    '/source': {
      title: 'Source Code - Stewbot',
      description: 'Source Code for Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.',
    },
    '/donate': {
      title: 'Donate - Stewbot',
      description: 'Donate to Stewbot, the bot designed to keep servers fun and engaging while also providing moderators the tools to keep things clean and safe.',
    },
    '/tos': {
      title: 'Terms of Service - Stewbot',
      description: 'Terms of Service for Stewbot',
    },
    '/privacy': {
      title: 'Privacy Policy - Stewbot',
      description: 'Privacy Policy for Stewbot',
    },
    '/contextMenu': {
      title: 'How to use the Context Menu - Stewbot',
      description: 'To open the context menu on mobile, hold down on a message until a menu appears. On desktop, right click on a message. To use context menu commands, select or hover over "Apps", and then select the context menu command you wish to execute.',
    }
  };

  const pageData = pages[url] || {
    title: '404 - Stewbot',
    description: 'Page not found',
  };

  return `
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta content="${pageData.title}" property="og:title" />
    <meta content="${pageData.description}" property="og:description" />
    <meta content="${baseUrl}${url === '/' ? '' : url}" property="og:url" />
    <meta content="${imageUrl}" property="og:image" />
    <meta content="#006400" name="theme-color" />
    <title>${pageData.title}</title>
    <link rel="icon" type="image/jpeg" href="/stewbot.jpg" />
    <link href="/global.css" media="only screen and (min-width: 480px)" rel="stylesheet" />
    <link href="/mobile.css" media="only screen and (max-width: 480px)" rel="stylesheet" />
  `;
}
