//const generateToken = ()=> Math.random().toString(32).substring(3) +Date.now().toString(32)+Math.random().toString(32).substring(3);

const generateToken = () =>`TK-${new Date().getDate()}-${Math.random().toString(32).substring(3, 11)}-${new Date().getSeconds()}
-NAHV-RS-${new Date().getFullYear()}`;


export  {generateToken}