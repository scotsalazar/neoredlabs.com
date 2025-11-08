import React from 'react';
import Layout from '../components/Layout.jsx';
import careersHero from '../assets/images/careers.png';

const jobOpenings = [
  {
    title: 'Software Engineer',
    description:
      "Join Neo\u00a0Redlabs\u2019 Neo\u00a0Tech engineering guild and help us build resilient, scalable products that power bold digital experiences. You\u2019ll collaborate with designers, data scientists, and product strategists to bring future-ready solutions to market.",
    applyLink: 'https://forms.gle/9xSWz6Ym9Hnt1SxC8',
    sections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Design, build, and maintain modern web services and intuitive front-end interfaces for Neo\u00a0Tech platforms.',
          'Ship high-quality code through test-driven development, peer reviews, and iterative releases.',
          'Collaborate with cross-functional squads to translate product vision into technical roadmaps.',
          'Monitor performance, automate deployments, and champion observability across our stack.',
          'Contribute to engineering standards and mentor teammates through knowledge-sharing rituals.'
        ]
      },
      {
        heading: 'Required Qualifications',
        items: [
          'Bachelor’s degree in Computer Science, Engineering, or equivalent practical experience.',
          '3+ years building production-ready applications with JavaScript/TypeScript and Node.js frameworks.',
          'Hands-on experience with cloud-native architectures (AWS, GCP, or Azure) and CI/CD pipelines.',
          'Strong grounding in data structures, system design, and secure coding practices.'
        ]
      },
      {
        heading: 'Preferred Skills',
        items: [
          'Exposure to AI-assisted development, experimentation platforms, or edge computing.',
          'Familiarity with design systems and component-driven development.',
          'Background contributing to open-source or internal developer platforms.'
        ]
      },
      {
        heading: 'Culture & Benefits',
        items: [
          'Access to the Neo\u00a0Tech Lab for rapid prototyping, continuous learning, and community events.',
          'Wellness stipend, comprehensive healthcare, and flexible paid time off.',
          'Quarterly hack weeks and learning credits to fuel your curiosity.'
        ]
      },
      {
        heading: 'Location & Work Setup',
        type: 'paragraph',
        content:
          'Hybrid within Metro Manila or fully remote across the Philippines, with optional on-site collaboration days at our Neo\u00a0Redlabs Experience Center.'
      }
    ]
  },
  {
    title: 'Marketing Assistant',
    description:
      'Help amplify the Neo\u00a0Tech story by orchestrating campaigns that celebrate innovation and our client wins. As Marketing Assistant, you’ll keep our brand pulse strong across digital channels and immersive Neo\u00a0Redlabs experiences.',
    applyLink: 'https://forms.gle/4X5FgkF5JpU9oFrr7',
    sections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Coordinate multi-channel campaigns, events, and launches in partnership with the Growth and Design teams.',
          'Develop on-brand content for social media, newsletters, and sales enablement materials.',
          'Track campaign performance, prepare reports, and surface insights that inform future experiments.',
          'Maintain our marketing asset library and ensure consistent Neo\u00a0Tech voice across touchpoints.',
          'Support community-building initiatives, including webinars and partner spotlights.'
        ]
      },
      {
        heading: 'Required Qualifications',
        items: [
          'Bachelor’s degree in Marketing, Communications, or related field.',
          '1–2 years of experience in digital marketing coordination or content production.',
          'Proficiency with marketing automation tools, social scheduling platforms, and analytics dashboards.',
          'Exceptional organizational skills and attention to detail.'
        ]
      },
      {
        heading: 'Preferred Skills',
        items: [
          'Graphic design fundamentals using Figma, Canva, or Adobe Creative Cloud.',
          'Experience supporting B2B tech or innovation-focused brands.',
          'Comfort hosting livestreams or producing short-form video content.'
        ]
      },
      {
        heading: 'Culture & Benefits',
        items: [
          'Immersive onboarding with the Neo\u00a0Redlabs Brand Studio and access to mentorship circles.',
          'Performance bonuses tied to campaign impact and brand growth.',
          'Wellness programs, remote work allowance, and inclusive team rituals.'
        ]
      },
      {
        heading: 'Location & Work Setup',
        type: 'paragraph',
        content:
          'Hybrid schedule anchored in our Bonifacio Global City hub, with remote flexibility for campaign planning and content creation.'
      }
    ]
  },
  {
    title: 'Sales Executive',
    description:
      'Drive growth for Neo\u00a0Tech solutions by cultivating relationships with forward-thinking enterprises. You’ll translate complex innovation programs into clear value propositions that help clients reimagine what’s possible.',
    applyLink: 'https://forms.gle/WA5uH1XJyitvJFKC6',
    sections: [
      {
        heading: 'Key Responsibilities',
        items: [
          'Prospect, qualify, and nurture leads within priority industries across Southeast Asia.',
          'Develop tailored proposals and demos in partnership with Product, Delivery, and Marketing teams.',
          'Negotiate contracts, manage pipelines, and forecast revenue using our CRM.',
          'Represent Neo\u00a0Redlabs at industry events, webinars, and Neo\u00a0Tech showcases.',
          'Gather client feedback to inform roadmap priorities and customer success playbooks.'
        ]
      },
      {
        heading: 'Required Qualifications',
        items: [
          'Bachelor’s degree in Business, Marketing, or a related discipline.',
          '4+ years of consultative sales experience in technology, SaaS, or innovation services.',
          'Proven track record of exceeding revenue targets and managing complex sales cycles.',
          'Exceptional communication, presentation, and stakeholder management skills.'
        ]
      },
      {
        heading: 'Preferred Skills',
        items: [
          'Familiarity with enterprise innovation programs, digital transformation, or product discovery engagements.',
          'Experience selling into multinational accounts across APAC.',
          'Comfortable using HubSpot CRM, sales enablement tools, and revenue intelligence platforms.'
        ]
      },
      {
        heading: 'Culture & Benefits',
        items: [
          'Competitive base salary with uncapped commissions and recognition for strategic wins.',
          'Leadership coaching, career acceleration pathways, and access to the Neo\u00a0Tech partner network.',
          'Team offsites, wellness perks, and inclusive celebrations of our collective success.'
        ]
      },
      {
        heading: 'Location & Work Setup',
        type: 'paragraph',
        content:
          'Hybrid role with travel across Metro Manila and key client sites in the region; remote flexibility for prospecting and account management.'
      }
    ]
  }
];

const CareersPage = () => (
  <Layout
    title="Careers | Neo Redlabs"
    description="Neo Redlabs is hiring Software Engineer, Marketing Assistant, and Sales Executive roles to build digital products, amplify our brand, and grow strategic partnerships."
    image={careersHero}
  >
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
      <img
        src={careersHero}
        alt="Team members collaborating in a modern office"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-dark/70" aria-hidden="true" />
      <div className="relative z-10 section-container max-w-3xl py-20 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Careers at Neo Redlabs</h1>
        <p className="mt-4 text-lg md:text-xl">Join a collaborative and innovative culture.</p>
      </div>
    </section>

    <section id="open-positions" className="bg-light py-16">
      <div className="section-container">
        <h2 className="section-title">Open Positions</h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {jobOpenings.map((job) => (
            <article
              key={job.title}
              className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-lg shadow-slate-900/5"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-dark">{job.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{job.description}</p>
                {job.sections.map((section) => (
                  <div key={`${job.title}-${section.heading}`} className="mt-6">
                    <h4 className="text-lg font-semibold text-primary">{section.heading}</h4>
                    {section.type === 'paragraph' ? (
                      <p className="mt-3 text-base leading-relaxed text-slate-700">{section.content}</p>
                    ) : (
                      <ul className="mt-3 list-disc space-y-3 pl-5 text-base leading-relaxed text-slate-700">
                        {section.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 justify-center"
              >
                Apply Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default CareersPage;
