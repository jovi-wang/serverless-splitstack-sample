const axios = require('axios');

let count = 0;
let resCount = 0;
let interval = setInterval(()=>{
  for(let i=0; i< 100; i+=1) {
    axios.get(`https://jiz78judpc.execute-api.ap-southeast-2.amazonaws.com/dev/hander?uuid=uuid_${count}_${i}&time=${Date.now()}`).then(()=>resCount+=1).catch(console.log)
  }
  console.log(count++);
  if(count === 300) {
    clearInterval(interval);
  }
}, 1000);


setTimeout(()=>{
  console.log(resCount);
}, 1000 * 305);
