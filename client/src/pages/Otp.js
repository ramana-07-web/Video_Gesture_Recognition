import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from "../services/Apis";

const Otp = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    // 🔴 Validation
    if (otp === "") {
      toast.error("Enter Your OTP");
      return;
    }

    if (!/^\d+$/.test(otp)) {
      toast.error("OTP must be numeric");
      return;
    }

    if (otp.length !== 6) {
      toast.error("OTP must be exactly 6 digits");
      return;
    }

    const data = {
      otp,
      email: location.state
    };

    try {
      const response = await userVerify(data);

      // 🔴 Safety check
      if (!response) {
        toast.error("No response from server");
        return;
      }

      // ✅ Success
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Invalid OTP");
      }

    } catch (error) {
      console.error(error);

      // 🔴 Safe error handling
      toast.error(
        error?.response?.data?.error || "Something went wrong"
      );
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Please Enter Your OTP Here</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                name="otp"
                onChange={(e) => setOtp(e.target.value)}
                placeholder='Enter Your OTP'
              />
            </div>

            <button className='btn' onClick={LoginUser}>
              Submit
            </button>
          </form>
        </div>

        <ToastContainer />
      </section>
    </>
  );
};

export default Otp;