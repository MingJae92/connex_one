import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";

async function getServerTime() {
  const res = await fetch("http://localhost:3000/time", {
    headers: { authorization: "mysecrettoken" },
  });
  if (res.status !== 200) {
    throw new Error("Server Failure");
  }
  return res.json();
}

function TimeDifference() {
  const [clientTime, setClientTime] = useState(moment());
  useEffect(() => {
    setInterval(() => setClientTime(moment()), 1000);
  }, []);

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