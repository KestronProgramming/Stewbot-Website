export function Donate() {
  return (
    <>
      <h1 class="centered">Donate to Stewbot</h1>
      <div class="content featureCard" id="special">
        <img src="/robocoins.jpg" alt="Support Our Mission" />
        <div class="descriptionWrapper">
          <div>
            <h2>Support Our Mission</h2>
            <p>Help us keep Stewbot free and ad-free for everyone. Your donation goes directly toward server costs and development.</p>
          </div>
        </div>
      </div>
      <div class="content">
        <h2 style="color: var(--secondardy-text);">Why Donate?</h2>
        <p>Stewbot is a passion project, born out of our desire for the ultimate Discord bot. We never charge for any usage of the bot. We never have advertisements. We never store, or sell your info. We make the source code that the bot runs on public and open source. We provide free features that other bots charge for.</p>
        <p>If this is something that speaks to you, that you want to support and to help fund, you can donate below.</p>
        <p><strong>Thank you so much, we truly appreciate it.</strong></p>
      </div>
      <div class="buttonWrapper">
        <a href="https://www.paypal.com/donate?business=kestron@kestron.software&no_recurring=0&item_name=KestronProgramming&item_number=Stewbot" target="_blank">
          <input value="Donate via PayPal" id="donateButton" type="submit" />
        </a>
      </div>
      <p class="centered" style="color: #888;"><em>This will take you to PayPal to complete the transaction.</em></p>
    </>
  );
}
