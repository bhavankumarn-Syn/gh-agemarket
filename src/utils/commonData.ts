import { Images } from "../Pages/utils";

const version = new Date().getTime();


export const PAGE_SIZE = 10;

export const industryOptions = [
    { label: "General", value: "general" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Finance", value: "finance" },
    { label: "E-commerce", value: "e-commerce" },
    { label: "Insurance", value: "insurance" },
    { label: "Retail", value: "retail" },
];
export const assetTypeOptions = [
    { label: "Avatar", value: "avatar" },
    { label: "Skill", value: "skill" },
    { label: "Agent", value: "agent" },
    { label: "Model", value: "model" },
    // { label: "Data", value: "data" },
    { label: "Workflow", value: "workflow" },
    { label: "Wearable", value: "wearable" },
];

  

export const avatarData = [
  {
    id: 1,
    name: "Veronica",
    category: 'Avatar',
    img: Images.varonicaImg,
    description: "Trained to offer guidance on mental health, addressing self-esteem, trauma, and personal goal achievement.",
    url: `https://web-3d-player-stg.synergetics.ai/?wid=5221b961-7906-4079-86ac-dc0d2eb74845&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NjYyY2JjYTRkNmJkZmQwMzQyOWE3MGIiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY5NjY4NSwiZXhwIjoxNzIzNzgzMDg1LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0IzQkJwcVp3SXFYcWRja28iLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.kv6LLsfxnRrfeRUZHjzRR66Y9GkDw97ctITFN7C6M_QrKZbWmp2Qa_ngQBRO8NpWDi72efMRZl1gFqfd2iSTAcPzCZlM1l2_ExWNuBKbVWcuXGp6T5ojP2HuHt1dpb7N-SVfkHjC1wLWaqTatfxGPbctvs33IVAKMJkOSVdn1TsME-igh_QJJXizvszCby8Ai_2NZwcMwqF_CDT20ad1msjrwaU4VZu-Ej1rW9so8F-IAPD1eIXagHaExFbIVbNTSU-uOU8gMpWitBlXVMN7q_abfVJcVDTvjTYqCJPsFHCBj7oeYou9typF2WKcOIkvB2K9D4eubjI67xRNfCdrLw&avatarAssetId=843d2d44-1e25-42e8-a630-17c78c6992ac&v=${version}`,
  },
  {
    id: 2,
    name: "Donna",
    category: 'Avatar',
    img: Images.DoctorDona,
    url: `https://web-3d-player-stg.synergetics.ai/?wid=32e45295-6bdb-4d4f-9487-160c203671a9&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NjYyY2JjYTRkNmJkZmQwMzQyOWE3MGIiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY5NjY4NSwiZXhwIjoxNzIzNzgzMDg1LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0IzQkJwcVp3SXFYcWRja28iLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.kv6LLsfxnRrfeRUZHjzRR66Y9GkDw97ctITFN7C6M_QrKZbWmp2Qa_ngQBRO8NpWDi72efMRZl1gFqfd2iSTAcPzCZlM1l2_ExWNuBKbVWcuXGp6T5ojP2HuHt1dpb7N-SVfkHjC1wLWaqTatfxGPbctvs33IVAKMJkOSVdn1TsME-igh_QJJXizvszCby8Ai_2NZwcMwqF_CDT20ad1msjrwaU4VZu-Ej1rW9so8F-IAPD1eIXagHaExFbIVbNTSU-uOU8gMpWitBlXVMN7q_abfVJcVDTvjTYqCJPsFHCBj7oeYou9typF2WKcOIkvB2K9D4eubjI67xRNfCdrLw&avatarAssetId=cf5d01d9-8364-4188-8a31-1bfe9bc59452&v=${version}`,
    description: "Trained as a medical advisor, offering guidance on health concerns, including symptoms, vaccinations, and fitness routines.",
  },
  {
    id: 3,
    name: "Barabara Miller",
    category: 'Avatar',
    img: Images.BarabaraMiller,
    url: `https://web-3d-player-stg.synergetics.ai/?wid=6937ced4-ed58-41f9-a411-cb9957af5440&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NmFjYzdmMDMyYTY5ZTBjMjc2NjgyYTAiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY1NTE3MywiZXhwIjoxNzIzNzQxNTczLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0p3M01hMDczeDNOTUdkWFQiLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.Bc-EEuF5lrtPdQQvpuJkv-wYzQKRlYOtQq-wVwwSbtv2WilldkSbHcHwoCLsfocLCUAftOG7V6mvISocLzGWZDnhGr0Cu07zWtC9mHoVsDuLSIIcdkcg-HGjUvd_2TrIbyaXnBwwQrpb9iyjcTxwktfHgxG4RpwLPBATvSyPREk4hHK7HTAnDKWCgwhAUBYXGr6TTWgSh3v-oBmCjITLMQVSq8Yv2FiPbtn-oSyf_KGxnBB2lIkQRKWlk9bak739pMzIEQdlkGm3hBp67h8Sezz_0jOTopfaggOcO7gy-KCX-eG8kfq7JY8JyB6uicEG-Xa4ji9CkCXgLLda_PliRQ&avatarAssetId=c1233edb-2f84-4201-ae16-40af1ba41530&v=${version}`,
    description: "Trained in wealth management, offering advice on investment strategies, retirement savings, and tax minimization.",
  },
  {
    id: 4,
    name: "Allen",
    category: 'Avatar',
    img: Images.AllenArchitect,
    url: `https://web-3d-player-stg.synergetics.ai/?wid=de5ab1f8-333e-4f43-8c58-e73084fb2890&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NjYyY2JjYTRkNmJkZmQwMzQyOWE3MGIiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY5NjY4NSwiZXhwIjoxNzIzNzgzMDg1LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0IzQkJwcVp3SXFYcWRja28iLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.kv6LLsfxnRrfeRUZHjzRR66Y9GkDw97ctITFN7C6M_QrKZbWmp2Qa_ngQBRO8NpWDi72efMRZl1gFqfd2iSTAcPzCZlM1l2_ExWNuBKbVWcuXGp6T5ojP2HuHt1dpb7N-SVfkHjC1wLWaqTatfxGPbctvs33IVAKMJkOSVdn1TsME-igh_QJJXizvszCby8Ai_2NZwcMwqF_CDT20ad1msjrwaU4VZu-Ej1rW9so8F-IAPD1eIXagHaExFbIVbNTSU-uOU8gMpWitBlXVMN7q_abfVJcVDTvjTYqCJPsFHCBj7oeYou9typF2WKcOIkvB2K9D4eubjI67xRNfCdrLw&avatarAssetId=a08e64e1-2764-4b40-bc65-67711dc3bca3&v=${version}`,
    description: "Trained in architecture, providing tips on design trends, maximizing natural light, and budgeting for construction projects.",
  },
  {
    id: 5,
    name: "Jayden Williams",
    type: "Student Loan Agent",
    category: 'Avatar',
    img: Images.JaydenWilliams,
    url: `https://web-3d-player-stg.synergetics.ai/?wid=9e82f1d3-49c9-4a48-975d-35656753df2b&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NmFjYzdmMDMyYTY5ZTBjMjc2NjgyYTAiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY1NTE3MywiZXhwIjoxNzIzNzQxNTczLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0p3M01hMDczeDNOTUdkWFQiLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.Bc-EEuF5lrtPdQQvpuJkv-wYzQKRlYOtQq-wVwwSbtv2WilldkSbHcHwoCLsfocLCUAftOG7V6mvISocLzGWZDnhGr0Cu07zWtC9mHoVsDuLSIIcdkcg-HGjUvd_2TrIbyaXnBwwQrpb9iyjcTxwktfHgxG4RpwLPBATvSyPREk4hHK7HTAnDKWCgwhAUBYXGr6TTWgSh3v-oBmCjITLMQVSq8Yv2FiPbtn-oSyf_KGxnBB2lIkQRKWlk9bak739pMzIEQdlkGm3hBp67h8Sezz_0jOTopfaggOcO7gy-KCX-eG8kfq7JY8JyB6uicEG-Xa4ji9CkCXgLLda_PliRQ&avatarAssetId=426d0948-2f76-4886-8bf1-6c70e9fa8aea&v=${version}`,
    description: "Trained in student loans, providing insights on loan types, application processes, and interest rates.",
  },
  {
    id: 6,
    name: "Jackie Wu",
    type: "Corporate Bank Agent",
    category: 'Avatar',
    img: Images.JackieWu,
    url: `https://web-3d-player-stg.synergetics.ai/?wid=5c942767-9299-4223-996e-7b515a3e91da&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NmFjYzdmMDMyYTY5ZTBjMjc2NjgyYTAiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY1NTE3MywiZXhwIjoxNzIzNzQxNTczLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0p3M01hMDczeDNOTUdkWFQiLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.Bc-EEuF5lrtPdQQvpuJkv-wYzQKRlYOtQq-wVwwSbtv2WilldkSbHcHwoCLsfocLCUAftOG7V6mvISocLzGWZDnhGr0Cu07zWtC9mHoVsDuLSIIcdkcg-HGjUvd_2TrIbyaXnBwwQrpb9iyjcTxwktfHgxG4RpwLPBATvSyPREk4hHK7HTAnDKWCgwhAUBYXGr6TTWgSh3v-oBmCjITLMQVSq8Yv2FiPbtn-oSyf_KGxnBB2lIkQRKWlk9bak739pMzIEQdlkGm3hBp67h8Sezz_0jOTopfaggOcO7gy-KCX-eG8kfq7JY8JyB6uicEG-Xa4ji9CkCXgLLda_PliRQ&avatarAssetId=b5e3fc57-2720-4119-b825-7b6ae2347550&v=${version}`,
    description: "Trained to assist with corporate banking, covering account types, application requirements, and business loans.",
  },
  {
    id: 7,
    name: "Isabella Rodriguez",
    category: 'Avatar',
    img: Images.IsabellaRodriguez,
    url: `https://web-3d-player-stg.synergetics.ai/?wid=9e82f1d3-49c9-4a48-975d-35656753df2b&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NmFjYzdmMDMyYTY5ZTBjMjc2NjgyYTAiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY1NTE3MywiZXhwIjoxNzIzNzQxNTczLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0p3M01hMDczeDNOTUdkWFQiLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.Bc-EEuF5lrtPdQQvpuJkv-wYzQKRlYOtQq-wVwwSbtv2WilldkSbHcHwoCLsfocLCUAftOG7V6mvISocLzGWZDnhGr0Cu07zWtC9mHoVsDuLSIIcdkcg-HGjUvd_2TrIbyaXnBwwQrpb9iyjcTxwktfHgxG4RpwLPBATvSyPREk4hHK7HTAnDKWCgwhAUBYXGr6TTWgSh3v-oBmCjITLMQVSq8Yv2FiPbtn-oSyf_KGxnBB2lIkQRKWlk9bak739pMzIEQdlkGm3hBp67h8Sezz_0jOTopfaggOcO7gy-KCX-eG8kfq7JY8JyB6uicEG-Xa4ji9CkCXgLLda_PliRQ&avatarAssetId=30a081c2-8a0a-4430-aadd-e09aa7625765&v=${version}`,
    info: "I am trained on Student Loans",
    description: "Trained in student loans, providing insights on loan types, application processes, and interest rates.",
  },
  {
    id: 8,
    name: 'Agent Zak',
    category: 'Voice',
    img: Images.voiceIcon,
    description: "Automates insurance verification & medical codin",
    url: ""
  },
  {
    id: 9,
    name: "William Davis",
    category: 'Avatar',
    img: Images.williams,
    description: "Trained in wealth management, offering advice on investment strategies, retirement savings, and tax minimization.",
    url: `https://web-3d-player-stg.synergetics.ai/?wid=6937ced4-ed58-41f9-a411-cb9957af5440&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NmFjYzdmMDMyYTY5ZTBjMjc2NjgyYTAiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY1NTE3MywiZXhwIjoxNzIzNzQxNTczLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0p3M01hMDczeDNOTUdkWFQiLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.Bc-EEuF5lrtPdQQvpuJkv-wYzQKRlYOtQq-wVwwSbtv2WilldkSbHcHwoCLsfocLCUAftOG7V6mvISocLzGWZDnhGr0Cu07zWtC9mHoVsDuLSIIcdkcg-HGjUvd_2TrIbyaXnBwwQrpb9iyjcTxwktfHgxG4RpwLPBATvSyPREk4hHK7HTAnDKWCgwhAUBYXGr6TTWgSh3v-oBmCjITLMQVSq8Yv2FiPbtn-oSyf_KGxnBB2lIkQRKWlk9bak739pMzIEQdlkGm3hBp67h8Sezz_0jOTopfaggOcO7gy-KCX-eG8kfq7JY8JyB6uicEG-Xa4ji9CkCXgLLda_PliRQ&avatarAssetId=5bb133fa-2fbe-4687-a25c-3462f993b491&v=${version}`,

  },
  {
    id: 10,
    name: 'Agent Neo',
    category: 'Chat',
    img: Images.chatIcon,
    description: "Automates insurance verification & medical codin",
    url: ""
  },
  {
    id: 11,
    name: 'Martina Hernandez', 
    category: 'Avatar',
    img: Images.MartinaHernandez,
    description: "Trained to assist with corporate banking, covering account types, application requirements, and business loans.",
    url: `https://web-3d-player-stg.synergetics.ai/?wid=5c942767-9299-4223-996e-7b515a3e91da&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJIZVBrYXN3NDlBU2YyeGtUTWxhdiJ9.eyJpc3MiOiJodHRwczovL2lkLnN0Zy5zeW5lcmdldGljcy5haS8iLCJzdWIiOiJlbWFpbHw2NmFjYzdmMDMyYTY5ZTBjMjc2NjgyYTAiLCJhdWQiOlsiaHR0cHM6Ly93ZWJ0aWdhLWd3LmNvbS9kYW0iLCJodHRwczovL3VuaWZ5Z3B0LWlhbS1zdGcudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcyMzY1NTE3MywiZXhwIjoxNzIzNzQxNTczLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwib3JnX2lkIjoib3JnX0p3M01hMDczeDNOTUdkWFQiLCJhenAiOiJYM0hRYUtHWEpSU1RVSHdOdlJSMkdZZTJMRzllQm51cyIsInBlcm1pc3Npb25zIjpbXX0.Bc-EEuF5lrtPdQQvpuJkv-wYzQKRlYOtQq-wVwwSbtv2WilldkSbHcHwoCLsfocLCUAftOG7V6mvISocLzGWZDnhGr0Cu07zWtC9mHoVsDuLSIIcdkcg-HGjUvd_2TrIbyaXnBwwQrpb9iyjcTxwktfHgxG4RpwLPBATvSyPREk4hHK7HTAnDKWCgwhAUBYXGr6TTWgSh3v-oBmCjITLMQVSq8Yv2FiPbtn-oSyf_KGxnBB2lIkQRKWlk9bak739pMzIEQdlkGm3hBp67h8Sezz_0jOTopfaggOcO7gy-KCX-eG8kfq7JY8JyB6uicEG-Xa4ji9CkCXgLLda_PliRQ&avatarAssetId=7d8c4b56-042f-4c42-8627-1ebad8b0f7cd&v=${version}`,
  },
]


export const getPlanDisplayName = (type: string) => {
    switch (type?.toLowerCase()) {
        case "renting":
            return "Monthly";
        case "purchasing":
            return "One Time";
        case "freemium":
            return "Free";
        default:
            return type; // fallback (in case new values come)
    }
};