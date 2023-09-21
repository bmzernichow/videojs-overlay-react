import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";
import "videojs-contextmenu-ui";
import "videojs-overlay";

export const VideoPlayer = (props) => {
  const videoPlayerRef = useRef(null); // Instead of ID
  const [currentTime, setCurrentTime] = useState(null);
  const videoSrc = "https://ix-shop.imgix.video/Croatia.mp4?fm=hls";
  // const videoSrc = "https://jdawson.imgix.net/blinkfinalbg.mp4?fm=hls";
  const videoJSOptions = {
    type: "application/x-mpegURL",
    autoplay: "muted",
    controls: true,
    userActions: { hotkeys: true },
    playbackRates: [0.5, 1, 1.5, 2]
  };

  useEffect(() => {
    if (videoPlayerRef) {
      console.log("videoPlayerRef is hit");
      const player = videojs(videoPlayerRef.current, videoJSOptions, () => {
        player.src({ src: videoSrc, type: videoJSOptions.type });
        console.log(`videoSrc is : ` + videoSrc);
        player.on("ended", () => {
          console.log("ended");
        });
        player.on("timeupdate", () => {
          setCurrentTime(player.currentTime());
        });
        console.log("Player Ready");
      });

      const exampleLink = "Click this to see the example link";

      const overlay_content = `<div id="overlaycss"><a href="https://imgix.com/" target="_blank"><img alt="Qries" src="https://ix-shop.imgix.net/ix-logo.png?txt64=Q2xpY2sgaGVyZSB0byBsZWFybiBtb3JlIQ&txt-align=bottom,center&txt-size=16&txt-color=white&txt-shad=8&w=400&h=100&fit=clamp"</a></div>`;

      player.overlay({
        overlays: [
          {
            // This overlay will appear when a video is playing and disappear when
            // the player is paused.
            content: overlay_content,
            class: "overlaycss",
            start: 1,
            end: 10,
            showBackground: true,
            align: "middle"
          },
          {
            // This overlay will appear when the "custom1" event is triggered and
            // disappear when the "custom2" event is triggered.
            start: "click",
            end: "click",
            content: "This is the content when it pauses"
          }
        ]
      });
    }

    return () => {};
  }, []);

  return (
    <div style={{ height: "500px", width: "500px" }}>
      <div id="overlay">The videojs version of an overlay</div>
      <video
        //type="application/x-mpegURL"
        style={{ width: "500px", height: "500px" }}
        ref={videoPlayerRef}
        className="video-js"
        //poster="https://image.media.imgix.video/02wBXRA6PpXwgqZdwXbIGgP00Ggj2hdbyd/thumbnail.jpg?width=800"
      />
      <span>Current Time: {currentTime}</span>
    </div>
  );
};

{
  /* const overlay_content =
        '<div><img src="https://ix-shop.imgix.net/ix-logo.png" /> <a href="https://imgix.com/" target="_blank">' +
        exampleLink +
        "</a></div>" */
}
