import AdminNonExistingClaim from "./src/components/Admin/AdminNonExistingClaim";

// constants.js
const content = {
    hero: {
      title: "Lost something at Strathmore?",
      subTitle: "Reclaim it here!",
      description: "Reuniting Lost Treasures with Their Owners",
      buttonLabel: "View lost items",
    },
    topper: "Our Services",
    statistics:[
      {
        number:"200+",
        description:"Items lost daily"
      },
      {
        number:"200+",
        description:"items recovered"
      },
      {
        number:"50+",
        description:"lost student id's"
      },
      {
        number:"50+",
        description:"Claims each day"
      },
      

    ],
    
    servicesData: [
      
      {
        icon: '/search.svg',
        title: "Search",
        description: "Search your item in the recovery section.",
      },
      {
        icon: '/claim.svg',
        title: "Claim",
        description: "Click Claim and fill the form given.",
      },
      {
        icon: '/claim.svg',
        title: "Receive",
        description: "You will receive an email to come for your item.",
      }
    ],
    communityHelpData:{
        title:"Help our community recover",
        semititle:"lost item.",
        icon:"/school.svg",
        subtitle:"Help Strathmore University recover lost items.",
        buttonLabel:"Post item",
    },
    faqData:{
        topper:"Frequently asked questions",
        title:"Did not find your answer in the FAQ?",
        subtitle:"Write it here",
        semititle:" Ask a new question: ",
        buttonLabel:"Add Question"
    },
    Links: [
        { name: "Home", link: "/" },
        { name: "Browse Items", link: "/home" },
        { name: "FAQ", link: "/faq" },
      ],
    NavProfile:[
      { name: "Browse Items", link: "/home" },
      { name: "Post Item", link: "/home/post" },
      { name: "Non-existing Claim", link: "/nonexisting-claim" },
      { name: "History", link: "/home/myHistory" },
    ],
    AmdinNavProfile:[
      {name:"Claims", link:"/admin"},
      { name: "Browse Items", link: "/home" },
      { name: "Post Item", link: "/home/post" },
      { name: "Non-existing Claim", link: "/Adminnon-existingClaim" },
      { name: "User Dashboard", link: "/home/dashboard/user" },
      {name:"Faq Dashboard", link:"/home/dashboard/faq"},
      {name:"Statistics Dashboard", link:"/home/dashboard/statistics"},
    ],
    login:{
      title:"Sign In",
      email:"Email",
      password:"Password",
      action1:"Don't have an account?",
      buttonLabel:"Sign In",
      result1:"Sign Up",
      action2:"Forgot Password?",
      result2:"Reset password"
    },
    register:{
      title:"Sign Up",
      fullName:"Full Name",
      email:"Email",
      password:"Password",
      PhoneNumber:"Phone Number",
      buttonLabel:"Sign Up",
      action:"Already have an account?",
      result:"Sign In."
    },
    home:{
      postTitle:"Posted By: ",
      itemTitle:"Item name: ",
      descriptionTitle:"Description: ",
      categoryTitle:"Category: ",
      noItemsTitle:"No items yet"
    },
    post:{
      itemTitle:"Item name",
      locationTitle:"Item location",
      dateTitle:"Date",
      imageTitle:"Image",
      descriptionTitle:"Description",
      categoryTitle:"Category",
      postLabel:"Post item",
    },
    NonExistingClaim:{
      title:"How to make a non existing claim?",
      one:"1",
      stepOne:"This process only is for individuals who cannot find their items in the browsing section",
      two:"2",
      stepTwo:"Fill in the details for the item you lost",
      three:"3",
      stepThree:"Click the claim button and we will make sure we find your item",
      itemTitle:"Item name",
      locationTitle:"Item location",
      dateTitle:"Date",
      imageTitle:"Image Proof",
      descriptionTitle:"Description",
      categoryTitle:"Category",
      claimLabel:"Make a claim",
      action:"Wanna Make another claim?",
      result:"Visit Home"
    },
    AdminNonExistingClaim:{
      claimTitle:"Claimed by: ",
      itemTitle:"Item name: ",
      claimIdTitle:"Claime ID: ",
      descriptionTitle:"Description Proof: ",
      categoryTitle:"Category: ",
      locationTitle:"Location: ",
      statusTitle:"Status: ",
      claimButton:"Claim",
      rejectButton:"Reject",
      deleteButton:"Delete"
    },
    AdminPanel:{
      postTitle:"Posted By: ",
      itemTitle:"Lost item: ",
      itemId:"Lost item id: ",
      descriptionTitle:"Description: ",
      categoryTitle:"Category: ",
      dateTitle:"Lost date: ",
      locationDate:"Location: "
    }

  };
  
  export default content;
  