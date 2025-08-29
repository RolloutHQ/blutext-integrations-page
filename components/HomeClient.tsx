"use client";
import { useEffect, useState } from "react";
import { RolloutLinkProvider, CredentialsManager } from "@rollout/link-react";
import "@rollout/link-react/style.css";

type HomeClientProps = { userId: string };

const WEBHOOK_URL = "/api/credential-added"; // Dummy endpoint; replace with your real URL when ready

export default function HomeClient({ userId }: HomeClientProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Using a hardcoded webhook URL. Update WEBHOOK_URL above.

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(`/api/rollout-token?userId=${userId}`);
        const data = await response.json();
        setToken(data.token || data);
      } catch {
        setError("Failed to fetch rollout token");
      } finally {
        setLoading(false);
      }
    };
    getToken();
  }, [userId]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-0 pb-4">
        <p className="text-gray-500 mt-2">Loading token...</p>
      </main>
    );
  }

  if (error || !token) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-0 pb-4">
        <p className="text-red-500 mt-2">{error || "No token available"}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 pt-0 pb-4">
      <div className="max-w-[600px] w-full">
        <RolloutLinkProvider token={token}>
          <CredentialsManager
            apiCategories={{ crm: true }}
            onCredentialAdded={async ({ id, appKey }: { id: string; appKey?: string }) => {
              try {
                if (!WEBHOOK_URL) {
                  console.warn("WEBHOOK_URL is empty; set it in HomeClient.tsx to enable POST");
                  return;
                }
                await fetch(WEBHOOK_URL, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    credentialId: id,
                    userId,
                    appKey: appKey || null,
                  }),
                });
              } catch (e) {
                console.error("Failed to POST credentialAdded webhook", e);
              }
            }}
          />
        </RolloutLinkProvider>
      </div>
    </main>
  );
}
