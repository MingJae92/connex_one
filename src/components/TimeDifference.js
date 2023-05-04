import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";

// Fetching the server time from the prometheus time end point API
async function getServerTime() {
  const res = await fetch("http://localhost:3000/time", {
    headers: { authorization: "mysecrettoken" },
  });
  //Error handler to return the server status
  if (res.status !== 200) {
    throw new Error("Server Failure");
  }
  return res.json();
}


function TimeDifference() {
  //Moment library is used to show live updates of server time. 
  const [clientTime, setClientTime] = useState(moment());
  useEffect(() => {
    setInterval(() => setClientTime(moment()), 1000);
  }, []);
//Using useQuery hook to access the server time 
  const { isLoading, data } = useQuery({
    queryKey: ["serverTime"],
    queryFn: getServerTime,
    onSuccess: () => setClientTime(moment()),
    refetchInterval: 30000,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const { epoch: serverTimeSeconds } = data;
  const timeDifference = moment.utc(
    clientTime.diff(moment.unix(serverTimeSeconds))
  );

  const formattedTime = timeDifference.format("HH:mm:ss");

  return (
    <div>
      <p>
        <b>Server Time</b>: {serverTimeSeconds}
      </p>
      <p>
        <b>Time Difference</b>: {formattedTime}
      </p>
    </div>
  );
}

export default TimeDifference