import emailjs from "@emailjs/browser";
import { useState } from "react";
import { profile } from "../data";
import Reveal from "./Reveal";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const onChange = ({ target: { name, value } }) => setForm((f) => ({ ...f, [name]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: profile.name,
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="heading">Let's work together</h2>
          <p className="mt-4 max-w-md leading-relaxed">
            Have a project in mind or looking for a developer? Send a message and I'll get back to you.
          </p>
          <ul className="mt-6 space-y-2 font-medium">
            <li><a className="text-brand hover:underline dark:text-brand-light" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a className="text-brand hover:underline dark:text-brand-light" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a className="text-brand hover:underline dark:text-brand-light" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="card space-y-5">
            <label className="block text-sm font-medium text-slate-900 dark:text-white">
              Name
              <input className="field" type="text" name="name" required autoComplete="name" value={form.name} onChange={onChange} />
            </label>
            <label className="block text-sm font-medium text-slate-900 dark:text-white">
              Email
              <input className="field" type="email" name="email" required autoComplete="email" value={form.email} onChange={onChange} />
            </label>
            <label className="block text-sm font-medium text-slate-900 dark:text-white">
              Message
              <textarea className="field" name="message" rows="5" required value={form.message} onChange={onChange} />
            </label>
            <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto">
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
              {status === "success" && <span className="text-emerald-600 dark:text-emerald-400">Thanks! Your message was sent.</span>}
              {status === "error" && (
                <span className="text-red-600 dark:text-red-400">
                  Something went wrong. Please email me directly at {profile.email}.
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
