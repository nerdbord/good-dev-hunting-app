<h1 align="center">
    <img src="/src/assets/images/logo.png" alt="Logo Good Dev Hunting">
    Good Dev Hunting
</h1>
<h3 align="center">
    Free, open sourced platform for connecting software engineers with tech projects. 
</h3>
<p align="center">
    <img src="/src/assets/images/Screenshot.png" alt="Good Dev Hunting Screenshot">
</p>
<h3>
    Good Dev Hunting – Bridging the Tech World
</h3>

<p>
    Good Dev Hunting is a unique platform connecting skilled software engineers with those in need of tech talent. Using modern technologies like Next.js, Typescript, Prisma, and PostgreSQL, we aim to facilitate efficient, intuitive connections between companies and developers.
</p>

---

### Key Features ✨

* <b>User-Friendly Interface:</b> A clear and intuitive design for easy navigation.
* <b>Advanced Filtering:</b> Sort candidates by technology, seniority, availability, location, and skill area.
* <b>Customizable Developer Profiles:</b> 1500-character BIOs allowing developers to showcase their unique skills and experiences.
* <b>Direct Communication:</b> Engage with developers directly through the platform.
* <b>Seamless Integration:</b> GitHub login for easy access and profile integration.
* <b>Professional Networking:</b> Direct links to GitHub and LinkedIn profiles.
* <b>Portfolio Showcase:</b> Integration with Nerdbord for a comprehensive view of developer skills and projects.

---

### Technologies Used 🛠️

* Next.js - A React framework for production (v14.0.1)
* Prisma - Next-gen ORM for Node.js & TypeScript (v4.15.0)
* Formik - Building forms in React, without tears (v2.4.2)
* MailerLite - Advanced email marketing platform (v1.2.0)

---
### Setup Instructions 🛠️

1. Install dependencies with `npm install`.
2. Setup the PostgreSQL database and update the `prisma/.env` file with your database credentials.
3. Run `npx prisma migrate dev` to apply the database schema.
4. Run `npm run dev` to start the development server.

---

### Coding Conventions 📏

- We follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Consistency is key; we use Prettier and ESLint for code formatting and linting.

---

### Testing 🧪

- Our testing suite includes Jest and React Testing Library.
- To run tests, use the command `npm run test`.

---

### Deployment 🚀

- The project is deployed using Vercel, ensuring smooth and continuous integration.

---

### Project Documentation 📚

#### Branch Management and Merge:

- Each task should have its own branch in the Git repository. The branch name should be descriptive and reflect the task's topic.
- Before merging into the main branch (main), at least three (3) approvals from other team members are required.

#### Branch and Commit Naming:

We follow the convention specified in: [Link](https://www.conventionalcommits.org/en/v1.0.0/")
For example: 'feat/branch-name', 'fix: commit name'

#### Communication and Code Review:

- We actively monitor the Discord channel, where all pull requests (PRs) are automatically posted.
- We perform code reviews on GitHub. You can refer to the following tutorials: [link1](https://www.youtube.com/watch?v=lSnbOtw4izI) [link2](https://www.youtube.com/watch?v=vSsUO_OP-f8)
- We include helpful comments in the code for the rest of the team.

#### Folder Structure:

- Each component should reside in its own folder within the main "components" folder.
- The folder name should correspond to the component's name. For example: /components/Header.
- Place component-related files inside the component folder, such as Header.tsx, Header.module.scss.

#### Styling:

- We use SASS.
- For each component, create a CSS file named ComponentName.module.scss.

#### Class Naming:

- All classes and component names should be written in camelCase. For example: headerButton
- Avoid using underscores, hyphens, or other special characters in class and component names.
- Use names that clearly describe the functionality and purpose of the element.

#### Dynamic CSS Classes:

For dynamic CSS classes, we recommend using the classnames/bind library. You can install it by running: 'npm install classnames'.
Once installed, you can use the library as follows:

```javascript
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
const [active, setActive] = useState(false)

const getDynamicHeaderClasses = cx({
  [styles.headerWrapper]: true,
  [styles.headerisActive]: active === true,
  [styles.headerNotActive]: !active,
})

return <div className={getDynamicHeaderClasses}>Header</div>
```

---
### Community and Contributions 👥
You can use one of these channels to ask a question:
* [Discord](https://discord.gg/KRmMpxgGKv) - discussion with the Community and support.
* [GitHub repository](https://github.com/nerdbord/good-dev-hunting-app) - Bug reports, contributions.

---
### License 🪪
* This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).


