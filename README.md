<h1 align="center">
  Good Dev Hunting
</h1>

This project aims to create a platform for listing software engineers using Next.js, Typescript, Prisma, and PostgreSQL. Our goal is to make it easy for recruiters and companies to find potential candidates while providing a platform for developers to showcase their profiles and projects.

---

### Setup Instructions 🛠️

1. Install dependencies with `npm install`.
2. Setup the PostgreSQL database and update the `prisma/.env` file with your database credentials.
3. Run `npx prisma migrate dev` to apply the database schema.
4. Run `npm run dev` to start the development server.

---

### Coding Conventions 📏

- We follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Use Prettier and ESLint to ensure code consistency and readability.

---

### Testing 🧪

- We use Jest and React Testing Library for unit and integration testing.
- To run tests, use the command `npm run test`.

---

### Deployment 🚀

- We deploy the project using Vercel.

---

### Project Documentation

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
