import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { TransactionContext } from "./TransactionListContext";
import { TransactionType } from "../../types";
import { dateFormats } from "../../types";
import useFetch from "../../hooks/useFetch";
import "../../styles/AddTransaction.css";

function AddTransaction() {
  const { setTransactions } = useContext(TransactionContext);
  const [text, setText] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<string>(
    moment().format(dateFormats.CALENDAR_INPUT)
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [fetchText, setFetchText] = useState<string>("");
  const { data, loading, error } = useFetch(fetchText);

  const upDownFunction = (step: 1 | -1) => {
    setDate((prev) =>
      moment(prev).add(step, "days").format(dateFormats.CALENDAR_INPUT)
    );
  };

  useEffect(() => {
    if (isSubmitted && !loading) {
      const newTransaction: TransactionType = {
        text,
        price,
        date: moment(date),
        tag: "Unpredicted",
      };

      if (error) {
        // TODO: handle error
        console.error(error);
      } else if (data) {
        newTransaction.tag = data.tag;
      }

      setText("");
      setPrice(1);
      setDate(moment().format(dateFormats.CALENDAR_INPUT));
      setIsSubmitted(false);
      setFetchText("");
      setTransactions((current) => [...current, newTransaction]);
    }
  }, [loading]);

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-success"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Add Transaction
        </button>
      </div>
      <div className="collapse" id="collapseExample">
        <form
          className="d-flex align-items-center responsive gap-3 w-100 mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            setFetchText(text);
            setIsSubmitted(true);
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Transaction's Description"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required={true}
              />
              <label>Transaction's Description</label>
            </div>
          </div>
          <div>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                min="1"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required={true}
              />
            </div>
          </div>
          <div className="input-group w-25">
            <button
              className="btn btn-sm btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                upDownFunction(1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                />
              </svg>
            </button>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) =>
                setDate(
                  moment(e.target.value).format(dateFormats.CALENDAR_INPUT)
                )
              }
              required={true}
            />
            <button
              className="btn btn-sm btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                upDownFunction(-1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                />
              </svg>
            </button>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            style={{ alignSelf: "center" }}
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            <span className="ms-2">
              {loading ? "Waiting for server's response" : "Add"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
