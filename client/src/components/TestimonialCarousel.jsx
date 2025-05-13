import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "Arjun Raghavan",
      role: "Software Engineer",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      rating: 5,
      review:
        "Ruthenix taught me full-stack development in a way I could understand and apply. Loved the projects! The React and MongoDB integration lessons helped me crack interviews at Infosys and Mindtree.",
    },
    {
      name: "Keerthana M",
      role: "UI Designer",
      img: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 4,
      review:
        "Amazing UX course! Learned so much about accessibility and visual hierarchy. I landed a freelance gig with a startup after showcasing my Ruthenix project.",
    },
    {
      name: "Naveen Kumar",
      role: "Data Scientist",
      img: "https://randomuser.me/api/portraits/men/13.jpg",
      rating: 5,
      review:
        "The ML and Python tracks gave me a solid foundation to transition into data science. I now work on data pipelines at Flipkart!",
    },
    {
      name: "Megha Srinivasan",
      role: "Marketing Lead",
      img: "https://randomuser.me/api/portraits/women/14.jpg",
      rating: 5,
      review:
        "Ruthenix helped me upskill in content marketing and analytics. The brand storytelling and campaign simulations were super insightful. Got a promotion at Zoho!",
    },
    {
      name: "Ravi Teja",
      role: "QA Analyst",
      img: "https://randomuser.me/api/portraits/men/15.jpg",
      rating: 4,
      review:
        "Test automation and manual testing tutorials were detailed and helpful. The Selenium exercises were especially helpful for real projects at TCS.",
    },
    {
      name: "Sindhu Rajan",
      role: "Business Analyst",
      img: "https://randomuser.me/api/portraits/women/16.jpg",
      rating: 5,
      review:
        "Courses on Excel, Power BI, and business strategy were spot on! I now lead data insights at an FMCG firm thanks to Ruthenix.",
    },
    {
      name: "Sathish Varma",
      role: "DevOps Engineer",
      img: "https://randomuser.me/api/portraits/men/17.jpg",
      rating: 5,
      review:
        "I loved learning Docker and Jenkins on Ruthenix. The labs were very realistic. I implemented CI/CD at my workplace using what I learned.",
    },
    {
      name: "Lakshmi Priya",
      role: "HR Coordinator",
      img: "https://randomuser.me/api/portraits/women/18.jpg",
      rating: 4,
      review:
        "Learned great communication and HR tech skills for my career shift. I now manage onboarding automation at Freshworks.",
    },
    {
      name: "Harish Iyer",
      role: "Frontend Developer",
      img: "https://randomuser.me/api/portraits/men/19.jpg",
      rating: 5,
      review:
        "React and Tailwind CSS lessons were perfectly structured. Built a full project portfolio that helped me get into Zoho Corp.",
    },
    {
      name: "Nithya Swaminathan",
      role: "Digital Strategist",
      img: "https://randomuser.me/api/portraits/women/20.jpg",
      rating: 5,
      review:
        "The SEO and SEM modules gave me an edge at work! We increased traffic by 35% in 2 months after I applied Ruthenix's tactics.",
    },
    {
      name: "Ganesh Krishnan",
      role: "System Admin",
      img: "https://randomuser.me/api/portraits/men/21.jpg",
      rating: 4,
      review:
        "Very good for learning cloud and networking basics. I passed the Azure Administrator exam after completing their cloud track.",
    },
    {
      name: "Divya Venkatesh",
      role: "Educator",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 5,
      review:
        "I now use tech to teach better, thanks to Ruthenix’s LMS training. My students love the interactive lessons I learned to design.",
    },
    {
      name: "Ramesh Babu",
      role: "Cloud Engineer",
      img: "https://randomuser.me/api/portraits/men/23.jpg",
      rating: 5,
      review:
        "AWS courses helped me get certified in under 3 months. I'm now part of the cloud ops team at Wipro!",
    },
    {
      name: "Vidya Narayanan",
      role: "Financial Consultant",
      img: "https://randomuser.me/api/portraits/women/24.jpg",
      rating: 4,
      review:
        "Learned modern accounting with ease. GST & tax modules were a bonus. Helped me offer better services to my SME clients.",
    },
    {
      name: "Suresh Raj",
      role: "Mobile Developer",
      img: "https://randomuser.me/api/portraits/men/25.jpg",
      rating: 5,
      review:
        "Flutter track helped me release my first Android app! The course gave me confidence to pitch ideas to local startups.",
    },
    {
      name: "Preethi D",
      role: "Tech Support",
      img: "https://randomuser.me/api/portraits/women/26.jpg",
      rating: 4,
      review:
        "Great platform to understand IT fundamentals and customer handling. I now manage L1 escalations with more clarity.",
    },
    {
      name: "Dinesh Kumar",
      role: "Network Engineer",
      img: "https://randomuser.me/api/portraits/men/27.jpg",
      rating: 5,
      review:
        "Helped me clear CCNA and build practical networking knowledge. Joined ACT Fibernet after finishing the network labs.",
    },
    {
      name: "Sandhya Menon",
      role: "Backend Developer",
      img: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      review:
        "Loved the Node.js deep dives and real-time chat app project! I'm now building APIs at a SaaS firm in Chennai.",
    },
    {
      name: "Mahesh P",
      role: "Product Designer",
      img: "https://randomuser.me/api/portraits/men/29.jpg",
      rating: 5,
      review:
        "The UI/UX bundle helped me improve my freelance portfolio immensely. Got offers from clients in Dubai and Bangalore!",
    },
    {
      name: "Revathi Rajagopal",
      role: "School Teacher",
      img: "https://randomuser.me/api/portraits/women/30.jpg",
      rating: 4,
      review:
        "I now blend online tools into my classroom teaching thanks to Ruthenix. The EdTech modules were very helpful.",
    },
    {
      name: "Kiran Chandran",
      role: "Freelancer",
      img: "https://randomuser.me/api/portraits/men/31.jpg",
      rating: 5,
      review:
        "Taught me freelancing, Upwork tips, and proposal writing. Closed 3 international clients in 2 months post course.",
    },
    {
      name: "Anitha Ravi",
      role: "Content Creator",
      img: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      review:
        "Courses on YouTube branding and monetization were gold! I doubled my channel growth using Ruthenix strategies.",
    },
    {
      name: "Vignesh Iyer",
      role: "ML Engineer",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
      rating: 5,
      review:
        "Learned TensorFlow and built an image classifier within weeks. Landed an internship with a tech lab in Bengaluru.",
    },
    {
      name: "Aparna S",
      role: "Operations Manager",
      img: "https://randomuser.me/api/portraits/women/34.jpg",
      rating: 4,
      review:
        "Really liked the leadership and Excel analytics courses. Our team at Reliance Retail uses Ruthenix templates now.",
    },
    {
      name: "Madhan K",
      role: "Tech Blogger",
      img: "https://randomuser.me/api/portraits/men/35.jpg",
      rating: 5,
      review:
        "The web content writing tips improved my blog reach tenfold! I'm now featured on multiple tech review sites.",
    },
    {
      name: "Shruti Nair",
      role: "Recruiter",
      img: "https://randomuser.me/api/portraits/women/36.jpg",
      rating: 4,
      review:
        "I understand LinkedIn optimization and ATS now. Thanks Ruthenix! Helped me shortlist better candidates at Cognizant.",
    },
    {
      name: "Raghu Raman",
      role: "Game Developer",
      img: "https://randomuser.me/api/portraits/men/37.jpg",
      rating: 5,
      review:
        "Unity tutorials were immersive. Built my first game demo which I used to apply for internships with indie game studios.",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const chunkSize = 3;
  const totalSlides = Math.ceil(testimonials.length / chunkSize);

  const chunkTestimonials = () => {
    const chunks = [];
    for (let i = 0; i < testimonials.length; i += chunkSize) {
      chunks.push(testimonials.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const testimonialChunks = chunkTestimonials();

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div
      className="relative overflow-hidden py-8 bg-gray-100"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimonialChunks.map((chunk, slideIndex) => (
          <div key={slideIndex} className="min-w-full flex gap-6 px-4">
            {chunk.map((t, index) => (
              <div
                key={index}
                className="flex-1 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="#facc15" stroke="none" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm">“{t.review}”</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === i ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
