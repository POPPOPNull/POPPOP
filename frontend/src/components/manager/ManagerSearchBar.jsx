import "./ManagerSearchBar.css";

function ManagerSearchBar({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
  disabled = false,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !disabled) {
      console.log("검색 실행:", value);
    }
  };

  return (
    <div className="mgr-search-wrap">
      <div
        className={
          "mgr-searchbar-long" + (disabled ? " disabled" : "")
        }
      >
        <span className="mgr-searchbar-icon">
          <img src="/icons/search.png" alt="검색" />
        </span>

        <input
          type="text"
          placeholder={placeholder}
          className="mgr-searchbar-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default ManagerSearchBar;
