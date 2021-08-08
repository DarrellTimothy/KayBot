# KayBot 1.8.1

**Features:**
- Post 'SPK' Faster & Efficiently With Flags
- Settable database directly from WhatsApp
- Image To Text
- Advanced Logging Feature
- Whitelisting

**Commands:**
- `Post` - To Post SPK  
Supports "Info & OTW", "Urgent", And any custom notes.

- `Now` - Check "Now" For Today/Tomorrow

- `Setnow` - Set "Now" Data For Any Date

- `Help` - Show Up Help Markdown

- `Ping` - Returns bot's latency 

**To-Do:**
- Auto-detect "`Now`" on startup
- Establish Receiver Data To Stable  
 
**Help**
- Post
```-post [media] [flags] [Extra Note]```    
Alias: `p`  
`Post` will auto-posting to KPN Group,
Automatic Code & Now Value  
`Media` (Optional): Put media to send, if there isn't media attached, it will post a caption with the `Extra Note` as the order.  
`Flags (Optional)`:  
-t (Set code for tomorrow (automatic))  
-i (Put "Info" At Caption After Code (Instant Courier))
-o (Put "OTW" At Caption After Code (Instant Courier))
-u (Put "Urgent" At Caption After Code)
`Extra Note`:  
Required if there isn't `Media`  
Optional if there is `Media`    
`Post` is highly recommended to execute one-by-one to prevent bugs called `Topology Closed`.  
`Post` will log to Logging Group if it worked, and if there's media, the "`itt` upgraded" feature will detect the receiver name for better tracing when needed.  
`Post` is **highly recommended** to be just executed maximum 2 in the same time. Posting 3 in the same time has small chance to have some "failure", Posting 4 in the same time has big chance of failure, Posting 5+ are almost guaranteed to have a failure.

- Now
```-now [flags/date]```  
`Now` Will show the `Now` for today data. 
`Flags (Optional)`:   
-t (Check data for tomorrow's date)  
`Date`:  
Argument Format: DD/MM/YYYY  
Returns data for argument's date.  


- Setnow  
```-setnow <Flags/Date> <Key>```  
`Setnow` will set the `Now` data for any dates  
`Flags/Date`:  
-t (change tomorrow's data)  
-n (change today's data)   
`Date`: DD/MM/YYYY 

- Ping  
```-ping```  
Check If The Bot Is Online/Offline

- Image To Textᴮᴱᵀᴬ  
```-itt <media>```  
Transform Image To Text, Indonesian Only (1.0.2).  

- Send  
```-send <message/&media>```  
Send message or with media to Group. Especially for checking whether a product is ready or not.  

**Extra Info:**   
- After posting, the bot will respond with a message indicating the caption, and the type. There's also a system for Shopee only called "Receiver Dataᴮᴱᵀᴬ" that will read the receiver's name and return it at the logging but it's currently disabled until its stable, because it's jamming the server.  

**ChangeLog**:   
1.0.1: Ping will not just respond 'pong!' but will give accurate ping latency.  
Added Logging on Markdown (available at 1.0.0 but not marked down)  
1.0.2: Supports `now` for today without -n and deletes the -n flag. Added New Command: '-itt" (Image To Textᴮᴱᵀᴬ) Might take a bit long of time  
1.0.3: Added `send` to send message to Group.  
1.0.4: Added `p` as an alias for `post`  
1.0.5: Client side database enhancement, Faster launch by saving session, notification on client side while disconnected   
1.0.6: Updated confirmation message to reply the post message itself. KayBot will start posting logs on the logging group. If there's ghost post sended, it will return an error message now.  
1.7.0: Changed Version Formatting, Fixed **MAJOR** Bug Causing
unwanted message received as the bot's command and returns. Whitelisting added to TDL  
1.7.1: Added Whitelisting. This bot account is officially private while the source code is still public.  
1.7.2: Fixed `-post` no argument but with media bug.  
1.8.0: Added extra note on `post` markdown, Stabilize receiver name log for Shopee, Receiver Logging now supports Tokopedia, `post` will now log time.  
1.8.1: Fixed time logging bug