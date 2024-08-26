// import React from 'react';
// import './index.css';
// import { Anchor, Col, Row } from 'antd';

// const App = () => (<>

// <div style={{height:'40px',width:'60px',border:'1px solid red',marginBottom:"60px"}}></div>


//   <Row  style={{ height: '100vh',  overflow:'auto'}}> 
//     <Col span={16}>
//       <div
//         id="part-1"
//         style={{
//           height: '300px',
//           background: 'red',
//         }}
//       />
//       <div
//         id="part-2"
//         style={{
//           height: '300px',
//           background: 'green',
//         }}
//       />
//       <div
//         id="part-3"
//         style={{
//           height: '300px',
//           background: 'yellow',
//         }}
//       />
      
//     </Col>
//     <Col span={8}>
//       <div style={{position:'fixed'}}>
//       <Anchor
//         replace
       
//         items={[
//           {
//             key: 'part-1',
//             href: '#part-1',
//             title: 'Part 1',
//           },
//           {
//             key: 'part-2',
//             href: '#part-2',
//             title: 'Part 2',
//           },
//           {
//             key: 'part-3',
//             href: '#part-3',
//             title: 'Part 3',
//           },
//         ]}
//       />
//       </div>
//     </Col>
//   </Row></>
// );

// export default App;


//function initiateTxn(amount,txnid,productinfo='storefront',)
// const fetcher = async (url) => {
//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error('Failed to fetch data'); // Handle errors appropriately
//   }

//   return response.json();
// };

//  const { data, error, isLoading } = useSWR('https://8b531e0e-eb1d-4615-a175-1d03aed63513-00-14eudonfdu6o9.pike.replit.dev:9000/verify-txn', fetcher);
// console.log(data,'p')


import React from 'react';
import { Anchor } from 'antd';
import { Routes, Route,Link,useNavigate } from 'react-router-dom';
import { Divider, Flex, Tag,Button ,Layout,Input, Row, Col,Switch,Card,Badge } from 'antd';
import { CloseOutlined ,MenuUnfoldOutlined,SearchOutlined,ShoppingOutlined } from '@ant-design/icons';
import './index.css';
import io from 'socket.io-client'
//import useSWR from "swr";

const { Header, Content, Footer } = Layout;

const App = () =>{
  const [inp,setInp] =React.useState('')
  const [t,setT]= React.useState(false)
  const [isVeg,setIsVeg] = React.useState(true);
  const [selFood,setSelFood] = React.useState([])
  const[toggleCart,setToggleCart] = React.useState(false)
  const[showLinks,setShowLinks] = React.useState(false);
  const [food, setFood] = React.useState([
    // Breakfast Items (Heading)
    {
      heading: 'Breakfast Items',
      content: [
        {
          name: 'Dosa',
          description:
            'A thin, crispy crepe made from fermented rice and lentil batter',
          price: 50,
          isVeg: true,
          tag: 'Classic',
          quantity:0,
          img: 'https://t3.ftcdn.net/jpg/02/72/47/94/360_F_272479453_Kl30iWCD9WWhlU8BNORRtNUR1ADxXTCh.jpg',
        },
        {
          name: 'Idli',
          description: 'Steamed savory rice cakes',
          price: 30,
          isVeg: true,
          tag: 'Classic',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1087685244/photo/delicious-homemade-iddli-iddly-sambar-chutny.jpg?s=612x612&w=0&k=20&c=iVeZOTmOf0ZmAOtq1QELwlWnhumQL7wcZ-RBmdNiBBw=',
        },
        {
          name: 'Vada',
          description: 'Lentil fritters',
          price: 20,
          isVeg: true,
          tag: 'Classic',
          quantity:0,
          img: 'https://img.freepik.com/premium-photo/sago-delight-sabudana-wada-vada-classic-indian-snack-vertical-mobile-wallpaper_896558-36481.jpg',
        },
        {
          name: 'Upma',
          description: 'Savory semolina porridge',
          price: 40,
          isVeg: true,
          tag: 'Healthy',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1306315890/photo/upma-or-rava-upma.jpg?s=612x612&w=0&k=20&c=YIK5fSdhs8sJ-VCSk9XkX2q-TYn7Oyr6XDgWtXpxzLY=',
        },
        {
          name: 'Pongal',
          description: 'Rice dish cooked with lentils and spices',
          price: 45,
          isVeg: true,
          tag: 'Comfort Food',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1246803805/photo/poha.jpg?s=612x612&w=0&k=20&c=e2_A22vR_xBMpomibGbZ-y_hYdmdmuGG5zrOBWs4F-8=',
        },
      ],
    },

    // Main Course Items (Heading)
    {
      heading: 'Main Course Items',
      content: [
        {
          name: 'Sambar',
          description: 'Lentil and vegetable stew',
          price: 40,
          isVeg: true,
          tag: 'Accompaniment',
          quantity:0,
          img: 'https://c1.staticflickr.com/5/4610/27981857169_5234a6db7d_b.jpg',
        },
        {
          name: 'Rasam',
          description: 'Spicy lentil soup',
          price: 35,
          isVeg: true,
          tag: 'Soup',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1076130942/photo/green-peas-curry-matar-masala-north-indian-punjabi-cuisine-vegetarian-food.jpg?s=612x612&w=0&k=20&c=MfYEe2DJGAzJ7kvNcfhWaqfW1Ci80N-rt5HLImHKlk0=',
        },
        {
          name: 'Uttapam',
          description:
            'Thick pancake made from fermented rice and lentil batter',
          price: 55,
          isVeg: true,
          tag: 'Main Course',
          quantity:0,
          img: 'https://images.pexels.com/photos/17869140/pexels-photo-17869140/free-photo-of-plate-of-small-uttapam.jpeg',
        },
        {
          name: 'Masala Dosa',
          description: 'Dosa stuffed with spiced potato filling',
          price: 60,
          isVeg: true,
          tag: 'Main Course',
          quantity:0,
          img: 'https://media.istockphoto.com/id/183321245/photo/south-indian-crepe-masala-dosa.jpg?s=612x612&w=0&k=20&c=c6Z7P5uovp2M9JVS0rlS8nCKRL73QkTYRyL7FK348Os=',
        },
        {
          name: 'Rava Dosa',
          description: 'Dosa made from semolina batter',
          price: 50,
          isVeg: true,
          tag: 'Main Course',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1460788339/photo/south-indian-vegetarian-breakfast.jpg?s=612x612&w=0&k=20&c=_h9ObiAsvzhew_Mir9JHtSOwlvIUWj8awcvl-uStEfU=',
        },
        {
          name: 'Puri',
          description: 'Deep-fried unleavened bread',
          price: 25,
          isVeg: true,
          tag: 'Side Dish',
          quantity:0,
          img: 'https://media.istockphoto.com/id/178612386/photo/puri-patty-curry-breakfast.jpg?s=612x612&w=0&k=20&c=NQnyqbzDfFu8o9c-PABAJH0HPEUqfFDDGxZRspoOApo=',
        },
        {
          name: 'Egg Bonda',
          description: 'Bonda stuffed with a boiled egg',
          price: 25,
          isVeg: false,
          tag: 'Non-Veg',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1128177492/photo/potato-dumpling-stuffed-with-greaves.jpg?s=612x612&w=0&k=20&c=OkoBgV2Jeo9fUDaIl8qRoKZUAjh5Sdn9cVghSwlm60g=',
        },
        {
          name: 'Medu Vada',
          description: 'Urad dal fritters shaped like donuts',
          price: 30,
          isVeg: true,
          tag: 'Side Dish',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1459336670/photo/image-of-asian-street-food-at-market-stall-for-sale-uludu-wade-dhal-vada-savoury-indian.jpg?s=612x612&w=0&k=20&c=mzbqFp371DUi_0PfHgymmsygTRDNVwFdeU21wtzoJXk=',
        },
        {
          name: 'Chicken Chettinad',
          description: 'Spicy chicken dish from the Chettinad region',
          price: 80,
          isVeg: false,
          tag: 'Non-Veg Main Course',
          quantity:0,
          img: 'https://media.istockphoto.com/id/477108743/photo/chettinad-chicken.jpg?s=612x612&w=0&k=20&c=PkKlNaLCdESAmmFyk20LYtbanJaeDn9Ym-FtmHqTV7U=',
        },
      ],
    },

    // Snacks & Beverages (Heading)
    {
      heading: 'Snacks & Beverages',
      content: [
        {
          name: 'Payasam',
          description: 'Sweet milk pudding',
          price: 40,
          isVeg: true,
          tag: 'Dessert',
          quantity:0,
          img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Kheer_%28Payasam%29.jpg/1536px-Kheer_%28Payasam%29.jpg',
        },
        {
          name: 'Filter Coffee',
          description:
            'Strong coffee brewed in a traditional South Indian filter',
          price: 1,
          isVeg: true,
          tag: 'Beverage',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1356557482/photo/fresh-filter-coffee.jpg?s=612x612&w=0&k=20&c=rHM-kO9AXB9k2TyEMp3vrAM9EbpR8MNCvGDwLgqWT1k=',
        },
        {
          name: 'Coconut Chutney',
          description: 'Spicy condiment made with coconut',
          price: 20,
          isVeg: true,
          tag: 'Condiment',
          quantity:0,
          img: 'https://media.istockphoto.com/id/1083233290/photo/nariyal-or-coconut-chutney-served-in-a-bowl-isolated-over-moody-background-selective-focus.jpg?s=612x612&w=0&k=20&c=dIJOWjqwPnFkaUYhG2Oay7ZerPtFizkyUDqGcgF3C98=',
        },
      ],
    },
  ]);
  function generateUniqueTransactionId() {
    return 'txid-' + Date.now();
  }
  const navigate = useNavigate();
 let dyn =  generateUniqueTransactionId();
 // return `upi://pay?pa=iotronicssystempvtlt.62347918@hdfcbank&pn=VerifiedMerchant&mode=00&orgid=00000&tid=${dyn}&tr=${dyn}&mam=null&tn=trialdemopaytment&am=1&cu=INR&url=https://t.ly/5Tocf`;

 //' return `upi://pay?pa=iotronicssystempvtlt.62347918@hdfcbank&pn=VerifiedMerchant&mode=00&orgid=00000&tid=${transactionId}&tr=${transactionRefId}&mam=null&tn=${encodedTransactionNote}&am=${transactionAmount}&cu=${currencyCode}&url=${encodedCallbackUrl}`;


 const [p,setP] =React.useState(false)

 async function initiateTxn(){
  try{
// let startTxn = await fetch('https://8b531e0e-eb1d-4615-a175-1d03aed63513-00-14eudonfdu6o9.pike.replit.dev:9000/initiate-payment')
// let data = await startTxn.json()
// window.open(`upi://pay?pa=${data.result.merchantVpa}&pn=${data.result.merchantName}&tr=${data.metaData.referenceId}&am=${data.result.amount}`,'_blank');

onBuyClicked();

setTimeout(()=>{
  localStorage.setItem('txnId',JSON.stringify('5812ABpwD'))
  setP(true)
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
},5000)
console.log(data)
}
  catch(err){
    console.log(err)
  }
 }
//initiateTxn()

async function verifyTxn(){
  try{
let verifyTxn = await fetch('https://8b531e0e-eb1d-4615-a175-1d03aed63513-00-14eudonfdu6o9.pike.replit.dev:9000/verify-txn')
let data = await  verifyTxn .json()

return data;

}
  catch(err){
    console.log(err)
  }
 }
const[o,setO] =React.useState('')
 React.useEffect(()=>{
if(localStorage.getItem('txnId')){
  setP(true)
  console.log('000')
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
//   verifyTxn().then(e=>{
    
//       setO(e.transaction_details[JSON.parse(localStorage.getItem('txnId'))].status)
// console.log('pending')
// // localStorage.removeItem('txnId')
// //   setP(false)
// // localStorage.removeItem('txnId')
    
//   })
}
 },[p])
//verifyTxn()
  
// React.useEffect(()=>{
//   if(localStorage.getItem('txnId') ){
// setP(true)
//   }
// },[])
  // function handelUserComeback(){
  //   if((localStorage.getItem('txnId') && document.visibilityState === 'visible')){
  //     setP(true)
  //    // localStorage.removeItem('paymentInitiated');
  //   }
  // }
// React.useEffect(()=>{
//   // if(localStorage.getItem('txnId')){
//   //   setP(true)
//   // }
// window.addEventListener('visibilitychange',handelUserComeback)
// return ()=> {window.removeEventListener('visibilitychange')}
// },[])
// const socket = io.connect('https://17174cc3-e036-41c5-82a6-1ce90c624cd6-00-2oq5i07bzmsdh.pike.replit.dev:5000')
// socket.on("connect", () => {
//   console.log("Socket connected");
// });
// socket.on('payment_response',(e)=>console.log(e))
React.useEffect(()=>{
document.addEventListener('click',()=>{
  setShowLinks(false);
})
},[])




const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { 
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



//google pay start 

//create payment request object
const supportedInstruments = [
  {
    supportedMethods: ['https://tez.google.com/pay'],
    data: {
      pa: 'merchant-vpa@xxx',
      pn: 'Merchant Name',
      tr: '5812ABCD',  // your custom transaction reference ID
      url: 'https://17174cc3-e036-41c5-82a6-1ce90c624cd6-00-2oq5i07bzmsdh.pike.replit.dev:5000',
      mc: '5812', // your merchant category code
     
    },
  }
];
//order details
const details = {
  total: {
    label: 'Total',
    amount: {
      currency: 'INR',
      value: '1.00', // sample amount
    },
  },
  displayItems: [{
    label: 'Original Amount',
    amount: {
      currency: 'INR',
      value: '1.00',
    },
  }],
};


//payemnt request api firing
function paymentRequest(){
let request = null;
try {
  request = new PaymentRequest(supportedInstruments, details);
} catch (e) {
  console.log('Payment Request Error: ' + e.message);
  return;
}
if (!request) {
  console.log('Web payments are not supported in this browser.');
  return;
}
}

//for checking gpay is installed or not 
/**
 *
 * @private
 * @param {PaymentRequest} request The payment request object.
 * @return {Promise} a promise containing the result of whether can make payment.
 */
const canMakePaymentCache = 'canMakePaymentCache';

async function checkCanMakePayment (request) {
  // Check canMakePayment cache, use cache result directly if it exists.
  if (sessionStorage.hasOwnProperty(canMakePaymentCache)) {
    return Promise.resolve(JSON.parse(sessionStorage[canMakePaymentCache]));
  }
  // If canMakePayment() isn't available, default to assume the method is
  // supported.
  var canMakePaymentPromise = Promise.resolve(true);

  // Feature detect canMakePayment().
  if (request.canMakePayment) {
    canMakePaymentPromise = request.canMakePayment();
  }

  return canMakePaymentPromise
      .then((result) => {
        // Store the result in cache for future usage.
        sessionStorage[canMakePaymentCache] = result;
        return result;
      })
      .catch((err) => {
        console.log('Error calling canMakePayment: ' + err);
      });
}


const [responseOfPayment,setResponseOfPayment] = React.useState(null);


/** Launches payment request flow when user taps on buy button. */
function onBuyClicked() {
  if (!window.PaymentRequest) {
    console.log('Web payments are not supported in this browser.');
    alert('Web payments are not supported in this browser.');
    return;
  }

  // Create supported payment method.
  const supportedInstruments = [
    {
      supportedMethods: ['https://tez.google.com/pay'],
      data: {
        pa: '7875853859@pthdfc',
        pn: 'Anurag Tiwari-1',
        tr: 'h21r3u54982De',// your custom transaction reference ID
        //url:'https://17174cc3-e036-41c5-82a6-1ce90c624cd6-00-2oq5i07bzmsdh.pike.repslit.dev:5000',
        mc: '5812', // your merchant category code
      },
    }
  ];

  // Create order detail data.
  const details = {
    total: {
      label: 'Total',
      amount: {
        currency: 'INR',
        value: selFood?.reduce((ac, cu) => ac + cu.price, 0).toFixed(2), // sample amount
      },
    },
    displayItems: [{
      label: 'Original Amount',
      amount: {
        currency: 'INR',
        value: selFood?.reduce((ac, cu) => ac + cu.price, 0).toFixed(2),
      },
    }],
  };

  // Create payment request object.
  let request = null;
  try {
    request = new PaymentRequest(supportedInstruments, details);
  } catch (e) {
    console.log('Payment Request Error: ' + e.message);
    return;
  }
  if (!request) {
    console.log('Web payments are not supported in this browser.');
    return;
  }

  var canMakePaymentPromise = checkCanMakePayment(request);
  canMakePaymentPromise
      .then((result) => {
        showPaymentUI(request, result);
      })
      .catch((err) => {
        console.log('Error calling checkCanMakePayment: ' + err);
      });
}


function showPaymentUI(request, canMakePayment) {
  if (!canMakePayment) {
    alert('not ready to pay');
    //handleNotReadyToPay();
    return;
  }
 
  // Set payment timeout.
  let paymentTimeout = window.setTimeout(function() {
    window.clearTimeout(paymentTimeout);
    request.abort()
        .then(function() {
          console.log('Payment timed out after 20 minutes.');
        })
        .catch(function() {
          console.log('Unable to abort, user is in the process of paying.');
        });
  }, 20 * 60 * 1000); /* 20 minutes */
 
  request.show()
      .then(function(instrument) {
 
        window.clearTimeout(paymentTimeout);
        //alert(instrument);
        //alert(JSON.stringify(instrument) + 'error showPayment ui show() then');
        setResponseOfPayment(instrument);
        //processResponse(instrument); // Handle response from browser.
      })
      .catch(function(err) {
        console.log(err);
        setResponseOfPayment({
          "details": {
          "tezResponse": {
            "Status": "EEEEEEEEOOOOOOORRRRR",}
          }
        }
          );
      });
 }
// if(checkCanMakePayment()){
  //paymentRequest()
// }


  return (
<>

{/* {  p && 'hello baby'}

<button onClick={()=>{
  localStorage.removeItem('txnId');
  setP(false)
}}>rem</button>
<p onClick={()=>initiateTxn()}>dsds</p>
<a href={`upi://pay?pa=kk.payutest@hdfcbank&pn=demo&tr=dacff41d43b36b0242527417947c00f75b161120a930fbc1c42550b01d209a5c&am=1.00`}>
  <Button type='primary' style={{marginTop:'12px'}} >
pay upi
  </Button> </a>  */}
{/* <a href={`upi://pay?pa=iotronicssystempvtlt.62347918@hdfcbank&pn=VerifiedMerchant&mode=00&orgid=00000&tid=${dyn}&tr=${dyn}&mam=null&tn=trialdemopayment&am=1&cu=INR&url=https://t.ly/5Tocf`}>
  <Button type='primary' style={{marginTop:'12px'}} >
pay upi
  </Button> </a> */}
  {/* <button><a href={`upi://pay?pa=iotronicssystempvtlt.62347918@hdfcbank&pn=VerifiedMerchant&mode=00&orgid=00000&tid=${dyn}&tr=${dyn}&mam=null&tn=trialdemopayment&am=1&cu=INR&url=https://t.ly/5Tocf`}>
    <Button type="primary" style={{position:'absolute',right:'12px',fontWeight:'bold'}}>pay
  </Button></button> */}
{/* <button onClick={()=>{handlePayment()}} style={{marginTop:'50px',padding:'12px',float:'right',color:''}}>Pay with UPi</button> */}
{/* <p>{wy}</p> */}
{/* 
overlays
<div style={{position: 'fixed',
  display: 'block',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor:'rgba(0,0,0,0.5)',
  zIndex: '2',
  cursor: 'pointer'}}>
    
  </div> */}

{/* <a href="paytmmp://pay?pa=7875853859@paytm&pn=anurag&tn=Test UPI&am=1&cu=INR&mc=1234&tr=01234">kkkkkkkkkkkk</a> */}

{/* <a href={`tez://upi/pay?pa=7875853859@paytm&pn=anurag&tn=Test%20UPI&am=1&cu=INR&mc=8989&tr=89098`}><Button type="primary" text={"pp"} style={{fontWeight:'bold'}}>gpay1
  </Button></a>
  
  <a href={`tez://pay?pa=7875853859@paytm&pn=anurag&tn=Test%20UPI&am=1&cu=INR&mc=5653&tr=34343`}><Button type="primary" text={"pp"} style={{fontWeight:'bold'}}>gpay2
  </Button></a>


    <a href={`phonepe://pay?pa=7875853859@paytm&pn=anurag&tn=Test%20UPI&am=1&cu=INR&mc=8987&tr=67676&url=https%3A%2F%2Freact-2pur3b.stackblitz.io%2Fpayment-status`}><Button type="primary" text={"pp"} style={{fontWeight:'bold'}}>phonepay
  </Button></a>  */}


{/* <a style={{marginTop:'12px'}} onClick={()=>{
  onBuyClicked();
}}>pay</a> */}

{/*  */}

<Routes >
<Route path="/"
 element={<>


<div className='main-page'>
<Header className='header'>
      <Row justify="space-between" align="middle" gutter={[16,16]} >
        <Col xs={17} sm={6} md={8} lg={12} style={{marginTop:'12px'}} >
          <div style={{display:'flex'}}>
          <div className="logo-container">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUIAAABjCAYAAADuKgm7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA7dEVYdENvbW1lbnQAeHI6ZDpEQUdCVy1RM0x6Zzo2LGo6MTY2OTAwNzM2NjY4OTE1MTE1OCx0OjI0MDQwMzEx/GNnPwAABOJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgogICAgICAgIDxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICAgICAgICA8ZGM6dGl0bGU+CiAgICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BbmFvb3JuYXMgLSAxPC9yZGY6bGk+CiAgICAgICAgPC9yZGY6QWx0PgogICAgICAgIDwvZGM6dGl0bGU+CiAgICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICAgICAgICA8QXR0cmliOkFkcz4KICAgICAgICA8cmRmOlNlcT4KICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyNC0wNC0wMzwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgICAgPEF0dHJpYjpFeHRJZD45MjBhODk1Yi0yM2NiLTQ5OTItOWI1ZC05NjA5NjNlZTI2NDE8L0F0dHJpYjpFeHRJZD4KICAgICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgICAgIDwvcmRmOmxpPgogICAgICAgIDwvcmRmOlNlcT4KICAgICAgICA8L0F0dHJpYjpBZHM+CiAgICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CgogICAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgICAgICAgeG1sbnM6cGRmPSdodHRwOi8vbnMuYWRvYmUuY29tL3BkZi8xLjMvJz4KICAgICAgICA8cGRmOkF1dGhvcj5LZWplZjY2NjQ5PC9wZGY6QXV0aG9yPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICAgIAogICAgICAgIDwvcmRmOlJERj4KICAgICAgICA8L3g6eG1wbWV0YT4YHLa2AAAAIXRFWHRDcmVhdGlvbiBUaW1lADIwMjQ6MDQ6MDMgMTc6MjM6NTHxqLHaAAAdaUlEQVR4Xu2dCZgUxdnHX24FhNUVWFBkBRQQOeRSQEEBxSOQgIiCiBwSCSQmyPUFEvMBxucjnCYiQkDkEo0Rg8cTL1BAbqIIyCn3ISuwXMuygtBf/Wtq3NmZ6urq2Vmyvfv+4IWpnurqnu7qf91vF3EExDBMwjh97hiVu/JaFWKCQFH1P8MwCSDrQgZ9sWu+CjFBgYWQYRLIju9X05bvvlAhJiiwEDJMAlm6cy5lXjhFaWd2qS1MEGAhZJgEsfzb1+l4xgFyLl2ktNN71FYmCLAQMkwC2JG2ihZvmyk/O+LPvvRN8jMTDFgIGSaX7EvfSAu/HisFMDwFI+00N42DBAshw+SCtXvfpVmrnqVz50+rLagREh0+tTMUYAIBCyHDxMHJzDSau2YYfbB5MjnOJbU1G2xDTZEJBiyEDOMDiNtbX46hFz/vQd8eXa+2xgIhPJX5vQox+R1eWcIwHmDgY0faatqWtoLSMw7SJfHHhra1n6JWNburEJOfYSFkmAgwyHHq3FHaK8Qv7dS3tOf4Blm7u+RcVDEiKKL+d6Fmxab0RLOxKsTkZ1gImULLqcw02ndCCN7p3XTk1C7ak76BLl26FBr9jej3M+qd4cvrk+pQvzunqBCTn2EhZAoVoSbuStp7bCOdOHeYLl5CTc/uEfAriMWLlqQ/PvihCjH5GRZCpsADRwiY5rJ690LKPH9SNHOj+vg8mriR+BHDYkVL0HMPfqRCTH6GhZAp0Czb+Tqt2v02nf3hhNpiwIcgFhV/HLdBE5VOsaLFhRB+HAow+RqePsMUSDDPb/rygfTJ1hmUYSOCwLJKUKFs1VA/ogrHoL5AFWNf+tehAJOvYSFkChwY+Hhl2QA6cGKr2hLSJiud84iYmlyfMi9kiiihSK5RZTr4x0c1k/mvwULIFCgggrNXDaez5/W1QKlPoY9mNJGqJdejs1knRTP7uNoSwj1NFsGgwELIFBgwKLLo6wmiKZzuqXbWYiisiPjTsGp7unjxAh09uz/0nYboNIuwDgYGFkKmwPDuxkl08MQ2FRJYiKFHFCpbKonurf0UHUjfSgdPRqTtQnSaSVdUUp+Y/AwLIVMg2H5kFW0+tFSFIrBQO93XGPG986Zu1KJGV/pi11t0PEPUBD3SiSQctXxpFsIgwELIBB40iT/cMjXHapAYLMQQhrl/TVM7UufbhtPeYxvo4y3T5dzDn/Ahhvx4BQe+U0zg2X5kNR0/c0iFDITVLgrMCby2TFW6t85T9HSrqXTu/Bl6+8v/E83s7FHnHLikE01qcgP1icnvsBAygWf1nneELvmoqqmoaP7Wq3IPdb99NPVqPk6uPZ66tD9tOvwZXdQ5WYjGSxB5tCQw8MoSJtAcObWbXl7aTy6bw+iuF4hTplR5uqNGF2p4XVsqVaKMXH63ZPtrdPHSjypWNtZSponYDm64bmI3XEGAhZAJNMt2zKePt85QoRBugphctirdU+sJqlXpDhmGAK7cpZbfeSieX0EsWqQY9WoxgVKvqR/awORruGnMBJrvRI0wmuhmcumS5eneOn2pf6sp1OD6dnTk9G6atmwAfbJlRvYaZI/qgHVtQUUsWqQoi2CAYCFkAs2R0zu1KhUWw1ur3EOD2s2lVjc/TleUKCtHgWetGEzHMg7K73OAXQyK5/F1NiJSanJDFWCCAAshE2hOnE0LfYhSqdIlytPDjUbQo03/KAUQU2zmrBpOy3e+ofc2HYmH2kUdSkvtlObqExMEWAiZgoVQqDIlk6jPnROoYdV2chPWH7+2aijt/H6dDFthoXZuX2MuYv3rQsdmggELIVOgqJJUi/q3foVSytWQ4e/ghGH1MLn0Ds1lX9NsgIUYRke5rer9shbKBAcWQibQXFEyW3DKlLqaujUbRVerZW3SE83KoXQmK12Gw8QlhhaCCDBa3Lx6JxViggILIRNoblSrN8qUSqLeLcblEMFZK4eEnLJqRCyvaofVKzSiClelhjYwgYGFkAk0lcvXkLWw3i3HU4r4DDAw8sa6UXT2h6g1wi6C6AuXdECxIsWpQ/1BKsQECRZCJtDckFyPHm70Pz/1CUIEZ68cTscyDshwDC5imAhBbHVTN1EjTVEhJkjwyhKmQPHuhom0du97KuSBZrmIzTK9GMQueIfx0634HcZBhWuETIFh6Y759iIIElQ7LFOyPD3SeKQKMUGEhZApEOw9vpEWb52lQj7QNHGBrRiGBmkm0DVlqqgtTBBhIWQCD/oFF6z9XzvXWW5oBNGrdli6VDnq1WIcVSpXXW1hggoLIRN4Xls1jDKyQs4T7OpxBjQJ6AQxuez11Lv5xJ8GaZhgw0LIBJql2+fTgePKkzS0Spj6L35cEoAYFilSRDpy6N/qZUopzzXBggKPGjOBBf2CM5c/q3eiEDH4G8c4cDZqZ4wmJ5epSg/c+jTVSmkR2sgUGFgImUCCfsFXPh9AR93mC4b5Scj8A/HDZO0qV99Md9zYiRooJw5MwYOFkAkkb64bQxsPLlGhEBAtNF1DcwGFib+pyfWFaJ6lI2d2yThF0OYN/RX/iH/DComPeMeIsBuvbSD7/ioJq5Zc76dle0zBhYWQCRzbjqyieatGSjHDC5iqV2hIdVJaUqXyqZR0ZQolsXAxPmEhZAIFmsQTP+kpP7ep/SQ1rNqWXV4xuYaFkAkUb657XtT6KlDrWiHX+wyTCFgImcCAUWKRZSk1uV5oA8MkCBZCJhCgSZx1IZOSSldUWxgmccQlhD/++CNlZGSokDulS5emkiVLqhDDxM8PP2ZSqeKlVYhhEktcK0vGjx9PV199tacNHTpU7cEwuYNFkMlL4qoRNmnShP7zn/+okDvXXXcd7du3j4oVK6a2MAzD5D981wi3bNliJYLg0KFDtGRJzkmvDMMw+Q3fQviPf/xDfbLjrbfeUp8YhmHyJ76bxnXr1pW1QluuvfZaWTPkQROGYfIrvmqE69ev9yWC4NixY/Thhx+qEMMwTP7DlxDG28zl5jHDMPkZ66YxotWsWZN2796ttuQEI8RoAusoV64cHT58mMqUKaO2MAzD5B+shXD58uXUqlUrFcpJjRo1aO3atVIMs7Ky1NacvPHGG/Too4+q0OXh6NGjtHfvXsrMzJRinJycTFWrVg25W7pMXLhwgXbt2iW7CHBcnEOVKlXk+eQFmOyO33z8+HE6d+6cLHzKly9PKSkpeXZME+fPn5e/H+cDML8UBWqpUqVkOK9Att6/f7+87pj8j+Ph999444105ZVXqlh5D46N+3H69Gl5b6666iqqWLGifFYKImfPnqVvv/2WTp06RVdccYXM79dff32e3e/09HR5n8+cOSOfL9zjpKQk38+5tRD+9re/pb/+9a8qlJNnn32WJkyYQB06dKD3339fbc1Jly5d4m4i47iffPKJCuVkxIgR1Lx5cxUieVGmTJlC//rXv2jHjh1qazaVKlWi1q1b0y9/+Utq27at2uoNHqjevXurUE6qV69OL774ogoRXbp0iRYuXEizZ8+W04cgxJEUL16cGjVqRA899BD95je/keKQG9atW0f//Oc/aenSpfTVV19J8YmmaNGidMstt8hr1bNnT7rzzjvVN3aYfj+YNWuWHBgD+P2413PmzKHPPvtMCnIkGDi74447qGvXrjJNrEBKBAcPHqQ333xT9knjmuBhjAbXvnbt2nTvvffSL37xC9fCPV7w2z/66CNatGiR/O0QBWyLBtcK1+DBBx+UFYRrrrlGfeMP5OPvvvtOhXIyffp0qly5svz8ww8/yPyI52Ljxo104sQJKlu2rCyU7r//fvrd734nRToM8u2kSZNUKCcdO3akfv36qVBI7GfOnCmv/Zo1a2J+L47TokUL+TuR93AP4gX39O2336aPP/5YVs7Q0tQBAb7tttukJj3xxBPezxiE0AtRkjmiBINgak2ckIwnLob2e5gohR1x8WU8vzz99NPaNGHixqpYjjN58mRHXHRtPJ2JG+qIC6v2NnPgwAFtGrCmTZuqWI4jaj+OeLi08XQmHghHiJja2x/YD8fWpetl7dq1c/bt26dS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"  />
          </div>
          </div>
        </Col>
        <Col  xs={0} sm={0} md={11} lg={8} >
          <div className='input-box'>
          <Input size="large" placeholder="Search For Items..." prefix={<SearchOutlined/>} onChange={(e)=>{
            setInp(e.target.value)
             console.log(inp)}} value={inp}/>


          </div>
        </Col>
        <Col  xs={7} sm={7} md={4} lg={4} style={{marginTop:'12px',padding:0}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className='switch-box'>
            <span>Veg</span>
          <Switch size="small" value={isVeg} onChange={(e)=>{setIsVeg(e)
          }} />

          </div>

<div style={{position:'relative',cursor:'pointer'}}>
 <svg onClick={(e)=>{
  e.stopPropagation()
  setShowLinks(!showLinks);
 }} xmlns="http://www.w3.org/2000/svg"  fill="none" style={{height:"24px",width:"24px",marginTop:'25px',marginRight:'9px'}}viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>

{showLinks && 
<Card  hoverable bodyStyle={{padding: "10px"}}  bordered={true} style={{
  top:'54px',
  zIndex:999,
  right:'12px',
        position:'absolute',
        width: 160,
        height:100,
        border:'0.1px solid lightgray',
        cursor:'pointer'
      }}>
        <div>
          <Link to ='/about-us' className='hover'>About Us</Link>
          <br/>
          <Link to ='/privacy-policy'  className='hover'>Privacy Policy</Link>
          <br/>
          <Link to ='/contact-us'  className='hover'>Contact Us</Link>
          <br/>
          <Link to ='/terms-condition'  className='hover'>Terms and Conditions</Link>
         
        </div>
      </Card>}
</div>


</div>
        </Col>
        <Col  xs={24} sm={11} md={0} lg={0}>
          <div className='input-box'>
          <Input size="large" placeholder="Search For Items..." prefix={<SearchOutlined/>} onChange={(e)=>{
            setInp(e.target.value)
             console.log(inp)}} value={inp} />

          </div>
        </Col>
      </Row>
    </Header>




{/* overlay */}
{responseOfPayment!=null &&
    <div style={{ 
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: '2',
    cursor: 'pointer',
    justifyContent: 'center',  // Added justify-content: center
    alignItems: 'center',      // Added align-items: center
}}
>
    <Card  bordered={false} style={{position:'relative',width:'90%'}} title={<span style={{fontSize:'14px'}}> Order Id: {responseOfPayment?.details['tezResponse']['txnRef']} <br/> Order Status: {responseOfPayment?.details['tezResponse']['Status']}  <span style={{
      backgroundColor:'red',
  height: '10px',
  width: '10px'
  ,
  borderRadius: '50%',
  display: 'inline-block'}}></span>  </span>}>
<p style={{}}>Thank you for your order</p>


{selFood?.map((e,i)=>{
  return (
    <>
    <div style={{display:'flex',justifyContent:'space-between',fontWeight:'500',margin:'4px'}}>
<p style={{wordBreak:'break-word',width:'200px',fontSize:'14px'}}>{e.name}</p>
<p  style={{width:'45px',fontSize:'14px'}}>₹ {e.price}</p>
</div>
    </>
  )
})}

{/* <div style={{display:'flex',justifyContent:'space-between',fontWeight:'500',margin:'4px'}}>
<p style={{wordBreak:'break-word',width:'200px',fontSize:'14px'}}>Filter Coffee</p>
<p  style={{width:'45px',fontSize:'14px'}}>₹ 1</p>
</div> */}
<Divider style={{margin:'10px 0px'}}/>

<div style={{display:'flex',justifyContent:'space-between',fontWeight:'500'}}>
<p style={{wordBreak:'break-word',width:'200px',fontSize:'14px'}}>Total</p>
<p style={{width:'45px',fontSize:'14px'}}>₹ {selFood?.reduce((ac,cu)=>ac+cu.price,0)}</p>
</div>

<Button type="primary" disabled={false}  style={{float:'right',marginTop:'19px'}} onClick={
  ()=>{
  //localStorage.removeItem('txnId');
  // setP(false);
  //document.getElementsByTagName('body')[0].style.overflow = 'auto';
  setSelFood([]);
}
}>
        OK
        </Button>
 </Card>
  </div>}
{/* overlay */}













<div className={`bottom-anchor ${t?'push-to-top':'push-to-bottom'}`}>

<Anchor
onClick={()=>setT(!t)}
className='anchor-box'   
     items={[
          {
            key: 'part-1',
            href: '#part-1',
            title: 'Breakfast Items',
            
          },
          {
            key: 'part-2',
            href: '#part-2',
            title: 'Main Course Items',
            
          },
          {
            key: 'part-3',
            href: '#part-3',
            title: 'Snacks & Beverages',
          },
         
        
        ]}
      />
 <CloseOutlined onClick={()=>{
    setT(!t)
  }}  className='cross'/>




</div>

    

 <div style={{}}>



  {/* <img style={{width:'100%'}} src="https://i.ibb.co/9vMtWxk/INDIAN-FOOD-2.jpg" alt=""/> */}

  {/* //<img style={{width:'100%'}} src="https://img.freepik.com/free-vector/hand-drawn-asian-food-sale-banner-template_23-2150057614.jpg?ga=GA1.1.1667821893.1709318575&" alt=""/> */}
</div> 




{/* {cart} start*/}
{(selFood?.length>0 && !p) &&
<div className='cart-box'>
<div style={{podition:'relative',padding:'0 30px'}} >
<ShoppingOutlined  style={{fontSize:'34px',color:'white'}}onClick={()=>{
  setToggleCart(!toggleCart)
}}/>
<div style={{position:'absolute',background:'red',top:5,borderRadius:'50%',color:'white',padding:'5px',height:'12px',width:'12px',fontWeight:'800',left:'50px',display:'flex',justifyContent:"center",alignItems:'center'}}>{selFood?.length}</div>
<p style={{color:'white',position:'absolute',top:'17px',left:'75px',fontWeight:'bold'}}>₹{selFood?.reduce((ac,cu)=>ac+cu.price,0)}</p>
{/* <a href={`upi://pay?pa=7875853859@paytm&pn=anurag&tn=Test%20UPI&am=${selFood?.reduce((ac,cu)=>ac+cu.price,0)}&cu=INR&mc=1234&tr=01234re`}><Button type="primary" style={{position:'absolute',right:'12px',fontWeight:'bold'}}>pay
  </Button></a> */}
{/* <a href={`upi://pay?pa=iotronicssystempvtlt.62347918@hdfcbank&pn=VerifiedMerchant&mode=00&orgid=00000&tid=${dyn}&tr=${dyn}&mam=null&tn=trialdemopaytment&am=1&cu=INR&url=https://t.ly/5Tocf`}><Button type="primary" style={{position:'absolute',right:'12px',fontWeight:'bold'}}>pay
  </Button></a> */}
<Button type="primary" style={{position:'absolute',right:'12px',fontWeight:'bold'}} onClick={()=>initiateTxn()}>pay
  </Button>
  
  
</div>

{/* `upi://pay?pa=${payeeVPA}&pn=${payeeName}&mc=${merchantCode}&tid=${transactionId}&tr=${transactionRefId}&tn=${transactionNote}&am=${transactionAmount}&cu=${currencyCode}&url=${callbackUrl}` */}

{/* paytmmp://pay?pa=7875853859@paytm&pn=anurag&tn=Test UPI&am=1&cu=INR&mc=1234&tr=01234 */}
</div>}

<div style={{
    background: '#fff',
    position: 'fixed',
    bottom: toggleCart?'0px':'-258px', // Corrected this line
    left: '50%', 
    width: '100%',
    transform: 'translateX(-50%)', // Corrected this line
    zIndex: 9999,
    border:'1px solid gray',
    transition: 'bottom 0.1s ease-in-out',
    borderTopLeftRadius:'23px',
    borderTopRightRadius:'23px'
    
}}>
<div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'150px',overflow:'scroll',width:'100%',padding:'9px 0',margin:'12px 0'}}>

{/* <div style={{height:'150px',border:'1px solid red',width:'150px'}}></div> */}
{selFood?.map((e,i)=>{
  return(<>
  <div key={i} style={{borderBottom:'1px solid black',width:'200px',padding:'12px 0',display:'flex',justifyContent:'space-around'}}>
<p style={{fontWeight:'bold'}}>{e.name}</p> <p style={{fontWeight:'bold'}}>₹ {e.price} &nbsp; <span>
  <CloseOutlined onClick={()=>{
   setSelFood(selFood.filter(r=>r.name !== e.name));
  }}  style={{fontSize:'16px'}}/> </span>   </p>
  </div>
  
  </>)
})}
</div>

 <CloseOutlined onClick={()=>{
    setToggleCart(!toggleCart)
  }}  style={{float:'right',marginRight:'36px',marginBottom:'30px',fontSize:'25px'}}/>


</div>










{/* {cart} end*/}
       



  <Row style={{marginTop:'40px'}}>

    <Col xs={0} sm={0} md={5} lg={5} >
      <div style={{position:'sticky',top:'135px'}}>
      <Anchor
      style={{maxHeight:"100vh",
        marginLeft:"24px"
    }}
        items={[
          {
            key: 'part-1',
            href: '#part-1',
            title: 'Breakfast Items',
          },
          {
            key: 'part-2',
            href: '#part-2',
            title: 'Main Course Items',
          },
          {
            key: 'part-3',
            href: '#part-3',
            title: 'Snacks & Beverages',
          },
        ]}
      />
      </div>
    </Col>
    <Col xs={24} sm={24} md={19} lg={19} style={{marginBottom:'39px'}}>
      <div
         id="part-1"
        style={{
       
          background: 'rgba(255,0,0,0.02)',
        }}
      >
 <h3 style={{marginLeft:'16px'}}>{food[0].heading}</h3>
        <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'12px',alignItems:'center',}}>
{food[0].content.filter(e=>e.name.toLowerCase().includes(inp.toLowerCase()) && e.isVeg===isVeg).length>0 ? food[0].content.filter(e=>e.name.toLowerCase().includes(inp.toLowerCase()) && e.isVeg===isVeg).map((e,i)=>{
  return (<>

<div
                        key={i}
                          style={{
                            display: 'flex',
                            background: '#fff',
                            width: '300px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '5px',
                            marginBottom: '16px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            margin: '10px',
                            justifyContent: 'space-around',
                          }}
                        >
                          <div
                            style={{
                              width: '140px',
                              height: '200px',
                              borderRadius: '10px',
                            }}
                          >
                            <img
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                              }}
                              src={
                                e.img ||
                                'https://img.freepik.com/premium-photo/vada-pav-wada-pao-is-indian-desi-burger-is-roadside-fast-food-dish-from-maharashtra-selective-focus_466689-67470.jpg'
                              }
                              alt="Vada Pav - Indian Street Food"
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'space-between',
                              justifyContent:'center',
                              width: '140px',
                              padding: '12px 0 0 0',
                            }}
                          >
                            <h3
                              style={{
                                marginBottom: '8px',
                                wordBreak: 'break-word',
                              }}
                            >
                              {e.name}
                            </h3>
                            <p
                              style={{
                                marginBottom: '8px',
                                fontSize: '20px',
                                fontWeight: 'bold',
                              }}
                            >
                              ₹ {e.price}
                            </p>
                            <p
                              style={{
                                marginBottom: '8px',
                                fontSize: '13px',
                                wordBreak: 'break-word',
                                lineHeight: '14px',
                              }}
                            >
                              {e.description}
                            </p>
                            <div style={{ marginBottom: '8px' }}>
                              <Tag color="geekblue">{e.tag}</Tag>
                            </div>
                            <Button type="primary"  onClick={()=>{


    setSelFood([...selFood,e])

  }}>
                              Add
                            </Button>

                          


<div style={{ display: 'flex', alignItems: 'center' }}>
<Button  type="primary" style={{ fontWeight:'bold'}}>-</Button>

      <div style={{ width: '40px',fontWeight:'500', textAlign: 'center', fontSize: '16px', padding: '10px' }}>
       {e.quantity}
      </div>
      <Button  type="primary" style={{ fontWeight:'500'}}>+</Button>

    </div>



                          </div>
                        </div>

  </>)
}):<p style={{}}>No Items...</p>}
</div>

      </div>
      <div
        id="part-2"
        style={{
          background: 'rgba(0,255,0,0.02)',
         
        }}
      >
        <h3 style={{marginLeft:'12px'}}>{food[1].heading}</h3>
        <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'12px',alignItems:'center'}}>
{food[1].content.filter(e=>e.name.toLowerCase().includes(inp.toLowerCase()) && e.isVeg===isVeg).length>0 ? food[1].content.filter(e=>e.name.toLowerCase().includes(inp.toLowerCase()) && e.isVeg===isVeg).map((e,i)=>{
  return (<>
   
   <div
                        key={i}
                          style={{
                            display: 'flex',
                            background: '#fff',
                            width: '300px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '5px',
                            marginBottom: '16px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            margin: '10px',
                            justifyContent: 'space-around',
                          }}
                        >
                          <div
                            style={{
                              width: '140px',
                              height: '200px',
                              borderRadius: '10px',
                            }}
                          >
                            <img
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                              }}
                              src={
                                e.img ||
                                'https://img.freepik.com/premium-photo/vada-pav-wada-pao-is-indian-desi-burger-is-roadside-fast-food-dish-from-maharashtra-selective-focus_466689-67470.jpg'
                              }
                              alt="Vada Pav - Indian Street Food"
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'space-between',
                              justifyContent:'center',
                              width: '140px',
                              padding: '12px 0 0 0',
                            }}
                          >
                            <h3
                              style={{
                                marginBottom: '8px',
                                wordBreak: 'break-word',
                              }}
                            >
                              {e.name}
                            </h3>
                            <p
                              style={{
                                marginBottom: '8px',
                                fontSize: '20px',
                                fontWeight: 'bold',
                              }}
                            >
                              ₹ {e.price}
                            </p>
                            <p
                              style={{
                                marginBottom: '8px',
                                fontSize: '13px',
                                wordBreak: 'break-word',
                                lineHeight: '14px',
                              }}
                            >
                              {e.description}
                            </p>
                            <div style={{ marginBottom: '8px' }}>
                              <Tag color="geekblue">{e.tag}</Tag>
                            </div>
                            <Button type="primary"  onClick={()=>{
    setSelFood([...selFood,e])
  }}>
                              Add
                            </Button>
                          </div>
                        </div>
  
  </>)
}):'No Items...'}
</div>
      </div>
      <div
        id="part-3"
        style={{
        
          background: 'rgba(0,0,255,0.02)',
        }}
      >
<h3 style={{marginLeft:'12px'}}>{food[2].heading}</h3>
        <div style={{display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:'12px',alignItems:'center'}}>
{food[2].content.filter(e=>e.name.toLowerCase().includes(inp.toLowerCase()) && e.isVeg===isVeg).length>0 ? food[2].content.filter(e=>e.name.toLowerCase().includes(inp.toLowerCase()) && e.isVeg===isVeg).map((e,i)=>{
  return (<>
   


   <div
                        key={i}
                          style={{
                            display: 'flex',
                            background: '#fff',
                            width: '300px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '5px',
                            marginBottom: '16px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            margin: '10px',
                            justifyContent: 'space-around',
                          }}
                        >
                          <div
                            style={{
                              width: '140px',
                              height: '200px',
                              borderRadius: '10px',
                            }}
                          >
                            <img
                              style={{
                                objectFit: 'contain',
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px',
                              }}
                              src={
                                e.img ||
                                'https://img.freepik.com/premium-photo/vada-pav-wada-pao-is-indian-desi-burger-is-roadside-fast-food-dish-from-maharashtra-selective-focus_466689-67470.jpg'
                              }
                              alt="Vada Pav - Indian Street Food"
                            />
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'space-between',
                              justifyContent:'center',
                              width: '140px',
                              padding: '12px 0 0 0',
                            }}
                          >
                            <h3
                              style={{
                                marginBottom: '8px',
                                wordBreak: 'break-word',
                              }}
                            >
                              {e.name}
                            </h3>
                            <p
                              style={{
                                marginBottom: '8px',
                                fontSize: '20px',
                                fontWeight: 'bold',
                              }}
                            >
                              ₹ {e.price}
                            </p>
                            <p
                              style={{
                                marginBottom: '8px',
                                fontSize: '13px',
                                wordBreak: 'break-word',
                                lineHeight: '14px',
                              }}
                            >
                              {e.description}
                            </p>
                            <div style={{ marginBottom: '8px' }}>
                              <Tag color="geekblue">{e.tag}</Tag>
                            </div>
                            <Button type="primary"  onClick={()=>{
    setSelFood([...selFood,e])
  }}>
                              Add
                            </Button>
                          </div>
                        </div>

  </>)
}):'No Items...'}
</div>



      </div>
    </Col>
  </Row>
{isSmallScreen && <Button
style={{position:'fixed',bottom:65,right:30,color:'white',background:'black'}}
      
      icon={<MenuUnfoldOutlined />}
      
      onClick={()=>{
        setT(!t)
      }}
      size={'large'}
    />}
  {/* <button style={{position:'fixed',bottom:50,right:60}} >rrr</button> */}
  </div>
 </>}
/>

<Route path='/about-us'  element={<>
  <span onClick={()=>{
     navigate(-1);
  }} style={{margin:'12px ', backgroundColor: '#3498db', width:'28px', display: 'flex', color: '#ffffff', fontWeight: 'bold', padding: '0.5px 3px', gap: '2px', borderRadius: '5px', cursor: 'pointer'}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '24px', height: '24px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </span>
  <div style={{width: '100%',padding:'12px'}}>
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h2 style={{marginBottom: '20px'}}>About Us</h2>
       <b> Annapoorna: Where Local Flavors Meet Innovation. </b>

       At Annapoorna, we're driven by a deep appreciation for authentic, local cuisine. We believe that every bite tells a story, reflecting the passion and culinary heritage of talented food vendors who are the cornerstones of our communities.  We're not just a platform; we're a bridge connecting these vendors with food enthusiasts who crave unique and delicious experiences.


        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Our Passion:</h3>
        We're passionate about supporting local food vendors, the backbone of our communities. We understand the challenges they face, and we're dedicated to providing innovative solutions that empower them to thrive.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Empowering Vendors &amp; Delighting Customers:</h3>
        <br/>
        <b>Annapoorna offers a revolutionary suite of tools designed to simplify vendor operations. Our platform helps them. </b>
        For customers, Annapoorna unlocks a world of culinary exploration,Our platform streamlines the ordering and payment process, allowing vendors to focus on what they do best: creating delicious food. Customers benefit from a user-friendly experience that lets them quickly order and pay for their meals, eliminating wait times and cash-only limitations.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>More Than Just a Transaction:</h3>
        We believe in the power of food to bring people together. Annapoorna fosters a connected ecosystem where vendors can build meaningful relationships with their customers. Our platform facilitates:<br/>
        We go beyond simply facilitating transactions. We create a connected ecosystem where local food vendors can build stronger relationships with their customers. Our platform fosters loyalty and encourages repeat business.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>
          Join the Movement:</h3>
          Whether you're a passionate vendor eager to share your culinary creations or a food enthusiast seeking new taste adventures, Annapoorna welcomes you. Be part of a vibrant movement that's revitalizing local food experiences. Let's create a future where fresh, high-quality food from talented local vendors is easily accessible to everyone.
        Become part of a movement that's revitalizing local food experiences. Whether you're a passionate vendor or a food enthusiast, Annapoorna makes it easier than ever to enjoy the best local cuisine.
        <b>Together, let's create a more vibrant and delicious future for local food!</b>
        <p />
      </div>









</>}/>

<Route path='/privacy-policy'  element={<>

  <span onClick={()=>{
     navigate(-1);
  }} style={{margin:'12px ', backgroundColor: '#3498db', width:'28px', display: 'flex', color: '#ffffff', fontWeight: 'bold', padding: '0.5px 3px', gap: '2px', borderRadius: '5px', cursor: 'pointer'}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '24px', height: '24px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </span>
  <div style={{width: '100%',padding:'12px'}}>
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h2 style={{marginBottom: '20px'}}>Privacy Policy</h2>
        Annapoorna we are  committed to protecting the privacy of our users ("you" or "your"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Information We Collect:</h3>
        We collect the following types of information when you use our Service:
        Personal Information: This may include your name, phone number, and email address (optional) when you create an account or place an order.
        Transaction Information: This includes details about your orders, such as the food items purchased, amount paid, and time of transaction.
        Device Information: We may collect standard information sent by your device, such as device type, operating system, and IP address. This information is used for analytics and to improve the Service.
        How We Use Your Information:
        We use the information we collect for the following purposes:
        To facilitate transactions between vendors and customers.
        To provide and improve the Service, including order processing and customer support.
        To send you updates and information about our Service.
        To analyze user behavior and improve the overall experience.
        To comply with legal and regulatory requirements.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Data Sharing:</h3>
        We may share your information with third-party service providers who assist us in operating the Service, such as payment processors. These providers are obligated to use your information only for the purpose of providing the services to us.
        We will not share your personal information with any third parties for marketing purposes without your explicit consent.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Data Security:</h3>
        We go beyond simply facilitating transactions. We create a connected ecosystem where local food vendors can build stronger relationships with their customers. Our platform fosters loyalty and encourages repeat business.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Children's Privacy:</h3>
        Our Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us. We will take steps to remove such information from our records.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Changes to this Privacy Policy:</h3>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our Service. You are advised to review this Privacy Policy periodically for any changes.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>
          Your Rights:</h3>
        You have certain rights regarding your information
        You can access and update your personal information through your account settings.
        You can request to delete your information by contacting us.
        Data Retention:
        We will retain your information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Contact Us:</h3>
        If you have any questions about this Privacy Policy, please contact us at:
        Email: anurag@iotronsys.com
        Commitment to Data Privacy Regulations:
        We are committed to complying with all applicable data privacy regulations, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
        <p />
      </div>

</>}/>



<Route path='/contact-us'  element={<>
  <span onClick={()=>{
     navigate(-1);
  }} style={{margin:'12px ', backgroundColor: '#3498db', width:'28px', display: 'flex', color: '#ffffff', fontWeight: 'bold', padding: '0.5px 3px', gap: '2px', borderRadius: '5px', cursor: 'pointer'}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '24px', height: '24px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </span>
  <div style={{width: '100%',padding:'12px'}}>
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h2 style={{marginBottom: '20px'}}>Contact Us</h2>
       <b> We value your feedback and inquiries. Please don't hesitate to reach out to us using the following contact information: </b>
       <br/>
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
       
        </p>Annapoorna by Iotronics
        
        <br/>
Address: 2nd Floor, Block, DERBI Foundation, 1, Hosur Rd, Kudlu Gate, Srinivasa Nagar, Hal Layout, Singasandra, Bengaluru, Karnataka 560068
<br/>
Email: anurag@iotronsys.com
<br/>
Phone: +91 7875853859
<br/>
        
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>Empowering Vendors &amp; Delighting Customers:</h3>
        <br/>
       
        For general inquiries or support:anurag@iotronsys.com

We strive to respond to all inquiries within 24 hours.        <p />
        
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p><h3 style={{marginTop: '15px'}}>
        We look forward to hearing from you!</h3>
         
        <p />
      </div>









</>}/>















<Route path='/terms-condition'  element={<>

  <span onClick={()=>{
     navigate(-1);
  }} style={{margin:'12px ', backgroundColor: '#3498db', width:'28px', display: 'flex', color: '#ffffff', fontWeight: 'bold', padding: '0.5px 3px', gap: '2px', borderRadius: '5px', cursor: 'pointer'}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{width: '24px', height: '24px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </span>
  <div style={{width: '100%',padding:'12px'}}>
  <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>
        <h2 style={{marginBottom: '20px'}}>Terms and Conditions</h2>
        Welcome to Annapoorna
These Terms and Conditions govern your access to and use of our online platform  and related services . 
By accessing or using the Platform, you agree to be bound by these Terms. <b>If you do not agree to all of these Terms, you are not authorized to use the Platform or Services.</b>
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>
        <h3 style={{marginTop: '15px'}}>1. Definitions:</h3>
        <b>Platform: </b>The online platform operated by the Company, including its mobile application (if applicable), website, and associated features facilitating transactions between vendors and customers.
        <br/>
<b>Services:</b> All features and functionalities offered by the Company through the Platform, including order processing, payment facilitation, vendor management tools, and customer support.
<br/>

<b>Vendor:</b> A local food seller registered on the Platform to manage orders and receive payments from customers.
<br/>
<b>Customer:</b> A user of the Platform who places orders and pays for food from vendors.
<br/>
<b>Content:</b> Includes menus, descriptions, images, and other information displayed on the Platform.
        <p/>
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>
      <h3 style={{marginTop: '15px'}}>User Accounts:</h3>
        Users may be required to create an account to access certain features of the Platform.<br/>
You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.<br/>
You agree to provide accurate and complete information when creating your account.
        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>
        <h3 style={{marginTop: '15px'}}>User Responsibilities:</h3>
        <br/>
        <b>1 Vendors:</b>
        <br/>
You are solely responsible for the accuracy and completeness of all content you provide on the Platform, including menu items, prices, descriptions, and food safety compliance.<br/>
You agree to fulfill all orders placed through the Platform in a timely and accurate manner, adhering to agreed-upon delivery/pickup times.<br/>
You are responsible for complying with all applicable laws and regulations related to food safety, hygiene, licensing, and permits.<br/>
You agree to treat customers with courtesy and respect.
<br/>
<b>2 Customers:</b>
<br/>
You are responsible for providing accurate information when placing an order, including desired food items, quantities, and preferred delivery/pickup method (if applicable).<br/>
You agree to pay for all orders placed through the Platform using authorized payment methods.<br/>
You are responsible for adhering to any specific instructions or requirements outlined by the vendor for your order.<br/>
You agree to treat vendors with courtesy and respect.


        <p />
        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>

        <h3 style={{marginTop: '15px'}}>Acceptable Use:</h3>
        The Platform is intended for lawful purposes to facilitate local food purchases and related transactions. Prohibited activities include, but are not limited to:
<br/>
Uploading inaccurate, misleading, or offensive content.<br/>
Placing fraudulent orders or attempting to pay with unauthorized methods.<br/>
Harassing, abusing, or threatening other users.<br/>
Disrupting the operation of the Platform through technical means.<br/>
Using the Platform for any activity that violates applicable laws or regulations.


<p />




        
<p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>

      <h3 style={{marginTop: '15px'}}> Intellectual Property:</h3>
      The Platform and Services contain intellectual property belonging to the Company or its licensors. You agree not to reproduce, modify, distribute, or commercially exploit any of this intellectual property without our express written consent.        
      <p />
       
      <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>
        <h3 style={{marginTop: '15px'}}>
        Disclaimer of Warranties:</h3>
        THE PLATFORM AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.  WE DO NOT WARRANT THAT THE PLATFORM OR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR VIRUS-FREE.
        <p/>

        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>
        <h3 style={{marginTop: '15px'}}>Limitation of Liability:</h3>
        TO THE FULLEST EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE PLATFORM OR SERVICES.  THIS INCLUDES, BUT IS NOT LIMITED TO, DAMAGES FOR LOST PROFITS, DATA LOSS, BUSINESS INTERRUPTION, PERSONAL INJURY, PROPERTY DAMAGE, OR ANY OTHER DAMAGES ARISING OUT OF YOUR USE OF THE CONTENT OR SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        <p />




        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>
        <h3 style={{marginTop: '15px'}}> Indemnification:</h3>
        You agree to indemnify, defend, and hold harmless the Company, our officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, expenses, damages, and costs, including reasonable attorneys' fees, arising out of or related to your violation of these Terms.
        <p />

        <p style={{textAlign: 'justify', textIndent: '2em'}}>
        </p>
        <h3 style={{marginTop: '15px'}}>Termination:</h3>
        We may terminate your access to the Platform or Services for any reason, at any time, with.       
        <p />

      </div>

</>}/>

</Routes>




  </>
);}
export default App;


function AboutUs(){
  
}