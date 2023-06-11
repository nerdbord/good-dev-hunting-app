<h1 align="center">
  Good Dev Hunting
</h1>

Build platform for listing software engineers using Next.js, Typescript, Prisma, and PostgreSQL.

---

### How to start 🚀

1. Install dependencies with `npm install`
2. Run `npm run dev` to start developing

### 📝 Project requirements

- Should be possible to view dev profiles list
- Should be possible to create new dev profile
- Should be possible to edit dev profile
- Should be possible to authorize with GitHub

### Project Documentation

Branch Management and Merge:

-Each task should have its own branch in the Git repository. The branch name should be descriptive and reflect the task's topic.
-Before merging into the main branch (main), at least three (3) approvals from other team members are required.


Branch and Commit Naming:

We follow the convention specified in: <a href="https://www.conventionalcommits.org/en/v1.0.0/">[Link]</a>
For example: 'feat/branch-name', 'fix: commit name'


Communication and Code Review:

-We actively monitor the Discord channel, where all pull requests (PRs) are automatically posted.
-We perform code reviews on GitHub. You can refer to the following tutorials: <a href="https://www.youtube.com/watch?v=lSnbOtw4izI">[link1]</a>, <a href="https://www.youtube.com/watch?v=vSsUO_OP-f8">[link2].</a>
-We include helpful comments in the code for the rest of the team.


Folder Structure:

-Each component should reside in its own folder within the main "components" folder.
-The folder name should correspond to the component's name. For example: /components/Header.
-Place component-related files inside the component folder, such as Header.tsx, Header.module.css.


Styling:

-We use SASS.
-For each component, create a CSS file named ComponentName.module.scss.


Class Naming:

-All classes and component names should be written in camelCase. For example: headerButton
-Avoid using underscores, hyphens, or other special characters in class and component names.
-Use names that clearly describe the functionality and purpose of the element.


Dynamic CSS Classes:

For dynamic CSS classes, we recommend using the classnames/bind library. You can install it by running: 'npm install classnames'.
Once installed, you can use the library as follows:
(The first person needing dynamic classes should install it)

/* `import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const [active, setActive] = useState(false);

const getDynamicHeaderClasses = cx({
[styles.headerWrapper]: true,
[styles.headerisActive]: active === true,
[styles.headerNotActive]: !active,
});

return (

  <div className={getDynamicHeaderClasses}>Header</div>
)` */


<a href="https://www.youtube.com/watch?v=69ggHNjlFMk">[link1]</a>, <a href="https://stackoverflow.com/questions/61617393/classnames-bind-and-global-classes">[link2].</a>

You can also explore the usage of classnames/bind in our native Nerdux project:

<a href="https://github.com/nerdbord/nerdux-ui-system">[Nerdux ui]</a>


Note: Feel free to adapt the provided information to fit the specific conventions and tools used in your project.
