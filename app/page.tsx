'use client';

import { Header } from '@/components/header';
import { BackgroundCanvas } from '@/components/background-canvas';
import { Footer } from '@/components/footer';
import { ProfileCard } from '@/components/profile-card';
import { IntroSection } from '@/components/intro-section';
import { ExperienceSection } from '@/components/experience-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { GithubSnake } from '@/components/github-snake';
import { TestimonialsSection } from '@/components/testimonials-section';
import { PageTransition } from '@/components/page-transition';

export default function Home() {
  return (
    <>
      <BackgroundCanvas />
      <Header />
      
      <PageTransition>
      <main className="relative z-10 pt-20 px-4 md:px-8 max-w-[1600px] mx-auto">
        {/* Row 1: Profile & Intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <ProfileCard />
          <IntroSection />
        </div>

        {/* Row 2: Experience, Skills & Projects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <ExperienceSection />
          <SkillsSection />
          <div className="md:col-span-3 flex flex-col gap-6">
            <ProjectsSection />
            <GithubSnake />
          </div>
        </div>

        {/* Row 3: Testimonials & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <TestimonialsSection />
        </div>
      </main>
      </PageTransition>
      <Footer />
    </>
  );
}
