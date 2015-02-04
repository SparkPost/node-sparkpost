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
    * Run tests using ```grunt test```
5. Ensure automated tests pass
6. Submit a new Pull Request applying your feature/fix branch to the develop branch of the SparkPost SDK
