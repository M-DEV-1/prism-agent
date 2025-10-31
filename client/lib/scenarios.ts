export type ScenarioMessage = {
  role: 'user' | 'bot';
  content: string;
  emotion?: 'empathetic' | 'enthusiastic' | 'urgent';
  timestamp?: number;
};

export type Scenario = {
  id: string;
  title: string;
  desc: string;
  icon: string;
  chatHistory: ScenarioMessage[];
};

export const scenarios: Scenario[] = [
  {
    id: 'kyc-failure',
    title: 'KYC Hurdle Overcome',
    desc: 'When docs don\'t match—PRISM rebuilds trust with guided fixes',
    icon: 'Shield',
    chatHistory: [
      { role: 'bot', content: 'Hi! Ready to explore personal loans? Tell me about your needs! ✨', emotion: 'enthusiastic', timestamp: 0 },
      { role: 'user', content: 'I need a loan but my ID scan keeps failing. This is so annoying!', timestamp: 30000 },
      { role: 'bot', content: 'I totally understand your frustration ❤️ No worries, this happens to about 90% of users and we can fix it in just 2 minutes! Would you like to try uploading again with some quick tips?', emotion: 'empathetic', timestamp: 60000 },
      { role: 'user', content: 'Okay, what should I do?', timestamp: 90000 },
      { role: 'bot', content: 'Great! Here\'s what works best:\n\n• Ensure good lighting on the document\n• Keep it flat (no wrinkles)\n• Make sure all corners are visible\n• Try the front camera if back isn\'t clear\n\nReady to give it another shot? 📸', emotion: 'empathetic', timestamp: 120000 },
      { role: 'user', content: 'Got it, trying now...', timestamp: 150000 },
      { role: 'bot', content: 'Perfect! Take your time—I\'ll be right here waiting. You\'ve got this! 💪', emotion: 'empathetic', timestamp: 180000 },
      { role: 'user', content: 'It worked! My ID is verified now.', timestamp: 210000 },
      { role: 'bot', content: '🎉 Fantastic! Your KYC is now verified! Ready for the next step? We can check your eligibility right away—it only takes 30 seconds!', emotion: 'enthusiastic', timestamp: 240000 },
      { role: 'user', content: 'Yes, let\'s do it!', timestamp: 270000 },
      { role: 'bot', content: 'Awesome! Checking your credit eligibility now... This will help us tailor the perfect loan offer for you! 🚀', emotion: 'enthusiastic', timestamp: 300000 },
    ],
  },
  {
    id: 'interest-rate-query',
    title: 'Interest Rate Query',
    desc: 'Transparent rate disclosure with smart upsells and EMI calculator',
    icon: 'DollarSign',
    chatHistory: [
      { role: 'bot', content: 'Hi! Ready to explore personal loans? Tell me about your needs! ✨', emotion: 'enthusiastic', timestamp: 0 },
      { role: 'user', content: 'What\'s the interest rate for a 50k loan?', timestamp: 30000 },
      { role: 'bot', content: 'Great question! Our rates start at **8.5% per annum** for personal loans—that\'s actually better than most banks! 🎯\n\nFor a ₹50,000 loan, your EMI would be around ₹2,300/month for 24 months.\n\nWould you like me to simulate your exact EMI based on your preferred tenure?', emotion: 'enthusiastic', timestamp: 60000 },
      { role: 'user', content: 'Hmm, that sounds reasonable. What about 30k?', timestamp: 90000 },
      { role: 'bot', content: 'Absolutely! For ₹30,000 at the same rate:\n\n• **12 months**: ₹2,625/month\n• **24 months**: ₹1,365/month\n• **36 months**: ₹950/month\n\nPlus, with us you get **instant approval** and funds in your account within 24 hours! No lengthy bank queues! 🚀\n\nWhich tenure works best for you?', emotion: 'enthusiastic', timestamp: 120000 },
      { role: 'user', content: '24 months looks good. How do I apply?', timestamp: 150000 },
      { role: 'bot', content: 'Perfect choice! Here\'s how simple it is:\n\n1. Share your basic details (2 mins)\n2. Quick KYC verification (3 mins)\n3. Credit check (instant)\n4. Get approved & receive funds!\n\nWant to start right now? I\'ll guide you through each step! 😊', emotion: 'enthusiastic', timestamp: 180000 },
      { role: 'user', content: 'Yes, let\'s start!', timestamp: 210000 },
      { role: 'bot', content: 'Excellent! Let\'s begin with your details. What\'s your full name? 📝', emotion: 'enthusiastic', timestamp: 240000 },
    ],
  },
  {
    id: 'low-credit-score',
    title: 'Low Credit Score Verification',
    desc: 'Empathetic handling of low scores with motivational guidance and approval paths',
    icon: 'TrendingUp',
    chatHistory: [
      { role: 'bot', content: 'Hi! Ready to explore personal loans? Tell me about your needs! ✨', emotion: 'enthusiastic', timestamp: 0 },
      { role: 'user', content: 'My credit score is 620. Will I even qualify?', timestamp: 30000 },
      { role: 'bot', content: 'Thank you for being upfront! I appreciate your honesty ❤️\n\nGood news: **We approve 85% of applications with scores like yours!** We look at more than just a number—your income stability, employment history, and repayment capacity matter too.\n\nYour 620 is actually **very close** to our threshold. Would you like some quick tips to boost it by 20-30 points in the next month? Or we can proceed with your application now—you might still qualify!', emotion: 'empathetic', timestamp: 60000 },
      { role: 'user', content: 'What tips do you have?', timestamp: 90000 },
      { role: 'bot', content: 'Here are proven ways to boost your score quickly:\n\n✅ **Pay existing credit card bills on time** (biggest impact!)\n✅ **Keep credit utilization below 30%**\n✅ **Don\'t apply for multiple loans at once**\n✅ **Check for errors in your credit report**\n\nMany see a **20-30 point jump in just 30 days** following these!\n\nWould you like to:\n1. Apply now (we might approve you as-is) 🚀\n2. Get personalized tips based on your report 📊\n3. Wait a month and reapply with a higher score 🎯', emotion: 'empathetic', timestamp: 120000 },
      { role: 'user', content: 'I think I\'ll try applying now. What do you need?', timestamp: 150000 },
      { role: 'bot', content: 'That\'s the spirit! Let\'s give it a shot! 💪\n\nI\'ll need:\n• Your KYC documents (Aadhaar/PAN)\n• Income proof (salary slips or bank statements)\n• Employment details\n\nWe\'ll run a comprehensive check and get back to you within minutes. Ready to start?', emotion: 'enthusiastic', timestamp: 180000 },
      { role: 'user', content: 'Yes, I have everything ready.', timestamp: 210000 },
      { role: 'bot', content: 'Perfect! Let\'s begin with your KYC. Click the upload button below to share your documents. I\'ll guide you through each step! 📎', emotion: 'enthusiastic', timestamp: 240000 },
    ],
  },
  {
    id: 'urgent-funding',
    title: 'Urgent Funding Need',
    desc: 'Fast-track empathy for emergency situations with rapid processing',
    icon: 'Zap',
    chatHistory: [
      { role: 'bot', content: 'Hi! Ready to explore personal loans? Tell me about your needs! ✨', emotion: 'enthusiastic', timestamp: 0 },
      { role: 'user', content: 'I need 10k urgently by tomorrow for a medical emergency! Can you help?', timestamp: 30000 },
      { role: 'bot', content: 'I\'m here to help you right away! ❤️ Medical emergencies are our top priority—we understand how stressful this must be.\n\nYes, we can **fast-track your application** and potentially have funds in your account within **24 hours**—sometimes even faster!\n\nCan you share:\n1. Your name and mobile number\n2. Your PAN/Aadhaar for quick KYC\n3. Your income details (rough estimate works)\n\nI\'ll expedite everything on my end!', emotion: 'urgent', timestamp: 60000 },
      { role: 'user', content: 'Thank you! My name is Raj, mobile is 98765XXXXX', timestamp: 90000 },
      { role: 'bot', content: 'Got it, Raj! 👋\n\nFor urgent processing, we can skip some steps and use our **express lane**. I\'m starting your application now!\n\nPlease upload your Aadhaar front & back, and one income proof. I\'ll verify them immediately.', emotion: 'urgent', timestamp: 120000 },
      { role: 'user', content: 'Uploading now...', timestamp: 150000 },
      { role: 'bot', content: 'Perfect! While that\'s processing, let me also check your credit eligibility in parallel—this will save us precious time! ⚡\n\nYour documents look good so far. Almost there!', emotion: 'urgent', timestamp: 180000 },
      { role: 'user', content: 'How long until I know if I\'m approved?', timestamp: 210000 },
      { role: 'bot', content: 'Great question! For urgent cases like yours:\n\n• **KYC verification**: 5-10 minutes (usually instant)\n• **Credit check**: 2-3 minutes\n• **Approval decision**: Immediate after checks\n• **Funds transfer**: Within 24 hours (often same day!)\n\nYou should have an answer **within 15-20 minutes**! I\'ll notify you the moment we have an update. Hang tight! 🚀', emotion: 'urgent', timestamp: 240000 },
      { role: 'user', content: 'Thank you so much for the help!', timestamp: 270000 },
      { role: 'bot', content: 'You\'re very welcome, Raj! This is exactly what we\'re here for. I\'ve flagged your case as priority—you\'ll hear from us soon! Stay positive! 💪❤️', emotion: 'empathetic', timestamp: 300000 },
    ],
  },
  {
    id: 'bank-comparison',
    title: 'Bank Comparison',
    desc: 'Data-backed competitive positioning with side-by-side value props',
    icon: 'Scale',
    chatHistory: [
      { role: 'bot', content: 'Hi! Ready to explore personal loans? Tell me about your needs! ✨', emotion: 'enthusiastic', timestamp: 0 },
      { role: 'user', content: 'Why should I choose you over HDFC? Their rates seem cheaper.', timestamp: 30000 },
      { role: 'bot', content: 'Fair question! Let me break down why we\'re actually the better choice: 🎯\n\n**Rate Comparison:**\n• HDFC: 9.5-12% (varies by profile)\n• **PRISM: 8.5% flat** (beats them by ~1-1.5%!)\n\n**Speed:**\n• HDFC: 3-5 business days\n• **PRISM: Instant approval, funds in 24h** ⚡\n\n**Process:**\n• HDFC: Branch visits, paperwork\n• **PRISM: Fully digital, zero hassle** 📱\n\nWant to see a side-by-side comparison?', emotion: 'enthusiastic', timestamp: 60000 },
      { role: 'user', content: 'Hmm, that does sound better. But what about hidden charges?', timestamp: 90000 },
      { role: 'bot', content: 'Great that you\'re asking! Transparency is our core value ✨\n\n**Our Fee Structure (All-in):**\n• Processing fee: 2% (one-time, upfront)\n• **Zero hidden charges**\n• No prepayment penalties\n• No annual maintenance\n\n**HDFC typically charges:**\n• Processing: 2-3%\n• Annual fees: ~₹500-1000\n• Prepayment penalties: 2-4%\n\n**Total savings with us: ~₹3,000-5,000** over the loan tenure! Plus, you save days of time.\n\nConvinced yet? 😊 Want to calculate your exact savings?', emotion: 'enthusiastic', timestamp: 120000 },
      { role: 'user', content: 'Okay, you\'ve got me interested. How do I start?', timestamp: 150000 },
      { role: 'bot', content: 'Awesome decision! 🎉 Here\'s how simple it is:\n\n1. **2-minute application** (I\'ll guide you)\n2. **3-minute KYC** (upload docs)\n3. **Instant approval** (AI-powered)\n4. **Funds in 24h** (fastest in market!)\n\nNo branch visits, no queues, no stress!\n\nReady to begin? Just share your loan amount and I\'ll create your application! 🚀', emotion: 'enthusiastic', timestamp: 180000 },
      { role: 'user', content: '50k for 24 months, please!', timestamp: 210000 },
      { role: 'bot', content: 'Perfect! ₹50k for 24 months—that\'s a great choice! Your EMI will be ₹2,300/month.\n\nLet\'s get started with your details. What\'s your full name? 📝', emotion: 'enthusiastic', timestamp: 240000 },
    ],
  },
  {
    id: 'sanction-celebration',
    title: 'Sanction Celebration',
    desc: 'Enthusiastic approval celebration with instant PDF generation',
    icon: 'PartyPopper',
    chatHistory: [
      { role: 'bot', content: 'Hi! Ready to explore personal loans? Tell me about your needs! ✨', emotion: 'enthusiastic', timestamp: 0 },
      { role: 'user', content: 'I just got notified that my loan was approved! Is this real?', timestamp: 30000 },
      { role: 'bot', content: '**YES, IT\'S REAL! CONGRATULATIONS!** 🎊🎉🎊\n\nYour loan application has been **fully approved**! This is exciting news!\n\n**Your Loan Details:**\n• Amount: ₹50,000\n• Interest Rate: 8.5% p.a.\n• Tenure: 24 months\n• EMI: ₹2,300/month\n• Status: **APPROVED** ✅\n\nI\'m so happy for you! Would you like to download your official sanction letter now?', emotion: 'enthusiastic', timestamp: 60000 },
      { role: 'user', content: 'Yes please! I can\'t believe it was this easy!', timestamp: 90000 },
      { role: 'bot', content: 'I know, right? That\'s the PRISM way! 🚀✨\n\nGenerating your sanction letter now... This is a legally binding document with all your loan terms.\n\n**What happens next:**\n1. Download your letter (below)\n2. Review and accept terms\n3. Funds will be transferred within **24 hours**\n4. You\'ll receive an SMS confirmation\n\nReady to download? 📄', emotion: 'enthusiastic', timestamp: 120000 },
      { role: 'user', content: 'Downloading now! When will I receive the money?', timestamp: 150000 },
      { role: 'bot', content: 'Excellent question! Here\'s your timeline:\n\n⏰ **Today**: Sanction letter downloaded ✅\n⏰ **Within 24 hours**: Funds credited to your account 💰\n⏰ **Tomorrow morning**: Receive confirmation SMS & email 📱\n\n**Pro tip**: Make sure your bank account details are correct in the letter. If you need to update them, let me know ASAP!\n\nIs there anything else you\'d like to know about your loan?', emotion: 'enthusiastic', timestamp: 180000 },
      { role: 'user', content: 'No, I think that\'s everything. Thank you so much!', timestamp: 210000 },
      { role: 'bot', content: 'You\'re absolutely welcome! 🙏\n\nI\'m thrilled we could help you get the funds you need. If you have any questions during your loan tenure, just reach out—we\'re always here!\n\n**Congratulations again, and best of luck with everything!** 🎉✨\n\n*Have a wonderful day!*', emotion: 'enthusiastic', timestamp: 240000 },
    ],
  },
];
