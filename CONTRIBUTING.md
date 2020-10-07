# Contributing

Thanks for contributing! This document should give you a good idea
of what you need to do for your changes to make it in to the
project. If you think anything is missing, please feel free to
file an issue!

Please make sure you read the [CODE-OF-CONDUCT.md](./CODE-OF-CONDUCT.md) file before contributing.

-   [Tooling](#tooling)
-   [Preparation](#preparation)
-   [Development](#development)

## Tooling

The first thing to do is make sure you have the right tools to work
on the project. You'll need the following.

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/)

## Preparation

Before you start, make sure there is an issue filed on GitHub.
That way we can talk about changes and get feedback on decisions
before you start. If there is an open issue that you would like to
work on, please comment on the issue and mention `@jakehamilton`.
Once you have an issue assigned to you, you're ready to move on!

To work on the project, you'll first need to create your own fork.
To do so, navigate [here](https://github.com/jakehamilton/scrumfi.sh/fork).

Once your fork is ready, clone it on your local machine.

```shell
# Make sure you use your own username
git clone git@github.com:YOUR_USERNAME/scrumfi.sh.git
```

Now enter the project you cloned and install its dependencies.

```shell
# Enter project
cd scrumfi.sh

# Install dependencies
npm install
```

## Development

To start a local development environment, you can run the
following.

```shell
npm run dev
```

You should now be able to browse to
[localhost:3000](http://localhost:3000) to view the app.

Before making changes, make sure you switch to a new branch.
It is good practice to name your branch something informative
based on what you plan to change. Here are some examples:

```shell
# Example of a feature branch
git checkout -b feat/create-favicon

# Example of a bug fix branch
git checkout -b fix/page-overflow

# Example of a chore branch
git checkout -b chore/create-ci
```

Once your changes are made, you can add them to git. Commits follow
the [Conventional Commits specification](https://www.conventionalcommits.org/).
Here are some example commits:

```shell
# Example of a feature commit
git commit -sm "feat(assets): create new favicon"

# Example of a bug fix commit
git commit -sm "fix(style): restrict overflow on page"

# Example of a chore commit
git commit -sm "chore(ci): create github actions"
```

When your changes are committed, push them up to your fork:

```shell
# Remember to use the name of the branch you created
git push -u origin MY_BRANCH_NAME
```

The last step is to create a new pull request from your fork to
the project. Once created, it will be reviewed and changes may be
requested. After all required changes have been made, your pull
request can be merged in by a maintainer!
