# Contributing to SparkPost

Transparency is one of our core values, and we encourage developers to contribute and become part of the SparkPost developer community.
## Prerequisite to contribution

Before writing code, please search for existing issues or [create a new issue](docs/ADDING_ISSUES.markdown) to confirm where your contribution fits into the roadmap.

Current milestone Pull Requests will receive priority review for merging.

## Contribution Steps
1. Fork this repository
2. Create a new branch named after the issue you’ll be fixing (include the issue number as the branch name, example: Issue in GH is #8 then the branch name should be ISSUE-8)) 
3. Write corresponding tests and code (only what is needed to satisfy the issue and tests please)
    * Include your tests in the 'test' directory in an appropriate test file
    * Write code to satisfy the tests
    * Run tests using ```npm test```
5. Ensure automated tests pass
6. Submit a new Pull Request applying your feature/fix branch to the develop branch of the SparkPost client library

## Releases
If you are a collaborator, when you want release a new version, follow these steps.

1. Make sure all the changes are merged into master
2. Make sure all changes have passed [Travis CI build][1]
3. Determine type of release. We use [Semantic Versioning](http://semver.org/).
4. Update [CHANGELOG.md](CHANGELOG.md) with release notes and commit
5. Run `npm version` command to increment `package.json` version, commit changes, tag changes, and push to upstream.
    - Patch -> `npm version patch`
    - Minor -> `npm version minor`
    - Major -> `npm version major`
6. Once [Travis CI build][1] (from tag) has completed, make sure you're working directory is clean and run `npm publish`
   while in the project root.
7. Create a new [Github Release](https://github.com/SparkPost/node-sparkpost/releases) using the new tag. Copy release
   notes from the [CHANGELOG.md](CHANGELOG.md).

[1]: https://travis-ci.org/SparkPost/node-sparkpost
