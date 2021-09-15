# KayBot 1.11.0

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
-r (Put "Resi Stuck | Pending" After Code)  
-s (Put "Resi Skip" After Code)  
-m (Put "Multiple Order" After Code)  
-d (Put "Double Order" After Code)    
-c (Put "Please Check" After Code)

`Extra Note`:  
Required if there isn't `Media`  
Optional if there is `Media`    
`Post` is highly recommended to execute one-by-one to prevent bugs called `Topology Closed`.   
`Post` is **highly recommended** to be just executed maximum 2 in the same time. Posting 3 in the same time has small chance to have some "failure", Posting 4 in the same time has big chance of failure, Posting 5+ are almost guaranteed to have a failure.  

- Cancel  
```-cancel <query>```  
Will delete a post from `groupID`  

`Query` should be like the same formatting as caption, Either today or tomorrow, and have number on it.   

- Reschedule   
```-reschedule <query> || -rs <query>```  
Reschedule A Post For Tomorrow, Similiar to `-cancel` combined with `-post -t`.  

`Query` should be like the same formatting as caption, Either today only, and have number on it.       

- Search
```-search <query>```  
Search the log and the spk based on the receiver's name.

`Query` should be a receiver name. If there are no result, it's either system logging failure or there are no actually.  


- Logging (Post)  
Logging to `logID` (`Post` Command)  
Log will logging this data: `Requester`, `Receiverᴮᴱᵀᴬ`, `Courier Name`, `Time`.  
`Courier Name` Supports:  
Tokopedia: GoSend, Kurir Rekomendasi, AnterAja, GrabExpress, JNE Trucking.
Shopee: Reguler (AnterAja/SiCepat), SiCepat Halu, SiCepat Gokil, AnterAja PakEkoAja, JNE Reguler, Instant Courier (GoJek/Grab)

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
1.8.2: More accurate receiver logging for Shopee (Unwanted words might still apply. Post Logging will now log the courier name/type (Shopee Only)  
1.8.3: Make `-itt` can process few commands in one, Courier name logging now supports Tokopedia. (Read new `Logging` at this markdown.), MIT License  
1.9.0: Changed `process()` => `processSPK()`. Server Side Startup will receive arguments, using `--test` will make the group id automatically set to testing group, Added notification when client is disconnected, Added `-cancel`.  
1.9.1: Added notification after post & cancel, & when client is disconnected. Fixed Server Side Bugs: "tyuh bug", Fixed "undefined" receiver by changing it to "No Name Detected"  
1.9.2: Removed sending message when client error occurred. On 'Topology Closed' error occured, now will send message on whatsapp.      
1.10.0: Fixed Urgent Misscode, Added `-r` for "Resi Stuck | Pending" & `-s` for "Resi Skip", Fixed Argument Check Failed On `-cancel`, Added `-reschedule`.   
1.10.1: Fixed `-reschedule` guide on markdown, Added `-search`.  
1.10.2: Added `-m` (Multiple Order) & `-c` (Check) flag For `-post`
1.10.3: Release To Heroku  
1.11.0: Updated Whitelist, Bot will send recording state if it online to every whitelisted contacts.

MIT License:  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
Copyright 2021 Darrell Timothy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  