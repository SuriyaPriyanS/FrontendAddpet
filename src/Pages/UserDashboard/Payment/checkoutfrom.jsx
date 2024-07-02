// CheckoutForm.jsx

import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent, savePayment, fetchPayments } from '../../../redux/Slice/PaymentSlice'; // Adjust the path as needed



const CheckoutForm = () => {
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const clientSecret = useSelector(state => state.payments.clientSecret);
  const transactionId = useSelector(state => state.payments.transactionId);

  useEffect(() => {
    axios.get(`/donations/${id}`)
      .then(response => {
        setDonation(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching donation:", error);
        setLoading(false);
      });
  }, [ id]);

  const [values, setValues] = useState({
    donationAmount: 0,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (donation) {
      dispatch(createPaymentIntent({
        donationAmount: values.donationAmount,
        image: donation.image,
        name: donation.shortdesp,
        ownerEmail: donation.userEmail
      }));
    }
  }, [dispatch, values.donationAmount, donation]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('Payment error:', error);
      setError(error.message);
    } else {
      console.log('Payment method:', paymentMethod);
      setError('');
    }

    if (clientSecret) {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        }
      });

      if (confirmError) {
        console.error('Confirm error:', confirmError);
      } else {
        console.log('Payment intent:', paymentIntent);
        if (paymentIntent.status === 'succeeded') {
          const payment = {
            email: user.email,
            image: donation.image,
            name: donation.name,
            donationId: donation._id,
            donationAmount: values.donationAmount,
            transactionId: paymentIntent.id,
            ownerEmail: donation.userEmail,
            max_donation_limit: donation.max_donation_limit,
            date: new Date(),
            status: 'pending'
          };

          dispatch(savePayment(payment)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Thank you for your donation!',
                showConfirmButton: false,
                timer: 1500
              });
              // Redirect user or perform additional actions after successful payment
            } else {
              console.error('Error saving payment:', res.payload);
            }
          });
        }
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!donation || donation.pause) {
    return <p>Donations are currently unavailable.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <div className="form-group">
              <label htmlFor="donationAmount">Donation Amount</label>
              <input
                type="number"
                name="donationAmount"
                id="donationAmount"
                placeholder="Enter Donation Amount"
                value={values.donationAmount}
                onChange={handleChange}
                min="1"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Card Details</label>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
            <button className="btn btn-primary btn-block mt-3" type="submit" disabled={!stripe || !clientSecret || donation.pause}>
              Pay
            </button>
            <p className="text-danger mt-2">{error}</p>
            {transactionId && <p className="text-success mt-2">Your transaction ID: {transactionId}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
