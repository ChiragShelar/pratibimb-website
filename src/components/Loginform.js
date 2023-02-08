import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, collection, getDoc, setDoc } from "firebase/firestore";
import { auth, provider, fire } from "../firebaseConfig";
import "../sass/loginform.css";
import HeroCommon from "./HeroCommon";
import { TextField } from "@mui/material";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorLoggingIn, setErrorLoggingIn] = useState(false);
  const [status, setStatus] = useState();
  const [showCC, setShowCC] = useState(false);
  const user1 = localStorage.getItem("user");

  const handleCC = async (user) => {
    if (user) {
      const docRef = doc(fire, "Email_Map", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        navigate("/events");
      } else {
        setShowCC(true);
      }
    }
  };

  useEffect(() => {
    if (user1) {
      handleCC(JSON.parse(user1));
    }
  }, [navigate]);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        localStorage.setItem("credential", JSON.stringify(credential));
        localStorage.setItem("user", JSON.stringify(user));
        handleCC(user);
      })
      .catch((err) => {
        setErrorLoggingIn(true);
      });
  };

  const verifyAndRegisterCC = async (e) => {
    e.preventDefault();
    if (status === "NCP") {
      const docRef = collection(fire, "Email_Map");
      const email = JSON.parse(localStorage.getItem("user")).email;
      await setDoc(doc(docRef, email), {
        id: "-1",
      });
      navigate("/events");
    } else if (
      status.slice(0, 2) === "CC" &&
      status.slice(2).match("[0-9]{2}")
    ) {
      const ccId = status.slice(2);
      const docRef = doc(fire, "CC_Map", ccId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      if (docSnap.data()) {
        alert("This College Code has already registered. Login found invalid");
        navigate("/signout");
      } else {
        const docRef = collection(fire, "CC_Map");
        const email = JSON.parse(localStorage.getItem("user")).email;
        await setDoc(doc(docRef, status.slice(2)), {
          email,
        });
        const docRef1 = collection(fire, "Email_Map");
        await setDoc(doc(docRef1, email), {
          id: status.slice(2),
        });
        navigate("/events");
      }
    } else {
      alert("Incorrect status given as input, please try again");
    }
  };

  return !errorLoggingIn ? (
    <div>
      <HeroCommon
        imgClass="hero-events"
        title="Event Registration"
        subtitle="Login using your Gmail"
      ></HeroCommon>
      <div style={{ background: "black" }}>
        <div className="illuminati-theme">
          {!showCC ? (
            <center>
              <button onClick={signIn} className="custom-btn btn-15">
                Login Here
              </button>
            </center>
          ) : (
            <center className="vjti">
              <h2 data-aos="fade-up">Enter your participation type</h2>
              <p data-aos="fade-up">
                <b>CC</b> - College Contingent (Mention along with code -
                Example CC71)
              </p>
              <p data-aos="fade-up">
                <b>NCP</b> - Non Contingent Participant
              </p>
              <br />
              <div>
                <form>
                  <TextField
                    id="outlined-basic"
                    label="Participation Status"
                    variant="outlined"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                  <br />
                  <button
                    onClick={verifyAndRegisterCC}
                    className="custom-btn btn-15"
                    style={{ marginTop: "2rem" }}
                  >
                    Register participation status
                  </button>
                </form>
              </div>
            </center>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <HeroCommon
        imgClass="hero-events"
        title="Event Registration"
        subtitle="An Error occured while registering. Please try again!"
      ></HeroCommon>
      <div style={{ background: "black" }}>
        <div className="illuminati-theme">
          <center>
            <button onClick={signIn} className="custom-btn btn-15">
              Login Here
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
