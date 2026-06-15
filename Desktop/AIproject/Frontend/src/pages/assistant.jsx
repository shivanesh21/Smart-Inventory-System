import Chatbot from "../components/chatbot/chatbot";

function Assistant() {
  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
          AI Assistant
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Ask about stock, sales, demand forecasts, and restocking decisions.
        </p>
      </div>
      <Chatbot />
    </section>
  );
}

export default Assistant;
