# KayBot 1.0.0

**Features:**
- Post 'SPK' Faster & Efficiently With Flags
- Settable database directly from WhatsApp
- Soon More!

**Commands:**
- `Post` - To Post SPK  
Supports "Info & OTW", "Urgent", And any custom notes.

- `Now` - Check "Now" For Today/Tomorrow

- `Setnow` - Set "Now" Data For Any Date

- `Help` - Show Up Help Markdown

- `Ping` - Ping The Bot

**To-Do:**
- Auto-detect "`Now`" on startup
- Check now for any date
- Establish Receiver Data To Stable

**Help**
- Post  
```-post [media] [flags] [Extra Note]```   
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

- Now
```-now [flags/date]```  
`Now` Will show the `Now` for today data. 
`Flags (Optional)`:   
-t (Check data for tomorrow's date)  
-n (Check data for today's date)  
`Date (Optional) [COMING SOON]`:  
Argument Format: DD/MM/YYYY  
Returns data for argument's date.  
Coming Soon Feature

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