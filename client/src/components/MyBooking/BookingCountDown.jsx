import { useState, useEffect } from "react";
import "./MyBooking.css";

function BookingCountdown({ bookAt }) {
  const calculateRemainingHours = (bookAt) => {
    const currentTime = new Date();
    const bookAtTime = new Date(bookAt);
    const differenceInMilliseconds = bookAtTime - currentTime;
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
  };

  const [remainingHours, setRemainingHours] = useState(
    calculateRemainingHours(bookAt)
  );
  const [isWithinDeadline, setIsWithinDeadline] = useState(remainingHours >= 0);

  useEffect(() => {
    const interval = setInterval(() => {
      const hoursLeft = calculateRemainingHours(bookAt);
      setRemainingHours(hoursLeft);
      setIsWithinDeadline(hoursLeft >= 0);
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [bookAt]);

  return (
    <>
      {isWithinDeadline ? (
        <span className="text-booking booking-remaining">
          Khởi hành sau: {remainingHours}h.
        </span>
      ) : (
        <span className="text-booking booking-success">Đã khởi hành.</span>
      )}
    </>
  );
}

export default BookingCountdown;
