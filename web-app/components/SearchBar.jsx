const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Filter cryptocurrencies..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="p-2 border rounded w-full"
  />
);

export default SearchBar;
