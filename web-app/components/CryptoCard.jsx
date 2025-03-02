const CryptoCard = ({ id, price }) => (
  <div className="p-4 border rounded">
    <h2 className="text-xl font-bold mb-2">{id.toUpperCase()}</h2>
    <p className="text-lg">${price.toLocaleString()}</p>
  </div>
);

export default CryptoCard;
