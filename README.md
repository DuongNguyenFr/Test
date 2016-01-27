# Goal
Design and implement a live visualization of a peer's data exchanges.  
A peer is connected to a CDN and other peers. The set of other peers is called the *Peer Pool*  
When playing a content we want to have a quick and intuitive understanding of:

- The number of peers in our *Peer Pool*
- A differentiation between peers we're connected to and the others
- A differentiation between uploaders and downloaders
- Which connections are the most active (downloaded/uploaded amount) recently (over the last few seconds)
- The amount of data downloaded/uploaded with other peers and the amount of data downloaded from the CDN since the beginning of the session.

We'd also like to have access to other information that we **do not necessarily need to see directly (they can appear with a mouse hover)**:

- For each peer we'd like to see information like its geolocation, its distance from us, its RTT (round-trip time), its buffer level (you don't need to know what it is yet)
- For each connection we'd like to see the precise amount of data downloaded/uploaded

# Evaluation
You will be evaluated on a few criteria:

- The requirements defined above
- Your visualization must be **intuitive** and give a **quick** understanding of what's happening in (almost) real-time. Basically, someone new must understand what's happening with a minimum effort
- A good balance between autonomy and collaboration. Basically, we want people who can go get the knowledge&skills they miss by themselves. However, we don't want people who get stuck on a problem, making no progress and not asking for assistance
- Write code that is readable and maintainable

# Instructions
## Understand the environment

- Visit the page http://www.streamroot.io/test/jw?jw_key=&tech=html5&manifest=http%3A//wowza.streamroot.io%3A1935/live/stream1/playlist.m3u8&root=http%3A//files.streamroot.io&version=release/latest&tracker=prod&id=sr-ewok&playlist_hls_keep_last_lines=30&width=640&height=380&autoplay=1&default_autoswitch=1&range_request_allowed=1&allow_p2p=1&debug=1&abr_graph=1&p2p_graph=1&peer_stat=1&qos_stat=1

- Open a second tab with the same link and have a look at the data under the player
- Open the console in one of your tabs and execute the following commands, (have a look at the results following each command):
	- `window.SR_DISPLAY_INTERFACE.getStats().peerPool[0].getDataDownloaded()`
	- `window.SR_DISPLAY_INTERFACE.getStats().peerPool[0].getDataUploaded()`
	- `window.SR_DISPLAY_INTERFACE.getStats().peerPool[0]`
	- `window.SR_DISPLAY_INTERFACE.getStats().download`
- Re-iterate the first two commandes a bit later and observe the evolution

Your work will replace the table located just under the video that lists the peers in our *Peer Pool*. Indeed, the current table satisfies some of the requirements defined above but is missing a lot of them (it is not intuitive)
## Step 1 - Getting Started

- Clone this repository on your machine
- Open the index.html file in your browser
- Press the Start button

As you can see nothing is changing on the screen. However, a JavaScript simulator is running in the background. You can now press the Stop button.  
In this first step you must display, every second, the right information. You need to:

- Get this information from `window.simulator.getStats()`. This function will return an object with the following structure:

```js
{
	download: {
		cdnDownloaded: 12982 // Nb of bytes downloaded from the CDN, from the beginning
	},
	peerPool: [
		{
			getBufferLevel: function() {}, // Returns the buffer level of the peer
			getConnected: function() {}, // If the peer is connected to you, returns true. Otherwise false
			getDataDownloaded: function() {}, // Returns the number of bytes downloaded from this peer since it has been addeed in the Peer Pool
			getDataUploaded: function() {}, // Returns the number of bytes uploaded to this peer from the beginning
			getId: function() {}, // Returns the id of the peer
			getRtt: function() {} // Returns the round-trip time for this peer in milliseconds
		},
		{
			// peer number 2
		},
		// etc.
	]
}
```
- Update the HTML markups (elements with id #nb-peers-total, #nb-peers-connected, #p2p-total)

When you're done, commit and push your work.

## Step 2 - Design the visualization
You must be creative to design the actual visualization. It is recommended to get inspiration from internet for the components of your visualization.  
In this part you must commit one or many sketch(es) of your visualization to get feedback on it. This is a mockup so it does not have to be functional yet. You can do it on any support (drawing on paper that you scan, CSS...). However, make sure that what you want to do is not too hard to implement (it's way easier to re-use CSS/HTML components available on internet)  
**Please do not go to Step 3 before approval of Step 2**

## Step 3 - Implementation
Replace the textual information from Step 1 by your visualization in the HTML file. Your visualization must work the same way (get refreshed every second)

# Requirements

- You must only use `window.simulator.getStats()` to access the data (no other method on `simulator`)
- Your visualization must be implemented in JavaScript. You're free to use the libraries/frameworks you prefer.
