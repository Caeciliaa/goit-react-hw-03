import css from "./Contact.module.css";
import { FaUser, FaPhone } from "react-icons/fa";

export default function Contact({ value: { id, name, number }, onDelete }) {
  return (
    <div className={css.container}>
      <div className={css.containerWrap}>
        <p className={css.title}>
          <FaUser className={css.iconPhone} />
          {name}
        </p>
        <p className={css.title}>
          <FaPhone className={css.iconUser} />
          {number}
        </p>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
