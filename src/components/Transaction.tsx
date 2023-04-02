import { MouseEventHandler } from "react";
import { Moment } from "moment";
import { dateFormats } from "../types";
import { Tag } from "../types";

export const TagColors = {
  Charity: "var(--bs-primary)",
  Clothing: "var(--bs-info)",
  Commuting: "var(--bs-indigo)",
  Education: "var(--bs-success)",
  Entertainment: "var(--bs-purple)",
  Food: "var(--bs-orange)",
  Health: "var(--bs-danger)",
  Housing: "var(--bs-teal)",
  Financial: "var(--bs-green)",
  Investment: "var(--bs-warning)",
  Present: "var(--bs-pink)",
  Vehicle: "var(--bs-cyan)",
  Unpredicted: "var(--bs-secondary)",
};

function TransactionComponent({
  text,
  tag,
  date,
  price,
  tagOnClick,
}: TransactionProps) {
  return (
    <div className="d-flex gap-3 justify-content-between align-items-start">
      <p>{text}</p>
      <button
        onClick={tagOnClick}
        className="btn badge"
        style={{ background: TagColors[tag] }}
      >
        {tag}
      </button>
      <p>{date.format(dateFormats.TRANSACTION)}</p>
      <p>{`${price}$`}</p>
    </div>
  );
}

interface TransactionProps {
  text: string;
  tag: Tag;
  date: Moment;
  price: number;
  tagOnClick: MouseEventHandler<HTMLButtonElement>;
}

export default TransactionComponent;
