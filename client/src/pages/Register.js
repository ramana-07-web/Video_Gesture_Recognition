import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { registerfunction } from "../services/Apis";
import { useNavigate } from "react-router-dom";
import "../styles/mix.css";

const Register = () => {

  const [passshow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    number: "",
    password: ""
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  // Handle register
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fname, email, password, number } = inputdata;

    // 🔴 Validations
    if (fname === "") {
      toast.error("Enter Your Name");
      return;
    }

    if (email === "") {
      toast.error("Enter Your Email");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Enter Valid Email");
      return;
    }

    if (number === "") {
      toast.error("Enter Your Mobile Number");
      return;
    }

    if (password === "") {
      toast.error("Enter Your Password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await registerfunction(inputdata);

      // ✅ Success
      if (response.status === 200) {
        setInputdata({
          fname: "",
          email: "",
          number: "",
          password: ""
        });

        toast.success("Registration Successful");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }

    } catch (error) {
      console.error(error);

      // 🔴 Safe error handling
      toast.error(
        error?.response?.data?.error || "Registration failed"
      );
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project cloud to manage your tasks!
            </p>
          </div>

          <form>
            <div className="form_input">
              <label>Name</label>
              <input
                type="text"
                name="fname"
                value={inputdata.fname}
                onChange={handleChange}
                placeholder='Enter Your Name'
              />
            </div>

            <div className="form_input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={inputdata.email}
                onChange={handleChange}
                placeholder='Enter Your Email Address'
              />
            </div>

            <div className="form_input">
              <label>Mobile Number</label>
              <input
                type="number"
                name="number"
                value={inputdata.number}
                onChange={handleChange}
                placeholder='Enter Your Mobile Number'
              />
            </div>

            <div className="form_input">
              <label>Password</label>
              <div className='two'>
                <input
                  type={!passshow ? "password" : "text"}
                  name="password"
                  value={inputdata.password}
                  onChange={handleChange}
                  placeholder='Enter Your Password'
                />
                <div
                  className='Showpass'
                  onClick={() => setPassShow(!passshow)}
                >
                  {!passshow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className='btn' onClick={handleSubmit}>
              Sign Up
            </button>

            <p>Already have an account?</p>
          </form>
        </div>

        <ToastContainer />
      </section>
    </>
  );
};

export default Register;

// import React, { useState } from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import {registerfunction} from "../services/Apis";
// import {useNavigate} from "react-router-dom"
// import "../styles/mix.css"

// const Register = () => {

//   const [passshow,setPassShow] = useState(false);

//   const [inputdata,setInputdata] = useState({
//     fname:"",
//     email:"",
//     number:"",
//     password:""
//   });
  
//   const navigate = useNavigate();


//   //setinputvalue
//   const handleChange =(e)=>{
//     const {name,value} = e.target;
//     setInputdata({...inputdata,[name]:value})
//   }


//   //register data
//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     const {fname,email,password,number} = inputdata;

//     if(fname === ""){
//       toast.error("Enter Your Name")
//     }else if(email === ""){
//       toast.error("Enter Your Email")
//     }else if(!email.includes("@")){
//       toast.error("Enter Valid Email ")
//     }else if(number === ""){
//       toast.error("Enter Your Mobile number")
//     }else if(password === ""){
//       toast.error("Enter Your Password")
//     }else if(password.length < 6){
//       toast.error("password length minimum 6 character")
//     }else{
//       const response = await registerfunction(inputdata);
      
//       if(response.status === 200){
//         setInputdata({...inputdata,fname:"",email:"",password:"",number:""});
//         navigate("/")
//       }else{
//         toast.error(response.response.data.error);
//       }
//     }
//   }

  
//   return (
//     <>
//       <section>
//         <div className="form_data">
//           <div className="form_heading">
//             <h1>Sign Up</h1>
//             <p style={{textAlign:"center"}}> We are glad that you will be using Project cloud to manage
//                your tasks! We hope that you will get like it.</p>
//           </div>
//           <form>
//             <div className="form_input">
//               <label htmlFor="email">Name</label>
//               <input type="text" name="fname" id="fname" onChange={handleChange} placeholder='Enter Your Name' />
//             </div>
//             <div className="form_input">
//               <label htmlFor="email">Email</label>
//               <input type="email" name="email" id="email" onChange={handleChange} placeholder='Enter Your Email Address' />
//             </div>
//             <div className="form_input">
//               <label htmlFor="number">Mobile Number</label>
//               <input type="number" name="number" id="number" onChange={handleChange} placeholder='Enter Your mobile Address' />
//             </div>
//             <div className="form_input">
//               <label htmlFor="password">Password</label>
//               <div className='two'>
//               <input type={!passshow ? "password" : "text"}  name="password" id="password" onChange={handleChange} placeholder='Enter Your password' />
//               <div className='Showpass' onClick={()=>setPassShow (!passshow)}>
//               {!passshow ? "show" : "Hide"}

//               </div>
//               </div>
//             </div>
              
//             <button className='btn' onClick={handleSubmit}>Sign Up</button>
//             <p>Don't have an Account</p>
//           </form>
//         </div>
//         <ToastContainer />
//       </section>
//     </>
//   )
// }

// export default Register