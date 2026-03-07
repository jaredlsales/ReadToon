
export default function TermsOfContentComponent() {
  return (
    <div className="grid gap-6 p-6 text-[14px] text-[#B8B8B8] font-['Fira_Sans',sans-serif] bg-[#16151D] rounded-lg border border-white/5 shadow-xl antialiased leading-relaxed">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <span className="w-1.5 h-8 bg-[#913FE2] rounded-full inline-block"></span>
          Terms of Service
        </h1>
        <p className="text-amber-500 font-medium mt-2 italic">
          ⚠️ Important: This is a Portfolio Project for educational purposes.
        </p>
      </div>

      <div className="text-justify space-y-8">
        
        {/* SECTION 1: PROJECT NATURE & COPYRIGHT */}
        <section className="bg-[#913FE2]/5 p-5 rounded border border-[#913FE2]/20">
          <h3 className="text-white font-bold mb-3 uppercase text-sm tracking-wider underline decoration-[#913FE2] underline-offset-4">
            1. Project Nature & Copyright
          </h3>
          <p className="leading-relaxed">
            This website, <strong className="text-white">ReadToon</strong>, is a non-profit project developed exclusively for <strong className="text-white">educational purposes and full-stack portfolio display</strong>. I do not own the copyrights to the Manhwas displayed here (e.g., Nano Machine, Infinite Mage). All arts, stories, and characters belong to their respective authors and publishers. This project serves as a technical demonstration of web development skills using <span className="text-[#913FE2]">React, Node.js, and Tailwind CSS</span>.
          </p>
        </section>

        {/* SECTION 2: ELIGIBILITY */}
        <section className="space-y-3">
          <h3 className="text-white font-bold flex gap-2 items-center">
            <span className="text-[#913FE2]">2.</span> Eligibility
          </h3>
          <p className="pl-6 border-l border-white/10">
            You must be at least 13 years old to use this platform. By browsing this project, you represent and warrant that you are of legal age or have obtained parental consent to view this demonstration content.
          </p>
        </section>

        {/* SECTION 3: USE OF PLATFORM */}
        <section className="space-y-3">
          <h3 className="text-white font-bold flex gap-2 items-center">
            <span className="text-[#913FE2]">3.</span> Use of Platform
          </h3>
          <div className="pl-6 border-l border-white/10 space-y-3">
            <p>
              <strong className="text-white/90">3.1. License:</strong> Subject to your compliance with these Terms, I grant you a limited, non-exclusive, and revocable license to access and use this platform for personal, non-commercial portfolio review purposes.
            </p>
            <p>
              <strong className="text-white/90">3.2. Prohibited Conduct:</strong> You agree not to attempt to gain unauthorized access to the database, interfere with the proper functioning of the site, or distribute any harmful code.
            </p>
          </div>
        </section>

        {/* SECTION 4: DMCA & CONTENT REMOVAL */}
        <section className="space-y-3">
          <h3 className="text-white font-bold flex gap-2 items-center">
            <span className="text-[#913FE2]">4.</span> DMCA & Content Removal
          </h3>
          <p className="pl-6 border-l border-white/10">
            ReadToon respects intellectual property rights. If you are a copyright owner and would like any specific content removed, please contact the developer via the official links (GitHub/LinkedIn) provided in the footer. The content will be removed immediately upon request.
          </p>
        </section>

        {/* SECTION 5: MODIFICATIONS */}
        <section className="space-y-3">
          <h3 className="text-white font-bold flex gap-2 items-center">
            <span className="text-[#913FE2]">5.</span> Modifications
          </h3>
          <p className="pl-6 border-l border-white/10">
            I reserve the right to modify, suspend, or terminate this portfolio project or any part thereof at any time without prior notice to comply with legal or copyright requirements.
          </p>
        </section>

      </div>
    </div>

  );

}