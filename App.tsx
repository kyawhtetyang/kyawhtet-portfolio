
import React, { useEffect, useMemo, useState } from 'react';
import { Category, AppInfo } from './types';
import { PROJECT_FILTERS, ProjectFilter, getProjectFilterType } from './projectType';
import { APPS } from './constants';
import { AppStoreListItem } from './components/AppStoreListItem';
import { AppDetailModal } from './components/AppDetailModal';
import profilePhoto from './docs/01_AIML_Portfolio.png';


const SidebarItem: React.FC<{ 
  category: Category; 
  active: boolean; 
  onClick: (cat: Category) => void;
  icon: React.ReactNode;
}> = ({ category, active, onClick, icon }) => (
  <button 
    onClick={() => onClick(category)}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
      active 
        ? 'bg-black/5' 
        : 'text-gray-500 hover:bg-black/5'
    }`}
  >
    <span className={`${active ? 'text-[#fa233b]' : 'text-gray-400'}`}>
      {icon}
    
    </span>
    <span className={`text-sm font-semibold ${active ? 'text-[#fa233b]' : 'text-inherit'}`}>{category}</span>
  </button>
);

const App: React.FC = () => {
  const privateStoreApps = useMemo(() => {
    const privateStoreLocalModules = import.meta.glob<{ PRIVATE_STORE_APPS?: AppInfo[] }>('./privateStore.local.ts', { eager: true });
    const localPrivateStoreApps = Object.values(privateStoreLocalModules).flatMap((mod) => mod.PRIVATE_STORE_APPS ?? []);
    return localPrivateStoreApps.length > 0 ? localPrivateStoreApps : [];
  }, []);
  const privateStoreEnabled = (import.meta.env.VITE_ENABLE_PRIVATE_STORE as string | undefined)?.trim().toLowerCase() === 'true';
  const blogEnabled = (import.meta.env.VITE_ENABLE_BLOG as string | undefined)?.trim().toLowerCase() === 'true';
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Discover);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<ProjectFilter>('Featured');
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);
  const [selectedBlogDraft, setSelectedBlogDraft] = useState<{
    title: string;
    status: string;
    summary: string;
    updated: string;
    content?: string;
  } | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactProjectType, setContactProjectType] = useState('AI/ML');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitState, setContactSubmitState] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });
  const isDark = theme === 'dark';
  const isDiscoverPage = selectedCategory === Category.Discover;
  const isChatPage = selectedCategory === Category.Chat;
  const isProjectsPage = selectedCategory === Category.Projects;
  const isBlogPage = selectedCategory === Category.Blog;
  const isAppStorePage = selectedCategory === Category.AppStore;
  const profile = {
    email: 'kyaw.htet.yang@gmail.com',
    linkedin: 'https://linkedin.com/in/kyawhtetyang',
    github: 'https://github.com/kyawhtetyang',
    resume: 'https://u.pcloud.link/publink/show?code=kZze2M5ZWWU8Wv1GxPfEbPPJLkhDuB6yEt7k',
    phone: '+95 388337',
    location: 'Yangon, Myanmar'
  };

  const formspreeEndpoint = (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined)?.trim();

  const chatSeedMessages = [
    {
      role: 'assistant',
      text: 'Hi, I am Kyaw Htet’s assistant. Ask me about AI/ML projects, web apps, or collaboration.'
    },
    {
      role: 'user',
      text: 'I want to build an AI-powered dashboard for my startup.'
    },
    {
      role: 'assistant',
      text: 'Great. Share your data sources, target users, and launch timeline. I can suggest a build plan and tech stack.'
    }
  ];

  const portfolioSkills = [
    'AI/ML Engineering',
    'LLM Applications',
    'Python + FastAPI',
    'React + TypeScript',
    'Product MVP Building',
    'MLOps & Deployment'
  ];

  const featuredWork = [
    {
      title: 'Fake News Detector (BiLSTM)',
      summary: 'End-to-end fake news detection pipeline with preprocessing, BiLSTM training, Flask prediction interface, and Docker deployment support.',
      stack: 'Python, TensorFlow, BiLSTM, Flask, Docker'
    },
    {
      title: 'Movie Recommender (Hybrid)',
      summary: 'Hybrid recommendation MVP combining user/item/content/latent signals, now migrating from Flask templates to a FastAPI-powered API + frontend.',
      stack: 'Python, FastAPI, SQLite, Hybrid Recommender'
    },
    {
      title: 'CloudLanguage (MVP)',
      summary: 'Mobile-first language learning MVP for Burmese learners with lesson loop, progress tracking, and review flow in build.',
      stack: 'React, TypeScript, FastAPI, Lesson JSON'
    }
  ];

  const blogDrafts = [
    {
      title: 'Sora update #1',
      status: 'Draft',
      summary: 'Notes on upcoming policy changes, rightsholder controls, and monetization direction.',
      updated: '2026-03-16',
      content: `Sora update #1
We have been learning quickly from how people are using Sora and taking feedback from users, rightsholders, and other interested groups. We of course spent a lot of time discussing this before launch, but now that we have a product out we can do more than just theorize.

We are going to make two changes soon (and many more to come).

First, we will give rightsholders more granular control over generation of characters, similar to the opt-in model for likeness but with additional controls.

We are hearing from a lot of rightsholders who are very excited for this new kind of "interactive fan fiction" and think this new kind of engagement will accrue a lot of value to them, but want the ability to specify how their characters can be used (including not at all). We assume different people will try very different approaches and will figure out what works for them. But we want to apply the same standard towards everyone, and let rightsholders decide how to proceed (our aim of course is to make it so compelling that many people want to). There may be some edge cases of generations that get through that shouldn't, and getting our stack to work well will take some iteration.

In particular, we'd like to acknowledge the remarkable creative output of Japan--we are struck by how deep the connection between users and Japanese content is!

Second, we are going to have to somehow make money for video generation. People are generating much more than we expected per user, and a lot of videos are being generated for very small audiences. We are going to try sharing some of this revenue with rightsholders who want their characters generated by users. The exact model will take some trial and error to figure out, but we plan to start very soon. Our hope is that the new kind of engagement is even more valuable than the revenue share, but of course we we want both to be valuable.

Please expect a very high rate of change from us; it reminds me of the early days of ChatGPT. We will make some good decisions and some missteps, but we will take feedback and try to fix the missteps very quickly. We plan to do our iteration on different approaches in Sora, but then apply it consistently across our products.`
    },
    {
      title: 'Sora 2',
      status: 'Draft',
      summary: 'Launch framing for a new model + product, creation-first UX, and safety concerns.',
      updated: '2026-03-16',
      content: `Sora 2
We are launching a new app called Sora. This is a combination of a new model called Sora 2, and a new product that makes it easy to create, share, and view videos.

This feels to many of us like the “ChatGPT for creativity” moment, and it feels fun and new. There is something great about making it really easy and fast to go from idea to result, and the new social dynamics that emerge.

Creativity could be about to go through a Cambrian explosion, and along with it, the quality of art and entertainment can drastically increase. Even in the very early days of playing with Sora, it’s been striking to many of us how open the playing field suddenly feels.

In particular, the ability to put yourself and your friends into a video—the team worked very hard on character consistency—with the cameo feature is something we have really enjoyed during testing, and is to many of us a surprisingly compelling new way to connect.

We also feel some trepidation. Social media has had some good effects on the world, but it’s also had some bad ones. We are aware of how addictive a service like this could become, and we can imagine many ways it could be used for bullying.

It is easy to imagine the degenerate case of AI video generation that ends up with us all being sucked into an RL-optimized slop feed. The team has put great care and thought into trying to figure out how to make a delightful product that doesn’t fall into that trap, and has come up with a number of promising ideas. We will experiment in the early days of the product with different approaches.

In addition to the mitigations we have already put in place (which include things like mitigations to prevent someone from misusing someone’s likeness in deepfakes, safeguards for disturbing or illegal content, periodic checks on how Sora is impacting users’ mood and wellbeing, and more) we are sure we will discover new things we need to do if Sora becomes very successful. To help guide us towards more of the good and less of the bad, here are some principles we have for this product:

*Optimize for long-term user satisfaction. The majority of users, looking back on the past 6 months, should feel that their life is better for using Sora that it would have been if they hadn’t. If that’s not the case, we will make significant changes (and if we can’t fix it, we would discontinue offering the service).  

*Encourage users to control their feed. You should be able to tell Sora what you want—do you want to see videos that will make you more relaxed, or more energized? Or only videos that fit a specific interest? Or only for a certain about of time? Eventually as our technology progresses, you will be should to the tell Sora what you want in detail in natural language. (However, parental controls for teens include the ability to opt out of a personalized feed, and other things like turning off DMs.)

*Prioritize creation. We want to make it easy and rewarding for everyone to participate in the creation process; we believe people are natural-born creators, and creating is important to our satisfaction.

*Help users achieve their long-term goals. We want to understand a user’s true goals, and help them achieve them. If you want to be more connected to your friends, we will try to help you with that. If you want to get fit, we can show you fitness content that will motivate you. If you want to start a business, we want to help teach you the skills you need. And if you truly just want to doom scroll and be angry, then ok, we’ll help you with that (although we want users to spend time using the app if they think it’s time well spent, we don’t want to be paternalistic about what that means to them).`
    },
    {
      title: 'Abundant Intelligence',
      status: 'Idea',
      summary: 'Why compute is the bottleneck, and what massive infrastructure buildout implies.',
      updated: '2026-03-16',
      content: `Abundant Intelligence
Growth in the use of AI services has been astonishing; we expect it to be even more astonishing going forward.

As AI gets smarter, access to AI will be a fundamental driver of the economy, and maybe eventually something we consider a fundamental human right. Almost everyone will want more AI working on their behalf.

To be able to deliver what the world needs—for inference compute to run these models, and for training compute to keep making them better and better—we are putting the groundwork in place to be able to significantly expand our ambitions for building out AI infrastructure.

If AI stays on the trajectory that we think it will, then amazing things will be possible. Maybe with 10 gigawatts of compute, AI can figure out how to cure cancer. Or with 10 gigawatts of compute, AI can figure out how to provide customized tutoring to every student on earth. If we are limited by compute, we’ll have to choose which one to prioritize; no one wants to make that choice, so let’s go build.

Our vision is simple: we want to create a factory that can produce a gigawatt of new AI infrastructure every week. The execution of this will be extremely difficult; it will take us years to get to this milestone and it will require innovation at every level of the stack, from chips to power to building to robotics. But we have been hard at work on this and believe it is possible. In our opinion, it will be the coolest and most important infrastructure project ever. We are particularly excited to build a lot of this in the US; right now, other countries are building things like chips fabs and new energy production much faster than we are, and we want to help turn that tide.
Over the next couple of months, we’ll be talking about some of our plans and the partners we are working with to make this a reality. Later this year, we’ll talk about how we are financing it; given how increasing compute is the literal key to increasing revenue, we have some interesting new ideas.`
    },
    {
      title: 'Jakub and Szymon',
      status: 'Idea',
      summary: 'Short recognition note on research + engineering leadership behind major breakthroughs.',
      updated: '2026-03-16',
      content: `Jakub and Szymon
AI has gotten remarkably better in recent years; ChatGPT can do amazing things that we take for granted. This is as it should be, and is the story of human progress. But behind the blinking circle, nicely abstracted away, is the greatest story of human ingenuity I have ever seen. A lot of people have worked unbelievably hard to discover how to build something that most experts thought was impossible on this timeframe, and to build a company to deliver products at massive scale to let people benefit from it. Most people who use ChatGPT will never think about the people that put so much work into it, which is totally ok, but just to take a minute of your time…

There are two people I'd like to mention that OpenAI would not be OpenAI without: Jakub Pachocki and Szymon Sidor. Time and again, they combine research and engineering to solve impossible problems. They have not gotten enough public credit, but they decided to scale up RL as a baseline to see where it broke when the conventional wisdom was that it didn't scale which led to our Dota result, built much of the infrastructure that enabled a lot of our scientific discoveries, led GPT-4 pretraining, drove together with Ilya and Lukasz the initial ideas that led to the reasoning breakthrough, and have made significant progress exploring new paradigms.
Jakub is our chief scientist. He once described Szymon as “indefatigable”, which is as perfect of a use of that word as I have ever heard. OpenAI has not yet thrown a problem at them they have not been able to solve; I have heard about partnerships like there is research labs of the past where two people are able to complement each other so well, but it is very special to get to watch it unfold over the years.`
    },
    {
      title: 'The Gentle Singularity',
      status: 'Polishing',
      summary: 'A long-form reflection on rapid AI progress, risks, and societal adaptation.',
      updated: '2026-03-16',
      content: `The Gentle Singularity
We are past the event horizon; the takeoff has started. Humanity is close to building digital superintelligence, and at least so far it’s much less weird than it seems like it should be.

Robots are not yet walking the streets, nor are most of us talking to AI all day. People still die of disease, we still can’t easily go to space, and there is a lot about the universe we don’t understand.

And yet, we have recently built systems that are smarter than people in many ways, and are able to significantly amplify the output of people using them. The least-likely part of the work is behind us; the scientific insights that got us to systems like GPT-4 and o3 were hard-won, but will take us very far.

AI will contribute to the world in many ways, but the gains to quality of life from AI driving faster scientific progress and increased productivity will be enormous; the future can be vastly better than the present. Scientific progress is the biggest driver of overall progress; it’s hugely exciting to think about how much more we could have.

In some big sense, ChatGPT is already more powerful than any human who has ever lived. Hundreds of millions of people rely on it every day and for increasingly important tasks; a small new capability can create a hugely positive impact; a small misalignment multiplied by hundreds of millions of people can cause a great deal of negative impact.

2025 has seen the arrival of agents that can do real cognitive work; writing computer code will never be the same. 2026 will likely see the arrival of systems that can figure out novel insights. 2027 may see the arrival of robots that can do tasks in the real world.

A lot more people will be able to create software, and art. But the world wants a lot more of both, and experts will probably still be much better than novices, as long as they embrace the new tools. Generally speaking, the ability for one person to get much more done in 2030 than they could in 2020 will be a striking change, and one many people will figure out how to benefit from.

In the most important ways, the 2030s may not be wildly different. People will still love their families, express their creativity, play games, and swim in lakes.

But in still-very-important-ways, the 2030s are likely going to be wildly different from any time that has come before. We do not know how far beyond human-level intelligence we can go, but we are about to find out.

In the 2030s, intelligence and energy—ideas, and the ability to make ideas happen—are going to become wildly abundant. These two have been the fundamental limiters on human progress for a long time; with abundant intelligence and energy (and good governance), we can theoretically have anything else.

Already we live with incredible digital intelligence, and after some initial shock, most of us are pretty used to it. Very quickly we go from being amazed that AI can generate a beautifully-written paragraph to wondering when it can generate a beautifully-written novel; or from being amazed that it can make live-saving medical diagnoses to wondering when it can develop the cures; or from being amazed it can create a small computer program to wondering when it can create an entire new company. This is how the singularity goes: wonders become routine, and then table stakes.

We already hear from scientists that they are two or three times more productive than they were before AI. Advanced AI is interesting for many reasons, but perhaps nothing is quite as significant as the fact that we can use it to do faster AI research. We may be able to discover new computing substrates, better algorithms, and who knows what else. If we can do a decade’s worth of research in a year, or a month, then the rate of progress will obviously be quite different.

From here on, the tools we have already built will help us find further scientific insights and aid us in creating better AI systems. Of course this isn’t the same thing as an AI system completely autonomously updating its own code, but nevertheless this is a larval version of recursive self-improvement.

There are other self-reinforcing loops at play. The economic value creation has started a flywheel of compounding infrastructure buildout to run these increasingly-powerful AI systems. And robots that can build other robots (and in some sense, datacenters that can build other datacenters) aren’t that far off. 

If we have to make the first million humanoid robots the old-fashioned way, but then they can operate the entire supply chain—digging and refining minerals, driving trucks, running factories, etc.—to build more robots, which can build more chip fabrication facilities, data centers, etc, then the rate of progress will obviously be quite different.

As datacenter production gets automated, the cost of intelligence should eventually converge to near the cost of electricity. (People are often curious about how much energy a ChatGPT query uses; the average query uses about 0.34 watt-hours, about what an oven would use in a little over one second, or a high-efficiency lightbulb would use in a couple of minutes. It also uses about 0.000085 gallons of water; roughly one fifteenth of a teaspoon.)

The rate of technological progress will keep accelerating, and it will continue to be the case that people are capable of adapting to almost anything. There will be very hard parts like whole classes of jobs going away, but on the other hand the world will be getting so much richer so quickly that we’ll be able to seriously entertain new policy ideas we never could before. We probably won’t adopt a new social contract all at once, but when we look back in a few decades, the gradual changes will have amounted to something big.

If history is any guide, we will figure out new things to do and new things to want, and assimilate new tools quickly (job change after the industrial revolution is a good recent example). Expectations will go up, but capabilities will go up equally quickly, and we’ll all get better stuff. We will build ever-more-wonderful things for each other. People have a long-term important and curious advantage over AI: we are hard-wired to care about other people and what they think and do, and we don’t care very much about machines.

A subsistence farmer from a thousand years ago would look at what many of us do and say we have fake jobs, and think that we are just playing games to entertain ourselves since we have plenty of food and unimaginable luxuries. I hope we will look at the jobs a thousand years in the future and think they are very fake jobs, and I have no doubt they will feel incredibly important and satisfying to the people doing them.

The rate of new wonders being achieved will be immense. It’s hard to even imagine today what we will have discovered by 2035; maybe we will go from solving high-energy physics one year to beginning space colonization the next year; or from a major materials science breakthrough one year to true high-bandwidth brain-computer interfaces the next year. Many people will choose to live their lives in much the same way, but at least some people will probably decide to “plug in”.

Looking forward, this sounds hard to wrap our heads around. But probably living through it will feel impressive but manageable. From a relativistic perspective, the singularity happens bit by bit, and the merge happens slowly. We are climbing the long arc of exponential technological progress; it always looks vertical looking forward and flat going backwards, but it’s one smooth curve. (Think back to 2020, and what it would have sounded like to have something close to AGI by 2025, versus what the last 5 years have actually been like.)

There are serious challenges to confront along with the huge upsides. We do need to solve the safety issues, technically and societally, but then it’s critically important to widely distribute access to superintelligence given the economic implications. The best path forward might be something like:

Solve the alignment problem, meaning that we can robustly guarantee that we get AI systems to learn and act towards what we collectively really want over the long-term (social media feeds are an example of misaligned AI; the algorithms that power those are incredible at getting you to keep scrolling and clearly understand your short-term preferences, but they do so by exploiting something in your brain that overrides your short-term preference).

Then focus on making superintelligence cheap, widely available, and not too concentrated with any person, company, or country. Society is resilient, creative, and adapts quickly. If we can harness the collective will and wisdom of people, then although we’ll make plenty of mistakes and some things will go really wrong, we will learn and adapt quickly and be able to use this technology to get maximum upside and minimal downside. Giving users a lot of freedom, within broad bounds society has to decide on, seems very important. The sooner the world can start a conversation about what these broad bounds are and how we define collective alignment, the better.

We (the whole industry, not just OpenAI) are building a brain for the world. It will be extremely personalized and easy for everyone to use; we will be limited by good ideas. For a long time, technical people in the startup industry have made fun of “the idea guys”; people who had an idea and were looking for a team to build it. It now looks to me like they are about to have their day in the sun.

OpenAI is a lot of things now, but before anything else, we are a superintelligence research company. We have a lot of work in front of us, but most of the path in front of us is now lit, and the dark areas are receding fast. We feel extraordinarily grateful to get to do what we do.

Intelligence too cheap to meter is well within grasp. This may sound crazy to say, but if we told you back in 2020 we were going to be where we are today, it probably sounded more crazy than our current predictions about 2030.

May we scale smoothly, exponentially and uneventfully through superintelligence.`
    }
  ];

  const filteredApps = useMemo(() => {
    const sourceApps = isAppStorePage ? privateStoreApps : APPS;
    let list = sourceApps;

    if (isProjectsPage && selectedProjectFilter !== 'All') {
      if (selectedProjectFilter === 'Featured') {
        list = list.filter(app => app.featured);
      } else {
        list = list.filter(app => getProjectFilterType(app) === selectedProjectFilter);
      }
    }

    if (searchQuery) {
      list = list.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return list;
  }, [isAppStorePage, isProjectsPage, privateStoreApps, searchQuery, selectedProjectFilter]);

  const handleAppClick = (app: AppInfo) => {
    setSelectedApp(app);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage errors (private mode or blocked storage).
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formspreeEndpoint || formspreeEndpoint.includes('your_form_id')) {
      setContactSubmitState({
        type: 'error',
        message: 'Form is not configured yet. Set VITE_FORMSPREE_ENDPOINT in .env.local.'
      });
      return;
    }

    try {
      setIsSubmittingContact(true);
      setContactSubmitState({ type: 'idle', message: '' });

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          projectType: contactProjectType,
          message: contactMessage,
          source: 'portfolio-contact-form'
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setContactSubmitState({
        type: 'success',
        message: 'Message sent successfully. I will reply soon.'
      });
      setContactName('');
      setContactEmail('');
      setContactProjectType('AI/ML');
      setContactMessage('');
    } catch {
      setContactSubmitState({
        type: 'error',
        message: 'Unable to send right now. Please try again or use the Email button.'
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f5f7]">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 glass border-r border-black/5 p-6 fixed inset-y-0 z-20">
        <div className="mb-10 pl-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-2xl font-bold tracking-tight flex items-center gap-2 hover:opacity-85 transition-opacity"
            aria-label="Reload page"
          >
            <img
              src={profilePhoto}
              alt="Kyaw Htet"
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            Kyaw Htet
          </button>
        </div>

        <nav className="space-y-1">
          <SidebarItem 
            category={Category.Discover} 
            active={selectedCategory === Category.Discover} 
            onClick={setSelectedCategory}
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          />
          <SidebarItem 
            category={Category.Projects} 
            active={selectedCategory === Category.Projects} 
            onClick={setSelectedCategory}
            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h8v13H3V7zm10-3h8v16h-8V4z" /></svg>}
          />
          {blogEnabled && (
            <SidebarItem
              category={Category.Blog}
              active={selectedCategory === Category.Blog}
              onClick={setSelectedCategory}
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm2 4h6m-6 4h6m-6 4h4" /></svg>}
            />
          )}
          {privateStoreEnabled && (
            <SidebarItem
              category={Category.AppStore}
              active={selectedCategory === Category.AppStore}
              onClick={setSelectedCategory}
              icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 12h14M5 16h14" /></svg>}
            />
          )}
          <button
            onClick={() => setSelectedCategory(Category.Chat)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
              selectedCategory === Category.Chat
                ? 'bg-black/5'
                : 'text-gray-500 hover:bg-black/5'
            }`}
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className={`${selectedCategory === Category.Chat ? 'text-[#fa233b]' : 'text-gray-400'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m8-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className={`text-sm font-semibold truncate ${selectedCategory === Category.Chat ? 'text-[#fa233b]' : 'text-inherit'}`}>{Category.Chat}</span>
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              selectedCategory === Category.Chat
                ? 'bg-[#1d1d1f] text-white'
                : 'bg-black/10 text-[#1d1d1f]'
            }`}>
              Beta
            </span>
          </button>
        </nav>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pt-0 px-4 pb-4 md:px-6 md:pb-6 lg:px-6 lg:pb-8">
        <header className="fixed top-0 left-0 right-0 lg:left-64 z-40 px-4 md:px-6 lg:px-6 h-12 md:h-14 bg-white border-b border-black/10 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg md:text-xl font-semibold text-[#1d1d1f] tracking-tight">{selectedCategory}</h2>
              {isChatPage && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fa233b]/10 text-[#fa233b]">
                  Beta
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!isDiscoverPage && !isChatPage && !isBlogPage && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 lg:w-80 bg-black/5 border-none rounded-xl py-2 px-10 transition-all outline-none text-sm"
                />
                <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            >
              {isDark ? (
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.95-6.95-1.41 1.41M7.46 16.54l-1.41 1.41m0-11.31 1.41 1.41m10.08 10.08 1.41 1.41M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              )}
            </button>
          </div>
        </header>

        {isDiscoverPage ? (
          <div className="pt-16 md:pt-20 space-y-8 pb-20">
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white border border-black/10 rounded-2xl p-6 md:p-7">
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  Kyaw Htet | AI/ML Engineer & Product Builder
                </h3>
                <p className="mt-4 text-sm text-gray-600 max-w-3xl">
                  I combine MBA-level business understanding with hands-on engineering experience in Python, automation, NLP, and machine learning.
                  This portfolio highlights practical projects, technical strengths, and ways to collaborate.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl bg-white border border-black/10 text-[#1d1d1f] text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition-colors">
                    LinkedIn
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl bg-white border border-black/10 text-[#1d1d1f] text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition-colors">
                    GitHub
                  </a>
                  <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-xl bg-[#fa233b] text-white text-sm font-semibold px-4 py-2 hover:bg-[#d91e33] transition-colors">
                    Resume
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className="inline-flex items-center rounded-xl bg-white border border-black/10 text-[#1d1d1f] text-sm font-semibold px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white border border-black/10 rounded-2xl p-6 md:p-7">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[#6e6e73]">Role</span>
                    <span className="font-semibold text-[#1d1d1f]">AI/ML Junior Developer</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[#6e6e73]">Address</span>
                    <span className="font-semibold text-[#1d1d1f]">{profile.location}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[#6e6e73]">Phone</span>
                    <span className="font-semibold text-[#1d1d1f]">{profile.phone}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[#6e6e73]">Status</span>
                    <span className="font-semibold text-[#1d1d1f]">Open to Collaboration</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-[#6e6e73]">Email</span>
                    <span className="font-semibold text-[#1d1d1f] truncate ml-4">{profile.email}</span>
                  </li>
                </ul>
              </div>
              </div>
            </section>

            <div className="border-t border-black/10"></div>

            <section>
              <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-3">Featured Work</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {featuredWork.map((project) => (
                  <article key={project.title} className="bg-white border border-black/10 rounded-2xl p-5">
                    <h4 className="text-base font-bold text-gray-900">{project.title}</h4>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{project.summary}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">{project.stack}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="border-t border-black/10"></div>

            <section>
              <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-3">Skills</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {portfolioSkills.map((skill) => (
                  <div key={skill} className="bg-white border border-black/10 rounded-xl px-3 py-2 text-sm font-semibold text-[#1d1d1f] text-center">
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            <div className="border-t border-black/10"></div>

            <section>
              <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-3">Contact</p>
              <h3 className="text-base font-bold text-gray-900">Want to work together?</h3>
              <p className="mt-3 text-sm text-gray-600">
                Send your project brief directly from here.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center rounded-xl bg-[#fa233b] text-white text-sm font-semibold px-4 py-2 hover:bg-[#d91e33] transition-colors"
                >
                  Contact Now
                </button>
              </div>
            </section>
          </div>
        ) : isChatPage ? (
          <div className="pt-16 md:pt-20 pb-36 lg:pb-28">
            <section className="h-[68vh] min-h-[520px] flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-0 pb-28 space-y-4">
                {chatSeedMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-[#fa233b] text-white'
                          : 'bg-white border border-black/10 text-[#1d1d1f]'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="fixed left-0 right-0 bottom-16 lg:bottom-0 lg:left-64 z-40 px-4 md:px-8 lg:px-12 pb-3 lg:pb-4">
              <div className="border-t border-black/10 pt-3 md:pt-4">
                <div className="flex items-end gap-3">
                  <textarea
                    rows={1}
                    placeholder="Type your message..."
                    className="flex-1 bg-white border border-black/10 rounded-2xl px-4 py-3 text-sm outline-none resize-none"
                  />
                  <button
                    type="button"
                    className="shrink-0 rounded-xl bg-[#fa233b] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[#d91e33] transition-colors"
                  >
                    Send
                  </button>
                </div>
                <p className="text-[11px] text-[#6e6e73] mt-2">
                  Beta preview. For guaranteed response, use Contact on Discover.
                </p>
              </div>
            </div>
          </div>
        ) : isBlogPage ? (
          <div className="pt-16 md:pt-20 space-y-8 pb-20">
            <section className="bg-white border border-black/10 rounded-2xl p-6 md:p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-[#fa233b] mb-3">Blog (Private)</p>
              <h3 className="text-base font-bold text-gray-900">Draft Posts</h3>
              <p className="mt-3 text-sm text-gray-600 max-w-3xl">
                Internal writing notes only. Not public yet.
              </p>
            </section>
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {blogDrafts.map((note) => (
                  <article
                    key={note.title}
                    className="bg-white border border-black/10 rounded-2xl p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedBlogDraft(note)}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{note.updated}</p>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#fa233b]/10 text-[#fa233b]">
                        {note.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-gray-900">{note.title}</h4>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{note.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <>
            <section className="pt-16 md:pt-20 mb-10">
              {searchQuery && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#6e6e73] mb-0">
                    {`${filteredApps.length} result${filteredApps.length === 1 ? '' : 's'} for "${searchQuery}"`}
                  </p>
                </div>
              )}

              {isProjectsPage && (
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6e6e73] mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                  {PROJECT_FILTERS.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedProjectFilter(filter)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        selectedProjectFilter === filter
                          ? 'bg-[#fa233b] text-white'
                          : 'bg-white border border-black/10 text-[#1d1d1f] hover:bg-gray-50'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                  </div>
                </div>
              )}

              {isProjectsPage || isAppStorePage ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
                  {filteredApps.map(app => (
                    <AppStoreListItem key={app.id} app={app} onOpen={handleAppClick} />
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="py-20 text-center lg:col-span-2">
                      <p className="text-gray-400 font-medium">
                        {isProjectsPage ? 'No projects found matching your criteria.' : 'No apps found matching your criteria.'}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-4 sm:gap-x-5 gap-y-6">
                  {filteredApps.map(app => (
                    <AppCard key={app.id} app={app} onClick={handleAppClick} />
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-gray-400 font-medium">No apps found matching your criteria.</p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Mobile Navigation - Only visible on small screens */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 h-16 glass border-t border-black/5 z-50 flex items-center justify-around px-4">
        <button onClick={() => setSelectedCategory(Category.Discover)} className={`p-2 rounded-full ${selectedCategory === Category.Discover ? 'text-[#fa233b]' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </button>
        <button onClick={() => setSelectedCategory(Category.Projects)} className={`p-2 rounded-full ${selectedCategory === Category.Projects ? 'text-[#fa233b]' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h8v13H3V7zm10-3h8v16h-8V4z" /></svg>
        </button>
        {blogEnabled && (
          <button onClick={() => setSelectedCategory(Category.Blog)} className={`p-2 rounded-full ${selectedCategory === Category.Blog ? 'text-[#fa233b]' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm2 4h6m-6 4h6m-6 4h4" /></svg>
          </button>
        )}
        {privateStoreEnabled && (
          <button onClick={() => setSelectedCategory(Category.AppStore)} className={`p-2 rounded-full ${selectedCategory === Category.AppStore ? 'text-[#fa233b]' : 'text-gray-400'}`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 12h14M5 16h14" /></svg>
          </button>
        )}
        <button onClick={() => setSelectedCategory(Category.Chat)} className={`p-2 rounded-full ${selectedCategory === Category.Chat ? 'text-[#fa233b]' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5m8-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
      </nav>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsContactModalOpen(false)}
          />
          <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-900">Contact</h2>
                <p className="text-sm text-gray-500">Share your project brief.</p>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10 text-left">
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#1d1d1f]">Name</span>
                  <input type="text" value={contactName} onChange={(e) => { setContactName(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="Your name" className="bg-white/95 border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[#1d1d1f]">Email</span>
                  <input type="email" required value={contactEmail} onChange={(e) => { setContactEmail(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="you@example.com" className="bg-white/95 border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none" />
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-medium text-[#1d1d1f]">Project Type</span>
                  <select value={contactProjectType} onChange={(e) => { setContactProjectType(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} className="bg-white/95 border border-black/10 rounded-lg px-4 py-2.5 text-sm outline-none">
                    <option>AI/ML</option>
                    <option>Python</option>
                    <option>Web App</option>
                    <option>Desktop App</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm font-medium text-[#1d1d1f]">Message</span>
                  <textarea rows={6} required value={contactMessage} onChange={(e) => { setContactMessage(e.target.value); if (contactSubmitState.type !== 'idle') setContactSubmitState({ type: 'idle', message: '' }); }} placeholder="Tell me about your goals, expected output, and timeline." className="bg-white/95 border border-black/10 rounded-lg px-4 py-3 text-sm outline-none resize-y" />
                </label>
                <div className="md:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-[#6e6e73]">For urgent requests, email me directly.</p>
                  <button type="submit" disabled={isSubmittingContact} className="inline-flex items-center rounded-lg bg-[#fa233b] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#d91e33] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">{isSubmittingContact ? 'Sending...' : 'Send Message'}</button>
                </div>
                {contactSubmitState.type !== 'idle' && (
                  <p className={`md:col-span-2 text-sm ${contactSubmitState.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {contactSubmitState.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedBlogDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedBlogDraft(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
            <div className="flex items-start justify-between px-6 py-5 md:px-8 md:py-6 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{selectedBlogDraft.updated}</p>
                <h2 className="text-xl font-bold text-gray-900">{selectedBlogDraft.title}</h2>
                <p className="text-sm text-gray-500">{selectedBlogDraft.status}</p>
              </div>
              <button
                onClick={() => setSelectedBlogDraft(null)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-8 text-left">
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {selectedBlogDraft.content || selectedBlogDraft.summary}
              </p>
              <div className="mt-6 rounded-2xl bg-gray-50 border border-black/10 p-4 text-xs text-gray-500 leading-relaxed">
                This is a private draft view. Publish when ready.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* App Detail Modal */}
      <AppDetailModal 
        app={selectedApp} 
        onClose={() => setSelectedApp(null)} 
      />
    </div>
  );
};

export default App;
