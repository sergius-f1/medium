import React from "react";
import { Spinner } from "../spinner/Spinner";
import "./QueryState.css";

interface QueryStateProps {
  isLoading: boolean;
  isEmpty?: boolean | null;
  isError?: boolean | null;
  errorMessage?: string | null;
  emptyDataMessage?: string | null;
  children: React.ReactNode;
}

/**
 * A small React component to display a loading spinner,
 * an error message or empty message when the query is empty or failed.
 * @param isLoading - indicates whether the query is loading or not
 * @param isError - indicates whether the query is failed or not
 * @param isEmpty - indicates whether the data is empty or not
 * @param children - children component to render
 * @param errorMessage - custom user-friendly error message
 * @param emptyDataMessage - custom user-friendly empty message
 * @constructor
 */
export function QueryState({
  isLoading,
  isEmpty,
  isError,
  children,
  errorMessage,
  emptyDataMessage,
}: QueryStateProps): React.ReactElement {
  if (isLoading) {
    return (
      <div className="query-state-loading">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div className="query-state-msg__error">{errorMessage || "Something went wrong"}</div>;
  }

  if (isEmpty) {
    return <div className="query-state-msg__info">{emptyDataMessage || "Empty data"} </div>;
  }

  return <>{children}</>;
}
