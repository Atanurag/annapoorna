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



import React from 'react';
import { Anchor } from 'antd';
import { Divider, Flex, Tag,Button ,Layout,Input, Row, Col,Switch,Card } from 'antd';
import { CloseOutlined ,MenuUnfoldOutlined,SearchOutlined,ShoppingOutlined } from '@ant-design/icons';
import './index.css';
import io from 'socket.io-client'

const { Header, Content, Footer } = Layout;

const App = () =>{
  const [inp,setInp] =React.useState('')
  const [t,setT]= React.useState(false)
  const [isVeg,setIsVeg] = React.useState(true);
  const [selFood,setSelFood] = React.useState([])
  const[toggleCart,setToggleCart] = React.useState(false)
  const [food,setFood] = React.useState([
    // Breakfast Items (Heading)
    {
      heading: 'Breakfast Items',
      content: [
        {
          name: "Dosa",
          description: "A thin, crispy crepe made from fermented rice and lentil batter",
          price: 50,
          isVeg: true,
          tag: "Classic"
        },
        {
          name: "Idli",
          description: "Steamed savory rice cakes",
          price: 30,
          isVeg: true,
          tag: "Classic"
        },
        {
          name: "Vada",
          description: "Lentil fritters",
          price: 20,
          isVeg: true,
          tag: "Classic"
        },
        {
          name: "Upma",
          description: "Savory semolina porridge",
          price: 40,
          isVeg: true,
          tag: "Healthy"
        },
        {
          name: "Pongal",
          description: "Rice dish cooked with lentils and spices",
          price: 45,
          isVeg: true,
          tag: "Comfort Food"
        }
      ]
    },
  
    // Main Course Items (Heading)
    {
      heading: 'Main Course Items',
      content: [
        {
          name: "Sambar",
          description: "Lentil and vegetable stew",
          price: 40,
          isVeg: true,
          tag: "Accompaniment"
        },
        {
          name: "Rasam",
          description: "Spicy lentil soup",
          price: 35,
          isVeg: true,
          tag: "Soup"
        },
        {
          name: "Uttapam",
          description: "Thick pancake made from fermented rice and lentil batter",
          price: 55,
          isVeg: true,
          tag: "Main Course"
        },
        {
          name: "Masala Dosa",
          description: "Dosa stuffed with spiced potato filling",
          price: 60,
          isVeg: true,
          tag: "Main Course"
        },
        {
          name: "Rava Dosa",
          description: "Dosa made from semolina batter",
          price: 50,
          isVeg: true,
          tag: "Main Course"
        },
        {
          name: "Puri",
          description: "Deep-fried unleavened bread",
          price: 25,
          isVeg: true,
          tag: "Side Dish"
        },
        {
          name: "Egg Bonda",
          description: "Bonda stuffed with a boiled egg",
          price: 25,
          isVeg: false,
          tag: "Non-Veg"
        },
        {
          name: "Medu Vada",
          description: "Urad dal fritters shaped like donuts",
          price: 30,
          isVeg: true,
          tag: "Side Dish"
        },
        {
          name: "Chicken Chettinad",
          description: "Spicy chicken dish from the Chettinad region",
          price: 80,
          isVeg: false,
          tag: "Non-Veg Main Course"
        }
      ]
    },
  
    // Snacks & Beverages (Heading)
    {
      heading: 'Snacks & Beverages',
      content: [
        {
          name: "Payasam",
          description: "Sweet milk pudding",
          price: 40,
          isVeg: true,
          tag: "Dessert"
        },
        {
          name: "Filter Coffee",
          description: "Strong coffee brewed in a traditional South Indian filter",
          price: 1,
          isVeg: true,
          tag: "Beverage"
        },
        {
          name: "Coconut Chutney",
          description: "Spicy condiment made with coconut",
          price: 20,
          isVeg: true,
          tag: "Condiment"
        },
        ]}]
  )
  function generateUniqueTransactionId() {
    return 'txid-' + Date.now();
  }

 let dyn =  generateUniqueTransactionId();
 // return `upi://pay?pa=iotronicssystempvtlt.62347918@hdfcbank&pn=VerifiedMerchant&mode=00&orgid=00000&tid=${dyn}&tr=${dyn}&mam=null&tn=trialdemopaytment&am=1&cu=INR&url=https://t.ly/5Tocf`;

 //' return `upi://pay?pa=iotronicssystempvtlt.62347918@hdfcbank&pn=VerifiedMerchant&mode=00&orgid=00000&tid=${transactionId}&tr=${transactionRefId}&mam=null&tn=${encodedTransactionNote}&am=${transactionAmount}&cu=${currencyCode}&url=${encodedCallbackUrl}`;


 const [p,setP] =React.useState(false)

 async function initiateTxn(){
  try{
let startTxn = await fetch('https://8b531e0e-eb1d-4615-a175-1d03aed63513-00-14eudonfdu6o9.pike.replit.dev:9000/initiate-payment')
let data = await startTxn.json()
window.open(`upi://pay?pa=${data.result.merchantVpa}&pn=${data.result.merchantName}&tr=${data.metaData.referenceId}&am=${data.result.amount}`,'_blank');
setTimeout(()=>{
  localStorage.setItem('txnId',JSON.stringify(data.metaData.txnId))
  setP(true)
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

 React.useEffect(()=>{
if(localStorage.getItem('txnId')){
  setP(true)
  verifyTxn().then(e=>{

    if(e.transaction_details[JSON.parse(localStorage.getItem('txnId'))].status === 'pending'){

console.log('pending')
// localStorage.removeItem('txnId')
//   setP(false)
// localStorage.removeItem('txnId')
    }
  })
}
 },[])
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
  return (
<>

{  p && 'hello baby'}

<button onClick={()=>{
  localStorage.removeItem('txnId');
  setP(false)
}}>rem</button>
<p onClick={()=>initiateTxn()}>dsds</p>
<a href={`upi://pay?pa=kk.payutest@hdfcbank&pn=demo&tr=dacff41d43b36b0242527417947c00f75b161120a930fbc1c42550b01d209a5c&am=1.00`}>
  <Button type='primary' style={{marginTop:'12px'}} >
pay upi
  </Button> </a> 
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
<div className='main-page'>
<Header className='header'>
      <Row justify="space-between" align="middle" gutter={[16,16]} >
        <Col xs={18} sm={8} md={8} lg={12} >
          <div style={{display:'flex'}}>
          <div className="logo-container">
            <img src="data:image/png;base64,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j4oVK6a2MAzD5D981wi3bNliJYLg0KFDtGRJzkmvDMMw+Q3fQviPf/xDfbLjrbfeUp8YhmHyJ76bxnXr1pW1QluuvfZaWTPkQROGYfIrvmqE69ev9yWC4NixY/Thhx+qEMMwTP7DlxDG28zl5jHDMPkZ66YxotWsWZN2796ttuQEI8RoAusoV64cHT58mMqUKaO2MAzD5B+shXD58uXUqlUrFcpJjRo1aO3atVIMs7Ky1NacvPHGG/Too4+q0OXh6NGjtHfvXsrMzJRinJycTFWrVg25W7pMXLhwgXbt2iW7CHBcnEOVKlXk+eQFmOyO33z8+HE6d+6cLHzKly9PKSkpeXZME+fPn5e/H+cDML8UBWqpUqVkOK9Att6/f7+87pj8j+Ph999444105ZVXqlh5D46N+3H69Gl5b6666iqqWLGifFYKImfPnqVvv/2WTp06RVdccYXM79dff32e3e/09HR5n8+cOSOfL9zjpKQk38+5tRD+9re/pb/+9a8qlJNnn32WJkyYQB06dKD3339fbc1Jly5d4m4i47iffPKJCuVkxIgR1Lx5cxUieVGmTJlC//rXv2jHjh1qazaVKlWi1q1b0y9/+Utq27at2uoNHqjevXurUE6qV69OL774ogoRXbp0iRYuXEizZ8+W04cgxJEUL16cGjVqRA899BD95je/keKQG9atW0f//Oc/aenSpfTVV19J8YmmaNGidMstt8hr1bNnT7rzzjvVN3aYfj+YNWuWHBgD+P2413PmzKHPPvtMCnIkGDi74447qGvXrjJNrEBKBAcPHqQ333xT9knjmuBhjAbXvnbt2nTvvffSL37xC9fCPV7w2z/66CNatGiR/O0QBWyLBtcK1+DBBx+UFYRrrrlGfeMP5OPvvvtOhXIyffp0qly5svz8ww8/yPyI52Ljxo104sQJKlu2rCyU7r//fvrd734nRToM8u2kSZNUKCcdO3akfv36qVBI7GfOnCmv/Zo1a2J+L47TokUL+TuR93AP4gX39O2336aPP/5YVs7Q0tQBAb7tttukJj3xxBPezxiE0AtRkjmiBINgak2ckIwnLob2e5gohR1x8WU8vzz99NPaNGHixqpYjjN58mRHXHRtPJ2JG+qIC6v2NnPgwAFtGrCmTZuqWI4jaj+OeLi08XQmHghHiJja2x/YD8fWpetl7dq1c/bt26dS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"  />
          </div>
          </div>
        </Col>
        <Col  xs={0} sm={0} md={11} lg={8}>
          <div classname='input-box'>
          <Input size="large" placeholder="Search For Items..." prefix={<SearchOutlined/>} onChange={(e)=>{
            setInp(e.target.value)
             console.log(inp)}} value={inp}/>


          </div>
        </Col>
        <Col  xs={6} sm={4} md={4} lg={4}>
          <div className='switch-box'>
            <span>Veg</span>
          <Switch size="small" value={isVeg} onChange={(e)=>{setIsVeg(e)
          }} />

          </div>
        </Col>
        <Col  xs={24} sm={11} md={0} lg={0}>
          <div classname='input-box'>
          <Input size="large" placeholder="Search For Items..." prefix={<SearchOutlined/>} onChange={(e)=>{
            setInp(e.target.value)
             console.log(inp)}} value={inp} />

          </div>
        </Col>
      </Row>
    </Header>





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
}}>
    <Card  bordered={false} style={{position:'relative',width:'90%'}} title={<span style={{fontSize:'14px'}}> Order Id: kddgfgfdfs454d <br/> Order Status: Completed  <span style={{
      backgroundColor:'green',
  height: '10px',
  width: '10px'
  ,
  borderRadius: '50%',
  display: 'inline-block'}}></span>  </span>}>
<p style={{}}>Thank you for your order</p>

<div style={{display:'flex',justifyContent:'space-between',fontWeight:'500',margin:'4px'}}>
<p style={{wordBreak:'break-word',width:'200px',fontSize:'14px'}}>Dosa (Qty 1)</p>
<p  style={{width:'45px',fontSize:'14px'}}>₹ 25</p>
</div>
<div style={{display:'flex',justifyContent:'space-between',fontWeight:'500',margin:'4px'}}>
<p style={{wordBreak:'break-word',width:'200px',fontSize:'14px'}}>Idli/sambhar (Qty1)</p>
<p  style={{width:'45px',fontSize:'14px'}}>₹ 20</p>
</div>
<div style={{display:'flex',justifyContent:'space-between',fontWeight:'500',margin:'4px'}}>
<p style={{wordBreak:'break-word',width:'200px',fontSize:'14px'}}>utappa (Qty1)</p>
<p  style={{width:'45px',fontSize:'14px'}}>₹ 25</p>
</div>
<Divider style={{margin:'10px 0px'}}/>

<div style={{display:'flex',justifyContent:'space-between',fontWeight:'500'}}>
<p style={{wordBreak:'break-word',width:'200px',fontSize:'14px'}}>Total</p>
<p style={{width:'45px',fontSize:'14px'}}>₹ 70</p>
</div>

<Button type="primary" disabled={true}  style={{float:'right',marginTop:'19px'}} onClick={()=>{}}>
        Done
        </Button>
 </Card>
  </div>














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
  <img style={{width:'104%'}} src="https://img.freepik.com/free-vector/hand-drawn-asian-food-sale-banner-template_23-2150057614.jpg?ga=GA1.1.1667821893.1709318575&" alt=""/>
</div>




{/* {cart} start*/}
{selFood?.length>0 &&
<div className='cart-box'>
<div style={{podition:'relative',padding:'0 30px'}} >
<ShoppingOutlined  style={{fontSize:'34px',color:'white'}}onClick={()=>{
  setToggleCart(!toggleCart)
}}/>
<div style={{position:'absolute',background:'red',top:5,borderRadius:'50%',color:'white',padding:'5px',height:'12px',width:'12px',fontWeight:'800',left:'50px',display:'flex',justifyContent:"center",alignItems:'center'}}>{selFood?.length}</div>
<p style={{color:'white',position:'absolute',top:'17px',left:'75px',fontWeight:'bold'}}>₹{selFood?.reduce((ac,cu)=>ac+cu.price,0)}</p>
{/* <a href={`upi://pay?pa=7875853859@paytm&pn=anurag&tn=Test%20UPI&am=${selFood?.reduce((ac,cu)=>ac+cu.price,0)}&cu=INR&mc=1234&tr=01234re`}><Button type="primary" style={{position:'absolute',right:'12px',fontWeight:'bold'}}>pay
  </Button></a> */}
<a href={`upi://pay?pa=iotronicssystempvtlt.62347918@hdfcbank&pn=VerifiedMerchant&mode=00&orgid=00000&tid=${dyn}&tr=${dyn}&mam=null&tn=trialdemopaytment&am=1&cu=INR&url=https://t.ly/5Tocf`}><Button type="primary" style={{position:'absolute',right:'12px',fontWeight:'bold'}}>pay
  </Button></a>
  {/* <a href={`upi://pay?pa=7875853859@paytm&am=1pn=anurag&amp;tn=Test%20UPI&amp;am=1&amp;cu=INR&amp;mc=1234&amp;tr=01234`}><Button type="primary" text={"pp"} style={{position:'absolute',right:'12px',fontWeight:'bold'}}>pay
  </Button></a> */}
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
  <div style={{borderBottom:'1px solid black',width:'200px',padding:'12px 0',display:'flex',justifyContent:'space-around'}}>
<p style={{fontWeight:'bold'}}>{e.name}</p> <p style={{fontWeight:'bold'}}>₹ {e.price}</p>
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
    
    <Col xs={0} sm={0} md={6} lg={6} style={{border:'1px solid red'}}>
      <div style={{position:'fixed'}}>
      <Anchor
        items={[
          {
            key: 'part-1',
            href: '#part-1',
            title: 'Part 1',
          },
          {
            key: 'part-2',
            href: '#part-2',
            title: 'Part 2',
          },
          {
            key: 'part-3',
            href: '#part-3',
            title: 'Part 3',
          },
        ]}
      />
      </div>
    </Col>
    <Col xs={24} sm={24} md={18} lg={18} style={{marginBottom:'39px'}}>
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


<div style={{ 
  background:'#fff',
    width:'250px',
    border: '1px solid #ccc', 
    borderRadius: '8px', 
    padding: '16px', 
    marginBottom: '16px', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    textAlign: 'center'
  }}>
    <h3 style={{ marginBottom: '8px' }}>{e.name}</h3>
    <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>₹{e.price}</h4>
    <p style={{ marginBottom: '8px', fontSize: '14px',wordBreak:'break-word' }}>{e.description}</p>
    <div style={{ marginBottom: '8px' }}>
      
    <Tag color="geekblue">{e.tag}</Tag>
     
    </div>
    <Button type="primary"onClick={()=>{
    setSelFood([...selFood,e])
  }}>
         Add
        </Button>
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
   



   <div style={{ 
  background:'#fff',
    width:'250px',
    border: '1px solid #ccc', 
    borderRadius: '8px', 
    padding: '16px', 
    marginBottom: '16px', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    textAlign: 'center'
  }}>
    <h3 style={{ marginBottom: '8px' }}>{e.name}</h3>
    <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>₹{e.price}</h4>
    <p style={{ marginBottom: '8px', fontSize: '14px',wordBreak:'break-word' }}>{e.description}</p>
    <div style={{ marginBottom: '8px' }}>
      
    <Tag color="geekblue">{e.tag}</Tag>
     
    </div>
    <Button type="primary"  onClick={()=>{
    setSelFood([...selFood,e])
  }}>
         Add
        </Button>
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
   


   <div style={{ 
  background:'#fff',
    width:'250px',
    border: '1px solid #ccc', 
    borderRadius: '8px', 
    padding: '16px', 
    marginBottom: '16px', 
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    textAlign: 'center'
  }}>
    <h3 style={{ marginBottom: '8px' }}>{e.name}</h3>
    <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>₹{e.price}</h4>
    <p style={{ marginBottom: '8px', fontSize: '14px',wordBreak:'break-word' }}>{e.description}</p>
    <div style={{ marginBottom: '8px' }}>
      
    <Tag color="geekblue">{e.tag}</Tag>
     
    </div>
    <Button type="primary"  onClick={()=>{
    setSelFood([...selFood,e])
  }}>
         Add
        </Button>
  </div>

  </>)
}):'No Items...'}
</div>



      </div>
    </Col>
  </Row>
  <Button
  style={{position:'fixed',bottom:65,right:30,color:'white',background:'black'}}
          
          icon={<MenuUnfoldOutlined />}
          
          onClick={()=>{
            setT(!t)
          }}
          size={'large'}
        />
  {/* <button style={{position:'fixed',bottom:50,right:60}} >rrr</button> */}
  </div>
  </>
);}
export default App;