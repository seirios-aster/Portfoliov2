import emailjs from "@emailjs/browser";
import { useState } from "react";

import { profile } from "../constants";
import { ArrowUpRight, Check, Copy, Download, GitHub, LinkedIn, Mail } from "./Icons";
import { Reveal } from "./Reveal";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

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
          to_name: profile.firstName,
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id='contact' className='section' aria-labelledby='contact-title'>
      <div className='container-page grid gap-12 lg:grid-cols-2 lg:gap-16'>
        <div>
          <Reveal>
            <p className='eyebrow'>
              <span className='text-white/40'>05</span>
              <span className='mx-3 inline-block h-px w-10 bg-white/25 align-middle' />
              Contact
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id='contact-title' className='font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white'>
              Let's build <br />
              <span className='text-gradient'>something</span> together.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className='mt-6 max-w-md text-lg leading-relaxed text-white/60'>
              Have a role, a project or just a question? Send a message and I'll get back to you.
            </p>
          </Reveal>

          <Reveal delay={0.24} className='mt-10 space-y-3'>
            <div className='card flex items-center gap-4 !p-4'>
              <span className='grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white'>
                <Mail />
              </span>
              <a href={`mailto:${profile.email}`} className='min-w-0 flex-1 truncate font-medium text-white hover:text-cyan-200'>
                {profile.email}
              </a>
              <button type='button' onClick={copyEmail} className='icon-btn shrink-0' aria-label={copied ? "Email copied" : "Copy email address"}>
                {copied ? <Check /> : <Copy />}
              </button>
            </div>
            <div className='flex flex-wrap gap-3'>
              <a href={profile.linkedin} target='_blank' rel='noopener noreferrer' className='btn-ghost'>
                <LinkedIn width={18} height={18} /> LinkedIn
              </a>
              <a href={profile.github} target='_blank' rel='noopener noreferrer' className='btn-ghost'>
                <GitHub width={18} height={18} /> GitHub
              </a>
              <a href={profile.cv} download className='btn-ghost'>
                <Download width={18} height={18} /> CV
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <form onSubmit={onSubmit} className='card space-y-5 !p-6 sm:!p-8'>
            <label className='block'>
              <span className='label'>Name</span>
              <input className='field' type='text' name='name' required autoComplete='name' placeholder='Your name' value={form.name} onChange={onChange} />
            </label>
            <label className='block'>
              <span className='label'>Email</span>
              <input className='field' type='email' name='email' required autoComplete='email' placeholder='you@company.com' value={form.email} onChange={onChange} />
            </label>
            <label className='block'>
              <span className='label'>Message</span>
              <textarea className='field min-h-[150px] resize-y' name='message' required rows={5} placeholder='Tell me about the role or project…' value={form.message} onChange={onChange} />
            </label>
            <button type='submit' disabled={status === "sending"} className='btn-primary w-full justify-center disabled:opacity-60'>
              {status === "sending" ? "Sending…" : "Send message"} <ArrowUpRight width={18} height={18} />
            </button>
            <p role='status' aria-live='polite' className='min-h-[1.5rem] text-sm'>
              {status === "sent" && <span className='text-emerald-300'>Thanks! Your message was sent.</span>}
              {status === "error" && <span className='text-rose-300'>Something went wrong. Please email me directly at {profile.email}.</span>}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
