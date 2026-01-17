import stewbotImg from '/stewbot.jpg';
import robocoinsImg from '/robocoins.jpg';
import shakingHandsImg from '/shakingHands.jpg';
import robosaluteImg from '/robosalute.jpg';
import robomessageImg from '/robomessage.jpg';
import robomodImg from '/robomod.jpg';

export function Home() {
  return (
    <>
      <h1 class="centered">Stewbot</h1>
      <div class="content featureCard">
        <img src={stewbotImg} alt="Stewbot" />
        <div class="descriptionWrapper">
          <div>
            <h2>Helpful & Fun</h2>
            <p>Stewbot is a Discord bot designed to help keep servers fun and engaging while simultaneously providing moderators the tools to keep everything clean at the same time.</p>
          </div>
        </div>
      </div>
      <div class="content featureCard">
        <img src={robocoinsImg} alt="Free & Private" />
        <div class="descriptionWrapper">
          <div>
            <h2>Free & Private</h2>
            <p>Stewbot is completely and totally free and private. Stewbot is a passion project, brought to you out of our desire for the ultimate Discord bot. There are no costs whatsoever, no advertisements, and everything is fully private. If you're looking for a trustworthy yet free bot with features other bots would lock off behind a paywall, you've found that bot.</p>
          </div>
        </div>
      </div>
      <div class="content featureCard" id="special">
        <img src={shakingHandsImg} alt="Augment Yourself" />
        <div class="descriptionWrapper">
          <div>
            <h2>Augment Yourself</h2>
            <p>Like the commands Stewbot gives you access to? Install him to your profile to use anywhere on all of Discord, even in DMs!</p>
          </div>
        </div>
      </div>
      <div class="content featureCard">
        <img src={robosaluteImg} alt="For Users and Moderators" />
        <div class="descriptionWrapper">
          <div>
            <h2>For Users and Moderators</h2>
            <p>Stewbot is here to serve, specifically designed to give your moderators all of the control. Everything that can be left to moderator decision, is, and everything that can be left to normal user decision, is.</p>
          </div>
        </div>
      </div>
      <div class="content featureCard">
        <img src={robomessageImg} alt="He does it all!" />
        <div class="descriptionWrapper">
          <div>
            <h2>He does it all!</h2>
            <p>Stewbot is specially designed to provide lots of tools to keep servers fun and engaging. Ranging from conversation starters like Would-you-Rather questions, to AI Images, to memes, to starboard, and much much more! Stewbot has you covered.</p>
          </div>
        </div>
      </div>
      <div class="content featureCard">
        <img src={robomodImg} alt="Dictatorship Friendly" />
        <div class="descriptionWrapper">
          <div>
            <h2>Dictatorship Friendly</h2>
            <p>Moderating some Discord servers can be challenging. Stewbot has your back! Providing lots of tools to automate moderation, he's ready to serve. Capable of not just removing messages with swear words in them, but also censoring them so the conversation isn't interrupted. He also has lots of other tools such as Sticky Roles, Advanced Logging, Auto Join Messages, Server Messages, Message Moving, and so much more!</p>
          </div>
        </div>
      </div>
      <div class="tierWrapper">
        <div class="tier quickLink">
          <p>View the bot's features</p>
          <a class="bannerBtn" href="/features">Features →</a>
        </div>
        <div class="tier quickLink">
          <p>View the bot's commands</p>
          <a class="bannerBtn" href="/commands">Commands →</a>
        </div>
        <div class="tier quickLink">
          <p>View the bot's pricing</p>
          <a class="bannerBtn" href="/pricing">Pricing →</a>
        </div>
        <div class="tier quickLink">
          <p>Add the bot to your server</p>
          <a class="bannerBtn" href="/add">Add to Server →</a>
        </div>
        <div class="tier quickLink">
          <p>View the bot's source code</p>
          <a class="bannerBtn" href="/source">Source Code →</a>
        </div>
      </div>
      <div class="buttonWrapper">
        <a href="/add"><input value="Install Stewbot →" id="addButton" type="submit" /></a>
      </div>
    </>
  );
}
