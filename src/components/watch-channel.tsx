
"use client";


import ChannelInfo from "@/components/channel-info";
import StreamPlayer from "@/components/stream-player";
import WatchingAsBar from "@/components/watching-as-bar";
import { faker } from "@faker-js/faker";
import { LiveKitRoom } from "@livekit/components-react";

import { useEffect, useMemo, useState } from "react";
import Chat from "./host-chat";

type StreamPayload = {
  token: string,

}
export default function WatchChannel({ slug }: { slug: string }) {
  // const [viewerToken, setViewerToken] = useState("");
  // const [viewerName, setViewerName] = useState("");
  const [token, setToken] = useState<StreamPayload>({token:''});

  const fakeName = useMemo(() => faker.person.fullName(), []);

  // NOTE: This is a hack to persist the viewer token in the session storage
  // so that the client doesn't have to create a viewer token every time they
  // navigate back to the page.
  useEffect(() => {
    const getOrCreateViewerToken = async ()=> {
     
      const resp = await fetch(`http://localhost:3000/api/watch?room=${slug}&username=${fakeName}`)

      const data:StreamPayload = await resp.json();
      setToken(data);
  
    };
    void getOrCreateViewerToken();
  }, [fakeName, slug]);

  // const name = 'james';





  if (token?.token === '') {
    return <div>Getting token...</div>;
  }
  // if (viewerToken === "" || viewerName === "") {
  //   return null;
  // }

  return (
    <LiveKitRoom
      token={token?.token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      className="flex flex-1 flex-col"
    >
      <WatchingAsBar viewerName={fakeName} />
      <div className="flex h-full flex-1">
        <div className="flex-1 flex-col container">
          <StreamPlayer streamerIdentity={slug} />
          <ChannelInfo streamerIdentity={slug} viewerIdentity={fakeName} />
        </div>
        <div className="sticky hidden w-80 border-l md:block">
          <div className="absolute top-0 bottom-0 right-0 flex h-full w-full flex-col gap-2 p-2">
            <Chat participantName={fakeName} />
          </div>
        </div>
      </div>
    </LiveKitRoom>
  );
}
