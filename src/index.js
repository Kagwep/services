const ethers = require('ethers');
//const servicesContract = require("./abi/Cryptojua.json");
const  fs = require('fs');
const  fetchCryptoAssets  = require('./assets.js');
const  fetchDataAndGenerateHTML  = require('./rates.js');
const  fetchAirdropDataAndGenerateHTML  = require('./airdrops.js');
const  fetchSentimentDataAndGenerateHTML  = require('./sentiment.js');
const { services } = require('./main.js');

require('dotenv').config();

let web3mail;

let IExecWeb3mail, getWeb3Provider;
import("@iexec/web3mail").then(module => {
  IExecWeb3mail = module.IExecWeb3mail;
  getWeb3Provider = module.getWeb3Provider;

const web3Provider = getWeb3Provider(PRIVATE_KEY);
web3mail = new IExecWeb3mail(web3Provider);

  // Now you can use IExecWeb3mail and getWeb3Provider here
});


const serviceContractJson = JSON.parse(fs.readFileSync('/home/kagwe/projects/cryptojua-services/src/abi/Cryptojua.json', 'utf8'));

const contractABI = serviceContractJson.abi;

const PRIVATE_KEY = process.env.PRIVATE_KEY
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID



const contractAddress = "0xD6595b761aD0F6a0E332F92E29ccd342ee757DB8";



const provider = new ethers.JsonRpcProvider(INFURA_PROJECT_ID);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);






async function getSubscribers(serviceId) {
    try {
      // Call the getSubscribers function on the contract
      const result = await contract.getSubscribers(serviceId);
  
      // Log the result
      console.log("Subscribers:", result);
  
      return result;
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      // Handle error as needed
      return null;
    }
  }
  

  

  // Function to get services
async function getServices() {
    try {
      // Call the services function on the contract
      const result = await contract.services(7); // Pass any index (0 for the first service)
      
      // Extract service data
      const serviceId = result.service_id;
      const serviceName = result.service_name;
      const serviceDescription = result.service_description;
      
      // Log the service data
      console.log(`Service ID: ${serviceId}`);
      console.log(`Service Name: ${serviceName}`);
      console.log(`Service Description: ${serviceDescription}`);
  
      return { serviceId, serviceName, serviceDescription };

    } catch (error) {
      console.error("Error fetching services:", error);
      return null;
    }
  }
  



const sendMail = async (
    mailObject,
    mailContent,
    protectedData,
    contentType,
    senderName
  ) => {
    try {
    console.log("trying to send mail ....")
      const txHash = await web3mail.sendEmail({
        emailSubject: mailObject,
        emailContent: mailContent,
        protectedData,
        contentType,
        senderName,
      });
      console.log(txHash)
      return txHash;
    } catch (error) {
      console.error('Error sending web3 mail:', error);
      throw error;
    }
  };


  const fetchData = async () => {
    try {
        // Call the functions to fetch data and generate HTML
        let assetPrices = await fetchCryptoAssets();
        let rates = await fetchDataAndGenerateHTML();
        let airdrops = await fetchAirdropDataAndGenerateHTML();
        let sentiment = await fetchSentimentDataAndGenerateHTML();

        const data = [assetPrices,rates,airdrops,sentiment]

        return data
        
 
    } catch (error) {
        console.error('Error calling functions:', error.message);
    }
};

const sendNotifications  = async (subject,subscribers, message) => {

    let tsxs  = [];
    let storemessage = message;
    

    for (let j = 0; j < subscribers.length; j++){




        const mailObject = `${subject} at ${new Date().toLocaleString()}`;
        const mailContent = storemessage;
        const protectedData = subscribers[j];
        const contentType = 'text/html';
        const senderName = 'cryptoJua'

        let tsx = await sendMail(mailObject,mailContent,protectedData,contentType,senderName);

        tsxs.push(tsx);
    }

    return tsxs

}


// Define an interval to run fetchDataAndGenerateHTML every 10 minutes
const interval = setInterval(async () => {
    let allData = await fetchData();

//   console.log(allData);

  
  const pricesSubs = await getSubscribers(7);
  const ratesSubs = await getSubscribers(4);
  const airdropSubs =await getSubscribers(6);
  const sentSubs =await getSubscribers(5);
    
    if (allData){

        console.log("sending .. .. . ..")

        for (let i = 0; i < services.length; i++){

            if(i==0 && pricesSubs && pricesSubs.length > 0){
                const subject = 'Crypto prices'
                let tsxs = await sendNotifications(subject,pricesSubs,allData[0])
                console.log(tsxs)
            }

            if(i==1 && ratesSubs && ratesSubs.length > 0){
           
                const subject = 'Exachange Rates'
                let tsxs = await sendNotifications(subject,ratesSubs,allData[1])
                console.log(tsxs)
            }

            if(i==2 && sentSubs && sentSubs.length > 0){
                const subject = 'Sentiments '
                let tsxs = await sendNotifications(subject,sentSubs,allData[2])
                console.log(tsxs)
            }

            if(i==3 && airdropSubs && airdropSubs.length > 0){
                const subject = 'Airdrops'
                let tsxs = await sendNotifications(subject,pricesSubs,allData[3])
                console.log(tsxs)
            }
        }
    }

}, 1 * 60 * 1000); // 10 minutes in milliseconds

// Run the fetchDataAndGenerateHTML immediately (optional)
fetchData();

// Stop the interval when the process exits
process.on('exit', () => {
    clearInterval(interval);
    console.log('Scheduler stopped.');
});