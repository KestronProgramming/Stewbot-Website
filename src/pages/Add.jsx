import stewbotImg from '/stewbot.jpg';

export function Add() {
  return (
    <>
      <h1 class="centered">Add Stewbot to Server</h1>
      <div class="content featureCard" id="special">
        <img src={stewbotImg} alt="Stewbot" />
        <div class="descriptionWrapper">
          <div>
            <h2>Thanks for choosing Stewbot!</h2>
            <p>You won't regret it. Click the button below to add Stewbot to your server and start enjoying all the features!</p>
          </div>
        </div>
      </div>
      <div class="buttonWrapper">
        <a href="https://discord.com/oauth2/authorize?client_id=966167746243076136" target="_blank">
          <input value="Install Stewbot" id="addButton" type="submit" />
        </a>
      </div>
      <div class="content">
        <h2 style="color: var(--secondardy-text);">Permission Details</h2>
        <p>Here's a summary of the permissions we ask for when adding to a server. This isn't required reading! Just if you're curious why we ask for Administrator permissions or want to fine-tune the permissions for your specific use-case for the bot.</p>
        <ul class="permissionList">
          <li><strong>Administrator:</strong> This is the overarching best way to experience the bot. Stewbot is an advanced bot that makes use of every single permission. We strongly recommend trusting Stewbot with administrator capabilities. But, if you're not comfortable with that, what follows are the specific permissions to be aware of.</li>
          <li><strong>Manage Roles:</strong> This allows for Autoroles, as well as Sticky Roles. Without this permission, Stewbot cannot add or remove roles from users.</li>
          <li><strong>Manage Webhooks:</strong> Stewbot has the capability to utilize webhooks, allowing for custom messages on another level. This allows for better censoring of filtered messages, better server messages, and more.</li>
          <li><strong>Kick/Ban/Timeout:</strong> Stewbot has moderator commands to allow moderators to use these, with more thorough logging. Planned updates will allow for Stewbot to automatically provide timeouts to users who spam filtered messages.</li>
          <li><strong>Create threads:</strong> If you choose to use Stewbot's moderator ticket function, he'll use threads to allow you to sort out conversations with users more easily.</li>
          <li><strong>Attach Files:</strong> Stewbot has many capabilities that take advantage of files to the fullest. Your experience using Stewbot will be extremely impacted without the ability to attach files. Starboard, moved messages, filter functions, This-Person-Does-Not-Exist AI images, Craiyon Dall-E Mini, Memes, and more will all be completely impacted.</li>
          <li><strong>Add Reactions:</strong> Stewbot uses reactions for things like the Would-you-Rather game</li>
          <li><strong>Manage Messages:</strong> This is completely necessary for Stewbot to filter out messages, or move them from one channel to another. Without this permission, this cannot be completed.</li>
        </ul>
      </div>
    </>
  );
}
