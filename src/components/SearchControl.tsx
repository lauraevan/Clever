import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "../lib/icons";
import { TopBarButton } from "./TopBarButton";
import { searchPortal, type SearchResult } from "../lib/search";
import "./SearchControl.css";
import { assetUrl } from "../lib/assetUrl";

interface Props {
  onOpenResult: (result: SearchResult) => void;
}

/**
 * Search lives in the blue bar: the control is a TopBarButton until it is
 * activated, at which point it becomes an inline field in the bar with a
 * results list hanging beneath it. Results cover applications, links, Teacher
 * Pages and the resources inside them.
 */
export function SearchControl({ onOpenResult }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = useMemo(() => searchPortal(query), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  function choose(result: SearchResult) {
    onOpenResult(result);
    close();
  }

  if (!open) {
    return (
      <TopBarButton onClick={() => setOpen(true)} aria-label="Search">
        <span className="search-control__trigger-inner">
          <SearchIcon size="1rem" />
          <span className="search-control__trigger-label">Search</span>
        </span>
      </TopBarButton>
    );
  }

  return (
    <div className="search-control" ref={containerRef}>
      <div className="search-control__field">
        <SearchIcon size="0.875rem" className="search-control__field-icon" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          className="search-control__input"
          placeholder="Search apps, links, and Teacher Pages"
          aria-label="Search apps, links, and Teacher Pages"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            results.length > 0 ? `${listId}-option-${activeIndex}` : undefined
          }
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              close();
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((index) =>
                results.length ? (index - 1 + results.length) % results.length : 0,
              );
            } else if (event.key === "Enter" && results[activeIndex]) {
              event.preventDefault();
              choose(results[activeIndex]);
            }
          }}
        />
        <button
          type="button"
          className="button-reset search-control__clear"
          aria-label="Close search"
          onClick={close}
        >
          <CloseIcon size="0.875rem" />
        </button>
      </div>

      {query.trim() ? (
        <div className="search-control__results">
          {results.length === 0 ? (
            <p className="search-control__empty">
              No results for &ldquo;{query.trim()}&rdquo;
            </p>
          ) : (
            <ul className="list-reset" role="listbox" id={listId} aria-label="Search results">
              {results.map((result, index) => (
                <li key={result.id}>
                  <button
                    type="button"
                    id={`${listId}-option-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    className={[
                      "button-reset",
                      "search-control__result",
                      index === activeIndex ? "search-control__result--active" : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => choose(result)}
                  >
                    {result.icon ? (
                      <img className="search-control__result-icon" src={assetUrl(result.icon)} alt="" />
                    ) : (
                      <span
                        className="search-control__result-icon search-control__result-monogram"
                        style={{ backgroundColor: result.color ?? "var(--neutral-gray)" }}
                        aria-hidden="true"
                      >
                        {result.initials ?? result.title.charAt(0)}
                      </span>
                    )}
                    <span className="search-control__result-text">
                      <span className="search-control__result-title">{result.title}</span>
                      <span className="search-control__result-context">{result.context}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
