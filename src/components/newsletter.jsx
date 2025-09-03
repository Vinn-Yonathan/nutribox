import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="bg-primary p-5 flex flex-col items-center md:items-start justify-center space-y-3 text-center md:text-start">
      <h3 className="text-4xl font-bold">Subscribe to Our Newsletter</h3>
      <p className="text-sm md:w-1/2 xl:w-1/3" id="newsletter-desc">
        Subscribe with your email to get exclusive offers, healthy living tips,
        and the latest news.
      </p>
      <form className="flex md:w-1/2" onSubmit={handleSubmit}>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          aria-describedby="newsletter-desc"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleChange}
          className="bg-white w-full rounded-l-2xl text-sm resize-none p-[.8em] border-2 border-text-muted focus:outline-none focus:inset-shadow-text-muted focus:shadow-md"
          required
        ></input>
        <button
          type="submit"
          aria-label="Subscribe newsletter"
          className="bg-white rounded-r-2xl p-[.5em] border-y-2 border-r-2 border-text-muted"
        >
          <SendHorizontal size={20} className="text-text-muted" />
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
