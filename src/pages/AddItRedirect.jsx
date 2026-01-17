import { useEffect } from 'preact/hooks';

export function AddItRedirect() {
  useEffect(() => {
    // Redirect immediately on mount
    window.location.href = "https://discord.com/api/oauth2/authorize?client_id=966167746243076136";
  }, []);

  return (
    <div style="text-align: center; padding: 2rem;">
      <h1>Redirecting...</h1>
      <p>If you are not redirected automatically, <a href="https://discord.com/api/oauth2/authorize?client_id=966167746243076136">click here</a>.</p>
    </div>
  );
}
