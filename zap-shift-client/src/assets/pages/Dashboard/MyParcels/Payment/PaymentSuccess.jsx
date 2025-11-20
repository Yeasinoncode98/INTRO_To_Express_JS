import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  // console.log(sessionId);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-4xl">Payment Sucessfull</h2>
      <p>Your Transaction id is : {paymentInfo.transactionId}</p>
      <p>Your Parcel Tracking id is : {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
