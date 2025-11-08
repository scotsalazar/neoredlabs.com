import React from 'react';

/**
 * Section highlighting Neo Labs' integration of artificial intelligence
 * across products.  Includes a descriptive paragraph and a simple code
 * snippet to illustrate how a hypothetical AI workflow might be
 * structured in code.  The code block is wrapped in a light card with
 * overflow handling for smaller screens.
 */
const AIIntegration = () => (
  <section className="bg-white py-16" id="ai">
    <div className="section-container">
      <h2 className="section-title text-center">Intelligent Apps Powered by AI Models</h2>
      <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-700">
        We integrate large language models, automation agents and predictive analytics into bespoke applications.
        Accelerate workflows, gain insights and deliver smarter experiences through our AI‑first approach.
      </p>
      <div className="mt-10 overflow-auto rounded-xl bg-light p-6 shadow-inner">
        <pre className="whitespace-pre-wrap text-sm md:text-base text-slate-700">
{`// Example of AI workflow integration
import { Agent, LLM } from 'neo-ai-kit';

const llm = new LLM({ model: 'gpt-4', temperature: 0.2 });

const agent = new Agent({
  tasks: [
    { name: 'classifyIntent', model: llm },
    { name: 'fetchData', model: llm },
    { name: 'generateResponse', model: llm }
  ]
});

export async function handleMessage(input) {
  const result = await agent.run(input);
  return result.response;
}
`}
        </pre>
      </div>
    </div>
  </section>
);

export default AIIntegration;