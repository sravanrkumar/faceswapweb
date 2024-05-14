export const PATH = {
  HOME: { path: "/", name: "Home" },
  PERSONAL_SETTINGS: {
    path: "/my-profile/personal-settings",
    name: "Personal Settings",
  },
  MY_PROFILE: { path: "/my-profile/personal-settings", name: "My Profile" },
  CHANGE_PASSWORD: {
    path: "/my-profile/change-passwords",
    name: "Change Password",
  },
  SUBSCRIPTION: {
    name: "Subscription (opens Stripe)",
    dropdownName: "Subscription Settings",
    path: (customerEmail?: string) =>
      `${process.env.NEXT_PUBLIC_XDS_STRIPE_CUSTOMER_PORTAL_LINK}?prefilled_email=${customerEmail}`,
  },
  COMPANY_PROFILE: {
    path: "/company-profile/general-info",
    name: "Company Profile",
  },
  GENERAL_INFO: { path: "/company-profile/general-info", name: "General Info" },
  OUR_WORK: { path: "/company-profile/our-work", name: "Our Work" },
  CERTIFICATIONS_DILIGENCE: {
    path: "/company-profile/certifications-deligence",
    name: "Certifications & Diligence",
  },
  ABOUT: { path: "/company-profile/about", name: "About" },
  CONTACT: { path: "/company-profile/contact", name: "Contact" },
  REVIEW_PUBLISH: {
    path: "/company-profile/review-publish",
    name: "Review & Publish",
  },
  LOGIN: { path: "/login", name: "Login" },
  ADMIN: { path: "/admin", name: "admin" },
  CategoryList: { path: "/admin/category", name: "Category" },
  AddCategory: { path: "/admin/add-category", name: "Add Category" },
  TemplateList: { path: "/admin/template", name: "Template" },
  AddTemplate: { path: "/admin/add-template", name: "Add Template" },
  TagList: { path: "/admin/tag", name: "Tag" },
  Addtag: { path: "/admin/add-tag", name: "Add Tag" },
  UsersList: { path: "/admin/users", name: "Admin" },
  TemplateFeedbackList: {
    path: "/admin/template-feedback",
    name: "Template User Feedback",
  },
  MostActiveUsers: {
    path: "/admin/most-active-users",
    name: "Most Active Users",
  },
  MostUsedTemplates: {
    path: "/admin/most-used-templates",
    name: "Most Used Templates",
  },
  ADMINHOME: { path: "/admin/users", name: "Home" },
  AdddAdmin: { path: "/admin/admin-registration", name: "Add Admin" },
  App: { path: "/admin/app", name: "App" },
  AddApp: { path: "/admin/add-app", name: "Add App" },
};
