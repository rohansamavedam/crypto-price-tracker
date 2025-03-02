import { useQuery } from "@tanstack/react-query";

const fetchCryptoPrices = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano,solana&vs_currencies=usd"
    );

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    
    return res.json();
  } catch (error) {
    throw new Error('Fetching crypto prices failed');
  }
};

export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    refetchOnWindowFocus: false,
  });
};
