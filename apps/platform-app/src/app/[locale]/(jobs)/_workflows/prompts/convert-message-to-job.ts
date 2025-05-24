export const convertMessageToJob = (
  technologies: string[],
  countries: string[],
) => `

<objective>
Transform the user's job request for an IT specialist into a JSON object matching the following structure:

\`\`\`json
{
  "taskName": "string",
  "projectBrief": "string",
  "technologies": ["string"],
  "budget": {
    "currency": "string|null",
    "min": "number|null",
    "max": "number|null"
  },
  "employmentDetails": {
    "contractType": "B2B" | "employment_contract" | "contract_for_specific_work" | "contract_of_mandate",
    "workTime":   "FULL_TIME" | "PART_TIME" | "CONTRACT",
    "workMode": "Stationary" | "Hybrid" | "Remote",
    "country": "string",
    "city": "string"
  }
}
\`\`\`

</objective>

<available-technologies>
${technologies
  .map((technology) => `<technology>${technology}</technology>`)
  .join('\n')}
</available-technologies>

<available-countries>
${countries.map((country) => `<country>${country}</country>`).join('\n')}
</available-countries>

<rules>
**Transformation Rules:**
- **taskName**: Should be short and clearly state the core service (e.g., "Website Development with SEO" instead of "I need a website"). IMPORTANT: taskName this field in the language of the user's message.
- **projectBrief**: AI MUST expand the brief, interpreting the job request context and adding relevant requirements, best practices, and challenges. The description should be as detailed as possible, covering:
  - Required functionalities
  - Potential technical challenges
  - Brief MUST always be formatted in valid markdown
  - Suggested best practices
  - Brief language MUST always be in the same language as the user's message.
- **technologies**: AI must use what user provided in message or propose technologies that will allow to solve the job based on the technologies available. If no proper technologies are available, propose technologies that are related to the job.
- **budget**: If no budget is mentioned, default values should be \`null\`.
- **employmentDetails**: AI must match the country mentioned in the user description to the provided list or return a default one. If the user does not provide specific employment details, use these default values:
  - contractType: "B2B"
  - workTime: "FULL_TIME" | "CONTRACT" | "PART_TIME"
  - workMode: "Remote"
  - country: "Poland",
  - city: "Warsaw"
  - ALWAYS set employmentDetails.workTime to "CONTRACT" as default when not specified by the user

**Additional Rules:**
- **Emails and phone numbers MUST be removed from the text.**
- **Links CAN be included in the \`projectBrief\`.**
- **AI should avoid vague responses** – every task must be described in a way that allows a potential contractor to estimate costs and scope efficiently.
</rules>
---

<examples>
### **Examples of Expected Behavior:**

#### **Example 1: Website Development with SEO**
##### **Input:**
> Hi,  
> I need a website with SEO implemented from the start.  
> A homepage connected to a simple portfolio, an online store with templates available for purchase, and links to other sites and social media. Open to suggestions.

##### **Output JSON:**
\`\`\`json
{
  "taskName": "Website Development with SEO",
  "projectBrief": "The project involves creating a website optimized for SEO from the start. The website should include:
  - A customizable homepage
  - A portfolio section for showcasing projects
  - An online store with templates available for purchase
  - Links to other websites and social media profiles
  - Potential additional features, such as a blog or newsletter integration  

  The website should be easy to manage, preferably using a CMS like WordPress or Shopify. SEO implementation should include optimized metadata, structured content, and fast loading speed.",
  "technologies": ["WordPress", "WooCommerce", "SEO"],
  "budget": {
    "currency": null,
    "min": null,
    "max": null
  },
  "employmentDetails": {
    "contractType": "B2B",
    "workTime": "CONTRACT",
    "workMode": "Remote",
    "country": "Poland"
    "city": "Warsaw"
  }
}
\`\`\`

---

#### **Example 2: Shopify Store Modifications**
##### **Input:**
> Looking for a Shopify expert to tweak a few things in my store.

##### **Output JSON:**
\`\`\`json
{
  "taskName": "Shopify Store Customization",
  "projectBrief": "Seeking an experienced Shopify developer to make modifications to an existing store. The required changes may include:
  - Customizing the theme and layout
  - Adjusting product display settings
  - Enhancing checkout functionality
  - Optimizing the store for performance and user experience  

  Specific details of required changes will be provided upon discussion.",
  "technologies": ["Shopify"],
  "budget": {
    "currency": null,
    "min": null,
    "max": null
  },
  "employmentDetails": {
    "contractType": "B2B",
    "workTime": "CONTRACT",
    "workMode": "Remote",
    "country": "Poland"
    "city": "Warsaw"
  }
}
\`\`\`

---

#### **Example 3: Web Scraping for Real Estate Data**
##### **Input:**
> Hi,  
> I'm looking for someone who can extract data from [https://przegladarka-ekw.ms.gov.pl/](https://przegladarka-ekw.ms.gov.pl/) for all apartments in a building.  
> The process can be automated, but previous solutions I received were either too expensive or unsatisfactory.

##### **Output JSON:**
\`\`\`json
{
  "taskName": "Automated Data Extraction from Real Estate Registry",
  "projectBrief": "The task involves developing an automated solution for extracting property information from the government real estate registry. Requirements include:
  - Extracting relevant details from https://przegladarka-ekw.ms.gov.pl/
  - Handling multiple buildings (50-200 apartments per building)
  - Storing the extracted data in a structured format (CSV, JSON, or database)
  - Avoiding IP bans (e.g., implementing request delays or proxy support)  

  The previous solutions were either too expensive or inefficient, so optimization in terms of both performance and cost is required.",
  "technologies": ["Python", "Selenium"],
  "budget": {
    "currency": null,
    "min": null,
    "max": null
  },
  "employmentDetails": {
    "contractType": "B2B",
    "workTime": "CONTRACT",
    "workMode": "Remote",
    "country": "Poland"
    "city": "Warsaw"
  }
}
\`\`\`

---

#### **Example 4: Avoiding AI Mistakes (Incorrect Tech Stack)**
##### **Input:**
> Looking for someone who knows websites and online stores, can tweak the code, optimize loading speed, and improve site performance.

##### **Incorrect Output JSON (AI mistake, should NOT happen):**
\`\`\`json
{
  "taskName": "Website and Store Optimization",
  "projectBrief": "Need a developer to optimize website and store performance.",
  "technologies": ["React", "Vercel", "Ruby on Rails"], // ❌ Incorrect – AI invented technologies
  "budget": {
    "currency": null,
    "min": null,
    "max": null
  },
  "employmentDetails": {
    "contractType": "B2B",
    "workTime": "FULL_TIME",
    "workMode": "Remote",
    "country": "Poland"
    "city": "Warsaw"
  }
}
\`\`\`
✅ **AI should NOT generate technologies outside the given list.**
</examples>
`
