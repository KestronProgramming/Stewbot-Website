import stewbotImg from '/stewbot.jpg';
import bannerImg from '/banner.png';

export function Header() {
  return (
    <>
      <div id="banner-wrapper">
        <div id="banner" class="banner-background">
          <div>
            <a href="/"><img src={stewbotImg} id="stewIcon" alt="Stewbot Icon" /><img src={bannerImg} id="stewBanner" alt="Stewbot Banner" /></a><br />
            <span class="green"><b class="cyan">S</b>teward <b class="cyan">T</b>o <b class="cyan">E</b>xpedite <b class="cyan">W</b>ork</span><br /><br />
          </div>
        </div>
      </div>
      <div class="nav-wrapper banner-background">
        <nav class="bannerNav" style="position: sticky">
          <ul style="list-style-type:none;padding:0">
            <li><a href="/features" class="bannerBtn">Features</a></li>
            <li><a href="/commands" class="bannerBtn">Commands</a></li>
            <li><a href="/pricing" class="bannerBtn">Pricing</a></li>
            <li><a href="/add" class="bannerBtn">Install Stewbot</a></li>
            <li><a href="/source" class="bannerBtn">Source Code</a></li>
            <li><a href="/donate" class="bannerBtn">Donate</a></li>
          </ul>
        </nav>
      </div>
      <br />
    </>
  );
}
