import API from "../../api/api"

const endpoints = {
  Teacher: "/user/teachers/",
  Student: "/user/students/",
  Governing: "/user/governing/",
  Office_Helper: "/user/office-helpers/",
};

export async function FetchProfessionalAccount(account_id) {
  for (const [role, url] of Object.entries(endpoints)) {
    try {
      const res = await API.get(url);
      const targetId = Number(account_id);
      const account = res.data.results.find(t => t.account.id === targetId);


      if (account) {
        return { account, role };
      }
    } catch (err) {
      console.error(`❌ Failed to fetch ${role}:`, err.message);
    }
  }

  console.warn("⚠️ No matching account found.");
  return null;
}
