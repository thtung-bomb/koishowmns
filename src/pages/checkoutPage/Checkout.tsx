import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Cung cấp public key từ Stripe
const stripePromise = loadStripe('your-publishable-key-from-stripe');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentLoading, setPaymentLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPaymentLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Gửi yêu cầu tạo PaymentIntent đến backend
        const { data: clientSecret } = await axios.post('https://your-backend-endpoint/api/create-payment-intent', {
            amount: 5000, // Giá trị thanh toán (5000 tương ứng với 50.00 USD)
        });

        // Xử lý thanh toán bằng Stripe
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        setPaymentLoading(false);

        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment successful!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || paymentLoading}>
                {paymentLoading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

const StripePayment = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default StripePayment;
