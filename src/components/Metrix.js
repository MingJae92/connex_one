import { useQuery } from "@tanstack/react-query";

async function getMetrics() {
  const res = await fetch("http://localhost:3000/metrics", {
    headers: { authorization: "mysecrettoken" },
  });
  if (res.status !== 200) {
    throw new Error("Server Failure");
  }
  return res.text();
}

function Metrix() {
  const { isLoading, data } = useQuery({
    queryKey: ["metrics"],
    queryFn: getMetrics,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <pre>{data}</pre>
    </div>
  );
}

export default Metrix