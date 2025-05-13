// src/assets/courseData.js

import course1 from '../assets/course1.jpg';
import course2 from '../assets/course2.jpg';
import course3 from '../assets/course3.jpg';
import course4 from '../assets/course4.png';
import course5 from '../assets/course5.jpg'; // Add appropriate images
import course6 from '../assets/course6.jpg';
import course7 from '../assets/course7.jpg';
import course8 from '../assets/course8.jpg';

const courseData = [
  {
    id:1,
    name: "🌐 Web Development Bootcamp",
    tagline: "🚀 Become a full-stack developer in just 12 weeks",
    image: course1,
    instructor: "Ankit Reddy",
    rating: 4.8,
    students: "1500+",
    duration: 60,
    price: "₹39,999",
    discountedPrice: "₹39,999",
    originalPrice: "₹49,999",
     syllabus : [
      { name: "HTML & CSS Fundamentals", pdf: "/path/to/HTML_CSS_Fundamentals.pdf", video: "https://www.youtube.com/watch?v=example" },
      { name: "JavaScript Essentials", pdf: "/path/to/JS_Essentials.pdf", video: "https://www.youtube.com/watch?v=another_example" },
      { name: "React.js Development", pdf: "/path/to/React_Development.pdf", video: "https://www.youtube.com/watch?v=different_example" },
      { name: "Version Control with Git & GitHub", pdf: "/path/to/Git_GitHub.pdf", video: "https://www.youtube.com/watch?v=video_git" },
      { name: "Responsive Web Design with Tailwind CSS", pdf: "/path/to/Tailwind_CSS.pdf", video: "https://www.youtube.com/watch?v=video_tailwind" },
      { name: "Node.js & Express.js Backend Development", pdf: "/path/to/Node_Express.pdf", video: "https://www.youtube.com/watch?v=video_node" },
      { name: "MongoDB Basics & Integration", pdf: "/path/to/MongoDB_Basics.pdf", video: "https://www.youtube.com/watch?v=video_mongo" },
      { name: "Authentication with JWT", pdf: "/path/to/JWT_Authentication.pdf", video: "https://www.youtube.com/watch?v=video_jwt" },
      { name: "Role-Based Access Control (RBAC)", pdf: "/path/to/RBAC.pdf", video: "https://www.youtube.com/watch?v=video_rbac" },
      { name: "RESTful API Design", pdf: "/path/to/REST_API.pdf", video: "https://www.youtube.com/watch?v=video_rest" },
      { name: "Advanced React: Hooks, Context API", pdf: "/path/to/Advanced_React.pdf", video: "https://www.youtube.com/watch?v=video_advanced_react" },
      { name: "Deployment with Vercel & Render", pdf: "/path/to/Deployment_Guide.pdf", video: "https://www.youtube.com/watch?v=video_deploy" },
    ],
    
    learningOutcomes: [
      "Build responsive web apps using HTML, CSS, and JavaScript",
      "Master React.js for frontend development",
      "Create RESTful APIs with Node and Express",
      "Deploy full-stack apps using modern hosting platforms"
    ],
    requirements: [
      "Basic computer knowledge",
      "Internet connection",
      "A passion for coding and creativity"
    ],
    instructorProfile: {
      name: "Ankit Reddy",
      role: "Full-Stack Developer, Instructor",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQH426MnvXxY4A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1677331460852?e=2147483647&v=beta&t=CtU6jU7x-KF1OAEtq-Np8K1RaK_uIVVIox8mkfVvQUc",
      linkedIn: "https://www.linkedin.com/in/ankitreddy",
      github: "https://github.com/ankitreddy"
    },
    category: "Programming",
    brand: "Ruthenix",
    badge: "Bestseller",
  },
  {
    id:2,
    name: "📊 Data Science Masterclass",
    tagline: "💡 Master Python, Machine Learning, and data analysis.",
    image: course2,
    instructor: "Priya Kumar",
    rating: 4.7,
    students: "2000+",
    duration: 80,
    price: "₹89,999",
    discountedPrice: "₹89,999",
    originalPrice: "₹99,999",
    syllabus: [
      { name: "Introduction to Data Science", pdf: "/path/to/Introduction_to_Data_Science.pdf", video: "https://www.youtube.com/watch?v=example1" },
      { name: "Data Preprocessing", pdf: "/path/to/Data_Preprocessing.pdf", video: "https://www.youtube.com/watch?v=example2" },
      { name: "Data Visualization with Python", pdf: "/path/to/Data_Visualization.pdf", video: "https://www.youtube.com/watch?v=example3" },
      { name: "Python for Data Science", pdf: "/path/to/Python_for_Data_Science.pdf", video: "https://www.youtube.com/watch?v=example2" },
      { name: "Data Preprocessing & Visualization", pdf: "/path/to/Data_Preprocessing.pdf", video: "https://www.youtube.com/watch?v=another_example2" },
      { name: "Machine Learning Algorithms", pdf: "/path/to/Machine_Learning.pdf", video: "https://www.youtube.com/watch?v=different_example2" },
      { name: "Deep Learning with TensorFlow", pdf: "/path/to/Deep_Learning_TensorFlow.pdf", video: "https://www.youtube.com/watch?v=example4" },
      { name: "Natural Language Processing", pdf: "/path/to/NLP.pdf", video: "https://www.youtube.com/watch?v=example5" },
      { name: "Model Evaluation & Optimization", pdf: "/path/to/Model_Evaluation.pdf", video: "https://www.youtube.com/watch?v=example6" },
      { name: "Advanced Data Visualization with Plotly", pdf: "/path/to/Advanced_Data_Visualization.pdf", video: "https://www.youtube.com/watch?v=example7" }
    ],
    
    learningOutcomes: [
      "Analyze and visualize data using Python",
      "Build machine learning models using popular libraries",
      "Implement deep learning models for various tasks",
      "Work with big data technologies"
    ],
    requirements: [
      "Basic knowledge of Python",
      "Familiarity with mathematics and statistics",
      "A passion for data science and problem solving"
    ],
    instructorProfile: {
      name: "Priya Kumar",
      role: "Data Scientist, Instructor",
      image: "https://southeasternhealthpartners.org/wp-content/uploads/2022/03/Priya-Kumar-Headshot.jpg",
      linkedIn: "https://www.linkedin.com/in/priyakumar",
      github: "https://github.com/priyakumar"
    },
    category: "Data",
    brand: "Ruthenix",
    badge: "Featured",
  },
  {
    id:3,
    name: "🎨 UI/UX Design Essentials",
    tagline: "🎯 Design engaging and user-friendly interfaces.",
    image: course3,
    instructor: "Rahul Dev",
    rating: 4.8,
    students: "1000+",
    duration: 50,
    price: "₹56,999",
    discountedPrice: "₹56,999",
    originalPrice: "₹60,999",
    syllabus: [
      { name: "Introduction to UI/UX Design", pdf: "/path/to/Intro_to_UI_UX_Design.pdf", video: "https://www.youtube.com/watch?v=example3" },
      { name: "Design Thinking Process", pdf: "/path/to/Design_Thinking.pdf", video: "https://www.youtube.com/watch?v=another_example3" },
      { name: "Wireframing and Prototyping", pdf: "/path/to/Wireframing_Prototyping.pdf", video: "https://www.youtube.com/watch?v=different_example3" },
      { name: "UI Design Principles", pdf: "/path/to/UI_Design_Principles.pdf", video: "https://www.youtube.com/watch?v=example4" },
      { name: "User Research and Persona Creation", pdf: "/path/to/User_Research_Persona.pdf", video: "https://www.youtube.com/watch?v=another_example4" },
      { name: "Usability Testing and Feedback", pdf: "/path/to/Usability_Testing.pdf", video: "https://www.youtube.com/watch?v=different_example4" },
      { name: "Interaction Design", pdf: "/path/to/Interaction_Design.pdf", video: "https://www.youtube.com/watch?v=example5" },
      { name: "Responsive Design and Mobile UI", pdf: "/path/to/Responsive_Design.pdf", video: "https://www.youtube.com/watch?v=example6" },
      { name: "UI/UX Tools and Software", pdf: "/path/to/UI_UX_Tools.pdf", video: "https://www.youtube.com/watch?v=different_example5" },
      { name: "Advanced Prototyping with Figma", pdf: "/path/to/Advanced_Prototyping_Figma.pdf", video: "https://www.youtube.com/watch?v=example7" }
    ],
    
    learningOutcomes: [
      "Create visually appealing and user-friendly designs",
      "Master design thinking and user-centric approaches",
      "Build interactive prototypes with design tools",
      "Understand how to conduct usability testing"
    ],
    requirements: [
      "Basic knowledge of graphic design",
      "A passion for design and user experience",
      "Access to a computer with design software"
    ],
    instructorProfile: {
      name: "Rahul Dev",
      role: "UI/UX Designer, Instructor",
      image: "https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=",
      linkedIn: "https://www.linkedin.com/in/rahuldev",
      github: "https://github.com/rahuldev"
    },
    category: "Design",
    brand: "Ruthenix",
    badge: "Popular",
  },
  {
    id:4,
    name: "📈 Stock Marketing Fundamentals",
    tagline: "💼 Understand market trends and trading strategies.",
    image: course4,
    instructor: "Meena Iyer",
    rating: 4.3,
    students: "800+",
    duration: 40,
    price: "₹48,499",
    discountedPrice: "₹48,499",
    originalPrice: "₹55,999",
    syllabus: [
      { name: "Stock Market Basics", pdf: "/path/to/Stock_Market_Basics.pdf", video: "https://www.youtube.com/watch?v=example4" },
      { name: "Understanding Market Trends", pdf: "/path/to/Market_Trends.pdf", video: "https://www.youtube.com/watch?v=another_example4" },
      { name: "Technical & Fundamental Analysis", pdf: "/path/to/Tech_Fundamental_Analysis.pdf", video: "https://www.youtube.com/watch?v=different_example4" },
      { name: "Stock Trading Strategies", pdf: "/path/to/Stock_Trading_Strategies.pdf", video: "https://www.youtube.com/watch?v=example5" },
      { name: "Risk Management in Stock Trading", pdf: "/path/to/Risk_Management.pdf", video: "https://www.youtube.com/watch?v=another_example5" },
      { name: "Stock Market Indicators", pdf: "/path/to/Market_Indicators.pdf", video: "https://www.youtube.com/watch?v=different_example5" },
      { name: "Building a Stock Portfolio", pdf: "/path/to/Building_Stock_Portfolio.pdf", video: "https://www.youtube.com/watch?v=example6" },
      { name: "Analyzing Financial Statements", pdf: "/path/to/Analyzing_Financial_Statements.pdf", video: "https://www.youtube.com/watch?v=example7" },
      { name: "Options Trading Basics", pdf: "/path/to/Options_Trading_Basics.pdf", video: "https://www.youtube.com/watch?v=different_example6" },
      { name: "Advanced Technical Analysis", pdf: "/path/to/Advanced_Tech_Analysis.pdf", video: "https://www.youtube.com/watch?v=another_example6" }
    ],
    
    learningOutcomes: [
      "Gain a strong understanding of stock market operations",
      "Learn to read and analyze stock charts",
      "Apply technical and fundamental analysis to make informed decisions",
      "Create a personalized trading strategy"
    ],
    requirements: [
      "Basic knowledge of finance",
      "Interest in stock markets",
      "A desire to learn technical analysis"
    ],
    instructorProfile: {
      name: "Meena Iyer",
      role: "Stock Market Expert, Instructor",
      image: "https://static.vecteezy.com/system/resources/thumbnails/043/501/669/small_2x/confident-indian-woman-in-professional-attire-posing-for-portrait-photo.jpg",
      linkedIn: "https://www.linkedin.com/in/meenaiyer",
      github: "https://github.com/meenaiyer",
    },
    category: "Finance",
    brand: "Ruthenix",
    badge: "Trending",
  },
  {
    id: 5,
    name: "📢 Digital Marketing Pro",
    tagline: "📈 Become a digital marketing strategist with real-world skills.",
    image: course5,
    instructor: "Ravi Sharma",
    rating: 4.6,
    students: "1200+",
    duration: 45,
    price: "₹35,000",
    discountedPrice: "₹29,999",
    originalPrice: "₹35,000",
    syllabus: [
      { name: "SEO & SEM", pdf: "/path/to/SEO_SEM.pdf", video: "https://www.youtube.com/watch?v=digital_marketing" },
      { name: "Social Media Campaigns", pdf: "/path/to/Social_Media.pdf", video: "https://www.youtube.com/watch?v=social_campaign" },
      { name: "Google Ads & Analytics", pdf: "/path/to/Google_Ads.pdf", video: "https://www.youtube.com/watch?v=google_ads" },
      { name: "Content Marketing Strategies", pdf: "/path/to/Content_Marketing.pdf", video: "https://www.youtube.com/watch?v=content_marketing" },
      { name: "Email Marketing Campaigns", pdf: "/path/to/Email_Marketing.pdf", video: "https://www.youtube.com/watch?v=email_marketing" },
      { name: "Affiliate Marketing", pdf: "/path/to/Affiliate_Marketing.pdf", video: "https://www.youtube.com/watch?v=affiliate_marketing" },
      { name: "Influencer Marketing", pdf: "/path/to/Influencer_Marketing.pdf", video: "https://www.youtube.com/watch?v=influencer_marketing" },
      { name: "Brand Building & Strategy", pdf: "/path/to/Brand_Strategy.pdf", video: "https://www.youtube.com/watch?v=brand_building" },
      { name: "Google My Business", pdf: "/path/to/Google_My_Business.pdf", video: "https://www.youtube.com/watch?v=google_my_business" },
      { name: "Conversion Rate Optimization", pdf: "/path/to/Conversion_Rate_Optimization.pdf", video: "https://www.youtube.com/watch?v=conversion_rate" }
    ],
    
    learningOutcomes: [
      "Design impactful digital campaigns",
      "Use SEO/SEM to drive traffic",
      "Analyze performance using analytics tools"
    ],
    requirements: [
      "Internet access",
      "Basic marketing knowledge"
    ],
    instructorProfile: {
      name: "Ravi Sharma",
      role: "Digital Marketing Expert",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      linkedIn: "https://www.linkedin.com/in/ravisharma",
      github: "https://github.com/ravisharma"
    },
    category: "Marketing",
    brand: "Ruthenix",
    badge: "Trending",
  },
  {
    id: 6,
    name: "📚 Business Accounting Basics",
    tagline: "🧾 Master the fundamentals of financial statements & accounting tools.",
    image: course6,
    instructor: "Neha Agarwal",
    rating: 4.5,
    students: "600+",
    duration: 30,
    price: "₹25,000",
    discountedPrice: "₹19,999",
    originalPrice: "₹25,000",
    syllabus: [
      { name: "Introduction to Accounting", pdf: "/path/to/Accounting_Basics.pdf", video: "https://www.youtube.com/watch?v=accounting_intro" },
      { name: "Balance Sheets & P&L", pdf: "/path/to/Balance_Sheets.pdf", video: "https://www.youtube.com/watch?v=balance_sheet" },
      { name: "Tally & Excel for Finance", pdf: "/path/to/Tally_Excel.pdf", video: "https://www.youtube.com/watch?v=tally_excel" },
      { name: "Cash Flow Management", pdf: "/path/to/Cash_Flow.pdf", video: "https://www.youtube.com/watch?v=cash_flow" },
      { name: "Financial Statements Analysis", pdf: "/path/to/Financial_Statements.pdf", video: "https://www.youtube.com/watch?v=financial_analysis" },
      { name: "Cost Accounting & Budgeting", pdf: "/path/to/Cost_Accounting.pdf", video: "https://www.youtube.com/watch?v=cost_accounting" },
      { name: "Taxation & Tax Planning", pdf: "/path/to/Taxation.pdf", video: "https://www.youtube.com/watch?v=taxation_planning" },
      { name: "Financial Forecasting", pdf: "/path/to/Financial_Forecasting.pdf", video: "https://www.youtube.com/watch?v=financial_forecasting" },
      { name: "Investment Analysis & Portfolio Management", pdf: "/path/to/Investment_Analysis.pdf", video: "https://www.youtube.com/watch?v=investment_analysis" },
      { name: "Financial Risk Management", pdf: "/path/to/Risk_Management.pdf", video: "https://www.youtube.com/watch?v=financial_risk" }
    ],
    
    learningOutcomes: [
      "Understand balance sheets & ledgers",
      "Handle business accounting with Tally/Excel",
      "Read and analyze financial statements"
    ],
    requirements: [
      "Interest in finance/accounting",
      "Basic computer skills"
    ],
    instructorProfile: {
      name: "Neha Agarwal",
      role: "Chartered Accountant",
      image: "https://randomuser.me/api/portraits/women/47.jpg",
      linkedIn: "https://www.linkedin.com/in/nehaagarwal",
      github: "https://github.com/nehaagarwal"
    },
    category: "Finance",
    brand: "Ruthenix",
    badge: "Beginner",
  },
  {
    id: 7,
    name: "🔍 Software Testing Foundations",
    tagline: "🧪 Learn Manual & Automation Testing with real-world tools.",
    image: course7,
    instructor: "Amit Kapoor",
    rating: 4.4,
    students: "900+",
    duration: 35,
    price: "₹42,000",
    discountedPrice: "₹35,000",
    originalPrice: "₹42,000",
    syllabus: [
      { name: "Manual Testing Basics", pdf: "/path/to/Manual_Testing.pdf", video: "https://www.youtube.com/watch?v=manual_testing" },
      { name: "Selenium Automation", pdf: "/path/to/Selenium.pdf", video: "https://www.youtube.com/watch?v=selenium_tutorial" },
      { name: "Bug Reporting & Tools", pdf: "/path/to/Bug_Reporting.pdf", video: "https://www.youtube.com/watch?v=bug_reporting" },
      { name: "Test Case Design & Execution", pdf: "/path/to/Test_Case_Design.pdf", video: "https://www.youtube.com/watch?v=test_case_design" },
      { name: "Performance Testing with JMeter", pdf: "/path/to/JMeter_Performance_Testing.pdf", video: "https://www.youtube.com/watch?v=jmeter_performance_testing" },
      { name: "API Testing with Postman", pdf: "/path/to/Postman_API_Testing.pdf", video: "https://www.youtube.com/watch?v=postman_api_testing" },
      { name: "Continuous Integration & Testing", pdf: "/path/to/CI_Testing.pdf", video: "https://www.youtube.com/watch?v=ci_testing" },
      { name: "Test Automation Frameworks", pdf: "/path/to/Automation_Frameworks.pdf", video: "https://www.youtube.com/watch?v=automation_frameworks" },
      { name: "Agile Testing Practices", pdf: "/path/to/Agile_Testing.pdf", video: "https://www.youtube.com/watch?v=agile_testing" },
      { name: "Mobile App Testing", pdf: "/path/to/Mobile_App_Testing.pdf", video: "https://www.youtube.com/watch?v=mobile_app_testing" }
    ],
    
    learningOutcomes: [
      "Perform test case design and execution",
      "Automate testing using Selenium",
      "Track bugs using Jira & test management tools"
    ],
    requirements: [
      "Basic programming understanding",
      "Interest in QA and software reliability"
    ],
    instructorProfile: {
      name: "Amit Kapoor",
      role: "QA Engineer",
      image: "https://randomuser.me/api/portraits/men/49.jpg",
      linkedIn: "https://www.linkedin.com/in/amitkapoor",
      github: "https://github.com/amitkapoor"
    },
    category: "Testing",
    brand: "Ruthenix",
    badge: "Popular",
  },
  {
    id: 8,
    name: "📊 Data Analytics with Excel & Power BI",
    tagline: "📈 Turn raw data into business insights.",
    image: course8,
    instructor: "Sonal Mehta",
    rating: 4.9,
    students: "1100+",
    duration: 40,
    price: "₹38,000",
    discountedPrice: "₹32,999",
    originalPrice: "₹38,000",
    syllabus: [
      { name: "Excel for Data Analysis", pdf: "/path/to/Excel_Analysis.pdf", video: "https://www.youtube.com/watch?v=excel_analytics" },
      { name: "Power BI Dashboarding", pdf: "/path/to/PowerBI.pdf", video: "https://www.youtube.com/watch?v=powerbi" },
      { name: "Data-Driven Decisions", pdf: "/path/to/Data_Decisions.pdf", video: "https://www.youtube.com/watch?v=data_decision" },
      { name: "Advanced Excel Techniques", pdf: "/path/to/Advanced_Excel.pdf", video: "https://www.youtube.com/watch?v=advanced_excel" },
      { name: "SQL for Data Analysis", pdf: "/path/to/SQL_Data_Analysis.pdf", video: "https://www.youtube.com/watch?v=sql_for_analysis" },
      { name: "Data Visualization with Tableau", pdf: "/path/to/Tableau_Visualization.pdf", video: "https://www.youtube.com/watch?v=tableau_visualization" },
      { name: "Predictive Analytics with R", pdf: "/path/to/R_Predictive_Analytics.pdf", video: "https://www.youtube.com/watch?v=r_predictive_analytics" },
      { name: "Data Cleaning and Preparation", pdf: "/path/to/Data_Cleaning_Preparation.pdf", video: "https://www.youtube.com/watch?v=data_cleaning" },
      { name: "Machine Learning with Python", pdf: "/path/to/Machine_Learning_Python.pdf", video: "https://www.youtube.com/watch?v=python_machine_learning" },
      { name: "Big Data Analysis with Hadoop", pdf: "/path/to/Hadoop_Big_Data.pdf", video: "https://www.youtube.com/watch?v=hadoop_big_data" }
    ],
    
    learningOutcomes: [
      "Use Excel for sorting, filtering, and pivoting data",
      "Create dashboards using Power BI",
      "Present findings to stakeholders effectively"
    ],
    requirements: [
      "Access to MS Excel & Power BI",
      "Interest in analytics"
    ],
    instructorProfile: {
      name: "Sonal Mehta",
      role: "BI Analyst",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      linkedIn: "https://www.linkedin.com/in/sonalmehta",
      github: "https://github.com/sonalmehta"
    },
    category: "Analytics",
    brand: "Ruthenix",
    badge: "New",
  },
];

export default courseData;
