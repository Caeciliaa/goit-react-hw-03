import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";
import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must be in the format XXX-XX-XX")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

export default function ContactForm({ onAdd }) {
  const id = nanoid();

  const handleSubmit = (values, actions) => {
    onAdd({
      id: id,
      name: values.name,
      number: values.number,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        {}
        <label className={css.title} htmlFor={`${id}-name`}>
          Name
          <Field name="name" className={css.input} type="text" />
          <ErrorMessage className={css.error} name="name" component="span" />
        </label>

        {}
        <label className={css.title} htmlFor={`${id}-number`}>
          Number
          <Field name="number" className={css.input} type="text" />
          <ErrorMessage className={css.error} name="number" component="span" />
        </label>

        {}
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
