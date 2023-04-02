import { useContext, CSSProperties } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { TagColors } from "../Transaction";
import { Tag } from "../../types";
import { TransactionContext } from "./TransactionListContext";

function TransactionListSearchBar() {
  const { theme } = useContext(GlobalContext);
  const { activeFilters, setActiveFilters, setQuery } =
    useContext(TransactionContext);

  const addTag = (tag: Tag) =>
    !activeFilters.includes(tag as Tag) &&
    setActiveFilters((current) => [...current, tag]);

  return (
    <>
      <div className="d-flex align-items-center gap-5">
        <div className="d-flex gap-1 w-100">
          <div className="form-floating" style={{ flexGrow: 1 }}>
            <input
              type="text"
              className="form-control"
              id="floatingQuery"
              placeholder="Password"
              onChange={(e) => setQuery(e.target.value)}
            />
            <label htmlFor="floatingQuery">Search transactions...</label>
          </div>
          <div className="dropdown align-self-center">
            <button
              className={`btn btn-${theme}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-filter"
                viewBox="0 0 16 16"
              >
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
            <ul className="dropdown-menu">
              {Object.entries(TagColors).map(([tag, color]) => (
                <li>
                  <button
                    key={tag}
                    className="dropdown-item btn"
                    style={
                      {
                        "--bs-btn-active-bg": color,
                      } as CSSProperties
                    }
                    onClick={() => addTag(tag as Tag)}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {activeFilters.length > 0 && (
        <div className="d-flex align-items-center gap-2 mt-3 flex-wrap">
          <span>Tags:</span>
          {activeFilters.map((tag, i) => (
            <button
              key={i}
              className="btn badge"
              style={
                {
                  background: TagColors[tag],
                } as CSSProperties
              }
              onClick={() =>
                setActiveFilters((current) => current.filter((t) => t !== tag))
              }
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default TransactionListSearchBar;
