"use client";

import type { FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/links";
import { buttonClass } from "./ui";

const labelClass = "flex flex-col gap-2 text-caption text-white lg:text-small";
const fieldClass =
  "w-full rounded bg-field px-3 text-small text-white outline-none placeholder:text-[#b0b0b0] focus:ring-1 focus:ring-white/40 lg:rounded-lg lg:text-body lg:font-medium";

// No backend yet: submitting opens the visitor's mail client with the message pre-filled.
export default function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[800px] flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-4">
        <label className={labelClass}>
          Name
          <input name="name" required autoComplete="name" placeholder="Enter your full name" className={`${fieldClass} h-12`} />
        </label>
        <label className={labelClass}>
          Email Address
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email address"
            className={`${fieldClass} h-12`}
          />
        </label>
      </div>
      <label className={labelClass}>
        Message
        <textarea
          name="message"
          required
          placeholder="Tell us about your new idea"
          className={`${fieldClass} h-[117px] resize-none py-3 lg:h-[130px]`}
        />
      </label>
      <button type="submit" className={`${buttonClass("send")} self-end lg:w-[122px]`}>
        Send
      </button>
    </form>
  );
}
