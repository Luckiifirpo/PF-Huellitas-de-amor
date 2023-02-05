
import api from "../../services/api"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import style from "./Stripe.module.css"
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const lang = useSelector((state) => state.lang.currentLangData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/gracias-por-tu-donacion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} c>
      <PaymentElement id="payment-element"  />
      <Button 
        variant="contained"
        sx={{marginTop:'20px'}}
        type="submit"
        disabled={isProcessing || !stripe || !elements} 
        id="submit">
        <span id="button-text">
          {isProcessing ? lang.stripe.buttons.procesando : lang.stripe.buttons.pagarAhora}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
// const stripePromise = loadStripe("pk_test_51MULkwKBABr3lcTZvSHSoRdHILFYBxb1C2UrCMOwTo769qTXwPIsssUoTbQ4PVkh18feBIgEHhtbipXWpKYQ1FEP00sTiqyplI");
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState("");
  const amount = useSelector(state => state.pets.amountDonation)
  const navigate = useNavigate()

  useEffect(() => {

    if (amount === 0 || amount === 1) {
      alert("Debe ingresar el monto primero en la pagina de donaciones")
      navigate("/donaciones")
      return
    }

    api.post("/payment", { amount }).then(async (result) => {
      var { clientSecret } = await result.data;
      setClientSecret(clientSecret);
    });
  }, []);

  const options = {
    clientSecret
  };

  return (
    <>
      <Container className={style.stripeContenedor} sx={{
        
         height:'400px',
         marginBottom:'100px',
         marginTop:'250px',
         display:'flex',
         placeContent:'center'
         }}>
        <div 
          style={{
            margin:'auto',
            minHeight:'35.7vh',
            background:'#fff',
            width:'70%',
            padding:'25px',
            borderRadius: '.45rem',
            webkitBoxShadow: '5px 5px 29px -12px rgba(0,0,0,0.52)',
            mozBoxShadow: '5px 5px 29px -12px rgba(0,0,0,0.52)',
            boxShadow:' 5px 5px 29px -12px rgba(0,0,0,0.52)'
          }}>
          {
            clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
              </Elements>
            )
          }
        </div>
      </Container>
    </>
  );
};